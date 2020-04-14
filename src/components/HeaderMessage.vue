<template>
  <transition name="fade">
    <div
        v-if="show"
        class="head_message"
    >
      <p v-html="message" />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'HeaderMessage',

  computed: {
    message() {
      return this.$store.state.message || this.$store.state.appLoadingCaption;
    },
  },

  watch: {
    message() {
      if(this.message) {
        this.show = true;

        clearTimeout(this.timeoutId);

        this.timeoutId = setTimeout(() => {
          this.show = false;
        }, 10000);
      } else {
        this.show = false;
      }
    },
  },

  data() {
    return {
      timeoutId: null,
      show: false,
    };
  },
};
</script>

<style>
  .head_message {
    position: fixed;
    top: 0;
    background: #fff;
    width: 58%;
    padding: 7px 0;
    z-index: 9;
    border-bottom: 2px solid rgba(255, 45, 32, 0.9);
  }

  .head_message p {
    margin: 0 0;
    font-size: 0.8rem;
  }

  .head_message + .docs_actions {
    margin-top: 30px;
  }
</style>
