import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppUserAvatarComponent } from '../../atoms/app-user-avatar/app-user-avatar.component';
import { MatMenuModule, MatMenuPanel } from '@angular/material/menu';

@Component({
  selector: 'app-user-info-card',
  imports: [MatIconModule, MatMenuModule, AppUserAvatarComponent, NgIf],
  templateUrl: './app-user-info-card.component.html',
  styleUrl: './app-user-info-card.component.scss'
})
export class AppUserInfoCardComponent {

  @Input() fullName: string = '';
  @Input() avatar: string | null = null;
  @Input() avatarSize: 'user-avatar-36' | 'user-avatar-40' = 'user-avatar-36';
  @Input() roleOrEmail: string = '';
  @Input() menuId: MatMenuPanel<any> | null = null;

  get hasMenu(): boolean {
    return !!this.menuId;
  }

}
