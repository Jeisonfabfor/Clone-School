import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('apiPlatzi')
    .setDescription('Platzi Fake Store API')
    .setVersion('1.0.0')
    .addTag('Products')
    .addTag('Categories')
    .addTag('Users')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/docs', app, document, {
    explorer: true,
    swaggerOptions: { filter: true, showRequestions: true },
  });

  /* http://localhost:4000/api/docs/#/ */

  await app.listen(4000);
  console.log('Server on port', 4000);
}
bootstrap();
