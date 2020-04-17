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

    <transition name="fade">
      <img
          v-show="enabledScrollToTop"
          class="back_to_top_arrow"
          src="/img/up-arrow.svg"
          alt="Back to top"
          @click="toTop"
      />
    </transition>
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

  data() {
    return {
      enabledScrollToTop: false,
    };
  },

  created() {
    this.$store.commit('setCurrentPage', this.page);
  },

  mounted() {
    document
      .getElementById('docsPageContent')
      .addEventListener('click', this.handleClick);

    if (this.$route.hash) {
      setTimeout(() => {
        window.location.href = this.$route.hash;
      }, 1);
    }

    setTimeout(() => {
      this.enabledScrollToTop = window.scrollY > 50;
    }, 100);

    document.addEventListener('scroll', this.onscroll)
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

    toTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    onscroll() {
      this.enabledScrollToTop = window.scrollY > 50;
    }
  },
};
</script>
