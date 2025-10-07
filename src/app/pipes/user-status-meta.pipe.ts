import { Pipe, PipeTransform } from '@angular/core';
import { UserStatus, UserStatusCssClassMap } from '../models/user.models';
import { GeneralStatus, StatusIconMap } from '../models/common.models';

@Pipe({
  name: 'userStatusMeta'
})
export class UserStatusMetaPipe implements PipeTransform {

  transform(status: string): { class: string; icon: string } {
    const classKey = status as UserStatus;
    const iconKey = status as GeneralStatus;

    const cssClass = UserStatusCssClassMap[classKey] ?? 'status-default';
    const icon = StatusIconMap[iconKey] ?? 'help';

    return { class: cssClass, icon };
  }

}
