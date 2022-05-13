<!-- Below code is tested on SheetJS v0.14.0 -->
<template>
  <v-btn
    v-if="excelData"
    type="button"
    v-on:click="onexport"
    class="text--center text-subtitle-2 font-weight-black"
  >
    دانلود خروجی اکسل</v-btn
  >
</template>

<script>
import { mapGetters } from "vuex";

import { utils, writeFile } from "xlsx/xlsx";

export default {
  name: "etoX",
  data: () => ({
    Datas: {
      // We will make a Workbook contains 2 Worksheets
      animals: [
        { name: "cat", category: "animal" },
        { name: "dog", category: "animal" },
        { name: "pig", category: "animal" },
      ],
    },
  }),
  computed: {
    ...mapGetters(["searchResults"]),
    excelData() {
      let result = [];
      let books = this.searchResults?.biblioList;
      if (this.searchResults?.biblioList) {
        for (let item in books) {
          let row = {};
          row["id"] = books[item]["id"];
          row["عنوان"] = books[item]["title"];
          row["ناشر"] = books[item]["publisherName"];
          row["تاریخ نشر"] = books[item]["publishDate"];
          //   row["هم اکنون موجود است؟"] =
          //     books[item]["hasHolding"] === false ? "در دست امانت" : "موجود است";
          result.push(row);
        }
        return result;
      }
    },
  },
  methods: {
    onexport() {
      // On Click Excel download button

      // export json to Worksheet of Excel
      // only array possible
      let book = utils.json_to_sheet(this.excelData);
      // A workbook is the name given to an Excel file
      let wb = utils.book_new(); // make Workbook of Excel

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      utils.book_append_sheet(wb, book, "کتاب ها"); // sheetAName is name of Worksheet

      // export Excel file
      writeFile(wb, "books.xlsx"); // name of the file is 'book.xlsx'
    },
  },
};
</script>
