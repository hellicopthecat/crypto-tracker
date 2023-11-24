import {useQuery} from "react-query";
import {chartData} from "../api/api";
import {useOutletContext} from "react-router-dom";
import styled from "styled-components";
import ApexCharts from "react-apexcharts";
import {darkModeAtom} from "../store/atoms";
import {useRecoilValue} from "recoil";

interface IChartModel {
  close: string;
  high: string;
  low: string;
  open: string;
  volume: string;
  market_cap: number;
  time_close: number;
  time_open: number;
}
const Container = styled.div`
  margin: 20px;
`;
const IsLoading = styled.div``;
const ChartTitle = styled.h2`
  color: ${(props) => props.theme.txtColor};
`;
const Chartcont = styled.div``;
export default function Chart() {
  const coinID = useOutletContext();
  const darkMode = useRecoilValue(darkModeAtom);
  const {data, isLoading, isError, error} = useQuery<IChartModel[]>(
    ["chartData", coinID],
    async () => {
      const data = await chartData(String(coinID));
      return data;
    }
  );

  const xAxisColors = ["#024d98", "#024d98", "#024d98", "#024d98", "#024d98"];
  const yAxisColor = ["#fce112", "#fce112", "#fce112", "#fce112", "#fce112"];
  return (
    <Container>
      {isLoading ? (
        <IsLoading>
          <ChartTitle>NOW LOADING</ChartTitle>
        </IsLoading>
      ) : (
        <Chartcont>
          {error === true ? (
            <ChartTitle>Sorry...Chart data does not exist. </ChartTitle>
          ) : (
            <ApexCharts
              type="candlestick"
              width={1000}
              height={500}
              series={[
                {
                  data:
                    data?.map((price) => ({
                      x: new Date(price.time_close).toLocaleString("en-US", {
                        timeZone: "UTC",
                      }),
                      y: [price.open, price.high, price.low, price.close],
                    })) || [],
                },
              ]}
              options={{
                title: {
                  text: `${String(coinID).toUpperCase()} CandleStick Chart`,
                },
                chart: {
                  type: "candlestick",
                  background: "transparent",
                },
                theme: {mode: darkModeAtom ? "dark" : "light"},
                xaxis: {
                  type: "datetime",
                  labels: {
                    style: {
                      colors: darkMode ? xAxisColors : yAxisColor,
                    },
                  },
                },
                yaxis: {
                  labels: {
                    style: {
                      colors: darkMode ? xAxisColors : yAxisColor,
                    },
                  },
                },
                plotOptions: {
                  candlestick: {
                    colors: {
                      upward: "#19da8d",
                      downward: "#fc5d01",
                    },
                    wick: {
                      useFillColor: true,
                    },
                  },
                },
              }}
            />
          )}
        </Chartcont>
      )}
    </Container>
  );
}
