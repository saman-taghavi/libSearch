<template>
  <div>
    <v-row
      dense
      no-gutters
      justify="center"
      align="center"
      align-content="center"
      order="1"
    >
      <v-col cols="6" order="1" justify="center" align="center">
        <v-text-field
          v-model="searchText"
          clearable
          name="search"
          label="جستجو"
          id="search "
          color="#469213"
          solo
          persistent-hint
          prepend-inner-icon="mdi-magnify"
          :hint="totalResults"
          @keypress.enter="search"
          rounded
          :disabled="isLoading"
        >
          <template #prepend-inner>
            <v-progress-circular
              v-if="isLoading"
              :size="25"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="6" order="2">
        <v-autocomplete
          v-model="selectedDocTypes"
          :items="docTypes"
          :disabled="isLoading"
          chips
          multiple
          solo
          item-text="name"
          item-value="code"
          clearable
          deletable-chips
          hide-no-data
          hide-spin-buttons
          class="pr-2"
          rounded
          color="#469213"
          :menu-props="{
            offsetY: true,
            transition: 'slide-y-transition',
            bottom: true,
          }"
        ></v-autocomplete>
      </v-col>
    </v-row>

    <v-row
      justify="space-around"
      align="center"
      align-content="center"
      no-gutters
    >
      <!-- search btn -->
      <v-col md="2" cols="3" order="3" align="center">
        <v-btn
          @click="search"
          :disabled="isLoading"
          color="success"
          class="mx-auto"
          >جستجو</v-btn
        >
      </v-col>
      <v-col
        md="2"
        cols="3"
        order="3"
        align="center"
        v-if="searchResults['biblioList']"
      >
        <v-btn @click="resetSearch" :disabled="isLoading" color="info"
          >بازگشت</v-btn
        >
      </v-col>
      <v-col
        v-if="searchResults['biblioList']"
        md="2"
        cols="4"
        order="3"
        align="center"
      >
        <etoX></etoX>
      </v-col>
      <v-col
        v-if="searchResults['biblioList']"
        md="4"
        cols="12"
        order="3"
        align="center"
      >
        <sorter></sorter>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import etoX from "@/components/exportExcel.vue";

import { mapActions, mapGetters, mapState } from "vuex";
import Sorter from "./sorter.vue";

export default {
  name: "simpleSearch",
  components: {
    etoX,
    Sorter,
  },
  data() {
    return {
      searchText: "",
    };
  },
  computed: {
    ...mapState(["docTypes", "isLoading"]),
    ...mapGetters(["totalResults", "searchResults"]),
    selectedDocTypes: {
      get() {
        return this.$store.state.simpleSearch.selectedDocTypes;
      },
      set(value) {
        this.$store.commit("SET_SIMPLE_SEARCH_DOCTYPES", value);
      },
    },

    formatedSelectedDocTypes() {
      return this.selectedDocTypes.length > 1
        ? this.selectedDocTypes.reduce(
            (previousValue, currentValue) => `${previousValue}-${currentValue}`
          )
        : this.selectedDocTypes.length === 1
        ? this.selectedDocTypes[0]
        : "";
    },
  },
  methods: {
    ...mapActions(["simpleSearch", "setSearchType"]),
    search() {
      let params = {
        searchtext: this.searchText,
        doctype: this.formatedSelectedDocTypes,
        first: 0,
      };
      this.simpleSearch(params);
    },
    resetSearch() {
      this.searchText = "";
      this.$store.commit("RESET_SEARCH");
    },
  },
};
</script>

<style></style>
