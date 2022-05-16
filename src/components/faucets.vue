<template>
  <v-card class="mx-auto">
    <v-card-title>{{ title }} </v-card-title>
    <v-divider></v-divider>
    <v-virtual-scroll
      v-if="!isLoading"
      :bench="10"
      :items="faucet"
      max-height="150px"
      item-height="50%"
      max-width="100%"
    >
      <template v-slot:default="{ item }">
        <v-list-item
          @click="faucetSearch(item)"
          :disabled="isLoading"
          :key="item.id"
        >
          <v-list-item-content>
            <v-list-item-subtitle>
              <p v-if="item.farsiLabel" class="mb-0">{{ item.farsiLabel }}</p>
              <p
                dir="rtl"
                v-if="
                  ['author', 'subject', 'publisher'].includes(item.internalName)
                "
                class="mb-0 text-truncate text-right"
                style="max-width: 100vh"
              >
                {{ item.term }}
              </p>
            </v-list-item-subtitle>
          </v-list-item-content>
          ({{ item.count }})
        </v-list-item>

        <v-divider></v-divider>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "faucet",
  props: ["faucet", "title"],
  computed: {
    ...mapState(["isAdvSearch", "docTypes", "isLoading", "faucetLevel"]),
  },
  methods: {
    ...mapActions(["simpleSearch"]),
    log() {
      console.log(
        `%c argumnets =>`,
        "background: #2ecc71;border-radius: 0.5em;color: white;font-weight: bold;padding: 2px 0.5em",
        arguments
      );
    },
    faucetSearch(item) {
      this.$store.commit("SET_FAUCET_LEVEL");
      let f = this.faucetLevel;
      let pa = "pa";
      let text = "searchtext";
      let params = {
        [pa]: "1", // dynamic property
        [`searchField${f}`]: item.internalName, // dynamic property + interpolation
        [`${text}${f}`]: item.term,
        [`searchType${f}`]: "p", // dynamic property + interpolation
      };
      this.simpleSearch(params);
    },
  },
};
</script>

<style>
</style>