import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AppProfilePageComponent } from './app-profile-page.component';

describe('AppProfilePageComponent', () => {
  let component: AppProfilePageComponent;
  let fixture: ComponentFixture<AppProfilePageComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AppProfilePageComponent, NoopAnimationsModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppProfilePageComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user profile information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('My Profile');
    expect(compiled.querySelector('.avatar-placeholder')?.textContent).toContain('JS');
  });

  it('should handle profile save', () => {
    spyOn(console, 'log');
    component.saveProfile();
    expect(console.log).toHaveBeenCalledWith('Saving profile:', component.profile);
  });

  it('should handle avatar upload', () => {
    spyOn(console, 'log');
    component.uploadAvatar();
    expect(console.log).toHaveBeenCalledWith('Uploading new avatar');
  });

  it('should handle avatar removal', () => {
    spyOn(console, 'log');
    component.removeAvatar();
    expect(console.log).toHaveBeenCalledWith('Removing avatar');
  });

  it('should handle cancel action', () => {
    spyOn(console, 'log');
    component.cancel();
    expect(console.log).toHaveBeenCalledWith('Cancelling profile changes');
  });

  it('should initialize with correct profile values', () => {
    expect(component.profile.firstName).toBe('Suhaib');
    expect(component.profile.lastName).toBe('JANJUA');
    expect(component.profile.email).toBe('suhaib.janjua@gmail.com');
    expect(component.profile.phone).toBe('+1 (555) 123-4567');
  });

  it('should have profile object with all required properties', () => {
    expect(component.profile.firstName).toBeDefined();
    expect(component.profile.lastName).toBeDefined();
    expect(component.profile.email).toBeDefined();
    expect(component.profile.phone).toBeDefined();
  });
});