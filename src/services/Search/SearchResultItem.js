export default class SearchResultItem {
  constructor() {
    this.term = '';
    this.score = 0;
    this.pageName = '';
    this.uri = '';
    this.title = '';
    this.description = '';

    this.titleMatch = false;
    this.exactTitleMatch = false;
    this.partialTitleMatch = false;

    this.linkMatch = false;
    this.exactLinkMatch = false;
    this.tokenLinkMatch = false;
    this.exactTokenLinkMatch = false;
    this.stemmedTokenLinkMatch = false;

    this.tokenContentMatch = false;
    this.exactTokenContentMatch = false;
    this.stemmedTokenContentMatch = false;
  }
}
