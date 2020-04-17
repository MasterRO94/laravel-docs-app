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
          <pre aria-hidden="true"
               style="position: absolute; visibility: hidden; white-space: pre; font-family: scandia-web, sans-serif; font-size: 16px; font-style: normal; font-variant: normal; font-weight: 400; word-spacing: 0px; letter-spacing: 0.5px; text-indent: 0px; text-rendering: auto; text-transform: none;"
               data-initialized="true"
          />
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
               >
                <div class="tt-suggestion">
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
    };
  },

  methods: {
    search() {
      this.results = Search.search(this.term);

      if (this.results.length) {
        document.getElementById('docsPageContent').classList.add('layout_transparent');
      } else {
        document.getElementById('docsPageContent').classList.remove('layout_transparent');
      }
    },

    clearResults() {
      setTimeout(() => {
        this.results = [];
        document.getElementById('docsPageContent').classList.remove('layout_transparent');
      }, 1000);
    },

    goToResult(searchResult) {
      this.term = '';
      this.results = [];
      this.$router.push(searchResult.uri);
    },
  },
};
</script>
