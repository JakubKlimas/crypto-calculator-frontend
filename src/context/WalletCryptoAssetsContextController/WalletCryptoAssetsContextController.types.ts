import { ReactNode, Dispatch } from "react";

export interface State {
  walletId: string;
  accountBalance: string;
  assets: CryptoAsset[];
  top10Crypto: string[];
}

export interface WalletCryptoAssetsContextValue {
  state: State;
  dispatch: Dispatch<{ type: WalletCryptoAssetsActions; payload?: any }>;
  getWalletData: VoidFunction;
  getSelectedCryptoTransactions: (symbol: string) => void;
  getAccountBalance: VoidFunction;
  selectedCryptoTransactionHistory: CryptoAsset | null;
}

export type WalletCryptoAssetsContextControllerProps = {
  children: ReactNode;
};

export enum WalletCryptoAssetsActions {
  SET_WALLET_ID = "SET_WALLET_ID",
  SET_WALLET_DATA = "SET_WALLET_DATA",
  SET_ACCOUNT_BALANCE = "SET_ACCOUNT_BALANCE",
  SET_TOP_10_CRYPTO = "SET_TOP_10_CRYPTO",
  RESET = "RESET",
}

export type CryptoAsset = {
  walletId: string;
  nameAndSymbol: {
    name: string;
    symbol: string;
  };
  totalAmount: number;
  totalPurchasePrice: string;
  profitOrLoss: string;
  priceAndAmount: PriceAndAmount[];
};

export type PriceAndAmount = {
  id: string;
  price: number;
  currency: string;
  amount: number;
};
