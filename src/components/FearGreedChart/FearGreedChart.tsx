import { useEffect, useState, useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";

import "./FearGreedChart.css";

import { getFearAndGreedData } from "../../api/getFearAndGreedData/getFearAndGreedData";

export const FearGreedChart = () => {
  const [fearGreedData, setFearGreedData] = useState<any>(null);

  useEffect(() => {
    getFearAndGreedData(setFearGreedData);
  }, []);

  const getBarColor = (value: number) => {
    let red = 255;
    let green = 0;
    let blue = 0;

    if (value <= 40) {
      red = 255;
      green = Math.floor((value / 40) * 255);
    } else if (value <= 60) {
      red = Math.floor(255 - ((value - 40) / 20) * 100);
      green = Math.floor(((value - 40) / 20) * 255);
    } else {
      red = 0;
      green = 255;
    }

    return `rgb(${red}, ${green}, ${blue})`;
  };

  const data = useMemo(() => {
    if (!fearGreedData?.value) return [];

    const data = Array.from({ length: fearGreedData.value }, (_, i) => ({
      primary: i,
      secondary: i,
    }));

    const data2 = Array.from({ length: fearGreedData.value }, (_, i) => ({
      primary: fearGreedData.value + i,
      secondary: fearGreedData.value - i,
    }));

    return [...data, ...data2];
  }, [fearGreedData]);

  const chartData = fearGreedData
    ? [
        {
          label: "Fear & Greed",
          data,
        },
      ]
    : [];

  const primaryAxis = useMemo<AxisOptions<any>>(
    () => ({
      getValue: (datum) => datum.primary,
      showGrid: false,
    }),
    []
  );

  const secondaryAxes = useMemo<AxisOptions<any>[]>(
    () => [
      {
        getValue: (datum) => datum.secondary,
        stacked: true,
        elementType: "area",
        showGrid: false,
      },
    ],
    []
  );

  const barColor = useMemo(
    () => getBarColor(fearGreedData?.value ?? 0),
    [fearGreedData]
  );

  return (
    <section className="fear-greed-chart__container">
      <h3 className="fear-greed-chart__title">Fear & Greed</h3>
      <div className="fear-greed-chart__wrapper">
        {fearGreedData ? (
          <Chart
            options={{
              data: chartData,
              primaryAxis,
              secondaryAxes,
              dark: true,
              getSeriesStyle: () => ({
                color: barColor,
              }),
            }}
          />
        ) : (
          <p style={{ textAlign: "center" }}>No data do display</p>
        )}
      </div>
    </section>
  );
};
