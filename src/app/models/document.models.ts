// Document-related models and enums
import { GeneralStatus, DocumentType, MaterialColor } from './common.models';

// Document status specific to documents domain
export enum DocumentStatus {
  PUBLISHED = GeneralStatus.PUBLISHED,
  DRAFT = GeneralStatus.DRAFT,
  ARCHIVED = GeneralStatus.ARCHIVED
}

// Document interface
export interface Document {
  id: number;
  name: string;
  type: DocumentType;
  size: number; // in bytes
  owner: string;
  createdBy?: string; // Alternative property name for backward compatibility
  lastModified: Date;
  createdAt: Date;
  status: DocumentStatus;
  version?: number;
  description?: string;
}

// Document CRUD operations
export enum DocumentCrudAction {
  CREATE = 'create',
  READ = 'read', 
  UPDATE = 'update',
  DELETE = 'delete',
  DOWNLOAD = 'download',
  UPLOAD = 'upload',
  SHARE = 'share',
  ARCHIVE = 'archive',
  PUBLISH = 'publish'
}

// Document status color mappings
export const DocumentStatusColorMap = {
  [DocumentStatus.PUBLISHED]: MaterialColor.PRIMARY,
  [DocumentStatus.DRAFT]: MaterialColor.ACCENT,
  [DocumentStatus.ARCHIVED]: MaterialColor.WARN
} as const;

// Document status CSS class mappings
export const DocumentStatusCssClassMap = {
  [DocumentStatus.PUBLISHED]: 'status-published',
  [DocumentStatus.DRAFT]: 'status-draft',
  [DocumentStatus.ARCHIVED]: 'status-archived'
} as const;