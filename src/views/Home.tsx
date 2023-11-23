import {useQuery} from "react-query";
import styled, {keyframes} from "styled-components";
import {fetchCoins} from "../api/api";
import {Link} from "react-router-dom";
import Badge from "../components/Badge";
import {Helmet} from "react-helmet";
interface ICoins {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}

const txtAnimation = (start: string, end: string) => keyframes`
  0%{
    color:${start};
  }
  50%{
    color:${end};
  }
  100%{
    color:${start};
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px;
`;
const Loading = styled.h1``;
const CoinListCont = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 150px;
  margin: 0 auto;
`;
const CoinList = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 20px;
  border-radius: 15px;
  transition: 0.1s ease-in-out;
  background-color: ${(props) => props.theme.coinContBg};
`;
const CoinImg = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;
const CoinInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CoinName = styled.h2`
  font-size: 30px;
  color: ${(props) => props.theme.txtColor};
  &:hover {
    animation: ${(props) =>
        txtAnimation(
          props.theme.txtTransitionStart,
          props.theme.txtTransitionEnd
        )}
      1s ease-in-out infinite;
  }
  span {
    font-size: 12px;
    margin: 0 4px;
  }
`;
const BadgeCont = styled.div`
  position: absolute;
  display: flex;
  top: -8px;
`;

export default function Home() {
  const {data, isLoading} = useQuery<ICoins[]>(["coins"], fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Home | Crypto Tracker</title>
        <meta name="description" content="Home | Crypto Tracker" />
      </Helmet>
      {isLoading ? (
        <Loading>Loading Coin Data</Loading>
      ) : (
        <CoinListCont>
          {data?.slice(0, 100).map((coin) => (
            <CoinList id={coin.id} key={coin.id}>
              <BadgeCont>
                {coin.is_new && <Badge text="New Coin" color="red" />}
                {coin.is_active ? (
                  <Badge text="Active!" color="lightgreen" />
                ) : (
                  <Badge text="Non-Active!" color="oragne" />
                )}
                <Badge text={coin.type.toUpperCase()} color="#fed330" />
                <Badge text={` Coin Power NO.${coin.rank}`} color="#2bcbba" />
              </BadgeCont>

              <CoinImg
                src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                alt={coin.id}
              />
              <CoinInfo>
                <CoinName>
                  <Link to={`/${coin.id}`}>{coin.name}</Link>
                  <span>({coin.symbol})</span>
                </CoinName>
              </CoinInfo>
            </CoinList>
          ))}
        </CoinListCont>
      )}
    </Container>
  );
}
