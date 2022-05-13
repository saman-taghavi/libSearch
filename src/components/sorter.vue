<template>
  <v-row justify="space-between" align="center" align-content="center">
    <v-col>
      <v-select
        :items="sortOrder"
        item-text="name"
        item-value="val"
        v-model="order"
        label="ترتیب جستجو"
      ></v-select>
    </v-col>
    <v-col>
      <v-select
        :items="sortBy"
        item-text="name"
        item-value="val"
        v-model="by"
        label="بر اساس"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "sorter",
  data() {
    return {
      sortOrder: [
        { name: "صعودی", val: 1 },
        { name: "نزولی", val: 0 },
      ],
      order: 1,
      sortBy: [
        { name: "عنوان", val: "title" },
        { name: "ناشر", val: "publisherName" },
        { name: "سال نشر", val: "publishDate" },
      ],
      by: "title",
    };
  },
  computed: {
    ...mapState(["isLoading"]),
  },
  mounted() {
    this.sortEm();
  },
  methods: {
    ...mapActions(["sortResult"]),
    sortEm() {
      this.sortResult({ by: this.by, order: this.order });
    },
  },
  watch: {
    // whenever question changes, this function will run
    by: function (newQuestion, oldQuestion) {
      this.sortEm();
    },
    order: function (newQuestion, oldQuestion) {
      this.sortEm();
    },
    isLoading: function (newQuestion, oldQuestion) {
      this.sortEm();
    },
  },
};
</script>

<style>
</style>