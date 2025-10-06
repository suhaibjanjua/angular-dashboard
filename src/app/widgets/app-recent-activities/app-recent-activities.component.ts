import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

interface ActivityItem {
  id: string;
  timestamp: Date;
  type: 'login' | 'logout' | 'course_access' | 'system_event' | 'error';
  message: string;
  user?: string;
}

@Component({
  selector: 'app-recent-activities',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  template: `
    <mat-card class="recent-activities-card">
      <mat-card-header>
        <mat-card-title>
          Recent Activities
          <span class="activity-count">({{ activities.length }})</span>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="activity-timeline">
          <div *ngFor="let activity of activities" class="timeline-item">
            <div class="timeline-marker" [ngClass]="activity.type">
              <mat-icon>{{ getActivityIcon(activity.type) }}</mat-icon>
            </div>
            <div class="timeline-content">
              <div class="activity-header">
                <span class="activity-time">{{ formatTime(activity.timestamp) }}</span>
                <span class="activity-type">{{ getActivityTypeLabel(activity.type) }}</span>
              </div>
              <div class="activity-message">{{ activity.message }}</div>
              <div *ngIf="activity.user" class="activity-user">by {{ activity.user }}</div>
            </div>
          </div>
        </div>
        
        <div class="activity-footer">
          <button class="view-all-btn">View All Activities</button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './app-recent-activities.component.scss'
})
export class AppRecentActivitiesComponent implements OnInit, OnDestroy {
  activities: ActivityItem[] = [];
  private subscription?: Subscription;

  ngOnInit() {
    this.loadInitialActivities();
    // Simulate real-time updates
    this.subscription = interval(10000).subscribe(() => {
      this.addNewActivity();
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private loadInitialActivities() {
    this.activities = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        type: 'login',
        message: 'User logged in successfully',
        user: 'Suhaib Janjua'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        type: 'course_access',
        message: 'Accessed "Advanced Mathematics" course',
        user: 'Emma Johnson'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        type: 'system_event',
        message: 'System backup completed successfully'
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 12 * 60 * 1000),
        type: 'logout',
        message: 'User session expired',
        user: 'Michael Brown'
      },
      {
        id: '5',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        type: 'login',
        message: 'New user registration completed',
        user: 'Sarah Wilson'
      },
      {
        id: '6',
        timestamp: new Date(Date.now() - 18 * 60 * 1000),
        type: 'error',
        message: 'Failed to load course content'
      },
      {
        id: '7',
        timestamp: new Date(Date.now() - 22 * 60 * 1000),
        type: 'course_access',
        message: 'Downloaded course materials',
        user: 'David Lee'
      },
      {
        id: '8',
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        type: 'system_event',
        message: 'Database maintenance completed'
      }
    ];
  }

  private addNewActivity() {
    const newActivities = [
      {
        type: 'login' as const,
        message: 'User logged in from mobile device',
        user: 'Alex Turner'
      },
      {
        type: 'course_access' as const,
        message: 'Started video lecture playback',
        user: 'Lisa Chen'
      },
      {
        type: 'system_event' as const,
        message: 'Server health check completed'
      },
      {
        type: 'logout' as const,
        message: 'User session ended',
        user: 'Robert Davis'
      }
    ];

    const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)];
    const newActivity: ActivityItem = {
      id: Date.now().toString(),
      timestamp: new Date(),
      ...randomActivity
    };

    this.activities.unshift(newActivity);
    if (this.activities.length > 8) {
      this.activities.pop();
    }
  }

  getActivityIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'login': 'login',
      'logout': 'logout',
      'course_access': 'school',
      'system_event': 'settings',
      'error': 'error'
    };
    return icons[type] || 'info';
  }

  getActivityTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'login': 'Login',
      'logout': 'Logout',
      'course_access': 'Course Access',
      'system_event': 'System',
      'error': 'Error'
    };
    return labels[type] || 'Unknown';
  }

  formatTime(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }
}
