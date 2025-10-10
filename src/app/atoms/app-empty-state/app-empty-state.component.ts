import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  imports: [MatIconModule],
  templateUrl: './app-empty-state.component.html',
  styleUrl: './app-empty-state.component.scss'
})
export class AppEmptyStateComponent {
  @Input() icon: string = 'info';
  @Input() title: string = 'No data available';
  @Input() subtitle: string = '';
}
