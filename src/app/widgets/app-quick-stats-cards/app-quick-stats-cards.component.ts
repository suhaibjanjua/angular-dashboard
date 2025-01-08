import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quick-stats-cards',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  template: `
    <mat-card class="quick-stats-card">
      <mat-card-header>
        <mat-card-title>Quick Stats</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="stats-grid">
          <div class="stat-item" *ngFor="let stat of quickStats">
            <mat-icon [class]="stat.iconClass">{{stat.icon}}</mat-icon>
            <div class="stat-value">{{stat.value}}</div>
            <div class="stat-label">{{stat.label}}</div>
            <div class="stat-change" [class]="stat.changeClass">
              <mat-icon>{{stat.changeIcon}}</mat-icon>
              <span>{{stat.change}}</span>
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./app-quick-stats-cards.component.scss']
})
export class AppQuickStatsCardsComponent {
  quickStats = [
    {
      icon: 'people',
      value: '1,234',
      label: 'Total Users',
      change: '+12%',
      changeIcon: 'trending_up',
      iconClass: 'primary',
      changeClass: 'positive'
    },
    {
      icon: 'video_call',
      value: '89',
      label: 'Active Classes',
      change: '+5%',
      changeIcon: 'trending_up',
      iconClass: 'success',
      changeClass: 'positive'
    },
    {
      icon: 'schedule',
      value: '2.4h',
      label: 'Avg Session',
      change: '-3%',
      changeIcon: 'trending_down',
      iconClass: 'info',
      changeClass: 'negative'
    },
    {
      icon: 'assessment',
      value: '94%',
      label: 'Completion Rate',
      change: '+7%',
      changeIcon: 'trending_up',
      iconClass: 'success',
      changeClass: 'positive'
    }
  ];
}
