import { Dispatch, SetStateAction } from "react";

import "./AddCrypto.css";

export const AddCrypto = ({
  setAddCryptoModal,
}: {
  setAddCryptoModal: Dispatch<SetStateAction<boolean>>;
}) => (
  <section className={"add-crypto__container"}>
    <h3>Add crypto</h3>
    <section className={"add-crypto__wrapper"}>
      <button
        onClick={() => setAddCryptoModal(true)}
        className="add-crypto__button"
      >
        Add Crypto
      </button>
      <div className="gradient-border" />
    </section>
  </section>
);
