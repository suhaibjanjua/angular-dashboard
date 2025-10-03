import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { FeatureCategory } from '../../models/feature.models';

@Component({
  selector: 'app-category-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule
  ],
  template: `
    <div class="category-sidebar">
      <div class="sidebar-header">
        <h2>Feature Categories</h2>
        <p>Configure your dashboard features</p>
      </div>
      
      <nav class="category-nav">
        <button 
          *ngFor="let category of categories"
          mat-button
          class="category-item"
          [class.active]="selectedCategoryId === category.id"
          (click)="onCategorySelect(category.id)">
          
          <div class="category-content">
            <div class="category-header">
              <mat-icon class="category-icon">{{ category.icon }}</mat-icon>
              <span class="category-name">{{ category.name }}</span>
              <span class="feature-count" 
                    [matBadge]="getEnabledCount(category)" 
                    [matBadgeHidden]="getEnabledCount(category) === 0"
                    matBadgeColor="primary"
                    matBadgeSize="small">
                {{ getTotalCount(category) }}
              </span>
            </div>
            <p class="category-description">{{ category.description }}</p>
          </div>
        </button>
      </nav>
      
      <div class="sidebar-footer">
        <div class="stats-summary">
          <div class="stat-item">
            <mat-icon>check_circle</mat-icon>
            <span>{{ totalEnabled }} enabled</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app-category-sidebar.component.scss']
})
export class AppCategorySidebarComponent {
  @Input() categories: FeatureCategory[] = [];
  @Input() selectedCategoryId: string | null = null;
  @Input() totalEnabled = 0;
  
  @Output() categorySelect = new EventEmitter<string>();

  onCategorySelect(categoryId: string): void {
    this.categorySelect.emit(categoryId);
  }

  getTotalCount(category: FeatureCategory): number {
    return category.features.reduce((total, feature) => {
      return total + 1 + (feature.children?.length || 0);
    }, 0);
  }

  getEnabledCount(category: FeatureCategory): number {
    return category.features.reduce((total, feature) => {
      let enabled = feature.enabled ? 1 : 0;
      enabled += feature.children?.filter(child => child.enabled).length || 0;
      return total + enabled;
    }, 0);
  }
}