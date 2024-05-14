import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GoogleService {
  constructor(private readonly httpService: HttpService) {}

  async getUserId(accessToken: string): Promise<string> {
    return firstValueFrom(
      this.httpService.get<{ sub: string }>(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          params: {
            access_token: accessToken,
          },
        },
      ),
    ).then((res) => res.data.sub);
  }
}
