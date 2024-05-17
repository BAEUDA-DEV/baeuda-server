import { HttpModule } from '@nestjs/axios';
import {
  BadRequestException,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Auth, PrismaClient, ProviderType, User } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { PrismaService } from '@/common/injectable/prisma.service';
import { AuthFacade } from '@/module/auth/application/facade/auth.facade';
import { AuthService } from '@/module/auth/application/service/auth.service';
import { GoogleService } from '@/module/auth/application/service/google.service';
import { TokenService } from '@/module/auth/application/service/token.service';
import { GoogleAuthGuard } from '@/module/auth/infra/rest/guard/google-auth.guard';
import { UserService } from '@/module/user/application/service/user.service';

import { OAuthProvider } from '@/module/auth/domain/oauth';
import { Token } from '@/module/auth/domain/token';

import { SignInReq, SignUpReq } from '@/module/auth/infra/rest/dto/request';

import { configModuleOptions } from '@/options/config.option';
import { jwtModuleOptions } from '@/options/jwt.option';

const auth: Auth = {
  id: 'auth_id_01',
  createdAt: new Date(),
  updatedAt: new Date(),
  provider: ProviderType.GOOGLE,
  providerId: 'GOOGLE_USER_ID',
  userId: 'user_id_01',
};

const user: User = {
  id: 'user_id_01',
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'user_name_01',
  email: 'user_01@email.com',
};

describe('AuthFacade Test', () => {
  let prisma: DeepMockProxy<PrismaClient>;
  let authFacade: AuthFacade;
  let googleService: GoogleService;

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
        GoogleService,
        UserService,
      ],
    })
      .overrideGuard(GoogleAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const request = context.switchToHttp().getRequest();
          request['payload'] = { userId: user.id };
          return true;
        },
      })
      .compile();

    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
    authFacade = module.get<AuthFacade>(AuthFacade);
    googleService = module.get<GoogleService>(GoogleService);
  });

  it('회원정보가 있다면, 로그인에 성공해야 한다.', async () => {
    prisma.user.findFirst.mockResolvedValue(user);
    prisma.auth.findFirst.mockResolvedValue(auth);

    jest
      .spyOn(googleService, 'getUserId')
      .mockImplementation(
        async (accessToken: string) => `google_user_id___${accessToken}`,
      );

    const token = await authFacade.signIn(
      SignInReq.from({
        provider: OAuthProvider.GOOGLE,
        providerAccessToken: 'GoogleAccessToken',
      }),
    );

    expect(token).toBeInstanceOf(Token);
  });

  it('회원정보가 없다면, 로그인에 실패해야 한다.', async () => {
    jest
      .spyOn(googleService, 'getUserId')
      .mockImplementation(
        async (accessToken: string) => `google_user_id___${accessToken}`,
      );

    await expect(
      async () =>
        await authFacade.signIn(
          SignInReq.from({
            provider: OAuthProvider.GOOGLE,
            providerAccessToken: 'GoogleAccessToken',
          }),
        ),
    ).rejects.toThrow(NotFoundException);
  });

  it('회원정보가 없다면, 회원가입에 성공해야 한다.', async () => {
    prisma.$transaction.mockResolvedValue(auth);

    jest
      .spyOn(googleService, 'getUserId')
      .mockImplementation(
        async (accessToken: string) => `google_user_id___${accessToken}`,
      );

    const token = await authFacade.signUp(
      SignUpReq.from({
        provider: OAuthProvider.GOOGLE,
        providerAccessToken: 'GoogleAccessToken',
        name: 'user_name_01',
        email: 'user_01@email.com',
      }),
    );

    expect(token).toBeInstanceOf(Token);
  });

  it('회원정보가 있다면, 회원가입에 실패해야 한다.', async () => {
    prisma.auth.findFirst.mockResolvedValue(auth);

    jest
      .spyOn(googleService, 'getUserId')
      .mockImplementation(
        async (accessToken: string) => `google_user_id___${accessToken}`,
      );

    await expect(
      async () =>
        await authFacade.signUp(
          SignUpReq.from({
            provider: OAuthProvider.GOOGLE,
            providerAccessToken: 'GoogleAccessToken',
            name: 'user_name_01',
            email: 'user_01@email.com',
          }),
        ),
    ).rejects.toThrow(BadRequestException);
  });
});
