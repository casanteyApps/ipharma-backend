"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConfig = void 0;
const getDatabaseConfig = (configService) => ({
    synchronize: true,
    autoLoadEntities: true,
    host: configService.get('PG_HOST'),
    port: configService.get('PG_PORT'),
    database: configService.get('PG_DB'),
    username: configService.get('PG_USER'),
    type: configService.get('DB_TYPE'),
    password: configService.get('PG_PASSWORD'),
});
exports.getDatabaseConfig = getDatabaseConfig;
//# sourceMappingURL=database.config.js.map