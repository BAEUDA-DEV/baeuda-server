import { OAuthProvider } from '@/module/auth/domain/oauth';

export interface OAuthUserType {
  provider: OAuthProvider;
  providerId: string;
  accessToken: string;
  refreshToken?: string;
  email: string;
  hasAuthentication: Promise<boolean>;
}
