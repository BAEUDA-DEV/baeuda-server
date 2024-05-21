import { OAuthProvider } from '@/module/auth/domain/oauth';

export interface OAuthType {
  provider: OAuthProvider;
  providerId: string;
  name: string | null;
  email: string | null;
}

export interface AuthUserType {
  userId: string;
}
