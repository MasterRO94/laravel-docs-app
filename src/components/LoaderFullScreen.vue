<template>
  <div class="loader-full-screen">
    <loader
        width="200px"
        height="200px"
        :caption="caption"
    />
  </div>
</template>

<script>
export default {
  name: 'LoaderFullScreen',
  props: {
    caption: {
      type: String,
      require: false,
      default: null,
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
</style>
