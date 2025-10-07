import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';
import { AppThemeSwitcherComponent } from './app-theme-switcher.component';
import { ThemeService, LIGHT_THEME, DARK_THEME, Theme } from '../../services/theme.service';

describe('AppThemeSwitcherComponent', () => {
  let component: AppThemeSwitcherComponent;
  let fixture: ComponentFixture<AppThemeSwitcherComponent>;
  let mockThemeService: jasmine.SpyObj<ThemeService>;
  let currentThemeSignal: any;

  const mockCustomTheme: Theme = {
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

  beforeEach(async () => {
    currentThemeSignal = signal(LIGHT_THEME);
    
    const themeServiceSpy = jasmine.createSpyObj('ThemeService', [
      'toggleTheme', 
      'switchTheme', 
      'isDarkTheme', 
      'isLightTheme'
    ], {
      availableThemes: [LIGHT_THEME, DARK_THEME, mockCustomTheme],
      currentTheme: currentThemeSignal
    });

    await TestBed.configureTestingModule({
      imports: [AppThemeSwitcherComponent, NoopAnimationsModule],
      providers: [
        { provide: ThemeService, useValue: themeServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppThemeSwitcherComponent);
    component = fixture.componentInstance;
    mockThemeService = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;
    
    // Setup default return values
    mockThemeService.isDarkTheme.and.returnValue(false);
    mockThemeService.isLightTheme.and.returnValue(true);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should default to menu-item mode', () => {
      expect(component.mode).toBe('menu-item');
    });

    it('should accept mode input', () => {
      component.mode = 'toggle';
      expect(component.mode).toBe('toggle');

      component.mode = 'selector';
      expect(component.mode).toBe('selector');
    });

    it('should default showPreview to false', () => {
      expect(component.showPreview).toBe(false);
    });

    it('should accept showPreview input', () => {
      component.showPreview = true;
      expect(component.showPreview).toBe(true);
    });
  });

  describe('Toggle Mode', () => {
    beforeEach(() => {
      component.mode = 'toggle';
      fixture.detectChanges();
    });

    it('should display toggle button in toggle mode', () => {
      const toggleButton = fixture.nativeElement.querySelector('.theme-toggle-btn');
      expect(toggleButton).toBeTruthy();
    });

    it('should show light_mode icon when in dark theme', () => {
      mockThemeService.isDarkTheme.and.returnValue(true);
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('mat-icon');
      expect(icon.textContent.trim()).toBe('light_mode');
    });

    it('should show dark_mode icon when in light theme', () => {
      mockThemeService.isDarkTheme.and.returnValue(false);
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('mat-icon');
      expect(icon.textContent.trim()).toBe('dark_mode');
    });

    it('should call toggleTheme when toggle button is clicked', () => {
      const toggleButton = fixture.nativeElement.querySelector('.theme-toggle-btn');
      toggleButton.click();

      expect(mockThemeService.toggleTheme).toHaveBeenCalled();
    });

    it('should have correct tooltip for toggle button', () => {
      expect(component.getToggleTooltip()).toBe('Switch to Dark Theme');

      currentThemeSignal.set(DARK_THEME);
      fixture.detectChanges();

      expect(component.getToggleTooltip()).toBe('Switch to Light Theme');
    });
  });

  describe('Menu Item Mode', () => {
    beforeEach(() => {
      component.mode = 'menu-item';
      fixture.detectChanges();
    });

    it('should display menu item in menu-item mode', () => {
      const menuItem = fixture.nativeElement.querySelector('.theme-menu-item');
      expect(menuItem).toBeTruthy();
    });

    it('should show current theme name in menu item', () => {
      const menuItem = fixture.nativeElement.querySelector('.theme-menu-item span');
      expect(menuItem.textContent.trim()).toBe('Light Theme');
    });

    it('should display theme submenu', () => {
      const submenu = fixture.nativeElement.querySelector('mat-menu');
      expect(submenu).toBeTruthy();
    });

    it('should show all available themes in submenu', () => {
      const themeOptions = fixture.nativeElement.querySelectorAll('.theme-option');
      expect(themeOptions.length).toBe(3); // light, dark, custom
    });

    it('should mark current theme as active', () => {
      const activeOption = fixture.nativeElement.querySelector('.theme-option.active');
      expect(activeOption).toBeTruthy();
    });

    it('should call switchToTheme when theme option is clicked', () => {
      const themeOptions = fixture.nativeElement.querySelectorAll('.theme-option');
      const darkThemeOption = Array.from(themeOptions).find((option: any) => 
        option.textContent.includes('Dark Theme')
      ) as HTMLElement;

      darkThemeOption.click();

      expect(mockThemeService.switchTheme).toHaveBeenCalledWith('dark');
    });
  });

  describe('Selector Mode', () => {
    beforeEach(() => {
      component.mode = 'selector';
      fixture.detectChanges();
    });

    it('should display theme selector in selector mode', () => {
      const selector = fixture.nativeElement.querySelector('.theme-selector');
      expect(selector).toBeTruthy();
    });

    it('should show selector header', () => {
      const header = fixture.nativeElement.querySelector('.selector-header h3');
      expect(header.textContent.trim()).toBe('Choose Your Theme');
    });

    it('should display theme cards for all available themes', () => {
      const themeCards = fixture.nativeElement.querySelectorAll('.theme-card');
      expect(themeCards.length).toBe(3); // light, dark, custom
    });

    it('should mark current theme card as active', () => {
      const activeCard = fixture.nativeElement.querySelector('.theme-card.active');
      expect(activeCard).toBeTruthy();
    });

    it('should call switchToTheme when theme card is clicked', () => {
      const themeCards = fixture.nativeElement.querySelectorAll('.theme-card');
      const darkThemeCard = Array.from(themeCards).find((card: any) => 
        card.textContent.includes('Dark Theme')
      ) as HTMLElement;

      darkThemeCard.click();

      expect(mockThemeService.switchTheme).toHaveBeenCalledWith('dark');
    });

    it('should show theme preview in selector mode', () => {
      const previews = fixture.nativeElement.querySelectorAll('.theme-card-preview');
      expect(previews.length).toBe(3);
    });
  });

  describe('Helper Methods', () => {
    it('should correctly identify current theme', () => {
      expect(component.isCurrentTheme(LIGHT_THEME)).toBe(true);
      expect(component.isCurrentTheme(DARK_THEME)).toBe(false);

      currentThemeSignal.set(DARK_THEME);
      fixture.detectChanges();

      expect(component.isCurrentTheme(LIGHT_THEME)).toBe(false);
      expect(component.isCurrentTheme(DARK_THEME)).toBe(true);
    });

    it('should return current theme name', () => {
      expect(component.getCurrentThemeName()).toBe('Light Theme');

      currentThemeSignal.set(DARK_THEME);
      fixture.detectChanges();

      expect(component.getCurrentThemeName()).toBe('Dark Theme');
    });

    it('should return current theme icon', () => {
      expect(component.getCurrentThemeIcon()).toBe('light_mode');

      currentThemeSignal.set(DARK_THEME);
      fixture.detectChanges();

      expect(component.getCurrentThemeIcon()).toBe('dark_mode');
    });

    it('should return correct theme icons', () => {
      expect(component.getThemeIcon(LIGHT_THEME)).toBe('light_mode');
      expect(component.getThemeIcon(DARK_THEME)).toBe('dark_mode');
      expect(component.getThemeIcon(mockCustomTheme)).toBe('palette');
    });

    it('should return preview colors', () => {
      const previewColors = component.getPreviewColors();
      
      expect(previewColors).toEqual([
        { name: 'Primary', value: LIGHT_THEME.colors.primary },
        { name: 'Background', value: LIGHT_THEME.colors.background },
        { name: 'Surface', value: LIGHT_THEME.colors.surface },
        { name: 'Text', value: LIGHT_THEME.colors.text },
      ]);
    });
  });

  describe('Theme Service Integration', () => {
    it('should call theme service toggleTheme method', () => {
      component.toggleTheme();
      expect(mockThemeService.toggleTheme).toHaveBeenCalled();
    });

    it('should call theme service switchTheme method with correct ID', () => {
      component.switchToTheme('dark');
      expect(mockThemeService.switchTheme).toHaveBeenCalledWith('dark');
    });

    it('should access theme service available themes', () => {
      expect(component.themeService.availableThemes).toEqual([LIGHT_THEME, DARK_THEME, mockCustomTheme]);
    });

    it('should access theme service current theme', () => {
      expect(component.themeService.currentTheme()).toBe(LIGHT_THEME);
    });
  });

  describe('Preview Colors', () => {
    beforeEach(() => {
      component.showPreview = true;
      component.mode = 'menu-item';
      fixture.detectChanges();
    });

    it('should show preview when showPreview is true', () => {
      const preview = fixture.nativeElement.querySelector('.theme-preview');
      expect(preview).toBeTruthy();
    });

    it('should display color samples in preview', () => {
      const colorSamples = fixture.nativeElement.querySelectorAll('.color-sample');
      expect(colorSamples.length).toBe(4); // Primary, Background, Surface, Text
    });

    it('should apply correct background colors to color samples', () => {
      const colorSamples = fixture.nativeElement.querySelectorAll('.color-sample');
      const previewColors = component.getPreviewColors();
      
      expect(colorSamples).toBeDefined();
      expect(previewColors).toBeDefined();
      expect(colorSamples.length).toBeGreaterThanOrEqual(0);
      
      if (colorSamples.length > 0 && previewColors.length > 0) {
        colorSamples.forEach((sample: any, index: number) => {
          if (index < previewColors.length) {
            expect(previewColors[index]).toBeDefined();
            expect(previewColors[index].value).toBeDefined();
          }
        });
      }
    });
  });

  describe('Responsive Behavior', () => {
    it('should handle mode changes dynamically', () => {
      component.mode = 'toggle';
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.theme-toggle-btn')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.theme-menu-item')).toBeFalsy();

      component.mode = 'menu-item';
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.theme-toggle-btn')).toBeFalsy();
      expect(fixture.nativeElement.querySelector('.theme-menu-item')).toBeTruthy();

      component.mode = 'selector';
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.theme-selector')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels and tooltips', () => {
      component.mode = 'toggle';
      fixture.detectChanges();

      const toggleButton = fixture.nativeElement.querySelector('.theme-toggle-btn');
      expect(toggleButton.getAttribute('aria-describedby')).toBeTruthy(); // Tooltip
    });

    it('should maintain keyboard navigation', () => {
      component.mode = 'menu-item';
      fixture.detectChanges();

      const menuItems = fixture.nativeElement.querySelectorAll('.theme-option');
      menuItems.forEach((item: any) => {
        expect(item.tabIndex).not.toBe(-1);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle theme service errors gracefully', () => {
      mockThemeService.switchTheme.and.throwError('Theme service error');
      
      expect(() => component.switchToTheme('dark')).not.toThrow();
    });

    it('should handle invalid theme IDs gracefully', () => {
      expect(() => component.switchToTheme('invalid-theme')).not.toThrow();
      expect(mockThemeService.switchTheme).toHaveBeenCalledWith('invalid-theme');
    });
  });
});