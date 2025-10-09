import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault],
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.scss']
})
export class AppButtonComponent {
  @Input() label!: string;
  @Input() icon?: string;
  @Input() color: 'primary' | 'accent' | 'warn' | undefined = 'primary';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: 'flat' | 'raised' | 'stroked' | 'basic' = 'flat';
  @Input() disabled = false;
  @Input() loading = false;
}
