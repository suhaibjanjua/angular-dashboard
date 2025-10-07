import { Pipe, PipeTransform } from '@angular/core';
import { NotificationPriority, NotificationPriorityClass, NotificationPriorityColors, NotificationPriorityIcon, NotificationPriorityLabelIcons, NotificationPriorityLabels } from '../models/notification.models';

@Pipe({
  name: 'notificationPriorityMeta'
})
export class NotificationPriorityMetaPipe implements PipeTransform {

  transform(priority: string): { class: string; icon: string; color: string; label: string; labelIcon: string } {
    const key = priority as NotificationPriority;

    return {
      class: NotificationPriorityClass[key] ?? 'priority-default',
      icon: NotificationPriorityIcon[key] ?? 'help',
      color: NotificationPriorityColors[key] ?? '#9e9e9e',
      label: NotificationPriorityLabels[key] ?? 'Unknown',
      labelIcon: NotificationPriorityLabelIcons[key] ?? 'priority-default'
    };
  }

}
