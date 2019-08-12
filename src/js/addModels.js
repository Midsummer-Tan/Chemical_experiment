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
            setTimeout(() => {
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
                this.weightprops[mesh.id] = [[null, null, 0, 0, 0, 0], name];
                setTimeout(() => {
                    this.$refs.weight[this.weightlist.indexOf(mesh.id)].setAllNumber(null, null, 0, 0, 0, 0, mesh.id);
                }, 100);
            }, 500);


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
            this.addModel('stand', null, null, new BABYLON.Vector3(0, Math.PI, 0), ['PointerDragBehavior'], null);
        },
        addPot() {
            this.addModel('pot', null, null, null, ['PointerDragBehavior'], null);
        },
        addDropper() {
            this.addModel('dropper', new BABYLON.Vector3(1.5, 1.5, 1.5), new BABYLON.Vector3(0, 0.2, 0), new BABYLON.Vector3(0, 0, Math.PI), ['PointerDragBehavior'], null);
        },
        addHeater() {
            this.addModel('heater', null, null, new BABYLON.Vector3(0, Math.PI, 0), ['PointerDragBehavior'], null);
        },
        addLiquidTransferor() {
            this.addModel('liquid_transferor', null, new BABYLON.Vector3(0, 0.2, 0), new BABYLON.Vector3(0, 0, Math.PI), ['PointerDragBehavior']);
        },
        addMeasuringCylinder() {
            this.addModel('measuring_cylinder', null, null, null, ['PointerDragBehavior'], 'measuring_cylinder');
            setTimeout(() => {
                var mesh = this.scene.getMeshByID('measuring_cylinder')
                mesh.id = this.addName(mesh.id)
                this.activeIndex = mesh.id
                this.scene.getMeshByID(mesh.id).addBehavior(
                    new BABYLON.PointerDragBehavior({
                        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                    })
                );
                this.measuring_cylinderlist.push(mesh.id);
                this.measuring_cylinderprops[mesh.id] = [0, '量筒' + mesh.id.split('-')[1]]
            }, 500);

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
            var mesh2 = BABYLON.Mesh.CreateCylinder("cap", 0.01, 0.01, 0.01, 10, 1, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
            this.scene.getMeshByID('cap').position = new BABYLON.Vector3(0.002, 0.05, 0);
            var mater = new BABYLON.StandardMaterial("texture1", this.scene);
            mater.diffuseColor = new BABYLON.Color3(0.134, 0.331, 0.535);
            this.scene.getMeshByID('cap').material = mater;
            setTimeout(() => {
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
            }, 500);

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
                mesh.id = this.addName(mesh.id);
                mesh.addBehavior(
                    new BABYLON.PointerDragBehavior({
                        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                    })
                );
            }, 500);
        },
        addTriFlaskPowderBrown() {
            this.addModel('tri_flask', null, null, null, null, null);
            this.addModel(
                "powder_brown",
                new BABYLON.Vector3(2.5, 2.5, 2.5),
                new BABYLON.Vector3(0, 0.05, 0),
                null,
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
                );
            }, 500)
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
                mesh.id = this.addName(mesh.id);
                mesh.addBehavior(
                    new BABYLON.PointerDragBehavior({
                        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                    })
                );
            }, 500);
        },
        addTriFlaskFullFecl3Film() {
            this.addModel('tri_flask_full_fecl3', null, null, null, null, 'tri_flask_full_fecl3');
            this.addModel('film', null, new BABYLON.Vector3(0, 0.27, 0), null, null, 'film');
            setTimeout(() => {
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
                mesh.id = mesh.id = this.addName(mesh.id);
            }, 500);
        },
        addNeedleFullCap() {
            this.addModel('needle_full', null, new BABYLON.Vector3(0, 0 + 0.15, 0), new BABYLON.Vector3(0, 0, Math.PI), null, 'needle_full');
            var mesh1 = this.addCap(0, 0.02, 0);
            mesh1.removeBehavior(mesh1.behaviors[0]);
            mesh1.id = 'cap'
            setTimeout(() => {
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
                mesh.addBehavior(
                    new BABYLON.PointerDragBehavior({
                        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                    })
                );
            }, 500);

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
                mesh.id = this.addName(mesh.id);
                mesh.addBehavior(
                    new BABYLON.PointerDragBehavior({
                        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                    })
                );
            }, 500);
        }
    }
}
export default addModels