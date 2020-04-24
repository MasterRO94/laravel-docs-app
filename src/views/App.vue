<template>
  <div id="app">
    <loader-full-screen
        v-if="$store.state.appLoading"
    />

    <div v-else
         class="sidebar_layout"
    >
      <div class="page_contain">
        <div class="contain">
          <sidebar />

          <div class="body_content">
            <header-message />

            <app-header />

            <div class="docs_body">
              <transition name="slide-fade">
                <router-view />
              </transition>
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
import HeaderMessage from '../components/HeaderMessage';

export default {
  components: { Sidebar, AppHeader, HeaderMessage },
};
</script>

<style>
  @import '../assets/css/app.css';

  #app {
    min-height: 600px;
  }

  #app .body_content {
    padding-top: 1.25rem;
  }

  #app .docs_actions {
    margin-bottom: 2.5em;
  }

  #app .layout_transparent {
    opacity: 0.1;
  }
  #app .autocomplete-wrapper .h1 {
    font-weight: bold;
  }

  .sidebar {
    padding-bottom: 40px;
  }

  .text-center {
    text-align: center;
  }

  .back_to_top_arrow {
    position: fixed;
    bottom: 1%;
    right: 1%;
    width: 48px;
    cursor: pointer;
  }

  .beta_badge {
    transition: ease all .3s;
    color: #fc1708;
    position: absolute;
    top: 30px;
    right: 25px;
    font-weight: 100;
  }

  @media all and (max-width: 1039px) {
    .beta_badge {
      top: auto;
      bottom: 0;
      left: 15px;
    }

    .back_to_top_arrow {
      width: 30px;
    }
  }

  .nav--on .beta_badge {
    top: 30px;
    right: 10px;
    left: auto;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 45, 32, 0.9) transparent;
  }

  *::-webkit-scrollbar {
    width: 3px;
    height: 3px;
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
