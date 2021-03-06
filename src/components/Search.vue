<template>
  <div class="search_contain">
    <div class="input_group search icon">
        <span class="twitter-typeahead" style="position: relative; display: inline-block; direction: ltr;">
          <input
            type="text"
            id="search-docs-input"
            placeholder="Search Docs"
            class="search_input tt-input"
            aria-label="Search in the documentation"
            autocomplete="off"
            spellcheck="false"
            dir="auto"
            ref="searchInput"
            style="position: relative; vertical-align: top;"
            v-model="term"
            @input="search"
            @focus="search"
            @blur="clearResults"
          >
          <span class="tt-dropdown-menu">
            <transition name="slide-fade">
              <div
                v-show="results.length"
                class="tt-dataset-0"
              >
               <span
                 v-for="(searchResult, i) in results"
                 :key="searchResult.uri"
                 :to="searchResult.uri"
                 class="tt-suggestions"
                 style="display: block;"
                 @click="goToResult(searchResult)"
                 @mouseover="markAsActive(searchResult, i)"
                 @mouseleave="markAsInActive(searchResult)"
               >
                <div
                  class="tt-suggestion"
                  :class="{'tt-cursor': activeResult && activeResult.index === i}"
                >
                  <div class="autocomplete-wrapper" style="white-space: normal;">
                    <div class="h1">
                      {{ searchResult.sectionTitle }}
                    </div>
                    <div class="sub-section">
                      <div class="h2">
                        <span class="hash">#</span>
                        {{ searchResult.title }}
                      </div>

                      <div
                        v-show="searchResult.description"
                        class="h3"
                        style="margin-left: 5px;"
                      >
                        &gt; {{ searchResult.description }}
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </div>
            </transition>
          </span>
        </span>
      <input type="submit" class="search_submit icon_display">
    </div>
  </div>
</template>

<script>
import Search from '../services/Search/Search';

export default {
  name: 'Search',

  mounted() {
    window.addEventListener(
      'keyup',
      (e) => {
        this.focusSearch(e);
        this.navigateSearchResults(e);
      },
      true,
    );
  },

  data() {
    return {
      term: '',
      results: [],
      activeResult: null,
    };
  },

  methods: {
    search() {
      this.activeResult = null;
      this.results = Search.search(this.term);
      const pageEl = document.getElementById('docsPageContent');

      if (pageEl) {
        if (this.results.length) {
          document.getElementById('docsPageContent').classList.add('layout_transparent');
        } else {
          document.getElementById('docsPageContent').classList.remove('layout_transparent');
        }
      }
    },

    clearResults() {
      setTimeout(() => {
        this.results = [];
        const pageEl = document.getElementById('docsPageContent');

        if (pageEl) {
          pageEl.classList.remove('layout_transparent');
        }
      }, 200);
    },

    goToResult(searchResult) {
      this.term = '';
      this.results = [];
      this.$router.push(searchResult.uri);
    },

    markAsActive(searchResult, index) {
      this.activeResult = { ...searchResult, index };
    },

    markAsInActive(searchResult) {
      if (this.activeResult && this.activeResult.uri === searchResult.uri) {
        this.activeResult = null;
      }
    },

    focusSearch(e) {
      if (
        (!/^[a-z0-9]$/i.test(e.key) && '/' !== e.key) ||
        this.$refs.searchInput === document.activeElement
      ) {
        return;
      }

      e.preventDefault();

      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.$refs.searchInput.focus();
      this.term += e.key !== '/' ? e.key : '';
    },

    navigateSearchResults(e) {
      if (!this.results.length) {
        return;
      }

      e.preventDefault();

      if ('ArrowDown' === e.key) {
        if (!this.activeResult) {
          this.activeResult = {
            index: 0,
            ...this.results[0],
          };
        } else if (this.results.length - 1 > this.activeResult.index) {
          this.activeResult = {
            index: this.activeResult.index + 1,
            ...this.results[this.activeResult.index + 1],
          };
        } else {
          this.activeResult = {
            index: this.results.length - 1,
            ...this.results[this.results.length - 1],
          };
        }

        return;
      }

      if ('ArrowUp' === e.key) {
        if (this.activeResult && this.activeResult.index > 0) {
          this.activeResult = {
            index: this.activeResult.index - 1,
            ...this.results[this.activeResult.index - 1],
          };
        }

        return;
      }

      if ('Enter' === e.key && this.activeResult) {
        this.goToResult(this.activeResult);
      }
    },
  },
};
</script>
