import { ConversionResult } from '../interfaces/conversionResult';

export type Convertation = Pick<ConversionResult, 'from' | 'to' | 'amount'> & {
  fromCurrencyUSDPrice: number;
  toCurrencyUSDPrice: number;
};
