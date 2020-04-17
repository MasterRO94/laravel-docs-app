import Application from '../../app/Application';
import SearchResultItem from './SearchResultItem';

export default class OfflineEngine {
  search(term) {
    this.prepare(term);

    Object.values(this.pages).forEach((page) => {
      this.pageTitleMatch(page);
      this.pageLinksMatch(page);
      // Implement better content search
      // this.pageContentMatch(page);
    });

    return Object.values(this.searchResults).sort((a, b) => {
      if (a.score > b.score) {
        return -1;
      }

      if (a.score < b.score) {
        return 1;
      }

      return 0;
    }).slice(0, 15);
  }

  prepare(term) {
    this.term = term.toLowerCase();
    this.termWords = this.term.split(' ').map(w => w.toLowerCase());
    this.pages = Application.$store.state.docs[Application.$store.state.currentVersion].pages;
    this.searchResults = [];
  }

  createSearchResult(page) {
    const result = new SearchResultItem();

    result.term = this.term;
    result.sectionTitle = page.section.title;
    result.pageName = page.name;
    result.title = page.h1;
    result.uri = page.link.uri;

    return result;
  }

  addSearchResult(result) {
    const [existed] = this.searchResults.filter(r => r.uri === result.uri);

    if (existed) {
      if (result.score < existed.score) {
        result.uri = existed.uri;
      }

      result.score = result.score * 0.7 + existed.score * 0.7;

      result.titleMatch = existed.titleMatch || result.titleMatch;
      result.exactTitleMatch = existed.exactTitleMatch || result.exactTitleMatch;
      result.partialTitleMatch = existed.partialTitleMatch || result.partialTitleMatch;

      result.linkMatch = existed.linkMatch || result.linkMatch;
      result.exactLinkMatch = existed.exactLinkMatch || result.exactLinkMatch;
      result.tokenLinkMatch = existed.tokenLinkMatch || result.tokenLinkMatch;
      result.exactTokenLinkMatch = existed.exactTokenLinkMatch || result.exactTokenLinkMatch;
      result.stemmedTokenLinkMatch = existed.stemmedTokenLinkMatch || result.stemmedTokenLinkMatch;

      result.tokenContentMatch = existed.tokenContentMatch || result.tokenContentMatch;
      result.exactTokenContentMatch = existed.exactTokenContentMatch || result.exactTokenContentMatch;
      result.stemmedTokenContentMatch = existed.stemmedTokenContentMatch || result.stemmedTokenContentMatch;

      this.searchResults = this.searchResults.filter(r => r.uri !== result.uri);
    }

    this.searchResults.push(result);
  }

  pageTitleMatch(page) {
    const result = this.createSearchResult(page);

    if (page.h1.toLowerCase() === this.term) {
      result.score += 15;
      result.titleMatch = true;
      result.exactTitleMatch = true;
    } else if (page.h1.toLowerCase().startsWith(this.term)) {
      result.score += 0.6 * this.term.length;
      result.titleMatch = true;
      result.partialTitleMatch = true;
    }

    if (page.links.length) {
      result.description = page.links[0].title;
      result.uri += page.links[0].uri;
    }

    if (result.score > 0) {
      this.addSearchResult(result);
    }
  }

  pageLinksMatch(page) {
    page.links.forEach((link) => {
      const result = this.createSearchResult(page);
      result.uri += link.uri;

      if (link.title.toLowerCase() === this.term) {
        result.score += 15 + 10 / link.level + 1;
        result.linkMatch = true;
        result.exactLinkMatch = true;
      } else {
        this.termWords.forEach((termWord) => {
          link.tokens.map(t => t.toLowerCase()).forEach((token) => {
            if (termWord === token && termWord.length > 2) {
              result.score += termWord.length / 10 * 1.9;
              result.linkMatch = true;
              result.tokenLinkMatch = true;
              result.exactTokenLinkMatch = true;
            } else if (token.startsWith(termWord)) {
              result.score += termWord.length / 10 * 1.6;
              result.linkMatch = true;
              result.tokenLinkMatch = true;
            } else if (token.includes(termWord)) {
              result.score += termWord.length / 10 * 1.1;
              result.linkMatch = true;
              result.tokenLinkMatch = true;
            } else if (termWord.startsWith(token)) {
              result.score += termWord.length / 10 * 1.6;
              result.linkMatch = true;
              result.tokenLinkMatch = true;
            } else if (termWord.includes(token)) {
              result.score += termWord.length / 10 * 1.1;
              result.linkMatch = true;
              result.tokenLinkMatch = true;
            }
          });

          link.stemmedTokens.map(t => t.toLowerCase()).forEach((token) => {
            if (termWord === token && termWord.length > 2) {
              result.score += termWord.length / 10 * 1.2;
              result.linkMatch = true;
              result.stemmedTokenLinkMatch = true;
            } else if (token.startsWith(termWord)) {
              result.score += termWord.length / 7;
              result.linkMatch = true;
              result.stemmedTokenLinkMatch = true;
            } else if (token.includes(termWord)) {
              result.score += termWord.length / 12;
              result.linkMatch = true;
              result.stemmedTokenLinkMatch = true;
            } else if (termWord.startsWith(token)) {
              result.score += termWord.length / 7;
              result.linkMatch = true;
              result.stemmedTokenLinkMatch = true;
            } else if (termWord.includes(token)) {
              result.score += termWord.length / 12;
              result.linkMatch = true;
              result.stemmedTokenLinkMatch = true;
            }
          });
        });
      }

      if (result.score > 0) {
        if (link.parent) {
          result.description = `${link.parent.title} > `;
        }

        result.description += link.title;

        this.addSearchResult(result);
      }
    });
  }

  pageContentMatch(page) {
    const result = this.createSearchResult(page);

    this.termWords.forEach((termWord) => {
      page.tokens.map(t => t.toLowerCase()).forEach((token) => {
        if (termWord === token && termWord.length > 2) {
          result.score += termWord.length / 100 * 1.3;
          result.tokenContentMatch = true;
          result.exactTokenContentMatch = true;
        } else if (token.startsWith(termWord)) {
          result.score += termWord.length / 100 * 1.2;
          result.tokenContentMatch = true;
        } else if (token.includes(termWord)) {
          result.score += termWord.length / 100 * 1.1;
          result.tokenContentMatch = true;
        } else if (termWord.startsWith(token)) {
          result.score += termWord.length / 100 * 1.2;
          result.tokenContentMatch = true;
        } else if (termWord.includes(token)) {
          result.score += termWord.length / 100 * 1.1;
          result.tokenContentMatch = true;
        }
      });

      page.stemmedTokens.map(t => t.toLowerCase()).forEach((token) => {
        if (termWord === token && termWord.length > 2) {
          result.score += termWord.length / 100 * 1.1;
          result.stemmedTokenContentMatch = true;
        } else if (token.startsWith(termWord)) {
          result.score += termWord.length / 100 * 1.09;
          result.stemmedTokenContentMatch = true;
        } else if (token.includes(termWord)) {
          result.score += termWord.length / 100 * 1.05;
          result.stemmedTokenContentMatch = true;
        } else if (termWord.startsWith(token)) {
          result.score += termWord.length / 100 * 1.09;
          result.stemmedTokenContentMatch = true;
        } else if (termWord.includes(token)) {
          result.score += termWord.length / 100 * 1.05;
          result.stemmedTokenContentMatch = true;
        }
      });
    });


    if (result.score > 0) {
      if (page.links.length) {
        result.description = page.links[0].title;
        result.uri += page.links[0].uri;
      }

      this.addSearchResult(result);
    }
  }
}
