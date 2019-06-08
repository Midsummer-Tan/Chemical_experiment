<template>
  <v-app>
    <v-toolbar app absolute class="transparent" flat>
      <v-toolbar-side-icon class="hidden-lg-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title font-weight-bold ml-1 mr-5">虚拟实验平台</span>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-avatar color="primary" size="32px">A</v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
</style>
