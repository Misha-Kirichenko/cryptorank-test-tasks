import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { CurrencyModule } from './currency/currency.module';
import { CurrencyController } from './currency/currency.controller';
import { CurrencyService } from './currency/currency.service';
import { CacheService } from './currency/cache.service';

@Module({
  imports: [CurrencyModule, HttpModule, CacheModule.register()],
  controllers: [CurrencyController],
  providers: [CurrencyService, CacheService],
})
export class AppModule {}
