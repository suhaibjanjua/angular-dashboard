import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { MatMenuModule } from '@angular/material/menu';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Notifications } from '../../models/notification.model';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [MatMenuModule, NgFor, NgIf, MatIconModule, DatePipe],
  templateUrl: './app-notification-bell.component.html',
  styleUrls: ['./app-notification-bell.component.scss']
})
export class AppNotificationBellComponent {
  private notificationsService = inject(NotificationsService);
  private cdr = inject(ChangeDetectorRef);

  notifications = computed(() => this.notificationsService.allNotifications);
  unreadCount = computed(() => this.notificationsService.unreadCount);

  markAsRead(id: string) {
    this.notificationsService.markAsRead(id);
    this.cdr.markForCheck(); // force re-render inside MatMenu
  }

  trackById = (_: number, notif: Notifications) => notif.id;
}
