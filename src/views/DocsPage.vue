<template>
  <section
      class="docs_main"
      v-if="content"
      v-html="content"
  />
</template>

<script>
import Prism from '../vendor/prism';

export default {
  name: 'DocsPage',

  computed: {
    page() {
      return this.$store.state.docs[this.$store.state.currentVersion].pages[this.$route.params.page];
    },

    section() {
      const [section] = this.$store.state.docs[this.$store.state.currentVersion].sections.filter(
        sec => sec.links.filter(link => link.page === this.page.page).length,
      );

      return section;
    },

    content() {
      return this.page ? this.page.content : '';
    },
  },

  created() {
    this.$store.commit('setCurrentPage', {
      page: this.page,
      section: this.section,
    });
  },

  updated() {
    Prism.highlightAll();
  }
};
</script>
