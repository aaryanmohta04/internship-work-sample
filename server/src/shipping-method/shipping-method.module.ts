import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingMethod } from './shipping-method.entity';
import { ShippingMethodService } from './shipping-method.service';
import { ShippingMethodController } from './shipping-method.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingMethod])],
  providers: [ShippingMethodService],
  controllers: [ShippingMethodController],
})
export class ShippingMethodModule {}
