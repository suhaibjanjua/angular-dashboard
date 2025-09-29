
import { Routes } from '@angular/router';
import { AppMainTemplateComponent } from './templates/app-main-template/app-main-template.component';

export const routes: Routes = [
	{
		path: 'login',
		loadComponent: () => import('./pages/app-login-page/app-login-page.component').then(m => m.AppLoginPageComponent)
	},
	{
		path: '',
		component: AppMainTemplateComponent,
		children: [
			{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
			{ path: 'dashboard', loadComponent: () => import('./pages/app-dashboard-page/app-dashboard-page.component').then(m => m.AppDashboardPageComponent) },
			{ path: 'users', loadComponent: () => import('./pages/app-users-page/app-users-page.component').then(m => m.AppUsersPageComponent) },
			{ path: 'documents', loadComponent: () => import('./pages/app-documents-page/app-documents-page.component').then(m => m.AppDocumentsPageComponent) },
			{ path: 'info-assets', loadComponent: () => import('./pages/app-documents-page/app-documents-page.component').then(m => m.AppDocumentsPageComponent) }, // Placeholder
			{ path: 'ra-criteria', loadComponent: () => import('./pages/app-reports-page/app-reports-page.component').then(m => m.AppReportsPageComponent) }, // Placeholder
			{ path: 'asset-ratings', loadComponent: () => import('./pages/app-reports-page/app-reports-page.component').then(m => m.AppReportsPageComponent) }, // Placeholder
			{ path: 'risk-treatments', loadComponent: () => import('./pages/app-reports-page/app-reports-page.component').then(m => m.AppReportsPageComponent) }, // Placeholder
			{ path: 'courses', loadComponent: () => import('./pages/app-courses-page/app-courses-page.component').then(m => m.AppCoursesPageComponent) },
			{ path: 'classes', loadComponent: () => import('./pages/app-classes-page/app-classes-page.component').then(m => m.AppClassesPageComponent) },
			{ path: 'meetings', loadComponent: () => import('./pages/app-meetings-page/app-meetings-page.component').then(m => m.AppMeetingsPageComponent) },
			{ path: 'reports', loadComponent: () => import('./pages/app-reports-page/app-reports-page.component').then(m => m.AppReportsPageComponent) },
			{ path: 'workflows', loadComponent: () => import('./pages/app-workflows-page/app-workflows-page.component').then(m => m.AppWorkflowsPageComponent) },
			// User menu pages
			{ path: 'profile', loadComponent: () => import('./pages/app-profile-page/app-profile-page.component').then(m => m.AppProfilePageComponent) },
			{ path: 'change-password', loadComponent: () => import('./pages/app-change-password-page/app-change-password-page.component').then(m => m.AppChangePasswordPageComponent) },
			{ path: 'settings', loadComponent: () => import('./pages/app-settings-page/app-settings-page.component').then(m => m.AppSettingsPageComponent) },
			{ path: 'select-language', loadComponent: () => import('./pages/app-select-language-page/app-select-language-page.component').then(m => m.AppSelectLanguagePageComponent) },
			{ path: 'change-theme', loadComponent: () => import('./pages/app-change-theme-page/app-change-theme-page.component').then(m => m.AppChangeThemePageComponent) },
			{ path: 'delete-account', loadComponent: () => import('./pages/app-delete-account-page/app-delete-account-page.component').then(m => m.AppDeleteAccountPageComponent) }
		]
	}
];
