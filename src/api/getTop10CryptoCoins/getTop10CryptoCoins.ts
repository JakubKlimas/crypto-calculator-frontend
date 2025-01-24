import axios from "axios";
import { toast } from "react-toastify";

export const getTop10CryptoCoins = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/crypto-info/top-10-coins`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch top 10 crypto");
    }

    return response.data;
  } catch (e) {
    toast.error("Failed to fetch top 10 crypto coins");
    console.error("Failed to fetch top 10 crypto coins:", e);
  }
};
