import { Component } from '@angular/core';
import { AppLoginLeftPanelComponent } from '../../organisms/app-login-left-panel/app-login-left-panel.component';
import { AppLoginRightPanelComponent } from '../../organisms/app-login-right-panel/app-login-right-panel.component';

@Component({
  selector: 'app-login-template',
  standalone: true,
  imports: [AppLoginLeftPanelComponent, AppLoginRightPanelComponent],
  templateUrl: './app-login-template.component.html',
  styleUrls: ['./app-login-template.component.scss']
})
export class AppLoginTemplateComponent {}
