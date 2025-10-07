import { TestBed } from '@angular/core/testing';
import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('allNotifications', () => {
    it('should return all notifications', () => {
      const notifications = service.allNotifications;
      expect(Array.isArray(notifications)).toBe(true);
      expect(notifications.length).toBeGreaterThan(0);
    });

    it('should contain expected notification properties', () => {
      const notifications = service.allNotifications;
      expect(notifications[0].id).toBeDefined();
      expect(notifications[0].type).toBeDefined();
      expect(notifications[0].message).toBeDefined();
      expect(notifications[0].timestamp).toBeDefined();
      expect(notifications[0].read).toBeDefined();
    });

    it('should have initial notifications', () => {
      const notifications = service.allNotifications;
      expect(notifications.length).toBe(3);
      
      const firstNotification = notifications[0];
      expect(firstNotification.id).toBe('1');
      expect(firstNotification.type).toBe('info');
      expect(firstNotification.message).toBe('New user signed up');
      expect(firstNotification.read).toBe(false);
    });
  });

  describe('unreadCount', () => {
    it('should return correct unread count', () => {
      const unreadCount = service.unreadCount;
      expect(typeof unreadCount).toBe('number');
      expect(unreadCount).toBeGreaterThanOrEqual(0);
    });

    it('should initially have 2 unread notifications', () => {
      const unreadCount = service.unreadCount;
      expect(unreadCount).toBe(2);
    });

    it('should update unread count when notifications are marked as read', () => {
      const initialUnreadCount = service.unreadCount;
      service.markAsRead('1');
      const newUnreadCount = service.unreadCount;
      
      expect(newUnreadCount).not.toBe(initialUnreadCount);
    });
  });

  describe('markAsRead', () => {
    it('should toggle read status of notification', () => {
      const notifications = service.allNotifications;
      const notification = notifications.find(n => n.id === '1');
      const initialReadStatus = notification?.read;
      
      service.markAsRead('1');
      
      const updatedNotifications = service.allNotifications;
      const updatedNotification = updatedNotifications.find(n => n.id === '1');
      
      expect(updatedNotification?.read).toBe(!initialReadStatus);
    });

    it('should not affect other notifications', () => {
      const initialNotifications = service.allNotifications;
      const otherNotification = initialNotifications.find(n => n.id === '2');
      const initialReadStatus = otherNotification?.read;
      
      service.markAsRead('1');
      
      const updatedNotifications = service.allNotifications;
      const unchangedNotification = updatedNotifications.find(n => n.id === '2');
      
      expect(unchangedNotification?.read).toBe(initialReadStatus);
    });

    it('should handle non-existent notification ID gracefully', () => {
      const initialNotifications = service.allNotifications;
      const initialLength = initialNotifications.length;
      
      service.markAsRead('non-existent');
      
      const updatedNotifications = service.allNotifications;
      expect(updatedNotifications.length).toBe(initialLength);
    });
  });

  describe('clearAll', () => {
    it('should remove all notifications', () => {
      service.clearAll();
      
      const notifications = service.allNotifications;
      expect(notifications.length).toBe(0);
    });

    it('should reset unread count to zero', () => {
      service.clearAll();
      
      const unreadCount = service.unreadCount;
      expect(unreadCount).toBe(0);
    });
  });

  describe('Signal Reactivity', () => {
    it('should update allNotifications signal when markAsRead is called', () => {
      const initialNotifications = service.allNotifications;
      expect(initialNotifications.length).toBe(3);
      
      service.markAsRead('1');
      
      const updatedNotifications = service.allNotifications;
      expect(updatedNotifications).not.toBe(initialNotifications); // Reference should change
      expect(updatedNotifications.length).toBe(3); // Length should remain same
    });

    it('should update allNotifications signal when clearAll is called', () => {
      service.clearAll();
      
      const notifications = service.allNotifications;
      expect(notifications.length).toBe(0);
    });

    it('should maintain signal reactivity across multiple operations', () => {
      // Mark as read
      service.markAsRead('1');
      let notifications = service.allNotifications;
      expect(notifications.find(n => n.id === '1')?.read).toBe(true);
      
      // Mark as unread (toggle back)
      service.markAsRead('1');
      notifications = service.allNotifications;
      expect(notifications.find(n => n.id === '1')?.read).toBe(false);
      
      // Clear all
      service.clearAll();
      notifications = service.allNotifications;
      expect(notifications.length).toBe(0);
    });
  });

  describe('Notification Types', () => {
    it('should have info type notification', () => {
      const notifications = service.allNotifications;
      const infoNotification = notifications.find(n => n.type === 'info');
      expect(infoNotification).toBeDefined();
    });

    it('should have success type notification', () => {
      const notifications = service.allNotifications;
      const successNotification = notifications.find(n => n.type === 'success');
      expect(successNotification).toBeDefined();
    });

    it('should have warning type notification', () => {
      const notifications = service.allNotifications;
      const warningNotification = notifications.find(n => n.type === 'warning');
      expect(warningNotification).toBeDefined();
    });
  });
});