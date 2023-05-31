export interface ConversionResult {
  readonly from: string;
  readonly to: string;
  readonly amount: number;
  readonly result: number | string;
}
