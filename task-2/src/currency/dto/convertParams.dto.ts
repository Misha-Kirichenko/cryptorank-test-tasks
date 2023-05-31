import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Matches, Min, Max } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class ConvertParamsDTO {
  @ApiProperty({ example: 'tether' })
  @Matches(/[a-z](\-)*/)
  from!: string;

  @ApiPropertyOptional({ example: 'ethereum' })
  @IsOptional()
  @Matches(/[a-z](\-)*/)
  to?: string;

  @ApiPropertyOptional({
    example: 2,
    minimum: 0.001,
    default: 1,
    maximum: 10000000,
  })
  @IsOptional()
  @Min(0.001, { message: 'amount must be greater or equal to 0.001' })
  @Max(10000000, { message: `amount can't be greater than 10000000` })
  @IsNumber()
  @Type(() => Number)
  amount?: number;
}
