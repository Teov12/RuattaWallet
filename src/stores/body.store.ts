import { defineStore } from "pinia";

interface BodyState {
  classes: {
    header?: string[];
    headerContainer?: string[];
    headerMobile?: string[];
    headerMenu?: string[];
    aside?: string[];
    asideMenu?: string[];
    asideToggle?: string[];
    toolbar?: string[];
    toolbarContainer?: string[];
    content?: string[];
    contentContainer?: string[];
    footerContainer?: string[];
    sidebar?: string[];
    pageTitle?: string[];
  };
}

export const useBodyStore = defineStore("body", {
  state: (): BodyState => ({
    classes: {},
  }),
  getters: {
    getClasses() {
      return (position) => {
        if (typeof position !== "undefined") return this.classes[position];
        return this.classes;
      };
    },
  },
  actions: {
    setClassNameByPosition(payload) {
      const { position, className } = payload;
      if (!this.classes[position]) this.classes[position] = [];
      this.classes[position].push(className);
    },
    addBodyClassName(className) {
      document.body.classList.add(className);
    },
    removeBodyClassName(className) {
      document.body.classList.remove(className);
    },
    addBodyAttribute(payload) {
      const { qualifiedName, value } = payload;
      document.body.setAttribute(qualifiedName, value);
    },
    removeBodyAttribute(payload) {
      const { qualifiedName } = payload;
      document.body.removeAttribute(qualifiedName);
    },
    addClassName(payload) {
      this.setClassNameByPosition(payload);
    },
  },
});
