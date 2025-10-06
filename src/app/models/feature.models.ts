// Feature Profile Models

export interface Feature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: string;
  parentId?: string;
  children?: Feature[];
}

export interface FeatureChild {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon?: string;
  premium?: boolean;
  parentId: string;
}

export interface FeatureCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: Feature[];
  order: number;
}

export interface FeatureProfile {
  categories: FeatureCategory[];
  totalFeatures: number;
  enabledFeatures: number;
}

export enum FeatureCategoryType {
  CALENDAR = 'calendar',
  STORAGE = 'storage',
  COMMUNICATION = 'communication',
  ANALYTICS = 'analytics',
  SECURITY = 'security',
  INTEGRATION = 'integration',
  NOTIFICATIONS = 'notifications',
  COLLABORATION = 'collaboration',
  AUTOMATION = 'automation',
  CUSTOMIZATION = 'customization'
}

export interface FeatureToggleEvent {
  featureId: string;
  categoryId: string;
  enabled: boolean;
  isChild?: boolean;
  parentId?: string;
}