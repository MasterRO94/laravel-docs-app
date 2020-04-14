<template>
  <div :key="page.name">
    <section
        id="docsPageContent"
        class="docs_main"
        v-if="content && !contentLoading"
        v-html="content"
    />
    <section
        v-else
        class="text-center"
    >
      <loader
          width="100px"
          height="110px"
      />
    </section>
  </div>

</template>

<script>
import Prism from '../vendor/prism';

export default {
  name: 'DocsPage',

  computed: {
    page() {
      return this.$store.state.docs[this.$store.state.currentVersion].pages[this.$route.params.page];
    },

    contentLoading() {
      return this.$store.state.contentLoading;
    },

    content() {
      return this.page ? this.page.content : '';
    },
  },

  created() {
    this.$store.commit('setCurrentPage', this.page);
  },

  mounted() {
    document
      .getElementById('docsPageContent')
      .addEventListener('click', this.handleClick);
  },

  updated() {
    Prism.highlightAll();
    this.$store.commit('setCurrentPage', this.page);

    document
      .getElementById('docsPageContent')
      .addEventListener('click', this.handleClick);
  },

  methods: {
    // Navigate all docs related links via vue-router instead of page-reload link following.
    handleClick(e) {
      if (String(e.target.tagName).toLowerCase() === 'a'
        && String(e.target.getAttribute('href')).toLowerCase().startsWith('/docs')
      ) {
        e.preventDefault();

        this.$router.push(e.target.getAttribute('href'));
      }
    },
  },
};
</script>
