import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-session-distribution-widget',
  standalone: true,
  imports: [MatCardModule, BaseChartDirective],
  template: `
    <mat-card class="session-distribution-card">
      <mat-card-header>
        <mat-card-title>Session Distribution</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="chart-container">
          <canvas baseChart
            [data]="pieChartData"
            [options]="pieChartOptions"
            [type]="pieChartType">
          </canvas>
        </div>
        <div class="stats-summary">
          <div class="stat">
            <span class="value">45%</span>
            <span class="label">Live Classes</span>
          </div>
          <div class="stat">
            <span class="value">35%</span>
            <span class="label">Recorded</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./app-session-distribution-widget.component.scss']
})
export class AppSessionDistributionWidgetComponent {
  public pieChartType: ChartType = 'pie';
  
  public pieChartData: ChartConfiguration['data'] = {
    labels: ['Live Classes', 'Recorded Sessions', 'Breakout Rooms', 'One-on-One'],
    datasets: [{
      data: [45, 35, 15, 5],
      backgroundColor: ['#6c4bb6', '#9c7ce8', '#c9b3f5', '#e6d7f5']
    }]
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          usePointStyle: true
        }
      }
    }
  };
}
