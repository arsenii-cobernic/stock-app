import { useEffect } from "react";
import styles from "./Chart.module.scss";
import "anychart";
import { RequestParameters } from "../../App";
import Select from "../Inputs/Select/Select";
import Datepicker from "../Inputs/Datepicker/Datepicker";

import { ReactComponent as LoadingSpin } from "../../assets/loading-cube.svg";

export interface Props {
  loading: boolean;
  chartData: string;
  requestParameters: RequestParameters;
  setRequestParameters: (reqParams: RequestParameters) => void;
}

const Chart = ({
  loading,
  chartData,
  requestParameters,
  setRequestParameters,
}: Props) => {
  useEffect(() => {
    const chart = anychart.stock();

    const dataTable = anychart.data.table();
    dataTable.addData(chartData, undefined, { ignoreFirstRow: true });

    const mapping = dataTable.mapAs({
      open: 1,
      high: 2,
      low: 3,
      close: 4,
    });

    const plot = chart.plot(0);

    plot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);

    const series = plot.candlestick(mapping).name("NYSE");

    series.legendItem().iconType("rising-falling");

    chart.scroller().candlestick(mapping);

    chart.title("New York Stock Exchange Chart");
    chart.container("chart-container");
    chart.draw();

    // Clean up the chart when the component unmounts
    return () => chart.dispose();
  }, [chartData]);

  return (
    <div className={styles.container}>
      <div className={styles.chart_placeholder}>
        {loading ? (
          <LoadingSpin />
        ) : (
          <div id="chart-container" className={styles.chart_container}></div>
        )}
      </div>

      <div className={styles.chart_controls}>
        <Select
          title="Period"
          id="period"
          options={[
            { value: "d", label: "Daily" },
            { value: "w", label: "Weekly" },
            { value: "m", label: "Monthly" },
          ]}
          onChange={(value: string) =>
            setRequestParameters({
              ...requestParameters,
              period: value,
            })
          }
        />
        <Select
          title="Order"
          id="order"
          options={[
            { value: "a", label: "Ascending" },
            { value: "d", label: "Descending" },
          ]}
          onChange={(value: string) =>
            setRequestParameters({
              ...requestParameters,
              order: value,
            })
          }
        />

        <Datepicker
          title="From"
          id="from"
          value={requestParameters.from}
          onChange={(value: string) =>
            setRequestParameters({
              ...requestParameters,
              from: value,
            })
          }
        />
        <Datepicker
          title="To"
          id="to"
          min={requestParameters.from}
          value={requestParameters.to}
          onChange={(value: string) =>
            setRequestParameters({
              ...requestParameters,
              to: value,
            })
          }
        />
      </div>
    </div>
  );
};

export default Chart;
