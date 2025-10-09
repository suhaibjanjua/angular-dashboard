import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AppButtonComponent } from '../../atoms/app-button/app-button.component';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    AppButtonComponent
  ],
  template: `
    <div class="settings-page">
      <div class="page-header">
        <h1>Settings</h1>
        <p class="page-subtitle">Customize your application preferences and notifications</p>
      </div>

      <div class="settings-content">
        <mat-card class="notifications-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>notifications</mat-icon>
              Notifications
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="setting-item">
              <div class="setting-info">
                <h3>Email Notifications</h3>
                <p>Receive updates via email</p>
              </div>
              <mat-slide-toggle [(ngModel)]="settings.emailNotifications" color="primary">
              </mat-slide-toggle>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <h3>Push Notifications</h3>
                <p>Show browser notifications</p>
              </div>
              <mat-slide-toggle [(ngModel)]="settings.pushNotifications" color="primary">
              </mat-slide-toggle>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h3>Weekly Reports</h3>
                <p>Receive weekly summary reports</p>
              </div>
              <mat-slide-toggle [(ngModel)]="settings.weeklyReports" color="primary">
              </mat-slide-toggle>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="preferences-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>tune</mat-icon>
              Preferences
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="setting-item">
              <div class="setting-info">
                <h3>Language</h3>
                <p>Choose your preferred language</p>
              </div>
              <mat-form-field appearance="outline" class="language-select">
                <mat-select [(ngModel)]="settings.language">
                  <mat-option value="en">English</mat-option>
                  <mat-option value="es">Spanish</mat-option>
                  <mat-option value="fr">French</mat-option>
                  <mat-option value="de">German</mat-option>
                  <mat-option value="ar">Arabic</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h3>Theme</h3>
                <p>Choose your preferred theme</p>
              </div>
              <mat-form-field appearance="outline" class="theme-select">
                <mat-select [(ngModel)]="settings.theme">
                  <mat-option value="light">Light</mat-option>
                  <mat-option value="dark">Dark</mat-option>
                  <mat-option value="auto">Auto</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h3>Time Zone</h3>
                <p>Set your local time zone</p>
              </div>
              <mat-form-field appearance="outline" class="timezone-select">
                <mat-select [(ngModel)]="settings.timezone">
                  <mat-option value="UTC-8">Pacific Time (UTC-8)</mat-option>
                  <mat-option value="UTC-5">Eastern Time (UTC-5)</mat-option>
                  <mat-option value="UTC+0">GMT (UTC+0)</mat-option>
                  <mat-option value="UTC+1">Central European (UTC+1)</mat-option>
                  <mat-option value="UTC+5">Pakistan Standard (UTC+5)</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="privacy-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>privacy_tip</mat-icon>
              Privacy & Security
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="setting-item">
              <div class="setting-info">
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security</p>
              </div>
              <mat-slide-toggle [(ngModel)]="settings.twoFactorAuth" color="primary">
              </mat-slide-toggle>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h3>Activity Tracking</h3>
                <p>Allow tracking for analytics</p>
              </div>
              <mat-slide-toggle [(ngModel)]="settings.activityTracking" color="primary">
              </mat-slide-toggle>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h3>Data Export</h3>
                <p>Download your data</p>
              </div>
              <app-button label="Export Data" color="primary" type="button" (click)="exportData()" variant="raised" icon="download"></app-button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="settings-actions">
        <app-button label="Reset to Defaults" color="primary" type="button" (click)="resetToDefaults()" variant="stroked" icon="restore"></app-button>
        <app-button label="Save Settings" color="primary" type="button" (click)="saveSettings()" variant="flat" icon="save"></app-button>
      </div>
    </div>
  `,
  styleUrls: ['./app-settings-page.component.scss']
})
export class AppSettingsPageComponent {
  settings = {
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    language: 'en',
    theme: 'light',
    timezone: 'UTC+5',
    twoFactorAuth: false,
    activityTracking: true
  };

  saveSettings() {
    console.log('Saving settings:', this.settings);
    // Implement save logic here
  }

  resetToDefaults() {
    console.log('Resetting to defaults');
    this.settings = {
      emailNotifications: true,
      pushNotifications: false,
      weeklyReports: true,
      language: 'en',
      theme: 'light',
      timezone: 'UTC+5',
      twoFactorAuth: false,
      activityTracking: true
    };
  }

  exportData() {
    console.log('Exporting user data');
    // Implement data export logic
  }
}