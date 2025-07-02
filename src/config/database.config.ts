import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST', '10.19.32.141'),
  port: configService.get('DB_PORT', 5432),
  username: configService.get('ipharmadbmaster'),
  password: configService.get('ZAZAN2620*$'),
  database: configService.get('ipharma_stg'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: configService.get('NODE_ENV') !== 'production',
  logging: configService.get('NODE_ENV') === 'development',
  // ssl:
  //   configService.get('NODE_ENV') === 'production'
  //     ? { rejectUnauthorized: false }
  //     : false,
});
