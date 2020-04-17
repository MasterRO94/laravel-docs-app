import Application from '../../app/Application';
import SearchResultItem from './SearchResultItem';

export default class OfflineEngine {
  search(term) {
    this.prepare(term);

    Object.values(this.pages).forEach((page) => {
      this.pageTitleMatch(page);
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

  createSearchResult(page) {
    const result = new SearchResultItem();

    result.sectionTitle = page.section.title;
    result.pageName = page.name;
    result.title = page.h1;
    result.uri = page.link.uri;

    return result;
  }

  pageTitleMatch(page) {
    const result = this.createSearchResult(page);

    if (page.h1.toLowerCase() === this.term) {
      result.score += 15;
    } else if (page.h1.toLowerCase().startsWith(this.term)) {
      result.score += 0.6 * this.term.length;
    }

    if (page.links.length) {
      result.description = page.links[0].title;
      result.uri += page.links[0].uri;
    }

    if (result.score > 0) {
      this.searchResults.push(result);
    }
  }

  pageLinksMatch(page) {
    page.links.forEach((link) => {
      const result = this.createSearchResult(page);
      result.uri = `${page.link.uri}${link.uri}`;

      if (link.title.toLowerCase() === this.term) {
        result.score += 10 / link.level + 1;
      } else {
        const termWords = this.term.split(' ').map(w => w.toLowerCase());

        termWords.forEach((termWord) => {
          link.tokens.map(t => t.toLowerCase()).forEach((token) => {
            if (termWord === token && termWord.length > 2) {
              result.score += termWord.length / 10 * 1.5;
            } else if (token.startsWith(termWord)) {
              result.score += termWord.length / 5;
            } else if (token.includes(termWord)) {
              result.score += termWord.length / 10;
            }
          });

          link.stemmedTokens.map(t => t.toLowerCase()).forEach((token) => {
            if (termWord === token && termWord.length > 2) {
              result.score += termWord.length / 10 * 1.2;
            } else if (token.startsWith(termWord)) {
              result.score += termWord.length / 7;
            } else if (token.includes(termWord)) {
              result.score += termWord.length / 12;
            }
          });
        });
      }

      if (result.score > 0) {
        result.description = link.title;
        this.searchResults.push(result);
      }
    });
  }
}
