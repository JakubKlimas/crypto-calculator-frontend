import axios from "axios";
import { toast } from "react-toastify";

export const getCryptoDataByName = async (name: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/crypto-info/data-name/${name}`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch crrypto  data by name");
    }

    return response.data;
  } catch (e) {
    toast.error("Failed to fetch crypto data by name");
  }
};
