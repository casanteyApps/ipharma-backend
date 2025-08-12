/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  synchronize: true,
  autoLoadEntities: true,
  host: configService.get<string>('PG_HOST'),
  port: configService.get<number>('PG_PORT'),
  database: configService.get<string>('PG_DB'),
  username: configService.get<string>('PG_USER'),
  type: configService.get<string>('DB_TYPE') as any,
  password: configService.get<string>('PG_PASSWORD'),
});
