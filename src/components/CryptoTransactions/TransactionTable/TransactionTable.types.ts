import { Dispatch, SetStateAction } from "react";

import { PriceAndAmount } from "../../../context/WalletCryptoAssetsContext/WalletCryptoAssetsContext.types";

export type TransactionTableProps = {
  data: PriceAndAmount[];
  pagination: { pageIndex: number; pageSize: number };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
  selectedRow: number | null;
  setSelectedRow: Dispatch<React.SetStateAction<number | null>>;
  setSelectedRowData: Dispatch<
    SetStateAction<PriceAndAmount | null | undefined>
  >;
  setShowCryptoTransactionsModal: Dispatch<React.SetStateAction<boolean>>;
};
