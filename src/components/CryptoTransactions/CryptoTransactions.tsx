import { createPortal } from "react-dom";
import { useMemo, useState } from "react";

import "./CryptoTransactions.css";
import { CryptoTransactionsProps } from "./CryptoTransactions.types";
import { PriceAndAmount } from "../../context/WalletCryptoAssetsContextController/WalletCryptoAssetsContextController.types";

import { useWalletCryptoAssets } from "../../hooks/useWalletCryptoAssets";

import { TransactionForm } from "./TransactionForm/TransactionForm";
import { TransactionTable } from "./TransactionTable/TransactionTable";

export const CryptoTransactions = ({
  showCryptoTransactionsModal,
  setShowCryptoTransactionsModal,
}: CryptoTransactionsProps) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedRowData, setSelectedRowData] =
    useState<PriceAndAmount | null>();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });

  const { selectedCryptoTransactionHistory } = useWalletCryptoAssets();

  const handleCloseModal = (e: React.MouseEvent) => {
    if (
      (e.target as Element).classList.contains("crypto-transactions__container")
    ) {
      setShowCryptoTransactionsModal(false);
    }
  };

  if (!showCryptoTransactionsModal) return null;

  const paginatedData = useMemo(() => {
    const startIndex = pagination.pageIndex * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return selectedCryptoTransactionHistory?.priceAndAmount.slice(
      startIndex,
      endIndex
    );
  }, [pagination, selectedCryptoTransactionHistory?.priceAndAmount]);

  if (!selectedCryptoTransactionHistory?.priceAndAmount.length) {
    return (
      <div
        className="crypto-transactions__container"
        onClick={handleCloseModal}
      >
        <section className="crypto-transactions__wrapper">
          <h3 className="crypto-transactions__title">Crypto transactions</h3>
          <div>No transaction data available</div>
        </section>
      </div>
    );
  }

  return (
    <>
      {createPortal(
        <div
          className="crypto-transactions__container"
          onClick={handleCloseModal}
        >
          <section className="crypto-transactions__wrapper">
            <h3 className="crypto-transactions__title">Crypto transactions</h3>
            <>
              {selectedRowData ? (
                <TransactionForm
                  selectedRowData={selectedRowData}
                  setSelectedRowData={setSelectedRowData}
                  setShowCryptoTransactionsModal={
                    setShowCryptoTransactionsModal
                  }
                />
              ) : (
                <TransactionTable
                  data={paginatedData as PriceAndAmount[]}
                  pagination={pagination}
                  selectedRow={selectedRow}
                  setPagination={setPagination}
                  setSelectedRow={setSelectedRow}
                  setSelectedRowData={setSelectedRowData}
                  setShowCryptoTransactionsModal={
                    setShowCryptoTransactionsModal
                  }
                />
              )}
            </>
          </section>
        </div>,
        document.body
      )}
    </>
  );
};
