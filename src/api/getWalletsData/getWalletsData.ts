import axios from "axios";
import { toast } from "react-toastify";

export const getWalletsData = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/wallet`
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch wallets data");
    }

    const {
      data: { data },
    } = await response;

    return data;
  } catch (e) {
    toast.error("Failed to fetch wallets data");
    console.error("Failed to fetch wallets data:", e);
  }
};
