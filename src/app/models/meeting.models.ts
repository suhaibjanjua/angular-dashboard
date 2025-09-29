// Meeting-related models and enums
import { GeneralStatus, MeetingType, MaterialColor } from './common.models';

// Meeting status specific to meetings domain
export enum MeetingStatus {
  SCHEDULED = GeneralStatus.SCHEDULED,
  IN_PROGRESS = GeneralStatus.IN_PROGRESS,
  COMPLETED = GeneralStatus.COMPLETED,
  CANCELLED = GeneralStatus.CANCELLED
}

// Meeting interface
export interface Meeting {
  id: number;
  title: string;
  organizer: string;
  dateTime: string;
  duration: number;
  participants: number;
  maxParticipants: number;
  location: string;
  type: MeetingType;
  status: MeetingStatus;
  meetingUrl?: string;
  description?: string;
}

// Meeting interface
export interface MeetingData {
  id: number;
  title: string;
  type: MeetingType;
  organizer: string;
  dateTime: string;
  duration: number;
  participants: number;
  maxParticipants: number;
  status: MeetingStatus;
  location?: string;
  description?: string;
  meetingUrl?: string;
}

// Meeting CRUD operations
export enum MeetingCrudAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  JOIN = 'join',
  SCHEDULE = 'schedule',
  CANCEL = 'cancel',
  COPY_LINK = 'copy_link'
}

// Meeting color mappings
export const MeetingStatusColorMap = {
  [MeetingStatus.SCHEDULED]: MaterialColor.ACCENT,
  [MeetingStatus.IN_PROGRESS]: MaterialColor.PRIMARY,
  [MeetingStatus.COMPLETED]: undefined,  // No color/default
  [MeetingStatus.CANCELLED]: MaterialColor.WARN
} as const;

// Meeting type color mappings
export const MeetingTypeColorMap = {
  [MeetingType.LECTURE]: MaterialColor.PRIMARY,
  [MeetingType.SEMINAR]: MaterialColor.ACCENT,
  [MeetingType.WORKSHOP]: MaterialColor.PRIMARY,
  [MeetingType.TUTORIAL]: MaterialColor.ACCENT,
  [MeetingType.OFFICE_HOURS]: MaterialColor.PRIMARY,
  [MeetingType.EXAM]: MaterialColor.WARN,
  [MeetingType.CONFERENCE]: MaterialColor.PRIMARY
} as const;