import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-device-analytics',
  standalone: true,
  imports: [CommonModule, MatCardModule, BaseChartDirective],
  template: `
    <mat-card class="device-analytics-card">
      <mat-card-header>
        <mat-card-title>Device Analytics</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="chart-container">
          <canvas baseChart
            [data]="doughnutChartData"
            [options]="doughnutChartOptions"
            [type]="doughnutChartType">
          </canvas>
        </div>
        <div class="device-stats">
          <div class="device-stat" *ngFor="let device of deviceStats">
            <div class="device-color" [style.background-color]="device.color"></div>
            <span class="device-name">{{device.name}}</span>
            <span class="device-percentage">{{device.percentage}}%</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./app-device-analytics.component.scss']
})
export class AppDeviceAnalyticsComponent {
  public doughnutChartType: ChartType = 'doughnut';
  
  deviceStats = [
    { name: 'Desktop', percentage: 45, color: '#6c4bb6' },
    { name: 'Mobile', percentage: 35, color: '#9c7ce8' },
    { name: 'Tablet', percentage: 20, color: '#c9b3f5' }
  ];
  
  public doughnutChartData: ChartConfiguration['data'] = {
    labels: this.deviceStats.map(d => d.name),
    datasets: [{
      data: this.deviceStats.map(d => d.percentage),
      backgroundColor: this.deviceStats.map(d => d.color),
      borderWidth: 0
    }]
  };

  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  };
}
