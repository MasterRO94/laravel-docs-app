<template>
  <header class="docs_actions">
    <div class="version_drop">
      <div class="input_group">
        <label>Version</label>
        <div class="custom_select">
          <select
              id="version_switcher"
              aria-label="Laravel version"
              @change="handleVersionChange"
          >
            <option
                v-for="(title, version) in versions"
                :key="version"
                :value="version"
                v-text="title"
                :selected="currentVersion === version"
            />
          </select>
        </div>
      </div>
    </div>
    <div class="search_contain">
      <div class="input_group search icon">
        <span class="twitter-typeahead" style="position: relative; display: inline-block; direction: ltr;">
          <input type="text"
                 id="search-docs-input"
                 placeholder="Search Docs (In upcoming release)"
                 class="search_input tt-input"
                 aria-label="Search in the documentation"
                 autocomplete="off"
                 spellcheck="false"
                 dir="auto"
                 style="position: relative; vertical-align: top;"
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
  </header>
</template>

<script>
import Documentation from '../app/Documentation';

export default {
  name: 'AppHeader',

  created() {
    this.versions = Documentation.versions();
  },

  computed: {
    currentVersion() {
      return this.$store.state.currentVersion;
    },
  },

  methods: {
    async handleVersionChange(e) {
      const version = e.target.value;

      await this.$store.dispatch('setCurrentDocsVersion', version);

      this.$router.push({
        name: 'docsPage',
        params: {
          version,
          page: this.$store.state.currentPage.name,
        },
      });
    },
  },
};
</script>
