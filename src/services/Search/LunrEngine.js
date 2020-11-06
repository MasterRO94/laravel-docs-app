import lunr from 'lunr';
import SearchResultItem from '@/services/Search/SearchResultItem';

export default class LunrEngine {
  static create() {
    if (!LunrEngine.$instance) {
      LunrEngine.$instance = new this();
    }

    return LunrEngine.$instance;
  }

  index(pages) {
    this.pages = pages;

    this.idx = lunr(function () {
      this.ref('name');
      this.field('h1', { boost: 10 });
      this.field('content');
      this.field('uri');
      this.metadataWhitelist = ['position'];

      Object.values(pages).forEach(page => this.add(page));
    });
  }

  search(term) {
    this.term = term;

    return this.idx
      .search(term)
      .slice(0, 15)
      .map(result => {
        return this.createSearchResult(this.pages[result.ref], result);
      });
  }

  createSearchResult(page, resultMeta) {
    const result = new SearchResultItem();

    result.term = this.term;
    result.score = resultMeta.score;
    result.sectionTitle = page.section.title;
    result.pageName = page.name;
    result.title = page.h1;
    result.uri = page.link.uri;

    return result;
  }
}
