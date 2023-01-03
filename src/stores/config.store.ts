import objectPath from "object-path";
import merge from "deepmerge";
import layoutConfig from "../core/config/DefaultLayoutConfig";
import { LayoutConfig } from "../core/config/LayoutConfigTypes";
import { defineStore } from "pinia";

interface ConfigState {
  config: LayoutConfig;
  initial: LayoutConfig;
}

export const useConfigStore = defineStore("config", {
  state: (): ConfigState => ({
    config: layoutConfig,
    initial: layoutConfig,
  }),
  getters: {
    getLayoutConfig() {
      return (path?, defaultValue?) => {
        return objectPath.get(this.config, path, defaultValue);
      };
    },
  },
  actions: {
    setLayoutConfigProperty(payload): void {
      const { property, value } = payload;
      objectPath.set(this.config, property, value);
      localStorage.setItem("config", JSON.stringify(this.config));
    },
    resetLayoutConfig() {
      this.config = Object.assign({}, this.initial);
    },
    overrideLayoutConfig(): void {
      this.config = this.initial = Object.assign(
        {},
        this.initial,
        JSON.parse(window.localStorage.getItem("config") || "{}")
      );
    },
    overridePageLayoutConfig(payload): void {
      this.config = merge(this.config, payload);
    },
  },
});
