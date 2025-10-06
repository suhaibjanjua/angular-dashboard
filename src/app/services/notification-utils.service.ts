import { Injectable } from '@angular/core';
import { 
  Notification, 
  NotificationPriority, 
  NotificationType,
  NotificationPriorityColors 
} from '../models/notification.models';

@Injectable({
  providedIn: 'root'
})
export class NotificationUtilsService {

  getPriorityIcon(priority: NotificationPriority): string {
    const iconMap: { [key in NotificationPriority]: string } = {
      [NotificationPriority.URGENT]: 'priority_high',
      [NotificationPriority.HIGH]: 'error',
      [NotificationPriority.MEDIUM]: 'warning',
      [NotificationPriority.LOW]: 'info'
    };
    return iconMap[priority];
  }

  getTypeIcon(type: NotificationType): string {
    const iconMap: { [key in NotificationType]: string } = {
      [NotificationType.SYSTEM]: 'settings',
      [NotificationType.USER]: 'person',
      [NotificationType.COURSE]: 'school',
      [NotificationType.ASSIGNMENT]: 'assignment',
      [NotificationType.MESSAGE]: 'mail',
      [NotificationType.MEETING]: 'videocam',
      [NotificationType.SECURITY]: 'security',
      [NotificationType.UPDATE]: 'system_update',
      [NotificationType.REMINDER]: 'schedule',
      [NotificationType.ANNOUNCEMENT]: 'campaign'
    };
    return iconMap[type] || 'notifications';
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
}