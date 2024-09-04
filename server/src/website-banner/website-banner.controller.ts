import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WebsiteBannerService } from './website-banner.service';
import { WebsiteBanner } from './website-banner.entity';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(RolesGuard)
@Controller('website-banner')
export class WebsiteBannerController {
  constructor(private readonly websiteBannerService: WebsiteBannerService) {}

  @Post()
  create(@Body() websiteBanner: WebsiteBanner) {
    return this.websiteBannerService.create(websiteBanner);
  }

  @Get()
  findAll() {
    return this.websiteBannerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.websiteBannerService.findOne(id);
  }

  @Put('order')
  async updateOrder(@Body() websiteBanners: WebsiteBanner[]): Promise<void> {
    await this.websiteBannerService.updateOrder(websiteBanners);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() websiteBanner: WebsiteBanner) {
    return this.websiteBannerService.update(id, websiteBanner);
  }

  @Post('delete')
  async remove(@Body('id') id: number): Promise<void> {
    return this.websiteBannerService.remove(id);
  }
}
