import LunrEngine from './../services/Search/LunrEngine';

export default {
  apiBaseUrl: process.env.VUE_APP_API_BASE_URL,
  defaultVersion: process.env.VUE_APP_DEFAULT_DOCS_VERSION,
  searchEngine: LunrEngine,
};
