import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  templateUrl: './app-menu-item.component.html',
  styleUrls: ['./app-menu-item.component.scss']
})
export class AppMenuItemComponent {
  @Input() label: string = '';
  @Input() route: string = '';
  constructor(private router: Router) {}
  navigate() {
    if (this.route) {
      this.router.navigate([this.route]);
    }
  }
}
