import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '@/app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  /**
   * Global validation pipe
   */
  app.useGlobalPipes(new ValidationPipe());

  /**
   * OAS(Open API Spec)
   */
  SwaggerModule.setup(
    'swagger',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Baeuda')
        .setDescription('API description for Baeuda')
        .setVersion('0.0.1')
        .build(),
    ),
  );

  await app.listen(3000);
};

bootstrap();
