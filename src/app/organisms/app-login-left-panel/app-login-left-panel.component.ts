import { Component } from '@angular/core';
import { AppLogoComponent } from '../../atoms/app-logo/app-logo.component';

@Component({
  selector: 'app-login-left-panel',
  standalone: true,
  imports: [AppLogoComponent],
  templateUrl: './app-login-left-panel.component.html',
  styleUrls: ['./app-login-left-panel.component.scss']
})
export class AppLoginLeftPanelComponent {}
