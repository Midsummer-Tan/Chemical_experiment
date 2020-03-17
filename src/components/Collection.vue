<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm4 md4 v-for="(item,i) in expList" :key="i">
        <v-hover>
          <v-card>
            <v-img
              class="white--text"
              aspect-ratio="2"
              src="/images/ex_pic1.jpg"
            ></v-img>
            <v-card-title class="subheading font-weight-black">{{item.title}}<v-spacer></v-spacer></v-card-title>
            <v-card-actions>
              <v-btn flat :color="btnColor[pptVideoQues[0]]" @click="pptPreview()" >看课件&nbsp;<v-icon>{{btnClass[pptVideoQues[0]]}}</v-icon></v-btn>
              <v-btn flat :color="btnColor[pptVideoQues[1]]" @click="ToVideo()">看视频&nbsp; <v-icon>{{btnClass[pptVideoQues[1]]}}</v-icon></v-btn>
              <v-dialog v-model="dialog" width="600" persistent>
                <template v-slot:activator="{ on }">
                  <v-btn flat :color="btnColor[pptVideoQues[2]]" v-on="on">预习题 &nbsp; <v-icon>{{btnClass[pptVideoQues[2]]}}</v-icon></v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">第{{quesNumber}}题</span>
                  </v-card-title>
                  <v-card-text><strong><h3>
                    {{radioTitle[quesNumber]}}
                  </h3></strong>
                    <v-radio-group v-model="radio" :disabled="radioDisable">
                      <v-radio
                        v-for="n in 4"
                        :key="n"
                        :label="radiolable[quesNumber][n-1]"
                        :value="n"
                      ></v-radio>
                    </v-radio-group>
                    <div v-show="quesNumber==3">
                      第一个空：<el-input type="text" size="medium" maxlength="1" show-word-limit v-model="fillBlanks[0]"></el-input>
                      第二个空：<el-input type="text" size="medium" maxlength="1" show-word-limit v-model="fillBlanks[1]"></el-input>
                    </div>
                    <div v-show="quesNumber==4">
                      第一个空：<el-input type="text" size="medium" maxlength="1" show-word-limit v-model="fillBlanks[0]"></el-input>
                      第二个空：<el-input type="text" size="medium" maxlength="1" show-word-limit v-model="fillBlanks[1]"></el-input>
                      第三个空：<el-input type="text" size="medium" maxlength="1" show-word-limit v-model="fillBlanks[2]"></el-input>
                    </div>
                    <div v-show="remarkStatus"><v-icon large :color="status[result][0]">{{status[result][1]}}</v-icon><h3>{{status[result][2]}}</h3></div>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="orange" flat @click="dialog = false">关闭</v-btn>
                    <v-btn color="green" flat @click="testAnswere()">{{btnText}}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              
              <v-btn flat color="green" @click="ToExperiment('/experiment_b/'+item.id)" :disabled="allowExperiment">
              <strong>进入实验</strong>
              </v-btn>
            </v-card-actions>
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
      dialog:false,
      quesNumber:1,
      radioTitle:{"1":"本虚拟仿真实验的制备工艺涉及在温和的温度下混合三种可供商业使用的原料，请问这三种原料为（ ）",
                  "2":'目前利用功能小分子的自组装来发展超分子聚合物存在的主要问题不包括下面的选项( )',
                  "3":'本实验中使用的硫辛酸化合物中存在两种动态化学键，即（ ）和（ ）。',
                  "4":"在本超分子功能材料的制备过程中，在硫辛酸熔融温度下，含五元环的二硫键经历热引发的（  ），从而形成一种以流体形式存在的初级线性共价键骨架。在冷却之后，由（ ）的羧基侧链有效地交联形成线性聚(TA)，从而产生透明的固体聚合物，但是在静置几分钟后会自发形成（ ）。",
                  "5":"本实验中的硫辛酸聚合物具有（ ）性能",
                  "6":' 实验过程中在使用温度计控温情况下，应将温度计（ ）',
                  "7":'Fe(III)离子在聚合物形成过程中起到的主要作用是（ ）',
                  "8":' 要想用所料管吸取本实验中所合成的聚合物进行陈化，在什么时候吸取最为合适（ ）',
                  "9":'本实验所使用的1,3-二异丙烯基苯和三氯化铁分别与硫辛酸分子中哪类化学键相互作用（ ）',
                  "10":'本实验中，1,3-二异丙烯基苯和三氯化铁的投料比分别是多少（ ）'
                  },
      radiolable:{"1":['A.硫辛酸，1,3-二异丙烯基苯，CuCl2','B.丙烯酸，1,3-二异丙烯基苯，FeCl3','C.丙烯酸，1,4-二异丙烯基苯，CuCl2','D.硫辛酸，1,3-二异丙烯基苯，FeCl3'],
                  "2":['A. 要引入所需的超分子键，通常需要精细合成前体，而且在许多情况下，超分子网络通常表现出脆弱的机械特性。','B. 典型的超分子聚合物通常需要额外的溶剂来支持非共价的相互作用的动态性质和强度，从而产生凝胶网络而不是干网络。','C. 增强要求导致结构复杂性和合成难度的增加，同时也增加了成本。','D. 合成过程耗时长且高能耗。'],
                  "3":['A. 二硫键','B. 醚键','C. 氢键','D. 烯烃的不饱和键'],
                  "4":['A. 开环聚合','B. 氢键二聚','C. 半晶低聚物','D. 流变性能'],
                  "5":['A. 粘附性','B. 可拉伸性','C. 自愈合','D. 粘附性、可拉伸性和自愈合性能'],
                  "6":['A. 触及油浴锅底','B. 水银球完全浸没在油浴锅中但不触及底部','C. 轻触油浴锅液面','D. 不与油浴接触'],
                  "7":['A. 起到氧化剂的作用','B. 通过反硫化的方法对聚(TA)的端二自由基进行猝灭，从而通过共价交联来加强网络','C. 改变产物的颜色，使产物更美观','D. 作为一个具有羧基的强络合中心，取代部分弱氢键'],
                  "8":['A. 在加入三氯化铁丙酮溶液后立即移取','B. 加入三氯化铁丙酮溶液后继续搅拌1分钟后趁热移取','C. 关闭搅拌器直至产物冷却至室温再移取','D. 以上均可'],
                  "9":['A. 二硫键；二硫键','B. 氢键；氢键','C. 二硫键；氢键','D. 氢键；二硫键'],
                  "10":['A. 20wt%（质量比）；1/18000（摩尔比）','B. 10wt%（质量比）；1/9000（摩尔比）','C. 20wt%（质量比）；1/9000（摩尔比）','D. 10wt%（质量比）；1/18000（摩尔比）']},
      radio:0,
      remarkStatus:false, //是否出现对话框下方“答错 答对”的提示，设置为点击确定按钮后显示
      result:0,
      status:{'0':['red','fa fa-close','答错啦，请重新作答'],'1':['green',"fa fa-check","答对啦"]},
      btnText:'确定',
      fillBlanks:['','',''],
      answere:['D','D','AC','ABC','D','B','D','B','C','A'],
      btnColor:['orange','green'],
      btnClass:['fa fa-close','fa fa-check'],
      allowExperiment:true,
      radioDisable:false,
      pptVideoQues:[0,0,0],
      expList: [
        {
          id: 1,
          title: "自修复超分子材料的制备与测试"
        }
      ]
    };
  },
  methods:{
    pptPreview(){
      this.pptVideoQues[0] = 1;
      this.modifyExperimentDB();
      window.open("/pptpreview/index.html");
    },
    ToVideo(){
      this.pptVideoQues[1] = 1;
      this.modifyExperimentDB();
      this.$router.push("/video");  
    },
    ToExperiment(url){
      this.$router.push(url);
    },
    testAnswere(){
      if(this.btnText=="确定"){
        var youAnswere='';
        switch (this.radio) {
          case 1:
            youAnswere="A";
            break;
          case 2:
            youAnswere="B";
            break;
          case 3:
            youAnswere="C";
            break;
          case 4:
            youAnswere="D";
            break;
          case 5:
            for(var i = 0;i<=2;i++){
              youAnswere+=this.fillBlanks[i]
            }
            break;
          case 0:
            break;
        }
        if(youAnswere == this.answere[this.quesNumber-1]){
          if(this.quesNumber==10) {
            this.btnText="完成";
            return 0;
          }
          else{
            this.btnText="下一题";
          }
          this.result = 1;
          this.fillBlanks=['','','']
        }
        else this.result = 0;
        this.remarkStatus = true;
        
      }
      else if(this.btnText=='下一题'){
        this.btnText='确定';
        this.radio=0;
        this.quesNumber++;
        this.remarkStatus = false;
        if(this.quesNumber==3 || this.quesNumber==4){
          this.radioDisable=true;
          this.radio = 5;
        }
        else this.radioDisable=false;
      }
      else if(this.btnText=="完成"){
        this.dialog=false;
        this.pptVideoQues[2] = 1;
      }
      this.modifyExperimentDB();
      
    },
    modifyExperimentDB(){
      this.axios.request(
          {
            url:'/experiment/',
            method:'PUT',
            data:{
              username:sessionStorage.getItem('username'),
              ppt:this.pptVideoQues[0],
              video:this.pptVideoQues[1],
              question:this.pptVideoQues[2]
            }
          }
      );
      if(this.pptVideoQues.indexOf(0)==-1){
        this.allowExperiment = false;
      } 
    }
  },
  mounted(){
     this.axios.request({
      url:'/experiment/',
      method:'GET',
      params:{
          "username":sessionStorage.getItem('username')
      }}).then(data=>{
        data=data.data[0];
        this.pptVideoQues[0] = parseInt(data.ppt);
        this.pptVideoQues[1] = parseInt(data.video);
        this.pptVideoQues[2] = parseInt(data.question);
        if(this.pptVideoQues.indexOf(0)==-1){
        this.allowExperiment = false;
      } 
        this.$forceUpdate();
    })
  }
  }
</script>

<style>
</style>

