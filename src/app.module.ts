import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CommonModule } from '@/common/common.module';
import { AuthModule } from '@/module/auth/auth.module';
import { UserModule } from '@/module/user/user.module';

import { configModuleOptions } from '@/options/config.option';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    PassportModule,

    CommonModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
