<template>
  <v-row
    dense
    no-gutters
    justify="center"
    align="center"
    align-content="center"
    class="pt-7"
  >
    <v-col cols="12" order="1" justify="center" align="center">
      <v-row no-gutters justify="center">
        <v-col cols="2" class="pl-2">
          <v-select
            solo
            v-model="selectedField"
            :items="advSearchFields"
            :disabled="isLoading"
            label="فیلد جستجو"
            clearable
            small-chips
            item-text="name"
            item-value="code"
            hide-no-data
            hide-spin-buttons
            hide-details
            rounded
            color="#469213"
            :menu-props="{
              offsetY: true,
              transition: 'slide-y-transition',
              bottom: true,
            }"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="searchText"
            clearable
            name="search"
            label="متن جستجو"
            id="search"
            color="#469213"
            solo
            persistent-hint
            @keyup.enter="search"
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
        <v-col cols="2" class="pl-2">
          <v-select
            solo
            v-model="searchMode"
            :items="searchModeItem"
            :disabled="isLoading"
            label="نحوه جستجو"
            clearable
            small-chips
            item-text="name"
            item-value="code"
            hide-no-data
            hide-spin-buttons
            hide-details
            rounded
            color="#469213"
            :menu-props="{
              offsetY: true,
              transition: 'slide-y-transition',
              bottom: true,
            }"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>

    <v-col md="2" cols="6" order="3" align="center">
      <v-btn
        @click="SET_SEARCH_TYPE({ isAdvSearch: false })"
        :disabled="isLoading"
        color="success"
        >جستجوی ساده</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "advSearch",
  data() {
    return {
      selectedField: "",
      searchMode: "",
      searchModeItem: [
        { name: "جستجوی دقیق", code: "P" },
        { name: "جستجوی عبارات", code: "T" },
      ],
    };
  },
  computed: {
    ...mapState(["docTypes", "isLoading", "advSearchFields"]),
    // ...mapGetters({ totalResults: "simpleTotalResults" }),
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
.v-text-field--rounded > .v-input__control > .v-input__slot {
  padding: 0 10px !important;
}
</style>
