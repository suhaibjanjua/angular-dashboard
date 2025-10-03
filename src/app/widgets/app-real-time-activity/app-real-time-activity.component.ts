import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-real-time-activity',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card class="real-time-activity-card">
      <mat-card-header>
        <mat-card-title>
          Real-time Activity
          <span class="live-indicator">
            <mat-icon>fiber_manual_record</mat-icon>
            LIVE
          </span>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="activity-list">
          <div class="activity-item" *ngFor="let activity of recentActivities">
            <div class="activity-time">{{activity.time}}</div>
            <div class="activity-content">
              <mat-icon [class]="activity.type">{{activity.icon}}</mat-icon>
              <span class="activity-text">{{activity.text}}</span>
            </div>
          </div>
        </div>
        <div class="activity-summary">
          <div class="summary-item">
            <span class="count">{{activitiesCount}}</span>
            <span class="label">Activities Last Hour</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./app-real-time-activity.component.scss']
})
export class AppRealTimeActivityComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  activitiesCount = 247;
  
  recentActivities = [
    { time: '2 sec ago', text: 'Suhaib Janjua joined Math 101', icon: 'person_add', type: 'success' },
    { time: '15 sec ago', text: 'New assignment submitted in Physics', icon: 'assignment', type: 'info' },
    { time: '32 sec ago', text: 'Sarah Johnson started screen sharing', icon: 'screen_share', type: 'info' },
    { time: '1 min ago', text: 'Breakout room created in Biology Lab', icon: 'group_work', type: 'success' },
    { time: '2 min ago', text: 'Quiz completed by 15 students', icon: 'quiz', type: 'success' },
    { time: '3 min ago', text: 'Connection issue resolved', icon: 'wifi', type: 'warning' },
    { time: '4 min ago', text: 'Recording started for History class', icon: 'videocam', type: 'info' }
  ];

  ngOnInit(): void {
    // Simulate real-time updates
    this.subscription = interval(5000).subscribe(() => {
      this.addNewActivity();
      this.activitiesCount++;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private addNewActivity(): void {
    const newActivities = [
      'New user registered',
      'Class session started',
      'File uploaded',
      'Message posted in chat',
      'User left the session',
      'Whiteboard shared',
      'Poll created'
    ];
    
    const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)];
    const newActivity = {
      time: 'Just now',
      text: randomActivity,
      icon: 'notifications',
      type: 'info'
    };
    
    this.recentActivities.unshift(newActivity);
    if (this.recentActivities.length > 7) {
      this.recentActivities.pop();
    }
  }
}
