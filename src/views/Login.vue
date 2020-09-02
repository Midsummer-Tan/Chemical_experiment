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
                  <p class="text-md-left headline font-weight-bold mb-4 pt-3">虚拟实验平台</p>
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
                      @keyup.enter="login"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions class="pb-5">
                  <v-btn outline light color="primary" depressed @click="login" round>登录</v-btn>
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
      username: "",
      password: "",
      flag:"1",//直接登录flag=1 其他平台0,
      role:'1' //教师or学生 学生为1 教师为2 管理员为3
    };
  },
  methods: {
    async login() {
      this.axios.request(
        {
          url:'/login/',
          method:'POST',
          data:{
            username:this.username,
            password:this.password,
            flag:this.flag,
            role:this.role
          }
        }
      ).then(response=>{
        var response=response.data
        if(response['flag']>0){
          if(this.flag=="1"){
            this.$message({message:'登陆成功',type:'success'});
          }
          sessionStorage.setItem("username",this.username);
          sessionStorage.setItem("flag",response['flag']);
          this.$router.push({ path: "/collection" });
        }
        else 
          this.$message({message:'用户名或密码有误',type:'error'});
      })
    },
    getUrlParam(name){
      var url =unescape(window.location.search.substr(1)).split('?');
      var param = '';
      if(name=='token'){
        param = url[0];
      }
      else if(name=='host'){
        param = url[1];
      }
      var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
      if(param[0]==undefined){
        return null;
      }
      var r = param.match(reg)[2];
      return r;
    },
  },
  mounted(){
    this.token = this.$route.query.token;
    this.host = this.$route.query.host;
    if(this.token!=null){
      this.token = window.btoa(JSON.stringify({'token':this.token}));
      
      this.axios.request(
        {
          url:this.host + 'outer/getMessageByToken',
          method:'GET',
          params:{
            "param":this.token
          }
        }
      ).then(response=>{
        var response=response.data;
        var result = JSON.parse(window.atob(response));
        this.flag = "0";
        this.username = result['numberId'];
        if(result.role=="teacher"){
          this.role='2'
        }
        this.login();
      })
    }
    
    if(sessionStorage.getItem("username")!=null)this.$router.push({ path: "/collection" });
  }
};
</script>


<style scopped>
.background {
  background-image: url("/images/background.jpg") !important;
  background-size: auto 100% !important;
}
</style>
