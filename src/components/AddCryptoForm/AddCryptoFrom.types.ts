import { Dispatch, SetStateAction } from "react";

export type AddCryptoFormProps = {
  showAddCryptoModal: boolean;
  setAddCryptoModal: Dispatch<SetStateAction<boolean>>;
};

export type CryptoData = {
  data: {
    symbol: string;
    name?: string;
    price: number;
    priceChangePercent: number;
    priceChange: number;
    askPrice: number;
    volume: number;
    icon: string;
  };
};
