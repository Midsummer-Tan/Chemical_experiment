<template>
  <v-card
    width="500"
    class="mx-auto"
  >
    <v-card-title>添加用户</v-card-title>
    <v-card-text>
       <v-text-field
            v-model="username"
            :counter="10"
            label="用户名（初始密码等于用户名）"
            required
          >
        </v-text-field>
        <v-select
        v-model="user_type"
        :items="user_type_items"
        label="用户类型"
        required
      ></v-select>
    </v-card-text>
    <v-card-actions>
      <v-btn text @click="post()">提交</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      username:'',
      user_type_items:['普通用户','教师','管理员'],
      user_type:'普通用户'
    };
  },
  methods: {
    post(){
      this.axios.request(
        {
          url:'/signup/',
          method:'POST',
          data:{
            username:this.username,
            password:this.password
          }
        }
      ).then(response=>{
        var response=response.data
        if(response['check']==1){
          this.$message({message:'注册成功',type:'success'});
        }
        else 
          this.$message({message:'用户名已被注册过',type:'error'});
      })
    }
  },
};
</script>

