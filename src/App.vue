<template>
  <v-app v-cloak>
    <v-main>
      <v-container>
        <component :is="current" />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import Home from "@/views/Home.vue";
export default {
  name: "App",
  components: {
    Home,
  },
  data() {
    return {
      current: "Home",
      drawer: false,
    };
  },
  methods: {
    getImageSrc(n) {
      return `${import.meta.env.BASE_URL}images/${n}.jpg`;
    },
  },
};
</script>
<style>
[v-cloak] {
  display: none;
}
</style>
