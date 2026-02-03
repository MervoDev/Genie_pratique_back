import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Achat } from './achat/achat.entity';
import { AchatModule } from './achat/achat.module';
import { ProduitsModule } from './produits/produits.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      entities: [Achat],
      synchronize: true, // Attention: false en production
      logging: true,
    }),
    AchatModule,
    ProduitsModule,
  ],
})
export class AppModule {}
