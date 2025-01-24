export type PriceAndAmount = {
  id: string;
  price: number;
  currency: string;
  amount: number;
};

export type WalletCryptoAssetsData = {
  walletId: string;
  totalPurchasePrice: string;
  totalAmount: number;
  profitOrLoss: string;
  nameAndSymbol: {
    name: string;
    symbol: string;
  };
  priceAndAmount: PriceAndAmount[];
};
