import axios from "axios";
import { toast } from "react-toastify";

import { DataBySymols } from "../../components/MarketTrendsTable/MarketTrendsTable.types";

export const getCryptoDataCollection = async (
  cryptoArr: string[],
  setTableData: React.Dispatch<React.SetStateAction<DataBySymols[]>>
) => {
  try {
    const symbolsQuery = cryptoArr.join(",");
    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_ADDRESS
      }/crypto-info/data-symbols?symbols=${symbolsQuery}`
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    setTableData(response.data.data);
  } catch (e) {
    toast.error("Failed to fetch crypto collection data");
    console.error("Failed to fetch crypto collection data:", e);
  }
};
