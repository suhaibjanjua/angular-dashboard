import { TestBed } from '@angular/core/testing';
import { NotificationUtilsService } from './notification-utils.service';
import { 
  Notification,
  NotificationPriority,
  NotificationType,
  NotificationStatus
} from '../models/notification.models';

describe('NotificationUtilsService', () => {
  let service: NotificationUtilsService;

  const mockNotification: Notification = {
    id: '1',
    title: 'Test Notification',
    message: 'Test message',
    type: NotificationType.SYSTEM,
    priority: NotificationPriority.MEDIUM,
    status: NotificationStatus.UNREAD,
    timestamp: new Date(),
    createdAt: new Date(),
    icon: 'test-icon',
    iconColor: '#007bff',
    metadata: {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPriorityIcon', () => {
    it('should return correct icon for URGENT priority', () => {
      const icon = service.getPriorityIcon(NotificationPriority.URGENT);
      expect(icon).toBe('priority_high');
    });

    it('should return correct icon for HIGH priority', () => {
      const icon = service.getPriorityIcon(NotificationPriority.HIGH);
      expect(icon).toBe('error');
    });

    it('should return correct icon for MEDIUM priority', () => {
      const icon = service.getPriorityIcon(NotificationPriority.MEDIUM);
      expect(icon).toBe('warning');
    });

    it('should return correct icon for LOW priority', () => {
      const icon = service.getPriorityIcon(NotificationPriority.LOW);
      expect(icon).toBe('info');
    });
  });

  describe('getTypeIcon', () => {
    it('should return correct icon for SYSTEM type', () => {
      const icon = service.getTypeIcon(NotificationType.SYSTEM);
      expect(icon).toBe('settings');
    });

    it('should return correct icon for USER type', () => {
      const icon = service.getTypeIcon(NotificationType.USER);
      expect(icon).toBe('person');
    });

    it('should return correct icon for COURSE type', () => {
      const icon = service.getTypeIcon(NotificationType.COURSE);
      expect(icon).toBe('school');
    });

    it('should return correct icon for MESSAGE type', () => {
      const icon = service.getTypeIcon(NotificationType.MESSAGE);
      expect(icon).toBe('mail');
    });

    it('should return correct icon for MEETING type', () => {
      const icon = service.getTypeIcon(NotificationType.MEETING);
      expect(icon).toBe('videocam');
    });

    it('should return correct icon for SECURITY type', () => {
      const icon = service.getTypeIcon(NotificationType.SECURITY);
      expect(icon).toBe('security');
    });

    it('should return correct icon for UPDATE type', () => {
      const icon = service.getTypeIcon(NotificationType.UPDATE);
      expect(icon).toBe('system_update');
    });

    it('should return correct icon for REMINDER type', () => {
      const icon = service.getTypeIcon(NotificationType.REMINDER);
      expect(icon).toBe('schedule');
    });

    it('should return correct icon for ANNOUNCEMENT type', () => {
      const icon = service.getTypeIcon(NotificationType.ANNOUNCEMENT);
      expect(icon).toBe('campaign');
    });

    it('should return default icon for ASSIGNMENT type', () => {
      const icon = service.getTypeIcon(NotificationType.ASSIGNMENT);
      expect(icon).toBe('assignment');
    });
  });

  describe('formatTimestamp', () => {
    it('should return "Just now" for timestamp less than 1 minute ago', () => {
      const timestamp = new Date(Date.now() - 30000); // 30 seconds ago
      const formatted = service.formatTimestamp(timestamp);
      expect(formatted).toBe('Just now');
    });

    it('should return minutes format for timestamp less than 1 hour ago', () => {
      const timestamp = new Date(Date.now() - 30 * 60 * 1000); // 30 minutes ago
      const formatted = service.formatTimestamp(timestamp);
      expect(formatted).toBe('30m ago');
    });

    it('should return hours format for timestamp less than 24 hours ago', () => {
      const timestamp = new Date(Date.now() - 5 * 60 * 60 * 1000); // 5 hours ago
      const formatted = service.formatTimestamp(timestamp);
      expect(formatted).toBe('5h ago');
    });

    it('should return days format for timestamp less than 7 days ago', () => {
      const timestamp = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000); // 3 days ago
      const formatted = service.formatTimestamp(timestamp);
      expect(formatted).toBe('3d ago');
    });

    it('should return date format for timestamp more than 7 days ago', () => {
      const timestamp = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // 10 days ago
      const formatted = service.formatTimestamp(timestamp);
      expect(formatted).toBe(timestamp.toLocaleDateString());
    });
  });

  describe('getNotificationIcon', () => {
    it('should return notification icon if provided', () => {
      const notification = { ...mockNotification, icon: 'custom-icon' };
      const icon = service.getNotificationIcon(notification);
      expect(icon).toBe('custom-icon');
    });

    it('should return type icon if notification icon is not provided', () => {
      const notification = { ...mockNotification, icon: '' };
      const icon = service.getNotificationIcon(notification);
      expect(icon).toBe('settings'); // SYSTEM type icon
    });

    it('should fallback to type icon when icon is empty', () => {
      const notification = { ...mockNotification, icon: '' };
      const icon = service.getNotificationIcon(notification);
      expect(icon).toBe('settings'); // SYSTEM type icon
    });

  describe('getNotificationColor', () => {
    it('should return notification color if provided', () => {
      const notification = { ...mockNotification, iconColor: '#ff0000' };
      const color = service.getNotificationColor(notification);
      expect(color).toBe('#ff0000');
    });

    it('should return priority color if notification color is not provided', () => {
      const notification = { ...mockNotification, iconColor: '' };
      const color = service.getNotificationColor(notification);
      expect(color).toBeDefined();
    });
  });
  });

  describe('getNotificationColor', () => {
    it('should return notification color if provided', () => {
      const notification = { ...mockNotification, iconColor: '#ff0000' };
      const color = service.getNotificationColor(notification);
      expect(color).toBe('#ff0000');
    });

    it('should return priority color if notification color is not provided', () => {
      const notification = { ...mockNotification, iconColor: '' };
      const color = service.getNotificationColor(notification);
      expect(color).toBeDefined();
    });
  });
});