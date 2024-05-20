import { BadRequestException, Injectable } from '@nestjs/common';
import { match } from 'ts-pattern';

import { PrismaService } from '@/common/injectable/prisma.service';
import { AuthService } from '@/module/auth/application/service/auth.service';
import { TokenService } from '@/module/auth/application/service/token.service';
import { UserService } from '@/module/user/application/service/user.service';

import { Token } from '@/module/auth/domain/token';

import { ReissueReq } from '@/module/auth/infra/rest/dto/request';
import { OAuthType } from '@/module/auth/infra/rest/guard';

@Injectable()
export class AuthFacade {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async sign(req: OAuthType): Promise<Token> {
    const authentication = await this.authService.findOne({
      provider: req.provider,
      providerId: req.providerId,
    });

    const res = await match(!!authentication)
      .with(true, () => authentication!)
      .with(false, () =>
        this.prisma.$transaction(async (tx) => {
          const user = await this.userService.create(
            { name: req.name ?? '', email: req.email ?? '' },
            tx,
          );

          return this.authService.create(
            {
              provider: req.provider,
              providerId: req.providerId,
              userId: user.id,
            },
            tx,
          );
        }),
      )
      .exhaustive();

    return this.tokenService.generate({ userId: res.userId });
  }

  async reissue(req: ReissueReq): Promise<Token> {
    const result = await this.tokenService.parse(req.refreshToken);
    if (result.payload && result.type === 'refresh') {
      return this.tokenService.generate(result.payload);
    }

    throw new BadRequestException('유요하지 않은 토큰입니다.');
  }
}
