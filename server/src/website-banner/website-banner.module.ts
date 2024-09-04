import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsiteBanner } from './website-banner.entity';
import { WebsiteBannerService } from './website-banner.service';
import { WebsiteBannerController } from './website-banner.controller';
import { S3Module } from 'src/s3/s3.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([WebsiteBanner]),
    S3Module
  ],
  providers: [WebsiteBannerService],
  controllers: [WebsiteBannerController],
})
export class WebsiteBannerModule {}
