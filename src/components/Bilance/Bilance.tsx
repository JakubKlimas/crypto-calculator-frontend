import "./Bilance.css";
import { BilanceProps } from "./Bilance.types";

import ArrowDown from "../../assets/ArrowDown.svg?react";
import ArrowUp from "../../assets/ArrowUp.svg?react";

import { useWalletCryptoAssets } from "../../hooks/useWalletCryptoAssets";
import { fixSum } from "../../utils/math";

export const Bilance = ({
  isProfit,
  selectedRowData,
  setShowCryptoTransactionsModal,
}: BilanceProps) => {
  const { getSelectedCryptoTransactions } = useWalletCryptoAssets();

  return (
    <section className="bilance__main-container">
      <div className="bilance__heading-container">
        <h3 className="bialnce__title">Bilance</h3>
        {selectedRowData && (
          <button
            onClick={() => {
              setShowCryptoTransactionsModal(true);
              getSelectedCryptoTransactions(
                selectedRowData.nameAndSymbol.symbol
              );
            }}
            className="bilance__modal-button"
          >
            <img src="../../../cogwheel.png" className="bilance__icon" />
          </button>
        )}
      </div>
      <section className="bilance__container">
        {selectedRowData ? (
          <>
            <div className="bilance__comparison-wrapper">
              <div className="bilance__img-container">
                {isProfit ? (
                  <ArrowUp className="bilance__arrow--up" />
                ) : (
                  <ArrowDown className="bilance__arrow--up" />
                )}
              </div>
              <div className="bilance__sum-wrapper">
                <p
                  className={`bilance__sum ${
                    isProfit ? "bilance__sum--green" : "bilance__sum--red"
                  }`}
                  title={fixSum(selectedRowData?.profitOrLoss)}
                >
                  {fixSum(selectedRowData?.profitOrLoss)}
                </p>
                <p className="bilance__text">{isProfit ? "Income" : "Loss"}</p>
              </div>
            </div>
            <hr className="bilance__divider" />
            <div className="bilance__purchase-price-wrapper">
              <div className="bilance__img-container">$</div>
              <div>
                <p
                  className="bilance__sum"
                  title={fixSum(selectedRowData?.totalPurchasePrice)}
                >
                  {fixSum(selectedRowData?.totalPurchasePrice)}
                </p>
                <p className="bilance__text">Total purchase price</p>
              </div>
            </div>{" "}
          </>
        ) : (
          <p className="bilance__info">
            Select asset from Assets table to display more info
          </p>
        )}
      </section>
    </section>
  );
};
