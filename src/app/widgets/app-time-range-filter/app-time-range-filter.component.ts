import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardService } from '../../services/dashboard.service';
import { TimeRange, TimeRangeLabels } from '../../models/widget.models';

@Component({
  selector: 'app-time-range-filter',
  standalone: true,
  imports: [NgForOf, MatSelectModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `<div class="time-range-filter">
    <mat-select [(value)]="selectedTimeRange" placeholder="Time Range">
      <mat-option *ngFor="let option of timeRangeOptions" [value]="option.value">
        {{ option.label }}
      </mat-option>
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
  selectedTimeRange: TimeRange = TimeRange.LAST_7_DAYS;
  
  timeRangeOptions = [
    { value: TimeRange.TODAY, label: TimeRangeLabels[TimeRange.TODAY] },
    { value: TimeRange.YESTERDAY, label: TimeRangeLabels[TimeRange.YESTERDAY] },
    { value: TimeRange.LAST_7_DAYS, label: TimeRangeLabels[TimeRange.LAST_7_DAYS] },
    { value: TimeRange.LAST_30_DAYS, label: TimeRangeLabels[TimeRange.LAST_30_DAYS] },
    { value: TimeRange.THIS_MONTH, label: TimeRangeLabels[TimeRange.THIS_MONTH] },
    { value: TimeRange.LAST_MONTH, label: TimeRangeLabels[TimeRange.LAST_MONTH] },
    { value: TimeRange.LAST_90_DAYS, label: TimeRangeLabels[TimeRange.LAST_90_DAYS] }
  ];

  constructor(private dashboardService: DashboardService) {}

  exportData(format: 'csv' | 'excel') {
    this.dashboardService.exportData(format, this.selectedTimeRange).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `dashboard-export-${Date.now()}.${format}`;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
