/** @format */

type Currency = 'USD';
type CurrencySymbol = '$';

export interface IMoney {
  value: number;
  currency: Currency;
  symbol: CurrencySymbol;
}
