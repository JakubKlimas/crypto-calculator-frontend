import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./main.css";
import App from "./App.tsx";

import { WalletCryptoAssetsContextController } from "./context/WalletCryptoAssetsContextController/WalletCryptoAssetsContextController.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WalletCryptoAssetsContextController>
      <App />
    </WalletCryptoAssetsContextController>
  </StrictMode>
);
