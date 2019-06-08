<template>
  <div id="container" style="height:100vh;width:100%"></div>
</template>

<script>
import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
export default {
  name: "device",
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      base: null,
      skybox: null,
      beaker: null,
      group: null,
      selectobj: []
    };
  },
  methods: {
    init() {
      this.group = new THREE.Group();
      this.addCamera();
      this.addScene();
      this.addBase();
      this.addbeaker();
      //this.addaxis()
      this.addFlask();
      //this.addAmbientLight()
      this.addlight();
      this.addRenderer();
      this.addlistener();
      this.animate();
    },
    addCamera() {
      this.camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
      this.camera.position.set(0, 0, 5);
      // let container = document.getElementById("container")
      // this.camera = new THREE.PerspectiveCamera(
      //   70,
      //   container.clientWidth / container.clientHeight,
      //   0.01,
      //   10
      // );
      // this.camera.position.z = 1;
    },
    addScene() {
      this.scene = new THREE.Scene();
      var color = new THREE.Color("#3D424D");
      this.scene.background = color;
    },
    addaxis() {
      this.axis = new THREE.AxesHelper(200);
      this.scene.add(this.axis);
      //X red Z blue Y greenc
    },
    addBase() {
      var geometry = new OBJLoader();
      geometry.load("../../static/model/base.obj", obj => {
        obj.traverse(function(child) {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshPhongMaterial({
              opacity: 1,
              transparent: true
            });
          }
        });
        this.base = obj;
        this.base.position.set(-1, 0, 0);
        this.scene.add(this.base);
      });

      // let geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      // var texture = new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load("../../static/images/base.png"),transparent:true})
      // this.base = new THREE.Mesh(geometry,texture)
      // this.base.position.set(-1,0,0)
      // this.scene.add(this.base)
    },
    addbeaker() {
      var geometry = new OBJLoader();
      var map = new THREE.CubeTextureLoader()
        .setPath("../../static/images/")
        .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
      map.mapping = THREE.CubeRefractionMapping;
      geometry.load("../../static/model/beaker.obj", obj => {
        obj.traverse(function(child) {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshPhongMaterial({
              color: 0xccfffd,
              envMap: map,
              refractionRatio: 0,
              reflectivity: 1,
              side: THREE.BackSide
            });
          }
        });
        this.beaker = obj;
        this.beaker.position.set(1, 0, 0);
        this.scene.add(this.beaker);
      });

      // let geometry = new THREE.BoxGeometry(0.2, 0.4, 0.2)
      // var texture = new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load("../../static/images/beaker.png"),transparent:true})
      // this.beaker = new THREE.Mesh(geometry,texture)
      // this.beaker.position.set(0,0,0)
    },
    addFlask() {
      var fmtl = new MTLLoader();
      fmtl.load("../../static/model/flask.mtl", mtl => {
        mtl.preload();
        var loadermodel = new OBJLoader();
        loadermodel.load("../../static/model/flask.obj", obj => {
          obj.material = mtl;
          this.scene.add(obj);
        });
      });
    },
    addAmbientLight() {
      var light = new THREE.AmbientLight(0xffffff);
      this.scene.add(light);
    },
    addlight() {
      var pointLight = new THREE.PointLight(0x2a4895, 1);
      pointLight.position.set(100, 100, 100);
      this.scene.add(pointLight);
      var pointLight = new THREE.PointLight(0xffaaaa, 1);
      pointLight.position.set(-100, 100, 100);
      this.scene.add(pointLight);
    },
    addlistener() {
      window.addEventListener("mousedown", this.onMouseDown, false);
      window.addEventListener("mousemove", this.onMouseMove, false);
      window.addEventListener("mouseup", this.onMouseUp, false);
      window.addEventListener("resize", this.onWindowResize, false);
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    onMouseDown(event) {
      event.preventDefault();
      var x = (event.clientX / window.innerWidth) * 2 - 1;
      var y = -(event.clientY / window.innerHeight) * 2 + 1;
      var mouseVector = new THREE.Vector3();
      mouseVector.set(x, y, 0);

      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouseVector, this.camera);
      var scensObjs = [];
      this.scene.children.forEach(child => {
        for (var i = 0; i < child.children.length; i++) {
          var obj = child.children[i];
          scensObjs.push(obj);
        }
      });
      //添加了一个this.selectobj全局变量,里面放的是object，使用selectobj[i].object可获取对象
      this.selectobj = raycaster.intersectObjects(scensObjs);
      console.log(this.selectobj.length);
    },
    onMouseMove(event) {
      event.preventDefault();
      var x = (event.clientX / window.innerWidth) * 2 - 1;
      var y = -(event.clientY / window.innerHeight) * 2 + 1;
      var mv = new THREE.Vector3(x, y, 0);
      mv.unproject(this.camera);
      for (var i = 0; i < this.selectobj.length; i++) {
        this.selectobj[i].object.position.copy(mv);
      }
    },
    onMouseUp(event) {
      this.selectobj = [];
    },
    addRenderer() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
    },
    animate() {
      requestAnimationFrame(this.animate);

      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

