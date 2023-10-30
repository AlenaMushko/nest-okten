import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { CustomConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig: CustomConfigService =
    app.get<CustomConfigService>(CustomConfigService);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('nest_okten')
    .setDescription('user and auth')
    .setVersion('0.1.0')
    .addTag('Users', 'Endpoints related to user operations')
    .addTag('Authentication', 'Endpoints for user authentication')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(appConfig.app_port, () => {
    Logger.log(`http://${appConfig.app_host}:${appConfig.app_port}/api`, 'Doc');
  });
}
bootstrap();
