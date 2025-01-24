import { Dispatch, SetStateAction } from "react";

export type CryptoTransactionsProps = {
  showCryptoTransactionsModal: boolean;
  setShowCryptoTransactionsModal: Dispatch<SetStateAction<boolean>>;
};
