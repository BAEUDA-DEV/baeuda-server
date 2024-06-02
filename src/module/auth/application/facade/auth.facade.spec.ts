import { HttpModule } from '@nestjs/axios';
import { ExecutionContext } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Auth, PrismaClient, ProviderType } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { PrismaService } from '@/common/injectable/prisma.service';
import { AuthFacade } from '@/module/auth/application/facade/auth.facade';
import { AuthService } from '@/module/auth/application/service/auth.service';
import { TokenService } from '@/module/auth/application/service/token.service';
import { OAuthProvider } from '@/module/auth/domain/oauth';
import { Token } from '@/module/auth/domain/token';
import { GoogleAuthGuard } from '@/module/auth/infra/rest/guard/google-auth.guard';
import { UserService } from '@/module/user/application/service/user.service';

import { configModuleOptions } from '@/options/config.option';
import { jwtModuleOptions } from '@/options/jwt.option';

const auth: Auth = {
  id: 'auth_id_01',
  createdAt: new Date(),
  updatedAt: new Date(),
  providerType: ProviderType.GOOGLE,
  providerId: 'GOOGLE_USER_ID_01',
  userId: 'user_id_01',
};

describe('AuthFacade Test', () => {
  let prisma: DeepMockProxy<PrismaClient>;
  let authFacade: AuthFacade;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(configModuleOptions),
        JwtModule.registerAsync(jwtModuleOptions),
        HttpModule.register({}),
      ],
      providers: [
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaClient>(),
        },
        AuthFacade,
        AuthService,
        TokenService,
        UserService,
      ],
    })
      .overrideGuard(GoogleAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const request = context.switchToHttp().getRequest();
          request['payload'] = {
            provider: OAuthProvider.GOOGLE,
            providerId: 'GOOGLE_USER_ID_01',
            name: 'user_name_01',
            email: 'user_01@email.com',
          };
          return true;
        },
      })
      .compile();

    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
    authFacade = module.get<AuthFacade>(AuthFacade);
  });

  it('회원이 없는 경우 회원가입을 할 수 있다.', async () => {
    prisma.auth.create.mockResolvedValue(auth);

    const token = await authFacade.sign({
      provider: OAuthProvider.GOOGLE,
      providerId: 'GOOGLE_USER_ID_01',
      name: 'user_name_01',
      email: 'user_01@email.com',
    });

    expect(token).toBeInstanceOf(Token);
  });

  it('회원이 있는 경우 로그인을 할 수 있다.', async () => {
    prisma.auth.findFirst.mockResolvedValue(auth);

    const token = await authFacade.sign({
      provider: OAuthProvider.GOOGLE,
      providerId: 'GOOGLE_USER_ID_01',
      name: 'user_name_01',
      email: 'user_01@email.com',
    });

    expect(token).toBeInstanceOf(Token);
  });
});
