import axios from "axios";

import { AccountDetail } from "../../components/Accounts/Accounts.types";

import { randomIntFromInterval } from "../../utils/math";
import { toast } from "react-toastify";

export const addWallet = async (
  accountsNumber: number,
  setAccountDetails: React.Dispatch<React.SetStateAction<AccountDetail[]>>,
  setAccountsNumber: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const body = {
      name: `wallet${accountsNumber + 1}`,
      avatarType: randomIntFromInterval(1, 2),
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/wallet`,
      body
    );

    if (response.status === 201) {
      const walletsRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/wallet`
      );

      if (walletsRes.status === 200) {
        const { data } = await walletsRes;

        setAccountDetails(data.data);
        setAccountsNumber(data.length);
        toast.success("Wallet added");
      }
    }
  } catch (e) {
    toast("Failed to add wallet");
    console.error("Failed to add wallet:", e);
  }
};
