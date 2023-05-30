/* Если бы в задание нужно было ещё получить все курсы валют разом,
то можно бы было использовать Redis и хранить все курсы валют относительно $ 
в одном ключе в виде объекта. 
А в данном случае достаточно просто хранить данные каждой валюты в отдельном ключе. 
В приложении всего 1 эндпоинт и мы только конвертируем одну валюту в другую, 
поэтому хранить все валюты в ключе в данном случае считаю избыточным, так как 
мы никогда не запросим все курсы разом
*/

import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  private timeToKeep = 5 * 60 * 1000;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCurrencyRate(currencyName: string): Promise<number> {
    const currencyRate: number | undefined = await this.cacheManager.get(
      currencyName,
    );
    return currencyRate;
  }

  async setCurrencyRate(
    currencyName: string,
    currencyValue: number,
  ): Promise<void> {
    await this.cacheManager.set(currencyName, currencyValue, this.timeToKeep);
  }
}
