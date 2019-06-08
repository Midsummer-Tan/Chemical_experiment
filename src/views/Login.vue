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
              <v-layout align-center column justify-center fill-height>
                <!-- <h1 class="display-3 font-weight-thin mb-2">
                  SkyHawk
                  <span class="subheading font-weight-black">天鹰系统</span>
                </h1>
                <div align-center>
                  <v-divider></v-divider>
                  <v-btn flat round>用户手册</v-btn>
                  <v-btn flat round>反馈问题</v-btn>
                </div>-->
              </v-layout>
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
      password: ""
    };
  },
  methods: {
    async login() {
      this.$router.push({ path: "/collection" });
    }
  }
};
</script>


<style scopped>
.background {
  background-image: url("/images/background.jpg") !important;
  background-size: auto 100% !important;
}
</style>
