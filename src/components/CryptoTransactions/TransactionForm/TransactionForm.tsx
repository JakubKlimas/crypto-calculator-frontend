import { useEffect } from "react";
import { FieldApi, useForm } from "@tanstack/react-form";

import "../../AddCryptoForm/AddCryptoForm.css";
import "./TransactionForm.styles.css";
import { FormValues, TransactionFormProps } from "./TransactionForm.types";

import { useWalletCryptoAssets } from "../../../hooks/useWalletCryptoAssets";
import Bin from "../../../assets/bin.svg?react";

import { removeAsset } from "../../../api/removeAsset/removeAsset";
import { updateAsset } from "../../../api/updateAsset/updateAsset";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <div className="crypto-transactions__error-container">
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </div>
  );
}

export const TransactionForm = ({
  selectedRowData,
  setShowCryptoTransactionsModal,
  setSelectedRowData,
}: TransactionFormProps) => {
  const { getWalletData, getAccountBalance } = useWalletCryptoAssets();

  const form = useForm<FormValues>({
    defaultValues: {
      amount: "",
      buyPrice: "",
    },
    onSubmit: async ({ value }) => {
      const body = {
        id: selectedRowData?.id,
        amount: Number(value.amount),
        price: Number(value.buyPrice),
      };

      updateAsset(
        body,
        getWalletData,
        getAccountBalance,
        setShowCryptoTransactionsModal
      );
    },
  });

  useEffect(() => {
    if (selectedRowData) {
      form.setFieldValue("amount", selectedRowData.amount.toString() || "0");
      form.setFieldValue("buyPrice", selectedRowData.price.toString() || "0");
    }
  }, [selectedRowData, form]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div>
        <form.Field
          name="amount"
          defaultValue={selectedRowData?.amount.toString()}
          validators={{
            onChange: ({ value }) => {
              if (!value) {
                return "An amount is required";
              }
              if (isNaN(Number(value))) {
                return "Amount must be a number";
              }
              if (Number(value) <= 0) {
                return "Amount must be greater than 0";
              }
              return undefined;
            },
            onChangeAsyncDebounceMs: 500,
          }}
          children={(field) => (
            <div className="add-crypto-form__field-container">
              <label htmlFor={field.name} className="add-crypto-form__label">
                Amount:
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value || ""}
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
          name="buyPrice"
          defaultValue={selectedRowData?.price.toString()}
          validators={{
            onChange: ({ value }) => {
              if (!value) {
                return "A buy price is required";
              }
              if (isNaN(Number(value))) {
                return "Buy price must be a number";
              }
              if (Number(value) <= 0) {
                return "Buy price must be greater than 0";
              }
              return undefined;
            },
            onChangeAsyncDebounceMs: 500,
          }}
          children={(field) => (
            <div className="add-crypto-form__field-container">
              <label htmlFor={field.name} className="add-crypto-form__label">
                Buy price:
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value || ""}
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
              onClick={() => setSelectedRowData(null)}
              className="add-crypto-form__button"
            >
              Go back
            </button>
          </div>
        )}
      />
      <section className="transaction-form__button-wrapper">
        <button
          type="button"
          onClick={() =>
            removeAsset(
              selectedRowData?.id as string,
              getWalletData,
              getAccountBalance,
              setShowCryptoTransactionsModal
            )
          }
          className="transaction-form__button-container"
        >
          Remove this asset <Bin />
        </button>
        <div className="remove-asset__gradient-border" />
      </section>
    </form>
  );
};
