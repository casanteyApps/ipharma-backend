"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConfig = void 0;
const getDatabaseConfig = (configService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST', '10.19.32.141'),
    port: configService.get('DB_PORT', 5432),
    username: configService.get('DB_USERNAME', 'ipharmadbmaster'),
    password: configService.get('DB_PASSWORD', 'ZAZAN2620*$'),
    database: configService.get('DB_NAME', 'ipharma_stg'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: configService.get('NODE_ENV') !== 'production',
    logging: configService.get('NODE_ENV') === 'development',
});
exports.getDatabaseConfig = getDatabaseConfig;
//# sourceMappingURL=database.config.js.map