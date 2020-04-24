<template>
  <div class="loader-full-screen">
    <loader
        width="200px"
        height="200px"
        :caption="caption"
    />

    <div
        v-if="null !== progress"
        class="loading-progress-wrapper"
    >
      <div class="loading-progress-holder">
        <div
            class="loading-progress"
            :style="`width: ${progress}%`"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoaderFullScreen',

  computed: {
    caption() {
      return this.$store.state.appLoadingCaption;
    },

    progress() {
      return this.$store.state.appLoadingProgress;
    },
  },
};
</script>

<style scoped>
  .loader-full-screen {
    position: absolute;
    width: 100%;
    height: 100%;
    min-height: 600px;
  }

  .loading-progress-wrapper {
    width: 100%;
    height: 6px;
    position: absolute;
    top: 70%;
    text-align: center;
  }

  .loading-progress-holder {
    display: inline-block;
    width: 90%;
    height: 6px;
    border-radius: 20%;
    border: 1px solid #fc1708;
  }

  .loading-progress {
    width: 10%;
    background-color: rgba(255, 45, 32, 0.9);
    height: 100%;
    transition: all ease 1s;
  }
</style>
