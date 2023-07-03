import { defineStore } from "pinia";
import { ICoin, IPrices } from "../interfaces/Index";

interface CryptoState {
  cryptos: ICoin[];
}

export default defineStore("crypto", {
  state: (): CryptoState => ({
    cryptos: [
      {
        name: "Bitcoin",
        value: "btc", 
        prices: {ask: 0, totalAsk: 0, bid: 0, totalBid: 0, time: 0}, 
      },
      { 
        name: "Etherium" ,
        value: "eth", 
        prices: {ask: 0, totalAsk: 0, bid: 0, totalBid: 0, time: 0}, 
      },
      { 
        name: "DAI" ,
        value: "dai", 
        prices: {ask: 0, totalAsk: 0, bid: 0, totalBid: 0, time: 0},
      },
      { 
        name: "USDC" ,
        value: "usdc",
        prices: {ask: 0, totalAsk: 0, bid: 0, totalBid: 0, time: 0}, 
      },
    ],
  }),
  getters: {
    getPriceByValue: (state) => (value: string) => {
      return state.cryptos.find((c) => c.value == value)?.prices;
    },
    getAllCoins(state){
      return state.cryptos;
    },
    getAskPriceByValue: 
    (state) => 
    (value: string): number => {
      const prices = state.cryptos.find((c) => c.value == value)?.prices;
      if(!prices) return 0;
      return prices.ask;
    },
    getTotalAskPriceByValue: 
    (state) => 
    (value: string): number => {
      const prices = state.cryptos.find((c) => c.value == value)?.prices;
      if(!prices) return 0;
      return prices.totalAsk;
    },
    getBidPriceByValue:
    (state) =>
    (value: string): number => {
      const prices = state.cryptos.find((c) => c.value == value)?.prices;
      if (!prices) return 0;
      return prices.bid;
    },
    getTotalBidPriceByValue:
    (state) =>
    (value: string): number => {
      const prices = state.cryptos.find((c) => c.value == value)?.prices;
      if (!prices) return 0;
      return prices.totalBid;
    }

  },
  actions: {
    setPriceByValue(value: string, data: IPrices) {
      let crypto = this.cryptos.find((c) => c.value == value);
      if (crypto) crypto.prices = data;
    },
  },
});
