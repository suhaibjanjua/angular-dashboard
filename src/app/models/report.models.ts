// Report-related models and enums
import { GeneralStatus, ReportCategory, ReportType, ExportFormat, MaterialColor } from './common.models';

// Report status specific to reports domain
export enum ReportStatus {
  GENERATED = GeneralStatus.GENERATED,
  PROCESSING = GeneralStatus.PROCESSING,
  FAILED = GeneralStatus.FAILED,
  SCHEDULED = GeneralStatus.SCHEDULED
}

// Report interface
export interface Report {
  id: number;
  title: string;
  type: ReportType;
  category: ReportCategory;
  generatedBy: string;
  period: string;
  generatedDate: string;
  format: ExportFormat | 'PowerBI';
  fileSize: string;
  status: ReportStatus;
  downloads: number;
}

// Report CRUD operations
export enum ReportCrudAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update', 
  DELETE = 'delete',
  GENERATE = 'generate',
  DOWNLOAD = 'download',
  SHARE = 'share',
  SCHEDULE = 'schedule',
  REGENERATE = 'regenerate'
}

// Report status color mappings
export const ReportStatusColorMap = {
  [ReportStatus.GENERATED]: MaterialColor.PRIMARY,
  [ReportStatus.PROCESSING]: MaterialColor.ACCENT,
  [ReportStatus.SCHEDULED]: undefined,  // No color/default
  [ReportStatus.FAILED]: MaterialColor.WARN
} as const;

// Report type color mappings
export const ReportTypeColorMap = {
  [ReportType.ACADEMIC]: MaterialColor.PRIMARY,
  [ReportType.PERFORMANCE]: MaterialColor.ACCENT,
  [ReportType.ANALYTICS]: MaterialColor.PRIMARY,
  [ReportType.ATTENDANCE]: MaterialColor.ACCENT
} as const;

// Report category color mappings  
export const ReportCategoryColorMap = {
  [ReportCategory.STUDENT]: MaterialColor.PRIMARY,
  [ReportCategory.COURSE]: MaterialColor.ACCENT,
  [ReportCategory.FACULTY]: MaterialColor.PRIMARY,
  [ReportCategory.SYSTEM]: MaterialColor.WARN
} as const;