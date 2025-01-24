import axios from "axios";
import { toast } from "react-toastify";

export const removeWallet = async (walletId: string) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/wallet/${walletId}`
    );

    if (response.status === 200) {
      window.location.reload();
    }
  } catch (e) {
    toast.error("Failed to remove wallet");
    console.error("Failed to remove wallet:", e);
  }
};
