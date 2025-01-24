import axios from "axios";
import { toast } from "react-toastify";

export const getFearAndGreedData = async (
  setFearGreedData: (value: any) => void
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/alternative-api/fng`
    );

    setFearGreedData({
      value: response.data.data.value,
      classification: response.data.data.value_classification,
    });
  } catch (error) {
    toast.error("Error fetching Fear & Greed Index");
    console.error("Error fetching Fear & Greed Index:", error);
  }
};
