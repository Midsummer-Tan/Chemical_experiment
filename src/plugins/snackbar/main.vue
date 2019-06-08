<template>
  <v-snackbar :color="color" :timeout="2000" top v-model="snackbar">
    {{message}}
    <v-btn flat @click="snackbar = false">关闭</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackBar",
  data: () => ({
    snackbar: false,
    message: "",
    color: ""
  }),
  methods: {
    show(type) {
      if (type == "success") {
        this.color = "success";
        this.message = "操作成功";
      } else {
        this.color = "error darken-1";
        this.message = "操作失败";
      }
      this.snackbar = true;
    }
  }
};
</script>

<style>
</style>
