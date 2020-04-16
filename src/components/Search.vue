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
          >
          <pre aria-hidden="true"
               style="position: absolute; visibility: hidden; white-space: pre; font-family: scandia-web, sans-serif; font-size: 16px; font-style: normal; font-variant: normal; font-weight: 400; word-spacing: 0px; letter-spacing: 0.5px; text-indent: 0px; text-rendering: auto; text-transform: none;"
               data-initialized="true"
          />
          <span class="tt-dropdown-menu"
                style="position: absolute; top: 100%; z-index: 100; display: none; left: 0px; right: auto;"
          >
            <div class="tt-dataset-0" />
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
    },
  },
};
</script>
