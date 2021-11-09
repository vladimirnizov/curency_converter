import Vue from "vue";
import Vuex from "vuex";
import { createStore } from "vuex-extensions";

Vue.use(Vuex);

export default createStore(Vuex.Store, {
  state: {
    defaultCurrencySelected: {
      id: "ILS",
    },
    alert: {
      show: false,
      message: null,
      color: null,
    },
  },
  mutations: {
    SET_DEFAULT_CURRENCIES(state, currency) {
      state.defaultCurrencySelected = currency;
    },
    SET_ALERT(state, { show, message, color }) {
      state.alert = { show, message, color };
    },
  },
  actions: {
    loadCurrency({ commit }, currency) {
      commit("SET_DEFAULT_CURRENCIES", currency);
    },
  },
  getters: {
    currentCurrency: (state) => state.defaultCurrencySelected,
    alert: (state) => state.alert,
  },
});
