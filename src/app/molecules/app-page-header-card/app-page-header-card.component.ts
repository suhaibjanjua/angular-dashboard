import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-app-page-header-card',
  imports: [NgIf],
  templateUrl: './app-page-header-card.component.html',
  styleUrl: './app-page-header-card.component.scss'
})
export class AppPageHeaderCardComponent {

  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() hasActions = false;

}
