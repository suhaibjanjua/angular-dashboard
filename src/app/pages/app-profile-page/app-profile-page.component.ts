import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ImageUploadDialogComponent } from '../../dialogs/image-upload-dialog/image-upload-dialog.component';
import { AppUserAvatarComponent } from '../../atoms/app-user-avatar/app-user-avatar.component';
import { LoggedInUserService } from '../../services/logged-in-user.service';
import { AppButtonComponent } from '../../atoms/app-button/app-button.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AppUserAvatarComponent,
    AppButtonComponent
  ],
  template: `
    <div class="profile-page">
      <div class="page-header">
        <h1>My Profile</h1>
        <p class="page-subtitle">Manage your personal information and account settings</p>
      </div>

      <div class="profile-content">
        <mat-card class="profile-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>person</mat-icon>
              Personal Information
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="form-grid" [formGroup]="form">
              <mat-form-field appearance="outline">
                <mat-label>First Name</mat-label>
                <input matInput formControlName="firstName" placeholder="Enter your first name">
                <mat-icon matSuffix>person</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Last Name</mat-label>
                <input matInput formControlName="lastName" placeholder="Enter your last name">
                <mat-icon matSuffix>person_outline</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Email Address</mat-label>
                <input matInput type="email" formControlName="email" placeholder="Enter your email">
                <mat-icon matSuffix>email</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Phone Number</mat-label>
                <input matInput formControlName="phone" placeholder="Enter your phone number">
                <mat-icon matSuffix>phone</mat-icon>
              </mat-form-field>
            </div>
          </mat-card-content>
          <mat-card-actions align="end">
            <app-button label="Cancel" color="primary" type="button" (click)="cancel()" variant="stroked" icon="cancel"></app-button>
            <app-button label="Save Changes" color="primary" type="button" (click)="saveProfile()" variant="flat" icon="save"></app-button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="avatar-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>photo_camera</mat-icon>
              Profile Picture
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="avatar-section">
              <div class="current-avatar">
                <app-user-avatar [src]="loggedInUserService.image()" [fullName]="loggedInUserService.fullName()" />
              </div>

              <div class="avatar-actions">
                <app-button label="Upload New Photo" color="primary" type="button" (click)="uploadAvatar()" variant="flat" icon="upload"></app-button>
                <app-button label="Remove Photo" color="primary" type="button" (click)="removeAvatar()" variant="stroked" icon="delete"></app-button>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./app-profile-page.component.scss']
})
export class AppProfilePageComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly loggedInUserService = inject(LoggedInUserService);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    firstName: this.fb.control<string>('', [Validators.required]),
    lastName: this.fb.control<string>('', [Validators.required]),
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
    phone: this.fb.control<string>('', [Validators.required]),
  });


  ngOnInit() {
    const user = this.loggedInUserService.snapshot;
    if (user) this.form.patchValue(user);
  }

  saveProfile() {
    console.log('Saving profile:', this.loggedInUserService.snapshot);
    if (this.form.valid) {
      const { firstName, lastName, email, phone } = this.form.value;

      this.loggedInUserService.updateUser({
        firstName: firstName ?? undefined,
        lastName: lastName ?? undefined,
        email: email ?? undefined,
        phone: phone ?? undefined
      });
    }
  }

  cancel() {
    console.log('Cancelling profile changes');
    this.loggedInUserService.snapshot && this.form.patchValue(this.loggedInUserService.snapshot);
  }

  uploadAvatar() {
    console.log('Uploading new avatar');
    // Implement avatar upload logic
    const dialogRef = this.dialog.open(ImageUploadDialogComponent, {
      // width: '600px',
      // height: 'auto',
      // minHeight: '400px',
      // maxHeight: '90vh',
      // panelClass: 'custom-dialog-container',
      // backdropClass: 'custom-backdrop',
      disableClose: true,
      autoFocus: false,
      data: {
        mode: 'upload', // or 'capture', 'drag-drop'
        userId: '12345'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Avatar uploaded:', result);
        this.loggedInUserService.updateUser({
          avatar: result
        });
      }
    });
  }

  removeAvatar() {
    console.log('Removing avatar');
    // Implement avatar removal logic
    this.loggedInUserService.updateUser({
      avatar: undefined
    });
  }
}