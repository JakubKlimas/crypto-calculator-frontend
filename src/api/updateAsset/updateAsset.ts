import axios from "axios";
import { toast } from "react-toastify";

type UpdateAssetBody = {
  amount: number;
  price: number;
  id?: string;
};

export const updateAsset = async (
  body: UpdateAssetBody,
  getWalletData: VoidFunction,
  getAccountBalance: VoidFunction,
  setShowCryptoTransactionsModal: (value: React.SetStateAction<boolean>) => void
) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/portfolio/update-asset`,
      body
    );

    if (response.status === 200) {
      getWalletData();
      getAccountBalance();
      setShowCryptoTransactionsModal(false);
      toast.success("Asset updated");
    }
  } catch (e) {
    toast.error("Failed to update asset");
    console.error("Failed to update asset:", e);
  }
};
