import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-link.component.html',
  styleUrls: ['./app-link.component.scss']
})
export class AppLinkComponent {
  @Input() href: string = '#';
  @Input() label: string = '';
  @Input() color: string = '#6c4bb6';
  @Input() underline: boolean = false;
}
