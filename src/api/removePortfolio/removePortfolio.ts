import { toast } from "react-toastify";

export const removePortfolio = async (
  walletId: string,
  name: string,
  getWalletData: VoidFunction,
  getAccountBalance: VoidFunction,
  setShowCryptoTransactionsModal: (value: React.SetStateAction<boolean>) => void
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/portfolio/remove-portfolio`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletId,
          name,
        }),
      }
    );

    if (response.ok) {
      getWalletData();
      getAccountBalance();
      setShowCryptoTransactionsModal(false);
      toast.success("Portfolio removed");
    }
  } catch (e) {
    toast.error("Failed to remove portfolio");
    console.error("Failed  to remove portfolio:", e);
  }
};
