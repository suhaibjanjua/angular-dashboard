import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

interface PerformanceMetric {
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
  description: string;
}

@Component({
  selector: 'app-performance-metrics',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatProgressBarModule, CommonModule],
  template: `
    <mat-card class="performance-metrics-card">
      <mat-card-header>
        <mat-card-title>
          Performance Metrics
          <mat-icon class="refresh-icon">refresh</mat-icon>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="metrics-grid">
          <div *ngFor="let metric of metrics" class="metric-item" [ngClass]="metric.status">
            <div class="metric-header">
              <div class="metric-name">{{ metric.name }}</div>
              <div class="metric-trend" [ngClass]="metric.trend">
                <mat-icon>{{ getTrendIcon(metric.trend) }}</mat-icon>
              </div>
            </div>
            
            <div class="metric-value">
              <span class="value">{{ metric.value }}</span>
              <span class="unit">{{ metric.unit }}</span>
            </div>
            
            <div class="metric-progress">
              <mat-progress-bar 
                mode="determinate" 
                [value]="(metric.value / metric.target) * 100"
                [ngClass]="metric.status">
              </mat-progress-bar>
              <div class="progress-labels">
                <span class="current">{{ metric.value }}{{ metric.unit }}</span>
                <span class="target">Target: {{ metric.target }}{{ metric.unit }}</span>
              </div>
            </div>
            
            <div class="metric-description">{{ metric.description }}</div>
          </div>
        </div>
        
        <div class="performance-summary">
          <div class="summary-item">
            <mat-icon class="summary-icon good">check_circle</mat-icon>
            <span class="summary-text">{{ getGoodMetricsCount() }} metrics performing well</span>
          </div>
          
          <div class="summary-item">
            <mat-icon class="summary-icon warning">warning</mat-icon>
            <span class="summary-text">{{ getWarningMetricsCount() }} metrics need attention</span>
          </div>
          
          <div class="summary-item">
            <mat-icon class="summary-icon critical">error</mat-icon>
            <span class="summary-text">{{ getCriticalMetricsCount() }} critical issues</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './app-performance-metrics.component.scss'
})
export class AppPerformanceMetricsComponent implements OnInit {
  metrics: PerformanceMetric[] = [];

  ngOnInit() {
    this.loadMetrics();
  }

  private loadMetrics() {
    this.metrics = [
      {
        name: 'Response Time',
        value: 245,
        target: 300,
        unit: 'ms',
        trend: 'down',
        status: 'good',
        description: 'Average API response time'
      },
      {
        name: 'Memory Usage',
        value: 78,
        target: 85,
        unit: '%',
        trend: 'up',
        status: 'warning',
        description: 'System memory utilization'
      },
      {
        name: 'CPU Usage',
        value: 34,
        target: 70,
        unit: '%',
        trend: 'stable',
        status: 'good',
        description: 'Average CPU utilization'
      },
      {
        name: 'Error Rate',
        value: 0.8,
        target: 1.0,
        unit: '%',
        trend: 'down',
        status: 'good',
        description: 'Application error rate'
      },
      {
        name: 'Disk I/O',
        value: 156,
        target: 200,
        unit: 'MB/s',
        trend: 'up',
        status: 'good',
        description: 'Disk read/write operations'
      },
      {
        name: 'Network Latency',
        value: 89,
        target: 100,
        unit: 'ms',
        trend: 'stable',
        status: 'good',
        description: 'Network round-trip time'
      }
    ];
  }

  getTrendIcon(trend: string): string {
    const icons: { [key: string]: string } = {
      'up': 'trending_up',
      'down': 'trending_down',
      'stable': 'trending_flat'
    };
    return icons[trend] || 'trending_flat';
  }

  getGoodMetricsCount(): number {
    return this.metrics.filter(m => m.status === 'good').length;
  }

  getWarningMetricsCount(): number {
    return this.metrics.filter(m => m.status === 'warning').length;
  }

  getCriticalMetricsCount(): number {
    return this.metrics.filter(m => m.status === 'critical').length;
  }
}
