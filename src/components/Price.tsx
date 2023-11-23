import {useQuery} from "react-query";
import {priceData} from "../api/api";
import {useLocation} from "react-router-dom";
import styled from "styled-components";

interface IQuotes {
  USD: {
    ath_date: string;
    ath_price: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_1h: number;
    percent_change_1y: number;
    percent_change_6h: number;
    percent_change_7d: number;
    percent_change_12h: number;
    percent_change_15m: number;
    percent_change_24h: number;
    percent_change_30d: number;
    percent_change_30m: number;
    percent_from_price_ath: number;
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
  };
}

interface IPriceModel {
  beta_value: number;
  circulating_supply: number;
  first_data_at: string;
  last_updated: string;
  max_supply: number;
  quotes: IQuotes;
  total_supply: number;
}
const Container = styled.div`
  margin: 0 40px;
`;
const Loading = styled.h2``;
const PriceCont = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 1fr;
`;
const TxtCont = styled.div`
  border-radius: 15px;
  padding: 20px;
  background-color: ${(props) => props.theme.coinContBg};
  color: ${(props) => props.theme.txtColor};
  &:nth-child(1),
  &:nth-child(2) {
    grid-column: span 3;
  }
  &:nth-child(3),
  &:nth-child(4),
  &:nth-child(5),
  &:nth-child(6),
  &:nth-child(7) {
    grid-column: span 2;
  }
  &:nth-child(19) {
    grid-column: span 3;
  }
  &:nth-child(20),
  &:nth-child(21),
  &:nth-child(22) {
    grid-column: span 2;
  }
`;
const PriceTitle = styled.h3`
  font-size: 25px;
  font-weight: 900;
`;
const PriceTxt = styled.p<{$isActive?: boolean}>`
  text-align: right;
  font-size: 20px;
  font-weight: 800;
  color: ${(props) => (props.$isActive ? "#ff5638" : "#22ff5d")};
`;
export default function Price() {
  const {state} = useLocation();
  const {isLoading: priceLoading, data: aboutPrice} = useQuery<IPriceModel>(
    ["priceData", state],
    async () => {
      const data = await priceData(String(state));
      return data;
    }
  );

  const priceColorChecker = (price: number) => {
    if (price < 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Container>
      {priceLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <PriceCont>
          <TxtCont>
            <PriceTitle>Beta Value</PriceTitle>
            <PriceTxt>{aboutPrice?.beta_value}</PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Last Update at</PriceTitle>
            <PriceTxt>{aboutPrice?.last_updated.slice(0, 10)}</PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Circulating Supply</PriceTitle>
            <PriceTxt>
              {aboutPrice?.circulating_supply.toLocaleString("en-us")}
            </PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Max Supply</PriceTitle>
            <PriceTxt>
              {aboutPrice?.max_supply.toLocaleString("en-us")}
            </PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Total Supply</PriceTitle>
            <PriceTxt>
              {aboutPrice?.total_supply.toLocaleString("en-us")}
            </PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>All Time High Date</PriceTitle>
            <PriceTxt>{aboutPrice?.quotes.USD.ath_date.slice(0, 10)}</PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>All Time High Price</PriceTitle>
            <PriceTxt>
              $ {aboutPrice?.quotes.USD.ath_price.toLocaleString("en-US")}
            </PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Market Cap</PriceTitle>
            <PriceTxt>
              $ {aboutPrice?.quotes.USD.market_cap.toLocaleString("en-US")}
            </PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Market Cap Change 24H</PriceTitle>
            <PriceTxt
              $isActive={priceColorChecker(
                Number(aboutPrice?.quotes.USD.market_cap_change_24h)
              )}
            >
              {aboutPrice?.quotes.USD.market_cap_change_24h} %
            </PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Per.15M</PriceTitle>
            <PriceTxt
              $isActive={priceColorChecker(
                Number(aboutPrice?.quotes.USD.percent_change_15m)
              )}
            >
              {aboutPrice?.quotes.USD.percent_change_15m} %
            </PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Per.30M</PriceTitle>
            <PriceTxt
              $isActive={priceColorChecker(
                Number(aboutPrice?.quotes.USD.percent_change_30m)
              )}
            >
              {aboutPrice?.quotes.USD.percent_change_30m} %
            </PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Per.1H</PriceTitle>
            <PriceTxt
              $isActive={priceColorChecker(
                Number(aboutPrice?.quotes.USD.percent_change_1h)
              )}
            >
              {aboutPrice?.quotes.USD.percent_change_1h} %
            </PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Per.6H</PriceTitle>
            <PriceTxt
              $isActive={priceColorChecker(
                Number(aboutPrice?.quotes.USD.percent_change_6h)
              )}
            >
              {aboutPrice?.quotes.USD.percent_change_6h} %
            </PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Per.12H</PriceTitle>
            <PriceTxt
              $isActive={priceColorChecker(
                Number(aboutPrice?.quotes.USD.percent_change_12h)
              )}
            >
              {aboutPrice?.quotes.USD.percent_change_12h} %
            </PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Per.24H</PriceTitle>
            <PriceTxt
              $isActive={priceColorChecker(
                Number(aboutPrice?.quotes.USD.percent_change_24h)
              )}
            >
              {aboutPrice?.quotes.USD.percent_change_24h} %
            </PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Per.7D</PriceTitle>
            <PriceTxt
              $isActive={priceColorChecker(
                Number(aboutPrice?.quotes.USD.percent_change_7d)
              )}
            >
              {aboutPrice?.quotes.USD.percent_change_7d} %
            </PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Per.30D</PriceTitle>
            <PriceTxt
              $isActive={priceColorChecker(
                Number(aboutPrice?.quotes.USD.percent_change_30d)
              )}
            >
              {aboutPrice?.quotes.USD.percent_change_30d} %
            </PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Per.1Y</PriceTitle>
            <PriceTxt
              $isActive={priceColorChecker(
                Number(aboutPrice?.quotes.USD.percent_change_1y)
              )}
            >
              {aboutPrice?.quotes.USD.percent_change_1y} %
            </PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Percent From Price All Time High High</PriceTitle>
            <PriceTxt
              $isActive={priceColorChecker(
                Number(aboutPrice?.quotes.USD.percent_from_price_ath)
              )}
            >
              {aboutPrice?.quotes.USD.percent_from_price_ath} %
            </PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Price</PriceTitle>
            <PriceTxt>
              $ {aboutPrice?.quotes.USD.price.toLocaleString("en-US")}
            </PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Volume 24H</PriceTitle>
            <PriceTxt>
              $ {aboutPrice?.quotes.USD.volume_24h.toLocaleString("en-US")}
            </PriceTxt>
          </TxtCont>
          <TxtCont>
            <PriceTitle>Volume 24H Change 24H</PriceTitle>
            <PriceTxt
              $isActive={priceColorChecker(
                Number(aboutPrice?.quotes.USD.volume_24h_change_24h)
              )}
            >
              {aboutPrice?.quotes.USD.volume_24h_change_24h}
            </PriceTxt>
          </TxtCont>
        </PriceCont>
      )}
    </Container>
  );
}
