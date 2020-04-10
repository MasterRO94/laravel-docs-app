import Documentation from '../app/Documentation';
import config from '../config';

const docs = {};

Object.keys(Documentation.versions()).forEach((version) => {
  docs[version] = {
    sections: [],
    pages: {},
  };
});

export default {
  appLoading: true,
  appLoadingCaption: 'Loading docs...',
  backgroundLoading: false,
  contentLoading: false,
  currentVersion: config.defaultVersion,
  docs: docs,
  currentPage: null,
};
