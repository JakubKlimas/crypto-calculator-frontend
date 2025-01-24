import { Dispatch, SetStateAction } from "react";

import { PriceAndAmount } from "../../../context/WalletCryptoAssetsContext/WalletCryptoAssetsContext.types";

export type FormValues = {
  amount: string;
  buyPrice: string;
};

export type TransactionFormProps = {
  selectedRowData: PriceAndAmount | null;
  setShowCryptoTransactionsModal: Dispatch<SetStateAction<boolean>>;
  setSelectedRowData: Dispatch<
    SetStateAction<PriceAndAmount | null | undefined>
  >;
};
