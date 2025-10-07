import { Pipe, PipeTransform } from '@angular/core';
import { UserRole, UserRoleCssClassMap } from '../models/user.models';

@Pipe({
  name: 'userRoleClass'
})
export class UserRoleClassPipe implements PipeTransform {

  transform(role: string): string {
    const key = role as UserRole;
    return UserRoleCssClassMap[key] ?? 'role-default';
  }

}
