import { useState, useEffect, useRef } from "react";

import "./CryptoSelect.css";
import { CryptoSelectProps } from "./CryptoSelect.types";

import { useWalletCryptoAssets } from "../../hooks/useWalletCryptoAssets";

export const CryptoSelect = ({
  setSelectedCrypto,
  selectedCrypto,
}: CryptoSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<string[]>([]);

  const { state } = useWalletCryptoAssets();
  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (currency: string) => {
    setSelectedCrypto(currency);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const symbolsArr = state.assets.map((asset) => asset.nameAndSymbol.symbol);

    setItems(symbolsArr);
  }, [state.assets]);

  return (
    <section
      ref={selectRef}
      className={`custom-select ${isOpen && "custom-select__border"}`}
    >
      <div
        className={`selected ${isOpen && "custom-select__border"}`}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <div className={"custom-select__wrapper"}>
          {selectedCrypto}
          <img
            src={
              isOpen
                ? "../../../public/down-arrow.png"
                : "../../../public/up-arrow.png"
            }
            width={16}
            height={16}
          />
        </div>
      </div>

      <section className={`${isOpen ? "options--open" : "options--closed"}`}>
        {items.map((item) => (
          <div className={"option"} onClick={() => handleChange(item)}>
            {item}
          </div>
        ))}
      </section>
    </section>
  );
};
