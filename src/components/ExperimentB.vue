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
            <span style="color:#666666">{{(pickingObj!=null)?map[pickingObj.id]:'无'}}</span>
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
                step="3"
              >{{step[2]}}</v-stepper-step>
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
              @click="openDialog1()"
            >
              <v-icon>fa fa-chevron-right</v-icon>
            </v-btn>
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
        <el-tab-pane label="电子称"  name = 'weight'>
          <div style="height:120px;">
            <v-card>
              <electronic-scale ref="es" v-if="hasWeight==1"></electronic-scale>
              <v-btn v-if="hasWeight==1"
              color="pink"
              dark
              small
              absolute
              bottom
              right
              fab
              @click="toZero()"
              >
              <v-icon>fa fa-refresh</v-icon>
              </v-btn>
            </v-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="量筒"  name = 'measuring_cylinder'>
          <div style="height:150px;">
            <my-progress :valueNow="valuemeasuring_cylinder" v-if="hasMeasuring_cylinder==1"></my-progress>
          </div>
        </el-tab-pane>
        <el-tab-pane label="针管"  name = 'needle'>
          <div style="height:150px;">
            <my-needle-progress :valueNow="valueneedle" v-if="hasNeedle==1" ></my-needle-progress >
          </div>
        </el-tab-pane>
         <el-tab-pane label="BB8's warning"  name = 'default'>
          <div style="height:100px;">
            <v-alert :value="true" type="warning" outline>
            <v-avatar size="60px">
              <img src="images/bb8.png" alt="avatar" >
            </v-avatar>
            &emsp;实验中请穿好实验服，戴好护目镜
          </v-alert>
          </div>
        </el-tab-pane>
        </el-tabs>   

        <!--工具栏-->
        <v-card class="mb-4">
          <v-card-title class="font-weight-black subheading">工具</v-card-title>

          <v-container style='padding:2px;height:300px;'>
            <v-layout
              style="overflow-y:scroll;height:300px"
              row
              wrap
            >
              <v-flex xs3>
                <v-card @click="addRoundFlask()">
                  <v-card-text>
                    <v-img
                      src="images/round_flask.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">圆底烧瓶(10ml)</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addPaper()">
                  <v-card-text>
                    <v-img
                      src="images/weightpaper.png"
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
                      src="images/pot.png"
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
                      src="images/weight.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">电子称</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addHeater()">
                  <v-card-text>
                    <v-img
                      src="images/heater.png"
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
                      src="images/liquid_transferor.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">移液枪</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addNeedle()">
                  <v-card-text>
                    <v-img
                      src="images/needle.png"
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
                      src="images/tri_flask.png"
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
                      src="images/dropper.png"
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
                      src="images/measuring_cylinder.png"
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
                      src="images/stand.png"
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
                      src="images/bottle.png"
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
                      src="images/Fecl3.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">三氯化铁</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addAsetone()">
                  <v-card-text>
                    <v-img
                      src="images/asetone.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">丙酮</div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex xs3>
                <v-card @click="addSpoon()">
                  <v-card-text>
                    <v-img
                      src="images/spoon.png"
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
                      src="images/film.png"
                      aspect-ratio="1"
                    ></v-img>
                    <div class="body-2 text-xs-center">塑料薄膜</div>
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
            @click="nextStep()"
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
        <span style="color:red">失分原因如下：</span><br>
          <div
            v-for="(item,index) in errortext"
            :key="index"
          ><span style="color:orange">{{index}}</span>.{{item}}<br></div>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog_result = false"
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
import { step1 } from "../js/step1.js";
import { Vector3 } from "@babylonjs/core/Legacy/legacy";
import myProgress from "../packages/Progress/Progress.vue";
import myNeedleProgress from "../packages/NeedleProgress/NeedleProgress.vue";

