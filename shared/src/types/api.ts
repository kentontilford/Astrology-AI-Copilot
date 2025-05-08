export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface CreateBirthProfileRequest {
  name: string;
  birthDate: string; // ISO format
  birthTime: string;
  birthLocation: string;
  latitude: number;
  longitude: number;
  isDefault?: boolean;
}

export interface UpdateBirthProfileRequest {
  name?: string;
  birthDate?: string;
  birthTime?: string;
  birthLocation?: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
}

export interface CreateCheckoutSessionRequest {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}