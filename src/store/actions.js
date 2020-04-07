import Api from '../api/Api';
import Documentation from '../app/Documentation';

export default {
  loadState({ commit, dispatch }) {
    commit('setAppLoadingCaption', 'Loading...');

    // const defaultDocsVersion = localStorage.getItem('defaultDocsVersion');
    //
    // if (defaultDocsVersion) {
    //   commit('setCurrentDocsVersion', defaultDocsVersion);
    // }

    for (const version of Object.keys(Documentation.versions())) {
      const docs = localStorage.getItem(`docs.${version}`);

      if (docs) {
        commit('setDocs', { version, docs: JSON.parse(docs) });
      } else {
        dispatch('loadDocsForVersion', version);
      }
    }

    commit('setAppLoadingCaption', 'All done...');
  },

  async loadDocsForVersion({ state, dispatch }, version) {
    await dispatch('loadSections', version);
    await dispatch('loadPages', version);

    localStorage.setItem(`docs.${version}`, JSON.stringify(state.docs[version]));
  },

  async loadDocs({ commit, dispatch }) {
    commit('setAppLoadingCaption', 'Loading...');

    for (const version of Object.keys(Documentation.versions())) {
      await dispatch('loadDocsForVersion', version);
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

  setCurrentDocsVersion({ commit }, version) {
    commit('setCurrentDocsVersion', version);

    localStorage.setItem('defaultDocsVersion', version);
  },
};
