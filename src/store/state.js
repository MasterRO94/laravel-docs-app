import Documentation from '../app/Documentation';

const docs = {};

Object.keys(Documentation.versions()).forEach((version) => {
  docs[version] = {
    sections: [],
    pages: [],
  };
});

export default {
  appLoading: true,
  appLoadingCaption: 'Loading docs...',
  currentVersion: '7.x',
  docs: docs,
  currentPage: null,
};
