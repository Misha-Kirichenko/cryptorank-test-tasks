import { calculateConversion, roundCurrency } from './math.utils';
describe('Check roundCurrency operation', () => {
  it('should round positive number with two decimal places correctly', () => {
    expect(roundCurrency(12.34)).toEqual(12.34);
  });

  it('should round number less than 1 correctly up to 3 digits after zeros', () => {
    expect(roundCurrency(0.005567)).toEqual(0.00557);
  });

  it('correctly round to the decimal point', () => {
    expect(roundCurrency(500.111)).toEqual(500.11);
    expect(roundCurrency(500.995)).toEqual(501);
    expect(roundCurrency(500.994)).toEqual(500.99);
  });

  it('should return number with decimals in string format for large numbers', () => {
    expect(roundCurrency(123456789)).toEqual('123456789.00');
  });

  it('should return answer for small numbers in string format to be displayed without exponenta', () => {
    expect(typeof roundCurrency(0.000000001)).toEqual('string');
  });

  it('should return answer for big numbers in string format to be displayed without exponenta', () => {
    expect(typeof roundCurrency(11000000)).toEqual('string');
  });
});

describe('Calculate conversion', () => {
  it('should calculate conversion to USD', () => {
    const conversion = {
      from: 'eur',
      to: 'usd',
      fromCurrencyUSDPrice: 1.2,
      toCurrencyUSDPrice: 1,
      amount: 100,
    };

    const result = calculateConversion(conversion);

    expect(result).toEqual({
      amount: 100,
      from: 'eur',
      to: 'usd',
      result: 120,
    });
  });

  it('should calculate conversion to non-USD currency', () => {
    const conversion = {
      from: 'usd',
      to: 'eur',
      fromCurrencyUSDPrice: 1,
      toCurrencyUSDPrice: 1.2,
      amount: 100,
    };

    const result = calculateConversion(conversion);

    expect(result).toEqual({
      amount: 100,
      from: 'usd',
      to: 'eur',
      result: 83.33,
    });
  });
});
