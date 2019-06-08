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
      weight:null,
      skybox:null,
      flask:null,
      bottle:null,
      group:null,
      spool:null,
      oil_pot:null,
      stand:null,
      selectobjarray:[],
      selectobj:null
    };
  },
  methods: {
    init() {
      this.group = new THREE.Group()
      this.addCamera()
      this.addScene()
      //this.addaxis()
      this.addStand()
      this.addWeight()
      this.addFlask()
      this.addBottle()
      
      this.addOilPot()
      this.addSpool()
      //this.addAmbientLight()
      this.addlight()
      this.addRenderer()
      this.addlistener()
      this.animate()
    },
    addCamera() {
      this.camera = new THREE.OrthographicCamera(-2, 2, 1, -1, 1, 10)
      //left right bottom top near far
      this.camera.position.set(0, 0, 5)
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
    addWeight() {
      var geometry = new OBJLoader()
      geometry.load("../../static/model/weight.obj",(obj)=>{
        this.weight = obj
        this.scene.add(this.weight)
        })
    },
    addFlask(){
      var loadmodel = new OBJLoader()
      loadmodel.load("../../static/model/flask.obj",(obj)=>{
        this.flask = obj
        this.scene.add(this.flask)
      })        
    },
    addBottle(){
      var modelloder = new OBJLoader()
      modelloder.load("../../static/model/bottle.obj",(obj)=>{
        this.bottle = obj
        this.scene.add(this.bottle)
      })
    },
    addStand(){
      var modelloder = new OBJLoader()
      modelloder.load("../../static/model/stand.obj",(obj)=>{
        this.stand = obj
        this.scene.add(this.stand)
      })
      
    },
    addOilPot(){
      var modelloder = new OBJLoader()
      modelloder.load("../../static/model/oil.obj",(obj)=>{
        this.oil_pot = obj
        this.scene.add(this.oil_pot)
      })
    },
    addSpool(){
      var modelloder = new OBJLoader()
      modelloder.load("../../static/model/spool.obj",(obj)=>{

        this.spool = obj
        this.scene.add(this.spool)
      })
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
    checkThings(){
      var name = this.selectobjarray[0].object.name
      if(name=='Cylinder002' || name=='Box002'|| name =='Torus001'){
          this.selectobj = this.stand
          }else{
        this.selectobj=this.scene.getObjectByName(name)
      }
      //stand包含三个object，其他物体只有一个object
      //如果选中了stand这三个object中的任何一个 让整个stand组拖动
      //以后如果再遇到一个object包含多个组件的情况只需要添加else if
    },
    onMouseDown(event){
      event.preventDefault()
      var x = (event.clientX/window.innerWidth)*2-1
      var y = -(event.clientY/window.innerHeight)*2+1
      var mouseVector = new THREE.Vector3()
      mouseVector.set(x,y,0)
      
      var raycaster = new THREE.Raycaster()
      raycaster.setFromCamera( mouseVector, this.camera );
      var scensObjs = []
      this.scene.children.forEach(child => {
        for (var i = 0; i < child.children.length; i++) {
          var obj = child.children[i];
          scensObjs.push(obj);
        }
      });
      //添加了一个this.selectobj全局变量,里面放的是object，使用selectobj[i].object可获取对象
      this.selectobjarray = raycaster.intersectObjects(scensObjs)
      if(this.selectobjarray.length!=0){
        this.checkThings()
      }
      console.log(this.selectobjarray.length)
    },
    onMouseMove(event){
      event.preventDefault()
      var x = (event.clientX/window.innerWidth)*2-1
      var y = -(event.clientY/window.innerHeight)*2+1
      var mv = new THREE.Vector3(x,y,0)
      mv.unproject(this.camera)
      if(this.selectobj!=null){
        this.selectobj.position.copy(mv)
      }
    },
    onMouseUp(event){
      this.selectobj = null
      this.selectobjarray=[]
    },
    addRenderer() {
      let container = document.getElementById("container");
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

