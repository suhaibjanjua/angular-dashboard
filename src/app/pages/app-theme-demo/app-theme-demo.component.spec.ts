import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppThemeDemoComponent } from './app-theme-demo.component';
import { ThemeService } from '../../services/theme.service';
import { signal } from '@angular/core';

describe('AppThemeDemoComponent', () => {
  let component: AppThemeDemoComponent;
  let fixture: ComponentFixture<AppThemeDemoComponent>;
  let mockThemeService: jasmine.SpyObj<ThemeService>;

  beforeEach(async () => {
    const themeServiceSpy = jasmine.createSpyObj('ThemeService', [
      'switchTheme', 
      'toggleTheme',
      'isDarkTheme',
      'isLightTheme'
    ], {
      availableThemes: [],
      currentTheme: signal({ id: 'light', displayName: 'Light Theme' })
    });

    await TestBed.configureTestingModule({
      imports: [AppThemeDemoComponent, NoopAnimationsModule],
      providers: [
        { provide: ThemeService, useValue: themeServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppThemeDemoComponent);
    component = fixture.componentInstance;
    mockThemeService = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display page title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-card-title')?.textContent).toContain('Theme Switcher Demo');
  });

  it('should display page subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-card-subtitle')?.textContent)
      .toContain('Test all three modes of the theme switcher');
  });

  it('should display toggle mode section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Toggle Mode');
    expect(compiled.textContent).toContain('Simple toggle button for light/dark switching');
  });

  it('should display menu item mode section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Menu Item Mode');
    expect(compiled.textContent).toContain('This mode is used in the user menu dropdown');
  });

  it('should display selector mode section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Selector Mode');
    expect(compiled.textContent).toContain('Full theme selector for settings pages');
  });

  it('should contain theme switcher in toggle mode', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const toggleSwitcher = compiled.querySelector('app-theme-switcher[mode="toggle"]');
    expect(toggleSwitcher).toBeTruthy();
  });

  it('should contain theme switcher in selector mode', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const selectorSwitcher = compiled.querySelector('app-theme-switcher[mode="selector"]');
    expect(selectorSwitcher).toBeTruthy();
  });

  it('should have proper CSS classes for styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.theme-demo')).toBeTruthy();
    expect(compiled.querySelector('.demo-card')).toBeTruthy();
  });

  it('should display demo sections with dividers', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dividers = compiled.querySelectorAll('mat-divider');
    expect(dividers.length).toBeGreaterThan(0);
  });

  it('should display demo components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const demoComponents = compiled.querySelectorAll('.demo-component');
    expect(demoComponents.length).toBeGreaterThan(0);
  });

  it('should display mat-card with proper structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-card')).toBeTruthy();
    expect(compiled.querySelector('mat-card-header')).toBeTruthy();
    expect(compiled.querySelector('mat-card-content')).toBeTruthy();
  });

  it('should display section headings', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headings = compiled.querySelectorAll('h3');
    expect(headings.length).toBeGreaterThanOrEqual(3); // Toggle, Menu Item, Selector modes
  });

  it('should provide information about user menu dropdown', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Click on your avatar in the header to see it in action');
  });

  it('should be a demo/testing component', () => {
    // This component should be standalone and not have complex logic
    expect(component.constructor.name).toBe('AppThemeDemoComponent');
  });

  it('should display content explaining each mode', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const demoSections = compiled.querySelectorAll('.demo-section');
    expect(demoSections.length).toBeGreaterThanOrEqual(3);
  });

  it('should be responsive layout', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const themeDemo = compiled.querySelector('.theme-demo');
    expect(themeDemo).toBeTruthy();
    // The responsive layout should be handled via CSS
  });
});