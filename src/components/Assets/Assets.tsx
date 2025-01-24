import { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import "./Assets.css";
import { AssetsProps } from "./Assets.types";
import { CryptoAsset } from "../../context/WalletCryptoAssetsContextController/WalletCryptoAssetsContextController.types";

import { useWalletCryptoAssets } from "../../hooks/useWalletCryptoAssets";
import { fixSum } from "../../utils/math";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

export const Assets = ({
  setSelectedRowData,
  selectedRowData,
}: AssetsProps) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const { state } = useWalletCryptoAssets();

  const paginatedData = useMemo(() => {
    const startIndex = pagination.pageIndex * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return state.assets.slice(startIndex, endIndex);
  }, [pagination, state.assets]);

  const columns = useMemo<ColumnDef<CryptoAsset, any>[]>(() => {
    return [
      {
        accessorKey: "nameAndSymbol",
        cell: (info) => {
          const { name, symbol } =
            info.getValue() as CryptoAsset["nameAndSymbol"];
          return (
            <div className="assets__name-container">
              <div className="assets__img-container">
                <img
                  src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
                  className="assets__img"
                  alt={`${name} logo`}
                />
              </div>
              <div className="assets__name-wrapper">
                <span className="assets__name">{name}</span>
                <span className="assets__symbol"> {symbol}</span>
              </div>
            </div>
          );
        },
        header: "Name and Symbol",
        enableSorting: false,
      },
      {
        accessorKey: "profitOrLoss",
        header: () => (
          <span className="crypto-table--pointer">Profit or Loss</span>
        ),
        cell: (info) => (
          <span
            className={
              Number(info.getValue().replace("$", "")) > 0
                ? "crypto-table__value--green"
                : "crypto-table__value--red"
            }
          >
            {fixSum(info.getValue())}
          </span>
        ),
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "priceAndAmount",
        cell: (info) => {
          const { totalAmount, totalPurchasePrice } = info.row
            .original as CryptoAsset;
          return (
            <div className="assets__value-wrapper">
              <div className="assets__value-container">
                <span className="assets__name">
                  {parseFloat(totalAmount.toFixed(7).toString())}
                </span>
                <span className="assets__symbol">
                  {fixSum(totalPurchasePrice)}
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
    data: paginatedData,
    columns,
    pageCount: Math.ceil(state.assets.length / pagination.pageSize),
    state: { pagination },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleRowClick = (rowId: number, rowData: CryptoAsset) => {
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

  useEffect(() => {
    const updatedAsset = state.assets.find(
      (asset) =>
        asset.nameAndSymbol.name === selectedRowData?.nameAndSymbol.name
    );

    setSelectedRowData(updatedAsset as CryptoAsset);
  }, [state]);

  return (
    <section className="assets__container">
      <h3 className="assets__header">Assets</h3>
      <p className="assets__paragraph">
        {"(Click on asset to display more info)"}
      </p>
      {state.assets.length ? (
        <>
          <table className="assets__wrapper">
            <tbody>
              {table.getRowModel().rows.map((row) => {
                const isSelected =
                  !!selectedRow && selectedRow === Number(row.id);
                return (
                  <tr
                    key={row.id}
                    className={isSelected ? "selected-row" : ""}
                    onClick={() =>
                      handleRowClick(
                        Number(row.id),
                        row.original as unknown as CryptoAsset
                      )
                    }
                    style={{
                      cursor: "pointer",
                      border: isSelected ? "2px solid blue" : "none",
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
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
              {Math.ceil(state.assets.length / pagination.pageSize)}
            </span>
            <button
              onClick={handleNextPage}
              disabled={
                pagination.pageIndex ===
                Math.ceil(state.assets.length / pagination.pageSize) - 1
              }
              className="assets__button"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};
