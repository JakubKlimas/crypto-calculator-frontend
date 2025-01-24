import Decorator from "../../assets/Decorator.svg?react";

import "./Banner.css";

export const Banner = () => {
  return (
    <section className="banner__container">
      <div className="banner__text-wrapper">
        <h2>ETHEREUM 2.0</h2>
        <h1>
          Your Gateway <br />
          into Blockchain
        </h1>
        <p>
          Paronia is a blockchain platform.
          <br />
          We make blockchain accessible.
        </p>
        <button
          className="banner__button"
          onClick={() => {
            window.location.href =
              "https://www.kraken.com/pl/learn/what-is-ethereum-eth";
          }}
        >
          Learn more.
        </button>
      </div>
      <Decorator className="banner__decorator" />
    </section>
  );
};
