<template>
  <div id="app">
    <div
        v-if="$store.state.message"
        class="message"
    >
      <p v-text="$store.state.message" />
    </div>

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
    min-height: 600px;
  }

  .sidebar {
    padding-bottom: 40px;
  }

  .text-center {
    text-align: center;
  }

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
