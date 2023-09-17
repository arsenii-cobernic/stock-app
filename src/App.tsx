import { useState, useEffect } from "react";
import "./App.css";
import Chart from "./components/Chart/Chart";

export interface RequestParameters {
  period: string;
  order: string;
  from: string;
  to: string;
}

function App() {
  const [chartData, setChartData] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const [requestParameters, setRequestParameters] = useState<RequestParameters>(
    {
      period: "d",
      order: "a",
      from: "2020-01-05",
      to: "2020-02-05",
    }
  );

  useEffect(() => {
    const { period, order, from, to } = requestParameters;
    const requestUrl = `https://eodhd.com/api/eod/MCD.US?api_token=demo
    &from=${from}
    &to=${to}
    &period=${period}
    &order=${order}
    `;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(requestUrl);
        const csvString = await response.text();
        setChartData(csvString);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setChartData("");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [requestParameters]);

  return (
    <Chart
      loading={loading}
      chartData={chartData}
      setRequestParameters={setRequestParameters}
      requestParameters={requestParameters}
    />
  );
}

export default App;
