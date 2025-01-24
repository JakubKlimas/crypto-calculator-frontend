import { useState } from "react";

import { Accounts } from "../components/Accounts/Accounts";
import { AddCrypto } from "../components/AddCrypto/AddCrypto";
import { Banner } from "../components/Banner/Banner";
import { CardChart } from "../components/CardChart/CardChart";
import { CryptoCarousel } from "../components/CryptoCarousel/CryptoCarousel";
import { MainChart } from "../components/MainChart/MainChart";
import { MarketTrendsTable } from "../components/MarketTrendsTable/MarketTrendsTable";
import { AddCryptoForm } from "../components/AddCryptoForm/AddCryptoForm";
import { Assets } from "../components/Assets/Assets";
import { Bilance } from "../components/Bilance/Bilance";
import { AccountBalance } from "../components/AccountBalance/AccountBalance";
import { FearGreedChart } from "../components/FearGreedChart/FearGreedChart";
import { RemoveWallet } from "../components/RemoveWallet/RemoveWallet";
import { CryptoTransactions } from "../components/CryptoTransactions/CryptoTransactions";

import { useWalletCryptoAssets } from "../hooks/useWalletCryptoAssets";

import "./Dashboard.css";

import mockData from "../data/mock-asset.json";
import { CryptoAsset } from "../context/WalletCryptoAssetsContextController/WalletCryptoAssetsContextController.types";

export const Dashboard = () => {
  const [showAddCryptoModal, setAddCryptoModal] = useState(false);
  const [showCryptoTransactionsModal, setShowCryptoTransactionsModal] =
    useState(false);
  const [selectedRowData, setSelectedRowData] = useState<CryptoAsset | null>(
    null
  );
  const { state } = useWalletCryptoAssets();

  return (
    <section className={"dashboard__container"}>
      <div className={"dashboard__main-wrapper"}>
        <section
          className={"dashboard__wrapper dashboard__wrapper--margin-top"}
        >
          <Banner />
          <MainChart />
        </section>

        <section className={"dashboard__wrapper"}>
          <CryptoCarousel>
            {state.top10Crypto.map((coin) => (
              <CardChart
                cryptoName={coin.toUpperCase() + "USDT"}
                cryptoShortName={coin}
              />
            ))}
          </CryptoCarousel>
        </section>
        <section className={"dashboard__wrapper"}>
          <Accounts />
          <MarketTrendsTable />
          <AddCrypto setAddCryptoModal={setAddCryptoModal} />
        </section>
        <section
          className={
            "dashboard__wrapper  dashboard__wrapper--margin-top-small dashboard__wrapper--margin-bottom"
          }
        >
          <Assets
            setSelectedRowData={setSelectedRowData}
            selectedRowData={selectedRowData}
          />
          <div className="dashboard__card-wrapper">
            <Bilance
              isProfit={
                Number(selectedRowData?.profitOrLoss.replace("$", "")) > 0
              }
              selectedRowData={selectedRowData}
              setShowCryptoTransactionsModal={setShowCryptoTransactionsModal}
            />
            <AccountBalance accountCryptoData={mockData} />
          </div>
          <div className="dashboard__fear-and-greed-container">
            <FearGreedChart />
            <RemoveWallet />
          </div>
        </section>
        {showAddCryptoModal && (
          <AddCryptoForm
            setAddCryptoModal={setAddCryptoModal}
            showAddCryptoModal={showAddCryptoModal}
          />
        )}
        {showCryptoTransactionsModal && (
          <CryptoTransactions
            setShowCryptoTransactionsModal={setShowCryptoTransactionsModal}
            showCryptoTransactionsModal={showCryptoTransactionsModal}
          />
        )}
      </div>
    </section>
  );
};
