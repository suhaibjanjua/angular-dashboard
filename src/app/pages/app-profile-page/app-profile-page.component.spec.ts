import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AppProfilePageComponent } from './app-profile-page.component';

describe('AppProfilePageComponent', () => {
  let component: AppProfilePageComponent;
  let fixture: ComponentFixture<AppProfilePageComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AppProfilePageComponent, NoopAnimationsModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppProfilePageComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user profile information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('My Profile');
    // The user is 'Suhaib JANJUA' so initials should be 'SJ'
    expect(compiled.textContent).toContain('SJ');
  });

  it('should handle profile save', () => {
    spyOn(console, 'log');
    component.saveProfile();
    expect(console.log).toHaveBeenCalledWith('Saving profile:', component.loggedInUserService.snapshot);
  });

  it('should handle avatar upload', () => {
    spyOn(console, 'log');
    component.uploadAvatar();
    expect(console.log).toHaveBeenCalledWith('Uploading new avatar');
  });

  it('should open image upload dialog for avatar upload', () => {
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => ({ subscribe: jasmine.createSpy() })
    } as any);
    
    component.uploadAvatar();
    
    expect(component.dialog.open).toHaveBeenCalled();
  });

  it('should handle dialog result after avatar upload', () => {
    const mockResult = 'data:image/png;base64,mockImageData';
    spyOn(console, 'log');
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => ({ 
        subscribe: (callback: any) => callback(mockResult)
      })
    } as any);
    
    component.uploadAvatar();
    
    expect(console.log).toHaveBeenCalledWith('Avatar uploaded:', mockResult);
  });

  it('should not process result if dialog is cancelled', () => {
    spyOn(console, 'log');
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => ({ 
        subscribe: (callback: any) => callback(null)
      })
    } as any);
    
    component.uploadAvatar();
    
    expect(console.log).toHaveBeenCalledWith('Uploading new avatar');
    expect(console.log).not.toHaveBeenCalledWith(jasmine.stringMatching('Avatar uploaded:'));
  });

  it('should configure dialog with correct options', () => {
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => ({ subscribe: jasmine.createSpy() })
    } as any);
    
    component.uploadAvatar();
    
    expect(component.dialog.open).toHaveBeenCalledWith(
      jasmine.any(Function),
      jasmine.objectContaining({
        disableClose: true,
        autoFocus: false,
        data: jasmine.objectContaining({
          mode: 'upload',
          userId: '12345'
        })
      })
    );
  });

  it('should handle avatar removal', () => {
    spyOn(console, 'log');
    component.removeAvatar();
    expect(console.log).toHaveBeenCalledWith('Removing avatar');
  });

  it('should handle cancel action', () => {
    spyOn(console, 'log');
    component.cancel();
    expect(console.log).toHaveBeenCalledWith('Cancelling profile changes');
  });

  it('should initialize form with user data', () => {
    // Form should be initialized with user service data
    expect(component.form).toBeDefined();
    expect(component.form.get('firstName')).toBeDefined();
    expect(component.form.get('lastName')).toBeDefined();
    expect(component.form.get('email')).toBeDefined();
    expect(component.form.get('phone')).toBeDefined();
  });

  it('should have form controls with validation', () => {
    // Clear the form values to test required validation
    component.form.patchValue({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
    
    expect(component.form.get('firstName')?.hasError('required')).toBe(true);
    expect(component.form.get('lastName')?.hasError('required')).toBe(true);
    expect(component.form.get('email')?.hasError('required')).toBe(true);
    expect(component.form.get('phone')?.hasError('required')).toBe(true);
  });

  it('should validate email format', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBe(true);
    
    emailControl?.setValue('valid@email.com');
    expect(emailControl?.hasError('email')).toBe(false);
  });
});