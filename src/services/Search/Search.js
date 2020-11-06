import config from '../../config';

export default class Search {
  static index(docs) {
    return config.searchEngine.create().index(docs);
  }

  static search(term) {
    if (String(term).length < 3) {
      return [];
    }

    return config.searchEngine.create().search(String(term));
  }
}
