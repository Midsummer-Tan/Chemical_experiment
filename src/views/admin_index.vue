<template>
  <div height='100vh'>
    <el-menu @select="handleSelect" mode="horizontal" :default-active="youflag+''" 
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
      <el-menu-item index="3" v-if="youflag==3">
        <i class="el-icon-document"></i>
        <span slot="title">添加用户</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-setting"></i>
        <span slot="title">查看用户学习情况</span>
      </el-menu-item>
      <v-btn style="float:right" color='pink' @click="login_dialog=true">退出登录</v-btn>
    </el-menu>
    
    <div v-if='context==1'>
      <br>
      <el-row justify="center" :gutter="50" type="flex">
        <el-col :span='10'>
          <v-form>
            <h1>添加用户</h1><br><br>
            <v-text-field
            v-model="username"
            :counter="10"
            label="用户名（初始密码等于用户名）"
            required
            ></v-text-field>
            <v-select
              v-model="user_type"
              :items="user_type_items"
              label="用户类型"
              required
            ></v-select>
            <v-btn text @click="post()">提交</v-btn>
          </v-form>
        </el-col>
        <el-col :span='10'>
          <v-form>
            <h1>删除用户</h1><br><br>
            <el-table
              :data="userlist"
              border
              style="width: 100%">
              <el-table-column
                prop="username"
                label="用户名"
                >
              </el-table-column>
              <el-table-column
                prop="flag"
                label="权限"
                >
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
        　　　　　　<el-button type="danger" @click="deleteUser(scope.row.username)">删除</el-button>
        　　　　</template>
              </el-table-column>
            </el-table>
          </v-form>
        </el-col>
      </el-row>
    </div>
      

    <div v-else-if='context==2'>
      <el-row justify="center" type="flex">
        <el-col :span="20">
          <br>
          <el-row type="flex"  justify="center">
            <el-col :span="12">
              <h1>用户学习情况</h1>
            </el-col>
            <el-col :span ='12'>
              <v-btn text color="pink" @click="downloadtable()">导出情况表格</v-btn>
            </el-col>
          </el-row>
          <br><br>
          
          <el-table
            :data="userscorelist"
            border
            style="width: 100%">
            <el-table-column
              prop="username"
              label="用户名"
              >
            </el-table-column>
            <el-table-column
              prop="step1score_situation"
              label="反应前期准备完成情况"
              >
            </el-table-column>
            <el-table-column
              prop="step2score_situation"
              label="搭建反应装置完成情况"
              >
            </el-table-column>
            <el-table-column
              prop="step3score_situation"
              label="聚合物合成完成情况"
              >
            </el-table-column>
            <el-table-column
              prop="step4score_situation"
              label="鉴定表征完成情况"
              >
            </el-table-column>
            <el-table-column
              prop="allscore"
              label="总分"
              >
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
        
      </div>
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

  </div>
</template>

