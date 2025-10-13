import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './app-pie-chart.component.html',
  styleUrls: ['./app-pie-chart.component.scss']
})
export class AppPieChartComponent {
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { 
        display: true,
        position: 'bottom',
        labels: {
          color: '#222',
          font: { size: 12, family: 'Open Sans', weight: 'normal' },
          padding: 20,
          usePointStyle: true
        }
      },
      title: { display: false }
    }
  };
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartConfiguration['data'] = {
    labels: [
      'Morning Sessions',
      'Afternoon Sessions'
    ],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ['#6750a0', '#9c7ce8'],
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverBorderWidth: 3,
        hoverBorderColor: '#ffffff'
      }
    ]
  };
}
