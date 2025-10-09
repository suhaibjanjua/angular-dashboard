import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppPageHeaderCardComponent } from '../../molecules/app-page-header-card/app-page-header-card.component';
import { AppButtonComponent } from '../../atoms/app-button/app-button.component';

@Component({
  selector: 'app-change-password-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AppPageHeaderCardComponent,
    AppButtonComponent
  ],
  template: `
    <div class="change-password-page">
      <app-page-header-card [title]="'Change Password'" [subtitle]="'Update your account password for enhanced security'"></app-page-header-card>

      <div class="password-content">
        <mat-card class="password-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>lock_reset</mat-icon>
              Password Settings
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <form [formGroup]="passwordForm" (ngSubmit)="changePassword()">
              <mat-form-field appearance="outline">
                <mat-label>Current Password</mat-label>
                <input 
                  matInput 
                  [type]="hideCurrentPassword ? 'password' : 'text'" 
                  formControlName="currentPassword"
                  placeholder="Enter your current password">
                <button 
                  mat-icon-button 
                  matSuffix 
                  type="button"
                  (click)="hideCurrentPassword = !hideCurrentPassword">
                  <mat-icon>{{hideCurrentPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
                <mat-error *ngIf="passwordForm.get('currentPassword')?.hasError('required')">
                  Current password is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>New Password</mat-label>
                <input 
                  matInput 
                  [type]="hideNewPassword ? 'password' : 'text'" 
                  formControlName="newPassword"
                  placeholder="Enter your new password">
                <button 
                  mat-icon-button 
                  matSuffix 
                  type="button"
                  (click)="hideNewPassword = !hideNewPassword">
                  <mat-icon>{{hideNewPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
                <mat-error *ngIf="passwordForm.get('newPassword')?.hasError('required')">
                  New password is required
                </mat-error>
                <mat-error *ngIf="passwordForm.get('newPassword')?.hasError('minlength')">
                  Password must be at least 8 characters long
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Confirm New Password</mat-label>
                <input 
                  matInput 
                  [type]="hideConfirmPassword ? 'password' : 'text'" 
                  formControlName="confirmPassword"
                  placeholder="Confirm your new password">
                <button 
                  mat-icon-button 
                  matSuffix 
                  type="button"
                  (click)="hideConfirmPassword = !hideConfirmPassword">
                  <mat-icon>{{hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
                <mat-error *ngIf="passwordForm.get('confirmPassword')?.hasError('required')">
                  Password confirmation is required
                </mat-error>
                <mat-error *ngIf="passwordForm.hasError('passwordMismatch')">
                  Passwords do not match
                </mat-error>
              </mat-form-field>
            </form>
          </mat-card-content>
          <mat-card-actions align="end">
            <app-button label="Cancel" color="primary" type="button" (click)="cancel()" variant="stroked" icon="cancel"></app-button>
            <app-button label="Update Password" color="primary" type="submit" (click)="changePassword()" variant="flat" icon="save"></app-button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="security-tips-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>security</mat-icon>
              Security Tips
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="security-tips">
              <div class="tip-item">
                <mat-icon>check_circle</mat-icon>
                <span>Use at least 8 characters</span>
              </div>
              <div class="tip-item">
                <mat-icon>check_circle</mat-icon>
                <span>Include uppercase and lowercase letters</span>
              </div>
              <div class="tip-item">
                <mat-icon>check_circle</mat-icon>
                <span>Add numbers and special characters</span>
              </div>
              <div class="tip-item">
                <mat-icon>check_circle</mat-icon>
                <span>Avoid common words or phrases</span>
              </div>
              <div class="tip-item">
                <mat-icon>check_circle</mat-icon>
                <span>Don't reuse passwords from other accounts</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./app-change-password-page.component.scss']
})
export class AppChangePasswordPageComponent {
  passwordForm: FormGroup;
  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    return newPassword && confirmPassword && newPassword.value !== confirmPassword.value 
      ? { passwordMismatch: true } : null;
  }

  changePassword() {
    if (this.passwordForm.valid) {
      console.log('Changing password:', this.passwordForm.value);
      // Implement password change logic here
    }
  }

  cancel() {
    console.log('Cancelling password change');
    this.passwordForm.reset();
  }
}