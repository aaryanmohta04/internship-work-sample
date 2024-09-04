import { Global, Module } from '@nestjs/common';
import { CacheModule as CacheManagerModule} from '@nestjs/cache-manager';
import { CacheService } from './cache.service';
import { CacheController } from './cache.controller';
import { RoleModuleModule } from 'src/role-module/role-module.module';

@Global()
@Module({
  imports: [
    CacheManagerModule.register({
      isGlobal: true,
    }),
    RoleModuleModule,
  ],
  controllers: [CacheController],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
