import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  template: `
    <div class="theme-switcher">
      <!-- Simple toggle button (for inline usage) -->
      <button 
        *ngIf="mode === 'toggle'"
        mat-icon-button
        (click)="toggleTheme()"
        [matTooltip]="getToggleTooltip()"
        class="theme-toggle-btn">
        <mat-icon>{{ themeService.isDarkTheme() ? 'light_mode' : 'dark_mode' }}</mat-icon>
      </button>

      <!-- Menu item (for dropdown usage) -->
      <button 
        *ngIf="mode === 'menu-item'"
        mat-menu-item
        [matMenuTriggerFor]="themeMenu"
        class="theme-menu-item">
        <mat-icon>{{ getCurrentThemeIcon() }}</mat-icon>
        <span>{{ getCurrentThemeName() }}</span>
        <mat-icon class="arrow-icon">chevron_right</mat-icon>
      </button>

      <!-- Submenu with all available themes -->
      <mat-menu #themeMenu="matMenu" class="theme-submenu" panelClass="theme-submenu-panel">
        <div class="theme-header">
          <span class="theme-title">Choose Theme</span>
        </div>
        
        <button 
          *ngFor="let theme of themeService.availableThemes"
          mat-menu-item
          (click)="switchToTheme(theme.id)"
          [class.active]="isCurrentTheme(theme)"
          class="theme-option">
          
          <div class="theme-option-content">
            <mat-icon class="theme-icon">{{ getThemeIcon(theme) }}</mat-icon>
            <div class="theme-info">
              <span class="theme-name">{{ theme.displayName }}</span>
              <span class="theme-description">{{ theme.description }}</span>
            </div>
            <mat-icon 
              *ngIf="isCurrentTheme(theme)"
              class="check-icon">
              check
            </mat-icon>
          </div>
        </button>
        
        <div class="theme-preview" *ngIf="showPreview">
          <div class="preview-title">Theme Preview</div>
          <div class="preview-colors">
            <div 
              *ngFor="let color of getPreviewColors()" 
              class="color-sample"
              [style.background-color]="color.value"
              [matTooltip]="color.name">
            </div>
          </div>
        </div>
      </mat-menu>

      <!-- Standalone selector (for settings page) -->
      <div *ngIf="mode === 'selector'" class="theme-selector">
        <div class="selector-header">
          <h3>Choose Your Theme</h3>
          <p>Select a theme that suits your preference</p>
        </div>
        
        <div class="theme-options">
          <div 
            *ngFor="let theme of themeService.availableThemes"
            class="theme-card"
            [class.active]="isCurrentTheme(theme)"
            (click)="switchToTheme(theme.id)">
            
            <div class="theme-card-header">
              <mat-icon class="theme-card-icon">{{ getThemeIcon(theme) }}</mat-icon>
              <div class="theme-card-info">
                <h4>{{ theme.displayName }}</h4>
                <p>{{ theme.description }}</p>
              </div>
              <mat-icon 
                *ngIf="isCurrentTheme(theme)"
                class="theme-card-check">
                check_circle
              </mat-icon>
            </div>
            
            <div class="theme-card-preview">
              <div class="preview-bar" [style.background]="theme.colors.primary"></div>
              <div class="preview-content" [style.background]="theme.colors.background">
                <div class="preview-surface" [style.background]="theme.colors.surface">
                  <div class="preview-text" [style.color]="theme.colors.text">Sample Text</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app-theme-switcher.component.scss']
})
export class AppThemeSwitcherComponent {
  @Input() mode: 'toggle' | 'menu-item' | 'selector' = 'menu-item';
  @Input() showPreview: boolean = false;

  public readonly themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  switchToTheme(themeId: string): void {
    this.themeService.switchTheme(themeId);
  }

  isCurrentTheme(theme: Theme): boolean {
    return this.themeService.currentTheme().id === theme.id;
  }

  getCurrentThemeName(): string {
    return this.themeService.currentTheme().displayName;
  }

  getCurrentThemeIcon(): string {
    return this.getThemeIcon(this.themeService.currentTheme());
  }

  getThemeIcon(theme: Theme): string {
    switch (theme.id) {
      case 'light':
        return 'light_mode';
      case 'dark':
        return 'dark_mode';
      default:
        return 'palette';
    }
  }

  getToggleTooltip(): string {
    const currentTheme = this.themeService.currentTheme();
    const nextTheme = currentTheme.id === 'light' ? 'Dark' : 'Light';
    return `Switch to ${nextTheme} Theme`;
  }

  getPreviewColors(): { name: string; value: string }[] {
    const theme = this.themeService.currentTheme();
    return [
      { name: 'Primary', value: theme.colors.primary },
      { name: 'Background', value: theme.colors.background },
      { name: 'Surface', value: theme.colors.surface },
      { name: 'Text', value: theme.colors.text },
    ];
  }
}