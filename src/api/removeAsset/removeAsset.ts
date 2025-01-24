import { toast } from "react-toastify";

export const removeAsset = async (
  id: string,
  getWalletData: VoidFunction,
  getAccountBalance: VoidFunction,
  setShowCryptoTransactionsModal: (value: React.SetStateAction<boolean>) => void
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/portfolio/remove-asset`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      }
    );

    if (response.status === 200) {
      getWalletData();
      getAccountBalance();
      setShowCryptoTransactionsModal(false);
      toast.success("Asset removed");
    }
  } catch (e) {
    toast.error("Failed to remove asset");
    console.error("Failed to remove asset", e);
  }
};
