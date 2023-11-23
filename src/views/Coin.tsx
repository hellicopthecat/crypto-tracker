import {useQuery} from "react-query";
import {Link, Outlet, useParams} from "react-router-dom";
import {coinData} from "../api/api";
import styled from "styled-components";
import Badge from "../components/Badge";
import BackBtn from "../components/BackBtn";

interface IcoinLinks {
  website: string[];
  youtube?: string[];
  reddit?: string[];
}
interface ICoinModel {
  rank: number;
  is_new: boolean;
  is_active: boolean;
  open_source: boolean;
  id: string;
  name: string;
  symbol: string;
  type: string;
  logo: string;
  description: string;
  message: string;
  started_at: string;
  first_data_at: string;
  last_data_at: string;
  links: IcoinLinks;
}
interface IColumn {
  $space?: boolean;
}
const Cointainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px;
`;
const BadgeCont = styled.div`
  position: absolute;
  display: flex;
  top: -8px;
`;
const Loading = styled.h2``;
const CoinDetail = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.coinContBg};
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
`;
const CoinInfo = styled.div<IColumn>`
  color: ${(props) => props.theme.txtColor};
  display: flex;
  justify-content: ${(props) => (props.$space ? "space-around" : "center")};
  margin: ${(props) => props.$space && " 40px 0"};
  font-size: ${(props) => props.$space && "20px"};
  font-weight: ${(props) => props.$space && "600"};
  & > *:hover {
    color: ${(props) => props.$space && "tomato"};
  }
  align-items: center;
`;
const CoinImg = styled.img`
  width: 200px;
  height: 200px;
  margin: 20px 30px 20px 0;
`;
const CoinTitle = styled.h2`
  align-items: end;
  font-size: 50px;
  span {
    display: flex;
    font-size: 20px;
  }
`;
const CoinDesc = styled.p`
  color: ${(props) => props.theme.txtColor};
  width: 70%;
  text-align: center;
  padding: 20px 0;
  margin: 0 auto;
  font-size: 18px;
`;
const BtnSelect = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
`;
const ActiveBtn = styled.button`
  color: ${(props) => props.theme.txtColor};
  font-size: 30px;
  background-color: ${(props) => props.theme.coinContBg};
  padding: 10px 20px;
  border-radius: 15px;
  & :hover {
    color: ${(props) => props.theme.txtColor && "tomato"};
  }
`;
// interface IRouterParams extends Params {
//   id: string;
// }
export default function Coin() {
  const {coinID} = useParams();
  const {isLoading: aboutCoinLoading, data: aboutCoin} = useQuery<ICoinModel>(
    ["coinData", coinID],
    async () => {
      const data = await coinData(String(coinID));
      return data;
    },
    {
      refetchInterval: 360000,
    }
  );
  return (
    <>
      {aboutCoinLoading ? (
        <>
          <BackBtn dest="/" />
          <Cointainer>
            <Loading>Now Loading..</Loading>
          </Cointainer>
        </>
      ) : (
        <>
          <BackBtn dest="/" />
          <Cointainer>
            <CoinDetail>
              <BadgeCont>
                {!aboutCoin?.is_new && <Badge text="New Coin" color="red" />}
                {aboutCoin?.is_active && (
                  <Badge text="Active" color="lightgreen" />
                )}
                {aboutCoin?.open_source && (
                  <Badge text="Open Source" color="#ff793f" />
                )}
                <Badge
                  text={` Coin Power NO.${aboutCoin?.rank}`}
                  color="#2bcbba"
                />
              </BadgeCont>
              <CoinInfo>
                <CoinImg src={aboutCoin?.logo} alt={aboutCoin?.id} />
                <CoinTitle>
                  {aboutCoin?.name} <span>{aboutCoin?.symbol}</span>
                </CoinTitle>
              </CoinInfo>
              <CoinDesc>{aboutCoin?.description}</CoinDesc>

              <CoinInfo>
                <p>{aboutCoin?.message}</p>
              </CoinInfo>

              <CoinInfo $space>
                {aboutCoin?.links.website && (
                  <Link to={aboutCoin?.links.website[0]}>Homepage</Link>
                )}
                {aboutCoin?.links.youtube && (
                  <Link to={aboutCoin?.links.youtube[0]}>Youtube</Link>
                )}
                {aboutCoin?.links.reddit && (
                  <Link to={aboutCoin?.links.reddit[0]}>Reddit</Link>
                )}
              </CoinInfo>
            </CoinDetail>
            <BtnSelect>
              <ActiveBtn>
                <Link to="price" state={coinID}>
                  Show Price
                </Link>
              </ActiveBtn>
              <ActiveBtn>
                <Link to="chart">Show Chart</Link>
              </ActiveBtn>
            </BtnSelect>
            <Outlet context={coinID} />
          </Cointainer>
        </>
      )}
    </>
  );
}
