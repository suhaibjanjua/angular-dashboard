import { Component } from '@angular/core';
import { AppMenuItemComponent } from '../../atoms/app-menu-item/app-menu-item.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AppMenuItemComponent],
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent {}
