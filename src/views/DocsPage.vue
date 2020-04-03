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
    content() {
      const content = this.$store.state.docs[this.$store.state.currentVersion].pages[this.$route.params.page].content;
      return content ? content : 'Loading...';
    },
  },
};
</script>
