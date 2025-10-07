import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { AppHeaderTitleComponent } from '../../molecules/app-header-title/app-header-title.component';
import { AppCategorySidebarComponent } from '../../molecules/app-category-sidebar/app-category-sidebar.component';
import { AppFeatureToggleComponent } from '../../atoms/app-feature-toggle/app-feature-toggle.component';
import {
  FeatureCategory,
  Feature,
  FeatureProfile,
  FeatureToggleEvent
} from '../../models/feature.models';
import { FeatureService } from '../../services/feature.service';
import { AppSearchBarComponent } from '../../molecules/app-search-bar/app-search-bar.component';

@Component({
  selector: 'app-features-profile-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatChipsModule,
    AppHeaderTitleComponent,
    AppCategorySidebarComponent,
    AppFeatureToggleComponent,
    AppSearchBarComponent,
    ReactiveFormsModule,
    NgIf,
    NgFor
  ],
  templateUrl: './app-features-profile-page.component.html',
  styleUrls: ['./app-features-profile-page.component.scss']
})
export class AppFeaturesProfilePageComponent implements OnInit, OnDestroy {
  private readonly featureService = inject(FeatureService);
  private readonly snackBar = inject(MatSnackBar);

  categories: FeatureCategory[] = [];
  selectedCategory: FeatureCategory | null = null;
  featureProfile: FeatureProfile | null = null;
  loading = false;
  searchQuery = '';
  filteredFeatures: Feature[] = [];

  private destroy$ = new Subject<void>();

  form = new FormGroup({
    searchTerm: new FormControl('')
  });

  ngOnInit(): void {
    this.loadFeatures();
    this.subscribeToFeatureProfile();

    this.form.get('searchTerm')?.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(value => {
        this.searchQuery = value ?? '';
        this.filterFeatures();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadFeatures(): void {
    this.featureService.categories$
      .pipe(takeUntil(this.destroy$))
      .subscribe(categories => {
        this.categories = categories.sort((a, b) => a.order - b.order);
        if (this.categories.length > 0 && !this.selectedCategory) {
          this.onCategorySelect(this.categories[0].id);
        }
      });

    this.featureService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.loading = loading;
      });

    // Initial load
    this.featureService.loadFeatures().subscribe();
  }

  private subscribeToFeatureProfile(): void {
    this.featureService.getFeatureProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => {
        this.featureProfile = profile;
      });
  }

  onCategorySelect(categoryId: string): void {
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category) {
      this.selectedCategory = category;
      this.filterFeatures();
    }
  }

  private filterFeatures(): void {
    if (!this.selectedCategory) return;

    if (!this.searchQuery.trim()) {
      this.filteredFeatures = [...this.selectedCategory.features];
      return;
    }

    const searchTerm = this.searchQuery.toLowerCase();
    this.filteredFeatures = this.selectedCategory.features.filter(feature => {
      const featureMatches =
        feature.name.toLowerCase().includes(searchTerm) ||
        feature.description.toLowerCase().includes(searchTerm);

      const childMatches = feature.children?.some(child =>
        child.name.toLowerCase().includes(searchTerm) ||
        child.description.toLowerCase().includes(searchTerm)
      );

      return featureMatches || childMatches;
    });
  }

  onFeatureToggle(event: FeatureToggleEvent): void {
    this.featureService.toggleFeature(event)
      .pipe(takeUntil(this.destroy$))
      .subscribe(success => {
        if (success) {
          const action = event.enabled ? 'enabled' : 'disabled';
          const featureName = this.getFeatureName(event);
          this.snackBar.open(`${featureName} ${action}`, 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        } else {
          this.snackBar.open('Failed to update feature', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      });
  }

  private getFeatureName(event: FeatureToggleEvent): string {
    if (!this.selectedCategory) return 'Feature';

    const feature = this.selectedCategory.features.find(f => f.id === (event.parentId || event.featureId));
    if (!feature) return 'Feature';

    if (event.isChild && feature.children) {
      const child = feature.children.find(c => c.id === event.featureId);
      return child?.name || 'Feature';
    }

    return feature.name;
  }

  onExportConfiguration(): void {
    this.featureService.exportConfiguration()
      .pipe(takeUntil(this.destroy$))
      .subscribe(config => {
        const blob = new Blob([JSON.stringify(config, null, 2)], {
          type: 'application/json'
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `feature-configuration-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        
        // Check if the element is still in the DOM before removing
        if (link.parentNode === document.body) {
          document.body.removeChild(link);
        }
        window.URL.revokeObjectURL(url);

        this.snackBar.open('Configuration exported successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      });
  }

  onImportConfiguration(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            const config = JSON.parse(e.target.result);
            this.featureService.importConfiguration(config)
              .pipe(takeUntil(this.destroy$))
              .subscribe(success => {
                if (success) {
                  this.snackBar.open('Configuration imported successfully', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });
                } else {
                  this.snackBar.open('Failed to import configuration', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top'
                  });
                }
              });
          } catch (error) {
            this.snackBar.open('Invalid configuration file', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.form.get('searchTerm')?.setValue('');
    this.filterFeatures();
  }

  getEnabledFeatureCount(): number {
    return this.featureProfile?.enabledFeatures || 0;
  }

  getTotalFeatureCount(): number {
    return this.featureProfile?.totalFeatures || 0;
  }

  trackByFeatureId(index: number, feature: Feature): string {
    return feature.id;
  }
}