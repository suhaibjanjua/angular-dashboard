import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ImageUploadDialogComponent } from '../../dialogs/image-upload-dialog/image-upload-dialog.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
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
            <div class="form-grid">
              <mat-form-field appearance="outline">
                <mat-label>First Name</mat-label>
                <input matInput [(ngModel)]="profile.firstName" placeholder="Enter your first name">
                <mat-icon matSuffix>person</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Last Name</mat-label>
                <input matInput [(ngModel)]="profile.lastName" placeholder="Enter your last name">
                <mat-icon matSuffix>person_outline</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Email Address</mat-label>
                <input matInput type="email" [(ngModel)]="profile.email" placeholder="Enter your email">
                <mat-icon matSuffix>email</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Phone Number</mat-label>
                <input matInput [(ngModel)]="profile.phone" placeholder="Enter your phone number">
                <mat-icon matSuffix>phone</mat-icon>
              </mat-form-field>
            </div>
          </mat-card-content>
          <mat-card-actions align="end">
            <button mat-stroked-button (click)="cancel()">
              <mat-icon>cancel</mat-icon>
              Cancel
            </button>
            <button mat-flat-button color="primary" (click)="saveProfile()">
              <mat-icon>save</mat-icon>
              Save Changes
            </button>
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
                <div class="avatar-placeholder">
                  @if(userPicture) {
                  <img [src]="userPicture" alt="Avatar">
                  } @else {
                  {{ profile.firstName.charAt(0) }}{{ profile.lastName.charAt(0) }}
                  }
                </div>
              </div>
              <div class="avatar-actions">
                <button mat-flat-button color="primary" (click)="uploadAvatar()">
                  <mat-icon>upload</mat-icon>
                  Upload New Photo
                </button>
                <button mat-stroked-button color="warn" (click)="removeAvatar()">
                  <mat-icon>delete</mat-icon>
                  Remove Photo
                </button>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./app-profile-page.component.scss']
})
export class AppProfilePageComponent {
  readonly dialog = inject(MatDialog);

  userPicture: string | null = null;

  profile = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567'
  };

  saveProfile() {
    console.log('Saving profile:', this.profile);
    // Implement save logic here
  }

  cancel() {
    console.log('Cancelling profile changes');
    // Reset form or navigate back
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
        this.userPicture = result;
      }
    });
  }

  removeAvatar() {
    console.log('Removing avatar');
    // Implement avatar removal logic
    this.userPicture = null;
  }
}