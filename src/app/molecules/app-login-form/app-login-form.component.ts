
import { Component } from '@angular/core';
import { AppInputComponent } from '../../atoms/app-input/app-input.component';
import { AppButtonComponent } from '../../atoms/app-button/app-button.component';
import { AppLinkComponent } from '../../atoms/app-link/app-link.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [AppInputComponent, AppButtonComponent, AppLinkComponent],
  templateUrl: './app-login-form.component.html',
  styleUrls: ['./app-login-form.component.scss']
})
export class AppLoginFormComponent {
  username = '';
  password = '';

  constructor(private router: Router) {}

  onLogin() {
    // Add authentication logic here if needed
    this.router.navigate(['/dashboard']);
  }
}
