<template>
  <v-progress-linear :indeterminate="true" v-show="x"></v-progress-linear>
</template>

<script>
export default {
  name: "Loading",
  data: () => ({
    x: false
  }),
  methods: {
    show(toggle) {
      if (toggle == true) {
        this.x = true;
      } else {
        this.x = false;
      }
    }
  }
};
</script>

<style scoped>
.v-progress-linear {
  position: absolute;
  height: 4px !important;
  margin: 0;
  z-index: 9999;
}
</style>
