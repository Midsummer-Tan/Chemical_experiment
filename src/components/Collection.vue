<template>
  <v-container fluid grid-list-md>
    <v-layout 
    align-center
    justify-space-around
    wrap>
      <v-flex xs11>
        <v-toolbar>
          <v-toolbar-title>自修复超分子材料的制备与测试</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn flat :color="video.color" @click="watchVideo()">
            看视频
            <v-icon>{{video.icon}}</v-icon>
          </v-btn>

          <v-btn flat :color="ppt.color" @click="pptPreview()">
            看课件
            <v-icon>{{ppt.icon}}</v-icon>

          </v-btn>

          <v-btn flat :color="question.color" @click="doExercise()">
            自测题
            <v-icon>{{question.icon}}</v-icon>
          </v-btn>

          <v-btn flat color="green" @click="ToExperiment('/experiment_b/1')" :disabled="experiment['status']">
            <strong>进入实验</strong>
          </v-btn>
        </v-toolbar>
      </v-flex>

      <video style="padding-left:90px;" id="example_video" controlsList="nodownload" controls autoplay muted oncontextmenu="return false;" v-if="question['clicked']==0" @ended="finishWatching()" width="91%">
        <source src="/videos/experiment.mp4" >
      </video>
      
      <v-flex xs9  v-else>
        <div style="height:50px"></div>
        <v-layout align-center>
          <v-item-group
            v-model="window"
            class="shrink mr-4"
            mandatory
            tag="v-flex">
            <v-item
              v-for="n in length"
              :key="n">
              <div slot-scope="{ active, toggle }">
                <v-btn
                  :color="choiceQuestion['iconcolor'][n]"
                  :input-value="active"
                  icon
                  @click="toggle"
                >
                  {{n}}
                </v-btn>
              </div>
            </v-item>
          </v-item-group>
          <v-flex>
            <v-window
              v-model="window"
              class="elevation-1"
              vertical>
              <v-window-item
                v-for="n in length"
                :key="n">
                <v-card min-height=500>
                  <v-card-title>
                    <span class="headline">第{{n}}题</span>
                  </v-card-title>
                  <v-card-text>
                    <strong><h3>{{choiceQuestion['question'][n]}}</h3></strong>
                    <v-radio-group v-model="choiceQuestion['userAnswere'][n]" :disabled="choiceQuestion['radioStatus'][n]" @change="modifyIconColor(n)">
                      <p v-for="m in 4" :key="m">
                        <v-radio
                        :label="choiceQuestion['label'][n][m-1]"
                        :value="m"
                      ></v-radio>
                      </p>
                    </v-radio-group>
                    <div v-show="n==3">
                      第一个空：<el-input type="text" size="medium" maxlength="1" show-word-limit v-model="fillBlanks['3'][0]" @input="modifyIconColor(n)"></el-input>
                      第二个空：<el-input type="text" size="medium" maxlength="1" show-word-limit v-model="fillBlanks['3'][1]" @input="modifyIconColor(n)"></el-input>
                    </div>
                    <div v-show="n==4">
                      第一个空：<el-input type="text" size="medium" maxlength="1" show-word-limit v-model="fillBlanks['4'][0]" @input="modifyIconColor(n)"></el-input>
                      第二个空：<el-input type="text" size="medium" maxlength="1" show-word-limit v-model="fillBlanks['4'][1]" @input="modifyIconColor(n)"></el-input>
                      第三个空：<el-input type="text" size="medium" maxlength="1" show-word-limit v-model="fillBlanks['4'][2]" @input="modifyIconColor(n)"></el-input>
                    </div>
                    <div v-show="remark['show']"><v-icon large :color="remark['color'][choiceQuestion['rightOrWrong'][n+'']]">{{remark['icon'][choiceQuestion['rightOrWrong'][n+'']]}}</v-icon><h3>{{remark['text'][choiceQuestion['rightOrWrong'][n+'']]+choiceQuestion['rightAnswere'][n+'']}}</h3></div>
                  </v-card-text>
                </v-card>
                
              </v-window-item>
            </v-window>
            <v-btn style="float:right"
              color="blue"
              @click="submitDialog=true"
            >提交
            </v-btn>
          </v-flex>
        
        </v-layout>
      </v-flex>   
      <v-dialog max-width="500" v-model="submitDialog">
        <v-card>
          <v-card-text>你确定要提交吗？</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat="flat" @click="submitDialog= false"> 取消</v-btn>
            <v-btn flat="flat" @click="submitAnswere()">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> 
      <v-dialog max-width="500" v-model="resultDialog">
        <v-card>
          <v-card-text>{{resulttext}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat="flat" @click="resultDialog=false">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>    
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog:false,
      window:0,
      quesNumber:1,
      length:10,
      submitDialog:false,
      resultDialog:false,
      resulttext:'',
      choiceQuestion:{
        'question':{"1":"本虚拟仿真实验的制备工艺涉及在温和的温度下混合三种可供商业使用的原料，请问这三种原料为（ ）",
                  "2":'目前利用功能小分子的自组装来发展超分子聚合物存在的主要问题不包括下面的选项( )',
                  "3":'本实验中使用的硫辛酸化合物中存在两种动态化学键，即（ ）和（ ）。',
                  "4":"在本超分子功能材料的制备过程中，在硫辛酸熔融温度下，含五元环的二硫键经历热引发的（  ），从而形成一种以流体形式存在的初级线性共价键骨架。在冷却之后，由（ ）的羧基侧链有效地交联形成线性聚(TA)，从而产生透明的固体聚合物，但是在静置几分钟后会自发形成（ ）。",
                  "5":"本实验中的硫辛酸聚合物具有（ ）性能",
                  "6":' 实验过程中在使用温度计控温情况下，应将温度计（ ）',
                  "7":'Fe(III)离子在聚合物形成过程中起到的主要作用是（ ）',
                  "8":' 要想用塑料管吸取本实验中所合成的聚合物进行陈化，在什么时候吸取最为合适（ ）',
                  "9":'本实验所使用的1,3-二异丙烯基苯和三氯化铁分别与硫辛酸分子中哪类化学键相互作用（ ）',
                  "10":'本实验中，1,3-二异丙烯基苯和三氯化铁的投料比分别是多少（ ）'},
          'iconcolor':{"1":"orange","2":"orange","3":"orange","4":"orange","5":"orange","6":"orange","7":"orange",
                  "8":"orange","9":"orange","10":"orange"},
          'label':{"1":['A.硫辛酸，1,3-二异丙烯基苯，CuCl2','B.丙烯酸，1,3-二异丙烯基苯，FeCl3','C.丙烯酸，1,4-二异丙烯基苯，CuCl2','D.硫辛酸，1,3-二异丙烯基苯，FeCl3'],
                  "2":['A. 要引入所需的超分子键，通常需要精细合成前体，而且在许多情况下，超分子网络通常表现出脆弱的机械特性。','B. 典型的超分子聚合物通常需要额外的溶剂来支持非共价的相互作用的动态性质和强度，从而产生凝胶网络而不是干网络。','C. 增强要求导致结构复杂性和合成难度的增加，同时也增加了成本。','D. 合成过程耗时长且高能耗。'],
                  "3":['A. 二硫键','B. 醚键','C. 氢键','D. 烯烃的不饱和键'],
                  "4":['A. 开环聚合','B. 氢键二聚','C. 半晶低聚物','D. 流变性能'],
                  "5":['A. 粘附性','B. 可拉伸性','C. 自愈合','D. 粘附性、可拉伸性和自愈合性能'],
                  "6":['A. 触及油浴锅底','B. 水银球完全浸没在油浴锅中但不触及底部','C. 轻触油浴锅液面','D. 不与油浴接触'],
                  "7":['A. 起到氧化剂的作用','B. 通过反硫化的方法对聚(TA)的端二自由基进行猝灭，从而通过共价交联来加强网络','C. 改变产物的颜色，使产物更美观','D. 作为一个具有羧基的强络合中心，取代部分弱氢键'],
                  "8":['A. 在加入三氯化铁丙酮溶液后立即移取','B. 加入三氯化铁丙酮溶液后继续搅拌1分钟后趁热移取','C. 关闭搅拌器直至产物冷却至室温再移取','D. 以上均可'],
                  "9":['A. 二硫键；二硫键','B. 氢键；氢键','C. 二硫键；氢键','D. 氢键；二硫键'],
                  "10":['A. 20wt%（质量比）；1/18000（摩尔比）','B. 10wt%（质量比）；1/9000（摩尔比）','C. 20wt%（质量比）；1/9000（摩尔比）','D. 10wt%（质量比）；1/18000（摩尔比）']},
          'userAnswere':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0},
          'radioStatus':{'1':false,'2':false,'3':true,'4':true,'5':false,'6':false,'7':false,'8':false,'9':false,'10':false},
          'rightOrWrong':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0},
          'rightAnswere':{'1':'D','2':'D','3':'AC','4':'ABC','5':'D','6':'B','7':'D','8':'B','9':'C','10':'A'}
                  },
      remark:{"show":0,"icon":['fa fa-close',"fa fa-check"],"color":['red','green'],"text":['回答错误,正确答案是:',"答对了"]}, //是否出现对话框下方“答错 答对”的提示，设置为点击确定按钮后显示
      fillBlanks:{'3':['',''],'4':['','','']},
      video:{'color':'orange','icon':'fa fa-close','status':0},
      ppt:{'color':'orange','icon':'fa fa-close','status':0},
      question:{'color':'orange','icon':'fa fa-close','status':0,'clicked':0},//clicked=1代表刚刚点完做练习题按钮，=0代表点了其他的按钮
      experiment:{'status':true}
    };
  },
  methods:{
    watchVideo(){
      this.question['clicked']=0;
      this.remark['show'] = 0;
      for(var i=1;i<=10;i++){
        if(this.choiceQuestion['iconcolor'][i+'']=='red'){
          if( (i==3 || i==4) && this.fillBlanks[i+''].indexOf('')==-1){
            this.choiceQuestion['iconcolor'][i+'']='green';
          }
          else if(i!=3 && i!=4 && this.choiceQuestion['userAnswere'][i+'']!=0){
            this.choiceQuestion['iconcolor'][i+'']='green';
          }
          else this.choiceQuestion['iconcolor'][i+'']='orange';
        }
      }
    },
    finishWatching(){
      this.video['status']=1;
      this.video['color']='green';
      this.video['icon']='fa fa-check';
      this.modifyExperimentDB();
    },
    pptPreview(){
      this.ppt['status']=1;
      this.ppt['color']='green';
      this.ppt['icon']='fa fa-check';
      this.question['clicked']=0;
      this.modifyExperimentDB();
      window.open("/pptpreview/index.html");
    },
    ToExperiment(url){
      this.$router.push(url);
    },
    doExercise(){
      this.question['clicked']=1;
    },
    modifyIconColor(n){
      if(n==3 || n==4){
        var a = '';
        for(var i = 0;i<this.fillBlanks[n+''].length;i++){
            a+=this.fillBlanks[n+''][i]
        }
        if(a==''){
          this.choiceQuestion['iconcolor'][n]='orange';
        }
        else{
          this.choiceQuestion['iconcolor'][n]='green';
        }
      }
      else{
        this.choiceQuestion['iconcolor'][n]='green';
      }
      
      
    },
    submitAnswere(){
      this.submitDialog = false;
      if(this.video['status']==0){
        this.resultDialog = true;
        this.resulttext="你还没有看完视频，不能提交自测题哦。"
        return;
      }
      var rightnum = 0;
      this.remark['show']=1;
      for(var i=1;i<=10;i++){
        var a1 = '';
        if(i==3 || i==4){
          for(var j = 0;j<this.fillBlanks[i+''].length;j++){
            if(this.fillBlanks[i+''][j].charCodeAt()>=97){
              this.fillBlanks[i+''][j]=String.fromCharCode(this.fillBlanks[i+''][j].charCodeAt()-32);
            }
            a1+=this.fillBlanks[i+''][j];
          }
        }
        else{
          switch (this.choiceQuestion['userAnswere'][i+'']) {
              case 1:
                a1+='A';
                break;
              case 2:
                a1+='B';
                break;
              case 3:
                a1+='C';
                break;
              case 4:
                a1+='D';
                break;            
              default:
                break;
          }
        }
        if(a1==this.choiceQuestion['rightAnswere'][i+'']){
          this.choiceQuestion['rightOrWrong'][i+'']=1;
          rightnum++;
        }
        else{
          this.choiceQuestion['rightOrWrong'][i+'']=0;
          this.choiceQuestion['iconcolor'][i+'']='red';
        }
      }
      this.resultDialog = true;
      if(rightnum==10){
        this.question['status']=1;
        this.question['color']='green';
        this.question['icon']='fa fa-check';
        this.resulttext = "恭喜你，题目全部做对啦。"
        this.modifyExperimentDB();
      }
      else if(rightnum>=8){
        this.question['status']=1;
        this.question['color']='green';
        this.question['icon']='fa fa-check';
        this.resulttext = "恭喜你，答对了"+rightnum+'道题,建议你再把错误的题目看一遍呦。'
        this.modifyExperimentDB();
      }
      else{
        this.resulttext = "本次你做对了"+rightnum+'道题，请认真看题目解析和视频，重新作答。';
        this.question['status']=0;
        this.question['color']='orange';
        this.question['icon']='fa fa-close';
        this.video['status']=0;
        this.video['color']='orange';
        this.video['icon']='fa fa-close';
        this.modifyExperimentDB();
      }
      
    },
    modifyExperimentDB(){
      if(this.question['status']==1 && this.ppt['status']==1) this.experiment['status']=false;
      this.axios.request(
          {
            url:'/experiment/',
            method:'PUT',
            data:{
              username:sessionStorage.getItem('username'),
              ppt:this.ppt['status'],
              video:this.video['status'],
              question:this.question['status']
            }
          }
      );
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
        this.ppt['status'] = parseInt(data.ppt);
        if(this.ppt['status']==1){
          this.ppt['color']='green';
          this.ppt['icon']='fa fa-check';
        }
        this.video['status'] = parseInt(data.video);
        if(this.video['status']==1){
          this.video['color']='green';
          this.video['icon']='fa fa-check';
        }
        this.question['status'] = parseInt(data.question);
        if(this.question['status']==1){
          this.question['color']='green';
          this.question['icon']='fa fa-check';
        }
        if(this.question['status']==1 && this.ppt['status']==1){
          this.experiment['status'] = false;
        }
      })
        this.$forceUpdate();
    }
  }
</script>

<style>
</style>

