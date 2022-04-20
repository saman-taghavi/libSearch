<template>
  <div>
    <v-slide-group
      v-model="model"
      mandatory
      class="pa-4"
      center-active
      show-arrows
    >
      <v-slide-item
        class="yellow"
        v-for="n in 14"
        :key="n"
        v-slot="{ active, toggle }"
      >
        <v-img
          @click="toggle"
          :class="active ? '' : 'grey'"
          class="pa-2 rounded-circle"
          max-width="184"
          :src="getImageSrc(n)"
        ></v-img>
      </v-slide-item>
    </v-slide-group>
    <component :is="currentSearch" />
    <!-- search result -->
    <SearchResult />
  </div>
</template>

<script>
import SimpleSearch from "@/components/simpleSearch.vue";
import advSearch from "@/components/advSearch.vue";
import SearchResult from "@/components/searchResult.vue";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Home",

  components: { SimpleSearch, SearchResult,advSearch },
  data() {
    return {
      model: "",
      basePath: import.meta.env.BASE_URL,
      loading: false,
    };
  },
  computed: {
    ...mapState(["isAdvSearch"]),
    currentSearch() {
      return this.isAdvSearch ? "advSearch" : "SimpleSearch";
    },
  },
  methods: {
    getImageSrc(n) {
      return `${this.basePath}images/${n}.jpg`;
    },
  },
};
</script>
<style scoped>
.grey {
  filter: grayscale(100%);
}
</style>