import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotificationService } from './notification.service';
import { 
  NotificationApiResponse,
  NotificationStatus,
  NotificationType,
  NotificationPriority,
  NotificationFilter 
} from '../models/notification.models';

describe('NotificationService', () => {
  let service: NotificationService;
  let httpMock: HttpTestingController;

  const mockNotificationResponse: NotificationApiResponse = {
    data: [
      {
        id: '1',
        title: 'Test Notification',
        message: 'This is a test notification',
        type: NotificationType.SYSTEM,
        priority: NotificationPriority.MEDIUM,
        status: NotificationStatus.UNREAD,
        timestamp: new Date('2024-01-15T10:00:00'),
        createdAt: new Date('2024-01-15T10:00:00'),
        icon: 'info',
        iconColor: '#007bff',
        userId: 'user1',
        actionUrl: '/test',
        metadata: {}
      }
    ],
    total: 1,
    unread: 1
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService]
    });
    
    service = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadNotifications', () => {
    it('should load notifications from JSON file', () => {
      service.loadNotifications().subscribe(response => {
        expect(response).toEqual(mockNotificationResponse);
        expect(response.data.length).toBe(1);
        expect(response.unread).toBe(1);
      });

      const req = httpMock.expectOne('/assets/demo-data/notifications.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockNotificationResponse);
    });

    it('should handle error and return empty response', () => {
      service.loadNotifications().subscribe(response => {
        expect(response.data).toEqual([]);
        expect(response.total).toBe(0);
        expect(response.unread).toBe(0);
      });

      const req = httpMock.expectOne('/assets/demo-data/notifications.json');
      req.error(new ProgressEvent('Network error'));
    });
  });

  describe('getNotifications', () => {
    it('should get notifications with filter', () => {
      const filter: NotificationFilter = {
        types: [NotificationType.SYSTEM],
        priorities: [NotificationPriority.MEDIUM]
      };

      service.getNotifications(filter).subscribe(notifications => {
        expect(Array.isArray(notifications)).toBe(true);
      });
    });

    it('should get all notifications without filter', () => {
      service.getNotifications().subscribe(notifications => {
        expect(Array.isArray(notifications)).toBe(true);
      });
    });
  });

  describe('markAsRead', () => {
    it('should mark notification as read', () => {
      service.markAsRead('1').subscribe(result => {
        expect(result).toBe(true);
      });
    });
  });

  describe('markAllAsRead', () => {
    it('should mark all notifications as read', () => {
      service.markAllAsRead().subscribe(result => {
        expect(result).toBe(true);
      });
    });
  });

  describe('deleteNotification', () => {
    it('should delete notification', () => {
      service.deleteNotification('1').subscribe(result => {
        expect(result).toBe(true);
      });
    });
  });

  describe('archiveNotification', () => {
    it('should archive notification', () => {
      service.archiveNotification('1').subscribe(result => {
        expect(result).toBeTruthy();
      });
    });
  });

  describe('getNotificationSummary', () => {
    it('should return notification summary', () => {
      service.getNotificationSummary().subscribe(summary => {
        expect(summary.total).toBeGreaterThanOrEqual(0);
        expect(summary.unread).toBeGreaterThanOrEqual(0);
        expect(summary.byType).toBeDefined();
        expect(summary.byPriority).toBeDefined();
        expect(Array.isArray(summary.recentNotifications)).toBe(true);
      });
    });
  });

  describe('searchNotifications', () => {
    it('should search notifications by query', () => {
      service.searchNotifications('test').subscribe(results => {
        expect(Array.isArray(results)).toBe(true);
      });
    });
  });

  describe('getNotificationsByType', () => {
    it('should get notifications by type', () => {
      service.getNotificationsByType(NotificationType.SYSTEM).subscribe(notifications => {
        expect(Array.isArray(notifications)).toBe(true);
      });
    });
  });

  describe('getNotificationsByPriority', () => {
    it('should get notifications by priority', () => {
      service.getNotificationsByPriority(NotificationPriority.HIGH).subscribe(notifications => {
        expect(Array.isArray(notifications)).toBe(true);
      });
    });
  });

  describe('Reactive State', () => {
    it('should provide notifications observable', () => {
      service.notifications$.subscribe(notifications => {
        expect(Array.isArray(notifications)).toBe(true);
      });
    });

    it('should provide unread count observable', () => {
      service.unreadCount$.subscribe(count => {
        expect(typeof count).toBe('number');
        expect(count).toBeGreaterThanOrEqual(0);
      });
    });

    it('should provide loading observable', () => {
      service.loading$.subscribe(loading => {
        expect(typeof loading).toBe('boolean');
      });
    });
  });
});