import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { match } from 'ts-pattern';

import { PrismaService } from '@/common/injectable/prisma.service';
import { AuthService } from '@/module/auth/application/service/auth.service';
import { GoogleService } from '@/module/auth/application/service/google.service';
import { TokenService } from '@/module/auth/application/service/token.service';
import { UserService } from '@/module/user/application/service/user.service';

import { Token } from '@/module/auth/domain/token';

import { OAuthProvider } from '@/module/auth/domain/oauth';
import {
  ReissueReq,
  SignInReq,
  SignUpReq,
} from '@/module/auth/infra/rest/dto/request';

@Injectable()
export class AuthFacade {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly googleSerivce: GoogleService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async signIn(req: SignInReq): Promise<Token> {
    const providerId = await match(req.provider)
      .with(OAuthProvider.GOOGLE, () =>
        this.googleSerivce.getUserId(req.providerAccessToken),
      )
      .exhaustive();

    const auth = await this.authService.findOne({
      provider: req.provider,
      providerId,
    });

    if (!auth) {
      throw new NotFoundException('회원정보가 존재하지 않습니다.');
    }

    return this.tokenService.generate({ userId: auth.userId });
  }

  async signUp(req: SignUpReq): Promise<Token> {
    const providerId = await match(req.provider)
      .with(OAuthProvider.GOOGLE, () =>
        this.googleSerivce.getUserId(req.providerAccessToken),
      )
      .exhaustive();

    if (
      await this.authService.findOne({ provider: req.provider, providerId })
    ) {
      throw new BadRequestException('회원정보가 이미 존재합니다.');
    }

    const auth = await this.prisma.$transaction(async (tx) => {
      const user = await this.userService.create(
        { name: req.name, email: req.email },
        tx,
      );

      const auth = await this.authService.create(
        { provider: req.provider, providerId, userId: user.id },
        tx,
      );

      return auth;
    });

    return this.tokenService.generate({ userId: auth.userId });
  }

  async reissue(req: ReissueReq): Promise<Token> {
    const result = await this.tokenService.parse(req.refreshToken);
    if (result.payload && result.type === 'refresh') {
      return this.tokenService.generate(result.payload);
    }

    throw new BadRequestException('유요하지 않은 토큰입니다.');
  }
}
