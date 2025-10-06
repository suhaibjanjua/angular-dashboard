import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User, UserStatus, UserRole, UserStatusCssClassMap, UserRoleCssClassMap, StatusIconMap } from '../../models';
import { AppSearchBarComponent } from '../../molecules/app-search-bar/app-search-bar.component';
import { debounceTime, Subject } from 'rxjs';
import { AppUserAvatarComponent } from '../../atoms/app-user-avatar/app-user-avatar.component';
import { ActionMenuItem } from '../../models/action.menu.model';
import { AppActionMenuComponent } from '../../molecules/app-action-menu/app-action-menu.component';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatSnackBarModule,
    FormsModule,
    AppSearchBarComponent,
    ReactiveFormsModule,
    AppUserAvatarComponent,
    AppActionMenuComponent
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Users</h1>
        <p class="page-subtitle">Manage system users and their permissions</p>
      </div>

      <mat-card class="content-card">
        <mat-card-header>
          <div class="table-header">
            <form [formGroup]="form">
              <app-search-bar
                formControlName="searchTerm"
                [label]="'Search users...'"
                [placeholder]="'Search by name, email, or role'">
              </app-search-bar>
            </form>
            
            <div class="action-buttons">
              <button mat-flat-button color="primary" (click)="addUser()">
                <mat-icon>add</mat-icon>
                Add User
              </button>
              <button mat-stroked-button (click)="exportUsers()">
                <mat-icon>file_download</mat-icon>
                Export
              </button>
            </div>
          </div>
        </mat-card-header>

        <mat-card-content>
          <div class="table-container">
            <table mat-table [dataSource]="filteredUsers" matSort class="users-table">
              
              <!-- Name Column -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
                <td mat-cell *matCellDef="let user">
                  <div class="user-info">
                    <div class="user-avatar">
                      <app-user-avatar [src]="user.avatar" [fullName]="user.firstName + ' ' + user.lastName" />
                    </div>
                    <div class="user-details">
                      <div class="user-name">{{user.firstName}} {{user.lastName}}</div>
                      <div class="user-email">{{user.email}}</div>
                    </div>
                  </div>
                </td>
              </ng-container>

              <!-- Role Column -->
              <ng-container matColumnDef="role">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Role</th>
                <td mat-cell *matCellDef="let user">
                  <mat-chip-set>
                    <mat-chip [ngClass]="getRoleClass(user.role)">{{user.role}}</mat-chip>
                  </mat-chip-set>
                </td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
                <td mat-cell *matCellDef="let user">
                  <mat-chip-set>
                    <mat-chip [ngClass]="getStatusClass(user.status)">
                      <mat-icon matChipAvatar>{{getStatusIcon(user.status)}}</mat-icon>
                      {{user.status}}
                    </mat-chip>
                  </mat-chip-set>
                </td>
              </ng-container>

              <!-- Last Login Column -->
              <ng-container matColumnDef="lastLogin">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Last Login</th>
                <td mat-cell *matCellDef="let user">{{user.lastLogin}}</td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let user">
                  <app-app-action-menu [actions]="getUserActions(user)"></app-app-action-menu>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
                  (click)="viewUser(row)" 
                  class="table-row"></tr>
            </table>

            <div class="no-data" *ngIf="filteredUsers.length === 0">
              <mat-icon>person_off</mat-icon>
              <h3>No users found</h3>
              <p>Try adjusting your search criteria or add a new user.</p>
            </div>
          </div>

          <mat-paginator 
            [pageSizeOptions]="[5, 10, 25, 50]" 
            [pageSize]="10"
            [length]="filteredUsers.length"
            showFirstLastButtons>
          </mat-paginator>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrl: './app-users-page.component.scss'
})
export class AppUsersPageComponent implements OnInit, OnDestroy {
  users: User[] = [];
  filteredUsers: User[] = [];
  displayedColumns: string[] = ['name', 'role', 'status', 'lastLogin', 'actions'];

  form = new FormGroup({
    searchTerm: new FormControl('')
  });

  private destroy$ = new Subject<void>();
  
  userActionsMap = new Map<User, ActionMenuItem[]>();

  ngOnInit() {
    this.loadUsers();

    this.form.get('searchTerm')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.applyFilter(value ?? '');
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUsers() {
    // Mock data
    this.users = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@company.com',
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        lastLogin: '2 hours ago',
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@company.com',
        role: UserRole.INSTRUCTOR,
        status: UserStatus.ACTIVE,
        lastLogin: '4 hours ago',
        createdAt: '2024-02-01'
      },
      {
        id: 3,
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael.brown@company.com',
        role: UserRole.STUDENT,
        status: UserStatus.ACTIVE,
        lastLogin: '1 day ago',
        createdAt: '2024-02-15'
      },
      {
        id: 4,
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@company.com',
        role: UserRole.INSTRUCTOR,
        status: UserStatus.INACTIVE,
        lastLogin: '7 days ago',
        createdAt: '2024-01-20'
      },
      {
        id: 5,
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david.wilson@company.com',
        role: UserRole.STUDENT,
        status: UserStatus.PENDING,
        lastLogin: '30 days ago',
        createdAt: '2024-03-01'
      }
    ];
    this.filteredUsers = [...this.users];
  }

  applyFilter(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.firstName.toLowerCase().includes(filterValue) ||
      user.lastName.toLowerCase().includes(filterValue) ||
      user.email.toLowerCase().includes(filterValue) ||
      user.role.toLowerCase().includes(filterValue)
    );
  }

  getUserActions(user: User): ActionMenuItem[] {
    if (!this.userActionsMap.has(user)) {
      console.log('Generating actions for user:', user);
      this.userActionsMap.set(user, [
        {
          label: 'Edit User',
          icon: 'manage_accounts',
          callback: () => this.editUser(user)
        },
        {
          label: 'View Profile',
          icon: 'account_circle',
          callback: () => this.viewUser(user)
        },
        {
          label: 'Reset Password',
          icon: 'vpn_key',
          callback: () => this.resetPassword(user)
        },
        {
          dividerBefore: true,
          label: 'Remove User',
          icon: 'person_remove',
          callback: () => this.deleteUser(user),
          danger: true,
          tooltip: user.role === 'Admin' ? 'Cannot remove an Admin user' : '',
          disabled: user.role === 'Admin'
        }
      ]);
    }
    return this.userActionsMap.get(user)!;
  }


  addUser() {
    console.log('Add new user');
    // Open add user dialog
  }

  editUser(user: User) {
    console.log('Edit user:', user);
    // Open edit user dialog
  }

  viewUser(user: User) {
    console.log('View user:', user);
    // Open user details dialog
  }

  deleteUser(user: User) {
    console.log('Delete user:', user);
    // Show confirmation dialog and delete
  }

  resetPassword(user: User) {
    console.log('Reset password for:', user);
    // Reset password logic
  }

  exportUsers() {
    console.log('Export users');
    // Export functionality
  }

  getRoleClass(role: UserRole): string {
    return UserRoleCssClassMap[role] || 'role-default';
  }

  getStatusClass(status: UserStatus): string {
    return UserStatusCssClassMap[status] || 'status-default';
  }

  getStatusIcon(status: UserStatus): string {
    return StatusIconMap[status] || 'help';
  }

  formatDate(date: string): string {
    return date; // Already formatted in mock data
  }
}
