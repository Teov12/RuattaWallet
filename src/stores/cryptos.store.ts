import { defineStore } from "pinia";

interface RequestBody {
  ask: number;
  totalAsk: number;
  bid: number;
  totalBid: number;
  time: number;
}

interface Crypto {
  value: string;
  prices: RequestBody | null;
}

interface CryptoState {
  cryptos: Crypto[];
}

export default defineStore("crypto", {
  state: (): CryptoState => ({
    cryptos: [
      { prices: null, value: "btc" },
      { prices: null, value: "eth" },
      { prices: null, value: "dai" },
      { prices: null, value: "usdc" },
    ],
  }),
  getters: {
    getPriceByValue: (state) => (value: string) => {
      return state.cryptos.find((c) => c.value == value)?.prices;
    },
  },
  actions: {
    setPriceByValue(value: string, data: RequestBody) {
      let crypto = this.cryptos.find((c) => c.value == value);
      if (crypto) crypto.prices = data;
    },
  },
});
