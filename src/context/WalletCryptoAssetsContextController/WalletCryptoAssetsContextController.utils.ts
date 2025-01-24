import {
  State,
  WalletCryptoAssetsActions,
} from "./WalletCryptoAssetsContextController.types";

export const cryptoAssetsDataReducer = (
  state: State,
  action: { type: WalletCryptoAssetsActions; payload?: any }
): State => {
  switch (action.type) {
    case WalletCryptoAssetsActions.SET_WALLET_ID:
      return { ...state, walletId: action.payload };

    case WalletCryptoAssetsActions.SET_WALLET_DATA:
      return { ...state, assets: action.payload };

    case WalletCryptoAssetsActions.SET_ACCOUNT_BALANCE:
      return { ...state, accountBalance: action.payload };

    case WalletCryptoAssetsActions.SET_TOP_10_CRYPTO:
      return { ...state, top10Crypto: action.payload };

    case WalletCryptoAssetsActions.RESET:
      return { ...state, walletId: "", assets: [], accountBalance: "" };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
