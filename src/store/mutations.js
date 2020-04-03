export default {
  setAppLoading(state, loading) {
    state.appLoading = loading;
  },

  setAppLoadingCaption(state, caption) {
    state.appLoadingCaption = caption;
  },

  setSections(state, { version, sections }) {
    state.docs[version].sections = sections;
  },

  setPages(state, { version, pages }) {
    state.docs[version].pages = pages;
  },
};
