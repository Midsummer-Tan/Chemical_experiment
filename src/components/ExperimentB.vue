<template>
  <v-container fluid grid-list-lg>
    <v-layout>
      <v-flex xs10>
        <v-card>
          <v-responsive :aspect-ratio="16/9">
            <canvas id="renderCanvas"></canvas>
          </v-responsive>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card>
          <v-card-title class="font-weight-black subheading">工具</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";
export default {
  data() {
    return {
      canvas: null,
      engine: null,
      scene: null,
      stand: null,
      weight: null
    };
  },
  methods: {
    async init() {
      this.canvas = document.getElementById("renderCanvas");
      this.engine = new BABYLON.Engine(this.canvas, true);
      // var loadingScreen = new customLoadingScreen("test");
      // this.engine.loadingScreen = loadingScreen;
      this.scene = await this.createScene();
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
        -Math.PI / 2,
        Math.PI*2/5,
        0,
        BABYLON.Vector3.Zero(),
        scene
      );

      // limit zoom
      this.camera.lowerRadiusLimit = 1;
      this.camera.upperRadiusLimit = 60;
      this.camera.useBouncingBehavior = true;
      // this.camera.attachControl(canvas, true);
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
      var ground = BABYLON.Mesh.CreateGround(
        "ground",
        8,
        8,
        1,
        scene,
        false
      );
      var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
      groundMaterial.specularColor = BABYLON.Color3.Black();
      ground.material = groundMaterial;

      BABYLON.SceneLoader.ImportMesh("","model/glb/", "flask.glb", scene);
      await BABYLON.SceneLoader.AppendAsync("model/glb/", "bottle.glb", scene);
      await BABYLON.SceneLoader.AppendAsync("model/glb/", "oil.glb", scene);
      await BABYLON.SceneLoader.AppendAsync("model/glb/", "spool.glb", scene);
      BABYLON.SceneLoader.ImportMesh("","model/glb/", "stand.glb", scene,(obj) => {
        this.stand = obj;
        for(var i=0;i<this.stand.length;i++){
          this.stand[i].addBehavior(
          new BABYLON.PointerDragBehavior({
            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
          })
        );
        }
      });
      BABYLON.SceneLoader.ImportMesh("","model/glb/", "weight.glb", scene,(obj) => {
        this.weight = obj;
        for(var i=0;i<this.weight.length;i++){
          this.weight[i].rotation = new BABYLON.Vector3(0,0,0);
          this.weight[i].addBehavior(
          new BABYLON.PointerDragBehavior({
            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
          })
        );
        }
        
      });
      
      scene.meshes
        .find(e => {
          return e.id == "spool";
        })
        .addBehavior(
          new BABYLON.PointerDragBehavior({
            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
          })
        );
//spool Cylinder002 Box002 Torus001 Screen weight (1)
      scene.meshes
        .find(e => {
          return e.id == "oil";
        })
        .addBehavior(
          new BABYLON.PointerDragBehavior({
            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
          })
        );

      scene.meshes
        .find(e => {
          return e.id == "flask";
        })
        .addBehavior(
          new BABYLON.PointerDragBehavior({
            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
          })
        );

      
        

      scene.meshes
        .find(e => {
          return e.id == "bottle";
        })
        .addBehavior(
          new BABYLON.PointerDragBehavior({
            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
          })
        );
      // var flask = scene.meshes.find(e => {
      //   if()
      //   e
      //   return e.id == "flask";
      // });
      // var oil = scene.meshes.find(e => {
      //   e.addBehavior(
      //     new BABYLON.PointerDragBehavior({
      //       dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
      //     })
      //   );
      //   return e.id == "oil";
      // });
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
    }
  },

  mounted() {
    this.init();
    setTimeout(() => {
      this.engine.resize();
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
</style>
