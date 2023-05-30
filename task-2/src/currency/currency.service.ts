import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ConvertParamsDTO } from './dto';
import { roundCurrency } from 'src/utils';
import { Convertation } from './interfaces/convertation.interface';
import { CacheService } from './cache.service';

@Injectable()
export class CurrencyService {
  private currencyApiBaseUrl = `https://tstapi.cryptorank.io/v0/coins`;
  constructor(
    private readonly httpService: HttpService,
    private readonly cacheService: CacheService,
  ) {}

  async getCurrencyPriceInUSD(currencyName: string): Promise<number> {
    try {
      const currencyRate = await this.cacheService.getCurrencyRate(
        currencyName,
      );

      if (currencyRate) {
        return currencyRate;
      }

      const {
        data: {
          data: {
            price: { USD: priceInUSD },
          },
        },
      }: AxiosResponse = await this.httpService
        .get(`${this.currencyApiBaseUrl}/${currencyName}`)
        .toPromise();

      await this.cacheService.setCurrencyRate(currencyName, priceInUSD);

      return priceInUSD;
    } catch (_) {
      throw new BadRequestException('Failed to fetch data from the API.');
    }
  }

  public async convert(queryParams: ConvertParamsDTO): Promise<Convertation> {
    const { from, to = 'tether', amount = 1 } = queryParams;
    const fromCurrencyUSDPrice =
      (await this.getCurrencyPriceInUSD(from)) * amount;
    const toCurrencyUSDPrice = await this.getCurrencyPriceInUSD(to);

    const rounded = roundCurrency(
      to === 'usd'
        ? fromCurrencyUSDPrice
        : fromCurrencyUSDPrice / toCurrencyUSDPrice,
    );
    return { amount, from, to, result: rounded };
  }
}
