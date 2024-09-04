import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setCache(key: string, value: any): Promise<void> {
    await this.cacheManager.set(key, value, 1.8e6);
  }

  async getCache<T>(key: string): Promise<T | undefined> {
    return await this.cacheManager.get<T>(key);
  }

  async delCache(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
  async resetCache(): Promise<void> {
    await this.cacheManager.reset();
  }
}
