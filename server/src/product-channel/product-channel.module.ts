// src/product-channel/product-channel.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { ChannelModule } from '../channel/channel.module';
import { ProductChannel } from './product-channel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductChannel]),
    ProductModule,
    ChannelModule,
  ],
  controllers: [],
  providers: [],
})
export class ProductChannelModule {}
