const addModels = {
    methods:{
        addPaper() {
            this.addModel('paper', null, new BABYLON.Vector3(0, 0.05, 0), null, ['PointerDragBehavior'], null);
        },
        addTrash_can() {
            this.addModel('trash_can', new BABYLON.Vector3(2, 2, 2), new BABYLON.Vector3(-200, 0, 200), new BABYLON.Vector3(0, Math.PI, 0), null, null);
        },
        addBB8() {
            this.addModel('bb8', new BABYLON.Vector3(0.26, 0.26, 0.26), new BABYLON.Vector3(-0.85, 0.33, 0), new BABYLON.Vector3(0, Math.PI, 0), null, null);
        },
        addRoundFlask() {
            this.addModel('round_flask', null, null, null, ['PointerDragBehavior'], null);
        },
        addWeight() {
            this.addModel('weight', null, null, new BABYLON.Vector3(0, Math.PI, 0), null, 'weight');
            var timer = setInterval(() => {
                if (this.scene.getMeshByID('weight')!=undefined){
                    var mesh = this.scene.getMeshByID('weight');
                    mesh.id = this.addName(mesh.id);
                    this.scene.getMeshByID(mesh.id).addBehavior(
                        new BABYLON.PointerDragBehavior({
                            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                        })
                    );
                    this.activeIndex = mesh.id;
                    var name = '电子称' + mesh.id.split('-')[1];
                    this.weightlist.push(mesh.id);
                    this.weightprops[mesh.id] = [
                        [null, null, 0, 0, 0, 0], name
                    ];
                    setTimeout(() => {
                        this.$refs.weight[this.weightlist.indexOf(mesh.id)].setAllNumber(null, null, 0, 0, 0, 0, mesh.id);
                    }, 100);
                    window.clearInterval(timer);
                }
            }, 100);


        },
        addC8h14o2s2() {
            this.addModel('c8h14o2s2', null, null, new BABYLON.Vector3(0, Math.PI, 0), ['PointerDragBehavior'], null);
        },
        addFecl3() {
            this.addModel('fecl3', null, null, new BABYLON.Vector3(0, Math.PI, 0), ['PointerDragBehavior'], null);
        },
        addAsetone() {
            this.addModel('c3h6o', null, null, new BABYLON.Vector3(0, Math.PI, 0), ['PointerDragBehavior'], null);
        },
        addDib() {
            this.addModel('dib', null, null, new BABYLON.Vector3(0, Math.PI, 0), ['PointerDragBehavior'], null);
        },
        addStand() {
            if(this.e1==2){
                this.addModel('stand1_movable', null, new BABYLON.Vector3(0.9, 0.6, 0), new BABYLON.Vector3(0, Math.PI, 0), null, 'stand1_movable');
                this.addModel('stand1_pole', null, new BABYLON.Vector3(1, 0, 0), new BABYLON.Vector3(0, Math.PI, 0), null, 'stand1_pole');
                var timer = setInterval(() => {
                    if (this.scene.getMeshByID('stand1_movable') != undefined && this.scene.getMeshByID('stand1_pole')!=undefined){
                        var mesh = this.scene.getMeshByID('stand1_movable');
                        mesh.id = this.addName(mesh.id);
                        var mesh1 = this.scene.getMeshByID('stand1_pole');
                        mesh1.id = this.addName(mesh1.id);
                        this.standlist.push([mesh.id, mesh1.id]);
                        this.activeIndex = mesh1.id;
                        window.clearInterval(timer);
                    }
                }, 100);
            }
            else
                this.addModel('stand', null, null, new BABYLON.Vector3(0, Math.PI, 0), ['PointerDragBehavior'], null);
        },
        addPot() {
            this.addModel('pot', new BABYLON.Vector3(0.03,0.03,0.03), null, null, ['PointerDragBehavior'], null);
        },
        addDropper() {
            this.addModel('dropper', new BABYLON.Vector3(1.5, 1.5, 1.5), new BABYLON.Vector3(0, 0.2, 0), new BABYLON.Vector3(0, 0, Math.PI), ['PointerDragBehavior'], null);
        },
        addHeater() {
            this.addModel('heater', null, null, new BABYLON.Vector3(0, Math.PI, 0),null, 'heater');
            this.addModel('heater_switch', null, new BABYLON.Vector3(0.08, 0.05, -0.25), new BABYLON.Vector3(0, Math.PI, 0), null, 'heater_switch1');
            this.addModel('heater_knob', null,new BABYLON.Vector3(0.14,0.05,-0.27), null, null, 'heater_knob1');
            this.addModel('heater_switch', null, new BABYLON.Vector3(0.197, 0.05, -0.25), new BABYLON.Vector3(0, Math.PI, 0), null, 'heater_switch2');
            this.addModel('heater_knob', null, new BABYLON.Vector3(0.03, 0.05, -0.27), null, null, 'heater_knob2');            
            var timer = setInterval(() => {
                if (this.scene.getMeshByID('heater')!=undefined && this.scene.getMeshByID('heater_switch1')!=undefined 
                && this.scene.getMeshByID('heater_switch2')!=undefined &&
                    this.scene.getMeshByID('heater_knob1')!=undefined && this.scene.getMeshByID('heater_knob2')!=undefined){
                        var mesh = BABYLON.Mesh.MergeMeshes(
                            [this.scene.getMeshByID('heater'), this.scene.getMeshByID('heater_switch1'), this.scene.getMeshByID('heater_switch2'),
                                this.scene.getMeshByID('heater_knob1'), this.scene.getMeshByID('heater_knob2')
                            ],
                            true,
                            true,
                            undefined,
                            false,
                            true
                        );
                        mesh.id = 'heater';
                        mesh.id = this.addName(mesh.id);
                        mesh.addBehavior(
                            new BABYLON.PointerDragBehavior({
                                dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                            })
                        );
                        window.clearInterval(timer);
                    }
            }, 100);
           
        },
        addLiquidTransferor() {
            this.addModel('liquid_transferor', null, new BABYLON.Vector3(0, 0.2, 0), new BABYLON.Vector3(0, 0, Math.PI), ['PointerDragBehavior'], 'liquid_transferor');
            var timer = setInterval(() => {
                if (this.scene.getMeshByID('liquid_transferor')!=undefined){
                    var mesh = this.scene.getMeshByID('liquid_transferor');
                    mesh.id = this.addName(mesh.id);
                    this.liquid_transferorlist.push(mesh.id);
                    this.liquid_transferorprops[mesh.id] = [0, 100, true, '']; //液体多少,量程,按钮禁用状态,吸入三氯化铁丙酮溶液锥形瓶的id
                    this.activeIndex = mesh.id;
                    window.clearInterval(timer)
                }
            }, 100);
        },
        addMeasuringCylinder() {
            this.addModel('measuring_cylinder', null, null, null, ['PointerDragBehavior'], 'measuring_cylinder');
            var timer = setInterval(() => {
                if (this.scene.getMeshByID('measuring_cylinder')!=undefined){
                    var mesh = this.scene.getMeshByID('measuring_cylinder')
                    mesh.id = this.addName(mesh.id)
                    this.activeIndex = mesh.id
                    this.scene.getMeshByID(mesh.id).addBehavior(
                        new BABYLON.PointerDragBehavior({
                            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                        })
                    );
                    this.measuring_cylinderlist.push(mesh.id);
                    this.measuring_cylinderprops[mesh.id] = [0, '量筒' + mesh.id.split('-')[1]];
                    window.clearInterval(timer);
                }
            }, 100);
        },
        addNeedle() {
            this.addModel('needle', new BABYLON.Vector3(1.2, 1.2, 1.2), new BABYLON.Vector3(0, 0.2, 0), new BABYLON.Vector3(0, 0, Math.PI), ['PointerDragBehavior'], null);
        },
        //addCap(0,0.01,0)
        addCap(x, y, z) {
            var mesh = BABYLON.Mesh.CreateCylinder("cap", 0.01, 0.01, 0.01, 10, 1, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
            mesh.id = this.addName("cap")
            this.scene.getMeshByID(mesh.id).position = new BABYLON.Vector3(x, y, z);
            var mater = new BABYLON.StandardMaterial("texture1", this.scene);
            mater.diffuseColor = new BABYLON.Color3(0.134, 0.331, 0.535);
            this.scene.getMeshByID(mesh.id).material = mater;
            this.scene.getMeshByID(mesh.id).addBehavior(
                new BABYLON.PointerDragBehavior({
                    dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                })
            );
            return mesh;
        },
        addSpoon() {
            this.addModel('spoon', new BABYLON.Vector3(1.5, 1.5, 1.5), new BABYLON.Vector3(0, 0.05, 0), null, ['PointerDragBehavior'], null);
        },
        addTriFlask() {
            this.addModel('tri_flask', null, null, null, ['PointerDragBehavior'], null);
        },
        addFilm() {
            this.addModel('film', null, null, null, ['PointerDragBehavior'], null);
        },
        addNeedleCap() {
            this.addModel('needle', new BABYLON.Vector3(1.2, 1.2, 1.2), new BABYLON.Vector3(0, 0.2, 0), new BABYLON.Vector3(0, 0, Math.PI), null, 'needle');
            BABYLON.Mesh.CreateCylinder("cap", 0.01, 0.01, 0.01, 10, 1, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
            this.scene.getMeshByID('cap').position = new BABYLON.Vector3(0.002, 0.05, 0);
            var mater = new BABYLON.StandardMaterial("texture1", this.scene);
            mater.diffuseColor = new BABYLON.Color3(0.134, 0.331, 0.535);
            this.scene.getMeshByID('cap').material = mater;
            var timer = setInterval(() => {
                if (this.scene.getMeshByID('needle')!=undefined){
                    var mesh = BABYLON.Mesh.MergeMeshes(
                        [
                            this.scene.getMeshByID('needle'),
                            this.scene.getMeshByID('cap')
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
                    mesh.id = 'needle.cap';
                    mesh.id = this.addName(mesh.id);
                    this.needlelist.push(mesh.id);
                    this.needleprops[mesh.id] = [0, '']
                    this.activeIndex = mesh.id
                    window.clearInterval(timer);
                }
            }, 100);

        },
        addPaperCone() {
            this.addModel('paper', null, new BABYLON.Vector3(0, 0.05, 0), null, null, "paper");
            this.addModel(
                "cone",
                new BABYLON.Vector3(0.02, 0.02, 0.02),
                new BABYLON.Vector3(0, 0.07, 0),
                null,
                null,
                "cone"
            );
            var timer = setInterval(() => {
                if (this.scene.getMeshByID("paper") != undefined && this.scene.getMeshByID("cone")!=undefined){
                  var mesh = BABYLON.Mesh.MergeMeshes(
                        [this.scene.getMeshByID("paper"), this.scene.getMeshByID("cone")],
                        true,
                        true,
                        undefined,
                        false,
                        true
                    );
                    mesh.id = "paper_cone";
                    mesh.id = this.addName(mesh.id);
                    mesh.addBehavior(
                        new BABYLON.PointerDragBehavior({
                            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                        })
                    );  
                    window.clearInterval(timer);
                }
            }, 100);
        },
        addTriFlaskPowderBrown() {
            this.addModel('tri_flask', null, null, null, null, 'powder_brown');
            this.addModel(
                "powder_brown",
                new BABYLON.Vector3(2.5, 2.5, 2.5),
                new BABYLON.Vector3(0, 0.05, 0),
                null,
                null,
                "powder_brown"
            );
            var timer = setInterval(() => {
                if (this.scene.getMeshByID("powder_brown") != undefined && this.scene.getMeshByID("tri_flask")!=undefined){
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
                    );
                    window.clearInterval(timer);
                }
            }, 100)
        },
        addRoundFlaskCone() {
            this.addModel('round_flask', null, null, null, null, 'round_flask');
            this.addModel(
                "cone",
                new BABYLON.Vector3(0.03, 0.03, 0.03),
                new BABYLON.Vector3(0, 0.08, 0),
                null,
                null,
                'cone'
            );
            var timer = setInterval(() => {
                if (this.scene.getMeshByID("cone") != undefined && this.scene.getMeshByID("round_flask")!=undefined){
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
                    mesh.id = this.addName(mesh.id);
                    mesh.addBehavior(
                        new BABYLON.PointerDragBehavior({
                            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                        })
                    );
                    window.clearInterval(timer)
                } 
            }, 100);
        },
        addTriFlaskFullFecl3Film() {
            this.addModel('tri_flask_full_fecl3', null, null, null, null, 'tri_flask_full_fecl3');
            this.addModel('film', null, new BABYLON.Vector3(0, 0.27, 0), null, null, 'film');
            var timer = setInterval(() => {
                if (this.scene.getMeshByID('tri_flask_full_fecl3') != undefined && this.scene.getMeshByID('film')!=undefined){
                    var mesh = BABYLON.Mesh.MergeMeshes(
                        [
                            this.scene.getMeshByID('tri_flask_full_fecl3'),
                            this.scene.getMeshByID('film')
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
                    mesh.id = 'tri_flask_full_fecl3.film';
                    mesh.id = this.addName(mesh.id);
                    clearInterval(timer);
                }
            }, 100);
        },
        addNeedleFullCap() {
            this.addModel('needle_full', null, new BABYLON.Vector3(0, 0 + 0.15, 0), new BABYLON.Vector3(0, 0, Math.PI), null, 'needle_full');
            var mesh1 = this.addCap(0, 0.02, 0);
            mesh1.removeBehavior(mesh1.behaviors[0]);
            mesh1.id = 'cap'
            var timer = setInterval(() => {
                if (this.scene.getMeshByID('needle_full')!=undefined && this.scene.getMeshByID('cap')!=undefined){
                    var mesh = BABYLON.Mesh.MergeMeshes(
                        [this.scene.getMeshByID('needle_full'), this.scene.getMeshByID('cap')],
                        true,
                        true,
                        undefined,
                        false,
                        true
                    );
                    mesh.id = "needle_full.cap";
                    mesh.id = this.addName(mesh.id)
                    this.needlelist.push(mesh.id);
                    this.needleprops[mesh.id] = [0.43, '']
                    this.activeIndex = mesh.id
                    mesh.addBehavior(
                        new BABYLON.PointerDragBehavior({
                            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                        })
                    );
                    window.clearInterval(timer);
                }
            }, 100);
        },
        addNeedleFull(){
            this.addModel('needle_full', null, new BABYLON.Vector3(0, 0 + 0.15, 0), new BABYLON.Vector3(0, 0, Math.PI), ['PointerDragBehavior'], 'needle_full_glue');
            var timer = setInterval(() => {
                if (this.scene.getMeshByID('needle_full_glue')!=undefined){
                    var mesh = this.scene.getMeshByID('needle_full_glue');
                    mesh.id = this.addName(mesh.id);
                    this.needlelist.push(mesh.id)
                    this.needleprops[mesh.id] = [1, ''];
                    this.activeIndex = mesh.id;
                    window.clearInterval(timer);
                }
            }, 100); 
        },
        addPaperPowderBrown() {
            this.addModel('paper', null, new BABYLON.Vector3(0, 0.05, 0), null, null, "paper");
            this.addModel(
                "powder_brown",
                new BABYLON.Vector3(2.5, 2.5, 2.5),
                new BABYLON.Vector3(0, 0.05, 0),
                null,
                null,
                "powder_brown"
            );
            var timer = setInterval(() => {
                if (this.scene.getMeshByID("paper")!=undefined && this.scene.getMeshByID("powder_brown")!=undefined){
                    var mesh = BABYLON.Mesh.MergeMeshes(
                        [this.scene.getMeshByID("paper"), this.scene.getMeshByID("powder_brown")],
                        true,
                        true,
                        undefined,
                        false,
                        true
                    );
                    mesh.id = "paper_powder_brown";
                    mesh.id = this.addName(mesh.id);
                    mesh.addBehavior(
                        new BABYLON.PointerDragBehavior({
                            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                        })
                    );
                    window.clearInterval(timer);
                }
            }, 100);
        },
        addThermometer(){
            this.addModel('thermometer', new BABYLON.Vector3(0.03, 0.03, 0.03), new BABYLON.Vector3(0,0.1,0), null, ['PointerDragBehavior'], null);
        },
        addMagneton(){
            var magneton = BABYLON.MeshBuilder.CreateSphere("mySphere", { diameter: 0.02, diameterX: 0.03 }, this.scene);
            magneton.position = new BABYLON.Vector3(0,0.2,0)
            magneton.id = 'magneton';
            magneton.id = this.addName(magneton.id);
            return magneton.id;
        },
        //添加铁架台 温度计 油浴装置 烧瓶合装置
        addRoundFlaskConePotHeaterStand1(){
            this.activeIndex = 'heater'
            var x = 0.5;
            var z = -0.3;
            this.addModel('heater', null, new BABYLON.Vector3(0+x, 0 , 0+z), new BABYLON.Vector3(0, Math.PI, 0), null, null);
            this.addModel('heater_switch', null, new BABYLON.Vector3(0.08+x, 0.05, -0.25+z), new BABYLON.Vector3(0, Math.PI, 0), null, 'heater_switch1');
            this.addModel('heater_knob', null, new BABYLON.Vector3(0.14+x, 0.05, -0.27+z), null, null, null);
            this.addModel('heater_switch', null, new BABYLON.Vector3(0.197+x, 0.05, -0.25+z), new BABYLON.Vector3(0, Math.PI, 0), null, 'heater_switch2');
            this.addModel('heater_knob', null, new BABYLON.Vector3(0.03+x, 0.05, -0.27+z), null, null, null);
            this.addModel('pot', new BABYLON.Vector3(0.03, 0.03, 0.03), new BABYLON.Vector3(0-x, 0.1, 0 + z), null,null, null);
            this.addModel('round_flask', null, new BABYLON.Vector3(0+x, 0.1, 0+z), null, null, 'round_flaskdel');
            this.addModel("cone",new BABYLON.Vector3(0.03, 0.03, 0.03),new BABYLON.Vector3(0+x, 0.18, 0+z),null,null,'conedel');
            this.addModel('stand1_movable', null, new BABYLON.Vector3(0.07 + x, 0.3, 0 + z), new BABYLON.Vector3(0, Math.PI, 0), null, 'stand1_movable');
            this.addModel('stand1_pole', null, new BABYLON.Vector3(0.17 + x, 0, 0 + z), new BABYLON.Vector3(0, Math.PI, 0), null, 'stand1_pole');
            var timer = setInterval(() => {
                if (this.scene.getMeshByID('stand1_pole') != undefined && this.scene.getMeshByID('stand1_movable')!= undefined){
                    var mesh = BABYLON.Mesh.MergeMeshes(
                        [this.scene.getMeshByID('stand1_pole'), this.scene.getMeshByID('stand1_movable')],
                        true,
                        true,
                        undefined,
                        false,
                        true
                    );
                    mesh.id = 'stand1';
                    mesh.id = this.addName(mesh.id);
                    window.clearInterval(timer);
                }
            }, 100);
        },
        addTweezer(){
            this.addModel('tweezer', new BABYLON.Vector3(0.03, 0.03, 0.03), new BABYLON.Vector3(0, 0.2, 0), null, ['PointerDragBehavior'], null);
        },
        addScissors(){
            this.addModel('scissors', new BABYLON.Vector3(0.03, 0.03, 0.03),null, new BABYLON.Vector3(0, Math.PI / 2, 0), ['PointerDragBehavior'], null); 
        },
        addNeedleFullTriFlask(){
            this.addModel('needle_full', null, new BABYLON.Vector3(0,0.01,0), new BABYLON.Vector3(0, 0,-Math.PI/6), null, 'needle_full');
            this.addModel('tri_flask', null, null, null,null, 'tri_flask');
            var timer = setInterval(() => {
                if (this.scene.getMeshByID('needle_full')!=undefined && this.scene.getMeshByID('tri_flask')!=undefined){
                    var mesh = BABYLON.Mesh.MergeMeshes(
                        [this.scene.getMeshByID('needle_full'), this.scene.getMeshByID('tri_flask')],
                        true,
                        true,
                        undefined,
                        false,
                        true
                    );
                    mesh.id = 'needle_full.tri_flask';
                    mesh.id = this.addName(mesh.id);
                    mesh.addBehavior(
                        new BABYLON.PointerDragBehavior({
                            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                        })
                    );
                    window.clearInterval(timer);
                }
            }, 100);
        },
        addYellowCylinder(){
            this.addModel('yellow_cylinder', new BABYLON.Vector3(0.08, 0.08, 0.08), null, new BABYLON.Vector3(0, Math.PI / 2, 0), ['PointerDragBehavior'], null);
        },
        addGlassPad(){
            this.addModel('glass_pad', new BABYLON.Vector3(0.01, 0.01, 0.01), null, null, ['PointerDragBehavior'], null);
        },
        addClock(){
            if(!this.hasClock){
                this.hasClock = true;
                this.activeIndex = 'clock'
                this.addModel('clock', new BABYLON.Vector3(3, 3, 3), null, new BABYLON.Vector3(0, Math.PI, 0), ['PointerDragBehavior'],null);
            }
        }
    }
}
export default addModels