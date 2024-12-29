import { Component } from '@angular/core';
import { AppLoginFormComponent } from '../../molecules/app-login-form/app-login-form.component';

@Component({
  selector: 'app-login-right-panel',
  standalone: true,
  imports: [AppLoginFormComponent],
  templateUrl: './app-login-right-panel.component.html',
  styleUrls: ['./app-login-right-panel.component.scss']
})
export class AppLoginRightPanelComponent {}
