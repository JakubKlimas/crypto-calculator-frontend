import axios from "axios";
import { toast } from "react-toastify";

type AddAssetToWalletBody = {
  walletId: string;
  name: string;
  market: string;
  symbol: string;
  price: number;
  amount: number;
  currency: string;
};

export const addAssetToWallet = async (
  getAccountBalance: VoidFunction,
  getWalletData: VoidFunction,
  body: AddAssetToWalletBody
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/portfolio`,
      body
    );

    if (response.status !== 201) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    getWalletData();
    getAccountBalance();
    toast.success("Asset added to wallet");
    return true;
  } catch (e) {
    toast.error("Failed to save asset in wallet");
    return false;
  }
};
