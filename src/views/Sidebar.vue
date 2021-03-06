<template>
  <aside class="sidebar">
    <router-link to="/" class="logo">
      <loader
          v-if="loading"
          width="50px"
          height="52px"
      />
      <img v-else class="mark" src="/img/logomark.min.svg" alt="Laravel">
      <img class="type" src="/img/logotype.min.svg" alt="Laravel">

      <span class="beta_badge">
        Beta
      </span>
    </router-link>
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
                <template
                    v-for="link in section.links"
                >
                  <router-link
                      v-if="!link.uri.startsWith('http')"
                      :key="`${link.title} - ${link.uri}`"
                      :to="link.uri.replace('#/', '')"
                      tag="li"
                  >
                    <a
                        :href="`${link.uri}`"
                        v-text="link.title"
                    />
                  </router-link>
                  <li
                      v-else
                      :key="`${link.title} - ${link.uri}`"
                  >
                    <a
                        :href="link.uri"
                        v-text="link.title"
                    />
                  </li>
                </template>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="trigger_contain">
      <a
          href="!#"
          class="nav_trigger"
          aria-label="Menu"
          @click.prevent="toggleNav"
      >
        <div
            :class="['bar', {animate: navOpened}]"
        />
      </a>
    </div>
  </aside>
</template>

<script>
import Application from '../app/Application';

export default {
  name: 'Sidebar',

  data() {
    return {
      expanded: [],
      navOpened: false,
    };
  },

  created() {
    Application.$bus.$on('currentPageChanged', (currentPage) => {
      if (currentPage && currentPage.section && !this.sectionOpened(currentPage.section)) {
        this.openSection(currentPage.section);
      }
    });
  },

  computed: {
    currentPage() {
      return this.$store.state.currentPage;
    },

    docs() {
      return this.$store.state.docs[this.$store.state.currentVersion].sections;
    },

    loading() {
      return this.$store.state.backgroundLoading;
    },
  },

  methods: {
    toggleSection(section) {
      if (!this.sectionOpened(section)) {
        this.openSection(section);
      } else {
        this.closeSection(section);
      }
    },

    openSection(section) {
      if (!this.sectionOpened(section)) {
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

    toggleNav() {
      this.navOpened = !this.navOpened;
      document.getElementsByTagName('html')[0].classList.toggle('nav--on');
    }
  },
};
</script>

<style>
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 45, 32, 0.9) transparent;
  }

  *::-webkit-scrollbar {
    width: 3px;
  }
  *::-webkit-scrollbar-track {
    background: transparent;
  }
  *::-webkit-scrollbar-thumb {
    background-color: rgba(255, 45, 32, 0.9);
    border-radius: 20%;
    border: 1px solid #fc1708;
  }
</style>
