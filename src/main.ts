import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app.module';
import { IEnvVars } from './config/config.interface';
import { HttpExceptionFilter } from './shared/utils/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  const configService = app.get<ConfigService<IEnvVars>>(ConfigService)

  app.enableCors({
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    origin: '*'
  })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.useGlobalFilters(new HttpExceptionFilter())

  app.setGlobalPrefix('api/v1')

  await app.listen(configService.get('PORT'), '0.0.0.0');
}
bootstrap();
