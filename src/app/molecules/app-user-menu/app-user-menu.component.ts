import { Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { LoggedInUserService } from '../../services/logged-in-user.service';
import { AppUserAvatarComponent } from '../../atoms/app-user-avatar/app-user-avatar.component';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIconModule, MatDividerModule, AppUserAvatarComponent],
  template: `
    <div class="user-menu">
      <button mat-button [matMenuTriggerFor]="userMenu" class="user-button">
        <div class="user-info">
          <div class="user-avatar">SJ</div>
          <div class="user-details">
            <span class="user-name">Suhaib Janjua</span>
            <span class="user-role">Administrator</span>
          </div>
          <mat-icon class="dropdown-icon">keyboard_arrow_down</mat-icon>
        </div>
      </button>
      
      <mat-menu #userMenu="matMenu" class="user-dropdown">
        <button mat-menu-item (click)="navigateToProfile()">
          <mat-icon>person</mat-icon>
          <span>My Profile</span>
        </button>
        
        <button mat-menu-item (click)="navigateToSettings()">
          <mat-icon>settings</mat-icon>
          <span>Settings</span>
        </button>
        
        <button mat-menu-item (click)="changePassword()">
          <mat-icon>lock_reset</mat-icon>
          <span>Change Password</span>
        </button>
        
        <button mat-menu-item (click)="selectLanguage()">
          <mat-icon>language</mat-icon>
          <span>Select Language</span>
        </button>
        
        <button mat-menu-item (click)="changeTheme()">
          <mat-icon>palette</mat-icon>
          <span>Change Theme</span>
        </button>
        
        <mat-divider></mat-divider>
        
        <button mat-menu-item (click)="deleteAccount()" class="danger-item">
          <mat-icon>delete_forever</mat-icon>
          <span>Delete Your Account</span>
        </button>
        
        <button mat-menu-item (click)="logout()" class="danger-item">
          <mat-icon>logout</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
    </div>
  `,
  styleUrl: './app-user-menu.component.scss'
})
export class AppUserMenuComponent {
  readonly loggedInUserService = inject(LoggedInUserService);
  readonly router = inject(Router);

  navigateToProfile() {
    console.log('Navigate to profile');
    this.router.navigate(['/profile']);
  }

  navigateToSettings() {
    console.log('Navigate to settings');
    this.router.navigate(['/settings']);
  }

  changePassword() {
    console.log('Navigate to change password');
    this.router.navigate(['/change-password']);
  }

  selectLanguage() {
    console.log('Navigate to language selector');
    this.router.navigate(['/select-language']);
  }

  changeTheme() {
    console.log('Navigate to theme selector');
    this.router.navigate(['/change-theme']);
  }

  deleteAccount() {
    console.log('Navigate to delete account');
    this.router.navigate(['/delete-account']);
  }

  logout() {
    console.log('Logging out...');
    // Implement logout logic here
    // this.authService.logout();
    this.router.navigate(['/login']);
  }
}