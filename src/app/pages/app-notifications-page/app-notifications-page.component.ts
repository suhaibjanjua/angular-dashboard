import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { AppHeaderTitleComponent } from '../../molecules/app-header-title/app-header-title.component';
import { 
  Notification, 
  NotificationFilter, 
  NotificationType, 
  NotificationPriority,
  NotificationStatus,
  NotificationTypeLabels,
  NotificationPriorityLabels,
  NotificationPriorityColors 
} from '../../models/notification.models';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDividerModule,
    AppHeaderTitleComponent
  ],
  templateUrl: './app-notifications-page.component.html',
  styleUrls: ['./app-notifications-page.component.scss']
})
export class AppNotificationsPageComponent implements OnInit, OnDestroy {

  // Data properties
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  paginatedNotifications: Notification[] = [];
  loading = false;
  
  // Filter properties
  searchQuery = '';
  selectedTypes: NotificationType[] = [];
  selectedPriorities: NotificationPriority[] = [];
  selectedStatuses: NotificationStatus[] = [];
  
  // Pagination properties
  pageSize = 10;
  pageIndex = 0;
  totalCount = 0;
  pageSizeOptions = [5, 10, 25, 50];
  
    // Expose constants to template
  readonly NotificationType = NotificationType;
  readonly NotificationStatus = NotificationStatus;
  readonly NotificationPriority = NotificationPriority;
  readonly NotificationTypeLabels = NotificationTypeLabels;
  readonly NotificationPriorityLabels = NotificationPriorityLabels;
  readonly NotificationPriorityColors = NotificationPriorityColors;
  readonly Object = Object;
  
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {
    // Setup search debouncing
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.searchQuery = query;
      this.applyFilters();
    });
  }

  ngOnInit(): void {
    this.loadNotifications();
    
    // Subscribe to notification updates
    this.notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe(notifications => {
        this.notifications = notifications;
        this.applyFilters();
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

  loadNotifications(): void {
    this.notificationService.loadNotifications().subscribe();
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.onSearchChange(target?.value || '');
  }

  onTypeFilterChange(types: NotificationType[]): void {
    this.selectedTypes = types;
    this.resetPagination();
    this.applyFilters();
  }

  onPriorityFilterChange(priorities: NotificationPriority[]): void {
    this.selectedPriorities = priorities;
    this.resetPagination();
    this.applyFilters();
  }

  onStatusFilterChange(statuses: NotificationStatus[]): void {
    this.selectedStatuses = statuses;
    this.resetPagination();
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedTypes = [];
    this.selectedPriorities = [];
    this.selectedStatuses = [];
    this.resetPagination();
    this.applyFilters();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedNotifications();
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

  markAsRead(notification: Notification, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.notificationService.markAsRead(notification.id).subscribe();
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe();
  }

  deleteNotification(notification: Notification, event: Event): void {
    event.stopPropagation();
    this.notificationService.deleteNotification(notification.id).subscribe();
  }

  archiveNotification(notification: Notification, event: Event): void {
    event.stopPropagation();
    this.notificationService.archiveNotification(notification.id).subscribe();
  }

  private applyFilters(): void {
    const filter: NotificationFilter = {
      searchQuery: this.searchQuery || undefined,
      types: this.selectedTypes.length > 0 ? this.selectedTypes : undefined,
      priorities: this.selectedPriorities.length > 0 ? this.selectedPriorities : undefined,
      status: this.selectedStatuses.length > 0 ? this.selectedStatuses : undefined
    };

    this.notificationService.getNotifications(filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe(filtered => {
        this.filteredNotifications = filtered;
        this.totalCount = filtered.length;
        this.updatePaginatedNotifications();
      });
  }

  private updatePaginatedNotifications(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedNotifications = this.filteredNotifications.slice(startIndex, endIndex);
  }

  private resetPagination(): void {
    this.pageIndex = 0;
  }

  // Helper methods for template
  getNotificationIcon(notification: Notification): string {
    return notification.icon || this.getTypeIcon(notification.type);
  }

  getNotificationColor(notification: Notification | { type: NotificationType, priority: NotificationPriority }): string {
    if ('iconColor' in notification) {
      return notification.iconColor || NotificationPriorityColors[notification.priority];
    }
    return NotificationPriorityColors[notification.priority];
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

  getPriorityIcon(priority: NotificationPriority): string {
    const iconMap: { [key in NotificationPriority]: string } = {
      [NotificationPriority.LOW]: 'low_priority',
      [NotificationPriority.MEDIUM]: 'priority_high',
      [NotificationPriority.HIGH]: 'priority_high',
      [NotificationPriority.URGENT]: 'warning'
    };
    return iconMap[priority];
  }

  getTypeLabel(type: NotificationType): string {
    return NotificationTypeLabels[type];
  }

  getPriorityLabel(priority: NotificationPriority): string {
    return NotificationPriorityLabels[priority];
  }

  getPriorityColor(priority: NotificationPriority): string {
    return NotificationPriorityColors[priority];
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
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
      return timestamp.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }

  trackByNotificationId(index: number, notification: Notification): string {
    return notification.id;
  }
}