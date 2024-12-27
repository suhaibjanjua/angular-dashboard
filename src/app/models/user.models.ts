// User-related models and enums
import { GeneralStatus, MaterialColor } from './common.models';

// User status specific to users domain
export enum UserStatus {
  ACTIVE = GeneralStatus.ACTIVE,
  INACTIVE = GeneralStatus.INACTIVE,
  PENDING = GeneralStatus.PENDING
}

export enum UserRole {
  ADMIN = 'Admin',
  INSTRUCTOR = 'Instructor',
  STUDENT = 'Student',
  ASSISTANT = 'Assistant'
}

// User interfaces
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
  createdAt: string;
  avatar?: string;
  phone?: string;
  department?: string;
}

// API response interfaces
export interface UserApiResponse {
  data: User[];
  total: number;
  page: number;
  pageSize: number;
}

// Form data interface for creating/updating users
export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  phone?: string;
  department?: string;
  status: UserStatus;
}

// User CRUD operations
export enum UserCrudAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  VIEW = 'view',
  EDIT = 'edit',
  ACTIVATE = 'activate',
  DEACTIVATE = 'deactivate',
  RESET_PASSWORD = 'reset_password'
}

// User status color mappings
export const UserStatusColorMap = {
  [UserStatus.ACTIVE]: MaterialColor.PRIMARY,
  [UserStatus.INACTIVE]: MaterialColor.WARN,
  [UserStatus.PENDING]: MaterialColor.ACCENT
} as const;

// User role color mappings
export const UserRoleColorMap = {
  [UserRole.ADMIN]: MaterialColor.WARN,
  [UserRole.INSTRUCTOR]: MaterialColor.PRIMARY,
  [UserRole.STUDENT]: MaterialColor.ACCENT,
  [UserRole.ASSISTANT]: MaterialColor.PRIMARY
} as const;

// User status CSS class mappings
export const UserStatusCssClassMap = {
  [UserStatus.ACTIVE]: 'status-active',
  [UserStatus.INACTIVE]: 'status-inactive', 
  [UserStatus.PENDING]: 'status-pending'
} as const;

// User role CSS class mappings  
export const UserRoleCssClassMap = {
  [UserRole.ADMIN]: 'role-admin',
  [UserRole.INSTRUCTOR]: 'role-instructor',
  [UserRole.STUDENT]: 'role-student',
  [UserRole.ASSISTANT]: 'role-assistant'
} as const;