/* If the task also needed to get all currency rates at once,
it would be possible to use Redis and store all currency rates relative to $ 
in one key in the form of an object. 
But in this case it is enough to store data of each currency in a separate key. 
There is only 1 endpoint in the application and we are only converting one currency to another, 
so keeping all of the currencies in a key is redundant in this case, because 
we will never request all rates at once
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
