import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface SidebarMenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent {
  @Input() collapsed = false;
  menu: SidebarMenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Users', icon: 'people', route: '/users' },
    { label: 'Documents', icon: 'description', route: '/documents' },
    { label: 'Courses', icon: 'school', route: '/courses' },
    { label: 'Classes', icon: 'class', route: '/classes' },
    { label: 'Meetings', icon: 'video_call', route: '/meetings' },
    { label: 'Reports', icon: 'assessment', route: '/reports' },
    { label: 'Calendar', icon: 'calendar_month', route: '/calendar' }
  ];

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}

