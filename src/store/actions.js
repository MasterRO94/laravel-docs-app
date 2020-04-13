import Api from '../api/Api';
import Documentation from '../app/Documentation';

export default {
  async loadState({ state, commit, dispatch }) {
    commit('setAppLoadingCaption', 'Loading...');

    const defaultDocsVersion = localStorage.getItem('defaultDocsVersion');

    if (defaultDocsVersion) {
      commit('setCurrentDocsVersion', defaultDocsVersion);
    } else {
      localStorage.setItem('defaultDocsVersion', state.currentVersion);
    }

    if (!localStorage.getItem(`docs.${defaultDocsVersion}`)) {
      commit('setAppLoading', true);
    }

    for (const version of Object.keys(Documentation.versions())) {
      const docs = localStorage.getItem(`docs.${version}`);

      if (!docs) {
        await dispatch('loadDocsForVersion', version);

        if (state.currentVersion !== version) {
          commit('clearDocs', version);
        }
      } else if(state.currentVersion === version) {
        commit('setDocs', { version, docs: JSON.parse(docs) });
      }
    }

    commit('setAppLoadingCaption', 'All done...');
    commit('setAppLoading', false);
  },

  async loadDocsForVersion({ state, dispatch }, version) {
    await dispatch('loadSections', version);
    await dispatch('loadPages', version);

    localStorage.setItem(`docs.${version}`, JSON.stringify(state.docs[version]));
  },

  async loadDocs({ commit, dispatch }) {
    commit('setBackgroundLoading', true);

    for (const version of Object.keys(Documentation.versions())) {
      await dispatch('loadDocsForVersion', version);
    }

    commit('setBackgroundLoading', false);
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
      pages[page.name] = page;
    });

    commit('setPages', { version, pages });
  },

  async setCurrentDocsVersion({ state, commit, dispatch }, version) {
    commit('setContentLoading', true);

    const previousVersion = state.currentVersion;

    let docs = localStorage.getItem(`docs.${version}`);

    if (!docs) {
      commit('setAppLoading', true);
      await dispatch('loadDocsForVersion', version);
    }

    commit('setDocs', { version, docs: JSON.parse(docs) });
    commit('setCurrentDocsVersion', version);
    commit('clearDocs', previousVersion);

    commit('setAppLoading', false);
    commit('setContentLoading', false);

    localStorage.setItem('defaultDocsVersion', version);
  },
};
