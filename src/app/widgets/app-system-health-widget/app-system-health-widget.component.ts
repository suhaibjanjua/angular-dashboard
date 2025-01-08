import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-system-health-widget',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  template: `
    <mat-card class="system-health-card">
      <mat-card-header>
        <mat-card-title>System Health</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="health-overview">
          <div class="health-score">
            <div class="score-circle" [class]="getHealthClass()">
              <span class="score">{{systemHealth.overallScore}}</span>
              <span class="score-label">Health Score</span>
            </div>
          </div>
          
          <div class="health-metrics">
            <div class="metric" *ngFor="let metric of systemHealth.metrics">
              <div class="metric-header">
                <mat-icon [class]="metric.status">{{metric.icon}}</mat-icon>
                <span class="metric-name">{{metric.name}}</span>
                <span class="metric-value" [class]="metric.status">{{metric.value}}</span>
              </div>
              <div class="metric-bar">
                <div class="metric-fill" [style.width.%]="metric.percentage" [class]="metric.status"></div>
              </div>
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./app-system-health-widget.component.scss']
})
export class AppSystemHealthWidgetComponent {
  systemHealth = {
    overallScore: 87,
    metrics: [
      { name: 'Server Response', value: '245ms', percentage: 85, status: 'good', icon: 'speed' },
      { name: 'CPU Usage', value: '68%', percentage: 68, status: 'warning', icon: 'memory' },
      { name: 'Memory Usage', value: '74%', percentage: 74, status: 'warning', icon: 'storage' },
      { name: 'Database', value: '12ms', percentage: 95, status: 'good', icon: 'dns' },
      { name: 'Network', value: '99.9%', percentage: 99, status: 'excellent', icon: 'wifi' }
    ]
  };

  getHealthClass(): string {
    const score = this.systemHealth.overallScore;
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 60) return 'warning';
    return 'critical';
  }
}
