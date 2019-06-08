<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm4 md3 v-for="(item,i) in expList" :key="i">
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            :to="`/experiment/${item.id}`"
          >
            <v-img
              class="white--text"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            ></v-img>
            <v-card-title class="subheading font-weight-black">{{item.title}}</v-card-title>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      expList: [
        {
          id: 1,
          title: "自修复超分子材料的制备与测试"
        }
      ]
    };
  }
};
</script>

<style>
</style>
