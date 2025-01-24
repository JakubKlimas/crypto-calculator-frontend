import { removeWallet } from "../../api/removeWallet/removeWallet";
import { useWalletCryptoAssets } from "../../hooks/useWalletCryptoAssets";

import "./RemoveWallet.css";

export const RemoveWallet = () => {
  const { state } = useWalletCryptoAssets();

  return (
    <section className="remove-wallet__container">
      <h3>Remove wallet</h3>
      <section className={"remove-wallet__wrapper"}>
        <button
          onClick={() => removeWallet(state.walletId)}
          className="remove-wallet__button"
        >
          Remove
        </button>
        <div className="remove-wallet__gradient-border" />
      </section>
    </section>
  );
};
