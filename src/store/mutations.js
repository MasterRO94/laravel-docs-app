import Application from '../app/Application';

export default {
  setAppLoading(state, loading) {
    state.appLoading = loading;
  },

  setAppLoadingCaption(state, caption) {
    state.appLoadingCaption = caption;
  },

  setDocs(state, { version, docs }) {
    state.docs[version] = docs;
  },

  setSections(state, { version, sections }) {
    state.docs[version].sections = sections;
  },

  setPages(state, { version, pages }) {
    state.docs[version].pages = pages;
  },

  setCurrentPage(state, page) {
    state.currentPage = page;
    Application.$bus.$emit('currentPageChanged', page);
  },
};
