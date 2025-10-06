import { Injectable, signal, effect } from '@angular/core';

export interface Theme {
  id: string;
  name: string;
  displayName: string;
  description: string;
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    primarySubtle: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    surfaceHover: string;
    surfaceSelected: string;
    text: string;
    textSecondary: string;
    textLight: string;
    textMuted: string;
    border: string;
    borderLight: string;
    borderDark: string;
    sidebar: string;
    sidebarHover: string;
    sidebarActive: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
}

export const LIGHT_THEME: Theme = {
  id: 'light',
  name: 'light',
  displayName: 'Light Theme',
  description: 'Clean and bright interface for day-time usage',
  colors: {
    primary: '#6c4bb6',
    primaryDark: '#5c3f9d',
    primaryLight: '#8b5cf6',
    primarySubtle: '#f3f0ff',
    secondary: '#f4d03f',
    accent: '#8b5cf6',
    background: '#ffffff',
    surface: '#f8fafc',
    surfaceHover: '#f1f5f9',
    surfaceSelected: '#e2e8f0',
    text: '#1a202c',
    textSecondary: '#64748b',
    textLight: '#ffffff',
    textMuted: '#94a3b8',
    border: '#e2e8f0',
    borderLight: '#f1f5f9',
    borderDark: '#cbd5e1',
    sidebar: '#2d3748',
    sidebarHover: '#4a5568',
    sidebarActive: '#6c4bb6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.08)',
    medium: '0 4px 16px rgba(0, 0, 0, 0.12)',
    large: '0 8px 32px rgba(0, 0, 0, 0.16)',
  },
};

export const DARK_THEME: Theme = {
  id: 'dark',
  name: 'dark',
  displayName: 'Dark Theme',
  description: 'Easy on the eyes for low-light environments',
  colors: {
    primary: '#8b5cf6',
    primaryDark: '#7c3aed',
    primaryLight: '#a78bfa',
    primarySubtle: 'rgba(139, 92, 246, 0.15)',
    secondary: '#fbbf24',
    accent: '#a78bfa',
    background: '#0a0a0a',
    surface: '#1a1a1a',
    surfaceHover: '#2d2d2d',
    surfaceSelected: '#404040',
    text: '#ffffff',
    textLight: '#ffffff',
    textSecondary: '#b3b3b3',
    textMuted: '#808080',
    sidebar: '#000000',
    sidebarHover: '#1a1a1a',
    sidebarActive: '#8b5cf6',
    border: '#333333',
    borderLight: '#404040',
    borderDark: '#1a1a1a',
    success: '#22c55e',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',
  },
  shadows: {
    small: '0 1px 2px 0 rgba(0, 0, 0, 0.6)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.7), 0 2px 4px -1px rgba(0, 0, 0, 0.6)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.8), 0 4px 6px -2px rgba(0, 0, 0, 0.7)',
  },
};

// Template for creating custom themes
export const CUSTOM_THEME_TEMPLATE: Theme = {
  id: 'custom',
  name: 'custom',
  displayName: 'Custom Theme',
  description: 'Customizable theme template',
  colors: {
    primary: '#your-primary-color',
    primaryDark: '#your-primary-dark-color',
    primaryLight: '#your-primary-light-color',
    primarySubtle: '#your-primary-subtle-color',
    secondary: '#your-secondary-color',
    accent: '#your-accent-color',
    background: '#your-background-color',
    surface: '#your-surface-color',
    surfaceHover: '#your-surface-hover-color',
    surfaceSelected: '#your-surface-selected-color',
    text: '#your-text-color',
    textSecondary: '#your-text-secondary-color',
    textLight: '#your-text-light-color',
    textMuted: '#your-text-muted-color',
    border: '#your-border-color',
    borderLight: '#your-border-light-color',
    borderDark: '#your-border-dark-color',
    sidebar: '#your-sidebar-color',
    sidebarHover: '#your-sidebar-hover-color',
    sidebarActive: '#your-sidebar-active-color',
    success: '#your-success-color',
    warning: '#your-warning-color',
    error: '#your-error-color',
    info: '#your-info-color',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.08)',
    medium: '0 4px 16px rgba(0, 0, 0, 0.12)',
    large: '0 8px 32px rgba(0, 0, 0, 0.16)',
  },
};

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'angular-dashboard-theme';
  private readonly CSS_VARIABLE_PREFIX = '--theme-';

  // Available themes
  public readonly availableThemes: Theme[] = [LIGHT_THEME, DARK_THEME];

  // Current theme signal
  public readonly currentTheme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Apply theme effect to automatically update when currentTheme changes
    effect(() => {
      this.applyTheme(this.currentTheme());
    });
  }

  /**
   * Initialize the theme service and apply the current theme
   */
  initializeTheme(): void {
    this.applyTheme(this.currentTheme());
  }

  /**
   * Switch to a specific theme by ID
   */
  public switchTheme(themeId: string): void {
    const theme = this.availableThemes.find(t => t.id === themeId);
    if (theme) {
      this.currentTheme.set(theme);
      this.saveThemePreference(themeId);
    }
  }

  /**
   * Toggle between light and dark themes
   */
  public toggleTheme(): void {
    const currentId = this.currentTheme().id;
    const newThemeId = currentId === 'light' ? 'dark' : 'light';
    this.switchTheme(newThemeId);
  }

  /**
   * Get theme by ID
   */
  public getTheme(themeId: string): Theme | undefined {
    return this.availableThemes.find(t => t.id === themeId);
  }

  /**
   * Register a new custom theme
   */
  public registerCustomTheme(theme: Theme): void {
    const existingIndex = this.availableThemes.findIndex(t => t.id === theme.id);
    if (existingIndex >= 0) {
      this.availableThemes[existingIndex] = theme;
    } else {
      this.availableThemes.push(theme);
    }
  }

  /**
   * Check if current theme is dark
   */
  public isDarkTheme(): boolean {
    return this.currentTheme().id === 'dark';
  }

  /**
   * Check if current theme is light
   */
  public isLightTheme(): boolean {
    return this.currentTheme().id === 'light';
  }

  /**
   * Get the initial theme from localStorage or default to light
   */
  private getInitialTheme(): Theme {
    try {
      const savedThemeId = localStorage.getItem(this.STORAGE_KEY);
      if (savedThemeId) {
        const savedTheme = this.availableThemes.find(t => t.id === savedThemeId);
        if (savedTheme) {
          return savedTheme;
        }
      }
    } catch (error) {
      console.warn('Failed to load theme preference:', error);
    }

    return LIGHT_THEME;
  }

  /**
   * Save theme preference to localStorage
   */
  private saveThemePreference(themeId: string): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, themeId);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }

  /**
   * Apply theme by setting CSS custom properties
   */
  private applyTheme(theme: Theme): void {
    const root = document.documentElement;

    // Apply color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`${this.CSS_VARIABLE_PREFIX}${this.kebabCase(key)}`, value);
    });

    // Apply shadow variables
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`${this.CSS_VARIABLE_PREFIX}shadow-${key}`, value);
    });

    // Set theme ID as data attribute for conditional styling
    root.setAttribute('data-theme', theme.id);
    
    // Add theme class to body for component-specific styling
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${theme.id}`);

    console.log(`Applied theme: ${theme.displayName}`);
  }

  /**
   * Convert camelCase to kebab-case
   */
  private kebabCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
  }
}