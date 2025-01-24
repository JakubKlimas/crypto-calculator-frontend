import axios from "axios";
import { toast } from "react-toastify";

export const getWalletAssets = async (walletId: string) => {
  try {
    if (!walletId) throw new Error("Wallet ID is required");

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/portfolio/${walletId}`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch wallet assets");
    }

    return response.data;
  } catch (e) {
    toast.error("Failed to fetch wallet assets");
    console.error("Failed to fetch wallet assets:", e);
  }
};
