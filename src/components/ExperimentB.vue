
<template>
  <v-container
    fluid
    grid-list-lg
    class="avoid_select"
  >
    <v-layout>
      <v-flex xs8>
        <v-card>
          <v-responsive :aspect-ratio="16/9">
            <canvas id="renderCanvas"></canvas>
          </v-responsive>
          <div style="float:right;font-family:KaiTi">
            当前选中：
            <span style="color:#666666">{{(pickingObj!=null)?pickingObj.id:'无'}}</span>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <!--步骤条-->
        <!--一共分为三大步骤-->

        <v-card class="mb-3">
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step
                :complete="e1 > 1"              
                step="1"
              >{{step[0]}}</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step
                :complete="e1 > 2"
                step="2"
              >{{step[1]}}</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step
                :complete="e1 > 3"
                step="3"
              >{{step[2]}}</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step
                :complete="e1 > 4"              
                step="4"
              >{{step[3]}}</v-stepper-step>
            </v-stepper-header>
            <v-btn
              style="float:right"
              :disabled="btn_post"
              dark
              color="pink"
              @click="post()"
            >提交</v-btn>
            <v-btn
              style="float:right"
              :disabled="btn_nextstep"
              fab
              dark
              small
              color="pink"
              @click="dialog_nextstep = true"
            >
              <v-icon>fa fa-chevron-right</v-icon>
            </v-btn>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  style="float:right"
                  fab
                  dark
                  small
                  v-on="on"
                  color="pink"
                  @click="reset_dialog=true"
                >
                  <v-icon>fa fa-fast-backward</v-icon>
                </v-btn>
              </template>
              <span>重置整个实验</span>
            </v-tooltip>

            <div style="padding:5px;">
              <span style="color:teal"><strong>本步骤总得分:&nbsp;<span style="color:orange">{{all_score}}</span><br>
                  当前得分:&nbsp;<span style="color:orange">{{now_score}}</span></strong></span>
            </div>

          </v-stepper>
        </v-card>
        
        <!--步骤条-->
        <el-tabs 
        v-model="activeIndex"
        class="el-tabs-color" type="border-card">

        <template v-for="i in weightlist">
          <el-tab-pane :label="'电子秤('+i+')'"  :name="i" :key="i">
          <div style="height:150px;">
            <v-card>
              <electronic-scale ref="weight"></electronic-scale>
              <v-btn
              color="pink"
              dark
              small
              absolute
              bottom
              right
              fab
              @click="toZero(i)"
              >
              <v-icon>fa fa-refresh</v-icon>
              </v-btn>
            </v-card>
            <br>
            <span style="color:orange;font-size:14px">若称量错误可以移除仪器重新进行称取操作</span>
          </div>
        </el-tab-pane>
        </template>

        <template v-for="i in measuring_cylinderlist" >
          <el-tab-pane :label="'量筒('+i+')'" :key="i" :name="i" v-if="refresh" >
            <div style="height:150px;">
              <my-progress :valueNow="measuring_cylinderprops[i][0]"></my-progress>
            </div>
            <span style="color:orange;font-size:14px">若称量错误可以移除仪器重新进行称取操作</span>
          </el-tab-pane>
        </template>

        <template v-for="i in needlelist" >
          <el-tab-pane :label="'针管('+i+')'"  :name="i" :key="i" v-if="refresh">
            <div style="height:130px;">
              <my-needle-progress :valueNow="needleprops[i][0]" ></my-needle-progress >
            </div>
            <div style="height:50px;text-align:center">
              <v-btn class="mx-2" fab color='pink'>
                <v-icon dark @click="changeNeedleValue(i,'up')" :disabled='needle_value_btn_up'>fa fa-chevron-up</v-icon>
              </v-btn>
              &emsp;
              <v-btn class="mx-2" fab color='pink'>
                <v-icon dark @click="changeNeedleValue(i,'down')" :disabled='needle_value_btn_down'>fa fa-chevron-down</v-icon>
              </v-btn>
              &emsp;
              <v-btn color='pink' large @click="finishChangeNeedleValue(i)" :disabled='needle_value_btn_post'>确定</v-btn>
            </div>
            <br>
            <span style="color:orange;font-size:14px">若吸取错误可以移除仪器重新进行吸取操作</span>
          </el-tab-pane>
        </template>

        <template v-for="i in standlist" >
          <el-tab-pane :label="'铁架台('+i[1]+')'"  :name="i[1]" :key="i[0]">
            <div style="height:100px;text-align:center">
              <v-btn class="mx-2" fab color='pink'>
                <v-icon dark @click="changeStandMovablePosition(i[0],'down')">fa fa-chevron-down</v-icon>
              </v-btn>
              &emsp;
              <v-btn class="mx-2" fab color='pink'>
                <v-icon dark @click="changeStandMovablePosition(i[0],'up')">fa fa-chevron-up</v-icon>
              </v-btn>
              &emsp;
              <v-btn color='pink' large @click="addStand1(i)">固定</v-btn>
            </div>
          </el-tab-pane>
        </template>

        <template v-if="e1==3" >
          <el-tab-pane label="磁力搅拌器" name="heater">
            <div style="min-height:200px;color:#b7b9bd">
              <div class="block">
                <span class="demonstration">加热开关&emsp;</span>
                <el-switch
                  v-model="heater_temp_switch"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </div>
              <br>

              <div class="block">
                <span class="demonstration">温度调节旋钮</span>
                <el-slider
                  v-model="heater_temp_value"
                  :step="10"
                  :max='200'
                  :marks = "{0: '0°C',100: '100°C',200: '200°C',}"
                  show-stops>
                </el-slider>
              </div>
              <br>

              <div class="block">
                <span class="demonstration">搅拌开关&emsp;</span>
                <el-switch
                  v-model="heater_stir_switch"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </div>
              <br>

              <div class="block">
                <span class="demonstration">转速调节旋钮</span>
                <el-slider
                  v-model="heater_stir_value"
                  :marks = "{0: '0%',50: '50%',100: '100%',}">
                </el-slider>
              </div>
            </div>
          </el-tab-pane>
        </template>

        <template v-for="i in liquid_transferorlist" >
          <el-tab-pane :label="'移液枪('+i+')'" :key="i" :name="i" v-if="refresh" >
            <div style="min-height:300px;">
              <v-layout>
                <v-flex xs3>
                  <v-btn class="mx-2" fab dark large :color="liquid_transferor_btn_color"
                  :disabled ='liquid_transferorprops[i][2]'
                  @mousedown='startTouchBtn()'
                  @mouseup='endTouchBtn(i)'>长按
                  </v-btn>
                </v-flex>
                <v-flex xs9>
                 <v-slider
                color='green'
                v-model="liquid_transferorprops[i][1]"
                class="align-center"
                :max="100"
                :min="0"
                hide-details
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="liquid_transferorprops[i][1]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </template>
              </v-slider> 
                </v-flex>
              </v-layout>
              <my-pipette-progress :valueNow="liquid_transferorprops[i][0]"></my-pipette-progress>
            </div>
            <span style="color:orange;font-size:14px">若吸取错误可以移除仪器重新进行吸取操作</span>
          </el-tab-pane>
        </template>

        <template v-if="hasClock==true" >
          <el-tab-pane label="时钟"  name="clock" >
            <div style="text-align:center">
              <my-clock></my-clock>
            </div>
          </el-tab-pane>
        </template>

         <el-tab-pane label="BB8's warning"  name = 'default'>
          <div style="height:100px;">
            <v-alert :value="true" type="warning" outline>
            <v-avatar size="60px">
              <img src="/images/bb8.png" alt="avatar" >
            </v-avatar>
            &emsp;{{this.bb8warning}}
          </v-alert>
          </div>
        </el-tab-pane>
        </el-tabs>   

        <!--工具栏-->
        <v-card class="mb-4">
          <v-card-title class="font-weight-black subheading">工具</v-card-title>

          <v-container style='padding:2px;height:150px;'>
            <v-layout
              style="overflow-y:scroll;height:150px"
              row
              wrap
            >
              <v-flex xs3>
                <v-card @click="addRoundFlask()">
                  <v-card-text>
                    <v-img
                      src="/images/round_flask.png"
                      aspect-ratio="1">
                    </v-img>
                    <div class="body-2 text-xs-center">圆底烧瓶(10ml)</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addPaper()">
                  <v-card-text>
                    <v-img
                      src="/images/paper.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">称量纸</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addPot()">
                  <v-card-text>
                    <v-img
                      src="/images/pot.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">油浴锅</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addWeight()">
                  <v-card-text>
                    <v-img
                      src="/images/weight.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">电子秤</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addHeater()">
                  <v-card-text>
                    <v-img
                      src="/images/heater.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">磁力搅拌器</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addLiquidTransferor()">
                  <v-card-text>
                    <v-img
                      src="/images/liquid_transferor.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">移液枪</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addNeedleCap()">
                  <v-card-text>
                    <v-img
                      src="/images/needle.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">针管</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addTriFlask()">
                  <v-card-text>
                    <v-img
                      src="/images/tri_flask.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">锥形瓶</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addDropper()">
                  <v-card-text>
                    <v-img
                      src="/images/dropper.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">滴管</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addMeasuringCylinder()">
                  <v-card-text>
                    <v-img
                      src="/images/measuring_cylinder.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">量筒</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addStand()">
                  <v-card-text>
                    <v-img
                      src="/images/stand.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">铁架台</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addC8h14o2s2()">
                  <v-card-text>
                    <v-img
                      src="/images/brown_bottle.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">硫辛酸</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addFecl3()">
                  <v-card-text>
                    <v-img
                      src="/images/brown_bottle.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">六水合三氯化铁</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addAsetone()">
                  <v-card-text>
                    <v-img
                      src="/images/brown_bottle.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">丙酮</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addDib()">
                  <v-card-text>
                    <v-img
                      src="/images/brown_bottle.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">DIB交联剂</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addSpoon()">
                  <v-card-text>
                    <v-img
                      src="/images/spoon.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">药匙</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addFilm()">
                  <v-card-text>
                    <v-img
                      src="/images/film.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">塑料薄膜</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addCap(0,0.05,0)">
                  <v-card-text>
                    <v-img
                      src="/images/cap.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">针管盖</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addThermometer()">
                  <v-card-text>
                    <v-img
                      src="/images/temperature.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">温度计</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addClock()">
                  <v-card-text>
                    <v-img
                      src="/images/clock.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">时钟</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addMagneton()">
                  <v-card-text>
                    <v-img
                      src="/images/vibrate.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">小磁子</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addTweezer()">
                  <v-card-text>
                    <v-img
                      src="/images/tweezer.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">镊子</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addScissors()">
                  <v-card-text>
                    <v-img
                      src="/images/scissors.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">剪刀</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addGlassPad()">
                  <v-card-text>
                    <v-img
                      src="/images/glass_pad.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">玻璃片</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs4>
                <v-card @click="addRoundFlaskCone()" v-show="show1">
                  <v-card-text>
                    <v-img
                      src="/images/flask_with_powder.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">装有硫辛酸的圆底烧瓶</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs4>
                <v-card @click="addTriFlaskFullFecl3Film()" v-show="show2">
                  <v-card-text>
                    <v-img
                      src="/images/flask_with_liquid.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">三氯化铁丙酮溶液</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs4>
                <v-card @click="addNeedleFullCap()" v-show="show3">
                  <v-card-text>
                    <v-img
                      src="/images/needle_with_cap.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">装有dib试剂的针管</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs4>
                <v-card @click="addNeedleFullTriFlask()" v-show="show4">
                  <v-card-text>
                    <v-img
                      src="/images/flask_with_needle.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">装有胶黏生成物针管的锥形瓶</div>
                  </v-card-text>
                </v-card>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

    <!--对话框-->
    <v-dialog
      v-model="dialog_nextstep"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">进入下一步？</v-card-title>
        <v-card-text>你本环节得分是<span style="color:orange">{{now_score}}</span>分,总分为<span style="color:orange">{{all_score}}</span>分,你确定进入下一个环节么？进入下一个环节后你没有办法回到本环节。</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog_nextstep  = false"
          >取消</v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog_nextstep = false;showErrorText()"
          >确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--对话框-->
    <v-dialog
      v-model="dialog_result"
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline">本环节总结</v-card-title>
        <v-card-text>你本环节得分是<span style="color:orange">{{now_score}}</span>分,总分为<span style="color:orange">{{all_score}}</span>分<br>
        
        <div v-if="all_score!=now_score">
        <span style="color:red">失分原因如下：</span><br>
          <div
            v-for="(item,index) in errortext"
            :key="index"
          ><span style="color:orange">{{index+1}}</span>.{{item}}<br>
          </div>
        </div>

        <div v-else>
          <span style="color:red">恭喜！该步骤你得到了满分！</span><br>
        </div>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog_result=false;nextStep()"
          >确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--对话框-->
    <v-dialog
      v-model="post_dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline">实验总结</v-card-title>
        <v-card-text>你本实验的分数为<span style="color:orange">{{post_score}}</span>分<br>
        
        <div>
        <br><span style="color:#67C23A">反应前期准备</span><br>
          <div v-if="post_errortext1.length!=0">
          <span style="color:red">失分原因如下：</span><br>
            <div
              v-for="(item,index) in post_errortext1"
              :key="index"
            ><span style="color:orange">{{index+1}}</span>.{{item}}<br>
            </div>
          </div>
          <div v-else>
            <span style="color:red">恭喜！该步骤你得到了满分！</span><br>
          </div>
        </div>


        <div>
        <br><span style="color:#67C23A">搭建反应装置</span><br>
          <div v-if="post_errortext2.length!=0">
          <span style="color:red">失分原因如下：</span><br>
            <div
              v-for="(item,index) in post_errortext2"
              :key="index"
            ><span style="color:orange">{{index+1}}</span>.{{item}}<br>
            </div>
          </div>
          <div v-else>
            <span style="color:red">恭喜！该步骤你得到了满分！</span><br>
          </div>
        </div>

        <div>
        <br><span style="color:#67C23A">聚合物合成</span><br>
          <div v-if="post_errortext3.length!=0">
          <span style="color:red">失分原因如下：</span><br>
            <div
              v-for="(item,index) in post_errortext3"
              :key="index"
            ><span style="color:orange">{{index+1}}</span>.{{item}}<br>
            </div>
          </div>
          <div v-else>
            <span style="color:red">恭喜！该步骤你得到了满分！</span><br>
          </div>
        </div>

        <div>
        <br><span style="color:#67C23A">鉴定表征</span><br>
          <div v-if="post_errortext4.length!=0">
          <span style="color:red">失分原因如下：</span><br>
            <div
              v-for="(item,index) in post_errortext4"
              :key="index"
            ><span style="color:orange">{{index+1}}</span>.{{item}}<br>
            </div>
          </div>
          <div v-else>
            <span style="color:red">恭喜！该步骤你得到了满分！</span><br>
          </div>
        </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="post_dialog=false;"
          >确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--对话框-->
    <v-dialog
      v-model="reset_dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">重置实验</v-card-title>
        <v-card-text><span style="color:orange">你确定重置整个实验吗？重置后你目前的进度将清空。</span></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="reset_dialog  = false"
          >取消</v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="reset_dialog = false;toStep1()"
          >确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";
