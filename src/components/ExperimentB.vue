<template>
  <v-container fluid grid-list-lg  class="avoid_select">
    <v-layout >
      <v-flex xs9>
        <v-card>
          <v-responsive :aspect-ratio="16/9">
            <canvas id="renderCanvas"></canvas>
          </v-responsive>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <!--步骤条-->
        <!--一共分为三大步骤-->
        <v-hover >
          <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            >
            <v-stepper v-model="e1">
              <v-stepper-header  >
                <v-stepper-step :complete="e1 > 1"  color="cyan" step="1">
                  {{step[0]}}
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" color="cyan" step="2">
                  {{step[1]}}
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step color="cyan" step="3">
                  {{step[2]}}
                </v-stepper-step>
                
              </v-stepper-header>
              <v-btn 
                style="float:right"
                :disabled="btn_post"
                dark color="cyan"
                @click="post()"
              >
                提交
              </v-btn>
              <v-btn 
                style="float:right"
                :disabled="btn_nextstep"
                fab dark small color="cyan"
                @click="openDialog1()"
              >
                <v-icon>fa fa-chevron-right</v-icon>
              </v-btn>
            </v-stepper>
          </v-card>
        </v-hover>
        <!--步骤条-->

        <!--电子称示数-->
        <v-hover >
          <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            >
            <electronic-scale ref="es">
            </electronic-scale>
            <v-card-title>
                电子称示数
            </v-card-title>
            <v-btn
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
        </v-hover>
        <!--电子称示数-->

        <!--工具栏-->
        <v-card>
          <v-card-title class="font-weight-black subheading">工具</v-card-title>
          <!--第一行-->
          <v-layout row>
          <v-flex xs4>
            <v-card @click="addRound_flask()">
              <v-card-text>
                <v-img 
                src="images/round_flask.png"
                aspect-ratio="1"
                >
                </v-img>
                <div style="font-size:15px;text-align:center">圆底烧瓶</div>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs4>
            <v-card @click="addPaper()">
              <v-card-text>
                <v-img
                src="images/weightpaper.png"
                aspect-ratio="1"
                >
                </v-img>
                <div style="font-size:15px;text-align:center">称量纸</div>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs4>
            <v-card @click="addPot()">
              <v-card-text>
                <v-img
                src="images/pot.png"
                aspect-ratio="1"
                >
                </v-img>
                <div style="font-size:15px;text-align:center">油浴锅</div>
              </v-card-text>
            </v-card>
          </v-flex>
          </v-layout> 

          <!--第二行-->
          <v-layout row>
          <v-flex xs4>
            <v-card @click="addWeight()">
              <v-card-text>
                <v-img
                src="images/weight.png"
                aspect-ratio="1"
                >
                </v-img>
                <div style="font-size:15px;text-align:center">电子称</div>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs4>
            <v-card @click="addHeater()">
              <v-card-text>
                <v-img
                src="images/heater.png"
                aspect-ratio="1"
                >
                </v-img>
                <div style="font-size:15px;text-align:center">磁力搅拌器</div>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs4>
            <v-card @click="addLiquidTransferor()">
              <v-card-text>
                <v-img
                src="images/liquid_transferor.png"
                aspect-ratio="1"
                >
                </v-img>
                <div style="font-size:15px;text-align:center">移液枪</div>
              </v-card-text>
            </v-card>
          </v-flex>
          </v-layout>  

          <!--第三行-->
          <v-layout row>
          <v-flex xs4>
            <v-card @click="addNeedle()">
              <v-card-text>
                <v-img
                src="images/needle.png"
                aspect-ratio="1"
                >
                </v-img>
                <div style="font-size:15px;text-align:center">针管</div>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs4>
            <v-card @click="addTriFlask()">
              <v-card-text>
                <v-img
                src="images/tri_flask.png"
                aspect-ratio="1"
                >
                </v-img>
                <div style="font-size:15px;text-align:center">锥形瓶</div>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs4>
            <v-card @click="addDropper()">
              <v-card-text>
                <v-img
                src="images/dropper.png"
                aspect-ratio="1"
                >
                </v-img>
                <div style="font-size:15px;text-align:center">滴管</div>
              </v-card-text>
            </v-card>
          </v-flex>
          </v-layout>

          <!--第四行-->
          <v-layout row>
          <v-flex xs4>
            <v-card @click="addMeasuringCylinder()">
              <v-card-text>
                <v-img
                src="images/measuring_cylinder.png"
                aspect-ratio="1"
                >
                </v-img>
                <div style="font-size:15px;text-align:center">量筒</div>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs4>
            <v-card @click="addStand()">
              <v-card-text>
                <v-img
                src="images/stand.png"
                aspect-ratio="1"
                >
                </v-img>
                <div style="font-size:15px;text-align:center">铁架台</div>
              </v-card-text>
            </v-card>
          </v-flex>
          
          </v-layout>
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
        <v-card-text>
          你本环节得分是xx,总分为xx,你确定进入下一个环节么？进入下一个环节后你没有办法回到本环节。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog_nextstep  = false"
          >
            取消
          </v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="nextStep()"
          >
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  <!--对话框-->
  </v-container>
