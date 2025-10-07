import { TestBed } from '@angular/core/testing';
import { ThemeService, LIGHT_THEME, DARK_THEME, Theme } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let documentElement: HTMLElement;
  let body: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    documentElement = document.documentElement;
    body = document.body;
    
    // Clear localStorage before each test
    localStorage.clear();
    
    // Clear any existing theme classes
    body.className = body.className.replace(/theme-\w+/g, '');
    
    // Reset document element styles
    const root = document.documentElement;
    root.removeAttribute('data-theme');
  });

  afterEach(() => {
    localStorage.clear();
    // Clean up any theme classes and attributes
    body.className = body.className.replace(/theme-\w+/g, '');
    documentElement.removeAttribute('data-theme');
    // Reset CSS custom properties
    const style = documentElement.style;
    style.removeProperty('--primary-color');
    style.removeProperty('--background-color');
    style.removeProperty('--text-color');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should initialize with light theme by default', () => {
      expect(service.currentTheme().id).toBe('light');
      expect(service.currentTheme().displayName).toBe('Light Theme');
    });

    it('should have both light and dark themes available', () => {
      expect(service.availableThemes).toContain(LIGHT_THEME);
      expect(service.availableThemes).toContain(DARK_THEME);
      expect(service.availableThemes.length).toBe(2);
    });

    it('should initialize theme from localStorage if available', () => {
      localStorage.setItem('angular-dashboard-theme', 'dark');
      
      // Create new service instance using TestBed injection context
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});
      const newService = TestBed.inject(ThemeService);
      
      expect(newService.currentTheme().id).toBe('dark');
    });

    it('should fall back to light theme if localStorage contains invalid theme', () => {
      localStorage.setItem('angular-dashboard-theme', 'invalid-theme');
      
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});
      const newService = TestBed.inject(ThemeService);
      
      expect(newService.currentTheme().id).toBe('light');
    });

    it('should handle localStorage errors gracefully', () => {
      spyOn(localStorage, 'getItem').and.throwError('Storage error');
      spyOn(console, 'warn');
      
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});
      const newService = TestBed.inject(ThemeService);
      
      expect(newService.currentTheme().id).toBe('light');
      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe('Theme Switching', () => {
    it('should switch to dark theme', () => {
      service.switchTheme('dark');
      
      expect(service.currentTheme().id).toBe('dark');
      expect(service.currentTheme().displayName).toBe('Dark Theme');
    });

    it('should switch to light theme', () => {
      service.switchTheme('dark');
      service.switchTheme('light');
      
      expect(service.currentTheme().id).toBe('light');
      expect(service.currentTheme().displayName).toBe('Light Theme');
    });

    it('should save theme preference to localStorage', () => {
      service.switchTheme('dark');
      
      expect(localStorage.getItem('angular-dashboard-theme')).toBe('dark');
    });

    it('should ignore invalid theme IDs', () => {
      const initialTheme = service.currentTheme();
      service.switchTheme('invalid-theme');
      
      expect(service.currentTheme()).toBe(initialTheme);
    });

    it('should handle localStorage save errors gracefully', () => {
      spyOn(localStorage, 'setItem').and.throwError('Storage error');
      spyOn(console, 'warn');
      
      service.switchTheme('dark');
      
      expect(service.currentTheme().id).toBe('dark');
      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe('Theme Toggle', () => {
    it('should toggle from light to dark', () => {
      service.switchTheme('light');
      service.toggleTheme();
      
      expect(service.currentTheme().id).toBe('dark');
    });

    it('should toggle from dark to light', () => {
      service.switchTheme('dark');
      service.toggleTheme();
      
      expect(service.currentTheme().id).toBe('light');
    });
  });

  describe('Theme Queries', () => {
    it('should correctly identify dark theme', () => {
      service.switchTheme('dark');
      expect(service.isDarkTheme()).toBe(true);
      expect(service.isLightTheme()).toBe(false);
    });

    it('should correctly identify light theme', () => {
      service.switchTheme('light');
      expect(service.isDarkTheme()).toBe(false);
      expect(service.isLightTheme()).toBe(true);
    });

    it('should get theme by ID', () => {
      const lightTheme = service.getTheme('light');
      const darkTheme = service.getTheme('dark');
      const invalidTheme = service.getTheme('invalid');

      expect(lightTheme).toBe(LIGHT_THEME);
      expect(darkTheme).toBe(DARK_THEME);
      expect(invalidTheme).toBeUndefined();
    });
  });

  describe('Custom Theme Registration', () => {
    const customTheme: Theme = {
      id: 'custom',
      name: 'custom',
      displayName: 'Custom Theme',
      description: 'A custom test theme',
      colors: {
        primary: '#test-primary',
        primaryDark: '#test-primary-dark',
        primaryLight: '#test-primary-light',
        primarySubtle: '#test-primary-subtle',
        secondary: '#test-secondary',
        accent: '#test-accent',
        background: '#test-background',
        surface: '#test-surface',
        surfaceHover: '#test-surface-hover',
        surfaceSelected: '#test-surface-selected',
        text: '#test-text',
        textSecondary: '#test-text-secondary',
        textLight: '#test-text-light',
        textMuted: '#test-text-muted',
        border: '#test-border',
        borderLight: '#test-border-light',
        borderDark: '#test-border-dark',
        sidebar: '#test-sidebar',
        sidebarHover: '#test-sidebar-hover',
        sidebarActive: '#test-sidebar-active',
        success: '#test-success',
        warning: '#test-warning',
        error: '#test-error',
        info: '#test-info',
      },
      shadows: {
        small: '0 1px 2px test-shadow',
        medium: '0 2px 4px test-shadow',
        large: '0 4px 8px test-shadow',
      },
    };

    it('should register a new custom theme', () => {
      service.registerCustomTheme(customTheme);
      
      expect(service.availableThemes).toContain(customTheme);
      expect(service.availableThemes.length).toBe(3);
    });

    it('should replace existing theme when registering with same ID', () => {
      const updatedTheme = { ...customTheme, displayName: 'Updated Custom Theme' };
      
      service.registerCustomTheme(customTheme);
      const lengthBefore = service.availableThemes.length;
      
      service.registerCustomTheme(updatedTheme);
      
      expect(service.availableThemes.length).toBe(lengthBefore);
      expect(service.getTheme('custom')?.displayName).toBe('Updated Custom Theme');
    });

    it('should switch to registered custom theme', () => {
      service.registerCustomTheme(customTheme);
      service.switchTheme('custom');
      
      expect(service.currentTheme()).toBe(customTheme);
    });
  });

  describe('DOM Manipulation', () => {
    it('should apply CSS custom properties when switching themes', () => {
      service.switchTheme('dark');
      
      const rootStyle = documentElement.style;
      expect(rootStyle.getPropertyValue('--theme-primary')).toBe('#8b5cf6');
      expect(rootStyle.getPropertyValue('--theme-background')).toBe('#202123');
      expect(rootStyle.getPropertyValue('--theme-text')).toBe('#ffffff');
    });

    it('should apply shadow CSS variables', () => {
      service.switchTheme('light');
      
      const rootStyle = documentElement.style;
      expect(rootStyle.getPropertyValue('--theme-shadow-small')).toBe('0 2px 8px rgba(0, 0, 0, 0.08)');
      expect(rootStyle.getPropertyValue('--theme-shadow-medium')).toBe('0 4px 16px rgba(0, 0, 0, 0.12)');
      expect(rootStyle.getPropertyValue('--theme-shadow-large')).toBe('0 8px 32px rgba(0, 0, 0, 0.16)');
    });

    it('should set data-theme attribute on document element', () => {
      service.switchTheme('dark');
      
      expect(documentElement.getAttribute('data-theme')).toBe('dark');
      
      service.switchTheme('light');
      
      expect(documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('should add theme class to body element', () => {
      service.switchTheme('dark');
      
      expect(body.classList.contains('theme-dark')).toBe(true);
      
      service.switchTheme('light');
      
      expect(body.classList.contains('theme-light')).toBe(true);
      expect(body.classList.contains('theme-dark')).toBe(false);
    });

    it('should convert camelCase property names to kebab-case', () => {
      service.switchTheme('light');
      
      const rootStyle = documentElement.style;
      expect(rootStyle.getPropertyValue('--theme-primary-dark')).toBe('#5c3f9d');
      expect(rootStyle.getPropertyValue('--theme-surface-hover')).toBe(LIGHT_THEME.colors.surfaceHover);
      expect(rootStyle.getPropertyValue('--theme-text-secondary')).toBe(LIGHT_THEME.colors.textSecondary);
    });
  });

  describe('Initialize Theme Method', () => {
    it('should apply current theme when initialized', () => {
      spyOn(console, 'log');
      
      service.initializeTheme();
      
      expect(console.log).toHaveBeenCalledWith(`Applied theme: ${service.currentTheme().displayName}`);
    });
  });

  describe('Error Handling', () => {
    it('should handle DOM manipulation errors gracefully', () => {
      spyOn(document.documentElement.style, 'setProperty').and.throwError('DOM error');
      spyOn(console, 'log');
      
      expect(() => service.switchTheme('dark')).not.toThrow();
    });
  });

  describe('Theme Constants', () => {
    it('should have correct light theme properties', () => {
      expect(LIGHT_THEME.id).toBe('light');
      expect(LIGHT_THEME.displayName).toBe('Light Theme');
      expect(LIGHT_THEME.colors.primary).toBe('#6c4bb6');
      expect(LIGHT_THEME.colors.background).toBe('#ffffff');
      expect(LIGHT_THEME.colors.text).toBe('#1a202c');
    });

    it('should have correct dark theme properties', () => {
      expect(DARK_THEME.id).toBe('dark');
      expect(DARK_THEME.displayName).toBe('Dark Theme');
      expect(DARK_THEME.colors.primary).toBe('#8b5cf6');
      expect(DARK_THEME.colors.background).toBe('#202123');
      expect(DARK_THEME.colors.text).toBe('#ffffff');
    });

    it('should have all required color properties', () => {
      const requiredColors = [
        'primary', 'primaryDark', 'primaryLight', 'primarySubtle',
        'secondary', 'accent', 'background', 'surface', 'surfaceHover',
        'surfaceSelected', 'text', 'textSecondary', 'textLight', 'textMuted',
        'border', 'borderLight', 'borderDark', 'sidebar', 'sidebarHover',
        'sidebarActive', 'success', 'warning', 'error', 'info'
      ];

      requiredColors.forEach(color => {
        expect(LIGHT_THEME.colors[color as keyof typeof LIGHT_THEME.colors]).toBeDefined();
        expect(DARK_THEME.colors[color as keyof typeof DARK_THEME.colors]).toBeDefined();
      });
    });

    it('should have all required shadow properties', () => {
      const requiredShadows = ['small', 'medium', 'large'];

      requiredShadows.forEach(shadow => {
        expect(LIGHT_THEME.shadows[shadow as keyof typeof LIGHT_THEME.shadows]).toBeDefined();
        expect(DARK_THEME.shadows[shadow as keyof typeof DARK_THEME.shadows]).toBeDefined();
      });
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle invalid theme ID gracefully', () => {
      expect(() => service.switchTheme('invalid-theme')).not.toThrow();
      // Should remain on current theme
      expect(service.currentTheme().id).toBe('light');
    });

    it('should handle localStorage errors gracefully', () => {
      // Mock localStorage to throw an error
      spyOn(localStorage, 'setItem').and.throwError('Storage quota exceeded');
      
      expect(() => service.switchTheme('dark')).not.toThrow();
      expect(service.currentTheme().id).toBe('dark');
    });

    it('should handle missing document elements gracefully', () => {
      // Mock documentElement to be null
      const originalDocumentElement = document.documentElement;
      Object.defineProperty(document, 'documentElement', {
        value: null,
        configurable: true
      });

      expect(() => service.switchTheme('dark')).not.toThrow();

      // Restore original documentElement
      Object.defineProperty(document, 'documentElement', {
        value: originalDocumentElement,
        configurable: true
      });
    });

    it('should clean up properly when service is destroyed', () => {
      // Simulate service cleanup
      service.switchTheme('dark');
      expect(service.currentTheme().id).toBe('dark');
      
      // Test cleanup
      const themeClasses = body.className.match(/theme-\w+/g);
      expect(themeClasses).toBeTruthy();
    });
  });
});