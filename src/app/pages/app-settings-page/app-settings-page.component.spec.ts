import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppSettingsPageComponent } from './app-settings-page.component';

describe('AppSettingsPageComponent', () => {
  let component: AppSettingsPageComponent;
  let fixture: ComponentFixture<AppSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSettingsPageComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AppSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display page title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Settings');
  });

  it('should initialize with default settings', () => {
    expect(component.settings.emailNotifications).toBeTruthy();
    expect(component.settings.pushNotifications).toBeFalsy();
    expect(component.settings.weeklyReports).toBeTruthy();
    expect(component.settings.language).toBe('en');
    expect(component.settings.theme).toBe('light');
    expect(component.settings.timezone).toBe('UTC+5');
    expect(component.settings.twoFactorAuth).toBeFalsy();
    expect(component.settings.activityTracking).toBeTruthy();
  });

  it('should handle save settings', () => {
    spyOn(console, 'log');
    component.saveSettings();
    expect(console.log).toHaveBeenCalledWith('Saving settings:', component.settings);
  });

  it('should reset to defaults', () => {
    spyOn(console, 'log');
    component.settings.emailNotifications = false;
    component.settings.language = 'es';
    
    component.resetToDefaults();
    
    expect(console.log).toHaveBeenCalledWith('Resetting to defaults');
    expect(component.settings.emailNotifications).toBeTruthy();
    expect(component.settings.language).toBe('en');
  });

  it('should handle data export', () => {
    spyOn(console, 'log');
    component.exportData();
    expect(console.log).toHaveBeenCalledWith('Exporting user data');
  });

  it('should have settings object with all required properties', () => {
    expect(component.settings.emailNotifications).toBeDefined();
    expect(component.settings.pushNotifications).toBeDefined();
    expect(component.settings.weeklyReports).toBeDefined();
    expect(component.settings.language).toBeDefined();
    expect(component.settings.theme).toBeDefined();
    expect(component.settings.timezone).toBeDefined();
    expect(component.settings.twoFactorAuth).toBeDefined();
    expect(component.settings.activityTracking).toBeDefined();
  });

  it('should display notification settings cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.notifications-card')).toBeTruthy();
    expect(compiled.querySelector('.preferences-card')).toBeTruthy();
    expect(compiled.querySelector('.privacy-card')).toBeTruthy();
  });
});