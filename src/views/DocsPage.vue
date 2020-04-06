<template>
  <section
      class="docs_main"
      v-html="content"
  />
</template>

<script>

export default {
  name: 'DocsPage',

  computed: {
    page() {
      return this.$store.state.docs[this.$store.state.currentVersion].pages[this.$route.params.page];
    },

    section() {
      const [section] = this.$store.state.docs[this.$store.state.currentVersion].sections.filter(
        sec => sec.links.filter(link => link.page === this.page.page),
      );

      return section;
    },

    content() {
      const content = this.page.content;
      return content ? content : 'Loading...';
    },
  },

  created() {
    this.$store.commit('setCurrentPage', {
      page: this.page,
      section: this.section,
    });
  },
};
</script>
