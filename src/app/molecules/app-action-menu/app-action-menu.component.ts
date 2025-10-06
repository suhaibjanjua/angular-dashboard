import { Component, Input } from '@angular/core';
import { ActionMenuItem } from '../../models/action.menu.model';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-app-action-menu',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule, MatDividerModule, MatTooltip, NgClass, NgFor, NgIf],
  templateUrl: './app-action-menu.component.html',
  styleUrl: './app-action-menu.component.scss'
})
export class AppActionMenuComponent {
  @Input() actions: ActionMenuItem[] = [];
}
