import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppChangePasswordPageComponent } from './app-change-password-page.component';

describe('AppChangePasswordPageComponent', () => {
  let component: AppChangePasswordPageComponent;
  let fixture: ComponentFixture<AppChangePasswordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppChangePasswordPageComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AppChangePasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display page title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Change Password');
  });

  it('should initialize form with empty values', () => {
    expect(component.passwordForm.get('currentPassword')?.value).toBe('');
    expect(component.passwordForm.get('newPassword')?.value).toBe('');
    expect(component.passwordForm.get('confirmPassword')?.value).toBe('');
  });

  it('should handle password change when form is valid', () => {
    spyOn(console, 'log');
    component.passwordForm.patchValue({
      currentPassword: 'oldpass',
      newPassword: 'newpass123',
      confirmPassword: 'newpass123'
    });
    component.changePassword();
    expect(console.log).toHaveBeenCalledWith('Changing password:', component.passwordForm.value);
  });

  it('should handle cancel action', () => {
    spyOn(console, 'log');
    spyOn(component.passwordForm, 'reset');
    component.cancel();
    expect(console.log).toHaveBeenCalledWith('Cancelling password change');
    expect(component.passwordForm.reset).toHaveBeenCalled();
  });

  it('should validate password match', () => {
    component.passwordForm.patchValue({
      currentPassword: 'oldpass',
      newPassword: 'newpass123',
      confirmPassword: 'differentpass'
    });
    expect(component.passwordForm.hasError('passwordMismatch')).toBeTruthy();

    component.passwordForm.patchValue({
      confirmPassword: 'newpass123'
    });
    expect(component.passwordForm.hasError('passwordMismatch')).toBeFalsy();
  });

  it('should require all password fields', () => {
    expect(component.passwordForm.get('currentPassword')?.hasError('required')).toBeTruthy();
    expect(component.passwordForm.get('newPassword')?.hasError('required')).toBeTruthy();
    expect(component.passwordForm.get('confirmPassword')?.hasError('required')).toBeTruthy();
  });

  it('should validate new password minimum length', () => {
    const newPasswordControl = component.passwordForm.get('newPassword');
    newPasswordControl?.setValue('short');
    expect(newPasswordControl?.hasError('minlength')).toBeTruthy();

    newPasswordControl?.setValue('validpassword');
    expect(newPasswordControl?.hasError('minlength')).toBeFalsy();
  });

  it('should toggle password visibility', () => {
    expect(component.hideCurrentPassword).toBeTruthy();
    component.hideCurrentPassword = !component.hideCurrentPassword;
    expect(component.hideCurrentPassword).toBeFalsy();

    expect(component.hideNewPassword).toBeTruthy();
    component.hideNewPassword = !component.hideNewPassword;
    expect(component.hideNewPassword).toBeFalsy();

    expect(component.hideConfirmPassword).toBeTruthy();
    component.hideConfirmPassword = !component.hideConfirmPassword;
    expect(component.hideConfirmPassword).toBeFalsy();
  });

  it('should have form controls for all required fields', () => {
    expect(component.passwordForm.get('currentPassword')).toBeTruthy();
    expect(component.passwordForm.get('newPassword')).toBeTruthy();
    expect(component.passwordForm.get('confirmPassword')).toBeTruthy();
  });
});