import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { ConvertParamsDTO } from './dto/convertParams.dto';
import { ConversionResult } from './interfaces/conversionResult';
import { ApiTags, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @ApiTags('Convert coins')
  @Get()
  @ApiOkResponse({
    schema: {
      type: 'object',
      example: {
        amount: 2,
        from: 'tether',
        to: 'ethereum',
        result: 0.00107,
      },
      description: 'Successful conversion',
    },
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        statusCode: 400,
        message: 'Failed to fetch data from the API',
        error: 'Bad Request',
      },
    },
    description: 'Uncategorized errors',
  })
  convert(@Query() queryParams: ConvertParamsDTO): Promise<ConversionResult> {
    return this.currencyService.convert(queryParams);
  }
}
