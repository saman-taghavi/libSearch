<template>
  <v-row justify="space-between" align="center" align-content="center">
    <v-col>
      <v-combobox :items="sizes" v-model="size" label="نمایش"> </v-combobox>
    </v-col>
    <v-col>
      <v-select
        :items="sortOrder"
        item-text="name"
        item-value="val"
        v-model="order"
        label="ترتیب جستجو"
        :menu-props="{
          offsetY: true,
          transition: 'slide-y-transition',
        }"
      ></v-select>
    </v-col>
    <v-col>
      <v-select
        :items="sortBy"
        item-text="name"
        item-value="val"
        v-model="by"
        label="بر اساس"
        :menu-props="{
          offsetY: true,
          transition: 'slide-y-transition',
        }"
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
      size: 50,
      sizes: [10, 50, 100],
    };
  },
  computed: {
    ...mapState(["isLoading"]),
  },
  mounted() {
    this.sortEm();
  },
  methods: {
    ...mapActions(["sortResult", "simpleSearch"]),
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
    size: function (newVal, oldQuestion) {
      this.simpleSearch({ size: newVal });
    },
  },
};
</script>

<style>
</style>