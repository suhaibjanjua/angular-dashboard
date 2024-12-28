import { Component } from '@angular/core';

import { AppHeaderComponent } from '../../organisms/app-header/app-header.component';
import { AppFooterComponent } from '../../organisms/app-footer/app-footer.component';
import { AppSidebarComponent } from '../../organisms/app-sidebar/app-sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-template',
  standalone: true,
  imports: [AppHeaderComponent, AppFooterComponent, AppSidebarComponent, RouterModule],
  templateUrl: './app-main-template.component.html',
  styleUrls: ['./app-main-template.component.scss']
})
export class AppMainTemplateComponent {
  sidebarCollapsed = false;
}
