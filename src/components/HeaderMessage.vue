<template>
  <transition name="fade">
    <div
        v-if="show"
        :class="['head_message', `message-${this.message.event}`]"
    >
      <p v-html="message.message" />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'HeaderMessage',

  computed: {
    message() {
      return this.$store.state.messageFromMain.message
        ? this.$store.state.messageFromMain
        : {
          event: 'app-loading',
          message: this.$store.state.appLoadingCaption,
        };
    },

    timeoutTime() {
      if (!this.message || !this.message.event) {
        return 10000;
      }

      switch (this.message.event) {
        case 'message':
        case 'checking-for-update':
        case 'update-available':
        case 'update-not-available':
        case 'update-downloaded':
          return 5000;
        case 'download-progress':
          return 10000;
        case 'app-loading':
          return 20000;
        default:
          return 10000;
      }
    },
  },

  watch: {
    message() {
      if (this.message && this.message.message) {
        this.show = true;

        clearTimeout(this.timeoutId);

        this.timeoutId = setTimeout(() => {
          this.show = false;
        }, this.timeoutTime);
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
