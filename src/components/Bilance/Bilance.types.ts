import { Dispatch, SetStateAction } from "react";
import { CryptoAsset } from "../Assets/Assets.types";

export type BilanceProps = {
  isProfit: boolean;
  selectedRowData: CryptoAsset | null;
  setShowCryptoTransactionsModal: Dispatch<SetStateAction<boolean>>;
};
