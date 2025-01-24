import { useEffect, useLayoutEffect, useState } from "react";

import "./Accounts.css";
import { AccountDetail } from "./Accounts.types";
import { WalletCryptoAssetsActions } from "../../context/WalletCryptoAssetsContextController/WalletCryptoAssetsContextController.types";

import Avatar from "../../assets/Emoji.svg?react";
import AvatarFemale from "../../assets/AvatarFemale.svg?react";
import Plus from "../../assets/Plus.svg?react";

import { randomIntFromInterval } from "../../utils/math";
import { useWalletCryptoAssets } from "../../hooks/useWalletCryptoAssets";
import { addWallet } from "../../api/addWallet/addWallet";
import { getWalletsData } from "../../api/getWalletsData/getWalletsData";

export const Accounts = () => {
  const [isMaximumAccounts, setIsMaximumAccounts] = useState(false);
  const [accountsNumber, setAccountsNumber] = useState(1);
  const [accountDetails, setAccountDetails] = useState<AccountDetail[]>([]);
  const [activeWallet, setActiveWallet] = useState<AccountDetail | null>(null);
  const [profitOrLossSum, setProfitOrLossSum] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);

  const { dispatch, state } = useWalletCryptoAssets();

  const getWallets = async () => {
    const data = await getWalletsData();

    setAccountDetails(data);
    setAccountsNumber(data.length);
    setActiveWallet(data[0]);
  };

  useEffect(() => {
    dispatch({
      payload: activeWallet?.id,
      type: WalletCryptoAssetsActions.SET_WALLET_ID,
    });
  }, [activeWallet]);

  useEffect(() => {
    const profitOrLossArr = state.assets.map((asset) => asset.profitOrLoss);
    const profitOrLossSum = profitOrLossArr.reduce(
      (acc, val) => acc + Number(val.replace("$", "")),
      0
    );

    setProfitOrLossSum(profitOrLossSum);
    setAccountBalance(Number(state.accountBalance.replace("$", "")));
  }, [state.accountBalance, state.assets]);

  useLayoutEffect(() => {
    if (accountsNumber === 3) {
      setIsMaximumAccounts(true);
    }
  }, [accountsNumber]);

  useLayoutEffect(() => {
    getWallets();
  }, []);

  return (
    <section className={"acconuts__container"}>
      <h3>Quick wallet change</h3>
      <section className={"accounts__avatar-container"}>
        {accountDetails && accountDetails.length ? (
          accountDetails.map((account) => (
            <section className="wallet__wrapper" key={account.name}>
              <button
                className={"avatar__wrapper"}
                key={randomIntFromInterval(0, 1000)}
                onClick={() => setActiveWallet(account)}
              >
                {account.avatarType === 1 ? <Avatar /> : <AvatarFemale />}
              </button>
              {activeWallet?.id === account.id && (
                <div className="wallet-gradient-border" />
              )}
            </section>
          ))
        ) : (
          <></>
        )}
        {!isMaximumAccounts && (
          <button
            className={"avatar__wrapper--plus"}
            onClick={() =>
              addWallet(accountsNumber, setAccountDetails, setAccountsNumber)
            }
          >
            <Plus />
          </button>
        )}
      </section>
      <h4 className={"accounts--space"}>
        Amount: <p className="accounts__currency">$</p>
        <p className="accounts__amount--big">{accountBalance.toFixed(2)}</p>
      </h4>
      <h4>
        Profit: <p className="accounts__currency">$</p>
        <p className="accounts__amount--big">{profitOrLossSum.toFixed(2)}</p>
      </h4>
    </section>
  );
};
