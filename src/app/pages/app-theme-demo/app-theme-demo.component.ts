import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AppThemeSwitcherComponent } from '../../atoms/app-theme-switcher/app-theme-switcher.component';

@Component({
  selector: 'app-theme-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    AppThemeSwitcherComponent,
  ],
  template: `
    <div class="theme-demo">
      <mat-card class="demo-card">
        <mat-card-header>
          <mat-card-title>Theme Switcher Demo</mat-card-title>
          <mat-card-subtitle>Test all three modes of the theme switcher</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <!-- Toggle Mode -->
          <div class="demo-section">
            <h3>Toggle Mode</h3>
            <p>Simple toggle button for light/dark switching:</p>
            <div class="demo-component">
              <app-theme-switcher mode="toggle"></app-theme-switcher>
            </div>
          </div>

          <mat-divider></mat-divider>

          <!-- Menu Item Mode -->
          <div class="demo-section">
            <h3>Menu Item Mode</h3>
            <p>This mode is used in the user menu dropdown (top-right corner)</p>
            <p>Click on your avatar in the header to see it in action!</p>
          </div>

          <mat-divider></mat-divider>

          <!-- Selector Mode -->
          <div class="demo-section">
            <h3>Selector Mode</h3>
            <p>Full theme selector for settings pages:</p>
            <div class="demo-component">
              <app-theme-switcher mode="selector"></app-theme-switcher>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./app-theme-demo.component.scss']
})
export class AppThemeDemoComponent {}