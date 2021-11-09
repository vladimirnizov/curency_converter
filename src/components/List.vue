<template>
  <div>
    <v-row>
      <v-col>
        <v-select
          class="ml-3"
          @change="calcInput(defaultSelectedList)"
          :items="rows2"
          item-text="id"
          item-value="id"
          v-model="defaultSelectedList"
          return-object
        ></v-select>
      </v-col>
      <v-col>
        <v-text-field
          @keyup="calcInput(defaultSelectedList)"
          v-model="inputfrom"
          type="number"
          placeholder="Enter your amount"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="rows"
      item-key="name"
      class="elevation-1"
    >
    </v-data-table>
  </div>
</template>
<script>
import { userService } from "../api";

export default {
  data() {
    return {
      currencies: [],
      headers: [
        { text: "Currency", value: "currency" },
        { text: "Rate", value: "rate" },
      ],
      rows: [],
      defaultSelected: "",
      inputfrom: "",
      rows2: [],
    };
  },
  mounted() {
    this.listData(this.defaultSelectedList);
    this.getAllCurrencies();
  },
  computed: {
    defaultSelectedList: {
      get() {
        return this.$store.state.defaultCurrencySelected;
      },
      set(value) {
        this.$store.dispatch("loadCurrency", value);
      },
    },
  },

  methods: {
    listData(to) {
      userService.listData(to.id).then((res) => {
        this.currencies = Object.entries(res).map(([k, v]) => ({ [k]: v }));
        this.rows = Object.entries(res).map(([k, v]) => ({
          currency: k.substring(0, k.indexOf("_")),
          rate: v,
        }));
      });
    },
    calcInput(rate) {
      userService
        .listData(rate.id)
        .then((res) => {
          this.rows = Object.entries(res).map(([k, v]) => ({
            currency: k.substring(0, k.indexOf("_")),
            rate: v * this.inputfrom,
          }));
        })
        .catch((err) => {
          this.$store.commit("SET_ALERT", {
            message: err.message,
            show: true,
            color: "error",
          });
        });
    },
    getAllCurrencies() {
      return userService
        .allCurrencies()
        .then((res) => {
          this.rows2 = Object.keys(res.results).map((key) => ({
            id: [key][0],
            currencyName: res.results[key],
          }));
        })
        .catch((err) => {
          this.$store.commit("SET_ALERT", {
            message: err.message,
            show: true,
            color: "error",
          });
        });
    },
  },
};
</script>
