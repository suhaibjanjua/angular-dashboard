import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-attendance-overview',
  standalone: true,
  imports: [MatCardModule, BaseChartDirective],
  template: `
    <mat-card class="attendance-overview-card">
      <mat-card-header>
        <mat-card-title>Attendance Overview</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="chart-container">
          <canvas baseChart
            [data]="doughnutChartData"
            [options]="doughnutChartOptions"
            [type]="doughnutChartType">
          </canvas>
        </div>
        <div class="stats-summary">
          <div class="stat">
            <span class="value">92%</span>
            <span class="label">Present Today</span>
          </div>
          <div class="stat">
            <span class="value">8%</span>
            <span class="label">Absent</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./app-attendance-overview.component.scss']
})
export class AppAttendanceOverviewComponent {
  public doughnutChartType: ChartType = 'doughnut';
  
  public doughnutChartData: ChartConfiguration['data'] = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [92, 8],
        backgroundColor: ['#4caf50', '#f44336'],
        borderWidth: 0
      }
    ]
  };

  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true
        }
      }
    }
  };
}
