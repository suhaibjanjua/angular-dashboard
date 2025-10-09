import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AppButtonComponent } from '../../atoms/app-button/app-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-delete-account-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    AppButtonComponent
  ],
  template: `
    <div class="delete-confirmation-dialog">
      <h2 mat-dialog-title>
        <mat-icon class="warning-icon">warning</mat-icon>
        Delete Account
      </h2>
      <mat-dialog-content>
        <p class="warning-text">
          <strong>This action cannot be undone.</strong> Deleting your account will permanently remove:
        </p>
        <ul class="deletion-list">
          <li><mat-icon>person</mat-icon> Your profile and personal information</li>
          <li><mat-icon>folder</mat-icon> All your documents and files</li>
          <li><mat-icon>analytics</mat-icon> Dashboard data and analytics</li>
          <li><mat-icon>settings</mat-icon> Custom settings and preferences</li>
          <li><mat-icon>history</mat-icon> Activity history and logs</li>
        </ul>
        <p class="confirmation-text">
          To confirm deletion, please type <strong>"DELETE"</strong> in the field below:
        </p>
        <mat-form-field appearance="outline" class="confirmation-input">
          <mat-label>Type DELETE to confirm</mat-label>
          <input matInput [(ngModel)]="confirmationText" placeholder="DELETE">
        </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions>
        <app-button label="Cancel" color="primary" type="button" (click)="onCancel()" variant="basic" icon="close"></app-button>
        <app-button label="Delete Account" color="warn" type="submit" (click)="onConfirm()" variant="raised" icon="delete_forever" [disabled]="confirmationText !== 'DELETE'"></app-button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .delete-confirmation-dialog {
      .warning-icon {
        color: #f44336;
        margin-right: 8px;
      }
      
      .warning-text {
        color: #d32f2f;
        margin-bottom: 16px;
      }
      
      .deletion-list {
        margin: 16px 0;
        padding-left: 0;
        
        li {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 8px 0;
          list-style: none;
          
          mat-icon {
            color: #f44336;
            font-size: 18px;
            width: 18px;
            height: 18px;
          }
        }
      }
      
      .confirmation-text {
        margin: 16px 0 8px 0;
        font-weight: 500;
      }
      
      .confirmation-input {
        width: 100%;
      }
      
      mat-dialog-actions {
        justify-content: flex-end;
        gap: 12px;
        
        button {
          mat-icon {
            margin-right: 8px;
          }
        }
      }
    }
  `]
})
export class AppDeleteAccountConfirmationDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<AppDeleteAccountConfirmationDialogComponent>);
  confirmationText = '';

  onCancel(): void {
    // Close dialog without action
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.confirmationText === 'DELETE') {
      // Proceed with account deletion
      console.log('Account deletion confirmed');
      this.dialogRef.close();
    }
  }
}

@Component({
  selector: 'app-delete-account-page',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    AppButtonComponent
  ],
  template: `
    <div class="delete-account-page">
      <div class="page-header">
        <h1>Delete Account</h1>
        <p class="page-subtitle">Permanently remove your account and all associated data</p>
      </div>

      <div class="delete-content">
        <mat-card class="warning-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon class="warning-icon">warning</mat-icon>
              Important Warning
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="warning-message">
              <p class="primary-warning">
                <strong>Account deletion is permanent and cannot be undone.</strong>
              </p>
              <p>
                Once you delete your account, you will lose access to all your data, 
                and we cannot recover it for you. Please make sure you have downloaded 
                any important information before proceeding.
              </p>
            </div>

            <div class="data-impact">
              <h3>What will be deleted:</h3>
              <div class="impact-grid">
                <div class="impact-item">
                  <mat-icon>person</mat-icon>
                  <div>
                    <h4>Profile Data</h4>
                    <p>Personal information, preferences, and settings</p>
                  </div>
                </div>
                <div class="impact-item">
                  <mat-icon>folder</mat-icon>
                  <div>
                    <h4>Documents</h4>
                    <p>All uploaded files, documents, and attachments</p>
                  </div>
                </div>
                <div class="impact-item">
                  <mat-icon>analytics</mat-icon>
                  <div>
                    <h4>Analytics Data</h4>
                    <p>Dashboard metrics, reports, and historical data</p>
                  </div>
                </div>
                <div class="impact-item">
                  <mat-icon>group</mat-icon>
                  <div>
                    <h4>Team Access</h4>
                    <p>Shared workspaces and collaboration data</p>
                  </div>
                </div>
                <div class="impact-item">
                  <mat-icon>payment</mat-icon>
                  <div>
                    <h4>Billing History</h4>
                    <p>Transaction records and payment information</p>
                  </div>
                </div>
                <div class="impact-item">
                  <mat-icon>backup</mat-icon>
                  <div>
                    <h4>Backups</h4>
                    <p>All automated backups and data copies</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="alternatives">
              <h3>Consider these alternatives:</h3>
              <div class="alternative-options">
                <div class="alternative-item">
                  <mat-icon>pause_circle</mat-icon>
                  <div>
                    <h4>Deactivate Account</h4>
                    <p>Temporarily disable your account while keeping your data safe</p>
                    <app-button label="Deactivate Instead" color="primary" type="button" (click)="deactivateAccount()" variant="stroked"></app-button>
                  </div>
                </div>
                <div class="alternative-item">
                  <mat-icon>file_download</mat-icon>
                  <div>
                    <h4>Export Data</h4>
                    <p>Download a copy of your data before deletion</p>
                    <app-button label="Export Data" color="primary" type="button" (click)="exportData()" variant="stroked"></app-button>
                  </div>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="deletion-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>delete_forever</mat-icon>
              Proceed with Deletion
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="final-warning">
              <p>
                If you are absolutely sure you want to delete your account, 
                click the button below. This action will start the permanent 
                deletion process.
              </p>
              <div class="deletion-timeline">
                <h4>Deletion Process:</h4>
                <div class="timeline-item">
                  <span class="step">1.</span>
                  <span>Immediate account deactivation</span>
                </div>
                <div class="timeline-item">
                  <span class="step">2.</span>
                  <span>7-day grace period for recovery</span>
                </div>
                <div class="timeline-item">
                  <span class="step">3.</span>
                  <span>Permanent data deletion after 7 days</span>
                </div>
              </div>
            </div>
          </mat-card-content>
          <mat-card-actions class="deletion-actions">
            <app-button label="Go Back to Settings" color="accent" type="button" variant="basic" icon="arrow_back" routerLink="/settings"></app-button>
            <app-button label="Delete My Account" color="warn" type="button" (click)="openDeleteConfirmation()" variant="raised" icon="delete_forever"></app-button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./app-delete-account-page.component.scss']
})
export class AppDeleteAccountPageComponent {
  constructor(private dialog: MatDialog) {}

  openDeleteConfirmation(): void {
    const dialogRef = this.dialog.open(AppDeleteAccountConfirmationDialogComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmed') {
        this.processAccountDeletion();
      }
    });
  }

  deactivateAccount(): void {
    console.log('Deactivating account instead of deletion');
    // Implement account deactivation logic
  }

  exportData(): void {
    console.log('Exporting user data');
    // Implement data export logic
  }

  private processAccountDeletion(): void {
    console.log('Processing account deletion');
    // Implement actual account deletion logic
  }
}