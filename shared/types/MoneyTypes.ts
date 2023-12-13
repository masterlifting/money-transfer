/** @format */

type CurrencyType = 'USD';
type CurrencySymbolType = '$';

export interface IMoney {
  value: number;
  currency: CurrencyType;
  symbol: CurrencySymbolType;
}
