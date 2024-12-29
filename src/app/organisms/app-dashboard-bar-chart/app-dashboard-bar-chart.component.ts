import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './app-dashboard-bar-chart.component.html',
  styleUrls: ['./app-dashboard-bar-chart.component.scss']
})
export class AppDashboardBarChartComponent {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      x: {
        grid: { display: false },
  ticks: { color: '#222', font: { size: 11, family: 'Open Sans', weight: 'normal' } }
      },
      y: {
        beginAtZero: true,
        max: 100,
        min: 0,
  ticks: { stepSize: 10, color: '#888', font: { size: 10, family: 'Open Sans', weight: 'normal' } },
        grid: { color: '#e0e0e0' }
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartConfiguration['data'] = {
    labels: [
      'Organizational Controls',
      'People Controls',
      'Physical Controls',
      'Technological Controls'
    ],
    datasets: [
      {
        data: [100, 100, 100, 100],
        backgroundColor: ['#6c4bb6', '#e0e0e0', '#6c4bb6', '#e0e0e0'],
        borderRadius: 6,
        barPercentage: 0.5,
        categoryPercentage: 0.7
      }
    ]
  };
}
