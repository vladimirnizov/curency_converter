<template>
  <v-app-bar fixed app>
    <v-img
      max-width="50"
      src="../assets/63483-exchange-money-symbol-dollar-currency-rate.png"
      alt="currnecy"
    ></v-img>
    <v-toolbar-title class="hidden-sm-and-down ml-4"
      >Currency Convertor</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <router-link class="hidden-sm-and-down ml-4" to="/">Converter</router-link>
    <router-link class="hidden-sm-and-down ml-4 ml-6" to="/currencies"
      >List</router-link
    >

    <v-switch class="mt-5 ml-7" v-model="$vuetify.theme.dark"></v-switch>
    <v-menu v-if="$vuetify.breakpoint.mobile" class="hidden-md-and-up">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-app-bar-nav-icon> </v-app-bar-nav-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/">
          <v-list-item-title>Converter</v-list-item-title>
        </v-list-item>
        <v-list-item to="/currencies">
          <v-list-item-title>List</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<style scoped>
.header.is_mobile {
  .v-toolbar__content {
    flex-direction: column;
  }
}
</style>