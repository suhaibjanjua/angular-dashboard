import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-attendance-trends',
  standalone: true,
  imports: [MatCardModule, BaseChartDirective],
  template: `
    <mat-card class="attendance-trends-card">
      <mat-card-header>
        <mat-card-title>Attendance Trends</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="chart-container">
          <canvas baseChart
            [data]="lineChartData"
            [options]="lineChartOptions"
            [type]="lineChartType">
          </canvas>
        </div>
        <div class="stats-summary">
          <div class="stat">
            <span class="value">94%</span>
            <span class="label">This Week</span>
          </div>
          <div class="stat">
            <span class="value">↗ 3%</span>
            <span class="label">vs Last Week</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./app-attendance-trends.component.scss']
})
export class AppAttendanceTrendsComponent {
  public lineChartType: ChartType = 'line';
  
  public lineChartData: ChartConfiguration['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Attendance %',
        data: [88, 92, 94, 91, 96, 85, 89],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: '#f0f0f0'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };
}
