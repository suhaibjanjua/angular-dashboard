import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './app-user-avatar.component.html',
  styleUrls: ['./app-user-avatar.component.scss']
})
export class AppUserAvatarComponent {
  @Input() fullName: string = '';
  @Input() src?: string | null;

  get initials(): string {
    const parts = this.fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
}
