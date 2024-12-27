// Course-related models and enums
import { GeneralStatus, MaterialColor } from './common.models';

// Course status specific to courses domain
export enum CourseStatus {
  ACTIVE = GeneralStatus.ACTIVE,
  UPCOMING = GeneralStatus.UPCOMING, 
  COMPLETED = GeneralStatus.COMPLETED,
  DRAFT = GeneralStatus.DRAFT
}

export enum CourseCategory {
  SCIENCE = 'Science',
  MATHEMATICS = 'Mathematics',
  LANGUAGE = 'Language',
  ARTS = 'Arts',
  TECHNOLOGY = 'Technology'
}

// Course interfaces
export interface Course {
  id: number;
  title: string;
  code: string;
  instructor: string;
  category: CourseCategory;
  credits: number;
  enrolled: number;
  capacity: number;
  progress: number;
  status: CourseStatus;
  duration: string;
  startDate: string;
  endDate: string;
}

// CRUD operation types
export enum CrudAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  VIEW = 'view',
  MANAGE_CONTENT = 'manage_content',
  VIEW_ANALYTICS = 'view_analytics'
}

// API response interfaces
export interface CourseApiResponse {
  data: Course[];
  total: number;
  page: number;
  pageSize: number;
}

// Form data interface for creating/updating courses
export interface CourseFormData {
  title: string;
  code: string;
  instructor: string;
  category: CourseCategory;
  credits: number;
  capacity: number;
  duration: string;
  startDate: string;
  endDate: string;
  status: CourseStatus;
}

// Course status color mappings
export const CourseStatusColorMap = {
  [CourseStatus.ACTIVE]: MaterialColor.PRIMARY,
  [CourseStatus.UPCOMING]: MaterialColor.ACCENT,
  [CourseStatus.COMPLETED]: undefined,  // No color/default
  [CourseStatus.DRAFT]: MaterialColor.WARN
} as const;

// Course category color mappings
export const CourseCategoryColorMap = {
  [CourseCategory.SCIENCE]: MaterialColor.PRIMARY,
  [CourseCategory.MATHEMATICS]: MaterialColor.ACCENT,
  [CourseCategory.LANGUAGE]: MaterialColor.PRIMARY,
  [CourseCategory.ARTS]: MaterialColor.ACCENT,
  [CourseCategory.TECHNOLOGY]: MaterialColor.PRIMARY
} as const;