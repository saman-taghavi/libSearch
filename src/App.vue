<template>
  <v-app v-cloak>
    <v-main>
      <!-- <v-navigation-drawer
        style="overflow-y: hidden"
        v-model="drawer"
        app
        right
        class="pt-4"
        color="grey lighten-3"
        mini-variant
        expand-on-hover
        mini-variant-width="120"
      >
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item v-for="n in 14" :key="n">
              <v-list-item-avatar>
                <v-img max-width="140" :src="getImageSrc(n)"></v-img
              ></v-list-item-avatar>
              <v-list-item-title>متن عنوان</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer> -->
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
      group: "",
      basePath: import.meta.env.BASE_URL,
    };
  },
  methods: {
    log() {
      console.log(
        `%c  hi `,
        "background: #2ecc71;border-radius: 0.5em;color: white;font-weight: bold;padding: 2px 0.5em"
      );
    },
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