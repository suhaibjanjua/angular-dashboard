import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { 
  Notification, 
  NotificationApiResponse, 
  NotificationFilter, 
  NotificationSummary,
  NotificationStatus,
  NotificationType,
  NotificationPriority 
} from '../models/notification.models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly DATA_URL = '/assets/demo-data/notifications.json';
  
  // BehaviorSubjects for reactive state management
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  private unreadCountSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // Public observables
  public notifications$ = this.notificationsSubject.asObservable();
  public unreadCount$ = this.unreadCountSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadNotifications();
    // Simulate real-time updates every 30 seconds
    this.startRealTimeUpdates();
  }

  /**
   * Load all notifications from JSON data
   */
  loadNotifications(): Observable<NotificationApiResponse> {
    this.loadingSubject.next(true);
    
    return this.http.get<NotificationApiResponse>(this.DATA_URL).pipe(
      delay(300), // Simulate network delay
      tap((response) => {
        // Parse date strings to Date objects
        const notifications = response.data.map(notification => ({
          ...notification,
          timestamp: new Date(notification.timestamp),
          createdAt: new Date(notification.createdAt),
          readAt: notification.readAt ? new Date(notification.readAt) : undefined,
          archivedAt: notification.archivedAt ? new Date(notification.archivedAt) : undefined
        }));
        
        // Sort by timestamp (newest first)
        notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        
        this.notificationsSubject.next(notifications);
        this.unreadCountSubject.next(response.unread);
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        console.error('Error loading notifications:', error);
        this.loadingSubject.next(false);
        return of({ data: [], total: 0, unread: 0 });
      })
    );
  }

  /**
   * Get notifications with optional filtering
   */
  getNotifications(filter?: NotificationFilter): Observable<Notification[]> {
    return this.notifications$.pipe(
      map(notifications => this.applyFilter(notifications, filter))
    );
  }

  /**
   * Get notification by ID
   */
  getNotificationById(id: string): Observable<Notification | undefined> {
    return this.notifications$.pipe(
      map(notifications => notifications.find(n => n.id === id))
    );
  }

  /**
   * Mark notification as read
   */
  markAsRead(notificationId: string): Observable<boolean> {
    const notifications = this.notificationsSubject.value;
    const notificationIndex = notifications.findIndex(n => n.id === notificationId);
    
    if (notificationIndex !== -1 && notifications[notificationIndex].status === NotificationStatus.UNREAD) {
      notifications[notificationIndex].status = NotificationStatus.READ;
      notifications[notificationIndex].readAt = new Date();
      
      this.notificationsSubject.next([...notifications]);
      this.updateUnreadCount();
      
      return of(true).pipe(delay(200)); // Simulate API call
    }
    
    return of(false);
  }

  /**
   * Mark all notifications as read
   */
  markAllAsRead(): Observable<boolean> {
    const notifications = this.notificationsSubject.value;
    const unreadNotifications = notifications.filter(n => n.status === NotificationStatus.UNREAD);
    
    unreadNotifications.forEach(notification => {
      notification.status = NotificationStatus.READ;
      notification.readAt = new Date();
    });
    
    this.notificationsSubject.next([...notifications]);
    this.updateUnreadCount();
    
    return of(true).pipe(delay(300)); // Simulate API call
  }

  /**
   * Delete notification
   */
  deleteNotification(notificationId: string): Observable<boolean> {
    const notifications = this.notificationsSubject.value;
    const filteredNotifications = notifications.filter(n => n.id !== notificationId);
    
    this.notificationsSubject.next(filteredNotifications);
    this.updateUnreadCount();
    
    return of(true).pipe(delay(200)); // Simulate API call
  }

  /**
   * Archive notification
   */
  archiveNotification(notificationId: string): Observable<boolean> {
    const notifications = this.notificationsSubject.value;
    const notificationIndex = notifications.findIndex(n => n.id === notificationId);
    
    if (notificationIndex !== -1) {
      notifications[notificationIndex].status = NotificationStatus.ARCHIVED;
      notifications[notificationIndex].archivedAt = new Date();
      
      this.notificationsSubject.next([...notifications]);
      this.updateUnreadCount();
      
      return of(true).pipe(delay(200)); // Simulate API call
    }
    
    return of(false);
  }

  /**
   * Get notification summary for dashboard
   */
  getNotificationSummary(): Observable<NotificationSummary> {
    return this.notifications$.pipe(
      map(notifications => {
        const activeNotifications = notifications.filter(n => n.status !== NotificationStatus.ARCHIVED);
        
        const summary: NotificationSummary = {
          total: activeNotifications.length,
          unread: activeNotifications.filter(n => n.status === NotificationStatus.UNREAD).length,
          byType: this.getCountByType(activeNotifications),
          byPriority: this.getCountByPriority(activeNotifications),
          recentNotifications: activeNotifications.slice(0, 5)
        };
        
        return summary;
      })
    );
  }

  /**
   * Search notifications
   */
  searchNotifications(query: string): Observable<Notification[]> {
    return this.notifications$.pipe(
      map(notifications => 
        notifications.filter(notification =>
          notification.title.toLowerCase().includes(query.toLowerCase()) ||
          notification.message.toLowerCase().includes(query.toLowerCase()) ||
          notification.userName?.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }

  /**
   * Get notifications by type
   */
  getNotificationsByType(type: NotificationType): Observable<Notification[]> {
    return this.notifications$.pipe(
      map(notifications => notifications.filter(n => n.type === type))
    );
  }

  /**
   * Get notifications by priority
   */
  getNotificationsByPriority(priority: NotificationPriority): Observable<Notification[]> {
    return this.notifications$.pipe(
      map(notifications => notifications.filter(n => n.priority === priority))
    );
  }

  /**
   * Simulate adding a new notification (for demo purposes)
   */
  addNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'timestamp'>): Observable<Notification> {
    const newNotification: Notification = {
      ...notification,
      id: `n${Date.now()}`,
      createdAt: new Date(),
      timestamp: new Date()
    };
    
    const notifications = [newNotification, ...this.notificationsSubject.value];
    this.notificationsSubject.next(notifications);
    this.updateUnreadCount();
    
    return of(newNotification).pipe(delay(100));
  }

  // Private helper methods

  private applyFilter(notifications: Notification[], filter?: NotificationFilter): Notification[] {
    if (!filter) return notifications;
    
    let filtered = notifications;
    
    if (filter.types && filter.types.length > 0) {
      filtered = filtered.filter(n => filter.types!.includes(n.type));
    }
    
    if (filter.priorities && filter.priorities.length > 0) {
      filtered = filtered.filter(n => filter.priorities!.includes(n.priority));
    }
    
    if (filter.status && filter.status.length > 0) {
      filtered = filtered.filter(n => filter.status!.includes(n.status));
    }
    
    if (filter.dateRange) {
      filtered = filtered.filter(n => 
        n.timestamp >= filter.dateRange!.startDate && 
        n.timestamp <= filter.dateRange!.endDate
      );
    }
    
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      filtered = filtered.filter(n =>
        n.title.toLowerCase().includes(query) ||
        n.message.toLowerCase().includes(query) ||
        n.userName?.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }

  private updateUnreadCount(): void {
    const notifications = this.notificationsSubject.value;
    const unreadCount = notifications.filter(n => n.status === NotificationStatus.UNREAD).length;
    this.unreadCountSubject.next(unreadCount);
  }

  private getCountByType(notifications: Notification[]): { [key in NotificationType]: number } {
    const counts = {} as { [key in NotificationType]: number };
    
    // Initialize all types with 0
    Object.values(NotificationType).forEach(type => {
      counts[type] = 0;
    });
    
    // Count notifications by type
    notifications.forEach(notification => {
      counts[notification.type]++;
    });
    
    return counts;
  }

  private getCountByPriority(notifications: Notification[]): { [key in NotificationPriority]: number } {
    const counts = {} as { [key in NotificationPriority]: number };
    
    // Initialize all priorities with 0
    Object.values(NotificationPriority).forEach(priority => {
      counts[priority] = 0;
    });
    
    // Count notifications by priority
    notifications.forEach(notification => {
      counts[notification.priority]++;
    });
    
    return counts;
  }

  private startRealTimeUpdates(): void {
    // Simulate real-time updates every 30 seconds
    timer(30000, 30000).subscribe(() => {
      // In a real app, this would check for new notifications from the server
      this.simulateNewNotification();
    });
  }

  private simulateNewNotification(): void {
    // Randomly add a new notification for demo purposes
    if (Math.random() < 0.3) { // 30% chance every 30 seconds
      const demoNotifications = [
        {
          title: 'New Course Available',
          message: 'Cloud Computing Fundamentals course is now open for enrollment.',
          type: NotificationType.COURSE,
          priority: NotificationPriority.MEDIUM,
          status: NotificationStatus.UNREAD,
          icon: 'school',
          iconColor: '#ff9800',
          userName: 'Course System'
        },
        {
          title: 'Meeting Reminder',
          message: 'Your meeting with Dr. Smith starts in 10 minutes.',
          type: NotificationType.MEETING,
          priority: NotificationPriority.HIGH,
          status: NotificationStatus.UNREAD,
          icon: 'videocam',
          iconColor: '#f44336',
          userName: 'Calendar System'
        }
      ];
      
      const randomNotification = demoNotifications[Math.floor(Math.random() * demoNotifications.length)];
      this.addNotification(randomNotification);
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }
}