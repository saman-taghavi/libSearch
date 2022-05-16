<template>
  <div>
    <v-row dense justify="space-between">
      <v-col v-if="totalResultsNumber >= 1" class="text-center">
        <v-pagination
          v-model="page"
          @click="goPage(page)"
          :length="totalPages"
          circle
        ></v-pagination>
      </v-col>
      <v-col v-else>
        <v-alert class="text-center" color="green">نتیجه ای پیدا نشد!</v-alert>
      </v-col>
    </v-row>
    <v-row
      v-if="radio === 1"
      justify="center"
      align="center"
      align-content="center"
    >
      <v-col cols="12">
        <v-virtual-scroll
          v-if="!isLoading"
          :bench="50"
          :items="searchResults.biblioList"
          max-height="900px"
          item-height="100%"
        >
          <template v-slot:default="{ item }">
            <v-list-item :disabled="isLoading" :key="item.id">
              <v-checkbox
                :value="item"
                hide-details
                @change="selectResult(item)"
                class="ma-0 pa-0"
              ></v-checkbox>
              <v-list-item-avatar class="mx-1" tile size="72">
                <v-img
                  src="https://placehold.jp/ececec/ececec/150x150.png"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  @click="goTolib(item)"
                  style="cursor: pointer"
                  class="hover-highlite"
                >
                  {{ item.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <p class="mb-0" v-if="item.mainEntry">
                    نویسنده: {{ item.mainEntry }}
                  </p>
                  <p class="mb-0" v-if="item.publisherName">
                    ناشر: {{ item.publisherName }}
                  </p>
                  <p class="mb-0" v-if="item.publishDate">
                    سال نشر: {{ cleanDate(item.publishDate) }}
                  </p>
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="goTolib(item)"
                      v-bind="attrs"
                      v-on="on"
                      icon
                      depressed
                      color="primary"
                    >
                      <v-icon>mdi-link</v-icon>
                    </v-btn>
                  </template>
                  <span>مشاهده در کتابخانه</span>
                </v-tooltip>
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>
          </template>
        </v-virtual-scroll>
        <div v-else class="text-center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="green"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-col>
    </v-row>
    <v-row dense justify="space-between">
      <v-col
        v-if="totalResultsNumber > 1"
        :class="{ 'pt-10': isLoading }"
        class="text-center"
      >
        <v-pagination
          v-model="page"
          @click="goPage(page)"
          :length="totalPages"
          circle
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "searchResult",
  data() {
    return {
      radio: 1,
    };
  },
  computed: {
    ...mapState(["isAdvSearch", "docTypes", "isLoading"]),
    ...mapGetters([
      "searchResults",
      "currentPage",
      "totalPages",
      "totalResultsNumber",
    ]),

    page: {
      get() {
        return this.currentPage + 1;
      },
      set(value) {
        if (this.isAdvSearch) {
          return;
        }
        this.simpleSearch({ first: (value - 1) * 50 });
      },
    },
  },
  methods: {
    ...mapActions(["getPage", "simpleSearch"]),
    ...mapMutations(["SET_SELECTED_RESULTS"]),
    goTolib(item) {
      let url = `http://library.alzahra.ac.ir:8080/site/catalogue/${item.id}`;
      window.open(url, "_blank").focus();
    },
    cleanDate(str) {
      if (str.lastIndexOf(".") === str.length - 1) {
        str = str.substring(0, str.length - 1);
      }

      return str;
    },
    showMaterialType(code) {
      let materialType = this.$store.state.docTypes.find(
        (element) => element.code == code
      );
      return materialType.name;
    },
    goPage(x) {
      console.log(
        "%c x =>",
        "background: #2ecc71;border-radius: 0.5em;color: white;font-weight: bold;padding: 2px 0.5em",
        x
      );
    },
    selectResult(result) {
      console.log(
        `%c e =>`,
        "background: #2ecc71;border-radius: 0.5em;color: white;font-weight: bold;padding: 2px 0.5em",
        result
      );
      this.SET_SELECTED_RESULTS(result);
    },
  },
};
</script>

<style>
.hover-highlite:hover {
  color: green;
}
</style>
