<template>
  <v-app class="app-container">
    <app-bar></app-bar>
    <v-main>
      <v-snackbar :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.message }}
    </v-snackbar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";

export default {
  name: "App",

  components: {
    AppBar,
  },
  computed: {
    snackbar() {
      return this.$store.getters.alert;
    }
  }
};
</script>
