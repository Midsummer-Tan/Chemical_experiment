<template>
  <v-container fluid grid-list-md>
    <v-layout row>
       <v-btn color="blue" @click="back()">返回</v-btn>
    </v-layout>
    <v-layout  row wrap  align-center justify-center fill-height>
      <video id="example_video" controls autoplay muted width="1000">
	      <source src="/videos/experiment.mp4">
      </video> 
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods:{
    back(){
      this.$router.push("/collection");
    }
  }
};
</script>

<style>
</style>
