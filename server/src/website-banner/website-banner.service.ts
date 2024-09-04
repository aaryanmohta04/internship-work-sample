import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebsiteBanner } from './website-banner.entity';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class WebsiteBannerService {
  constructor(
    @InjectRepository(WebsiteBanner)
    private websiteBannerRepository: Repository<WebsiteBanner>,
    private s3Service: S3Service,
  ) {}

  async findAll(): Promise<any> {
    const banners = await this.websiteBannerRepository.find({
      order: { order: 'ASC' },
      where: { isDelete: false },
    });
    var urls: any = {};
    for (const banner of banners) {
      const url = await this.s3Service.getPreSignedURLToViewObject(
        banner.imagePath,
      );
      urls = {
        ...urls,
        [banner.id]: url,
      };
    }
    return { banners: banners, urls: urls };
  }

  async create(newWebsiteBanner: WebsiteBanner): Promise<WebsiteBanner> {
    const websiteBanners = await this.findAll();
    const newOrder = websiteBanners.length + 1;

    const newBanner = this.websiteBannerRepository.create({
      ...newWebsiteBanner,
      order: newOrder,
      createdDate: new Date(),
      updatedDate: new Date(),
    });

    await this.websiteBannerRepository.save(newBanner);
    return newBanner;
  }

  async findOne(id: number): Promise<WebsiteBanner> {
    const websiteBanner = await this.websiteBannerRepository.findOne({
      where: { id },
    });
    if (!websiteBanner) {
      throw new NotFoundException(`WebsiteBanner #${id} not found`);
    }
    return websiteBanner;
  }

  async updateOrder(websiteBanners: WebsiteBanner[]): Promise<void> {
    for (const { id, order } of websiteBanners) {
      await this.websiteBannerRepository.update({ id }, { order });
    }
  }

  async remove(id: number): Promise<void> {
    const websiteBanner = await this.websiteBannerRepository.findOne({
      where: { id },
    });
    if (websiteBanner) {
      websiteBanner.isDelete = true;
      await this.websiteBannerRepository.save(websiteBanner);
    }
  }

  async update(
    id: number,
    websiteBanner: WebsiteBanner,
  ): Promise<WebsiteBanner> {
    await this.websiteBannerRepository.update(id, websiteBanner);
    const updatedWebsiteBanner = await this.websiteBannerRepository.findOne({
      where: { id },
    });
    if (!updatedWebsiteBanner) {
      throw new NotFoundException(`WebsiteBanner #${id} not found`);
    }
    return updatedWebsiteBanner;
  }
}
