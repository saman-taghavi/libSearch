<template>
  <div>
    <v-alert class="pa-6 ma-2" dismissible>
      انتخاب نحوه نمایش نتایج
      <v-radio-group v-model="radio" mandatory row>
        <v-radio label="استایل 1" value="1"></v-radio>
        <v-radio label="استایل 2" value="2"></v-radio>
      </v-radio-group>
    </v-alert>
    <v-row dense no-gutters justify="space-between">
      <v-col cols="1">
        <v-btn
          @click="prev"
          :disabled="!isPrevEnabled"
          x-large
          icon
          color="primary"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
      <v-col align="center" cols="6">
        <p class="mb-0">
          صفحه {{ totalPages.current }}
          از
          {{ totalPages.total }}
          صفحه
        </p>
      </v-col>
      <v-col cols="1">
        <v-btn
          x-large
          icon
          color="primary"
          :disabled="!isNextEnabled"
          @click="next"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      v-if="radio === '1'"
      justify="center"
      align="center"
      align-content="center"
      class="pt-6"
    >
      <v-col cols="12">
        <v-virtual-scroll
          :bench="50"
          :items="searchResults.biblioList"
          max-height="70vh"
          item-height="100%"
        >
          <template v-slot:default="{ item }">
            <v-list-item :disabled="isLoading" :key="item.id">
              <v-list-item-avatar tile size="72">
                <v-img
                  src="http://placehold.jp/469213/ffffff/150x150.png?text=%DA%A9%D8%A7%D9%88%D8%B1%20%DA%A9%D8%AA%D8%A7%D8%A8"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
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
                  <p
                    class="mb-0"
                    v-if="
                      item.materialType &&
                      docTypes.some((e) => e.code === item.materialType)
                    "
                  >
                    {{ showMaterialType(item.materialType) }}
                  </p>
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn @click="goTolib(item)" icon depressed color="primary">
                  <v-icon>mdi-link</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>
          </template>
        </v-virtual-scroll>
      </v-col>
    </v-row>
    <v-row
      v-else
      justify="center"
      align="center"
      align-content="center"
      v-for="(result, index) in searchResults.biblioList"
      :key="index"
      class="pt-6"
    >
      <v-col lg="6">
        <v-row>
          <v-col cols="3">
            <v-avatar size="72" tile>
              <v-img
                contain
                src="http://placehold.jp/469213/ffffff/150x150.png?text=%DA%A9%D8%A7%D9%88%D8%B1%20%DA%A9%D8%AA%D8%A7%D8%A8"
              ></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <v-card @click="goTolib(result)">
              <v-card-title>
                <p class="mb-0 fix-word-break" v-if="result.title">
                  {{ result.title }}
                </p>
              </v-card-title>
              <v-card-subtitle class="pb-0">
                <p class="mb-0" v-if="result.mainEntry">
                  نویسنده: {{ result.mainEntry }}
                </p>
                <p class="mb-0" v-if="result.publisherName">
                  ناشر: {{ result.publisherName }}
                </p>
                <p class="mb-0" v-if="result.publishDate">
                  سال نشر: {{ cleanDate(result.publishDate) }}
                </p>
                <p
                  class="mb-0"
                  v-if="
                    result.materialType &&
                    docTypes.some((e) => e.code === result.materialType)
                  "
                >
                  {{ showMaterialType(result.materialType) }}
                </p>
              </v-card-subtitle>
              <v-card-actions>
                <v-btn @click="goTolib(result)" depressed color="primary">
                  مشاهده در کتابخانه
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "searchResult",
  data() {
    return {
      radio: "",
    };
  },
  computed: {
    ...mapState(["isAdvSearch", "simpleSearch", "docTypes", "isLoading"]),
    searchResults() {
      return this.isAdvSearch
        ? "noting yet"
        : this.simpleSearch?.searchResult
        ? this.simpleSearch?.searchResult
        : "";
    },
    totalPages() {
      if (this.simpleSearch.searchResult?.totalResult) {
        return {
          total: Math.ceil(this.simpleSearch.searchResult.totalResult / 50) + 1,
          current: Math.ceil(this.simpleSearch.params.first / 50) + 1,
        };
      }
      return "";
    },
    isNextEnabled() {
      if (this.isLoading || this.totalPages.current === this.totalPages.total) {
        return false;
      }
      return true;
    },
    isPrevEnabled() {
      if (this.isLoading || this.totalPages.current <= 1) {
        return false;
      }
      return true;
    },
  },
  methods: {
    ...mapActions(["getPage"]),
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
    next() {
      this.getPage(50);
    },
    prev() {
      this.getPage(-50);
    },
  },
};
</script>

<style>
</style>