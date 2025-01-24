import { createContext } from "react";
import { WalletCryptoAssetsContextValue } from "../WalletCryptoAssetsContextController/WalletCryptoAssetsContextController.types";

export const WalletCryptoAssetsContext =
  createContext<WalletCryptoAssetsContextValue | null>(null);
