import Vue from "vue";
import Vuex from "vuex";
import axios from "@/services/api";
import toast from "./moduleToast";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    basePath: import.meta.env.BASE_URL,
    version: "1.0.0",
    simpleSearch: {
      searchResult: [],
      searchText: "",
      selectedDocTypes: [],
      params: {
        SearchField: "title",
        searchtext: "",
        size: "50",
        first: "0",
        doctype: "",
      },
    },
    docTypes: [
      {
        name: "زنان سرآمد فارسی",
        code: "RF",
      },
      {
        name: "نشریات فارسی",
        code: "IF",
      },
      {
        name: "اولویت پژوهشی فارسی",
        code: "WP",
      },
      {
        name: "رویدادهای لاتین",
        code: "JL",
      },
      {
        name: "طرح پژوهشی فارسی",
        code: "WF",
      },
      {
        name: "قوانین فارسی",
        code: "DP",
      },
      {
        name: "مراکز تحقیقاتی ملی",
        code: "KF",
      },
      {
        name: "مقالات علمی لاتین",
        code: "GL",
      },
      {
        name: "مقالات کنفرانسی لاتین",
        code: "HL",
      },
      {
        name: "پایان نامه لاتین",
        code: "ZL",
      },
      {
        name: "کتاب لاتین",
        code: "FF",
      },
      {
        name: "زنان سرآمد لاتین",
        code: "RL",
      },
      {
        name: "نشریات لاتین",
        code: "IL",
      },
      {
        name: "رویدادهای فارسی",
        code: "JF",
      },
      {
        name: "زنان پدیدآور فارسی",
        code: "MF",
      },
      {
        name: "طرح پژوهشی لاتین",
        code: "WL",
      },
      {
        name: "مراکز تحقیقاتی بین المللی",
        code: "KL",
      },
      {
        name: "مقالات علمی فارسی",
        code: "GF",
      },
      {
        name: "مقالات کنفرانسی فارسی",
        code: "HF",
      },
      {
        name: "پایان نامه فارسی",
        code: "ZF",
      },
      {
        name: "کتاب فارسی",
        code: "FL",
      },
      {
        name: "کتاب عربی",
        code: "FA",
      },
    ],
    totalResult: {
      simple: "",
      Adv: "",
    },
    isAdvSearch: false,
    isLoading: false,
  },

  mutations: {
    SET_DOCTYPES(state, value) {
      state.simpleSearch.selectedDocTypes = value;
    },
    UPDATE_SIMPLE_SEARCH_RESULT(state, results) {
      state.simpleSearch.searchResult = results;
    },
    SET_LOADING(state, loading) {
      state.isLoading = loading;
    },
    SET_SEARCH_TEXT(state, value) {
      state.simpleSearch.searchText = value;
    },
    SET_SIMPLE_SEARCH_PARAMS(state, params) {
      state.simpleSearch.params = params;
    },
    SET_SEARCH_TYPE(state, { isAdvSearch }) {
      state.isAdvSearch = isAdvSearch;
    },
  },

  actions: {
    updateSimpleSearchResult({ commit }, results) {
      commit("UPDATE_SIMPLE_SEARCH_RESULT", results);
    },
    updateLoading({ commit }, loading) {
      commit("SET_LOADING", loading);
    },
    getPage({ dispatch, commit },first) {
      dispatch("searchTitle", {
        ...this.state.simpleSearch.params,
        first: Number(this.state.simpleSearch.params.first) + first,
      });
    },
    searchTitle({ dispatch, commit }, params) {
      commit("SET_SEARCH_TYPE", false);
      commit("SET_SIMPLE_SEARCH_PARAMS", params);
      dispatch("updateLoading", true);
      axios
        .get("recordsbydoctype", {
          params,
        })
        .then((res) => {
          console.log(
            `%c  res.data `,
            "background: #2ecc71;border-radius: 0.5em;color: white;font-weight: bold;padding: 2px 0.5em",
            { res: res.data }
          );
          dispatch("updateSimpleSearchResult", res.data);
        })
        .catch((err) => {
          console.log(
            `%c  err `,
            "background: #2ecc71;border-radius: 0.5em;color: white;font-weight: bold;padding: 2px 0.5em",
            { error: err }
          );
        })
        .finally(() => {
          dispatch("updateLoading", false);
        });
    },
  },
  getters: {
    simpleTotalResults(state) {
      return state.simpleSearch.searchResult?.totalResult
        ? `تعداد نتایج ${state.simpleSearch.searchResult.totalResult}`
        : state.simpleSearch.searchResult?.totalResult;
    },
    searchResults(state) {
      return state.isAdvSearch
        ? "noting yet"
        : state.simpleSearch?.searchResult
          ? state.simpleSearch?.searchResult
          : "";
    },
  },

  modules: {
    toast,
  },
});