<script>
import step1Function from '../js/step1func.js';
import step2Function from '../js/step2func.js';
import step3Function from '../js/step3func.js';
import step4Function from '../js/step4func.js';
export default {
  mixins:[step1Function,step2Function,step3Function,step4Function],
  data() {
    return {
      user:'',
      username:'',
      user_type_items:['普通用户','教师','管理员'],
      user_type:'普通用户',
      context:0,
      youflag:0,
      flag:1,
      userlist:[],
      userexperimentlist:[],
      userscorelist:[],
      login_dialog:false
    };
  },
  methods: {
    post(){
      switch (this.user_type) {
        case '普通用户':
          this.flag=1;
          break;
        case '教师':
          this.flag=2;
          break;
        case '管理员':
          this.flag=3;
          break;
        default:
          break;
      }
      this.axios.request(
        {
          url:'/signup/',
          method:'POST',
          data:{
            username:this.username,
            password:this.username,
            flag:this.flag
          }
        }
      ).then(response=>{
        var response=response.data
        if(response['check']==1){
          this.$message({message:'注册成功',type:'success'});
          this.getUserInfor();
          this.getExperimentScore();
          this.getUserScoreList();
        }
        else 
          this.$message({message:'用户名已被注册过',type:'error'});
      })
    },
    deleteUser(username){
      this.$confirm('即将删除','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'}).
        then(()=>{
          this.axios.request(
        {
          url:'/login/',
          method:'DELETE',
          data:{
            username:username,
          }
        }
        ).then(response=>{
          this.$message({message: "删除成功", type : 'success'})
          this.getUserInfor();
          this.getExperimentScore();
          this.getUserScoreList();
            })
          }).catch(()=>{
            this.$message({
                type:'info',
                message:'删除取消'
                    })
              })
    },
    handleSelect(index){
      if(index==3){
        this.context = 1;
      }
      else if(index==2){
        this.context = 2;
      }
    },
    getUserInfor(){
      this.axios.request({
      url:'/login/',
      method:'GET'
      }).then(data=>{
        data = data.data;
        this.userlist=[];
        var power={'1':'普通用户','2':'教师','3':'管理员'}
        for(var i=0;i<data.length;i++){
          var dict = {} 
          dict['flag'] = power[data[i].flag+''];
          dict['username'] = data[i].username;
          this.userlist.push(dict);
        }
    });
    },
    getUserScoreList(){
      this.axios.request({
      url:'/experiment/',
      method:'GET'
      }).then(data=>{
        data = data.data;
        this.userscorelist=[];
        for(var i=0;i<data.length;i++){
          if(data[i].flag==1){
            var dict = {} 
            dict['username'] = data[i].username_id;
            var array1 = data[i].step1score.split(',');
            var sum1 = 0;
            for(var j=0;j<array1.length;j++){
              if(array1[j]==1)sum1++;
            }
            dict['step1score_situation'] = Math.floor(sum1*100/this.step1.all_score)+'%';

            var array2 = data[i].step2score.split(',');
            var sum2 = 0;
            for(var j=0;j<array2.length;j++){
              if(array2[j]==1)sum2++;
            }
            dict['step2score_situation'] = Math.floor(sum2*100/this.step2.all_score)+'%';

            var array3 = data[i].step3score.split(',');
            var sum3 = 0;
            for(var j=0;j<array3.length;j++){
              if(array3[j]==1)sum3++;
            }
            dict['step3score_situation'] = Math.floor(sum3*100/this.step3.all_score)+'%';

            var array4 = data[i].step4score.split(',');
            var sum4 = 0;
            for(var j=0;j<array4.length;j++){
              if(array4[j]==1)sum4++;
            }
            dict['step4score_situation'] = Math.floor(sum4*100/this.step4.all_score)+'%';
            dict['allscore']=Math.floor((sum1+sum2+sum3+sum4)*100/(this.step1.all_score+this.step2.all_score+this.step3.all_score+this.step4.all_score))
            this.userscorelist.push(dict);
          }
        }
    })
    
    },
    getExperimentScore(){
      this.axios.request({
      url:'/experiment/',
      method:'GET'
      }).then(data=>{
        data = data.data;
        this.userexperimentlist=[];
        for(var i=0;i<data.length;i++){
          if(data[i].flag==1){
            var dict = {} 
            dict['username'] = data[i].username_id;
            var array1 = data[i].step1score.split(',');
            dict['step1wrong']="";
            dict['step1right']="";
            var sum1 = 0;
            for(var j=0;j<array1.length;j++){
              if(array1[j]==0){
                //失分
                dict['step1wrong']+=this.step1.node_array[j].errortext;
                dict['step1wrong']+="<br>"
              }
              else{
                //得分
                sum1++;
                dict['step1right']+=this.step1.node_array[j].successtext;
                dict['step1right']+="<br>"
              }
            }
            dict['step1score_situation'] = Math.floor(sum1*100/this.step1.all_score);

            var array2 = data[i].step2score.split(',');
            dict['step2wrong']="";
            dict['step2right']="";
            var sum2=0;
            for(var j=0;j<array2.length;j++){
              if(array1[j]==0){
                //失分
                dict['step2wrong']+=this.step2.node_array[j].errortext;
                dict['step2wrong']+="<br>"
              }
              else{
                //得分
                sum2++;
                dict['step2right']+=this.step2.node_array[j].successtext;
                dict['step2right']+="<br>"
              }
            }
            dict['step2score_situation'] = Math.floor(sum2*100/this.step2.all_score);

            var array3 = data[i].step3score.split(',');
            dict['step3wrong']="";
            dict['step3right']="";
            var sum3=0;
            for(var j=0;j<array3.length;j++){
              if(array3[j]==0){
                //失分
                dict['step3wrong']+=this.step3.node_array[j].errortext;
                dict['step3wrong']+="<br>"
              }
              else{
                //得分
                sum3++;
                dict['step3right']+=this.step3.node_array[j].successtext;
                dict['step3right']+="<br>"
              }
            }
            dict['step3score_situation'] = Math.floor(sum3*100/this.step3.all_score);

            var array4 = data[i].step4score.split(',');
            dict['step4wrong']="";
            dict['step4right']="";
            var sum4=0;
            for(var j=0;j<array4.length;j++){
              if(array4[j]==0){
                //失分
                dict['step4wrong']+=this.step4.node_array[j].errortext;
                dict['step4wrong']+="<br>"
              }
              else{
                //得分
                sum4++;
                dict['step4right']+=this.step4.node_array[j].successtext;
                dict['step4right']+="<br>"
              }
            }
            dict['step4score_situation'] = Math.floor(sum4*100/this.step4.all_score);

            dict['allscore']=Math.floor((sum1+sum2+sum3+sum4)*100/(this.step1.all_score+this.step2.all_score+this.step3.all_score+this.step4.all_score));
            this.userexperimentlist.push(dict);
          } 
        }
    })
    },
    logout(){
      sessionStorage.clear();
      this.$router.push({ path: "/admin" });
    },
    downloadtable(){
      var str = '<tr>'+
      '<td>用户名</td>'+
      '<td>反应前期准备完成情况</td><td>失分点</td><td>得分点</td>'+
      '<td>搭建反应装置完成情况</td><td>失分点</td><td>得分点</td>'+
      '<td>聚合物生成完成情况</td><td>失分点</td><td>得分点</td>'+
      '<td>鉴定表征完成情况</td><td>失分点</td><td>得分点</td>'+'</tr>';
      for(var i=0;i<this.userexperimentlist.length;i++){
        var arr = this.userexperimentlist[i];
        var str1 = '<tr>'+
        '<td>'+arr.username+'</td>'+
        '<td>'+arr.step1score_situation+'%'+'</td>'+
        '<td>'+arr.step1wrong+'</td>'+
        '<td>'+arr.step1right+'</td>'+
        '<td>'+arr.step2score_situation+'%'+'</td>'+
        '<td>'+arr.step2wrong+'</td>'+
        '<td>'+arr.step2right+'</td>'+
        '<td>'+arr.step3score_situation+'%'+'</td>'+
        '<td>'+arr.step3wrong+'</td>'+
        '<td>'+arr.step3wrong+'</td>'+
        '<td>'+arr.step4score_situation+'%'+'</td>'+
        '<td>'+arr.step4wrong+'</td>'+
        '<td>'+arr.step4wrong+'</td>'+
        '<td>'+arr.allscore+'</td>'+
        '</tr>'
        str+=str1;
      }
      var worksheet = 'Sheet1'
      var uri = 'data:application/vnd.ms-excel;base64,';
      //下载的表格模板数据
      var template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
      xmlns:x="urn:schemas-microsoft-com:office:excel" 
      xmlns="http://www.w3.org/TR/REC-html40">
      <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
        <x:Name>${worksheet}</x:Name>
        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        </head><body><table>${str}</table></body></html>`;
      window.location.href = uri+window.btoa(unescape(encodeURIComponent(template)))
    }
  },
  beforeMount(){
    if(sessionStorage.getItem('adminuser')==null){
          this.$router.push({ path: "/admin" });
    }
  },
  mounted(){
    if(sessionStorage.getItem('flag')==2){
      this.youflag = 2;
      this.context = 2;
    }
    else if(sessionStorage.getItem('flag')==3){
      this.youflag = 3;
      this.context = 1;
    }
    this.user = sessionStorage.getItem('username');
    this.getUserInfor();
    this.getExperimentScore();
    this.getUserScoreList();
  }
};
</script>

