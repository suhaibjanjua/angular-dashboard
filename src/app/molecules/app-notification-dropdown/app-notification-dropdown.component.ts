import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
import { NotificationUtilsService } from '../../services/notification-utils.service';
import { AppChipSetComponent } from '../app-chip-set/app-chip-set.component';
import { NotificationPriorityMetaPipe } from '../../pipes/notification-priority-meta.pipe';

@Component({
  selector: 'app-notification-dropdown',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    AppChipSetComponent,
    NotificationPriorityMetaPipe,
    NgIf,
    NgFor,
    TitleCasePipe
  ],
  template: `
    <div class="notification-dropdown" *ngIf="isOpen">
      
      <!-- Header -->
      <div class="notification-header">
        <div class="notification-title">
          <mat-icon>notifications</mat-icon>
          <span>Notifications</span>
        </div>
        <button 
          mat-icon-button 
          *ngIf="notifications.length > 0"
          (click)="markAllAsRead()"
          matTooltip="Mark all as read">
          <mat-icon>done_all</mat-icon>
        </button>
      </div>

      <!-- Loading State -->
      <div class="notification-loading" *ngIf="loading">
        <mat-spinner diameter="30"></mat-spinner>
        <span>Loading notifications...</span>
      </div>

      <!-- Notifications List -->
      <div class="notification-list" *ngIf="!loading && notifications.length > 0">
        <div 
          class="notification-item"
          *ngFor="let notification of notifications; trackBy: trackByNotificationId"
          [class.unread]="notification.status === NotificationStatus.UNREAD"
          (click)="onNotificationClick(notification)">
          
          <div class="notification-content">
            <div class="notification-icon">
              <mat-icon [style.color]="utils.getNotificationColor(notification)">
                {{ utils.getNotificationIcon(notification) }}
              </mat-icon>
            </div>
            
            <div class="notification-text">
              <h4 class="notification-title">{{ notification.title }}</h4>
              <p class="notification-message">{{ notification.message }}</p>
              <div class="notification-meta">
                <span class="notification-time">{{ utils.formatTimestamp(notification.timestamp) }}</span>
                <app-app-chip-set *ngIf="notification.priority === NotificationPriority.HIGH || notification.priority === NotificationPriority.URGENT" [chipSet]="[{value: (notification.priority | titlecase), bgClass: (notification.priority | notificationPriorityMeta).class, icon: (notification.priority | notificationPriorityMeta).icon, showIcon: true}]"></app-app-chip-set>
              </div>
            </div>
          </div>

          <div class="notification-actions">
            <button 
              mat-icon-button 
              *ngIf="notification.status === NotificationStatus.UNREAD"
              (click)="markAsRead(notification, $event)"
              matTooltip="Mark as read">
              <mat-icon>done</mat-icon>
            </button>
            <button 
              mat-icon-button 
              (click)="deleteNotification(notification, $event)"
              matTooltip="Delete">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div class="empty-state" *ngIf="!loading && notifications.length === 0">
        <mat-icon>notifications_none</mat-icon>
        <h3>No notifications</h3>
        <p>You're all caught up! Check back later for new updates.</p>
      </div>

      <!-- Footer -->
      <div class="notification-footer" *ngIf="notifications.length > 0">
        <button mat-button (click)="viewAllNotifications()" class="view-all-btn">
          <mat-icon>open_in_new</mat-icon>
          View All Notifications
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./app-notification-dropdown.component.scss']
})
export class AppNotificationDropdownComponent implements OnInit, OnDestroy {

  @Output() close = new EventEmitter<void>();

  notifications: Notification[] = [];
  loading = false;
  isOpen = true;

  // Expose constants to template
  NotificationPriority = NotificationPriority;
  NotificationStatus = NotificationStatus;
  NotificationPriorityColors = NotificationPriorityColors;

  private destroy$ = new Subject<void>();

  constructor(
    private notificationService: NotificationService,
    public utils: NotificationUtilsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Subscribe to notifications (limit to 10 for dropdown)
    this.notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe(notifications => {
        this.notifications = notifications.slice(0, 10);
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
      this.close.emit();
    }
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe();
  }

  markAsRead(notification: Notification, event: Event): void {
    event.stopPropagation();
    this.notificationService.markAsRead(notification.id).subscribe();
  }

  deleteNotification(notification: Notification, event: Event): void {
    event.stopPropagation();
    this.notificationService.deleteNotification(notification.id).subscribe();
  }

  viewAllNotifications(): void {
    this.router.navigate(['/notifications']);
    this.close.emit();
  }

  trackByNotificationId(index: number, notification: Notification): string {
    return notification.id;
  }
}