import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { AppSidebarComponent } from './app-sidebar.component';

describe('AppSidebarComponent', () => {
  let component: AppSidebarComponent;
  let fixture: ComponentFixture<AppSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSidebarComponent, NoopAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} },
            queryParams: { subscribe: () => {} }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with collapsed state false', () => {
    expect(component.collapsed).toBeFalsy();
  });

  it('should have correct menu items', () => {
    expect(component.menu.length).toBeGreaterThan(0);
    
    const dashboardItem = component.menu.find(item => item.label === 'Dashboard');
    expect(dashboardItem).toBeTruthy();
    expect(dashboardItem?.icon).toBe('dashboard');
    expect(dashboardItem?.route).toBe('/dashboard');

    const usersItem = component.menu.find(item => item.label === 'Users');
    expect(usersItem).toBeTruthy();
    expect(usersItem?.icon).toBe('people');
    expect(usersItem?.route).toBe('/users');
  });

  it('should toggle sidebar collapse state', () => {
    const initialState = component.collapsed;
    component.toggleSidebar();
    expect(component.collapsed).toBe(!initialState);
  });

  it('should have menu items with correct structure', () => {
    component.menu.forEach(item => {
      expect(item.label).toBeDefined();
      expect(item.icon).toBeDefined();
      expect(item.route).toBeDefined();
      expect(typeof item.label).toBe('string');
      expect(typeof item.icon).toBe('string');
      expect(typeof item.route).toBe('string');
    });
  });

  it('should display sidebar navigation', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.sidebar')).toBeTruthy();
  });

  it('should contain Dashboard menu item', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dashboardItem = compiled.querySelector('li[ng-reflect-router-link="/dashboard"]');
    expect(dashboardItem).toBeTruthy();
  });

  it('should have Material Design icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const icons = compiled.querySelectorAll('mat-icon');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('should have expected menu items', () => {
    const expectedItems = ['Dashboard', 'Users', 'Documents', 'Courses', 'Classes', 'Meetings', 'Reports'];
    expectedItems.forEach(label => {
      const item = component.menu.find(menuItem => menuItem.label === label);
      expect(item).toBeTruthy();
    });
  });

  it('should accept collapsed input property', () => {
    component.collapsed = true;
    expect(component.collapsed).toBeTruthy();
  });
});