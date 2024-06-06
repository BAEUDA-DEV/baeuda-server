import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { configModuleOptions } from '@/options/config.option';

import { CommonModule } from '@/common/common.module';
import { AuthModule } from '@/module/auth/auth.module';
import { CertificateModule } from '@/module/certificate/certificate.module';
import { CommentModule } from '@/module/comment/comment.module';
import { QuizModule } from '@/module/quiz/quiz.module';
import { UserModule } from '@/module/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    PassportModule,

    CommonModule,
    AuthModule,
    CertificateModule,
    CommentModule,
    QuizModule,
    UserModule,
  ],
})
export class AppModule {}
