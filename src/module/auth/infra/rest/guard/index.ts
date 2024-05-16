import { OAuthProvider } from '@/module/auth/domain/oauth';

export interface OAuthUserType {
  provider: OAuthProvider;
  providerId: string;
  accessToken: string;
  refreshToken?: string;
  hasAuthentication: Promise<boolean>;
}

export interface AuthUserType {
  userId: string;
}
