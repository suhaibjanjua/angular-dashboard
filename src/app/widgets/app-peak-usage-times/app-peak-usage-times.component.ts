import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-peak-usage-times',
  standalone: true,
  imports: [MatCardModule, BaseChartDirective],
  template: `
    <mat-card class="peak-usage-card">
      <mat-card-header>
        <mat-card-title>Peak Usage Times</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="chart-container">
          <canvas baseChart
            [data]="barChartData"
            [options]="barChartOptions"
            [type]="barChartType">
          </canvas>
        </div>
        <div class="stats-summary">
          <div class="stat">
            <span class="value">2-4 PM</span>
            <span class="label">Peak Hours</span>
          </div>
          <div class="stat">
            <span class="value">342</span>
            <span class="label">Max Concurrent</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./app-peak-usage-times.component.scss']
})
export class AppPeakUsageTimesComponent {
  public barChartType: ChartType = 'bar';
  
  public barChartData: ChartConfiguration['data'] = {
    labels: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM'],
    datasets: [{
      label: 'Concurrent Users',
      data: [45, 120, 200, 285, 342, 310, 95, 60],
      backgroundColor: '#6750a0',
      borderRadius: 4
    }]
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f0f0f0' }
      },
      x: {
        grid: { display: false }
      }
    }
  };
}
