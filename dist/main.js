"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const seed_service_1 = require("./seeds/seed.service");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, {
            cors: true,
        });
        app.enableCors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        });
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }));
        app.setGlobalPrefix('api');
        const config = new swagger_1.DocumentBuilder()
            .setTitle('iPharma API')
            .setDescription('Production API with TypeORM and PostgreSQL')
            .setVersion('1.0.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('/swagger', app, document);
        const seedService = app.get(seed_service_1.SeedService);
        await seedService.seedAll();
        const port = process.env.PORT || 3002;
        await app.listen(port);
        console.log(`Application is running on: ${await app.getUrl()}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Bootstrap error:', error.message);
        }
        else {
            console.error('Bootstrap error:', error);
        }
        throw error;
    }
}
bootstrap();
//# sourceMappingURL=main.js.map