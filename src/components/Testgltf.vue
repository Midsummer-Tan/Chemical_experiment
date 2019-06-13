<template>
  <div id="container" style="height:100%;width:100%"></div>
</template>

<script>
import * as THREE from "three";
import { OBJLoader ,MTLLoader,OBJMTLLoader} from "three-obj-mtl-loader";
import GLTFLoader from 'three-gltf-loader';
export default {
  name: "device",
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      selectobj: null,
      test:null
    };
  },
  methods: {
    init() {
      this.addCamera();
      this.addScene();
      this.addmodel();
      this.addlight();
      this.addRenderer();
      
      this.addlistener();
      
      this.animate();
    },
    addCamera() {
      this.camera = new THREE.OrthographicCamera(-2.5, 2, 1, -1, 1, 10);
      //left right bottom top near far
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
    addmodel(){
      var loader = new GLTFLoader().load("model/glb/flask.glb",obj => {
        this.test = obj.scene;
        console.log(this.test)
        this.scene.add(this.test);
      })
    },
    
    addlight() {
      var pointLight = new THREE.PointLight(0xf5fffa, 1);
      pointLight.position.set(100, 100, 100);
      this.scene.add(pointLight);
      var pointLight2 = new THREE.PointLight(0xf5fffa, 1);
      pointLight2.position.set(-100, 100, 100);
      this.scene.add(pointLight2);
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
      //添加了一个this.selectobj全局变量,里面放的是object，使用selectobj[i].object可获取对象
      var array= raycaster.intersectObjects(this.scene.children,true);
      if(array.length!=0){
        this.selectobj = this.scene.getObjectByName(array[0].object.name)
      }
      
    },
    onMouseMove(event) {
      event.preventDefault(); 
      var x = (event.clientX / window.innerWidth) * 2 - 1;
      var y = -(event.clientY / window.innerHeight) * 2 + 1;
      var mv = new THREE.Vector3(x, y, 0);
      mv.unproject(this.camera);
      if (this.selectobj != null) {
        this.selectobj.position.copy(mv);
      }
    },
    onMouseUp() {
      this.selectobj = null;
    },
    addRenderer() {
      let container = document.getElementById("container");
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

