import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-language-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ],
  template: `
    <div class="language-page">
      <div class="page-header">
        <h1>Select Language</h1>
        <p class="page-subtitle">Choose your preferred language for the application interface</p>
      </div>

      <div class="language-content">
        <mat-card class="language-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>language</mat-icon>
              Language Settings
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="current-language">
              <h3>Current Language</h3>
              <div class="language-info">
                <mat-icon>{{ getCurrentLanguageIcon() }}</mat-icon>
                <span>{{ getCurrentLanguageName() }}</span>
              </div>
            </div>

            <div class="language-selector">
              <h3>Select New Language</h3>
              <mat-form-field appearance="outline" class="language-select">
                <mat-label>Choose Language</mat-label>
                <mat-select [(ngModel)]="selectedLanguage" (selectionChange)="onLanguageChange()">
                  <mat-option *ngFor="let lang of languages" [value]="lang.code">
                    <div class="language-option">
                      <mat-icon>{{ lang.icon }}</mat-icon>
                      <span class="language-name">{{ lang.name }}</span>
                      <span class="language-native">{{ lang.nativeName }}</span>
                    </div>
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="language-preview" *ngIf="selectedLanguage !== currentLanguage">
              <h3>Preview</h3>
              <div class="preview-content">
                <p><strong>Welcome:</strong> {{ getWelcomeText() }}</p>
                <p><strong>Dashboard:</strong> {{ getDashboardText() }}</p>
                <p><strong>Settings:</strong> {{ getSettingsText() }}</p>
              </div>
            </div>
          </mat-card-content>
          <mat-card-actions class="language-actions">
            <button mat-button color="accent" (click)="resetLanguage()" [disabled]="selectedLanguage === currentLanguage">
              <mat-icon>restore</mat-icon>
              Reset
            </button>
            <button mat-raised-button color="primary" (click)="applyLanguage()" [disabled]="selectedLanguage === currentLanguage">
              <mat-icon>check</mat-icon>
              Apply Language
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="language-info-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>info</mat-icon>
              Language Information
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="info-item">
              <mat-icon>translate</mat-icon>
              <div>
                <h4>Translation Coverage</h4>
                <p>All languages are fully translated and regularly updated</p>
              </div>
            </div>
            <div class="info-item">
              <mat-icon>sync</mat-icon>
              <div>
                <h4>Real-time Updates</h4>
                <p>Language changes take effect immediately without refresh</p>
              </div>
            </div>
            <div class="info-item">
              <mat-icon>storage</mat-icon>
              <div>
                <h4>Saved Preferences</h4>
                <p>Your language preference is saved and synced across devices</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./app-select-language-page.component.scss']
})
export class AppSelectLanguagePageComponent {
  currentLanguage = 'en';
  selectedLanguage = 'en';

  languages = [
    { code: 'en', name: 'English', nativeName: 'English', icon: 'flag' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', icon: 'flag' },
    { code: 'fr', name: 'French', nativeName: 'Français', icon: 'flag' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', icon: 'flag' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', icon: 'flag' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو', icon: 'flag' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', icon: 'flag' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', icon: 'flag' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', icon: 'flag' },
    { code: 'ko', name: 'Korean', nativeName: '한국어', icon: 'flag' }
  ];

  translations: { [key: string]: { [key: string]: string } } = {
    en: { welcome: 'Welcome', dashboard: 'Dashboard', settings: 'Settings' },
    es: { welcome: 'Bienvenido', dashboard: 'Tablero', settings: 'Configuración' },
    fr: { welcome: 'Bienvenue', dashboard: 'Tableau de bord', settings: 'Paramètres' },
    de: { welcome: 'Willkommen', dashboard: 'Dashboard', settings: 'Einstellungen' },
    ar: { welcome: 'مرحبا', dashboard: 'لوحة التحكم', settings: 'الإعدادات' },
    ur: { welcome: 'خوش آمدید', dashboard: 'ڈیش بورڈ', settings: 'ترتیبات' },
    hi: { welcome: 'स्वागत', dashboard: 'डैशबोर्ड', settings: 'सेटिंग्स' },
    zh: { welcome: '欢迎', dashboard: '仪表板', settings: '设置' },
    ja: { welcome: 'ようこそ', dashboard: 'ダッシュボード', settings: '設定' },
    ko: { welcome: '환영합니다', dashboard: '대시보드', settings: '설정' }
  };

  getCurrentLanguageIcon(): string {
    return this.languages.find(lang => lang.code === this.currentLanguage)?.icon || 'flag';
  }

  getCurrentLanguageName(): string {
    return this.languages.find(lang => lang.code === this.currentLanguage)?.name || 'English';
  }

  getWelcomeText(): string {
    return this.translations[this.selectedLanguage]?.['welcome'] || 'Welcome';
  }

  getDashboardText(): string {
    return this.translations[this.selectedLanguage]?.['dashboard'] || 'Dashboard';
  }

  getSettingsText(): string {
    return this.translations[this.selectedLanguage]?.['settings'] || 'Settings';
  }

  onLanguageChange(): void {
    console.log('Language changed to:', this.selectedLanguage);
  }

  resetLanguage(): void {
    this.selectedLanguage = this.currentLanguage;
  }

  applyLanguage(): void {
    console.log('Applying language:', this.selectedLanguage);
    this.currentLanguage = this.selectedLanguage;
    // Implement actual language application logic here
    // This would typically involve updating a language service
  }
}