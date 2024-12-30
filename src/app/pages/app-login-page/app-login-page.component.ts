import { Component } from '@angular/core';
import { AppLoginTemplateComponent } from '../../templates/app-login-template/app-login-template.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [AppLoginTemplateComponent],
  template: `<app-login-template></app-login-template>`,
  styleUrls: ['./app-login-page.component.scss']
})
export class AppLoginPageComponent {}
