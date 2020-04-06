<template>
  <aside class="sidebar">
    <a href="/" class="logo">
      <img class="mark" src="/img/logomark.min.svg" alt="Laravel">
      <img class="type" src="/img/logotype.min.svg" alt="Laravel">
    </a>
    <nav>
      <div class="navigation_contain" style="display: block;">
        <div class="docs_sidebar">
          <ul>
            <li
                v-for="section in docs"
                :key="section.title"
                :class="{'sub--on': expanded.includes(section.title)}"
            >
              <h2
                  v-text="section.title"
                  @click="toggleSection(section)"
              />
              <ul>
                <router-link
                    v-for="link in section.links"
                    :key="`${link.title} - ${link.uri}`"
                    :to="link.uri"
                    tag="li"
                >
                  <a
                      :href="`#!${link.uri}`"
                      v-text="link.title"
                  />
                </router-link>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="trigger_contain">
      <a href="#" class="nav_trigger" aria-label="Menu">
        <div class="bar"></div>
      </a>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',

  data() {
    return {
      expanded: [],
    };
  },

  computed: {
    currentPage() {
      return this.$store.state.currentPage;
    },

    docs() {
      return this.$store.state.docs[this.$store.state.currentVersion].sections;
    },
  },

  watch: {
    $route() {
      // if (this.currentPage && this.currentPage.section && !this.sectionOpened(this.currentPage.section)) {
      //   this.closeAll();
      //   this.openSection(this.currentPage.section);
      // }
    },
  },

  methods: {
    toggleSection(section) {
      this.closeAll();
      this.openSection(section);
    },

    openSection(section) {
      if (!this.expanded.includes(section.title)) {
        this.expanded.push(section.title);
      }
    },

    closeSection(section) {
      this.expanded = this.expanded.filter(title => title !== section.title);
    },

    closeAll() {
      this.expanded = [];
    },

    sectionOpened(section) {
      return this.expanded.includes(section.title);
    },
  },
};
</script>
