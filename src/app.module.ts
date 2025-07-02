import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { SeedModule } from './seeds/seed.module';
import { AdminModule } from './admin/admin.module';
import { SupplierModule } from './suppliers/supplier.module';
import { CustomerModule } from './customers/customers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.prod',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    SeedModule,
    AdminModule,
    SupplierModule,
    CustomerModule,
  ],
})
export class AppModule {}
