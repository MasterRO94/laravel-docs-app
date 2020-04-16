import Application from '../../app/Application';
import SearchResultItem from './SearchResultItem';

export default class OfflineEngine {
  search(term) {
    this.prepare(term);

    console.log(this.pages);

    Object.values(this.pages).forEach((page) => {
      this.exactPageTitleMatch(page);
      this.pageLinksMatch(page);
    });

    return Object.values(this.searchResults).sort((a, b) => {
      if (a.score > b.score) {
        return -1;
      }

      if (a.score < b.score) {
        return 1;
      }

      return 0;
    }).slice(0, 10);
  }

  prepare(term) {
    this.term = term.toLowerCase();
    this.pages = Application.$store.state.docs[Application.$store.state.currentVersion].pages;
    this.searchResults = [];
  }

  createSearchResult() {
    return new SearchResultItem();
  }

  exactPageTitleMatch(page) {
    if (page.h1.toLowerCase() !== this.term) {
      return;
    }

    const result = this.createSearchResult();
    result.score += 10;
    result.pageName = page.name;
    result.title = page.h1;
    result.uri = page.link.uri;

    this.searchResults.push(result);
  }

  pageLinksMatch(page) {
    page.links.forEach((link) => {
      const result = this.createSearchResult();
      result.pageName = page.name;
      result.title = page.h1;
      result.description = link.title;
      result.uri = `${page.link.uri}${link.uri}`;

      if (link.title.toLowerCase() === this.term) {
        result.score += 10 / link.level + 1;
      } else {
        const termWords = this.term.split(' ').map(w => w.toLowerCase());

        link.tokens.map(t => t.toLowerCase()).forEach((token) => {
          termWords.forEach((termWord) => {
            if (termWord === token && termWord.length > 2) {
              result.score += termWord.length / 10 * 1.5;
            } else if (token.includes(termWord)) {
              result.score += termWord.length / 10;
            }
          });
        });
      }

      if (result.score > 0) {
        this.searchResults.push(result);
      }
    });
  }
}
