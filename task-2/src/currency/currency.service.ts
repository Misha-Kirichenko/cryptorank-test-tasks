import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ConvertParamsDTO } from './dto';
import { calculateConversion, roundCurrency } from 'src/utils';
import { ConversionResult } from './interfaces/conversionResult';
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
      throw new BadRequestException('Failed to fetch data from the API');
    }
  }

  public async convert(
    queryParams: ConvertParamsDTO,
  ): Promise<ConversionResult> {
    const { from, to = 'tether', amount = 1 } = queryParams;
    const fromCurrencyUSDPrice = await this.getCurrencyPriceInUSD(from);
    const toCurrencyUSDPrice = await this.getCurrencyPriceInUSD(to);

    return calculateConversion({
      from,
      to,
      fromCurrencyUSDPrice,
      toCurrencyUSDPrice,
      amount,
    });
  }
}
