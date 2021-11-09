<template>
  <v-container class="d-flex justify-center align-center">
    <v-card style="width: 90%">
      <v-row>
        <v-col>
          <v-select class="ml-3"
            @change="calcInput(defaultSelected)"
            :items="currencies"
            item-text="id"
            item-value="id"
            v-model="defaultSelected"
            return-object
          ></v-select>
          <v-row class="mt-3 align-center justify-center"
            ><i class="fas fa-angle-double-down fa-3x"></i
            ><i class="fas fa-angle-double-up fa-3x"></i
          ></v-row>
        </v-col>
        <v-col>
          <v-text-field
            @keyup="calcInput(defaultSelected)"
            v-model="inputed"
            type="number"
            placeholder="Enter your amount"
          ></v-text-field>
          <v-row class="mt-3 align-center justify-center"
            ><i class="fas fa-angle-double-down fa-3x"></i
            ><i class="fas fa-angle-double-up fa-3x"></i
          ></v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select class="ml-3"
            @change="calcInput2(defaultSelected2)"
            :items="currencies"
            item-text="id"
            item-value="id"
            v-model="defaultSelected2"
            return-object
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field
            @keyup="calcInput2(defaultSelected2)"
            v-model="inputed2"
            type="number"
            placeholder="Result"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import { userService } from "../api";

export default {
  mounted() {
    this.getAllCurrencies();
  },

  computed: {
    defaultSelected: {
      get() {
        return this.$store.state.defaultCurrencySelected;
      },
      set(value) {
        this.$store.dispatch("loadCurrency", value);
      },
    },
  },
  data() {
    return {
      currencies: [],
      id: "",
      currnecy: "",
      inputed: "",
      inputed2: "",
      imageSrc: `https://www.countryflags.io/`,
      defaultSelected2: {
        id: "USD",
      },
    };
  },
  methods: {
    getAllCurrencies() {
      console.log("reached");
      return new Promise((resolve, reject) => {
        userService
          .allCurrencies()
          .then((res) => {
            if (res.error) {
              throw new Error(res.error)
            }
            this.currencies = Object.keys(res.results).map((key) => ({
                id: [key][0],
                currencyName: res.results[key],
              }))
            resolve(true);
          })
          .catch((err) => {
            this.$store.commit("SET_ALERT", { message: err.message, color: 'error', show: true})
            reject(err);
          });
      });
    },
    calcInput(rate) {
      userService
          .convertData(rate.id + "_", this.defaultSelected2.id, this.inputed).then(
        (res) => {
          console.log(this.defaultSelected2);
          this.inputed2 = res;
        }
      );
    },
    calcInput2(rate) {
      userService
          .convertData(rate.id + "_", this.defaultSelected.id, this.inputed2).then(
        (res) => {
          this.inputed = res;
        }
      );
    },
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>