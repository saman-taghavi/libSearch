<template>
  <v-app>
    <v-main>
      <v-navigation-drawer
        v-model="drawer"
        app
        right
        class="pt-4"
        color="grey lighten-3"
        mini-variant
      >
        <v-avatar
          v-for="n in 6"
          :key="n"
          :color="`grey ${n === 1 ? 'darken' : 'lighten'}-1`"
          :size="n === 1 ? 36 : 20"
          class="d-block text-center mx-auto mb-9"
        ></v-avatar>
      </v-navigation-drawer>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Base",
  data(){
    return {
      drawer:true
    }
  }
};
</script>
