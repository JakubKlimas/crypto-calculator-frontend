import { useEffect, useMemo, useState } from "react";
import { AxisOptions, Chart } from "react-charts";

import "./MainChart.css";
import { Price, IntervalsEmum } from "./MainChart.type";

import { CryptoSelect } from "../CryptoSelect/CryptoSelect";
import { IntervalSelect } from "../IntervalSelect/IntervalSelect";

import { getCryptoChartData } from "../../api/getCryptoChartData/getCryptoChartData";

export const MainChart = () => {
  const [selectedInterval, setSelectedInterval] = useState(
    IntervalsEmum.ONE_DAY
  );
  const [chartData, setChartData] = useState<Price[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");

  const intervals = [
    IntervalsEmum.ONE_DAY,
    IntervalsEmum.ONE_WEEK,
    IntervalsEmum.ONE_MONTH,
  ];

  useEffect(() => {
    getCryptoChartData(selectedCrypto, setChartData, selectedInterval);
  }, [selectedInterval, selectedCrypto]);

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
      getValue: (datum) => {
        const date = new Date(datum.date);
        return date;
      },
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
        //@ts-ignore
        tickValues: [yAxisBounds.min, yAxisBounds.mid, yAxisBounds.max],
      },
    ],
    [yAxisBounds]
  );

  return (
    <section className={"chart__wrapper"}>
      <section className="selects__wrapper">
        <CryptoSelect
          setSelectedCrypto={setSelectedCrypto}
          selectedCrypto={selectedCrypto}
        />
        <div className={"interval-select__wrapper"}>
          {intervals.map((interval) => (
            <IntervalSelect
              key={interval}
              intervalName={interval}
              isActive={selectedInterval === interval}
              onClick={() => setSelectedInterval(interval)}
            />
          ))}
        </div>
      </section>
      <section
        style={{ width: "100%", height: "80%" }}
        className={"chart__container"}
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
              defaultColors: ["#4DA1FF"],
              getSeriesStyle: () => ({
                strokeWidth: 4,
              }),
            }}
          />
        )}
      </section>
    </section>
  );
};
