import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
import { 
  User, 
  UserApiResponse, 
  UserFormData, 
  UserStatus, 
  UserRole, 
  UserCrudAction 
} from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  private readonly DATA_URL = '/assets/demo-data/users.json';

  constructor(private http: HttpClient) {}

  // Load users from JSON file
  loadUsers(): Observable<UserApiResponse> {
    return this.http.get<UserApiResponse>(this.DATA_URL).pipe(
      delay(500), // Simulate network delay
      catchError(error => {
        console.error('Error loading users:', error);
        return of({ data: [], total: 0, page: 1, pageSize: 10 });
      })
    );
  }

  // Get users with pagination
  getUsers(page: number = 1, pageSize: number = 10, sortBy?: string, sortDirection?: 'asc' | 'desc', searchTerm?: string): Observable<UserApiResponse> {
    return this.loadUsers().pipe(
      map(response => {
        let users = [...response.data];
        
        // Apply search filter if specified
        if (searchTerm && searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          users = users.filter(user => 
            user.firstName.toLowerCase().includes(term) ||
            user.lastName.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term) ||
            user.role.toLowerCase().includes(term) ||
            user.department?.toLowerCase().includes(term)
          );
        }
        
        // Apply sorting if specified
        if (sortBy && sortDirection) {
          users = this.sortUsers(users, sortBy, sortDirection);
        }
        
        // Apply pagination
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedUsers = users.slice(startIndex, endIndex);
        
        return {
          data: paginatedUsers,
          total: users.length,
          page: page,
          pageSize: pageSize
        };
      })
    );
  }

  // Get single user by ID
  getUserById(id: number): Observable<User | undefined> {
    return this.loadUsers().pipe(
      map(response => response.data.find(user => user.id === id))
    );
  }

  // Create new user (simulated)
  createUser(userData: UserFormData): Observable<User> {
    return this.loadUsers().pipe(
      map(response => {
        const newId = Math.max(...response.data.map(u => u.id)) + 1;
        const newUser: User = {
          id: newId,
          ...userData,
          lastLogin: new Date().toISOString(),
          createdAt: new Date().toISOString()
        };
        
        // In a real app, this would make an API call
        console.log('Creating user:', newUser);
        return newUser;
      }),
      delay(1000) // Simulate network delay
    );
  }

  // Update user (simulated)
  updateUser(id: number, userData: Partial<UserFormData>): Observable<User> {
    return this.getUserById(id).pipe(
      map(user => {
        if (!user) {
          throw new Error(`User with ID ${id} not found`);
        }
        
        const updatedUser: User = {
          ...user,
          ...userData
        };
        
        // In a real app, this would make an API call
        console.log('Updating user:', updatedUser);
        return updatedUser;
      }),
      delay(1000) // Simulate network delay
    );
  }

  // Delete user (simulated)
  deleteUser(id: number): Observable<boolean> {
    return this.getUserById(id).pipe(
      map(user => {
        if (!user) {
          throw new Error(`User with ID ${id} not found`);
        }
        
        // In a real app, this would make an API call
        console.log('Deleting user:', user);
        return true;
      }),
      delay(1000) // Simulate network delay
    );
  }

  // Handle CRUD actions
  handleCrudAction(action: UserCrudAction, user: User): void {
    switch (action) {
      case UserCrudAction.VIEW:
        this.viewUser(user);
        break;
      case UserCrudAction.EDIT:
        this.editUser(user);
        break;
      case UserCrudAction.ACTIVATE:
        this.activateUser(user);
        break;
      case UserCrudAction.DEACTIVATE:
        this.deactivateUser(user);
        break;
      case UserCrudAction.RESET_PASSWORD:
        this.resetPassword(user);
        break;
      case UserCrudAction.DELETE:
        this.deleteUser(user.id).subscribe(
          success => console.log('User deleted successfully')
        );
        break;
      default:
        console.warn('Unknown CRUD action:', action);
    }
  }

  // Utility methods for color mapping
  getStatusColor(status: UserStatus): string {
    const statusColorMap = new Map<UserStatus, string>([
      [UserStatus.ACTIVE, 'primary'],
      [UserStatus.INACTIVE, 'warn'],
      [UserStatus.PENDING, 'accent']
    ]);
    
    return statusColorMap.get(status) || 'primary';
  }

  getRoleColor(role: UserRole): string {
    const roleColorMap = new Map<UserRole, string>([
      [UserRole.ADMIN, 'warn'],
      [UserRole.INSTRUCTOR, 'primary'],
      [UserRole.STUDENT, 'accent'],
      [UserRole.ASSISTANT, 'primary']
    ]);
    
    return roleColorMap.get(role) || 'primary';
  }

  // Private helper methods
  private sortUsers(users: User[], sortBy: string, direction: 'asc' | 'desc'): User[] {
    return users.sort((a, b) => {
      let aValue = (a as any)[sortBy];
      let bValue = (b as any)[sortBy];
      
      // Handle date sorting
      if (sortBy === 'lastLogin' || sortBy === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      // Handle string sorting
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      let comparison = 0;
      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }
      
      return direction === 'desc' ? comparison * -1 : comparison;
    });
  }

  private viewUser(user: User): void {
    // Navigate to user detail view
    console.log('Viewing user:', user.firstName + ' ' + user.lastName);
    // In a real app: this.router.navigate(['/users', user.id]);
  }

  private editUser(user: User): void {
    // Open edit form/modal
    console.log('Editing user:', user.firstName + ' ' + user.lastName);
    // In a real app: this.dialog.open(UserEditComponent, { data: user });
  }

  private activateUser(user: User): void {
    // Activate user account
    console.log('Activating user:', user.firstName + ' ' + user.lastName);
    // In a real app: this.updateUser(user.id, { status: UserStatus.ACTIVE });
  }

  private deactivateUser(user: User): void {
    // Deactivate user account
    console.log('Deactivating user:', user.firstName + ' ' + user.lastName);
    // In a real app: this.updateUser(user.id, { status: UserStatus.INACTIVE });
  }

  private resetPassword(user: User): void {
    // Reset user password
    console.log('Resetting password for:', user.firstName + ' ' + user.lastName);
    // In a real app: this.http.post('/api/users/' + user.id + '/reset-password', {});
  }
}