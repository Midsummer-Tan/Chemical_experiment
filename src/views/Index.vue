<template>
  <v-app>
    <v-toolbar app absolute class="transparent" flat>
      <v-toolbar-side-icon class="hidden-lg-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title font-weight-bold ml-1 mr-5">虚拟实验平台</span>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="login_dialog=true">
        退出登录
      </v-btn>
    </v-toolbar>
    <!--对话框-->
    <v-dialog
      v-model="login_dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">退出登录</v-card-title>
        <v-card-text><span style="color:orange">你确定退出此账号吗？</span></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="login_dialog  = false"
          >取消</v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="login_dialog = false;logout()"
          >确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data(){
    return{
      username:'',
      login_dialog:false,
    }
  },
  methods:{
    logout(){
      sessionStorage.clear();
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style>
</style>
