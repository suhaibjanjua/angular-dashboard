import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AppThemeSwitcherComponent } from '../../atoms/app-theme-switcher/app-theme-switcher.component';

@Component({
  selector: 'app-change-theme-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    AppThemeSwitcherComponent
  ],
  template: `
    <div class="theme-page">
      <div class="page-header">
        <h1>Theme Settings</h1>
        <p class="page-subtitle">Customize the appearance of your dashboard</p>
      </div>

      <div class="theme-content">
        <mat-card class="theme-selector-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>palette</mat-icon>
              Choose Your Theme
            </mat-card-title>
            <mat-card-subtitle>
              Select a theme that matches your preference. Changes are applied immediately.
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <app-theme-switcher mode="selector"></app-theme-switcher>
          </mat-card-content>
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
export class AppChangeThemePageComponent {}