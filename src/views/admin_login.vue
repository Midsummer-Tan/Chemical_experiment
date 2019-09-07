<template>
  <v-app id="inspire" dark class="no-scrollbar">
    <v-content>
      <v-container fluid fill-height style="padding:0 !important">
        <v-scroll-y-transition>
          <v-layout justify-center align-center>
            <v-flex
              class="hidden-md-and-down background"
              style="background-color:#000; height:100%"
              md8
            >
            </v-flex>
            <v-flex xs12 md4 d-flex>
              <v-container style="padding-right:100px !important">
                <v-card-text>
                  <p class="text-md-left headline font-weight-bold mb-4 pt-3">虚拟实验平台后台管理系统</p>
                  <v-form ref="loginForm">
                    <v-text-field
                      v-model="username"
                      prepend-icon="person"
                      name="login"
                      label="用户名"
                      type="text"
                      :rules="[v => !!v || '请填写用户名']"
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      id="password"
                      prepend-icon="lock"
                      name="password"
                      label="密码"
                      type="password"
                      :rules="[v => !!v || '请填写密码']"
                      @keyup.enter="post()"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions class="pb-5">
                  <v-btn outline light color="primary" depressed @click="post()" round>登录</v-btn>
                </v-card-actions>
              </v-container>
            </v-flex>
          </v-layout>
        </v-scroll-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      username:'',
      password:'',
    };
  },
  methods: {
    post(){
      this.axios.request(
        {
          url:'/login/',
          method:'POST',
          data:{
            username:this.username,
            password:this.password
          }
        }
      ).then(response=>{
        var response=response.data
        if(response['flag']>=2){
          sessionStorage.setItem('flag',response['flag'])
          sessionStorage.setItem('adminuser',this.username)
          this.$message({message:'登录成功',type:'success'});
          this.$router.push({ path: "/adminindex" });
        }
        else if(response['flag']==1){
          this.$message({message:'权限不够',type:'error'});
        }
        else 
          this.$message({message:'用户名或密码错误',type:'error'});
      })
    }
  },
  mounted(){
    if(sessionStorage.getItem("adminuser")!=null)this.$router.push({ path: "/adminindex" });
  }
};
</script>
<style scopped>
.background {
  background-image: url("/images/background.jpg") !important;
  background-size: auto 100% !important;
}
</style>

