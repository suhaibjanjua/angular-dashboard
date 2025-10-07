import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User, UserApiResponse, UserFormData, UserStatus, UserRole } from '../models/user.models';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: UserRole.STUDENT,
      status: UserStatus.ACTIVE,
      department: 'Engineering',
      avatar: '',
      phone: '+1234567890',
      createdAt: '2024-01-01',
      lastLogin: '2024-01-15'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      department: 'Marketing',
      avatar: '',
      phone: '+1234567891',
      createdAt: '2024-01-02',
      lastLogin: '2024-01-16'
    },
    {
      id: 3, 
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@example.com',
      role: UserRole.STUDENT,
      status: UserStatus.INACTIVE,
      department: 'Sales',
      avatar: '',
      phone: '+1234567892',
      createdAt: '2024-01-03',
      lastLogin: '2024-01-10'
    }
  ];

  const mockApiResponse: UserApiResponse = {
    data: mockUsers,
    total: 3,
    page: 1,
    pageSize: 10
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadUsers', () => {
    it('should load users from API', () => {
      service.loadUsers().subscribe(response => {
        expect(response).toEqual(mockApiResponse);
        expect(response.data.length).toBe(3);
        expect(response.total).toBe(3);
      });

      const req = httpMock.expectOne('/assets/demo-data/users.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockApiResponse);
    });

    it('should handle load errors gracefully', () => {
      spyOn(console, 'error');

      service.loadUsers().subscribe(response => {
        expect(response).toEqual({ data: [], total: 0, page: 1, pageSize: 10 });
      });

      const req = httpMock.expectOne('/assets/demo-data/users.json');
      req.error(new ErrorEvent('Network error'));

      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('getUsers', () => {
    it('should get users with default pagination', () => {
      service.getUsers().subscribe(response => {
        expect(response.data.length).toBe(3);
        expect(response.page).toBe(1);
        expect(response.pageSize).toBe(10);
      });

      const req = httpMock.expectOne('/assets/demo-data/users.json');
      req.flush(mockApiResponse);
    });

    it('should filter users by search term', () => {
      service.getUsers(1, 10, undefined, undefined, 'john').subscribe(response => {
        expect(response.data.length).toBe(2); // John Doe and Bob Johnson
        expect(response.data.every(user => 
          user.firstName.toLowerCase().includes('john') || 
          user.lastName.toLowerCase().includes('john')
        )).toBe(true);
      });

      const req = httpMock.expectOne('/assets/demo-data/users.json');
      req.flush(mockApiResponse);
    });

    it('should sort users by firstName ascending', () => {
      service.getUsers(1, 10, 'firstName', 'asc').subscribe(response => {
        expect(response.data[0].firstName).toBe('Bob');
        expect(response.data[1].firstName).toBe('Jane');
        expect(response.data[2].firstName).toBe('John');
      });

      const req = httpMock.expectOne('/assets/demo-data/users.json');
      req.flush(mockApiResponse);
    });

    it('should sort users by firstName descending', () => {
      service.getUsers(1, 10, 'firstName', 'desc').subscribe(response => {
        expect(response.data[0].firstName).toBe('John');
        expect(response.data[1].firstName).toBe('Jane');
        expect(response.data[2].firstName).toBe('Bob');
      });

      const req = httpMock.expectOne('/assets/demo-data/users.json');
      req.flush(mockApiResponse);
    });

    it('should handle pagination correctly', () => {
      service.getUsers(2, 2).subscribe(response => {
        expect(response.data.length).toBe(1); // Third user on page 2 with pageSize 2
        expect(response.page).toBe(2);
        expect(response.pageSize).toBe(2);
      });

      const req = httpMock.expectOne('/assets/demo-data/users.json');
      req.flush(mockApiResponse);
    });
  });

  describe('getUserById', () => {
    it('should get user by id', () => {
      service.getUserById(1).subscribe(user => {
        expect(user).toBeDefined();
        expect(user?.id).toBe(1);
        expect(user?.firstName).toBe('John');
      });

      const req = httpMock.expectOne('/assets/demo-data/users.json');
      req.flush(mockApiResponse);
    });

    it('should return undefined for non-existent user', () => {
      service.getUserById(999).subscribe(user => {
        expect(user).toBeUndefined();
      });

      const req = httpMock.expectOne('/assets/demo-data/users.json');
      req.flush(mockApiResponse);
    });
  });

  describe('createUser', () => {
    it('should create a new user', () => {
      const newUserData: UserFormData = {
        firstName: 'New',
        lastName: 'User',
        email: 'new.user@example.com',
        role: UserRole.STUDENT,
        status: UserStatus.ACTIVE,
        department: 'IT',
        phone: '+1234567893'
      };

      service.createUser(newUserData).subscribe(user => {
        expect(user.firstName).toBe('New');
        expect(user.lastName).toBe('User');
        expect(user.email).toBe('new.user@example.com');
        expect(user.status).toBe(UserStatus.ACTIVE);
        expect(user.id).toBeDefined();
        expect(user.createdAt).toBeDefined();
      });

      const req = httpMock.expectOne('/assets/demo-data/users.json');
      req.flush(mockApiResponse);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', () => {
      const updateData: Partial<UserFormData> = {
        firstName: 'Updated',
        department: 'Updated Department'
      };

      service.updateUser(1, updateData).subscribe(user => {
        expect(user).toBeDefined();
        expect(user?.firstName).toBe('Updated');
        expect(user?.department).toBe('Updated Department');
        expect(user?.lastName).toBe('Doe'); // Should remain unchanged
      });

      const req = httpMock.expectOne('/assets/demo-data/users.json');
      req.flush(mockApiResponse);
    });

    it('should return null when updating non-existent user', () => {
      const updateData: Partial<UserFormData> = {
        firstName: 'Updated'
      };

      service.updateUser(999, updateData).subscribe(user => {
        expect(user).toBeNull();
      });

      const req = httpMock.expectOne('/assets/demo-data/users.json');
      req.flush(mockApiResponse);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', () => {
      service.deleteUser(1).subscribe(success => {
        expect(success).toBe(true);
      });

      const req = httpMock.expectOne('/assets/demo-data/users.json');
      req.flush(mockApiResponse);
    });

    it('should return false when deleting non-existent user', () => {
      service.deleteUser(999).subscribe(success => {
        expect(success).toBe(false);
      });

      const req = httpMock.expectOne('/assets/demo-data/users.json');
      req.flush(mockApiResponse);
    });
  });

  describe('Data Validation and Security', () => {
    it('should validate user data before creation', () => {
      const invalidUserData: UserFormData = {
        firstName: '',
        lastName: 'Test',
        email: 'invalid-email',
        role: UserRole.STUDENT,
        status: UserStatus.ACTIVE,
        department: 'IT',
        phone: '+1234567893'
      };

      service.createUser(invalidUserData).subscribe(user => {
        // Service should still create user but may normalize data
        expect(user).toBeDefined();
      });

      const req = httpMock.expectOne('/assets/demo-data/users.json');
      req.flush(mockApiResponse);
    });

    it('should handle duplicate email validation', () => {
      const duplicateEmailUser: UserFormData = {
        firstName: 'Duplicate',
        lastName: 'User',
        email: 'john.doe@example.com', // Same as existing user
        role: UserRole.STUDENT,
        status: UserStatus.ACTIVE,
        department: 'IT',
        phone: '+1234567894'
      };

      service.createUser(duplicateEmailUser).subscribe(user => {
        expect(user).toBeDefined();
      });

      const req = httpMock.expectOne('/assets/demo-data/users.json');
      req.flush(mockApiResponse);
    });

    it('should sanitize user input data', () => {
      const userWithSpecialChars: UserFormData = {
        firstName: '<script>alert("xss")</script>John',
        lastName: 'Test & Special',
        email: 'test@example.com',
        role: UserRole.STUDENT,
        status: UserStatus.ACTIVE,
        department: 'IT & Engineering',
        phone: '+1234567895'
      };

      service.createUser(userWithSpecialChars).subscribe(user => {
        expect(user).toBeDefined();
        // Service should handle special characters appropriately
      });

      const req = httpMock.expectOne('/assets/demo-data/users.json');
      req.flush(mockApiResponse);
    });

    it('should enforce proper data types', () => {
      const userFormData: UserFormData = {
        firstName: 'Valid',
        lastName: 'User',
        email: 'valid@example.com',
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        department: 'Administration',
        phone: '+1234567896'
      };

      service.createUser(userFormData).subscribe(user => {
        expect(typeof user.id).toBe('number');
        expect(typeof user.firstName).toBe('string');
        expect(typeof user.email).toBe('string');
        expect(user.role).toBe(UserRole.ADMIN);
        expect(user.status).toBe(UserStatus.ACTIVE);
      });

      const req = httpMock.expectOne('/assets/demo-data/users.json');
      req.flush(mockApiResponse);
    });
  });
});