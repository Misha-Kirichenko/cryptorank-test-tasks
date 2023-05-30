export const roundCurrency = (convertionResult: number): string | number => {
  let decimalPlaces = 2;
  let factor: number; // for big numbers 2 decimal places after dot
  while ((factor = Math.pow(10, decimalPlaces)) * convertionResult < 100) {
    decimalPlaces++;
  }

  const numberWithoutFactor = convertionResult.toFixed(decimalPlaces);
  return factor >= 1e8 || convertionResult * factor >= 1e7
    ? numberWithoutFactor
    : Number(numberWithoutFactor);
};
