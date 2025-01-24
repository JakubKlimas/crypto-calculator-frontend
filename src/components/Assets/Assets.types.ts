import { Dispatch, SetStateAction } from "react";

import { CryptoAsset } from "../../context/WalletCryptoAssetsContextController/WalletCryptoAssetsContextController.types";

export type AssetsProps = {
  setSelectedRowData: Dispatch<SetStateAction<CryptoAsset | null>>;
  selectedRowData: CryptoAsset | null;
};
