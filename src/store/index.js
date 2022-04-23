import Vue from "vue";
import Vuex from "vuex";
import axios from "@/services/api";
import toast from "./moduleToast";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    basePath: import.meta.env.BASE_URL,
    searchResult: {},
    simpleSearch: {
      searchText: "",
      selectedDocTypes: [],
      params: {
        SearchField: "title",
        size: "50",
        first: 0,
        workgroup: 20,
      }
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
    totalResult: '',
    isAdvSearch: false,
    isLoading: false,
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
      console.log('%c doctypes =>', 'background: #2ecc71;border-radius: 0.5em;color: white;font-weight: bold;padding: 2px 0.5em', doctypes);
      state.simpleSearch.selectedDocTypes = doctypes
    }
  },

  actions: {
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
      dispatch("updateLoading", true);
      let apiParams = {
        ...state.simpleSearch.params,
        ...params
      }

      try {
        let { data } = await axios
          .get("recordsbydoctype",
            {
              params: apiParams
            }
          )

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
    }
  },
  getters: {
    totalResults(state) {
      return state.searchResult?.totalResult
        ? `تعداد نتایج ${state.searchResult.totalResult}`
        : state.searchResult?.totalResult;
    },
    searchResults(state) {
      return state.searchResult
    },
  },

  modules: {
    toast,
  },
});
