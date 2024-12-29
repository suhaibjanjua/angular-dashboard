import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-stacked-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './app-stacked-bar-chart.component.html',
  styleUrls: ['./app-stacked-bar-chart.component.scss']
})
export class AppStackedBarChartComponent {
  public stackedBarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { 
        display: true,
        position: 'top',
        labels: {
          color: '#222',
          font: { size: 11, family: 'Open Sans', weight: 'normal' }
        }
      },
      title: { display: false }
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { color: '#222', font: { size: 11, family: 'Open Sans', weight: 'normal' } }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 300,
        min: 0,
        ticks: { stepSize: 50, color: '#888', font: { size: 10, family: 'Open Sans', weight: 'normal' } },
        grid: { color: '#e0e0e0' }
      }
    }
  };
  public stackedBarChartType: ChartType = 'bar';
  public stackedBarChartData: ChartConfiguration['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June'
    ],
    datasets: [
      {
        label: 'Teachers',
        data: [45, 52, 48, 61, 55, 67],
        backgroundColor: '#6c4bb6',
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.8
      },
      {
        label: 'Students',
        data: [120, 135, 142, 158, 165, 178],
        backgroundColor: '#9c7ce8',
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.8
      }
    ]
  };
}
