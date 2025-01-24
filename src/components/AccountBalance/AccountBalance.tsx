import "./AccountBalance.css";
import { AccountBalanceProps } from "./AccountBalance.types";

import { useWalletCryptoAssets } from "../../hooks/useWalletCryptoAssets";

export const AccountBalance = ({ accountCryptoData }: AccountBalanceProps) => {
  const { state } = useWalletCryptoAssets();

  if (!accountCryptoData) {
    return (
      <p className="account-balance__info">
        Select asset from Assets table to display more info
      </p>
    );
  }

  const isBiggerThanZero = Number(state.accountBalance.replace("$", "")) > 0;

  return (
    <section className="account-balance__main-container">
      <h3 className="account-balance__title">Account Balance</h3>
      <section className="account-balance__container">
        {isBiggerThanZero && (
          <img
            src={"../../../public/confetti.gif"}
            className="account-balance__gif"
          />
        )}
        <div
          className={
            isBiggerThanZero ? "account-balance__pragraph-container" : ""
          }
        >
          <p
            className={`account-balance__paragraph ${
              isBiggerThanZero
                ? "account-balance__paragraph--green"
                : "account-balance__paragraph--red"
            }`}
          >
            {state.accountBalance}
          </p>
        </div>
      </section>
    </section>
  );
};
