import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { CacheService } from './cache.service';
;

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [CurrencyController],
  providers: [CurrencyService, CacheService]
})
export class CurrencyModule {}
