import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-active-classes-widget',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  template: `
    <mat-card class="top-classes-card">
      <mat-card-header>
        <mat-card-title>Top Active Classes</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="classes-list">
          <div class="class-item" *ngFor="let class of topClasses; let i = index">
            <div class="rank">{{i + 1}}</div>
            <div class="class-info">
              <div class="class-name">{{class.name}}</div>
              <div class="class-details">
                <span class="instructor">{{class.instructor}}</span>
                <span class="students">{{class.students}} students</span>
              </div>
            </div>
            <div class="class-stats">
              <div class="engagement">{{class.engagement}}%</div>
              <div class="duration">{{class.avgDuration}}</div>
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./app-top-active-classes-widget.component.scss']
})
export class AppTopActiveClassesWidgetComponent {
  topClasses = [
    {
      name: 'Advanced Mathematics',
      instructor: 'Dr. Sarah Johnson',
      students: 45,
      engagement: 94,
      avgDuration: '2h 15m'
    },
    {
      name: 'Physics Laboratory',
      instructor: 'Prof. Michael Chen',
      students: 38,
      engagement: 91,
      avgDuration: '3h 30m'
    },
    {
      name: 'Computer Science 101',
      instructor: 'Dr. Emily Rodriguez',
      students: 67,
      engagement: 89,
      avgDuration: '1h 45m'
    },
    {
      name: 'Biology Research',
      instructor: 'Dr. David Thompson',
      students: 28,
      engagement: 87,
      avgDuration: '2h 45m'
    },
    {
      name: 'Literature Analysis',
      instructor: 'Prof. Lisa Anderson',
      students: 52,
      engagement: 85,
      avgDuration: '1h 30m'
    }
  ];
}
