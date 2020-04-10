<template>
  <div>
    <section
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

  updated() {
    Prism.highlightAll();
    this.$store.commit('setCurrentPage', this.page);
  }
};
</script>