import * as GUI from "@babylonjs/gui";

import Vector3 from "@babylonjs/core/Legacy/legacy";
import myProgress from "../packages/Progress/Progress.vue";
import myNeedleProgress from "../packages/NeedleProgress/NeedleProgress.vue";
import myPipetteProgress from "../packages/Pipette/PipetteProgress.vue";
import electronicScale from "../packages/ElectronicScale/ElectronicScale.vue";
import myClock from "../packages/clock/clock.vue";
import addModels from '../js/addModels.js';
import step1Function from '../js/step1func.js';
import step2Function from '../js/step2func.js';
import step3Function from '../js/step3func.js';
import step4Function from '../js/step4func.js';
import { clearTimeout } from 'timers';
export default {
  data() {
    return {
      canvas: null,
      engine: null,
      scene: null,
      hl: null,
      hoveredObj: null,
      pickingObj: null,
      pickedObj: null, //上一次拾取的物品
      e1: 1,
      step: ["反应前期准备", "", "",""],
      quality: {
        paper: [null, null, 0, 0, 0, 1],
        tri_flask: [null, 2, 0, 0, 0, 0],
        spoon_cone: [null, null, 1, 0, 0, 0],
        spoon_powder_brown: [null, null, 0, 0, 5, 0]
      }, //20.000g
      all_score: null,
      now_score: 0,
      dialog_nextstep: false,
      dialog_result: false,
      errortext: [],
      btn_nextstep: false,
      btn_post: true,
      advancedTexture: null,
      controller: null,
      stable: 0, //产生分离按钮的时候鼠标滑动不太稳定 这个等于一个flag
      shake_count:0,
      rotateflag:1,
      needshake:0,
      needshakeid:'',
      shaked :0,//用于判断是否给分
      strech_count:0,
      needstretch:0,
      needstretchid:'',
      stretched:0,
      activeIndex:"default",
      weightlist:[],
      weightprops:{}, //所有电子称属性 {id:[示数,name]}
      measuring_cylinderlist:[],
      measuring_cylinderprops:{},
      needlelist:[],
      needleprops:{},
      standlist:[],
      heater_temp_switch:false,
      heater_temp_value:0,
      heater_stir_switch:false,
      heater_stir_value:0,
      temp_stable:0,
      hasClock:false,
      liquid_transferorlist:[],
      liquid_transferorprops:{},
      liquid_transferor_btn_color:'green',
      correct_use_transferor:[0,0],
      timeout1:null,
      timeout2:null,
      timeout3:null,
      timeout4:null,
      timeout5:null,
      particleSystem:null,
      fountain:null,
      fogTexture:null,
      refresh:true,
      show1:false,
      show2:false,
      show3:false,
      show4:false,
      bb8warning:'实验中请穿好实验服，戴好护目镜',
      stand_movable_high:0,
      post_dialog:false,
      post_score:0,
      post_errortext1:[],
      post_errortext2:[],
      post_errortext3:[],
      post_errortext4:[],
      reset_dialog:false,
      needle_value_btn_up:true,
      needle_value_btn_down:true,
      needle_value_btn_post:true,
      //以下6个数值要发到后台进行计算。以验证是否能做出成品
      C8H14O2S2:'',
      Fecl3:'',
      C3H6O:'',
      DIB:'',
      temperature:'',
      pipette:''
    };
  },
  components:{
    myProgress,
    myNeedleProgress,
    electronicScale,
    myClock,
    myPipetteProgress
  },
  mixins:[addModels,step1Function,step2Function,step3Function,step4Function],
  methods: {
    async init() {
      this.canvas = document.getElementById("renderCanvas");
      this.engine = new BABYLON.Engine(this.canvas, true, { stencil: true });
      this.scene = await this.createScene();
      this.hl = new BABYLON.HighlightLayer("hl1", this.scene, {
        mainTextureRatio: 1
      }); //high light
      this.hl.innerGlow = false;
      await this.createCamera(this.scene, this.canvas);
      await this.createLight(this.scene);
      await this.createModel(this.scene, this.canvas);
      this.fountain = BABYLON.Mesh.CreateBox("foutain", .01, this.scene);
      this.fountain.visibility = 0;
      this.fogTexture = new BABYLON.Texture("/images/smoke_15.png", this.scene);
      this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
        "UI"
      );
      this.engine.runRenderLoop(() => {
        //摇晃
        if(this.needshake == 1){
          if(this.shake_count <=35){
            var mesh = this.scene.getMeshByID(this.needshakeid)
            var n = 1/2;
            if(mesh.rotation.z<Math.PI/10 && this.rotateflag == 1){
              mesh.rotation.z+=n*Math.PI/10;
              if(mesh.rotation.z==Math.PI/10)this.rotateflag = 2;
            }
            else if(mesh.rotation.z<=Math.PI/10 && this.rotateflag == 2){
              mesh.rotation.z-=n*Math.PI/10;
              if(mesh.rotation.z==0)this.rotateflag = 3;
            }
            else if(mesh.rotation.z>-Math.PI/10 && this.rotateflag == 3){
              mesh.rotation.z-=n*Math.PI/10;
              if(mesh.rotation.z==-Math.PI/10)this.rotateflag = 4;
            }
            else if(mesh.rotation.z>=-Math.PI/10 && this.rotateflag == 4){
              mesh.rotation.z+=n*Math.PI/10;
              if(mesh.rotation.z==0)this.rotateflag = 1;
            }
            this.shake_count++;
          }
          else{
            //摇完了
            this.shake_count = 0;
            this.needshake = 0;
            this.rotateflag = 1;
            var po = this.getMergedPosition(this.needshakeid);
            this.scene.removeMesh(this.scene.getMeshByID(this.needshakeid));
            this.needshakeid = '';
            this.addModel('tri_flask_full_fecl3',new BABYLON.Vector3(0.8,0.8,0.8),new BABYLON.Vector3(po[0],0,po[2]),null,['PointerDragBehavior'],null);
          }
        }

        //拉伸
        if(this.needstretch == 1){
          if(this.strech_count <=200){
            var mesh = this.scene.getMeshByID(this.needstretchid)
            var n = 1/4;
            if(mesh.rotation.z<Math.PI/10 && this.rotateflag == 1){
              mesh.rotation.z+=n*Math.PI/10;
              if(mesh.rotation.z==Math.PI/10)this.rotateflag = 2;
            }
            else if(mesh.rotation.z<=Math.PI/10 && this.rotateflag == 2){
              mesh.rotation.z-=n*Math.PI/10;
              if(mesh.rotation.z==0)this.rotateflag = 3;
            }
            else if(mesh.rotation.z>-Math.PI/10 && this.rotateflag == 3){
              mesh.rotation.z-=n*Math.PI/10;
              if(mesh.rotation.z==-Math.PI/10)this.rotateflag = 4;
            }
            else if(mesh.rotation.z>=-Math.PI/10 && this.rotateflag == 4){
              mesh.rotation.z+=n*Math.PI/10;
              if(mesh.rotation.z==0)this.rotateflag = 1;
            }
            this.strech_count++;
          }
          else{
            //拉伸完了
            this.strech_count = 0;
            this.needstretch = 0;
            var mesh = this.scene.getMeshByID(this.needstretchid)
            mesh.id = 'glass_pad_yellow_cylinder_stretched';
            mesh.id = this.addName(mesh.id);
            mesh.rotation = new BABYLON.Vector3(0,0,0);
            var po = this.getMergedPosition(mesh.id);
            this.rotateflag = 1;
            this.needstretchid = '';
            //往后台发东西 发6个东西
            this.axios.request({
              url:'/experiment/',
              method:'POST',
              data:{
                C8H14O2S2:this.C8H14O2S2,
                Fecl3:this.Fecl3,
                C3H6O:this.C3H6O,
                DIB:this.DIB,
                temperature:this.temperature,
                pipette:this.pipette
              }
            }).then(data=>{
              var result = data.data['result'];
              if(result==1){
              this.$notify({
                title: '解锁成就!',
                message: '你做出了拉伸后不会断裂，强度高，有弹性的胶黏物！',
                type: 'success',
                duration: 0
              });
              this.scene.removeMesh(mesh);
              this.addModel('yellow_cylinder', new BABYLON.Vector3(0.05, 0.08, 0.12),new BABYLON.Vector3(-po[0],po[1],po[2]), new BABYLON.Vector3(0,Math.PI/2,0),null,'yc1');
              this.addModel('glass_pad', new BABYLON.Vector3(0.01, 0.01, 0.01), new BABYLON.Vector3(-po[0]+0.06,po[1],po[2]), null,null, 'g1');
              this.addModel('glass_pad', new BABYLON.Vector3(0.01, 0.01, 0.01), new BABYLON.Vector3(-po[0]+0.06,po[1]+0.02,po[2]), null,null, 'g2');
              this.addModel('glass_pad', new BABYLON.Vector3(0.01, 0.01, 0.01), new BABYLON.Vector3(-po[0]-0.1-0.01,po[1],po[2]), null,null, 'g3');
              this.addModel('glass_pad', new BABYLON.Vector3(0.01, 0.01, 0.01), new BABYLON.Vector3(-po[0]-0.1-0.01,po[1]+0.02,po[2]), null,null, 'g4'); 
              var timer = setInterval(() => {
                if(this.scene.getMeshByID('yc1')!=undefined &&
                this.scene.getMeshByID('g1')!=undefined &&
                this.scene.getMeshByID('g2')!=undefined &&
                this.scene.getMeshByID('g3')!=undefined &&
                this.scene.getMeshByID('g4')!=undefined
                ){
                  var mesh1 = BABYLON.Mesh.MergeMeshes(
                    [this.scene.getMeshByID('yc1'), this.scene.getMeshByID('g1'),this.scene.getMeshByID('g2'),
                    this.scene.getMeshByID('g3'),this.scene.getMeshByID('g4')],
                    true,
                    true,
                    undefined,
                    false,
                    true
                  );
                  mesh1.id = 'glass_pad_yellow_cylinder_stretched';
                  mesh1.id = this.addName(mesh1.id);
                  mesh1.addBehavior(
                      new BABYLON.PointerDragBehavior({
                          dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                      })
                  );
                  window.clearInterval(timer);
                }
              }, 100);
            }
            else {
              const h = this.$createElement;
              this.$notify({
                title: '出现了一点小问题',
                message:h('p', null, [
                  h('i', { style: 'color: red' }, '你没有做出强度高的胶黏物'),
                  h('span',{ style: 'color: teal' }, '，这可能是因为你在量取，吸取，称量，温度、时间控制等过程中出现了差错，仔细分析一下错误原因，下一次你会做的更好。')
                ]) ,
                type:'warning',
                duration: 0
              });
              this.scene.removeMesh(mesh);
              this.addModel('yellow_cylinder', new BABYLON.Vector3(0.08, 0.08, 0.04),new BABYLON.Vector3(-po[0],po[1],po[2]), new BABYLON.Vector3(0,Math.PI/2,0),null,'yc1');
              this.addModel('yellow_cylinder', new BABYLON.Vector3(0.08, 0.08, 0.04),new BABYLON.Vector3(-po[0]-0.1,po[1],po[2]), new BABYLON.Vector3(0,Math.PI/2,0),null, 'yc2');
              this.addModel('glass_pad', new BABYLON.Vector3(0.01, 0.01, 0.01), new BABYLON.Vector3(-po[0]+0.03,po[1],po[2]), null,null, 'g1');
              this.addModel('glass_pad', new BABYLON.Vector3(0.01, 0.01, 0.01), new BABYLON.Vector3(-po[0]+0.03,po[1]+0.02,po[2]), null,null, 'g2');
              this.addModel('glass_pad', new BABYLON.Vector3(0.01, 0.01, 0.01), new BABYLON.Vector3(-po[0]-0.1-0.04,po[1],po[2]), null,null, 'g3');
              this.addModel('glass_pad', new BABYLON.Vector3(0.01, 0.01, 0.01), new BABYLON.Vector3(-po[0]-0.1-0.04,po[1]+0.02,po[2]), null,null, 'g4'); 
              var timer = setInterval(() => {
                if(this.scene.getMeshByID('yc1')!=undefined &&
                this.scene.getMeshByID('yc2')!=undefined &&
                this.scene.getMeshByID('g1')!=undefined &&
                this.scene.getMeshByID('g2')!=undefined &&
                this.scene.getMeshByID('g3')!=undefined &&
                this.scene.getMeshByID('g4')!=undefined
                ){
                  var mesh1 = BABYLON.Mesh.MergeMeshes(
                    [this.scene.getMeshByID('yc1'), this.scene.getMeshByID('g1'),this.scene.getMeshByID('g2')],
                    true,
                    true,
                    undefined,
                    false,
                    true
                  );
                  mesh1.id = 'glass_pad_yellow_cylinder_break';
                  mesh1.id = this.addName(mesh1.id);
                  mesh1.addBehavior(
                      new BABYLON.PointerDragBehavior({
                          dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                      })
                  );
                  var mesh2 = BABYLON.Mesh.MergeMeshes(
                      [this.scene.getMeshByID('yc2'), this.scene.getMeshByID('g3'),this.scene.getMeshByID('g4')],
                      true,
                      true,
                      undefined,
                      false,
                      true
                  );
                  mesh2.id = 'glass_pad_yellow_cylinder_break';
                  mesh2.id = this.addName(mesh2.id);
                  mesh2.addBehavior(
                      new BABYLON.PointerDragBehavior({
                          dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                      })
                  );
                  window.clearInterval(timer);
                }
              }, 100);
            }
            })
            
          }
        }

        //加热开关搅拌开关
        if(this.heater_stir_switch == true){//搅拌
          
          this.hl.addMesh(this.scene.getMeshByID('heater_switch1'), BABYLON.Color3.Yellow());
          for(var i=0;i<this.scene.meshes.length;i++){
            if(this.scene.meshes[i].id.split('-')[0]=='magneton_stiring'){
              this.scene.meshes[i].rotation.y+=this.heater_stir_value/100; 
            }
            if(this.scene.meshes[i].id.split('-')[0]=='round_flask_c8h14o2s2' && this.scene.getMeshByID('conedel')==null){
              this.step3node1=1;
            }
          }
        }
        else {
          if(this.scene.getMeshByID('heater_switch1')!=null && this.hl.hasMesh(this.scene.getMeshByID('heater_switch1'))){
            this.hl.removeMesh(this.scene.getMeshByID('heater_switch1'))
          }
        }
        if(this.heater_temp_switch == true){//加热
          this.temperature = this.heater_temp_value+'';
          if(!this.hl.hasMesh(this.scene.getMeshByID('heater_switch2'))){
            this.hl.addMesh(this.scene.getMeshByID('heater_switch2'), BABYLON.Color3.Yellow());
          }
          if(this.heater_temp_value >= 120 && this.heater_temp_value<=160 && this.temp_stable==0){
            this.temp_stable =2;//如果这里不将它赋值为2 那么下一次渲染还是会进来 
            this.timeout5 = setTimeout(() => {
              if(this.heater_temp_value >= 120 && this.heater_temp_value<=160){
                this.temp_stable =1;//温度稳定为1
                this.addFog();
                this.timeout3 = setTimeout(() => {
                  this.scene.removeMesh(this.scene.getMeshByID('conedel'));
                }, 60000);
                this.timeout4 = setTimeout(() => {
                  this.addModel('round_flask_c8h14o2s2',null,new BABYLON.Vector3(-0.5,0.1,-0.3),null,null,null);
                  this.scene.removeMesh(this.scene.getMeshByID('round_flaskdel'));
                }, 30000);
              }
              else{
                this.temp_stable=0;
              }
            }, 5000);
          }
        }
        else {
          if(this.scene.getMeshByID('heater_switch2')!=null && this.hl.hasMesh(this.scene.getMeshByID('heater_switch2'))){
            if(this.particleSystem!=null)this.particleSystem.reset();
            this.particleSystem = null;
            this.hl.removeMesh(this.scene.getMeshByID('heater_switch2'));
            this.heater_stir_switch = false;
            if(this.scene.getMeshByID('heater_switch1')!=null && this.hl.hasMesh(this.scene.getMeshByID('heater_switch1'))){
              this.hl.removeMesh(this.scene.getMeshByID('heater_switch1'))
            }
            this.temp_stable=0;
          }
        }
        if(this.e1==1){
          this.getScore_step1()  
        }
        else if (this.e1==2) {
          this.getScore_step2()  
        } 
        else if (this.e1==3) {
          this.getScore_step3()
        } 
        else if (this.e1==4) {
          this.getScore_step4()
        } 
        this.scene.render();
      });

      window.addEventListener("resize", () => {
        this.engine.resize();
      });
      window.addEventListener("pointermove", () => {
        var pickResult = this.scene.pick(
          this.scene.pointerX,
          this.scene.pointerY
        );
        if (this.hoveredObj != null) {
          this.hl.removeMesh(this.hoveredObj);
          this.hoveredObj = null;
        }
        if (pickResult.hit) {
          var array1 = [
            "weight.round_flask",
            "weight.paper",
            "stand.tri_flask",
            "stand.round_flask",
            "weight.pot",
            "weight.tri_flask",
            "weight.paper_cone",
            "weight.paper_powder_brown",
            "stand.round_flask_cone",
            "stand.tri_flask_powder_brown",
            "tri_flask_full_trans_powder_brown",
            "needle.cap",
            "needle_full.cap",
            "tri_flask_full_fecl3.film",
            "needle_full.tri_flask",
            'glass_pad_yellow_cylinder',
            "dib.bottle_cap",
            "fecl3.bottle_cap",
            "c3h6o.bottle_cap",
            "c8h14o2s2.bottle_cap"
          ];
          if (pickResult.pickedMesh.id != "ground") {
            this.hl.addMesh(pickResult.pickedMesh, BABYLON.Color3.Purple());
            if (
              this.pickingObj != null &&
              this.pickingObj.id != pickResult.pickedMesh.id
            ) {
              if(this.weightlist.indexOf(pickResult.pickedMesh.id)!=-1 || this.measuring_cylinderlist.indexOf(pickResult.pickedMesh.id)!=-1) this.activeIndex = pickResult.pickedMesh.id;
              this.stable = 0;
              this.addGui_combination(this.pickingObj.id, pickResult.pickedMesh.id);
            } else if (
              array1.includes(pickResult.pickedMesh.id.split('-')[0]) &&
              this.stable == 0 &&
              this.controller == null
            ) {
              //this.controller==null is neccesary!
              this.addGui_separation(pickResult.pickedMesh.id);
              this.stable = 1;
              //由于merge需要时间 所以可能会导致merge之前就出现分离按钮 导致未能移除网格 （bug）
            }
            this.hoveredObj = pickResult.pickedMesh;
          } else {
            this.stable = 0;
            if (this.pickingObj != null && this.controller != null) {
              this.advancedTexture.removeControl(this.controller);
              this.controller = null;
            } else if (
              this.controller != null &&
              this.controller.name == "btn2"
            ) {
              this.advancedTexture.removeControl(this.controller);
              this.controller = null;
            }
          }
        }
      });
      window.addEventListener("pointerdown", () => {
        var pickResult = this.scene.pick(
          this.scene.pointerX,
          this.scene.pointerY
        );
        if (pickResult.hit) {
          if (pickResult.pickedMesh.id != "ground") {
            if(this.weightlist.indexOf(pickResult.pickedMesh.id)!= -1 || this.measuring_cylinderlist.indexOf(pickResult.pickedMesh.id)!=-1 || this.needlelist.indexOf(pickResult.pickedMesh.id)!= -1 ||pickResult.pickedMesh.id.split('-')[0]=='stand1_pole' || this.liquid_transferorlist.indexOf(pickResult.pickedMesh.id)!= -1){
              this.activeIndex = pickResult.pickedMesh.id
            }
            else if(pickResult.pickedMesh.id.split('-')[0]==''){
              this.activeIndex = 'default'
            }
            this.hl.addMesh(pickResult.pickedMesh, BABYLON.Color3.Purple());
            this.pickingObj = pickResult.pickedMesh;
          }
        }
      });
      window.addEventListener("pointerup", () => {
        if (this.pickingObj != null) {
          this.hl.removeMesh(this.pickingObj);
          this.pickingObj = null;
        }
      });
    },
    addGui_separation(hoverid) {
      if (this.controller != null) {
        this.advancedTexture.removeControl(this.controller);
        this.controller = null;
      }
      if(hoverid.split('-').includes('tri_flask_full_trans_powder_brown')){
        var button1 = GUI.Button.CreateSimpleButton("btn2", "震荡");
        button1.background = "orange";
        button1.fontSize = 14;
      }
      else if(hoverid.split('-').includes('glass_pad_yellow_cylinder')){
        var button1 = GUI.Button.CreateSimpleButton("btn2", "拉伸");
        button1.background = "orange";
        button1.fontSize = 14;
      }
      else{
        var button1 = GUI.Button.CreateSimpleButton("btn2", "分离");
        button1.background = "gray";
        button1.fontSize = 16;
      }
      button1.width = "40px";
      button1.height = "20px";
      
      button1.cornerRadius = 20;
      this.advancedTexture.addControl(button1);
      button1.linkWithMesh(this.scene.getMeshByID(hoverid));
      button1.color = "black";
      this.controller = button1;
      
      button1.onPointerClickObservable.add(() => {
        var array1 = hoverid.split('-')[0].split(".");
        if(!(hoverid.split('-').includes("tri_flask_full_trans_powder_brown") 
        || hoverid.split('-')[0]=='needle.cap'
        || hoverid.split('-')[0]=='needle_full.cap'
        || hoverid.split('-')[0]=='glass_pad_yellow_cylinder')){
          //非这四者 都删除
          this.scene.removeMesh(this.scene.getMeshByID(hoverid));
          if(this.weightlist.indexOf(hoverid)!=-1){
            this.weightlist.splice(this.weightlist.indexOf(hoverid),1)
            delete(this.weightlist[hoverid])
          }
        }
        if(hoverid.split('-')[0]=='needle.cap'){
          //将针管 针管冒分离之后不分离到原点
          var po = this.getMergedPosition(hoverid);
          this.scene.removeMesh(this.scene.getMeshByID(hoverid));
          this.addCap(po[0],po[1]+0.5,po[2]);
          this.addModel('needle',new BABYLON.Vector3(2,2,2),new BABYLON.Vector3(po[0],po[1]+0.3,po[2]),new BABYLON.Vector3(0,0,Math.PI),null,'needle');
          var timer = setInterval(() => {
            if(this.scene.getMeshByID('needle')!=undefined){
              var mesh = this.scene.getMeshByID('needle');
              mesh.id = this.addName(mesh.id);
              this.needlelist[this.needlelist.indexOf(hoverid)] = mesh.id;
              this.needleprops[mesh.id] = this.needleprops[hoverid]
              delete(this.needleprops[hoverid])
              this.activeIndex = mesh.id
              mesh.addBehavior(
                new BABYLON.PointerDragBehavior({
                  dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                })
              );
              window.clearInterval(timer);
            }
          }, 100); 
        }else if(hoverid.split('-')[0]=='needle_full.cap'){
          var po = this.getMergedPosition(hoverid);
          this.scene.removeMesh(this.scene.getMeshByID(hoverid));
          this.addCap(po[0],po[1]-0.13,po[2]);
          this.addModel('needle_full',new BABYLON.Vector3(2,2,2),new BABYLON.Vector3(po[0],po[1],po[2]),new BABYLON.Vector3(0,0,Math.PI),null,'needle_full');
          var timer = setInterval(() => {
            if(this.scene.getMeshByID('needle_full')!=undefined){
              var mesh = this.scene.getMeshByID('needle_full');
              mesh.id = this.addName(mesh.id);
              this.needlelist[this.needlelist.indexOf(hoverid)] = mesh.id;
              this.needleprops[mesh.id] = this.needleprops[hoverid]
              delete(this.needleprops[hoverid])
              this.activeIndex = mesh.id
              mesh.addBehavior(
                new BABYLON.PointerDragBehavior({
                  dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                })
              );
              window.clearInterval(timer);
            }
          }, 100); 
        }
        else if(hoverid.split('-')[0]=='needle_full.tri_flask'){
          this.addNeedleFull();
        }
        else if(hoverid.split('-')[0]=='weight.paper_cone'){
          var i = 0;
          var str = '';
          for(i;i<this.weightprops[hoverid][0].length;i++){
            if(i==3){
              str+='.';
            }
            if(this.weightprops[hoverid][0][i]!=null){
              str += this.weightprops[hoverid][0][i];
            }
          }
          this.C8H14O2S2 = str;
          if(this.weightprops[hoverid][0].toString() == [null, null, 2, 0, 0, 0].toString()){
            this.step1node2 = 1;
          }
        }
        else if(hoverid.split('-')[0]=='weight.paper_powder_brown'){
          var i = 0;
          var str = '';
          for(i;i<this.weightprops[hoverid][0].length;i++){
            if(i==3){
              str+='.';
            }
            if(this.weightprops[hoverid][0][i]!=null){
              str += this.weightprops[hoverid][0][i];
            }
          }
          this.Fecl3 = str;
          if(this.weightprops[hoverid][0].toString() == [null, null, 0, 1, 0, 0].toString()){
            this.step1node6 = 1;
          }
        }
        for (var i = 0; i < array1.length; i++) {
          switch (array1[i]) {
            case "weight":
              this.addWeight();
              break;
            case "paper":
              this.addPaper();
              break;
            case "round_flask":
              this.addRoundFlask();
              break;
            case "pot":
              this.addPot();
              break;
            case "stand":
              this.addStand();
              break;
            case "dib":
              this.addDibNoCap();
              break;
            case "c3h6o":
              this.addAsetoneNoCap();
              break;
            case "c8h14o2s2":
              this.addC8h14o2s2NoCap();
              break;
            case "fecl3":
              this.addFecl3NoCap();
              break;
            case "bottle_cap":
              this.addBottleCap();
              break;
            case "tri_flask":
              this.addTriFlask();
              break;
            case "paper_cone":
              this.addPaperCone();
              break;
            case "paper_powder_brown":
              this.addPaperPowderBrown();
              break;
            case "round_flask_cone":
              this.addRoundFlaskCone();
              break;
            case "tri_flask_powder_brown":
              this.addTriFlaskPowderBrown();
              break;
            case "tri_flask_full_trans_powder_brown":
              //震荡方法
              this.needshakeid = hoverid;
              this.needshake = 1;
              this.shaked = 1;
              break;
            case "glass_pad_yellow_cylinder":
              this.needstretchid = hoverid;
              this.needstretch = 1;
              this.stretched = 1;
              break;
            case "tri_flask_full_fecl3":
              this.addModel('tri_flask_full_fecl3', new BABYLON.Vector3(0.8,0.8,0.8), null, null, ['PointerDragBehavior'], null);
              break;
            case "film":
              this.addFilm();
              break;
            default:
              break;
          }
        }
      });
    },
    addGui_combination(pickid, hoverid) {
      if (this.controller != null) {
        this.advancedTexture.removeControl(this.controller);
        this.controller = null;
      }

      switch (this.e1) {
        case 1:
          var str = "拼接";
          if (hoverid.split('-')[0] == "weight" ||pickid.split("-")[0]=='spoon_cone'||pickid.split("-")[0]=='spoon_powder_brown'
           ||(pickid.split('-')[0] =='pot' && hoverid.split('-')[0] == 'heater')) str = "放置";
          else if (hoverid.split('-')[0] == "trash_can") str = "移除";
          else if (pickid.split('-')[0] == "spoon") str = "拾取";
          else if ( hoverid.split('-')[0] == "round_flask" ||hoverid.split('-')[0] == 'tri_flask'||
           pickid.split('-')[0]=='measuring_cylinder_full') str = "倒入";
          else if(pickid.split('-')[0] == 'dropper_full')str = '挤入';
          else if(pickid.split('-')[0] == 'dropper' && hoverid.split('-')[0] == 'c3h6o') str = '吸入';
          else if(pickid.split('-')[0] == 'needle' && hoverid.split('-')[0] == 'dib')str = '准备吸入';
          else if( pickid.split('-')[0] =='film') str = '封口';
          else if(pickid.split("-")[0]=='bottle_cap'||pickid.split("-")[0]=='cap') str = '盖上';
          break;
        case 2:
          var str = '拼接';
          if (hoverid.split('-')[0] == "trash_can") str = "移除";
          else if(pickid.split('-')[0] == 'pot')str = "放置";
          else if(pickid.split('-')[0] == 'thermometer' && hoverid.split('-')[0]=='round_flask_cone.pot.heater.stand1'){
            str = '插入';
            this.bb8warning = '真实实验中温度计不要触及到油浴锅底部并用铁夹悬挂'
            this.activeIndex = 'default'
          }
          break;
        case 3:
          var str = '拼接';
          if (hoverid.split('-')[0] == "trash_can") str = "移除";
          else if(pickid.split('-')[0]=='magneton.tweezer' && hoverid.split('-')[0]=='round_flask_c8h14o2s2')str='放入';
          else if(pickid.split('-')[0]=='needle_full' && hoverid.split('-')[0]=='round_flask_c8h14o2s2')str = '挤入';
          else if(pickid.split('-')[0]=='needle' && hoverid.split('-')[0]=='round_flask_c8h14o2s2')str = '吸入';
          else if( pickid.split('-')[0] =='film') str = '封口';
          else if(pickid.split('-')[0]=='liquid_transferor' && hoverid.split('-')[0] == 'tri_flask_full_fecl3')str = '准备吸入';
          else if(pickid.split('-')[0]=='liquid_transferor' && hoverid.split('-')[0] == 'round_flask_c8h14o2s2')str = '准备挤入';
          else if((pickid.split('-')[0]=='needle_full'||pickid.split('-')[0]=='needle_full_glue') && hoverid.split('-')[0]=='tri_flask')str = '放入';      
          else if(pickid.split('-')[0]=='tweezer' && hoverid.split('-')[0]=='magneton')str = '夹起';    
          else if(pickid.split('-')[0] == 'magneton.tweezer' && hoverid.split('-')[0] == 'round_flaskdel')str ='放入';  
          else if(pickid.split("-")[0]=='bottle_cap'||pickid.split("-")[0]=='cap') str = '盖上';
          break;
        case 4:
          var str = '拼接';
          if (hoverid.split('-')[0] == "trash_can") str = "移除";
          else if(pickid.split('-')[0]=='scissors' && hoverid.split('-')[0]=='needle_full_glue') str='剪开';
          break;
        default:
          break;
      }
      var button1 = GUI.Button.CreateSimpleButton("btn1", str);
      this.advancedTexture.addControl(button1);
      button1.width = "60px";
      button1.height = "40px";
      button1.fontSize = 16;
      button1.cornerRadius = 20;
      button1.background = "white";
      button1.linkWithMesh(this.scene.getMeshByID(hoverid));
      button1.linkOffsetY = -50;
      button1.linkOffsetX = -50;
      button1.color = "black";
      this.controller = button1;
      button1.onPointerClickObservable.add(() => {
        //有称的话 加示数
        if (hoverid.split('-')[0] == "weight" || hoverid.split('-')[0].indexOf("weight") != -1) {
          var array1 = new Array(6);
          array1.fill(0);
          var thing = pickid.split('-')[0].split(".");
          for (var j = 0; j < thing.length; j++) {
            if (this.quality.hasOwnProperty(thing[j])) {
              for (var i = 5; i >= 0; i--) {
                if (
                  this.quality[thing[j]][i] == null &&
                  this.weightprops[hoverid][0][i] == null &&
                  array1[i] == 0
                )
                  array1[i] = null;
                else {
                  array1[i] +=
                    (this.quality[thing[j]][i] +
                      this.weightprops[hoverid][0][i]) %
                    10;
                  if (
                    this.quality[thing[j]][i] +
                      this.weightprops[hoverid][0][i] >=
                    10
                  ) {
                    if (i - 1 < 0) {
                      alert("电子秤量度范围不足！");
                    } else array1[i - 1] += 1;
                  }
                }
              }
              this.weightprops[hoverid][0] = [array1[0],array1[1],array1[2],array1[3],array1[4],array1[5]]
            }
          }
        }

        if(this.e1 == 1){
          this.checkPickHover1(pickid,hoverid);
        }
        else if(this.e1 == 2){
          this.checkPickHover2(pickid,hoverid);
        }
        else if(this.e1 == 3){
          this.checkPickHover3(pickid,hoverid);
        }
        else if(this.e1 == 4){
          this.checkPickHover4(pickid,hoverid);
        }
        this.advancedTexture.removeControl(this.controller);
        this.controller = null;
      });
    },
    //这个方法用于merge后的物体位置的更改 我发现经过merge后 坐标由世界坐标系变成了本地坐标系
    changeMergedPosition(id,x,y,z){ 
      var mesh = this.scene.getMeshByID(id)
      mesh.updateFacetData();
      var po = mesh.getFacetPosition(Math.floor(mesh.facetNb / 2));
      var x0 = po.x;
      var y0 = po.y;
      var z0 = po.z;
      var x1 = -x-x0+mesh.position.x;
      var y1 = y-y0+mesh.position.y;
      var z1 = z-z0+mesh.position.z;
      mesh.disableFacetData();
      var position = new BABYLON.Vector3(x1,y1,z1)
      return position;
    },

    getMergedPosition(id){
      var mesh = this.scene.getMeshByID(id)
      mesh.updateFacetData();
      if(id.split('-')[0] == 'stand1'){
        var po = mesh.getFacetPosition(mesh.facetNb-1);
      }
      else var po = mesh.getFacetPosition(Math.floor(mesh.facetNb / 2));
      var x0 = po.x;
      var y0 = po.y;
      var z0 = po.z;
      //mesh.disableFacetData();
      return [x0,y0,z0];
    },

    addStand1(array){
      this.stand_movable_high = this.scene.getMeshByID(array[0]).position.y;
      var index = this.standlist.indexOf(array);
      this.standlist.splice(index,1);
      this.activeIndex = 'default'
      var mesh = BABYLON.Mesh.MergeMeshes(
          [
              this.scene.getMeshByID(array[0]),
              this.scene.getMeshByID(array[1])
          ],
          true,
          true,
          undefined,
          false,
          true
      );
      mesh.addBehavior(
          new BABYLON.PointerDragBehavior({
              dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
          })
      );
      if(array[0].split('-')[0]=='stand1_movable.round_flask_cone'){
        mesh.id = 'stand1.round_flask_cone' 
        mesh.id = this.addName(mesh.id);
      }
      else{
        mesh.id = 'stand1';
        mesh.id = this.addName(mesh.id);
      }
      this.bb8warning = '注意在真实实验中，烧瓶浸没在油浴锅中的体积约为2/3'
      this.activeIndex = 'default'
      for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('pot.heater')) {
              var po = this.getMergedPosition(this.scene.meshes[i].id);
                if((-po[0]>=0.58 && -po[0]<=0.87) &&
                (po[2]>=0.067 &&po[2]<=0.427)){
                  this.step2node2 = 1;
                  break;
                }
            }
        }
    },
    addModel(name, scaling, position, rotation, behavior,id) {
      /*
        name String
        scaling BABYLON.Vector3
        position BABYLON.Vector3
        rotation BABYLON.Vector3
        behavior ['PointerDragBehavior',...]
      */
      BABYLON.SceneLoader.ImportMesh(
        "",
        "/model/",
        `${name}.glb`,
        this.scene,
        obj => {
          var array1 = [];
          for(var i=0;i<obj.length;i++){
            if(obj[i].id!='__root__'){array1.push(this.scene.getMeshByID(obj[i].id))}
          }
          if(array1.length>=2){
            var mesh = BABYLON.Mesh.MergeMeshes(
            array1,
            true,
            true,
            undefined,
            false,
            true
            );
          }
          else{
            var mesh = array1[0];
          }
          mesh.id = name;
          mesh.id  = this.addName(mesh.id);
          var code1 = new BABYLON.PointerDragBehavior({
            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
          })//前后
          var code2 = new BABYLON.PointerDragBehavior({
            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
          })//竖直
          var dict = {'PointerDragBehavior':code1,'PointerDragBehavior2':code2};
          if (behavior) {
            for (let i = 0; i < behavior.length; i++) {
              mesh.addBehavior(dict[behavior[i]]);
            }
          }
          if (position) mesh.position = position;
          if (scaling) mesh.scaling = scaling;
          if (rotation) mesh.rotation = rotation;
          if (id) mesh.id = id;//merge的时候加这个
          return mesh;
        }
      );
    },

    //转换id
    addName(name){
      var maxcount = 0;
      for(var i=0;i<this.scene.meshes.length;i++){
        if(this.scene.meshes[i].id.split('-').includes(name)){
          var count = (this.scene.meshes[i].id.split('-')[1]==undefined)?0:parseInt(this.scene.meshes[i].id.split('-')[1]);
          if(count>maxcount)maxcount = count;
        }
      }
      return name+"-"+(maxcount+1);
    },

    modifyElectronicScale() {
      for(var i=0;i<this.weightlist.length;i++){
        var re = this.weightprops[this.weightlist[i]][0]
        this.$refs.weight[i].setAllNumber(re[0],re[1],re[2],re[3],re[4],re[5],this.weightlist[i]);
      }
    },

    changeNeedleValue(id,str){
      switch (str) {
        case "up":
          if(this.needleprops[id][0]==0){
            this.needleprops[id][0]+=0.05;
            this.needleprops[id][0] = Math.floor(this.needleprops[id][0] * 100) / 100;
            var po = this.getMergedPosition(id);
            this.scene.removeMesh(this.scene.getMeshByID(id));
            this.addModel('needle_full', new BABYLON.Vector3(2,2,2), new BABYLON.Vector3(po[0], po[1] + 0.23, po[2]), new BABYLON.Vector3(0, 0, Math.PI), null, 'needle_full');
            var timer = setInterval(() => {
              if (this.scene.getMeshByID('needle_full')!=undefined){
                var mesh = this.scene.getMeshByID('needle_full')
                mesh.id = this.addName(mesh.id)
                this.activeIndex = mesh.id;
                this.needlelist[this.needlelist.indexOf(id)] = mesh.id
                this.needleprops[mesh.id] = this.needleprops[id]
                delete(this.needleprops[id])
                window.clearInterval(timer);
              }
            }, 100);
          }
          else if(this.needleprops[id][0]==1)return;
          else {
            this.needleprops[id][0]+=0.05;
            this.needleprops[id][0] = Math.floor(this.needleprops[id][0] * 100) / 100;
          }
          this.refreshComponents();
          break;
        default:
          if(this.needleprops[id][0]==0)return;
          else if(this.needleprops[id][0]==0.05){
            this.needleprops[id][0]-=0.05;
            this.needleprops[id][0] = Math.floor(this.needleprops[id][0] * 100) / 100;
            var po = this.getMergedPosition(id);
            this.scene.removeMesh(this.scene.getMeshByID(id));
            this.addModel('needle', new BABYLON.Vector3(1.5,1.5,1.5), new BABYLON.Vector3(po[0], po[1] + 0.2, po[2]), new BABYLON.Vector3(0, 0, Math.PI), null, 'needle');
            var timer = setInterval(() => {
              if (this.scene.getMeshByID('needle')!=undefined){
                var mesh = this.scene.getMeshByID('needle')
                mesh.id = this.addName(mesh.id)
                this.activeIndex = mesh.id;
                this.needlelist[this.needlelist.indexOf(id)] = mesh.id
                this.needleprops[mesh.id] = this.needleprops[id]
                delete(this.needleprops[id])
                window.clearInterval(timer);
              }
            }, 100);
          }
          else {
            this.needleprops[id][0]-=0.05;
            this.needleprops[id][0] = Math.floor(this.needleprops[id][0] * 100) / 100;
          }
          this.refreshComponents();
          break;
      }
    },

    finishChangeNeedleValue(id){
      this.needle_value_btn_up = true;
      this.needle_value_btn_down = true;
      this.needle_value_btn_post = true;
      this.DIB = this.needleprops[id][0]+'';
      if(this.needleprops[id][0]==0.45){
        this.step1node14 = 1;
      }
      this.scene.getMeshByID(id).addBehavior(
          new BABYLON.PointerDragBehavior({
              dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
          })
      );
      if(this.needleprops[id][1]!=''){
        this.scene.getMeshByID(this.needleprops[id][1]).addBehavior(
            new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
            })
        );
        this.needleprops[id][1]='';
      }
    },

    addFog(){
        this.particleSystem = new BABYLON.ParticleSystem("particles", 100, this.scene);
        this.particleSystem.startDelay = 3000
        this.particleSystem.manualEmitCount = this.particleSystem.getCapacity();
        this.particleSystem.minEmitBox = new BABYLON.Vector3(-1,0,-2); // Starting all from
        this.particleSystem.particleTexture = this.fogTexture.clone();
        this.particleSystem.emitter = this.fountain;
	      this.particleSystem.color1 = new BABYLON.Color4(0.8, 0.8, 0.8, 0.1);
        this.particleSystem.color2 = new BABYLON.Color4(.95, .95, .95, 0.15);
        this.particleSystem.colorDead = new BABYLON.Color4(0.9, 0.9, 0.9, 0.1);
	      this.particleSystem.minSize = 0.5;
        this.particleSystem.maxSize = 1;
        this.particleSystem.minLifeTime = Number.MAX_SAFE_INTEGER;
        this.particleSystem.emitRate = 50000;
        this.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
        this.particleSystem.direction1 = new BABYLON.Vector3(0, 0, 0);
        this.particleSystem.direction2 = new BABYLON.Vector3(0, 0, 0);
        this.particleSystem.minAngularSpeed = -2;
	      this.particleSystem.maxAngularSpeed = 2;
        this.particleSystem.minEmitPower = .5;
        this.particleSystem.maxEmitPower = 1;
        this.particleSystem.updateSpeed = 0.1;
    
        this.particleSystem.start();
  
    },
    toZero(name) {
      this.weightprops[name][0] = [null, null, 0, 0, 0, 0];
      this.$refs.weight[this.weightlist.indexOf(name)].setAllNumber(null, null, 0, 0, 0, 0, name);
    },
    toStep1(){
      this.axios.request(
        {
          url:'/experiment/',
          method:'PUT',
          data:{
            username:sessionStorage.getItem('username'),
            step1score:"0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
            step2score:"0,0,0",
            step3score:"0,0,0,0,0,0,0,0,0,0",
            step4score:"0,0",
            nowstep:1
          }
        }
      )
      this.e1 = 1;
      this.step = ["反应前期准备", "", "",""];
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.now_score = 0;
      this.btn_nextstep = false;
      this.btn_post = true;
      if(this.timeout3!=null){
        window.clearTimeout(this.timeout3);
        this.timeout3 = null;
      }
      if(this.timeout4!=null){
        window.clearTimeout(this.timeout4)
        this.timeout4 = null;
      }
      if(this.timeout5!=null){
        window.clearTimeout(this.timeout5)
        this.timeout5=null;
      }
      if(this.particleSystem!=null){
        this.particleSystem.reset();
        this.particleSystem=null;
      }
      this.activeIndex = 'default';
      this.weightlist=[]
      this.weightprops={}
      this.measuring_cylinderlist=[]
      this.measuring_cylinderprops={}
      this.needlelist=[]
      this.needleprops={}
      this.standlist=[]
      this.hasClock=false
      this.shaked = 0;
      this.stretched = 0;
      this.liquid_transferorlist=[]
      this.liquid_transferorprops={}
      this.clearAllScore1();
      this.clearAllScore2();
      this.clearAllScore3();
      this.clearAllScore4();
      this.removeSceneMesh();
      this.addTrash_can();
    },
    toStep2(){
      this.e1 = 2;
      this.step = ["", "搭建反应装置", "",""];
      this.show1 = true;
      this.show2 = true;
      this.show3 = true;
      this.now_score = 0;
      this.btn_nextstep = false;
      this.btn_post = true;
      this.shaked = 0;
      this.stretched = 0;
      if(this.timeout3!=null){
        window.clearTimeout(this.timeout3);
        this.timeout3 = null;
      }
      if(this.timeout4!=null){
        window.clearTimeout(this.timeout4)
        this.timeout4 = null;
      }
      if(this.timeout5!=null){
        window.clearTimeout(this.timeout5)
        this.timeout5=null;
      }
      if(this.particleSystem!=null){
        this.particleSystem.reset();
        this.particleSystem=null;
      }
      this.activeIndex = 'default';
      this.weightlist=[]
      this.weightprops={}
      this.measuring_cylinderlist=[]
      this.measuring_cylinderprops={}
      this.needlelist=[]
      this.needleprops={}
      this.standlist=[]
      this.hasClock=false
      this.liquid_transferorlist=[]
      this.liquid_transferorprops={}
      this.now_score = 0;
      this.removeSceneMesh();
      this.addRoundFlaskCone();
      this.addTrash_can();
    },
    toStep3(){
      this.e1 = 3;
      this.step = ["", "", "聚合物合成",""];
      this.show1 = true;
      this.show2 = true;
      this.show3 = true;
      this.btn_nextstep = false;
      this.btn_post = true;
      this.now_score = 0;
      this.shaked = 0;
      this.stretched = 0;
      if(this.timeout3!=null){
        window.clearTimeout(this.timeout3);
        this.timeout3 = null;
      }
      if(this.timeout4!=null){
        window.clearTimeout(this.timeout4)
        this.timeout4 = null;
      }
      if(this.timeout5!=null){
        window.clearTimeout(this.timeout5)
        this.timeout5=null;
      }
      if(this.particleSystem!=null){
        this.particleSystem.reset();
        this.particleSystem=null;
      }
      this.activeIndex = 'default';
      this.weightlist=[]
      this.weightprops={}
      this.measuring_cylinderlist=[]
      this.measuring_cylinderprops={}
      this.needlelist=[]
      this.needleprops={}
      this.standlist=[]
      this.heater_temp_switch=false
      this.heater_temp_value=0
      this.heater_stir_switch=false
      this.heater_stir_value=0
      this.hasClock=false
      this.liquid_transferorlist=[]
      this.liquid_transferorprops={}
      this.now_score = 0;
      this.removeSceneMesh();
      this.addRoundFlaskConePotHeaterStand1();
      this.addTrash_can();
    },
    toStep4(){
      this.e1 = 4;
      this.step = ["", "", "","鉴定表征"];
      this.btn_nextstep = true;
      this.btn_post = false;
      this.show1 = true;
      this.show2 = true;
      this.show3 = true;
      this.show4 = true;
      this.now_score = 0;
      this.shaked = 0;
      this.stretched = 0;
      if(this.timeout3!=null){
        window.clearTimeout(this.timeout3);
        this.timeout3 = null;
      }
      if(this.timeout4!=null){
        window.clearTimeout(this.timeout4);
        this.timeout4 = null;
      }
      if(this.timeout5!=null){
        window.clearTimeout(this.timeout5);
        this.timeout5=null;
      }
      if(this.particleSystem!=null){
        this.particleSystem.reset();
        this.particleSystem=null;
      }
      this.activeIndex = 'default';
      this.removeSceneMesh();
      this.weightlist=[]
      this.weightprops={}
      this.measuring_cylinderlist=[]
      this.measuring_cylinderprops={}
      this.needlelist=[]
      this.needleprops={}
      this.standlist=[]
      this.heater_temp_switch=false
      this.heater_temp_value=0
      this.heater_stir_switch=false
      this.heater_stir_value=0
      this.hasClock=false
      this.liquid_transferorlist=[]
      this.liquid_transferorprops={}
      this.now_score = 0;
      this.removeSceneMesh();
      this.addNeedleFullTriFlask();
      this.addTrash_can();
    },
    removeSceneMesh(){
      var list = [];
      for(var i=0;i<this.scene.meshes.length;i++){
        if(this.scene.meshes[i].id!="foutain" && this.scene.meshes[i].id!="ground")
        {
          list.push(this.scene.meshes[i].id)
        }
      }
      for(var i=0;i<list.length;i++){
        var mesh = this.scene.getMeshByID(list[i]);
        this.scene.removeMesh(mesh)
      }
    },
    showErrorText(){
      switch (this.e1) {
        case 1:
          this.errortext = this.step1.getAllNodeErrorText();
          break;
        case 2:
          this.errortext = this.step2.getAllNodeErrorText();
          break;
        case 3:
          this.errortext = this.step3.getAllNodeErrorText();
          break;
        case 4:
          this.errortext = this.step4.getAllNodeErrorText();
        default:
          break;
      }
      this.dialog_result = true;
    },
    nextStep() {
      this.e1++;
      var step1score = this.getScoreString1();
      var step2score = this.getScoreString2();
      var step3score = this.getScoreString3();
      var step4score = this.getScoreString4();
      this.axios.request(
        {
          url:'/experiment/',
          method:'PUT',
          data:{
            username:sessionStorage.getItem('username'),
            step1score:step1score,
            step2score:step2score,
            step3score:step3score,
            step4score:step4score,
            nowstep:this.e1
          }
        }
      )
      switch (this.e1) {
        case 2:
          this.toStep2();
          break;
        case 3:
          this.toStep3();
          break;
        case 4:         
          this.toStep4();
          break;
        default:
          break;
      }
      
    },

    refreshComponents(){
      this.refresh = false
      this.$nextTick(() => {
      this.refresh = true
      })
    },

    changeStandMovablePosition(id,str){
      if(str == 'down'){
        this.scene.getMeshByID(id).position.y -= 0.05
      }
      else if(str == 'up'){
        this.scene.getMeshByID(id).position.y += 0.05
      }
    },
    async createScene() {
      var scene = new BABYLON.Scene(this.engine);
      var url = "/images/scene.jpg";
      var background = new BABYLON.Layer("back", url, scene);
      background.isBackground = true;
      return scene;
    },
    async createCamera(scene, canvas) {
      this.camera = new BABYLON.ArcRotateCamera(
        "Camera",
        0,
        0,
        10,
        BABYLON.Vector3.Zero(),
        scene
      );

      // limit zoom
      this.camera.setPosition(new BABYLON.Vector3(0, Math.PI / 3, -2));
     
      this.camera.upperAlphaLimit = -Math.PI/2;
      this.camera.lowerAlphaLimit = -Math.PI/2;
      this.camera.upperBetaLimit = 1.2;
      this.camera.lowerBetaLimit = 1.2;
      
      this.camera.inputs.remove(this.camera.inputs.attached.mousewheel)
      this.camera.useBouncingBehavior = true;
      this.camera.attachControl(canvas, true);
    },
    async createLight(scene, canvas) {
      var light1 = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(1, 1, 0),
        scene
      );
      var light2 = new BABYLON.PointLight(
        "pointLight",
        new BABYLON.Vector3(1, 10, 1),
        scene
      );
      light2.intensity = 0.15;
    },
    async createModel(scene, canvas) {
      var ground = BABYLON.Mesh.CreateGround("ground", 8, 8, 2, scene, false);
      var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
      groundMaterial.diffuseColor = new BABYLON.Color3(0.253, 0.340, 0.407);
      ground.material = groundMaterial;
    },
    startTouchBtn(){
      this.timeout1 = setTimeout(() => {
        this.liquid_transferor_btn_color = 'orange'
      }, 2000);
      this.timeout2 = setTimeout(() => {
        this.liquid_transferor_btn_color = 'red'        
      }, 4000);
    },
    endTouchBtn(id){
      window.clearTimeout(this.timeout1);
      window.clearTimeout(this.timeout2);
      this.timeout1 = null;
      this.timeout2 = null;
      this.scene.getMeshByID(id).addBehavior(
          new BABYLON.PointerDragBehavior({
              dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
          })
      );
      if(this.liquid_transferorprops[id][0]==0){
          this.scene.getMeshByID(this.liquid_transferorprops[id][3]).addBehavior(
            new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
            })
        );
        if(this.liquid_transferor_btn_color == 'orange'){
          this.correct_use_transferor[0]=1;
          this.liquid_transferorprops[id][0]=this.liquid_transferorprops[id][1]
        }
        else if(this.liquid_transferor_btn_color == 'red'){
          this.correct_use_transferor[0]=0;
          if(this.liquid_transferorprops[id][1]==100){
            this.liquid_transferorprops[id][0]=this.liquid_transferorprops[id][1];
          }
          else this.liquid_transferorprops[id][0]=this.liquid_transferorprops[id][1]+1 
        }
        this.pipette = this.liquid_transferorprops[id][1]+'';
      }
      else{
        if(this.liquid_transferor_btn_color == 'orange'){
          this.liquid_transferorprops[id][0]=1;
          this.correct_use_transferor[1]=0;
        }
        else if(this.liquid_transferor_btn_color == 'red'){
          this.correct_use_transferor[1]=1;
          this.liquid_transferorprops[id][0]=0;           
        }
        this.liquid_transferorprops[id][1]=100;
        if(this.dib_in_flask_5min == 1)this.step3node4 = 1;
      }
      this.liquid_transferorprops[id][2] = true;
      this.liquid_transferor_btn_color = 'green';
      this.liquid_transferorprops[id][3] = ''; 
      this.refreshComponents();
    },
    post(){
      this.axios.request({
      url:'/experiment/',
      params:{
        username:sessionStorage.getItem('username')},
      method:'GET'}).then(data=>{
        data=data.data[0];
        var step1score = data.step1score;
        var step2score = data.step2score;
        var step3score = data.step3score;
        var step4score = this.getScoreString4();
        this.axios.request(
          {
            url:'/experiment/',
            method:'PUT',
            data:{
              username:sessionStorage.getItem('username'),
              step1score:step1score,
              step2score:step2score,
              step3score:step3score,
              step4score:step4score,
              nowstep:4
            }
          }
        )
      })
      this.post_dialog = true;
      this.post_score = Math.floor((this.step1.getNowScore()+this.step2.getNowScore()+this.step3.getNowScore()+this.step4.getNowScore())*100/(this.step1.all_score+this.step2.all_score+this.step3.all_score+this.step4.all_score))
      if(this.post_score==100){
        this.$notify({
          title: '解锁成就!',
          message: '满分实验！',
          type: 'success',
          duration: 0
        });
      }
      this.post_errortext1 = this.step1.getAllNodeErrorText();
      this.post_errortext2 = this.step2.getAllNodeErrorText();
      this.post_errortext3 = this.step3.getAllNodeErrorText();
      this.post_errortext4 = this.step4.getAllNodeErrorText();
    }
  },

  mounted() {
    this.init();
    this.axios.request({
      url:'/experiment/',
      params:{'username':sessionStorage.getItem('username')},
      method:'GET'}).then(data=>{
        data=data.data;
        var nowstep = data[0].nowstep;
        var step1score = data[0].step1score;
        var step2score = data[0].step2score;
        var step3score = data[0].step3score;
        var step4score = data[0].step4score;
        for(var i=0;i<step1score.split(',').length;i++){
          this.step1.node_array[i].score=parseInt(step1score.split(',')[i]);
        }
        for(var i=0;i<step2score.split(',').length;i++){
          this.step2.node_array[i].score=parseInt(step2score.split(',')[i]);
        }
        for(var i=0;i<step3score.split(',').length;i++){
          this.step3.node_array[i].score=parseInt(step3score.split(',')[i]);
        }
        for(var i=0;i<step4score.split(',').length;i++){
          this.step4.node_array[i].score=parseInt(step4score.split(',')[i]);
        }
        switch (nowstep) {
          case 1:
            this.toStep1()
            break;
          case 2:
            this.toStep2()
            break;
          case 3:
            this.toStep3()
            break;
          case 4:
            this.toStep4()
            break;
          default:
            break;
        }
    })
    setTimeout(() => {
      this.engine.resize();
    }, 500);
  },
};
</script>

<style scoped>
canvas {
  display: block;
  width: 100%;
  height: 100%;
}
.avoid_select {
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.img {
  width: 50%;
}
.el-tabs--border-card{
  background: #424242;
  border: 1px solid #424242;
}
.el-tabs-color>>>.el-tabs__header{
  background-color:#424242;
}

.el-tabs-color>>>.el-tabs__item.is-active{
  background-color:#424242;
  color:#ffd700;
}
.el-tabs-color>>>.el-tabs__item:not(.is-disabled):hover{
  color:#ffd700;
}
</style>
