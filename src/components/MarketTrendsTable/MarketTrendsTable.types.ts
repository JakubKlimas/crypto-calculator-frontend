export type CryptoCoin = {
  name: string;
  symbol: string;
  lastPrice: string;
  dayChange: number;
  profitOrLoss: string;
};

export type DataBySymols = {
  symbol: string;
  price: string;
  priceChangePercent: string;
  priceChange: string;
  askPrice: string;
  volume: string;
  icon: string;
};
