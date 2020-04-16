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

    <search />
  </header>
</template>

<script>
import Documentation from '../app/Documentation';
import Search from '../components/Search';

export default {
  name: 'AppHeader',

  components: { Search },

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
