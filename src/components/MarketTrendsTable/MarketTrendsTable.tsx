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

import "./MarketTrendsTable.css";
import { DataBySymols } from "./MarketTrendsTable.types";

import { getCryptoDataCollection } from "../../api/getCryptoDataCollection/getCryptoDataCollection";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

export const MarketTrendsTable = () => {
  const [tableData, setTableData] = useState<DataBySymols[]>([]);
  const cryptoArr = ["BTC", "ETH", "DOGE", "SOL", "ADA", "BNB"];
  const roundNum = (num: number) => Math.round(num * 100) / 100;

  useEffect(() => {
    getCryptoDataCollection(cryptoArr, setTableData);
  }, []);

  const columns = useMemo<ColumnDef<DataBySymols, any>[]>(
    () => [
      {
        accessorKey: "symbol",
        header: () => <span>Symbol</span>,
        cell: (info) => (
          <span className="crypto-table__symbol">{info.getValue()}</span>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "price",
        header: () => <span className="crypto-table--pointer">Last Price</span>,
        cell: (info) => (
          <span className=" crypto-table__last-price">
            {roundNum(info.getValue())}
          </span>
        ),
        accessorFn: (row) => row.price,
        enableSorting: false,
      },
      {
        accessorKey: "volume",
        header: () => <span>Volume</span>,
        cell: (info) => (
          <span className=" crypto-table__name">
            {roundNum(info.getValue())}
          </span>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "askPrice",
        header: () => <span className="crypto-table--pointer">Ask Price</span>,
        cell: (info) => (
          <span className=" crypto-table__last-price">
            {roundNum(info.getValue())}
          </span>
        ),
        enableSorting: true,
      },
      {
        accessorKey: "priceChange",
        header: () => <span className="crypto-table--pointer">24h Change</span>,
        cell: (info) => (
          <span
            className={
              info.getValue() > 0
                ? "crypto-table__value--green"
                : "crypto-table__value--red"
            }
          >
            {roundNum(info.getValue())}
            {info.getValue() > 0 ? (
              <span className="crypto-table__marker--profit">{"▲"}</span>
            ) : (
              <span className="crypto-table__marker--loss">{"▼"}</span>
            )}
          </span>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "priceChangePercent",
        header: () => (
          <span className="crypto-table--pointer">Price Change</span>
        ),
        cell: (info) => (
          <span
            className={
              Number(info.getValue().replace("$", "")) > 0
                ? "crypto-table__value--green"
                : "crypto-table__value--red"
            }
          >
            {roundNum(info.getValue())}
          </span>
        ),
        meta: { filterVariant: "select" },
        enableSorting: false,
      },
    ],
    []
  );

  const table = useReactTable({
    data: tableData || [],
    columns,
    filterFns: {},
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <section className="crypto-table__container">
      <h3 className="crypto-table__header">Market Trends</h3>
      <table className="crypto-table__wrapper">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
