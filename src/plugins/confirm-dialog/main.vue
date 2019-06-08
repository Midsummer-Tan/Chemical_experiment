<template>
  <v-layout row justify-center>
    <v-dialog dark v-model="dialog" persistent max-width="300">
      <v-card>
        <v-card-title class="subheading">{{title}}</v-card-title>
        <v-card-text>{{text}}</v-card-text>
        <v-card-actions>
          <v-layout xs12 align-center>
            <v-btn round block color="error" flat @click="cancel">取消</v-btn>
            <v-btn round block color="primary" flat @click="confirm">确认</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    title: "",
    text: ""
  },
  data: () => ({
    dialog: false
  }),

  methods: {
    show(title, text) {
      this.dialog = true;
      this.title = title;
      this.text = text;
    },
    confirm() {
      this.dialog = false;
      this.callBack(true);
    },
    cancel() {
      this.dialog = false;
      this.callBack(false);
    }
  }
};
</script>

<style>
</style>
