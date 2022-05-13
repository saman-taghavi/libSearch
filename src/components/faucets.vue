<template>
  <v-card class="mx-auto">
    <v-card-title
      >{{ title }}

      {{ typeof faucet }}
    </v-card-title>
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
        <v-list-item :disabled="isLoading" :key="item.id">
          <v-list-item-content>
            <v-list-item-subtitle>
              <p v-if="item.farsiLabel" class="mb-0">{{ item.farsiLabel }}</p>
              <p
                dir="rtl"
                v-if="item.internalName === 'author'"
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
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "faucet",
  props: ["faucet", "title"],
  computed: {
    ...mapState(["isAdvSearch", "docTypes", "isLoading"]),
  },
};
</script>

<style>
</style>