<template>
  <div>
    <v-img
      class="mx-auto mt-3"
      lazy-src="../assets/exchange.jpg"
      max-height="300"
      max-width="600"
      src="../assets/exchange.jpg"
    ></v-img
    ><converter></converter>
  </div>
</template>
<script>
import Converter from "../components/Converter.vue";

export default {
  components: { Converter },
};
</script>
