// Class-related models and enums
import { GeneralStatus, MaterialColor } from './common.models';

// Class status extending general status
export enum ClassStatus {
  ACTIVE = GeneralStatus.ACTIVE,
  UPCOMING = 'Upcoming',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

// Class interface
export interface ClassData {
  id: number;
  name: string;
  subject: string;
  instructor: string;
  time: string;
  duration: number;
  capacity: number;
  enrolled: number;
  status: ClassStatus;
  room: string;
}

// Class interface
export interface Class {
  id: number;
  name: string;
  subject: string;
  instructor: string;
  time: string;
  duration: number;
  enrolled: number;
  capacity: number;
  room: string;
  status: ClassStatus;
}

// Class CRUD operations
export enum ClassCrudAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  VIEW_DETAILS = 'view_details',
  EDIT_SCHEDULE = 'edit_schedule',
  MANAGE_ATTENDANCE = 'manage_attendance'
}

// Class status color mappings
export const ClassStatusColorMap = {
  [ClassStatus.ACTIVE]: MaterialColor.PRIMARY,
  [ClassStatus.UPCOMING]: MaterialColor.ACCENT,
  [ClassStatus.COMPLETED]: undefined,  // No color/default
  [ClassStatus.CANCELLED]: MaterialColor.WARN
} as const;