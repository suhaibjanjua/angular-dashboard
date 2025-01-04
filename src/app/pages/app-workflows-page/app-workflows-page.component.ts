import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-workflows-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Workflows</h1>
        <p class="page-subtitle">Create and manage automated workflows</p>
      </div>
      <mat-card class="content-card">
        <mat-card-content>
          <div class="coming-soon">
            <mat-icon>account_tree</mat-icon>
            <h3>Workflows Management</h3>
            <p>Full CRUD functionality for workflows coming soon.</p>
            <button mat-flat-button color="primary">
              <mat-icon>add</mat-icon>
              Create Workflow
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-container { padding: 24px; }
    .page-header { margin-bottom: 24px; }
    .page-title { font-size: 28px; font-weight: 600; color: #333; margin: 0 0 8px 0; }
    .page-subtitle { font-size: 16px; color: #666; margin: 0; }
    .content-card { box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-radius: 12px; }
    .coming-soon { text-align: center; padding: 48px; }
    .coming-soon mat-icon { font-size: 48px; width: 48px; height: 48px; color: #6c4bb6; margin-bottom: 16px; }
    .coming-soon h3 { margin: 0 0 8px 0; font-size: 20px; color: #333; }
    .coming-soon p { margin: 0 0 24px 0; color: #666; }
  `]
})
export class AppWorkflowsPageComponent {}