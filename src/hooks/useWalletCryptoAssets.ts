import { useContext } from "react";
import { WalletCryptoAssetsContext } from "../context/WalletCryptoAssetsContext/WalletCryptoAssetsContext";

export const useWalletCryptoAssets = () => {
  const context = useContext(WalletCryptoAssetsContext);

  if (!context) {
    throw new Error(
      "WalletCryptoAssetsContext must be within WalletCryptoAssetsContextController"
    );
  }

  return context;
};
