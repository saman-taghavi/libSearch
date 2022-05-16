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
        name: "زنان سرآمد ",
        code: "RF",
      },
      {
        name: "نشریه های علمی",
        code: "IF",
      },
      {
        name: "اولویت پژوهشی",
        code: "WP",
      },
      {
        name: "رویدادهای خارجی",
        code: "JL",
      },
      {
        name: "طرح ها",
        code: "WF",
      },
      {
        name: "قوانین و مصوبات",
        code: "DP",
      },
      {
        name: "مراکز تحقیقاتی داخلی",
        code: "KF",
      },
      {
        name: "کتاب ها",
        code: "FF",
      },
      {
        name: "رویدادهای داخلی",
        code: "JF",
      },
      {
        name: "زنان پدیدآور",
        code: "MF",
      },
      {
        name: "مراکز تحقیقاتی خارجی",
        code: "KL",
      },
      {
        name: "مقاله های نشریه های علمی",
        code: "GF",
      },
      {
        name: "مقاله های همایشی",
        code: "HF",
      },
      {
        name: "پایان نامه ها",
        code: "ZF",
      },
    ],
    totalResult: "",
    isAdvSearch: false,
    isLoading: false,
    advSearchFields: searchFields,
    selectedResults: [],
    faucetLevel: 1,
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
    SET_SELECTED_RESULTS(state, result) {
      const index = state.selectedResults.findIndex((object) => {
        return object === result;
      });
      if (index > -1) {
        state.selectedResults.splice(index, 1);
      } else {
        state.selectedResults.push(result);
      }
    },
    SET_FAUCET_LEVEL(state) {
      state.faucetLevel++;
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
    async searchAgain({ dispatch, state }) {
      await dispatch("simpleSearch", state.simpleSearch.params);
    },
  },
  getters: {
    totalResults(state) {
      return state.searchResult?.totalResult
        ? `تعداد نتایج ${state.searchResult.totalResult}`
        : state.searchResult?.totalResult;
    },
    searchResults(state) {
      for (let item in state.searchResult) {
        if (
          item != "organizationFacet" &&
          state.searchResult[item].constructor === Object
        ) {
          state.searchResult[item] = [state.searchResult[item]];
        }
      }
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
      let params = state.simpleSearch.params;
      let results = state.searchResult?.totalResult ?? 0;
      return Math.ceil(results / params.size);
    },
    selectedResults(state) {
      return state.selectedResults;
    },
  },

  modules: {
    toast,
  },
});
