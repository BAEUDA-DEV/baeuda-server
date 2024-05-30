import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configModuleOptions } from '@/options/config.option';

import { CommonModule } from '@/common/common.module';
import { AuthModule } from '@/module/auth/auth.module';
import { CertificateModule } from '@/module/certificate/certificate.module';
import { UserModule } from '@/module/user/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    PassportModule,

    CommonModule,
    AuthModule,
    CertificateModule,
    UserModule,
  ],
})
export class AppModule {}
