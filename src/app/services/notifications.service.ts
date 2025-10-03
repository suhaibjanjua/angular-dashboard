import { Injectable, signal } from '@angular/core';
import { Notifications } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notifications = signal<Notifications[]>([
    {
      id: '1',
      type: 'info',
      message: 'New user signed up',
      timestamp: new Date(),
      read: false
    },
    {
      id: '2',
      type: 'success',
      message: 'Backup completed',
      timestamp: new Date(),
      read: false
    },
    {
      id: '3',
      type: 'warning',
      message: 'Storage nearing limit',
      timestamp: new Date(),
      read: true
    }
  ]);

  get allNotifications() {
    return this.notifications();
  }

  get unreadCount() {
    return this.notifications().filter(n => !n.read).length;
  }

  markAsRead(id: string) {
    this.notifications.update(n =>
      n.map(item => item.id === id ? { ...item, read: !item.read } : item)
    );
  }

  clearAll() {
    this.notifications.set([]);
  }
}
