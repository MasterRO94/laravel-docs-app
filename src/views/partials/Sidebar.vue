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
                <li
                    v-for="link in section.links"
                    :key="`${link.title} - ${link.uri}`"
                >
                  <router-link :to="link.uri">
                    {{ link.title }}
                  </router-link>
                </li>
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
    docs() {
      return this.$store.state.docs[this.$store.state.currentVersion].sections;
    },
  },

  methods: {
    toggleSection(section) {
      if (!this.expanded.includes(section.title)) {
        this.expanded.push(section.title);
      } else {
        this.expanded = this.expanded.filter(title => title !== section.title);
      }
    },
  },
};
</script>
