import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-user-overview-card',
  standalone: true,
  imports: [MatCardModule, BaseChartDirective],
  template: `<mat-card class="user-overview-card">
    <div class="card-title">User Overview</div>
    <div class="card-chart">
      <canvas baseChart
        [data]="barChartData"
        [options]="barChartOptions"
        [type]="barChartType">
      </canvas>
    </div>
    <div class="card-details">Teachers: 120 | Students: 400 | Guests: 25</div>
  </mat-card>`,
  styleUrls: ['./app-user-overview-card.component.scss']
})
export class AppUserOverviewCardComponent {
  public barChartType: ChartType = 'bar';
  public barChartData: ChartConfiguration['data'] = {
    labels: ['Teachers', 'Students', 'Guests'],
    datasets: [{
      label: 'User Count',
      data: [120, 400, 25],
      backgroundColor: ['#6c4bb6', '#9c7ce8', '#c9b3f5']
    }]
  };
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    indexAxis: 'y'
  };
}
