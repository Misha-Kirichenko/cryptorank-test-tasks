import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { ConvertParamsDTO } from './dto/convertParams.dto';
import { Convertation } from './interfaces/convertation.interface';

@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Get()
  convert(@Query() queryParams: ConvertParamsDTO): Promise<Convertation> {
    return this.currencyService.convert(queryParams);
  }
}
