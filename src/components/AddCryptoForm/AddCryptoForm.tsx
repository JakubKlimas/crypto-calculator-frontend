import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import type { FieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";

import "./AddCryptoForm.css";
import { AddCryptoFormProps, CryptoData } from "./AddCryptoFrom.types";

import { useWalletCryptoAssets } from "../../hooks/useWalletCryptoAssets";
import { getCryptoDataByName } from "../../api/getCryptoDataByName/getCryptoDataByName";
import { addAssetToWallet } from "../../api/addAssetToWallet/addAssetToWallet";

type FormValues = {
  stockMarket: string;
  name: string;
  amount: string;
  buyPrice: string;
};

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <div className="add-crypto-from__error-container">
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </div>
  );
}

export const AddCryptoForm = ({
  showAddCryptoModal,
  setAddCryptoModal,
}: AddCryptoFormProps) => {
  const { state, getWalletData, getAccountBalance } = useWalletCryptoAssets();
  const form = useForm<FormValues>({
    defaultValues: {
      stockMarket: "",
      name: "",
      amount: "",
      buyPrice: "",
    },
    onSubmit: async ({ value }) => {
      const cryptoDataByName = await getCryptoDataByName(value.name);

      if (cryptoDataByName) {
        const cryptoData: CryptoData = cryptoDataByName;
        const body = {
          walletId: state.walletId,
          name: value.name,
          market: value.stockMarket,
          symbol: cryptoData.data.symbol,
          price: Number(value.buyPrice),
          amount: Number(value.amount),
          currency: "USDT",
        };

        const status = await addAssetToWallet(
          getAccountBalance,
          getWalletData,
          body
        );

        status && form.reset();
      } else {
        toast.error("You can't add this crypto, check if symbol is correct");
      }
    },
  });

  const handleCloseModal = (e: React.MouseEvent) => {
    if (
      (e.target as Element).classList.contains("add-crypto-form__container")
    ) {
      setAddCryptoModal(false);
    }
  };

  if (!showAddCryptoModal) return null;

  return (
    <>
      {createPortal(
        <div className="add-crypto-form__container" onClick={handleCloseModal}>
          <section className="add-crypto-form__wrapper">
            <h3 className="add-crypto-form__title">Add Crypto</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <div>
                <form.Field
                  name="stockMarket"
                  validators={{
                    onChange: ({ value }) =>
                      !value ? "A amount is required" : undefined,
                    onChangeAsyncDebounceMs: 500,
                  }}
                  children={(field) => (
                    <div className="add-crypto-form__field-container">
                      <label
                        htmlFor={field.name}
                        className="add-crypto-form__label"
                      >
                        Select stock market:
                      </label>
                      <select
                        id="stockMarket"
                        style={{
                          borderColor: field.getMeta().errors.length
                            ? "var(--primary-red)"
                            : "var(--primary-black)",
                        }}
                        className="add-crypto-form__select"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      >
                        <option value="" disabled>
                          Select a stock market
                        </option>
                        <option value="binance">Binance</option>
                        <option value="other">Other stock market</option>
                      </select>
                    </div>
                  )}
                />
                <form.Field
                  name="name"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) {
                        return "A name is required";
                      } else if (value.trim().length === 0) {
                        return "Name must not be empty";
                      }
                      return undefined;
                    },
                    onChangeAsyncDebounceMs: 500,
                  }}
                  children={(field) => (
                    <div className="add-crypto-form__field-container">
                      <label
                        htmlFor={field.name}
                        className="add-crypto-form__label"
                      >
                        Name:
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="text"
                        className="add-crypto-form__input"
                      />
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
                <form.Field
                  name="amount"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) {
                        return "An amount is required";
                      }
                      if (isNaN(Number(value))) {
                        return "Amount must be number";
                      }
                      if (Number(value) < 0) {
                        return "Amount must be greater than 0";
                      }
                      return undefined;
                    },
                    onChangeAsyncDebounceMs: 500,
                  }}
                  children={(field) => (
                    <div className="add-crypto-form__field-container">
                      <label
                        htmlFor={field.name}
                        className="add-crypto-form__label"
                      >
                        Amount:
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="text"
                        className="add-crypto-form__input"
                      />
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
              </div>
              <div>
                <form.Field
                  name="buyPrice"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) {
                        return "A buy price is required";
                      }
                      if (isNaN(Number(value))) {
                        return "Amount must be number";
                      }
                      if (Number(value) < 0) {
                        return "Buy price must be greater than 0";
                      }
                      return undefined;
                    },
                    onChangeAsyncDebounceMs: 500,
                  }}
                  children={(field) => (
                    <div className="add-crypto-form__field-container">
                      <label
                        htmlFor={field.name}
                        className="add-crypto-form__label"
                      >
                        Buy Price:
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="text"
                        className="add-crypto-form__input"
                      />
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
              </div>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit]) => (
                  <div className="add-crypto-form__button-container">
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="add-crypto-form__button"
                    >
                      Submit
                    </button>
                    <button
                      type="reset"
                      onClick={() => form.reset()}
                      className="add-crypto-form__button"
                    >
                      Reset
                    </button>
                  </div>
                )}
              />
            </form>
          </section>
        </div>,
        document.body
      )}
    </>
  );
};
