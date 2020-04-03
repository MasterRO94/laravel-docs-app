import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appLoading: true,
    appLoadingCaption: 'Loading docs...',
  },

  mutations: {
    setAppLoading(state, loading) {
      state.appLoading = loading;
    },

    setAppLoadingCaption(state, caption) {
      state.appLoadingCaption = caption;
    }
  },
  actions: {},
  modules: {},
});
