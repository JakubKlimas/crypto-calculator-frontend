import { useEffect, useMemo, useState } from "react";
import { AxisOptions, Chart } from "react-charts";

import "./CardChart.css";
import { IntervalsEmum, Price } from "../MainChart/MainChart.type";
import { CardChartProps } from "./CardChart.types";

import ArrowIcon from "../../assets/ArrowIcon.svg?react";
import LossArrow from "../../assets/LossArrow.svg?react";
import ProfitArrow from "../../assets/ProfitArrow.svg?react";

import { useCryptoData } from "../../hooks/useCryptoData";
import { getCryptoChartData } from "../../api/getCryptoChartData/getCryptoChartData";

export const CardChart = ({ cryptoName, cryptoShortName }: CardChartProps) => {
  const [chartData, setChartData] = useState<Price[]>([]);
  const { cryptoData } = useCryptoData(cryptoName, cryptoShortName);

  useEffect(() => {
    getCryptoChartData(cryptoShortName, setChartData, IntervalsEmum.ONE_DAY);
  }, []);

  const yAxisBounds = useMemo(() => {
    if (!chartData.length) {
      return { min: 0, max: 0, mid: 0 };
    }

    const prices = chartData.map((d) => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const mid = (min + max) / 2;

    return { min, max, mid };
  }, [chartData]);

  const primaryAxis = useMemo(
    (): AxisOptions<Price> => ({
      getValue: (datum) => datum.date,
      show: false,
      showGrid: false,
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<Price>[] => [
      {
        getValue: (datum) => datum.price,
        min: yAxisBounds.min,
        max: yAxisBounds.max,
        showGrid: false,
        show: false,
        //@ts-ignore
        tickValues: [yAxisBounds.min, yAxisBounds.mid, yAxisBounds.max],
      },
    ],
    [yAxisBounds]
  );

  const isLoss = Number(cryptoData?.priceChangePercent) < 0;

  return (
    <section className={"card-chart__container"}>
      <section className={"card-chart__information-container"}>
        <div className={"card-chart__information-wrapper--absolute"}>
          <img
            src={cryptoData?.icon}
            alt={cryptoData?.symbol}
            width={50}
            height={50}
          />
          <div className={"card-chart__wrapper-flex"}>
            <div className={"card-chart__information-main-wrapper"}>
              <div className={"card-chart__information-wrapper"}>
                {cryptoName.replace("USDT", "")}
                <ArrowIcon />
                USDT
              </div>
              <p className={"card-chart__price-info"}>
                {Number(cryptoData?.price).toFixed(2)}
              </p>
            </div>
            <div className={"card-chart__percentages-container"}>
              {isLoss ? <LossArrow /> : <ProfitArrow />}
              <p
                className={`card-chart__percentages ${
                  isLoss
                    ? "card-chart__percentages--red"
                    : "card-chart__percentages--green"
                }`}
              >
                {cryptoData?.priceChangePercent}
              </p>
            </div>
          </div>
        </div>
      </section>
      <div
        style={{ width: "244px", height: "100px" }}
        className={"card-chart__wrapper"}
      >
        {chartData.length > 0 && (
          <Chart
            options={{
              data: [
                {
                  label: "Price",
                  data: chartData,
                },
              ],
              primaryAxis,
              secondaryAxes,
              dark: true,
              defaultColors: [isLoss ? "#E323FF" : "#4DA1FF"],
              getSeriesStyle: () => ({
                strokeWidth: 4,
              }),
            }}
          />
        )}
      </div>
      <div className="mask" />
    </section>
  );
};
