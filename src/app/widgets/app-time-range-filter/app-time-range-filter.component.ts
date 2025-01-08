import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardService } from '../../services/dashboard.service';
import { TimeRange } from '../../models/dashboard.models';

@Component({
  selector: 'app-time-range-filter',
  standalone: true,
  imports: [MatSelectModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `<div class="time-range-filter">
    <mat-select [(value)]="selectedTimeRange" placeholder="Time Range">
      <mat-option value="Today">Today</mat-option>
      <mat-option value="Yesterday">Yesterday</mat-option>
      <mat-option value="This Week">This Week</mat-option>
      <mat-option value="This Month">This Month</mat-option>
      <mat-option value="Last Month">Last Month</mat-option>
      <mat-option value="Last 3 Months">Last 3 Months</mat-option>
    </mat-select>
    <button mat-raised-button color="primary" [matMenuTriggerFor]="exportMenu">
      <mat-icon>file_download</mat-icon>
      Export
    </button>
    <mat-menu #exportMenu="matMenu">
      <button mat-menu-item (click)="exportData('csv')">
        <mat-icon>description</mat-icon>
        Export as CSV
      </button>
      <button mat-menu-item (click)="exportData('excel')">
        <mat-icon>table_chart</mat-icon>
        Export as Excel
      </button>
    </mat-menu>
  </div>`,
  styleUrls: ['./app-time-range-filter.component.scss']
})
export class AppTimeRangeFilterComponent {
  selectedTimeRange: TimeRange = 'This Week';

  constructor(private dashboardService: DashboardService) {}

  exportData(format: 'csv' | 'excel') {
    this.dashboardService.exportData(format, this.selectedTimeRange).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `dashboard-export-${Date.now()}.${format}`;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
