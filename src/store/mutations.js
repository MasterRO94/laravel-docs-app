import Application from '../app/Application';

export default {
  setAppLoading(state, loading) {
    state.appLoading = loading;
  },

  setAppLoadingCaption(state, caption) {
    state.appLoadingCaption = caption;
  },

  setBackgroundLoading(state, loading) {
    state.backgroundLoading = loading;
  },

  setContentLoading(state, loading) {
    state.contentLoading = loading;
  },

  setCurrentDocsVersion(state, version) {
    state.currentVersion = version;
  },

  setDocs(state, { version, docs }) {
    state.docs[version] = docs;
  },

  clearDocs(state, version) {
    state.docs[version] = {
      sections: [],
      pages: {},
    };
  },

  setSections(state, { version, sections }) {
    state.docs[version].sections = sections;
  },

  setPages(state, { version, pages }) {
    state.docs[version].pages = pages;
  },

  setCurrentPage(state, page) {
    if (!state.currentPage || state.currentPage.name !== page.name) {
      state.currentPage = page;
      Application.$bus.$emit('currentPageChanged', page);
    }
  },
};
