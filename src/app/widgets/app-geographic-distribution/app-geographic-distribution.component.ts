import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-geographic-distribution',
  standalone: true,
  imports: [CommonModule, MatCardModule, BaseChartDirective],
  template: `
    <mat-card class="geographic-card">
      <mat-card-header>
        <mat-card-title>Geographic Distribution</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="chart-container">
          <canvas baseChart
            [data]="polarChartData"
            [options]="polarChartOptions"
            [type]="polarChartType">
          </canvas>
        </div>
        <div class="geo-stats">
          <div class="geo-stat" *ngFor="let region of regions">
            <span class="region-name">{{region.name}}</span>
            <span class="region-count">{{region.users}}</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./app-geographic-distribution.component.scss']
})
export class AppGeographicDistributionComponent {
  public polarChartType: ChartType = 'polarArea';
  
  regions = [
    { name: 'North America', users: 450 },
    { name: 'Europe', users: 320 },
    { name: 'Asia Pacific', users: 280 },
    { name: 'South America', users: 120 },
    { name: 'Africa', users: 64 }
  ];
  
  public polarChartData: ChartConfiguration['data'] = {
    labels: this.regions.map(r => r.name),
    datasets: [{
      data: this.regions.map(r => r.users),
      backgroundColor: ['#6c4bb6', '#9c7ce8', '#c9b3f5', '#e6d7f5', '#f3f0f8']
    }]
  };

  public polarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  };
}
