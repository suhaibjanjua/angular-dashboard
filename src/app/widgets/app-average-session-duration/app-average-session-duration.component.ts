import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-average-session-duration',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  template: `
    <mat-card class="session-duration-card">
      <mat-card-header>
        <mat-card-title>Average Session Duration</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="main-metric">
          <mat-icon class="duration-icon">schedule</mat-icon>
          <div class="duration-value">2h 34m</div>
          <div class="duration-change positive">
            <mat-icon>trending_up</mat-icon>
            <span>+12% vs last week</span>
          </div>
        </div>
        <div class="breakdown">
          <div class="breakdown-item">
            <span class="label">Teachers</span>
            <span class="value">3h 15m</span>
          </div>
          <div class="breakdown-item">
            <span class="label">Students</span>
            <span class="value">2h 8m</span>
          </div>
          <div class="breakdown-item">
            <span class="label">Guests</span>
            <span class="value">45m</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./app-average-session-duration.component.scss']
})
export class AppAverageSessionDurationComponent {}
