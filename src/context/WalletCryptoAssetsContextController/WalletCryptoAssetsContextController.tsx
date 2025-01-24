import { useEffect, useMemo, useReducer, useState } from "react";
import {
  CryptoAsset,
  State,
  WalletCryptoAssetsActions,
  WalletCryptoAssetsContextControllerProps,
} from "./WalletCryptoAssetsContextController.types";
import { WalletCryptoAssetsContext } from "../WalletCryptoAssetsContext/WalletCryptoAssetsContext";
import { cryptoAssetsDataReducer } from "./WalletCryptoAssetsContextController.utils";
import { getAccountBallance } from "../../api/getAccountBalance/getAccountBalance";
import { getWalletAssets } from "../../api/getWalletAssets/getWalletAssets";
import { getTop10CryptoCoins } from "../../api/getTop10CryptoCoins/getTop10CryptoCoins";

export const WalletCryptoAssetsContextController = ({
  children,
}: WalletCryptoAssetsContextControllerProps) => {
  const initialState: State = {
    walletId: "",
    accountBalance: "",
    assets: [],
    top10Crypto: [],
  };

  const [state, dispatch] = useReducer(cryptoAssetsDataReducer, initialState);
  const [
    selectedCryptoTransactionHistory,
    setSelectedCryptoTransactionHistory,
  ] = useState<CryptoAsset | null>(null);

  const getAccountBalance = async () => {
    if (!state?.walletId || !state?.walletId.length) return;

    try {
      const accountBalance = await getAccountBallance(state.walletId);
      dispatch({
        type: WalletCryptoAssetsActions.SET_ACCOUNT_BALANCE,
        payload: accountBalance.data,
      });
    } catch (error) {
      throw new Error(`Failed to fetch account balance: ${error}`);
    }
  };

  const getWalletData = async () => {
    if (!state?.walletId || !state?.walletId.length) return;

    try {
      const walletData = await getWalletAssets(state.walletId);
      dispatch({
        type: WalletCryptoAssetsActions.SET_WALLET_DATA,
        payload: walletData.data,
      });
    } catch (error) {
      console.error("Failed to fetch wallet data:", error);
    }
  };

  const getTop10Crypto = async () => {
    try {
      const top10Crypto = await getTop10CryptoCoins();
      dispatch({
        type: WalletCryptoAssetsActions.SET_TOP_10_CRYPTO,
        payload: top10Crypto.data,
      });
    } catch (error) {
      console.error("Failed to fetch top 10 crypto:", error);
    }
  };

  const getSelectedCryptoTransactions = (symbol: string) => {
    const selectedAsset = state.assets.find(
      (asset) => asset.nameAndSymbol.symbol === symbol
    );

    if (selectedAsset) {
      setSelectedCryptoTransactionHistory(selectedAsset);
    }
  };

  useEffect(() => {
    getWalletData();
    getAccountBalance();
  }, [state.walletId]);

  useEffect(() => {
    getTop10Crypto();
  }, []);

  const contextValues = useMemo(
    () => ({
      state,
      dispatch,
      getWalletData,
      getSelectedCryptoTransactions,
      getAccountBalance,
      selectedCryptoTransactionHistory,
    }),
    [
      state,
      dispatch,
      getWalletData,
      getSelectedCryptoTransactions,
      getAccountBalance,
      selectedCryptoTransactionHistory,
    ]
  );

  return (
    <WalletCryptoAssetsContext.Provider value={contextValues}>
      {children}
    </WalletCryptoAssetsContext.Provider>
  );
};
