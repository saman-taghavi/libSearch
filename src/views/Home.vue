<template>
  <div>
    <component :is="currentSearch" />
    <!-- search result -->
    <SearchResult v-if="!!Object.keys(searchResults).length" />
    <v-row v-else no-gutters class="pa-5" justify="space-around">
      <v-col cols="3" class="pa-1" v-for="n in 14" :key="n">
        <v-img
          v-ripple
          @click="log(n)"
          :aspect-ratio="16 / 9"
          :src="getImageSrc(n)"
          contain
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SimpleSearch from "@/components/simpleSearch.vue";
import advSearch from "@/components/advSearch.vue";
import SearchResult from "@/components/searchResult.vue";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Home",

  components: { SimpleSearch, SearchResult, advSearch },
  data() {
    return {
      model: "",
      loading: false,
      show: false,
    };
  },
  computed: {
    ...mapState(["isAdvSearch", "basePath"]),
    ...mapGetters(["searchResults"]),
    currentSearch() {
      return this.isAdvSearch ? "advSearch" : "SimpleSearch";
    },
  },
  methods: {
    getImageSrc(n) {
      return `${this.basePath}images/${n}.jpg`;
    },
    log(n) {
      console.log(
        "%c n =>",
        "background: #2ecc71;border-radius: 0.5em;color: white;font-weight: bold;padding: 2px 0.5em",
        { n }
      );
    },
  },
};
</script>
<style scoped>
.grey {
  filter: grayscale(100%);
}
</style>
