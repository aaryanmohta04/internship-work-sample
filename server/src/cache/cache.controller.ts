import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Post()
  async setCache(
    @Body('key') key: string,
    @Body('value') value: any,
  ): Promise<string> {
    await this.cacheService.setCache(key, value);
    return `Cache set for key: ${key} ${value}`;
  }

  @Get(':key')
  async getCache(@Param('key') key: string): Promise<any> {
    const value = await this.cacheService.getCache(String(key));
    return value ? `Cached Value: ${value}` : `No value found for key: ${key}`;
  }

  @Delete(':key')
  async delCache(@Param('key') key: string): Promise<string> {
    await this.cacheService.delCache(key);
    return `Cache deleted for key: ${key}`;
  }
  @Delete()
  async resetCache(): Promise<void> {
    await this.cacheService.resetCache();
  }
}
