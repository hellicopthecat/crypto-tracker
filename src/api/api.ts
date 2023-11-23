const BASE_URL = "https://api.coinpaprika.com/v1";

export const fetchCoins = async () => {
  return fetch(`${BASE_URL}/coins`)
    .then((res) => res.json())

    .catch((error) => console.log(error));
};

export const coinData = async (id: string) => {
  return fetch(`${BASE_URL}/coins/${id}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export const priceData = async (id: string) => {
  return fetch(`${BASE_URL}/tickers/${id}`)
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

export const chartData = async (id: string) => {
  // const endDate = Math.floor(Date.now() / 1000);
  // const startDate = endDate - 60 * 60 * 24 * 7;
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${id}`)
    .then((res) => res.json())
    .catch((e) => console.log(e));
};
