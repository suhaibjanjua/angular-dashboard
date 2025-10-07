import { TestBed } from '@angular/core/testing';
import { LoggedInUserService } from './logged-in-user.service';
import { LoggedInUser } from '../models/logged-in-user.model';

describe('LoggedInUserService', () => {
  let service: LoggedInUserService;

  const mockUser: LoggedInUser = {
    id: 'test-user-001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 987-6543',
    role: 'user',
    avatar: 'https://example.com/avatar.jpg'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedInUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default user data', () => {
    const snapshot = service.snapshot;
    expect(snapshot).toBeTruthy();
    expect(snapshot?.firstName).toBe('Suhaib');
    expect(snapshot?.lastName).toBe('JANJUA');
    expect(snapshot?.email).toBe('suhaib.janjua@gmail.com');
  });

  it('should compute full name correctly', () => {
    const fullName = service.fullName();
    expect(fullName).toBe('Suhaib JANJUA');
  });

  it('should compute role correctly', () => {
    const role = service.role();
    expect(role).toBe('admin');
  });

  it('should compute email correctly', () => {
    const email = service.email();
    expect(email).toBe('suhaib.janjua@gmail.com');
  });

  it('should compute phone correctly', () => {
    const phone = service.phone();
    expect(phone).toBe('+1 (555) 123-4567');
  });

  it('should compute image correctly', () => {
    const image = service.image();
    expect(image).toBe(''); // Default user has empty avatar
  });

  it('should set new user', () => {
    service.setUser(mockUser);
    
    const snapshot = service.snapshot;
    expect(snapshot).toEqual(mockUser);
    expect(service.fullName()).toBe('John Doe');
    expect(service.role()).toBe('user');
    expect(service.email()).toBe('john.doe@example.com');
    expect(service.phone()).toBe('+1 (555) 987-6543');
    expect(service.image()).toBe('https://example.com/avatar.jpg');
  });

  it('should update user partially', () => {
    const initialSnapshot = service.snapshot;
    
    service.updateUser({
      firstName: 'Jane',
      email: 'jane.doe@example.com'
    });
    
    const updatedSnapshot = service.snapshot;
    expect(updatedSnapshot?.firstName).toBe('Jane');
    expect(updatedSnapshot?.email).toBe('jane.doe@example.com');
    expect(updatedSnapshot?.lastName).toBe(initialSnapshot?.lastName); // Should remain unchanged
    expect(updatedSnapshot?.phone).toBe(initialSnapshot?.phone); // Should remain unchanged
  });

  it('should clear user', () => {
    service.setUser(mockUser);
    expect(service.snapshot).not.toBeNull();
    
    service.clearUser();
    
    expect(service.snapshot).toBeNull();
    expect(service.fullName()).toBe('');
    expect(service.role()).toBe('guest');
    expect(service.email()).toBe('');
    expect(service.phone()).toBe('');
    expect(service.image()).toBe('');
  });

  it('should handle update when user is null', () => {
    service.clearUser();
    
    service.updateUser({
      firstName: 'Test'
    });
    
    expect(service.snapshot).toBeNull(); // Should remain null
  });

  it('should compute full name when user is null', () => {
    service.clearUser();
    
    const fullName = service.fullName();
    expect(fullName).toBe('');
  });

  it('should handle avatar update', () => {
    const newAvatar = 'https://example.com/new-avatar.jpg';
    
    service.updateUser({ avatar: newAvatar });
    
    expect(service.image()).toBe(newAvatar);
  });

  it('should handle avatar removal', () => {
    service.setUser(mockUser);
    expect(service.image()).toBe('https://example.com/avatar.jpg');
    
    service.updateUser({ avatar: undefined });
    
    expect(service.image()).toBe('');
  });

  it('should handle role changes', () => {
    service.updateUser({ role: 'user' });
    
    expect(service.role()).toBe('user');
  });

  it('should maintain reactivity after updates', () => {
    let fullNameChanges: string[] = [];
    
    // Subscribe to computed signal changes
    const subscription = service.fullName();
    fullNameChanges.push(subscription);
    
    service.updateUser({ firstName: 'Updated' });
    fullNameChanges.push(service.fullName());
    
    service.updateUser({ lastName: 'Name' });
    fullNameChanges.push(service.fullName());
    
    expect(fullNameChanges[0]).toBe('Suhaib JANJUA');
    expect(fullNameChanges[1]).toBe('Updated JANJUA');
    expect(fullNameChanges[2]).toBe('Updated Name');
  });

  it('should handle empty string values correctly', () => {
    service.updateUser({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
    
    expect(service.fullName()).toBe(' '); // Empty strings joined with space
    expect(service.email()).toBe('');
    expect(service.phone()).toBe('');
  });
});