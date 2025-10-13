import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-user-engagement-metrics',
  standalone: true,
  imports: [MatCardModule, BaseChartDirective],
  template: `
    <mat-card class="engagement-metrics-card">
      <mat-card-header>
        <mat-card-title>User Engagement Metrics</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="chart-container">
          <canvas baseChart
            [data]="radarChartData"
            [options]="radarChartOptions"
            [type]="radarChartType">
          </canvas>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./app-user-engagement-metrics.component.scss']
})
export class AppUserEngagementMetricsComponent {
  public radarChartType: ChartType = 'radar';
  
  public radarChartData: ChartConfiguration['data'] = {
    labels: ['Participation', 'Chat Activity', 'Screen Share', 'Questions Asked', 'Assignment Completion', 'Time Spent'],
    datasets: [{
      label: 'Current Week',
      data: [85, 78, 65, 90, 88, 82],
      borderColor: '#6750a0',
      backgroundColor: 'rgba(108, 75, 182, 0.2)',
      pointBackgroundColor: '#6750a0'
    }]
  };

  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        grid: { color: '#f0f0f0' },
        pointLabels: { font: { size: 12 } }
      }
    }
  };
}
