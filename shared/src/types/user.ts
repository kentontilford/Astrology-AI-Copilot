export interface BirthProfile {
  id: string;
  userId: string;
  name: string;
  birthDate: string; // ISO format
  birthTime: string;
  birthLocation: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  id: string;
  userId: string;
  defaultPersonalProfileId?: string;
  defaultRelationshipProfileId?: string;
  notificationsEnabled: boolean;
  darkMode: boolean;
  otherSettings?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}