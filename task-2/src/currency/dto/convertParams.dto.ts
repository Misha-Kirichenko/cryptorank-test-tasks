import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Matches, Min, Max } from 'class-validator';

export class ConvertParamsDTO {
  @Matches(/[a-z](\-)*/)
  from: string;

  @IsOptional()
  @Matches(/[a-z](\-)*/)
  to?: string;

  @IsOptional()
  @Min(0.001, { message: 'amount must be greater or equal to 0.001' })
  @Max(10000000, { message: `amount can't be greater than 10000000` })
  @IsNumber()
  @Type(() => Number)
  amount?: number;
}
