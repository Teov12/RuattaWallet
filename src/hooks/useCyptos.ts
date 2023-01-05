import axios from "axios";
import { computed } from "vue";
import cryptosStore from "../stores/cryptos.store";

export function useCryptos() {
  const API_CRIPTO = axios.create({
    baseURL: "https://criptoya.com/api",
    headers: {'Access-Control-Allow-Credentials':true},
  });

  const EXCHANGE = "ripio";

  const store = cryptosStore();

  async function getBTCPrice() {
    API_CRIPTO.get(`${EXCHANGE}/btc/ars`)
      .then((response) => {
        store.setPriceByValue("btc", response.data);
      })
      .catch((e) => console.log(e));
  }

  async function getETHPrice() {
    API_CRIPTO.get(`${EXCHANGE}/eth/ars`)
      .then((response) => {
        store.setPriceByValue("eth", response.data);
      })
      .catch((e) => console.log(e));
  }

  async function getDAIPrice() {
    API_CRIPTO.get(`${EXCHANGE}/dai/ars`)
      .then((response) => {
        store.setPriceByValue("dai", response.data);
      })
      .catch((e) => console.log(e));
  }

  async function getUSDSPrice() {
    API_CRIPTO.get(`${EXCHANGE}/usdc/ars`)
      .then((response) => {
        store.setPriceByValue("usdc", response.data);
      })
      .catch((e) => console.log(e));
  }

  async function getAllPrices() {
    await getBTCPrice();
    await getDAIPrice();
    await getETHPrice();
    await getUSDSPrice();
  }

  const getPriceByValue = (value: string) => {
    return store.getPriceByValue(value);
  };

  return {
    getBTCPrice,
    getDAIPrice,
    getETHPrice,
    getUSDSPrice,
    getAllPrices,
    getPriceByValue,
  };
}
