import Vue from "vue";
import Vuex from "vuex";
import axios from "@/services/api";
import toast from "./moduleToast";
import searchFields from "@/constants/searchFields";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    basePath: import.meta.env.BASE_URL,
    searchResult: {},
    simpleSearch: {
      searchText: "",
      selectedDocTypes: [],
      params: {
        SearchField: "",
        size: "50",
        first: 0,
        workgroup: 20,
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
    totalResult: "",
    isAdvSearch: false,
    isLoading: false,
    advSearchFields: searchFields,
  },

  mutations: {
    UPDATE_SEARCH_RESULT(state, results) {
      state.searchResult = results;
    },
    SET_LOADING(state, loading) {
      state.isLoading = loading;
    },
    SET_SEARCH_TYPE(state, { isAdvSearch }) {
      state.isAdvSearch = isAdvSearch;
    },
    SET_SIMPLE_SEARCH_DOCTYPES(state, doctypes) {
      state.simpleSearch.selectedDocTypes = doctypes;
    },
    SET_SIMPLE_SEARCH_PARAMS(state, params) {
      state.simpleSearch.params = { ...state.simpleSearch.params, ...params };
    },
    SET_SORTED_RESULT(state, sortedbiblio) {
      state.searchResult["biblioList"] = sortedbiblio;
    },
  },

  actions: {
    setSearchType({ commit }, type) {
      commit("SET_SEARCH_TYPE", type);
    },
    updateLoading({ commit }, loading) {
      commit("SET_LOADING", loading);
    },
    getPage({ dispatch, commit }, first) {
      dispatch("searchTitle", {
        ...this.state.simpleSearch.params,
        first: Number(this.state.simpleSearch.params.first) + first,
      });
    },
    async simpleSearch({ dispatch, commit, state }, params) {
      commit("SET_SEARCH_TYPE", { isAdvSearch: false });
      commit("SET_SIMPLE_SEARCH_PARAMS", params);
      dispatch("updateLoading", true);

      try {
        let { data } = await axios.get("recordsbydoctype", {
          params: state.simpleSearch.params,
        });

        commit("UPDATE_SEARCH_RESULT", data);
      } catch (error) {
        console.log(
          `%c  err `,
          "background: #2ecc71;border-radius: 0.5em;color: white;font-weight: bold;padding: 2px 0.5em",
          { error }
        );
      } finally {
        dispatch("updateLoading", false);
      }
    },
    sortResult({ commit, state }, sortData) {
      let unsortedbiblio = state.searchResult["biblioList"];

      let sortedbiblio =
        sortData.order === 1
          ? unsortedbiblio.sort((x, y) => {
              if (x[sortData.by] === undefined) {
                return 1;
              }
              if (y[sortData.by] === undefined) {
                return -1;
              }
              return x[sortData.by].localeCompare(y[sortData.by], "fa");
            })
          : unsortedbiblio.sort((x, y) => {
              if (x[sortData.by] === undefined) {
                return 1;
              }
              if (y[sortData.by] === undefined) {
                return -1;
              }
              return y[sortData.by].localeCompare(x[sortData.by], "fa");
            });

      commit("SET_SORTED_RESULT", sortedbiblio);
    },
  },
  getters: {
    totalResults(state) {
      return state.searchResult?.totalResult
        ? `تعداد نتایج ${state.searchResult.totalResult}`
        : state.searchResult?.totalResult;
    },
    searchResults(state) {
      return state.searchResult;
    },
    totalResultsNumber(state, getters) {
      return Number(getters.searchResults?.totalResult) ?? 0;
    },
    currentPage(state) {
      if (state.isAdvSearch) {
        return "NotImplemented";
      }
      let params = state.simpleSearch.params;
      return Math.ceil(params.first / params.size);
    },
    totalPages(state) {
      let results = state.searchResult?.totalResult ?? 0;
      return Math.ceil(results / 50);
    },
  },

  modules: {
    toast,
  },
});
