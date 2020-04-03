import Api from '../api/Api';
import Documentation from '../app/Documentation';

export default {
  async loadDocs({ commit, dispatch }) {
    commit('setAppLoadingCaption', 'Loading...');

    for (const version of Object.keys(Documentation.versions())) {
      await dispatch('loadSections', version);
      await dispatch('loadPages', version);
    }

    commit('setAppLoadingCaption', 'All done...');
  },

  async loadSections({ commit }, version) {
    commit('setAppLoadingCaption', `Loading documentation sections for version ${version}...`);

    const sections = await Api.loadSections(version);

    commit('setSections', { version, sections });
  },

  async loadPages({ commit }, version) {
    commit('setAppLoadingCaption', `Loading pages for version ${version}...`);

    const pagesArr = await Api.loadPages(version);

    const pages = {};
    pagesArr.forEach((page) => {
      pages[page.page] = page;
    });

    commit('setPages', { version, pages });
  },
};
