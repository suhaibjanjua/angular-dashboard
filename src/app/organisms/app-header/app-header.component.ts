import { Component, Output, EventEmitter } from '@angular/core';
import { AppHamburgerIconComponent } from '../../atoms/app-hamburger-icon/app-hamburger-icon.component';
import { AppLogoTitleComponent } from '../../molecules/app-logo-title/app-logo-title.component';
import { AppHeaderTitleComponent } from '../../molecules/app-header-title/app-header-title.component';
import { AppNotificationBellComponent } from '../../atoms/app-notification-bell/app-notification-bell.component';
import { AppUserMenuComponent } from '../../molecules/app-user-menu/app-user-menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AppHamburgerIconComponent, AppLogoTitleComponent, AppHeaderTitleComponent, AppNotificationBellComponent, AppUserMenuComponent],
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  constructor(private router: Router) {}

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
