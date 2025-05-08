export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  clerkId: string;
}

export interface SubscriptionStatus {
  isActive: boolean;
  plan?: string;
  trialEndsAt?: Date;
  renewsAt?: Date;
  canceledAt?: Date;
}

export enum PlanType {
  FREE_TRIAL = 'FREE_TRIAL',
  PREMIUM = 'PREMIUM',
  CANCELED = 'CANCELED',
}