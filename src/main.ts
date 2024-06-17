import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnvConfig } from './config/envconfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/n')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
   );
   
  await app.listen(EnvConfig().port);
  console.log(`Server listening on PORT: ${EnvConfig().port}`)
}
bootstrap();
