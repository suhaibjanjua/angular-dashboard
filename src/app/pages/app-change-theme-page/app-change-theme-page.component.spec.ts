import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppChangeThemePageComponent } from './app-change-theme-page.component';
import { ThemeService } from '../../services/theme.service';
import { signal } from '@angular/core';

describe('AppChangeThemePageComponent', () => {
  let component: AppChangeThemePageComponent;
  let fixture: ComponentFixture<AppChangeThemePageComponent>;
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
      imports: [AppChangeThemePageComponent, NoopAnimationsModule],
      providers: [
        { provide: ThemeService, useValue: themeServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppChangeThemePageComponent);
    component = fixture.componentInstance;
    mockThemeService = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display page title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Theme Settings');
  });

  it('should display page subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.page-subtitle')?.textContent)
      .toContain('Customize the appearance of your dashboard');
  });

  it('should contain theme selector card', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const selectorCard = compiled.querySelector('.theme-selector-card');
    expect(selectorCard).toBeTruthy();
  });

  it('should contain theme info card', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const infoCard = compiled.querySelector('.theme-info-card');
    expect(infoCard).toBeTruthy();
  });

  it('should display theme switcher in selector mode', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const themeSwitcher = compiled.querySelector('app-theme-switcher[mode="selector"]');
    expect(themeSwitcher).toBeTruthy();
  });

  it('should display theme features section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Theme Features');
  });

  it('should display eye comfort feature', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Eye Comfort');
    expect(compiled.textContent).toContain('Designed to reduce eye strain');
  });

  it('should display accessibility feature', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Accessibility');
    expect(compiled.textContent).toContain('WCAG compliant color schemes');
  });

  it('should display device sync feature', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Device Sync');
    expect(compiled.textContent).toContain('Theme preferences sync across all your devices');
  });

  it('should have proper CSS classes for styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.theme-page')).toBeTruthy();
    expect(compiled.querySelector('.page-header')).toBeTruthy();
    expect(compiled.querySelector('.theme-content')).toBeTruthy();
  });

  it('should display mat-cards with proper styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('mat-card');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should display material icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const icons = compiled.querySelectorAll('mat-icon');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('should be responsive layout', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const themeContent = compiled.querySelector('.theme-content');
    expect(themeContent).toBeTruthy();
    // The grid layout should be applied via CSS
  });
});