import config from '../../config';

export default class Search {
  static search(term) {
    if (String(term).length < 3) {
      return [];
    }

    return (new (config.searchEngine)()).search(String(term));
  }
}
