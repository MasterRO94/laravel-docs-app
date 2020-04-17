<template>
  <div class="search_contain">
    <div class="input_group search icon">
        <span class="twitter-typeahead" style="position: relative; display: inline-block; direction: ltr;">
          <input type="text"
                 id="search-docs-input"
                 placeholder="Search Docs"
                 class="search_input tt-input"
                 aria-label="Search in the documentation"
                 autocomplete="off"
                 spellcheck="false"
                 dir="auto"
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
                   v-for="searchResult in results"
                   :key="searchResult.uri"
                   :to="searchResult.uri"
                   class="tt-suggestions"
                   style="display: block;"
                   @click="goToResult(searchResult)"
                   @mouseover="markAsActive(searchResult)"
                   @mouseleave="markAsInActive(searchResult)"
               >
                <div
                    class="tt-suggestion"
                    :class="{'tt-cursor': activeResult === searchResult.uri}"
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

  data() {
    return {
      term: '',
      results: [],
      activeResult: null,
    };
  },

  methods: {
    search() {
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

    markAsActive(searchResult) {
      this.activeResult = searchResult.uri;
    },

    markAsInActive(searchResult) {
      if (this.activeResult === searchResult.uri) {
        this.activeResult = null;
      }
    },
  },
};
</script>
