import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SeedService } from './seeds/seed.service';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });

    // CORS configuration
    app.enableCors({
      // origin: process.env.FRONTEND_URL || 'http://localhost:3010'
      origin: '*', // For development, change to specific frontend URL in production
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      // credentials: true,
    });

    // Global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    // API prefix
    app.setGlobalPrefix('api');

    // Swagger documentation
    const config = new DocumentBuilder()
      .setTitle('iPharma API')
      .setDescription('Production API with TypeORM and PostgreSQL')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/swagger', app, document);

    // Seed database
    const seedService = app.get(SeedService);
    await seedService.seedAll();

    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Bootstrap error:', error.message);
    } else {
      console.error('Bootstrap error:', error);
    }
    throw error;
  }
}
bootstrap();
