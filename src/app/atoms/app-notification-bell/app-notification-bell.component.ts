import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { 
  Notification, 
  NotificationPriority, 
  NotificationType,
  NotificationStatus,
  NotificationPriorityColors 
} from '../../models/notification.models';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './app-notification-bell.component.html',
  styleUrls: ['./app-notification-bell.component.scss']
})
export class AppNotificationBellComponent implements OnInit, OnDestroy {
  
  notifications: Notification[] = [];
  unreadCount = 0;
  loading = false;
  isOpen = false;
  
  // Expose enums to template
  NotificationPriority = NotificationPriority;
  NotificationType = NotificationType;
  NotificationStatus = NotificationStatus;
  NotificationPriorityColors = NotificationPriorityColors;
  
  private destroy$ = new Subject<void>();

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to notifications
    this.notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe(notifications => {
        this.notifications = notifications.slice(0, 10); // Show only latest 10 in dropdown
      });

    // Subscribe to unread count
    this.notificationService.unreadCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => {
        this.unreadCount = count;
      });

    // Subscribe to loading state
    this.notificationService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.loading = loading;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onNotificationClick(notification: Notification): void {
    // Mark as read if unread
    if (notification.status === NotificationStatus.UNREAD) {
      this.notificationService.markAsRead(notification.id).subscribe();
    }

    // Navigate to action URL if available
    if (notification.actionUrl) {
      this.router.navigate([notification.actionUrl]);
    }
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe();
  }

  markAsRead(notification: Notification, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.notificationService.markAsRead(notification.id).subscribe();
  }

  deleteNotification(notification: Notification, event: Event): void {
    event.stopPropagation();
    this.notificationService.deleteNotification(notification.id).subscribe();
  }

  viewAllNotifications(): void {
    this.router.navigate(['/notifications']);
  }

  onMenuOpened(): void {
    this.isOpen = true;
  }

  onMenuClosed(): void {
    this.isOpen = false;
  }

  getPriorityIcon(priority: NotificationPriority): string {
    switch (priority) {
      case NotificationPriority.URGENT:
        return 'priority_high';
      case NotificationPriority.HIGH:
        return 'error';
      case NotificationPriority.MEDIUM:
        return 'warning';
      case NotificationPriority.LOW:
        return 'info';
      default:
        return 'info';
    }
  }

  getTypeIcon(type: NotificationType): string {
    switch (type) {
      case NotificationType.SYSTEM:
        return 'settings';
      case NotificationType.USER:
        return 'person';
      case NotificationType.COURSE:
        return 'school';
      case NotificationType.ASSIGNMENT:
        return 'assignment';
      case NotificationType.MESSAGE:
        return 'mail';
      case NotificationType.MEETING:
        return 'videocam';
      case NotificationType.SECURITY:
        return 'security';
      case NotificationType.UPDATE:
        return 'system_update';
      case NotificationType.REMINDER:
        return 'schedule';
      case NotificationType.ANNOUNCEMENT:
        return 'campaign';
      default:
        return 'notifications';
    }
  }

  formatTimestamp(timestamp: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - timestamp.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  }

  getNotificationIcon(notification: Notification): string {
    return notification.icon || this.getTypeIcon(notification.type);
  }

  getNotificationColor(notification: Notification): string {
    return notification.iconColor || NotificationPriorityColors[notification.priority];
  }

  trackByNotificationId(index: number, notification: Notification): string {
    return notification.id;
  }
}
