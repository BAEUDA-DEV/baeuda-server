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
        .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            in: 'header',
          },
          'authorization',
        )
        .build(),
    ),
    {
      swaggerOptions: {
        persistAuthorization: true,
      },
    },
  );

  await app.listen(3000);
};

bootstrap();
