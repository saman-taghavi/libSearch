<template>
  <v-row
    dense
    no-gutters
    justify="center"
    align="center"
    align-content="center"
  >
    <v-col md="6" cols="12" order="1" justify="center" align="center">
      <v-text-field
        v-model="searchText"
        clearable
        name="search"
        label="جستجو"
        id="search "
        color="#469213"
        class="pt-7"
        solo
        persistent-hint
        prepend-inner-icon="mdi-magnify"
        :hint="totalResults"
        @keyup.enter="search"
        rounded
        outlined
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
    <v-col cols="12" md="6" order="2">
      <v-autocomplete
        v-model="selectedDocTypes"
        :items="docTypes"
        :disabled="isLoading"
        chips
        multiple
        solo
        outlined
        item-text="name"
        item-value="code"
        clearable
        deletable-chips
        disable-lookup
        hide-no-data
        hide-selected
        hide-spin-buttons
        open-on-clear
        class="pt-md-6 pr-md-2"
        rounded
        color="#469213"
      ></v-autocomplete>
    </v-col>
    <!-- search btn -->
    <v-col md="2" cols="3" order="3" align="center">
      <v-btn @click="simpleSearch" :disabled="isLoading" color="success"
        >جستجو</v-btn
      >
    </v-col>
    <!-- Adv seaarch btn -->
    <v-col md="2" cols="6" order="3" align="center">
      <v-btn
        @click="SET_SEARCH_TYPE({ isAdvSearch: true })"
        :disabled="isLoading"
        color="success"
        >جستجوی پیشرفته</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "simpleSearch",
  computed: {
    ...mapState(["docTypes", "isLoading"]),
    ...mapGetters({ totalResults: "simpleTotalResults" }),
    selectedDocTypes: {
      get() {
        return this.$store.state.simpleSearch.selectedDocTypes;
      },
      set(value) {
        this.$store.commit("SET_DOCTYPES", value);
      },
    },
    searchText: {
      get() {
        return this.$store.state.simpleSearch.searchText;
      },
      set(value) {
        this.$store.commit("SET_SEARCH_TEXT", value);
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
    ...mapActions(["updateSimpleSearchResult", "updateLoading", "searchTitle"]),
    ...mapMutations(["SET_SIMPLE_SEARCH_PARAMS", "SET_SEARCH_TYPE"]),
    simpleSearch() {
      let params = {
        SearchField: "title",
        searchtext: this.searchText,
        size: "50",
        first: "0",
        doctype: this.formatedSelectedDocTypes,
      };
      this.searchTitle(params);
    },
  },
};
</script>

<style>
</style>