import { Pipe, PipeTransform } from '@angular/core';
import { NotificationType, NotificationTypeIcon, NotificationTypeLabels } from '../models';

@Pipe({
  name: 'notificationTypeMeta'
})
export class NotificationTypeMetaPipe implements PipeTransform {

  transform(type: string): { icon: string; label: string; } {
    const key = type as NotificationType;

    return {
      icon: NotificationTypeIcon[key] ?? 'notifications',
      label: NotificationTypeLabels[key] ?? 'Unknown'
    };
  }

}
