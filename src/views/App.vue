<template>
  <div id="app">
    <loader-full-screen
        v-if="$store.state.appLoading"
        :caption="$store.state.appLoadingCaption"
    />

    <div v-else
         class="sidebar_layout"
    >
      <div class="page_contain">
        <div class="contain">
          <sidebar />

          <div class="body_content">
            <app-header />

            <div class="docs_body">
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './AppHeader';
import Sidebar from './Sidebar';

export default {
  components: { Sidebar, AppHeader },
};
</script>

<style>
  @import '../assets/css/app.css';

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 600px;
  }

  .sidebar {
    padding-bottom: 40px;
  }

  /*#nav {*/
  /*  padding: 30px;*/
  /*}*/

  /*#nav a {*/
  /*  font-weight: bold;*/
  /*  color: #2c3e50;*/
  /*}*/

  /*#nav a.router-link-exact-active {*/
  /*  color: #42b983;*/
  /*}*/
</style>
