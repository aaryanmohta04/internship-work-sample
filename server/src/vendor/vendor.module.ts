import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './vendor.entity';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { Contact } from 'src/contact/contact.entity';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor, Contact]), BaseModule],
  providers: [VendorService],
  controllers: [VendorController],
})
export class VendorModule {}
