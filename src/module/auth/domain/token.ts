import { AuthRes } from '@/module/auth/infra/rest/dto/response';

interface IToken {
  accessToken: string;
  refreshToken: string;
}

export class Token implements IToken {
  accessToken: string;
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  public static from(props: IToken): Token {
    return new Token(props.accessToken, props.refreshToken);
  }

  public toRes(): AuthRes {
    return AuthRes.from({
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    });
  }
}