</template>

<script>
import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";
import {step1} from "../js/step1.js"
export default {
  data() {
    return {
      canvas: null,
      engine: null,
      scene: null,
      stand: null,
      weight: null,
      hl:null,
      pickedObj:null,
      e1:1,
      step:['反应前期准备','',''],
      step_finish:[0,0,0],//step1 step2 step3 是否执行完了？
      dialog_nextstep:false,
      btn_nextstep:false,
      btn_post:true,

    };
  },
  methods: {
    async init() {
      this.canvas = document.getElementById("renderCanvas");
      this.engine = new BABYLON.Engine(this.canvas, true,{stencil:true});
      // var loadingScreen = new customLoadingScreen("test");
      // this.engine.loadingScreen = loadingScreen;
      
      this.scene = await this.createScene();
      this.hl = new BABYLON.HighlightLayer("hl1", this.scene,{mainTextureRatio:1}); //high light
      this.hl.innerGlow = false;
      await this.createCamera(this.scene, this.canvas);
      await this.createLight(this.scene);
      await this.createModel(this.scene, this.canvas);
      // await this.createUx(this.scene);
      
      this.engine.runRenderLoop(() => {
        this.scene.render();
      });
      window.addEventListener("resize", () => {
        this.engine.resize();
      });
      window.addEventListener("pointermove",()=>{
        var pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
        if(this.pickedObj!=null){
          this.hl.removeMesh(this.pickedObj);
        }
        if(pickResult.hit){
          if(pickResult.pickedMesh.id != 'ground'){
            this.hl.addMesh(pickResult.pickedMesh,BABYLON.Color3.Purple());
            this.pickedObj = pickResult.pickedMesh;
          }
        } 
      });
      window.addEventListener("pointerup", () => {
        if(this.pickedObj!=null){
          this.hl.removeMesh(this.pickedObj);
        }
      });
      window.addEventListener("pointerdown", () => {
        var pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
        if(pickResult.hit){
          if(pickResult.pickedMesh.id != 'ground'){
            this.hl.addMesh(pickResult.pickedMesh,BABYLON.Color3.Purple())
            this.pickedObj = pickResult.pickedMesh;
          }
        } 
      });
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
        -Math.PI/2,
        (Math.PI * 7) / 20,
        0,
        BABYLON.Vector3.Zero(),
        scene
      );

      // limit zoom
      this.camera.lowerRadiusLimit = 0;
      this.camera.upperRadiusLimit = 60;
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
      var ground = BABYLON.Mesh.CreateGround("ground", 8, 8, 1, scene, false);
      var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
      groundMaterial.specularColor = BABYLON.Color3.Black();
      ground.material = groundMaterial;

      
      BABYLON.SceneLoader.ImportMesh(
        //铁架台
        "",
        "model/glb/",
        "stand.glb",
        scene,
        obj => {
          this.stand = obj;
          console.log(obj)
          for (var i = 0; i < this.stand.length; i++) {
            this.stand[i].rotation = new BABYLON.Vector3(0, 0, 0);
            this.stand[i].position = new BABYLON.Vector3(-0.3,0,0);//(左右,上下,前后)
            this.stand[i].addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }
        }
      );
    },

    addRound_flask(){
      //圆底烧瓶
      BABYLON.SceneLoader.ImportMesh(
        "",
        "model/glb/",
        "round_flask.glb",
        this.scene,
        obj => {
          for (var i = 0; i < obj.length; i++) {
            obj[i].rotation = new BABYLON.Vector3(0, 0, 0);
            obj[i].addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }
        }
      );
    },

    addWeight(){
      BABYLON.SceneLoader.ImportMesh(
        //电子称
        "",
        "model/glb/",
        "weight.glb",
        this.scene,
        obj => {
          for (var i = 0; i < obj.length; i++) {
            
            obj[i].rotation = new BABYLON.Vector3(0, 0, 0);
            obj[i].addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }
        }
      );
    },

    addBottle(){
       BABYLON.SceneLoader.ImportMesh(
        //试剂瓶
        "",
        "model/glb/",
        "bottle.glb",
        this.scene,
        obj => {
          for (var i = 0; i < obj.length; i++) {
            obj[i].rotation = new BABYLON.Vector3(0, 0, 0);
            obj[i].addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }
        }
      );
    },

    addStand(){
      BABYLON.SceneLoader.ImportMesh(
        //铁架台
        "",
        "model/glb/",
        "stand.glb",
        this.scene,
        obj => {
          for (var i = 0; i < obj.length; i++) {
            obj[i].rotation = new BABYLON.Vector3(0, 0, 0);
            obj[i].addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }
        }
      );
    },

    addPot(){
      BABYLON.SceneLoader.ImportMesh(
        //油浴锅
        "",
        "model/glb/",
        "pot.glb",
        this.scene,
        obj => {
          for (var i = 0; i < obj.length; i++) {
            obj[i].rotation = new BABYLON.Vector3(0, 0, 0);
            obj[i].addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }
        }
      );
    },

    addDropper(){
      BABYLON.SceneLoader.ImportMesh(
        //滴管
        "",
        "model/glb/",
        "dropper.glb",
        this.scene,
        obj => {
          for (var i = 0; i < obj.length; i++) {
            obj[i].scaling = new BABYLON.Vector3(1.5,1.5,1.5)
            obj[i].rotation = new BABYLON.Vector3(0, 0, 0);
            obj[i].position = new BABYLON.Vector3(0,0.1,0);//左右 上下 前后
            obj[i].addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }
        }
      );
    },

    addHeater(){
      BABYLON.SceneLoader.ImportMesh(
        //磁力搅拌器
        "",
        "model/glb/",
        "heater.glb",
        this.scene,
        obj => {
          for (var i = 0; i < obj.length; i++) {
            obj[i].rotation = new BABYLON.Vector3(0, 0, 0);
            obj[i].addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }
        }
      );
    },

    addLiquidTransferor(){
      BABYLON.SceneLoader.ImportMesh(
      //移液枪
        "",
        "model/glb/",
        "liquid_transferor.glb",
        this.scene,
        obj => {
          for (var i = 0; i < obj.length; i++) {
            obj[i].rotation = new BABYLON.Vector3(0, 0, 0);
            obj[i].addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }
        }
      );
    },

    addMeasuringCylinder(){
       BABYLON.SceneLoader.ImportMesh(
        //量筒
        "",
        "model/glb/",
        "measuring_cylinder.glb",
        this.scene,
        obj => {
          for (var i = 0; i < obj.length; i++) {
            obj[i].rotation = new BABYLON.Vector3(0, 0, 0)
            obj[i].addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }
        }
      );
    },

    addNeedle(){
      BABYLON.SceneLoader.ImportMesh(
        //针管
        "",
        "model/glb/",
        "needle.glb",
        this.scene,
        obj => {
          for (var i = 0; i < obj.length; i++) {
            obj[i].rotation = new BABYLON.Vector3(0, 0, 0)
            obj[i].addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }
        }
      );
    },

    addPaper(){
      BABYLON.SceneLoader.ImportMesh(
      //称量纸
        "",
        "model/glb/",
        "paper.glb",
        this.scene,
        obj => {
          for (var i = 0; i < obj.length; i++) {
            obj[i].rotation = new BABYLON.Vector3(0, 0, 0)
            obj[i].position = new BABYLON.Vector3(0, 0.05, 0)
            obj[i].addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }
        }
      );
    },

    addSpoon(){
      BABYLON.SceneLoader.ImportMesh(
        //药匙
        "",
        "model/glb/",
        "spoon.glb",
        this.scene,
        obj => {
          this.spoon = obj;
          for (var i = 0; i < obj.length; i++) {
            obj[i].scaling = new BABYLON.Vector3(1.2,1.2,1.2);
            obj[i].rotation = new BABYLON.Vector3(0, 0, 0);
            obj[i].position = new BABYLON.Vector3(0,0.1,0);
            obj[i].addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
              })
            );
          }
        }
      );
    },

    addTriFlask(){
      BABYLON.SceneLoader.ImportMesh(
      //锥形瓶
        "",
        "model/glb/",
        "tri_flask.glb",
        this.scene,
        obj => {
          for (var i = 0; i < obj.length; i++) {
            obj[i].rotation = new BABYLON.Vector3(0, 0, 0);
            obj[i].addBehavior(
              new BABYLON.PointerDragBehavior({
                dragPlaneNormal: new BABYLON.Vector3(0, 2, 0)
              })
            );
          }
        }
      );
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
    modifyElectronicScale(num1,num2,num3,num4){
      //这用于修改电子秤示数
      this.$refs.es.setAllNumber(num1,num2,num3,num4);
    },
    toZero(){
      this.$refs.es.setAllNumber(0,0,0,0);
    },
    openDialog1(){
      this.dialog_nextstep = true;
    },
    step1(){
      
    },
    nextStep(){
      this.e1+=1;
      if(this.e1==2){
        console.log("me")
        this.step = ['','搭建反应装置',''];
      }
      else if(this.e1==3){
        this.step = ['','','聚合物合成'];
        this.btn_nextstep = true;
        this.btn_post = false;
      }
      this.dialog_nextstep = false;
      
    },
    
  },

  mounted() {
    this.init();
    this.modifyElectronicScale(0,0,1,1);
    
    setTimeout(() => {
      this.engine.resize();
      if(this.step_finish == [0,0,0]){
        this.step1();
      }
      else if(this.step_finish == [1,0,0]){
        this.step2();
      }
      else if(this.step_finish == [1,1,0]){
        this.step3();
      }
      
    }, 500);
  }
};
</script>

<style scoped>
canvas {
  display: block;
  width: 100%;
  height: 100%;
}
.avoid_select{
  -moz-user-select: none;
  -o-user-select:none;
  -khtml-user-select:none;
  -webkit-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.img{
  width:50%
}
</style>
