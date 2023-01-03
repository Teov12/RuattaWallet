import { User } from "firebase/auth";
import { defineStore } from "pinia";

interface AuthState {
  user: User | null;
}

export default defineStore("auth", {
  state: (): AuthState => ({
    user: null,
  }),
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  actions: {
    setUser(user: User) {
      this.user = user;
    },
  },
});
