<template>
  <div>
    <component :is="currentSearch" class="pb-2" />
    <!-- search result -->
    <div v-if="!!Object.keys(searchResults).length">
      <v-row dense justify="space-around">
        <v-col v-if="searchResults['biblioList']" cols="4">
          <v-card class="mx-auto">
            <v-card-title>پایگاه منابع</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle>
                    <p
                      v-if="searchResults['organizationFacet'].farsiLabel"
                      class="mb-0 text-truncate"
                    >
                      {{ searchResults["organizationFacet"].farsiLabel }}
                    </p>
                  </v-list-item-subtitle>
                </v-list-item-content>
                ({{ searchResults["organizationFacet"].count }})
              </v-list-item>
            </v-card-text>
          </v-card>
          <faucets
            class="mt-2"
            :faucet="searchResults['docTypeFacet']"
            title="نوع مدرک"
          ></faucets>
          <faucets
            class="mt-2"
            :faucet="searchResults['authorFacet']"
            title="پدیدآوران مرتبط"
          ></faucets>
          <faucets
            class="mt-2"
            :faucet="searchResults['subjectFacet']"
            title="موضوعات مرتبط"
          ></faucets>
          <faucets
            class="mt-2"
            :faucet="searchResults['publisherFacet']"
            title="ناشران مرتبط"
          ></faucets>
        </v-col>
        <v-col cols="7">
          <SearchResult />
        </v-col>
      </v-row>
    </div>
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
import faucet from "@/components/faucets.vue";
export default {
  name: "Home",

  components: { SimpleSearch, SearchResult, advSearch, faucet },
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
