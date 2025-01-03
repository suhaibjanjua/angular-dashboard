import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-theme-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ],
  template: `
    <div class="theme-page">
      <div class="page-header">
        <h1>Change Theme</h1>
        <p class="page-subtitle">Customize the appearance of your dashboard</p>
      </div>

      <div class="theme-content">
        <mat-card class="theme-selector-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>palette</mat-icon>
              Theme Selection
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="current-theme">
              <h3>Current Theme</h3>
              <div class="theme-preview {{ currentTheme }}">
                <div class="preview-header">
                  <mat-icon>{{ getThemeIcon(currentTheme) }}</mat-icon>
                  <span>{{ getThemeName(currentTheme) }}</span>
                </div>
                <div class="preview-content">
                  <div class="preview-sidebar"></div>
                  <div class="preview-main">
                    <div class="preview-card"></div>
                    <div class="preview-card"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="theme-options">
              <h3>Available Themes</h3>
              <div class="themes-grid">
                <div class="theme-option" 
                     *ngFor="let theme of themes" 
                     [class.selected]="selectedTheme === theme.value"
                     (click)="selectTheme(theme.value)">
                  <div class="theme-preview {{ theme.value }}">
                    <div class="preview-header">
                      <mat-icon>{{ theme.icon }}</mat-icon>
                      <span>{{ theme.name }}</span>
                    </div>
                    <div class="preview-content">
                      <div class="preview-sidebar"></div>
                      <div class="preview-main">
                        <div class="preview-card"></div>
                        <div class="preview-card"></div>
                      </div>
                    </div>
                  </div>
                  <div class="theme-info">
                    <h4>{{ theme.name }}</h4>
                    <p>{{ theme.description }}</p>
                  </div>
                  <mat-icon class="selected-icon" *ngIf="selectedTheme === theme.value">check_circle</mat-icon>
                </div>
              </div>
            </div>

            <div class="theme-settings">
              <h3>Theme Settings</h3>
              <div class="setting-item">
                <div class="setting-info">
                  <h4>Auto Theme</h4>
                  <p>Automatically switch between light and dark based on system preference</p>
                </div>
                <mat-slide-toggle [(ngModel)]="autoTheme" color="primary" (change)="onAutoThemeChange()">
                </mat-slide-toggle>
              </div>
              
              <div class="setting-item">
                <div class="setting-info">
                  <h4>High Contrast</h4>
                  <p>Increase contrast for better accessibility</p>
                </div>
                <mat-slide-toggle [(ngModel)]="highContrast" color="primary">
                </mat-slide-toggle>
              </div>
            </div>
          </mat-card-content>
          <mat-card-actions class="theme-actions">
            <button mat-button color="accent" (click)="resetTheme()" [disabled]="selectedTheme === currentTheme && !autoTheme && !highContrast">
              <mat-icon>restore</mat-icon>
              Reset
            </button>
            <button mat-raised-button color="primary" (click)="applyTheme()" [disabled]="selectedTheme === currentTheme && !settingsChanged()">
              <mat-icon>check</mat-icon>
              Apply Theme
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="theme-info-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>info</mat-icon>
              Theme Features
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="feature-item">
              <mat-icon>visibility</mat-icon>
              <div>
                <h4>Eye Comfort</h4>
                <p>Designed to reduce eye strain during extended use</p>
              </div>
            </div>
            <div class="feature-item">
              <mat-icon>accessibility</mat-icon>
              <div>
                <h4>Accessibility</h4>
                <p>WCAG compliant color schemes for better accessibility</p>
              </div>
            </div>
            <div class="feature-item">
              <mat-icon>sync</mat-icon>
              <div>
                <h4>Instant Apply</h4>
                <p>Changes take effect immediately without page refresh</p>
              </div>
            </div>
            <div class="feature-item">
              <mat-icon>devices</mat-icon>
              <div>
                <h4>Device Sync</h4>
                <p>Theme preferences sync across all your devices</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./app-change-theme-page.component.scss']
})
export class AppChangeThemePageComponent {
  currentTheme = 'light';
  selectedTheme = 'light';
  autoTheme = false;
  highContrast = false;

  themes = [
    {
      value: 'light',
      name: 'Light Theme',
      description: 'Clean and bright interface perfect for daytime use',
      icon: 'light_mode'
    },
    {
      value: 'dark',
      name: 'Dark Theme',
      description: 'Easy on the eyes for low-light environments',
      icon: 'dark_mode'
    },
    {
      value: 'purple',
      name: 'Purple Theme',
      description: 'Branded purple theme with modern aesthetics',
      icon: 'auto_awesome'
    },
    {
      value: 'blue',
      name: 'Blue Theme',
      description: 'Professional blue color scheme',
      icon: 'water_drop'
    }
  ];

  getThemeIcon(themeValue: string): string {
    return this.themes.find(theme => theme.value === themeValue)?.icon || 'palette';
  }

  getThemeName(themeValue: string): string {
    return this.themes.find(theme => theme.value === themeValue)?.name || 'Unknown Theme';
  }

  selectTheme(themeValue: string): void {
    this.selectedTheme = themeValue;
    if (this.autoTheme) {
      this.autoTheme = false;
    }
  }

  onAutoThemeChange(): void {
    if (this.autoTheme) {
      // Detect system theme preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.selectedTheme = prefersDark ? 'dark' : 'light';
    }
  }

  settingsChanged(): boolean {
    return this.autoTheme || this.highContrast;
  }

  resetTheme(): void {
    this.selectedTheme = this.currentTheme;
    this.autoTheme = false;
    this.highContrast = false;
  }

  applyTheme(): void {
    console.log('Applying theme:', {
      theme: this.selectedTheme,
      autoTheme: this.autoTheme,
      highContrast: this.highContrast
    });
    
    this.currentTheme = this.selectedTheme;
    
    // Apply theme to document body
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${this.selectedTheme}`);
    
    if (this.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    
    // Implement actual theme application logic here
    // This would typically involve updating a theme service
  }
}