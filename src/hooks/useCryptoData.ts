import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface CryptoInfo {
  symbol: string;
  price: string;
  priceChangePercent: string;
  volume: string;
  icon: string;
}

export const useCryptoData = (symbol: string, shortName: string) => {
  const [cryptoData, setCryptoData] = useState<CryptoInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const fetchCryptoData = async () => {
    try {
      setLoading(true);

      // Fetch cryptocurrency data
      const response = await axios.get(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch data from Binance API.");
      }

      const data = await response.data;

      // Process data
      const processedData: CryptoInfo = {
        symbol: data.symbol,
        price: data.lastPrice,
        priceChangePercent: data.priceChangePercent,
        volume: data.volume,
        icon: `https://assets.coincap.io/assets/icons/${shortName.toLowerCase()}@2x.png`,
      };

      setCryptoData(processedData);
    } catch (err: any) {
      toast.error("Failed to fetch crypto data");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  return { cryptoData, loading, error };
};
