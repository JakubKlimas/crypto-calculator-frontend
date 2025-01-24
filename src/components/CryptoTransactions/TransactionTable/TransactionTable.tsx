import { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import "../../Assets/Assets.css";
import "../TransactionForm/TransactionForm.styles.css";
import "./TransactionTable.styles.css";
import { PriceAndAmount } from "../../../context/WalletCryptoAssetsContextController/WalletCryptoAssetsContextController.types";
import { TransactionTableProps } from "./TransactionTable.types";

import Bin from "../../../assets/bin.svg?react";

import { useWalletCryptoAssets } from "../../../hooks/useWalletCryptoAssets";
import { removePortfolio } from "../../../api/removePortfolio/removePortfolio";

export const TransactionTable = ({
  data,
  pagination,
  setPagination,
  selectedRow,
  setSelectedRow,
  setSelectedRowData,
  setShowCryptoTransactionsModal,
}: TransactionTableProps) => {
  const {
    state,
    selectedCryptoTransactionHistory,
    getAccountBalance,
    getWalletData,
  } = useWalletCryptoAssets();

  const columns = useMemo<ColumnDef<PriceAndAmount, any>[]>(() => {
    return [
      {
        accessorKey: "nameAndSymbol",
        cell: () => {
          return (
            <div className="assets__name-container">
              <div className="assets__img-container">
                <img
                  src={`https://assets.coincap.io/assets/icons/${selectedCryptoTransactionHistory?.nameAndSymbol?.symbol.toLowerCase()}@2x.png`}
                  className="assets__img"
                  alt={`${name} logo`}
                />
              </div>
              <div className="assets__name-wrapper">
                <span className="assets__name">
                  {selectedCryptoTransactionHistory?.nameAndSymbol?.name}
                </span>
                <span className="assets__symbol">
                  {selectedCryptoTransactionHistory?.nameAndSymbol?.symbol}
                </span>
              </div>
            </div>
          );
        },
        header: "Name and Symbol",
        enableSorting: false,
      },
      {
        accessorKey: "priceAndAmount",
        cell: (info) => {
          return (
            <div className="assets__value-wrapper">
              <div className="assets__value-container">
                <span className="assets__name">{info.row.original.amount}</span>
                <span className="assets__symbol">
                  {info.row.original.price}$
                </span>
              </div>
            </div>
          );
        },
        header: "Price and Amount",
        enableSorting: false,
      },
    ];
  }, []);

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(
      selectedCryptoTransactionHistory?.priceAndAmount
        ? selectedCryptoTransactionHistory?.priceAndAmount.length /
            pagination.pageSize
        : 1
    ),
    state: { pagination },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleRowClick = (rowId: number, rowData: PriceAndAmount) => {
    setSelectedRow(rowId);
    setSelectedRowData(rowData);
  };

  const handleNextPage = () => {
    setPagination((old) => ({
      pageIndex: old.pageIndex + 1,
      pageSize: old.pageSize,
    }));
  };

  const handlePreviousPage = () => {
    setPagination((old) => ({
      pageIndex: old.pageIndex - 1,
      pageSize: old.pageSize,
    }));
  };

  return (
    <div className="crypto-transactions__table-wrapper">
      <table className="crypto-transactions__table-wrapper">
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const isSelected = !!selectedRow && selectedRow === Number(row.id);
            return (
              <tr
                key={row.id}
                className={isSelected ? "selected-row" : ""}
                onClick={() =>
                  handleRowClick(Number(row.id), row.original as PriceAndAmount)
                }
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid var(--primary-white)",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          disabled={pagination.pageIndex === 0}
          className="assets__button"
        >
          Previous
        </button>
        <span>
          Page {pagination.pageIndex + 1} of{" "}
          {Math.ceil(
            (
              selectedCryptoTransactionHistory?.priceAndAmount as PriceAndAmount[]
            ).length / pagination.pageSize
          )}
        </span>
        <button
          onClick={handleNextPage}
          disabled={
            pagination.pageIndex ===
            Math.ceil(
              (
                selectedCryptoTransactionHistory?.priceAndAmount as PriceAndAmount[]
              ).length / pagination.pageSize
            ) -
              1
          }
          className="assets__button"
        >
          Next
        </button>
      </div>
      <section className="transaction-form__button-wrapper">
        <button
          type="button"
          onClick={() =>
            removePortfolio(
              state.walletId,
              selectedCryptoTransactionHistory?.nameAndSymbol?.name as string,
              getWalletData,
              getAccountBalance,
              setShowCryptoTransactionsModal
            )
          }
          className="transaction-form__button-container transaction-table__button-container--space"
        >
          Remove all <br /> transactions for this crypto <Bin />
        </button>
        <div className="transaction-table__gradient-border" />
      </section>
    </div>
  );
};
