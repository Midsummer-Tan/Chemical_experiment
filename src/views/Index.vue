<template>
  <v-app>
    <v-toolbar app absolute class="transparent" flat>
      <v-toolbar-side-icon class="hidden-lg-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title font-weight-bold ml-1 mr-5">
        INSBIM
        <span class="dim-subtitle">| {{name}}</span>
      </span>
      <v-spacer></v-spacer>
      <!-- <v-btn icon class="ml-3">
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>help_outline</v-icon>
      </v-btn>-->
    </v-toolbar>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
</style>