export default {
  data() {
    return {
      timer: null,
      canvas: null,
      engine: null,
      scene: null,
      stand: null,
      weight: null,
      hl: null,
      hoveredObj: null,
      pickingObj: null,
      pickedObj: null, //上一次拾取的物品
      e1: 1,
      step: ["反应前期准备", "", ""],
      hasWeight: 0,
      hasMeasuring_cylinder: 0,
      hasNeedle:0,
      valuemeasuring_cylinder:0,
      valueneedle:0,
      map: {
        pot: "油浴锅",
        round_flask: "圆底烧瓶",
        weight: "电子称",
        c8h14o2s2: "硫辛酸",
        stand: "铁架台",
        dropper: "滴管",
        heater: "磁力搅拌器",
        measuring_cylinder: "量筒",
        needle: "针管",
        paper: "称量纸",
        spoon: "药匙",
        tri_flask: "锥形瓶",
        liquid_transferor: "移液枪",
        weight_merged: "电子秤组合体",
        spoon: "药匙",
        trash_can: "垃圾桶",
        "spoon_cone": "有硫辛酸的药匙",
        "weight.paper_cone": "有硫辛酸的电子称",
        paper_cone: "带有硫辛酸的称量纸"
      },
      quality: {
        paper: [null, null, 0, 0, 0, 1],
        tri_flask: [null, 2, 0, 0, 0, 0],
        spoon_cone: [null, null, 1, 0, 0, 0],
        spoon_powder_brown: [null, null, 0, 0, 5, 0]
      }, //20.000g
      step_finish: [0, 0, 0], //step1 step2 step3 是否执行完了？
      all_score: null,
      now_score: 0,
      dialog_nextstep: false,
      dialog_result: false,
      errortext: [],
      btn_nextstep: false,
      btn_post: true,
      advancedTexture: null,
      controller: null,
      mesh_back: null,
      mesh_front: null,
      spliced_meshes: [],
      electronicScaleQuality: [null, null, 0, 0, 0, 0],
      stable: 0, //产生分离按钮的时候鼠标滑动不太稳定 这个等于一个flag
      shake_count:0,
      rotateflag:1,
      needshake:0,
      shaked :0,//用于判断是否给分
      activeIndex:"default",
    };
  },
  components:{
    myProgress,
    myNeedleProgress
  },
  methods: {
    async init() {
      this.canvas = document.getElementById("renderCanvas");
      this.engine = new BABYLON.Engine(this.canvas, true, { stencil: true });
      // var loadingScreen = new customLoadingScreen("test");
      // this.engine.loadingScreen = loadingScreen;

      this.scene = await this.createScene();
      this.hl = new BABYLON.HighlightLayer("hl1", this.scene, {
        mainTextureRatio: 1
      }); //high light
      this.hl.innerGlow = false;
      await this.createCamera(this.scene, this.canvas);
      await this.createLight(this.scene);

      await this.createModel(this.scene, this.canvas);
      this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
        "UI"
      );
      // await this.createUx(this.scene);
      this.engine.runRenderLoop(() => {
        
        if(this.needshake == 1){
          if(this.shake_count <=35){
            var mesh = this.scene.getMeshByID('tri_flask_full_trans_powder_brown')
            console.log(mesh)
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
            var po = this.getMergedPosition('tri_flask_full_trans_powder_brown');
            this.scene.removeMesh(this.scene.getMeshByID('tri_flask_full_trans_powder_brown'));
            this.addModel('tri_flask_full_fecl3',null,new BABYLON.Vector3(po[0],0,po[2]),null,['PointerDragBehavior']);
          }
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
          ];
          if (pickResult.pickedMesh.id != "ground") {
            this.hl.addMesh(pickResult.pickedMesh, BABYLON.Color3.Purple());
            if (
              this.pickingObj != null &&
              this.pickingObj.id != pickResult.pickedMesh.id
            ) {
              this.addGui(this.pickingObj.id, pickResult.pickedMesh.id);
              this.stable = 0;
            } else if (
              array1.includes(pickResult.pickedMesh.id) &&
              this.stable == 0 &&
              this.controller == null
            ) {
              //this.controller==null is neccesary!
              this.addGui2(pickResult.pickedMesh.id);
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
            console.log(pickResult.pickedMesh.id);
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
    addGui2(hoverid) {
      if (this.controller != null) {
        this.advancedTexture.removeControl(this.controller);
        this.controller = null;
      }
      if(hoverid == 'tri_flask_full_trans_powder_brown'){
        var button1 = GUI.Button.CreateSimpleButton("btn2", "震荡");
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
        var array1 = hoverid.split(".");
        if(hoverid!="tri_flask_full_trans_powder_brown"){
          this.scene.removeMesh(this.scene.getMeshByID(hoverid));
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
            case "stand":
              this.addStand();
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
              this.needshake = 1;
              this.shaked = 1;
              break
            default:
              break;
          }
        }
      });
    },
    addGui(pickid, hoverid) {
      if (this.controller != null) {
        this.advancedTexture.removeControl(this.controller);
        this.controller = null;
      }
      var str = "拼接";
      if (hoverid == "weight" || hoverid.indexOf("weight") != -1) str = "放置";
      else if (hoverid == "trash_can") str = "移除";
      else if (pickid == "spoon") str = "拾取";
      else if ( hoverid == "round_flask" ||hoverid == 'tri_flask'|| pickid == 'dropper_full' 
      || hoverid == 'tri_flask_powder_brown') str = "倒入";
      else if(pickid == 'dropper' && hoverid == 'c3h6o') str = '吸取';
      else if( pickid =='film') str = '封口';
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
        var x = this.scene.getMeshByID(hoverid).position.x;
        var y = this.scene.getMeshByID(hoverid).position.y;
        var z = this.scene.getMeshByID(hoverid).position.z;
        //有称的话 加示数
        if (hoverid == "weight" || hoverid.indexOf("weight") != -1) {
          var array1 = new Array(6);
          array1.fill(0);
          var thing = pickid.split(".");
          for (var j = 0; j < thing.length; j++) {
            if (this.quality.hasOwnProperty(thing[j])) {
              for (var i = 5; i >= 0; i--) {
                if (
                  this.quality[thing[j]][i] == null &&
                  this.electronicScaleQuality[i] == null &&
                  array1[i] == 0
                )
                  array1[i] = null;
                else {
                  array1[i] +=
                    (this.quality[thing[j]][i] +
                      this.electronicScaleQuality[i]) %
                    10;
                  if (
                    this.quality[thing[j]][i] +
                      this.electronicScaleQuality[i] >=
                    10
                  ) {
                    if (i - 1 < 0) {
                      alert("电子称量度范围不足！");
                    } else array1[i - 1] += 1;
                  }
                }
              }
              this.modifyElectronicScale(
                array1[0],
                array1[1],
                array1[2],
                array1[3],
                array1[4],
                array1[5]
              );
            }
          }
        }

        if (pickid == "paper" && hoverid == "weight") {
          this.scene.getMeshByID(pickid).position = new BABYLON.Vector3(
            x,
            y + 0.07,
            z
          ); //(左右,上下,前后)
          var mesh = BABYLON.Mesh.MergeMeshes(
            [this.scene.getMeshByID(hoverid), this.scene.getMeshByID(pickid)],
            true,
            true,
            undefined,
            false,
            true
          );
          mesh.id = "weight.paper";
          mesh.addBehavior(
            new BABYLON.PointerDragBehavior({
              dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
            })
          );
        } 
        else if (pickid == "round_flask_cone" && hoverid == "stand") {
          this.scene.getMeshByID(pickid).position = this.changeMergedPosition(pickid,x-0.21,y+0.23,z+0.08);
          //不可用.position = Vector3
          var mesh = BABYLON.Mesh.MergeMeshes(
            [this.scene.getMeshByID(hoverid), this.scene.getMeshByID(pickid)],
            true,
            true,
            undefined,
            false,
            true
          );
          mesh.id = "stand.round_flask_cone";
          mesh.addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
          );
        }
        else if(pickid == 'tri_flask_powder_brown' && hoverid == "stand"){
         
          this.scene.getMeshByID(pickid).position = this.changeMergedPosition(pickid,x-0.16,y+0.4,z-0.05);
          //不可用.position = Vector3
          var mesh = BABYLON.Mesh.MergeMeshes(
            [this.scene.getMeshByID(hoverid), this.scene.getMeshByID(pickid)],
            true,
            true,
            undefined,
            false,
            true
          );
          mesh.id = "stand.tri_flask_powder_brown";
          mesh.addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
          );
        }
        else if (pickid == "round_flask" && hoverid == "stand") {
          this.scene.getMeshByID(pickid).position = new BABYLON.Vector3(
            x - 0.175,
            y + 0.18,
            z
          ); //(左右,上下,前后)
          var mesh = BABYLON.Mesh.MergeMeshes(
            [this.scene.getMeshByID(hoverid), this.scene.getMeshByID(pickid)],
            true,
            true,
            undefined,
            false,
            true
          );
          mesh.id = "stand.round_flask";
        }
        else if (pickid == "tri_flask" && hoverid == "stand") {
          this.scene.getMeshByID(pickid).position = new BABYLON.Vector3(
            x - 0.175,
            y + 0.18,
            z
          );
          var mesh = BABYLON.Mesh.MergeMeshes(
            [this.scene.getMeshByID(hoverid), this.scene.getMeshByID(pickid)],
            true,
            true,
            undefined,
            false,
            true
          );
          mesh.id = "stand.tri_flask";
        } 
        else if (pickid == "round_flask" && hoverid == "weight") {
          this.scene.getMeshByID(pickid).position = new BABYLON.Vector3(
            x,
            y + 0.06,
            z
          );
          var mesh = BABYLON.Mesh.MergeMeshes(
            [this.scene.getMeshByID(hoverid), this.scene.getMeshByID(pickid)],
            true,
            true,
            undefined,
            false,
            true
          );
          mesh.id = "weight.round_flask";
          mesh.addBehavior(
            new BABYLON.PointerDragBehavior({
              dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
            })
          );
        } 
        else if (pickid == "pot" && hoverid == "weight") {
          this.scene.getMeshByID(pickid).position = new BABYLON.Vector3(
            x,
            y + 0.07,
            z - 0.02
          );
          var mesh = BABYLON.Mesh.MergeMeshes(
            [this.scene.getMeshByID(hoverid), this.scene.getMeshByID(pickid)],
            true,
            true,
            undefined,
            false,
            true
          );
          mesh.id = "weight.pot";
          mesh.addBehavior(
            new BABYLON.PointerDragBehavior({
              dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
            })
          );
        } 
        else if (pickid == "tri_flask" && hoverid == "weight") {
          this.scene.getMeshByID(pickid).position = new BABYLON.Vector3(
            x,
            y + 0.06,
            z
          );
          var mesh = BABYLON.Mesh.MergeMeshes(
            [this.scene.getMeshByID(hoverid), this.scene.getMeshByID(pickid)],
            true,
            true,
            undefined,
            false,
            true
          );
          mesh.id = "weight.tri_flask";
          mesh.addBehavior(
            new BABYLON.PointerDragBehavior({
              dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
            })
          );
        } 
        else if (pickid == "spoon" && hoverid == "c8h14o2s2") {
          var x = this.scene.getMeshByID("spoon").position.x;
          var y = this.scene.getMeshByID("spoon").position.y;
          var z = this.scene.getMeshByID("spoon").position.z;
          //this.scene.removeMesh(this.scene.getMeshByID('spoon'));
          this.addModel(
            "cone",
            new BABYLON.Vector3(0.02, 0.02, 0.02),
            new BABYLON.Vector3(x - 0.055, y + 0.02, z),
            null,
            null
          );
          setTimeout(() => {
            var mesh = BABYLON.Mesh.MergeMeshes(
              [this.scene.getMeshByID("cone"), this.scene.getMeshByID("spoon")],
              true,
              true,
              undefined,
              false,
              true
            );
            mesh.id = "spoon_cone";
            mesh.addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }, 500);
          //this.addSpoonMerged(new BABYLON.Vector3(-x,y,z));//右手系变左手系 谁知道这怎么回事
        } 
        else if (pickid == "spoon" && hoverid == "fecl3") {
          var x = this.scene.getMeshByID("spoon").position.x;
          var y = this.scene.getMeshByID("spoon").position.y;
          var z = this.scene.getMeshByID("spoon").position.z;
          //this.scene.removeMesh(this.scene.getMeshByID('spoon'));
          this.addModel(
            "powder_brown",
            new BABYLON.Vector3(2, 2, 2),
            new BABYLON.Vector3(x - 0.055, y, z),
            null,
            null
          );
          setTimeout(() => {
            var mesh = BABYLON.Mesh.MergeMeshes(
              [this.scene.getMeshByID("powder_brown"), this.scene.getMeshByID("spoon")],
              true,
              true,
              undefined,
              false,
              true
            );
            mesh.id = "spoon_powder_brown";
            mesh.addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }, 500);
          //this.addSpoonMerged(new BABYLON.Vector3(-x,y,z));//右手系变左手系 谁知道这怎么回事
        } 
        else if(pickid =='spoon_powder_brown'&& hoverid == 'weight.paper'){
          var mesh = this.scene.getMeshByID("weight.paper");
          mesh.updateFacetData();
          var po = mesh.getFacetPosition(Math.floor(mesh.facetNb / 2));
          var x = po.x;
          var y = po.y;
          var z = po.z;
          this.addModel(
            "powder_brown",
            new BABYLON.Vector3(2.5, 2.5, 2.5),
            new BABYLON.Vector3(-x + 0.08, y, z + 0.18),
            null,
            null
          ); //右手系变左手系
          mesh.disableFacetData();
          //移出带有粉末的勺子 加空勺子
          var mesh = this.scene.getMeshByID("spoon_powder_brown");
          mesh.updateFacetData();
          var po = mesh.getFacetPosition(Math.floor(mesh.facetNb / 2));
          var x = po.x;
          var y = po.y;
          var z = po.z;
          mesh.disableFacetData();
          this.scene.removeMesh(mesh);
          this.addModel(
            "spoon",
            new BABYLON.Vector3(1.5, 1.5, 1.5),
            new BABYLON.Vector3(-x + 0.08, y, z),
            null,
            ['PointerDragBehavior']
          );
          setTimeout(() => {
            var mesh1 = BABYLON.Mesh.MergeMeshes(
              [
                this.scene.getMeshByID("weight.paper"),
                this.scene.getMeshByID("powder_brown")
              ],
              true,
              true,
              undefined,
              false,
              true
            );
            mesh1.id = "weight.paper_powder_brown";
            mesh1.addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }, 500);
        }
        else if(pickid == 'spoon_powder_brown' && hoverid == 'weight.paper_powder_brown'){
            var mesh = this.scene.getMeshByID("spoon_powder_brown");
            mesh.updateFacetData();
            var po = mesh.getFacetPosition(Math.floor(mesh.facetNb / 2));
            var x = po.x;
            var y = po.y;
            var z = po.z;
            mesh.disableFacetData();
            this.scene.removeMesh(mesh);
            //移出带有粉末的勺子 加空勺子
            this.addModel(
              "spoon",
              new BABYLON.Vector3(1.5, 1.5, 1.5),
              new BABYLON.Vector3(-x + 0.08, y, z),
              null,
              ['PointerDragBehavior']
            );
        }
        else if (pickid == "spoon_cone" && hoverid == "weight.paper") {
          var mesh = this.scene.getMeshByID("weight.paper");
          mesh.updateFacetData();
          var po = mesh.getFacetPosition(Math.floor(mesh.facetNb / 2));
          var x = po.x;
          var y = po.y;
          var z = po.z;
          this.addModel(
            "cone",
            new BABYLON.Vector3(0.04, 0.04, 0.04),
            new BABYLON.Vector3(-x + 0.08, y, z + 0.18),
            null,
            null
          ); //右手系变左手系
          mesh.disableFacetData();
          //移出带有粉末的勺子 加空勺子
          var mesh = this.scene.getMeshByID("spoon_cone");
          mesh.updateFacetData();
          var po = mesh.getFacetPosition(Math.floor(mesh.facetNb / 2));
          var x = po.x;
          var y = po.y;
          var z = po.z;
          mesh.disableFacetData();
          this.scene.removeMesh(mesh);
          this.addModel(
            "spoon",
            new BABYLON.Vector3(1.5, 1.5, 1.5),
            new BABYLON.Vector3(-x + 0.08, y, z),
            null,
            ['PointerDragBehavior']
          );
          setTimeout(() => {
            var mesh1 = BABYLON.Mesh.MergeMeshes(
              [
                this.scene.getMeshByID("weight.paper"),
                this.scene.getMeshByID("cone")
              ],
              true,
              true,
              undefined,
              false,
              true
            );
            mesh1.id = "weight.paper_cone";
            mesh1.addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }, 500);
        } 
        else if (pickid == "spoon_cone" && hoverid == "weight.paper_cone") {
          var mesh = this.scene.getMeshByID("spoon_cone");
          mesh.updateFacetData();
          var po = mesh.getFacetPosition(Math.floor(mesh.facetNb / 2));
          var x = po.x;
          var y = po.y;
          var z = po.z;
          mesh.disableFacetData();
          this.scene.removeMesh(mesh);
          //移出带有粉末的勺子 加空勺子
          this.addModel(
            "spoon",
            new BABYLON.Vector3(1.5, 1.5, 1.5),
            new BABYLON.Vector3(-x + 0.08, y, z),
            null,
            ['PointerDragBehavior']
          );
        }
        else if (pickid == "paper_cone" && hoverid == "round_flask") {
          this.scene.removeMesh(this.scene.getMeshByID(pickid));
          var mesh = this.scene.getMeshByID(hoverid)
          mesh.removeBehavior(mesh.behaviors[0]);
          this.addModel(
            "cone",
            new BABYLON.Vector3(0.03, 0.03, 0.03),
            new BABYLON.Vector3(x, y + 0.08, z),
            null,
            null
          );
          setTimeout(() => {
            var mesh1 = BABYLON.Mesh.MergeMeshes(
              [
                this.scene.getMeshByID("cone"),
                this.scene.getMeshByID("round_flask")
              ],
              true,
              true,
              undefined,
              false,
              true
            );
            mesh1.id = "round_flask_cone";
            mesh1.addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }, 500);
        } 
        else if (pickid =='paper_powder_brown' && hoverid == 'tri_flask'){
          var mesh = this.scene.getMeshByID("tri_flask");
          mesh.removeBehavior(mesh.behaviors[0]);
          var po = mesh.position;
          var x = po.x;
          var y = po.y;
          var z = po.z;
          this.scene.removeMesh(this.scene.getMeshByID("paper_powder_brown"));
          this.addModel(
            "powder_brown",
            new BABYLON.Vector3(2.5, 2.5, 2.5),
            new BABYLON.Vector3(x, y + 0.01, z),
            null,
            null
          );
          setTimeout(() => {
            var mesh1 = BABYLON.Mesh.MergeMeshes(
              [
                this.scene.getMeshByID("powder_brown"),
                this.scene.getMeshByID("tri_flask")
              ],
              true,
              true,
              undefined,
              false,
              true
            );
            mesh1.id = "tri_flask_powder_brown";
            mesh1.addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }, 500);

        }
        else if(pickid =='dropper' && hoverid =='c3h6o'){
          var po = this.scene.getMeshByID(pickid).position;
          this.scene.removeMesh(this.scene.getMeshByID(pickid))
          this.addModel('dropper_full',new BABYLON.Vector3(1.5,1.5,1.5),new BABYLON.Vector3(-po.x,po.y,po.z),new BABYLON.Vector3(0,0,Math.PI),['PointerDragBehavior']);
        }
        else if(pickid == 'dropper_full' && hoverid == 'measuring_cylinder'){
          this.valuemeasuring_cylinder+=2;
          var po = this.scene.getMeshByID(hoverid).position;
          this.scene.removeMesh(this.scene.getMeshByID(hoverid));
          var po1 = this.scene.getMeshByID(pickid).position;
          this.scene.removeMesh(this.scene.getMeshByID(pickid));
          this.addModel('dropper',new BABYLON.Vector3(1.5,1.5,1.5),new BABYLON.Vector3(-po1.x,po1.y,po1.z),new BABYLON.Vector3(0,0,Math.PI),['PointerDragBehavior']);
          this.addModel('measuring_cylinder_full',null,new BABYLON.Vector3(-po.x+0.4,po.y,po.z),null,['PointerDragBehavior']);     
        }
        else if(pickid == 'dropper_full' && hoverid == 'measuring_cylinder_full'){
          this.valuemeasuring_cylinder+=2;
          var po1 = this.scene.getMeshByID(pickid).position;
          this.scene.removeMesh(this.scene.getMeshByID(pickid));
          this.addModel('dropper',new BABYLON.Vector3(1.5,1.5,1.5),new BABYLON.Vector3(-po1.x,po1.y,po1.z),new BABYLON.Vector3(0,0,Math.PI),['PointerDragBehavior']);
        }
        else if( pickid == 'measuring_cylinder_full' && hoverid == 'tri_flask_powder_brown'){
          //this.scene.getMeshByID().position;
          var poarray = this.getMergedPosition('tri_flask_powder_brown');
          var x = poarray[0];
          var y = poarray[1];
          var z = poarray[2];
          this.scene.removeMesh(this.scene.getMeshByID('tri_flask_powder_brown'));
          this.addModel('tri_flask_full_trans',null,new BABYLON.Vector3(x,0,z),null,null);
          this.addModel(
            "powder_brown",
            new BABYLON.Vector3(2.5, 2.5, 2.5),
            new BABYLON.Vector3(-x, 0.05, z),
            null,
            null
          );
          var po1 = this.getMergedPosition('measuring_cylinder_full');
          this.scene.removeMesh(this.scene.getMeshByID('measuring_cylinder_full'));
          this.addModel('measuring_cylinder',null,new BABYLON.Vector3(-po1[0],0,po1[2]),null,['PointerDragBehavior']);
          setTimeout(() => {
            var mesh = BABYLON.Mesh.MergeMeshes(
            [this.scene.getMeshByID('powder_brown'),this.scene.getMeshByID('tri_flask_full_trans')],
            true,
            true,
            undefined,
            false,
            true
            );
            mesh.id = 'tri_flask_full_trans_powder_brown';
            mesh.addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }, 500);
        }
        else if( pickid =='film' && hoverid == 'tri_flask_full_fecl3'){
          var po = this.getMergedPosition(hoverid);
          this.scene.getMeshByID(pickid).position = new BABYLON.Vector3(-po[0],po[1],po[2]-0.002);
          var mesh = BABYLON.Mesh.MergeMeshes(
            [this.scene.getMeshByID('tri_flask_full_fecl3'),this.scene.getMeshByID('film')],
            true,
            true,
            undefined,
            false,
            true
          );
          mesh.id = 'tri_flask_full_fecl3_film'
          mesh.addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );

        }
        else if (hoverid == "trash_can") {
          this.scene.removeMesh(this.scene.getMeshByID(pickid));
          var flag1 = 0,
            flag2 = 0,
            flag3 = 0;
          for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split(".").includes("weight"))
              flag1 = 1;
            if (
              this.scene.meshes[i].id.split(".").includes("measuring_cylinder")
            )
              flag2 = 1;
            if (
              this.scene.meshes[i].id.split(".").includes("needle")
            )
              flag3 = 1;
          }
          if (flag1 == 0) {
            this.hasWeight = 0;
          }
          if (flag2 == 0) {
            this.hasMeasuring_cylinder = 0;
            this.valuemeasuring_cylinder = 0;
          }
          if(flag3 == 0){
            this.hasNeedle = 0;
            this.valueneedle = 0;
          }
          var array1 = [flag1,flag2,flag3,1];
          var array2 = ['weight','measuring_cylinder','needle','default']
          if(array1[array2.indexOf(this.activeIndex)]==0){
            for(var i=0;i<array1.length;i++){
              if(array1[i]!=0){
                this.activeIndex = array2[i];
                break;
              }
            }
          }
        }
        this.advancedTexture.removeControl(this.controller);
        this.controller = null;
      });
    },
    changeMergedPosition(id,x,y,z){
      //这个方法用于merge后的物体位置的更改 我发现经过merge后 坐标由世界坐标系变成了本地坐标系 
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
      var position = new BABYLON.Vector3(x1,y1,z1);
      return position;
    },
    getMergedPosition(id){
      var mesh = this.scene.getMeshByID(id)
      mesh.updateFacetData();
      var po = mesh.getFacetPosition(Math.floor(mesh.facetNb / 2));
      var x0 = po.x;
      var y0 = po.y;
      var z0 = po.z;
      mesh.disableFacetData();
      return [x0,y0,z0];
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
      this.camera.lowerRadiusLimit = 0;
      //this.camera.upperRadiusLimit = 60;
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
      groundMaterial.specularColor = BABYLON.Color3.Black();
      ground.material = groundMaterial;
      this.addTrash_can();
      //this.addBB8();
      this.addModel('stand',null,new BABYLON.Vector3(1,0,0),new BABYLON.Vector3(0,Math.PI,0),null);
      //this.addStand();
    },

    addModel(name, scaling, position, rotation, behavior) {
      /*
        name String
        scaling BABYLON.Vector3
        position BABYLON.Vector3
        rotation BABYLON.Vector3
        behavior ['PointerDragBehavior',...]
      */
      BABYLON.SceneLoader.ImportMesh(
        "",
        "model/glb/",
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
          var code1 = new BABYLON.PointerDragBehavior({
            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
          })//add 拖拽事件
          var dict = {'PointerDragBehavior':code1};
          if (behavior) {
            for (let i = 0; i < behavior.length; i++) {
              mesh.addBehavior(dict[behavior[i]]);
            }
          }
          if (position) mesh.position = position;
          if (scaling) mesh.scaling = scaling;
          if (rotation) mesh.rotation = rotation;
        }
      );
    },
    addPaper(){
      this.addModel('paper',null,new BABYLON.Vector3(0,0.05,0),null,['PointerDragBehavior']);
    },
    addPaperCone() {
      this.addPaper();
      this.addModel(
        "cone",
        new BABYLON.Vector3(0.02, 0.02, 0.02),
        new BABYLON.Vector3(0, 0.07, 0),
        null,
        null
      );
      setTimeout(() => {
        var mesh = BABYLON.Mesh.MergeMeshes(
          [this.scene.getMeshByID("paper"), this.scene.getMeshByID("cone")],
          true,
          true,
          undefined,
          false,
          true
        );
        mesh.id = "paper_cone";
        mesh.addBehavior(
          new BABYLON.PointerDragBehavior({
            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
          })
        );
      }, 500);
    },
    addTriFlaskPowderBrown(){
      this.addModel('tri_flask',null,null,null,null);     
      this.addModel(
        "powder_brown",
        new BABYLON.Vector3(2.5, 2.5, 2.5),
        new BABYLON.Vector3(0, 0.05, 0),
        null,
        null
      );
      setTimeout(() => {
        var mesh = BABYLON.Mesh.MergeMeshes(
          [
            this.scene.getMeshByID("powder_brown"),
            this.scene.getMeshByID("tri_flask")
          ],
          true,
          true,
          undefined,
          false,
          true
        );
        mesh.id = "tri_flask_powder_brown";
        mesh.addBehavior(
          new BABYLON.PointerDragBehavior({
            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
          })
        );},500)
    },
    addRoundFlaskCone(){
      this.addModel('round_flask',null,null,null,null);
      this.addModel(
        "cone",
        new BABYLON.Vector3(0.03, 0.03, 0.03),
        new BABYLON.Vector3(0, 0.08, 0),
        null,
        null
      );
      setTimeout(() => {
        var mesh = BABYLON.Mesh.MergeMeshes(
          [
            this.scene.getMeshByID("cone"),
            this.scene.getMeshByID("round_flask")
          ],
          true,
          true,
          undefined,
          false,
          true
        );
        mesh.id = "round_flask_cone";
        mesh.addBehavior(
          new BABYLON.PointerDragBehavior({
            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
          })
        );
      }, 500);
    },
    addPaperPowderBrown(){
      this.addPaper()
      this.addModel(
        "powder_brown",
        new BABYLON.Vector3(2.5, 2.5, 2.5),
        new BABYLON.Vector3(0, 0.05, 0),
        null,
        null
      );
      setTimeout(() => {
        var mesh = BABYLON.Mesh.MergeMeshes(
          [this.scene.getMeshByID("paper"), this.scene.getMeshByID("powder_brown")],
          true,
          true,
          undefined,
          false,
          true
        );
        mesh.id = "paper_powder_brown";
        mesh.addBehavior(
          new BABYLON.PointerDragBehavior({
            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
          })
        );
      }, 500);
    },
    addTrash_can() {
      this.addModel('trash_can',new BABYLON.Vector3(2,2,2),new BABYLON.Vector3(-200,0,200),new BABYLON.Vector3(0,Math.PI,0),null);
    },
    addBB8() {
      this.addModel('bb8',new BABYLON.Vector3(0.26,0.26,0.26),new BABYLON.Vector3(-0.85,0.33,0),new BABYLON.Vector3(0,Math.PI,0),null);
    },
    addRoundFlask() {
      this.addModel('round_flask',null,null,null,['PointerDragBehavior']);
    },
    addWeight() {
      this.hasWeight = 1; //有电子称
      this.activeIndex='weight';
      this.addModel('weight',null,null,new BABYLON.Vector3(0,Math.PI,0),['PointerDragBehavior']);
      setTimeout(() => {
        this.toZero();
      }, 100);
    },
    addC8h14o2s2() {
      this.addModel('c8h14o2s2',null,null,new BABYLON.Vector3(0,Math.PI,0),['PointerDragBehavior']);
    },
    addFecl3() {
      this.addModel('fecl3',null,null,new BABYLON.Vector3(0,Math.PI,0),['PointerDragBehavior']);
    },
    addAsetone(){
      this.addModel('c3h6o',null,null,new BABYLON.Vector3(0,Math.PI,0),['PointerDragBehavior']);
    },
    addStand() {
      this.addModel('stand',null,null,new BABYLON.Vector3(0,Math.PI,0),['PointerDragBehavior']);
    },
    addPot() {
      this.addModel('pot',null,null,null,['PointerDragBehavior']);
    },
    addDropper() {
      this.addModel('dropper',new BABYLON.Vector3(1.5,1.5,1.5),new BABYLON.Vector3(0,0.2,0),new BABYLON.Vector3(0,0,Math.PI),['PointerDragBehavior']);
    },
    addHeater() {
      this.addModel('heater',null,null,new BABYLON.Vector3(0,Math.PI,0),['PointerDragBehavior']);
    },
    addLiquidTransferor() {
      this.addModel('liquid_transferor',null,new BABYLON.Vector3(0,0.2,0),new BABYLON.Vector3(0,0,Math.PI),['PointerDragBehavior']);
    },
    addMeasuringCylinder() { 
      this.hasMeasuring_cylinder = 1;
      this.activeIndex='measuring_cylinder';
      this.addModel('measuring_cylinder',null,null,null,['PointerDragBehavior']);      
    }, 
    addNeedle() {
      this.hasNeedle = 1;
      this.activeIndex='needle'
      this.addModel('needle',new BABYLON.Vector3(1.2,1.2,1.2),new BABYLON.Vector3(0,0.2,0),new BABYLON.Vector3(0,0,Math.PI),['PointerDragBehavior']);      
    },
    addSpoon() {
      this.addModel('spoon',new BABYLON.Vector3(1.5,1.5,1.5),new BABYLON.Vector3(0,0.05,0),null,['PointerDragBehavior']);      
    },
    addTriFlask() {
      this.addModel('tri_flask',null,null,null,['PointerDragBehavior']);      
    },
    addFilm(){
      this.addModel('film',null,null,null,['PointerDragBehavior']);      
    },
    async createUx(scene) {
      // Create the 3D UI manager
      var poi = this.poi;
      var center = [121.3, 31.5];
      var manager = new BABYLON.GUI.GUI3DManager(scene);
      // Let's add a button
      var button = new BABYLON.GUI.Button3D("reset");
      var buttonList = [];
      poi.forEach((v, index) => {
        var button = new BABYLON.GUI.HolographicButton("orientation");
        manager.addControl(button);
        // add control must be ahead of position settings
        button.position.x = ((v[0] - center[0]) / 0.0262) * 25;
        button.position.z = ((v[1] - center[1]) / 0.0262) * 25;
        button.position.y = 3;
        button.text = "传感器";
        button.name = "test";

        // click event
        button.onPointerUpObservable.add(() => {
          // set target to the object
          this.camera.setTarget(
            new BABYLON.Vector3(
              button.position.x,
              button.position.y,
              button.position.z
            )
          );
          // set distance to the target
          this.camera.radius = 5;
          // select
          this.currentSelection = button;
        });
      });
    },
    async refreshScene() {
      // reset camera
      this.camera.setTarget(new BABYLON.Vector3.Zero());
      this.camera.radius = 60;
      this.camera.alpha = -Math.PI / 2;
      this.camera.beta = Math.PI / 3;

      // reset selection
      this.currentSelection = null;
    },
    async zoomPlus() {
      this.camera.radius -= 10;
    },
    async zoomMinus() {
      this.camera.radius += 10;
    },
    modifyElectronicScale(num1, num2, num3, num4, num5, num6) {
      this.electronicScaleQuality = [num1, num2, num3, num4, num5, num6];
      //这用于修改电子秤示数
      //不想填就填null
      this.$refs.es.setAllNumber(num1, num2, num3, num4, num5, num6);
    },
    toZero() {
      this.electronicScaleQuality = [null, null, 0, 0, 0, 0];
      this.$refs.es.setAllNumber(null, null, 0, 0, 0, 0);
    },
    openDialog1() {
      this.dialog_nextstep = true;
    },
    nextStep() {
      this.dialog_nextstep = false;
      this.e1 += 1;
      if (this.e1 == 2) {
        this.step = ["", "搭建反应装置", ""];
        this.errortext = step1.getAllNodeErrorText();
        this.dialog_result = true;
        console.log(this.errortext);
      } else if (this.e1 == 3) {
        this.step = ["", "", "聚合物合成"];
        this.btn_nextstep = true;
        this.btn_post = false;
      }
    },
    checkActivePane(){
      return 'needle'
    }
  },

  mounted() {
    this.init();
    setTimeout(() => {
      this.engine.resize();
    }, 500);
  },
  created() {
    clearInterval(this.timer);
    this.timer = null;
    if (this.timer == null) {
      this.timer = setInterval(() => {
        if (this.scene != null) {
          if (this.step_finish.toString() == [0, 0, 0].toString()) {
            this.all_score = step1.all_score;
            step1.setStepNeed(this.scene, this.electronicScaleQuality,this.valuemeasuring_cylinder,this.valueneedle,this.shaked);
            var node = step1.checkAllNodeScore();
            if (node != null) {
              this.$message({
                dangerouslyUseHTMLString: true,
                message:
                  '<strong><span style="color:black;">' +
                  node.successtext +
                  "</span>&emsp;" +
                  '<span style="color: teal">得分+1</span></strong>',
                type: "success"
              });
              this.now_score = step1.getNowScore();
            }
          } else if (this.step_finish.toString() == [1, 0, 0].toString()) {
            this.all_score = step2.all_score;
            this.step2.setStep1Need(this.scene, this.electronicScaleQuality);
          } else if (this.step_finish.toString() == [1, 1, 0].toString()) {
            this.all_score = step3.all_score;
            this.step3.setStep1Need(this.scene, this.electronicScaleQuality);
          } else {
          }
        }
      }, 500); //500ms检测一下是否能得到每步分数
    }
  },
  destroyed() {
    // 每次离开当前界面时，清除定时器
    clearInterval(this.timer);
    this.timer = null;
  }
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
