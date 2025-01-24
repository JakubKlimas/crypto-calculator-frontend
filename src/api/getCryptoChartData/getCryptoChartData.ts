import { toast } from "react-toastify";
import axios from "axios";

import {
  IntervalsEmum,
  Price,
} from "../../components/MainChart/MainChart.type";

export const getCryptoChartData = async (
  cryptoShortName: string,
  setChartData: React.Dispatch<React.SetStateAction<Price[]>>,
  interval: IntervalsEmum = IntervalsEmum.ONE_DAY
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/crypto-info/chart/${
        cryptoShortName + "USDT"
      }/${interval}`
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    setChartData(response.data.data);
  } catch (e) {
    toast.error("Failed to fetch crypto chart data");
    console.error("Failed to fetch crypto chart data:", e);
  }
};
