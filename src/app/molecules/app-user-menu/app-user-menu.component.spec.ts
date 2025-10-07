import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AppUserMenuComponent } from './app-user-menu.component';

describe('AppUserMenuComponent', () => {
  let component: AppUserMenuComponent;
  let fixture: ComponentFixture<AppUserMenuComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AppUserMenuComponent, NoopAnimationsModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppUserMenuComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.user-avatar')?.textContent).toContain('SJ');
    expect(compiled.querySelector('.user-name')?.textContent).toContain('Suhaib JANJUA');
    expect(compiled.querySelector('.user-role')?.textContent).toContain('Administrator');
  });

  it('should navigate to profile page', () => {
    spyOn(console, 'log');
    component.navigateToProfile();
    expect(console.log).toHaveBeenCalledWith('Navigate to profile');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/profile']);
  });

  it('should navigate to settings page', () => {
    spyOn(console, 'log');
    component.navigateToSettings();
    expect(console.log).toHaveBeenCalledWith('Navigate to settings');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/settings']);
  });

  it('should navigate to change password page', () => {
    spyOn(console, 'log');
    component.changePassword();
    expect(console.log).toHaveBeenCalledWith('Navigate to change password');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/change-password']);
  });

  it('should navigate to language selector', () => {
    spyOn(console, 'log');
    component.selectLanguage();
    expect(console.log).toHaveBeenCalledWith('Navigate to language selector');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/select-language']);
  });

  it('should navigate to theme selector', () => {
    spyOn(console, 'log');
    component.changeTheme();
    expect(console.log).toHaveBeenCalledWith('Navigate to theme settings');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/change-theme']);
  });

  it('should navigate to delete account page', () => {
    spyOn(console, 'log');
    component.deleteAccount();
    expect(console.log).toHaveBeenCalledWith('Navigate to delete account');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/delete-account']);
  });

  it('should handle logout', () => {
    spyOn(console, 'log');
    component.logout();
    expect(console.log).toHaveBeenCalledWith('Logging out...');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should have user menu button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.user-button')).toBeTruthy();
    expect(compiled.querySelector('.dropdown-icon')).toBeTruthy();
  });
});