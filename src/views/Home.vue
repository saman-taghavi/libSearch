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
            v-if="searchResults['docTypeFacet']"
            :faucet="searchResults['docTypeFacet']"
            title="نوع مدرک"
          ></faucets>
          <faucets
            v-if="searchResults['authorFacet']"
            class="mt-2"
            :faucet="searchResults['authorFacet']"
            title="پدیدآوران مرتبط"
          ></faucets>
          <faucets
            v-if="searchResults['subjectFacet']"
            class="mt-2"
            :faucet="searchResults['subjectFacet']"
            title="موضوعات مرتبط"
          ></faucets>
          <faucets
            class="mt-2"
            v-if="searchResults['publisherFacet']"
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
      <v-col cols="3" class="pa-1" v-for="(n, index) in pics" :key="index">
        <v-img
          v-ripple
          @click="setSearch(n)"
          :aspect-ratio="16 / 9"
          :src="getImageSrc(index + 1)"
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
      pics: [
        { name: "زنان سرآمد", select: ["RF"] },
        { select: ["MF"], name: "زنان پدیدآور" },
        { select: ["JF"], name: "رویدادهای داخلی" },
        { select: ["JL"], name: "رویداد های خارجی" },
        { select: ["FF"], name: "کتاب ها" },
        { select: ["IF"], name: "نشریه های علمی" },
        { select: ["WF"], name: "طرح ها " },
        { select: ["HF"], name: "مقاله های همایشی" },
        { select: ["GF"], name: "مقاله های نشریه های علمی" },
        { select: ["ZF"], name: "پایان نامه ها" },
        { select: ["DP"], name: "قوانین و مصوبات" },
        { select: ["WP"], name: "اولویت های پژوهشی" },
        { select: ["KL"], name: "مراکز تحقیقاتی خارجی" },
        { select: ["KF"], name: "مراکز تحقیقاتی داخلی " },
      ],
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
    setSearch(n) {
      this.$store.commit("SET_SIMPLE_SEARCH_DOCTYPES", n.select);
    },
  },
};
</script>
<style scoped>
.grey {
  filter: grayscale(100%);
}
</style>
