import { ConversionResult } from 'src/currency/interfaces/conversionResult';
import { Convertation } from 'src/currency/types/convertation';

/*
  if multiplying number by 100 is enough to make number more than 100 then we quit
  loop and we only round 2 decimals after dot, because number is more or equal to 1
  in case of small number we need to multiply this number by more than 100 
  to get three digits in the integer part of a number. 
  We count how many decimal places we need to achieve that.
  We use this decimal places value to round our initial value
  */
const MAX_FACTOR = 1e7;

export const roundCurrency = (convertionResult: number): string | number => {
  let decimalPlaces = 2; // for big numbers 2 decimal places after dot
  let factor: number;
  while ((factor = Math.pow(10, decimalPlaces)) * convertionResult < 100) {
    decimalPlaces++;
  }

  const numberToFixed = convertionResult.toFixed(decimalPlaces);
  return factor >= MAX_FACTOR || convertionResult * factor >= MAX_FACTOR
    ? numberToFixed
    : Number(numberToFixed);
};

export const calculateConversion = (conversion: Convertation): ConversionResult => {
  const { fromCurrencyUSDPrice, toCurrencyUSDPrice, amount, from, to } =
    conversion;
  let rounded: number | string;

  if (to === 'usd') rounded = roundCurrency(fromCurrencyUSDPrice * amount);
  else
    rounded = roundCurrency(
      (fromCurrencyUSDPrice * amount) / toCurrencyUSDPrice,
    );

  return {
    amount,
    from,
    to,
    result: rounded,
  };
};
