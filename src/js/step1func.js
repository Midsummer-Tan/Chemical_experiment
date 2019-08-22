class Node {
    score = 0;
    errortext = ''
    successtext = "";
    id = 0;
    scene = null;
    weightprops = {};
    measuring_cylinderprops = {};
    needleprops = {};
    shaked = 0;
    constructor(id) {
        this.id = id;
    }
    setNodeNeed(scene, weightprops, measuring_cylinderprops, needleprops, shaked) {
        this.scene = scene;
        this.weightprops = weightprops;
        this.measuring_cylinderprops = measuring_cylinderprops;
        this.needleprops = needleprops;
        this.shaked = shaked;
    } //node节点需要ExperimengtB中的哪些东西
    setScore(score) {
        this.score = score;
    }
    getScore() {
        //该方法是判断你有没有得到1分的条件
    }
}
class Node0 extends Node {
    errortext = '你未调零';
    successtext = "调零";
    getScore() {
        var array = [1, 1, 0]
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('round_flask_cone')) {
                array[0] = 0;
            }
            if (this.scene.meshes[i].id.split('-').includes('tri_flask_powder_brown')) {
                array[1] = 0;
            }
            if (this.scene.meshes[i].id.split('-').includes('weight.paper')) {
                array[2] = 1;
            }
        }
        if (array.toString() == [1, 1, 1].toString()) {
            for (var i = 0; i < this.scene.meshes.length; i++) {
                if (this.scene.meshes[i].id.split('-').includes('weight.paper') && this.weightprops[this.scene.meshes[i].id][0].toString() == [null, null, 0, 0, 0, 0].toString()) {
                    this.setScore(1);
                    return 1;
                }
            }
        } else return 0;
    }
}
class Node1 extends Node {
    errortext = '你未称量硫辛酸药品';
    successtext = '称量硫辛酸药品';
    getScore() {
        var number = 0;
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('weight.paper_cone')) {
                number = 1;
            }
        }
        if (number == 1) {
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node2 extends Node {
    errortext = '硫辛酸药品未到2.000g';
    successtext = '量取2.000g硫辛酸药品';
    getScore() {
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('weight.paper_cone') && this.weightprops[this.scene.meshes[i].id][0].toString() == [null, null, 2, 0, 0, 0].toString()) {
                this.setScore(1);
                return 1;
            }
        }
        return 0;
    }
}
class Node3 extends Node {
    errortext = '没有将硫辛酸药品倒入10ml烧瓶中';
    successtext = '将硫辛酸药品倒入10ml烧瓶中';
    getScore() {
        var number = 0;
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('round_flask_cone')) {
                number = 1;
            }
        }
        if (number == 1) {
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node4 extends Node {
    errortext = '你未调零';
    successtext = '调零';
    getScore() {
        var array = [0, 0, 0]
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('weight.paper')) {
                array[0] = 1;
            }
            if (this.scene.meshes[i].id.split('-').includes('round_flask_cone')) {
                array[1] = 1;
            }
            if (this.scene.meshes[i].id.split('-').includes('tri_flask_powder_brown')) {
                array[2] = 1;
            }
        }
        var func = () => {
            for (var i = 0; i < this.scene.meshes.length; i++) {
                if (this.scene.meshes[i].id.split('-').includes('weight.paper') && this.weightprops[this.scene.meshes[i].id][0].toString() == [null, null, 0, 0, 0, 0].toString()) {
                    return 1;
                }
            }
            return 0
        }
        if (array[0] == 1 && func() == 1) {
            if (array[1] == 0 && array[2] == 1) {
                this.setScore(1);
                return 1;
            } else if (array[1] == 1 && array[2] == 0) {
                this.setScore(1);
                return 1;
            } else return 0;

        }
        return 0;
    }
}
class Node5 extends Node {
    errortext = '没有用药匙取出六水合三氯化铁药品并放于称量纸上';
    successtext = '量取六水合三氯化铁药品并称量';
    getScore() {
        var number = 0;
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('weight.paper_powder_brown')) {
                number = 1;
            }
        }
        if (number == 1) {
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node6 extends Node {
    errortext = '六水合三氯化铁质量未达到0.100g';
    successtext = '六水合三氯化铁质量达到0.100g';
    getScore() {
        var number = 0;
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('weight.paper_powder_brown') && this.weightprops[this.scene.meshes[i].id][0] == [null, null, 0, 1, 0, 0].toString()) {
                this.setScore(1);
                return 1;
            }
        }
        return 0;
    }
}
class Node7 extends Node {
    errortext = '未将六水合三氯化铁药品放入25ml锥形瓶中';
    successtext = '将六水合三氯化铁药品放入25ml锥形瓶中';
    getScore() {
        var number = 0;
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('tri_flask_powder_brown')) {
                number = 1;
            }
        }
        if (number == 1) {
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node8 extends Node {
    errortext = "未用滴管量取丙酮并倒入25ml量筒中";
    successtext = "用滴管量取丙酮并倒入量筒";
    getScore() {
        var number = 0;
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('measuring_cylinder_full')) {
                number = 1;
            }
        }
        if (number == 1) {
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node9 extends Node {
    errortext = "丙酮液面未达到量筒的14ml刻度处";
    successtext = "量取14ml丙酮";
    getScore() {
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('measuring_cylinder_full') && this.measuring_cylinderprops[this.scene.meshes[i].id] != undefined && this.measuring_cylinderprops[this.scene.meshes[i].id][0] == 14) {
                this.setScore(1);
                return 1;
            }
        }
        return 0;
    }
}
class Node10 extends Node {
    errortext = '未将丙酮与六水合三氯化铁混合';
    successtext = '将丙酮与六水合三氯化铁混合';
    getScore() {
        var number = 0;
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('tri_flask_full_trans_powder_brown')) {
                number = 1;
            }
        }
        if (number == 1) {
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node11 extends Node {
    errortext = '没有左右震荡丙酮与六水合三氯化铁混合溶液,使六水合三氯化铁溶解';
    successtext = '震荡';
    getScore() {
        if (this.shaked == 1) {
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node12 extends Node {
    errortext = '未用塑料薄膜将锥形瓶口封口';
    successtext = '用塑料薄膜将锥形瓶口封口';
    getScore() {
        var number = 0;
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('tri_flask_full_fecl3.film')) {
                number = 1;
            }
        }
        if (number == 1) {
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node13 extends Node {
    errortext = '未用针管吸取DIB交联剂';
    successtext = '用针管吸取DIB交联剂';
    getScore() {
        var number = 0;
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('needle_full')) {
                number = 1;
            }
        }
        if (number == 1) {
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node14 extends Node {
    errortext = 'DIB试剂并未达到针管的0.45ml刻度处';
    successtext = '量取0.45mlDIB试剂';
    getScore() {
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('needle_full') && this.needleprops[this.scene.meshes[i].id]!=undefined && this.needleprops[this.scene.meshes[i].id][0] == 0.45) {
                this.setScore(1);
                return 1;
            }
        }
        return 0;
    }
}
class Node15 extends Node {
    errortext = '未给量取DIB试剂的针管盖上针管盖';
    successtext = '盖上针管盖';
    getScore() {
        var number = 0;
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('needle_full.cap')) {
                number = 1;
            }
        }
        if (number == 1) {
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Step1 {
    all_score = 16; //总分
    current_score = 0; //目前得分
    node_array = [];
    hasRoundFlaskCone = 0;
    hasTriFlaskFullFecl3Film = 0;
    hasNeedleFullCap = 0;
    scene = null;
    constructor(allnode) {
        for (var i = 0; i < allnode.length; i++) {
            this.node_array.push(allnode[i]);
        }

    }
    setStepNeed(scene, weightprops, measuring_cylinderprops, needleprops, shaked) {
        this.scene = scene;
        for (var i = 0; i < this.node_array.length; i++) {
            this.node_array[i].setNodeNeed(scene, weightprops, measuring_cylinderprops, needleprops, shaked);
        }
    }
    checkAllNodeScore() {
        for (var i = 0; i < this.node_array.length; i++) {
            if (this.node_array[i].score == 0 && this.node_array[i].getScore()) {
                return this.node_array[i];
            }
        }
        return null;
    }
    getAllNodeErrorText() {
        //遍历得到现在没有得分步骤的错误提示
        var textarray = [];
        for (var i = 0; i < this.node_array.length; i++) {
            if (this.node_array[i].score == 0) {
                textarray.push(this.node_array[i].errortext);
            }
        }
        return textarray;
    }
    getNowScore() {
        var sum1 = 0;
        for (var i = 0; i < this.node_array.length; i++) {
            sum1 += this.node_array[i].score;
        }
        return sum1;
    }
    unlockTools() {
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.hasRoundFlaskCone == 0 && this.scene.meshes[i].id.split('-').includes('round_flask_cone')) {
                this.hasRoundFlaskCone = 1;
                return 1;
            } else if (this.hasTriFlaskFullFecl3Film == 0 && this.scene.meshes[i].id.split('-').includes('tri_flask_full_fecl3.film')) {
                this.hasTriFlaskFullFecl3Film = 1;
                return 2;
            } else if (this.hasNeedleFullCap == 0 && this.scene.meshes[i].id.split('-').includes('needle_full.cap')) {
                this.hasNeedleFullCap = 1;
                return 3;
            }
        }
        return 0;
    }
}
var node0 = new Node0(0);
var node1 = new Node1(1);
var node2 = new Node2(2);
var node3 = new Node3(3);
var node4 = new Node4(4);
var node5 = new Node5(5);
var node6 = new Node6(6);
var node7 = new Node7(7);
var node8 = new Node8(8);
var node9 = new Node9(9);
var node10 = new Node10(10);
var node11 = new Node11(11);
var node12 = new Node12(12);
var node13 = new Node13(13);
var node14 = new Node14(14);
var node15 = new Node15(15);
const step1Function = {
    data(){
        return {
            step1:new Step1([node0, node1, node2, node3, node4, node5, node6, 
                node7, node8, node9, node10, node11, node12, node13, node14, node15]),
            step1node15:0
        }
    },
    methods:{
        checkPickHover1(pickid, hoverid) {
            var x = this.scene.getMeshByID(hoverid).position.x;
            var y = this.scene.getMeshByID(hoverid).position.y;
            var z = this.scene.getMeshByID(hoverid).position.z;
            if (pickid.split('-')[0] == "paper" && hoverid.split('-')[0] == "weight") {
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
                var id = this.weightlist.indexOf(hoverid)
                mesh.id = "weight.paper";
                mesh.id = this.addName(mesh.id);

                this.weightlist[id] = mesh.id
                this.weightprops[mesh.id] = this.weightprops[hoverid]
                delete(this.weightprops[hoverid])
                this.activeIndex = mesh.id
                setTimeout(() => {
                    this.modifyElectronicScale()
                }, 200);

                mesh.addBehavior(
                    new BABYLON.PointerDragBehavior({
                        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                    })
                );
            } 
            else if (pickid.split('-')[0] == "round_flask_cone" && hoverid.split('-')[0] == "stand") {
                this.scene.getMeshByID(pickid).position = this.changeMergedPosition(pickid, x - 0.21, y + 0.23, z + 0.08);
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
                mesh.id = this.addName(mesh.id)
                mesh.addBehavior(
                    new BABYLON.PointerDragBehavior({
                        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                    })
                );
            } 
            else if (pickid.split('-')[0] == 'tri_flask_powder_brown' && hoverid.split('-')[0] == "stand") {
                this.scene.getMeshByID(pickid).position = this.changeMergedPosition(pickid, x - 0.16, y + 0.4, z - 0.05);
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
                mesh.id = this.addName(mesh.id)
                mesh.addBehavior(
                    new BABYLON.PointerDragBehavior({
                        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                    })
                );
            } 
            else if (pickid.split('-')[0] == "round_flask" && hoverid.split('-')[0] == "stand") {
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
                mesh.id = this.addName(mesh.id);
            } 
            else if (pickid.split('-')[0] == "tri_flask" && hoverid.split('-')[0] == "stand") {
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
                mesh.id = this.addName(mesh.id)
            } 
            else if (pickid.split('-')[0] == "round_flask" && hoverid.split('-')[0] == "weight") {
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
                var id = this.weightlist.indexOf(hoverid)
                mesh.id = "weight.round_flask";
                mesh.id = this.addName(mesh.id)

                this.weightlist[id] = mesh.id
                this.weightprops[mesh.id] = this.weightprops[hoverid]
                delete(this.weightprops[hoverid])
                this.activeIndex = mesh.id
                setTimeout(() => {
                    this.modifyElectronicScale()
                }, 200);

                mesh.addBehavior(
                    new BABYLON.PointerDragBehavior({
                        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                    })
                );
            } 
            else if (pickid.split('-')[0] == "pot" && hoverid.split('-')[0] == "weight") {
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
                var id = this.weightlist.indexOf(hoverid)
                mesh.id = "weight.pot";
                mesh.id = this.addName(mesh.id)
                this.weightlist[id] = mesh.id
                this.weightprops[mesh.id] = this.weightprops[hoverid]
                delete(this.weightprops[hoverid])
                this.activeIndex = mesh.id
                setTimeout(() => {
                    this.modifyElectronicScale()
                }, 200);
                mesh.addBehavior(
                    new BABYLON.PointerDragBehavior({
                        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                    })
                );
            } 
            else if (pickid.split('-')[0] == "tri_flask" && hoverid.split('-')[0] == "weight") {
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
                var id = this.weightlist.indexOf(hoverid)
                mesh.id = "weight.tri_flask";
                mesh.id = this.addName(mesh.id)
                this.weightlist[id] = mesh.id
                this.weightprops[mesh.id] = this.weightprops[hoverid]
                delete(this.weightprops[hoverid])
                this.activeIndex = mesh.id
                setTimeout(() => {
                    this.modifyElectronicScale()
                }, 200);
                mesh.addBehavior(
                    new BABYLON.PointerDragBehavior({
                        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                    })
                );
            } 
            else if (pickid.split('-')[0] == "spoon" && hoverid.split('-')[0] == "c8h14o2s2") {
                var x = this.scene.getMeshByID(pickid).position.x;
                var y = this.scene.getMeshByID(pickid).position.y;
                var z = this.scene.getMeshByID(pickid).position.z;
                //this.scene.removeMesh(this.scene.getMeshByID('spoon'));
                this.addModel(
                    "cone",
                    new BABYLON.Vector3(0.02, 0.02, 0.02),
                    new BABYLON.Vector3(x - 0.055, y + 0.02, z),
                    null,
                    null,
                    "cone"
                );
                setTimeout(() => {
                    var mesh = BABYLON.Mesh.MergeMeshes(
                        [this.scene.getMeshByID("cone"), this.scene.getMeshByID(pickid)],
                        true,
                        true,
                        undefined,
                        false,
                        true
                    );
                    mesh.id = "spoon_cone";
                    mesh.id = this.addName(mesh.id)
                    mesh.addBehavior(
                        new BABYLON.PointerDragBehavior({
                            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                        })
                    );
                }, 800);
                //this.addSpoonMerged(new BABYLON.Vector3(-x,y,z));//右手系变左手系 谁知道这怎么回事
            } 
            else if (pickid.split('-')[0] == "spoon" && hoverid.split('-')[0] == "fecl3") {
                var x = this.scene.getMeshByID(pickid).position.x;
                var y = this.scene.getMeshByID(pickid).position.y;
                var z = this.scene.getMeshByID(pickid).position.z;
                //this.scene.removeMesh(this.scene.getMeshByID('spoon'));
                this.addModel(
                    "powder_brown",
                    new BABYLON.Vector3(2, 2, 2),
                    new BABYLON.Vector3(x - 0.055, y, z),
                    null,
                    null,
                    "powder_brown"
                );
                setTimeout(() => {
                    var mesh = BABYLON.Mesh.MergeMeshes(
                        [this.scene.getMeshByID("powder_brown"), this.scene.getMeshByID(pickid)],
                        true,
                        true,
                        undefined,
                        false,
                        true
                    );
                    mesh.id = "spoon_powder_brown";
                    mesh.id = this.addName(mesh.id)
                    mesh.addBehavior(
                        new BABYLON.PointerDragBehavior({
                            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                        })
                    );
                }, 800);
                //this.addSpoonMerged(new BABYLON.Vector3(-x,y,z));//右手系变左手系 谁知道这怎么回事
            } 
            else if (pickid.split('-')[0] == 'spoon_powder_brown' && hoverid.split('-')[0] == 'weight.paper') {
                var mesh = this.scene.getMeshByID(hoverid);
                mesh.removeBehavior(mesh.behaviors[0]);
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
                    null,
                    "powder_brown"
                ); //右手系变左手系
                mesh.disableFacetData();
                //移出带有粉末的勺子 加空勺子
                var mesh = this.scene.getMeshByID(pickid);
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
                    ['PointerDragBehavior'],
                    null
                );
                setTimeout(() => {
                    var mesh = BABYLON.Mesh.MergeMeshes(
                        [
                            this.scene.getMeshByID(hoverid),
                            this.scene.getMeshByID("powder_brown")
                        ],
                        true,
                        true,
                        undefined,
                        false,
                        true
                    );
                    var id = this.weightlist.indexOf(hoverid)
                    mesh.id = "weight.paper_powder_brown";
                    mesh.id = this.addName(mesh.id)
                    this.weightlist[id] = mesh.id
                    this.weightprops[mesh.id] = this.weightprops[hoverid]
                    delete(this.weightprops[hoverid])
                    this.activeIndex = mesh.id
                    setTimeout(() => {
                        this.modifyElectronicScale()
                    }, 200);
                    mesh.addBehavior(
                        new BABYLON.PointerDragBehavior({
                            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                        })
                    );
                }, 800);
            } 
            else if (pickid.split('-')[0] == 'spoon_powder_brown' && hoverid.split('-')[0] == 'weight.paper_powder_brown') {
                var mesh = this.scene.getMeshByID(pickid);
                mesh.updateFacetData();
                var po = mesh.getFacetPosition(Math.floor(mesh.facetNb / 2));
                var x = po.x;
                var y = po.y;
                var z = po.z;
                mesh.disableFacetData();
                this.scene.removeMesh(mesh);
                setTimeout(() => {
                    this.modifyElectronicScale()
                }, 200);
                //移出带有粉末的勺子 加空勺子
                this.addModel(
                    "spoon",
                    new BABYLON.Vector3(1.5, 1.5, 1.5),
                    new BABYLON.Vector3(-x + 0.08, y, z),
                    null,
                    ['PointerDragBehavior'],
                    null
                );
            } 
            else if (pickid.split('-')[0] == "spoon_cone" && hoverid.split('-')[0] == "weight.paper") {
                var mesh = this.scene.getMeshByID(hoverid);
                mesh.removeBehavior(mesh.behaviors[0]);
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
                    null,
                    "cone"
                ); //右手系变左手系
                mesh.disableFacetData();
                //移出带有粉末的勺子 加空勺子
                var mesh = this.scene.getMeshByID(pickid);
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
                    ['PointerDragBehavior'],
                    null
                );
                setTimeout(() => {
                    var mesh = BABYLON.Mesh.MergeMeshes(
                        [
                            this.scene.getMeshByID(hoverid),
                            this.scene.getMeshByID("cone")
                        ],
                        true,
                        true,
                        undefined,
                        false,
                        true
                    );
                    var id = this.weightlist.indexOf(hoverid)
                    mesh.id = "weight.paper_cone";
                    mesh.id = this.addName(mesh.id)
                    this.weightlist[id] = mesh.id
                    this.weightprops[mesh.id] = this.weightprops[hoverid]
                    delete(this.weightprops[hoverid])
                    this.activeIndex = mesh.id
                    setTimeout(() => {
                        this.modifyElectronicScale()
                    }, 200);
                    mesh.addBehavior(
                        new BABYLON.PointerDragBehavior({
                            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                        })
                    );
                }, 800);
            } 
            else if (pickid.split('-')[0] == "spoon_cone" && hoverid.split('-')[0] == "weight.paper_cone") {
                var mesh = this.scene.getMeshByID(pickid);
                mesh.updateFacetData();
                var po = mesh.getFacetPosition(Math.floor(mesh.facetNb / 2));
                var x = po.x;
                var y = po.y;
                var z = po.z;
                mesh.disableFacetData();
                this.scene.removeMesh(mesh);
                setTimeout(() => {
                    this.modifyElectronicScale()
                }, 200);
                //移出带有粉末的勺子 加空勺子
                this.addModel(
                    "spoon",
                    new BABYLON.Vector3(1.5, 1.5, 1.5),
                    new BABYLON.Vector3(-x + 0.08, y, z),
                    null,
                    ['PointerDragBehavior'],
                    null
                );

            } 
            else if (pickid.split('-')[0] == "paper_cone" && hoverid.split('-')[0] == "round_flask") {
                this.scene.removeMesh(this.scene.getMeshByID(pickid));
                var mesh = this.scene.getMeshByID(hoverid)
                mesh.removeBehavior(mesh.behaviors[0]);
                this.addModel(
                    "cone",
                    new BABYLON.Vector3(0.03, 0.03, 0.03),
                    new BABYLON.Vector3(x, y + 0.08, z),
                    null,
                    null,
                    "cone"
                );
                setTimeout(() => {
                    var mesh1 = BABYLON.Mesh.MergeMeshes(
                        [
                            this.scene.getMeshByID("cone"),
                            this.scene.getMeshByID(hoverid)
                        ],
                        true,
                        true,
                        undefined,
                        false,
                        true
                    );
                    mesh1.id = "round_flask_cone";
                    mesh1.id = this.addName(mesh1.id)
                    mesh1.addBehavior(
                        new BABYLON.PointerDragBehavior({
                            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                        })
                    );
                }, 800);
            } 
            else if (pickid.split('-')[0] == 'paper_powder_brown' && hoverid.split('-')[0] == 'tri_flask') {
                var mesh = this.scene.getMeshByID(hoverid);
                mesh.removeBehavior(mesh.behaviors[0]);
                var po = mesh.position;
                var x = po.x;
                var y = po.y;
                var z = po.z;
                this.scene.removeMesh(this.scene.getMeshByID(pickid));
                this.addModel(
                    "powder_brown",
                    new BABYLON.Vector3(2.5, 2.5, 2.5),
                    new BABYLON.Vector3(x, y + 0.01, z),
                    null,
                    null,
                    "powder_brown"
                );
                setTimeout(() => {
                    var mesh1 = BABYLON.Mesh.MergeMeshes(
                        [
                            this.scene.getMeshByID("powder_brown"),
                            this.scene.getMeshByID(hoverid)
                        ],
                        true,
                        true,
                        undefined,
                        false,
                        true
                    );
                    mesh1.id = "tri_flask_powder_brown";
                    mesh1.id = this.addName(mesh1.id)
                    mesh1.addBehavior(
                        new BABYLON.PointerDragBehavior({
                            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                        })
                    );
                }, 800);

            } 
            else if (pickid.split('-')[0] == 'dropper' && hoverid.split('-')[0] == 'c3h6o') {
                var po = this.scene.getMeshByID(pickid).position;
                this.scene.removeMesh(this.scene.getMeshByID(pickid))
                this.addModel('dropper_full', new BABYLON.Vector3(1.5, 1.5, 1.5), new BABYLON.Vector3(-po.x, po.y, po.z), new BABYLON.Vector3(0, 0, Math.PI), ['PointerDragBehavior'], null);
            } 
            else if (pickid.split('-')[0] == 'dropper_full' && hoverid.split('-')[0] == 'measuring_cylinder') {
                this.measuring_cylinderprops[hoverid][0] += 2;
                var po = this.scene.getMeshByID(hoverid).position;
                this.scene.removeMesh(this.scene.getMeshByID(hoverid));
                var po1 = this.scene.getMeshByID(pickid).position;
                this.scene.removeMesh(this.scene.getMeshByID(pickid));
                this.addModel('dropper', new BABYLON.Vector3(1.5, 1.5, 1.5), new BABYLON.Vector3(-po1.x, po1.y, po1.z), new BABYLON.Vector3(0, 0, Math.PI), ['PointerDragBehavior'], null);
                this.addModel('measuring_cylinder_full', null, new BABYLON.Vector3(-po.x + 0.4, po.y, po.z), null, ['PointerDragBehavior'], 'measuring_cylinder_full');
                setTimeout(() => {
                    var mesh = this.scene.getMeshByID('measuring_cylinder_full')
                    mesh.id = this.addName(mesh.id);
                    this.activeIndex = mesh.id
                    var index = this.measuring_cylinderlist.indexOf(hoverid);
                    this.measuring_cylinderlist[index] = mesh.id;
                    this.measuring_cylinderprops[mesh.id] = this.measuring_cylinderprops[hoverid]
                    delete(this.measuring_cylinderprops[hoverid]);
                    this.refreshComponents()
                }, 800);
            } 
            else if (pickid.split('-')[0] == 'dropper_full' && hoverid.split('-')[0] == 'measuring_cylinder_full') {
                this.measuring_cylinderprops[hoverid][0] += 2;
                var po1 = this.scene.getMeshByID(pickid).position;
                this.scene.removeMesh(this.scene.getMeshByID(pickid));
                this.addModel('dropper', new BABYLON.Vector3(1.5, 1.5, 1.5), new BABYLON.Vector3(-po1.x, po1.y, po1.z), new BABYLON.Vector3(0, 0, Math.PI), ['PointerDragBehavior'], null);
                this.refreshComponents()
            } 
            else if (pickid.split('-')[0] == 'measuring_cylinder_full' && hoverid.split('-')[0] == 'tri_flask_powder_brown') {
                //this.scene.getMeshByID().position;
                var poarray = this.getMergedPosition(hoverid);
                var x = poarray[0];
                var y = poarray[1];
                var z = poarray[2];
                this.scene.removeMesh(this.scene.getMeshByID(hoverid));
                this.addModel('tri_flask_full_trans', null, new BABYLON.Vector3(x, 0, z), null, null, 'tri_flask_full_trans');
                this.addModel(
                    "powder_brown",
                    new BABYLON.Vector3(2.5, 2.5, 2.5),
                    new BABYLON.Vector3(-x, 0.05, z),
                    null,
                    null,
                    "powder_brown"
                );
                var po1 = this.getMergedPosition(pickid);
                this.addModel('measuring_cylinder', null, new BABYLON.Vector3(-po1[0], 0, po1[2]), null, null, 'measuring_cylinder');
                setTimeout(() => {
                    var mesh = BABYLON.Mesh.MergeMeshes(
                        [this.scene.getMeshByID('powder_brown'), this.scene.getMeshByID('tri_flask_full_trans')],
                        true,
                        true,
                        undefined,
                        false,
                        true
                    );
                    mesh.id = 'tri_flask_full_trans_powder_brown';
                    mesh.id = this.addName(mesh.id)
                    mesh.addBehavior(
                        new BABYLON.PointerDragBehavior({
                            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                        })
                    );
                    var mesh1 = this.scene.getMeshByID('measuring_cylinder');
                    mesh1.id = this.addName(mesh1.id)
                    this.activeIndex = mesh1.id
                    this.scene.removeMesh(this.scene.getMeshByID(pickid));
                    delete(this.measuring_cylinderprops[hoverid])
                    this.measuring_cylinderlist.splice([this.measuring_cylinderlist.indexOf(hoverid)], 1)
                    this.measuring_cylinderlist.push(mesh1.id);
                    this.measuring_cylinderprops[mesh1.id] = [0, ''];
                    mesh1.addBehavior(
                        new BABYLON.PointerDragBehavior({
                            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                        })
                    );
                    this.refreshComponents();
                }, 800);
            } 
            else if (pickid.split('-')[0] == 'film' && hoverid.split('-')[0] == 'tri_flask_full_fecl3') {
                var po = this.getMergedPosition(hoverid);
                this.scene.getMeshByID(pickid).position = new BABYLON.Vector3(-po[0], po[1], po[2] - 0.002);
                var mesh = BABYLON.Mesh.MergeMeshes(
                    [this.scene.getMeshByID(hoverid), this.scene.getMeshByID(pickid)],
                    true,
                    true,
                    undefined,
                    false,
                    true
                );
                mesh.id = 'tri_flask_full_fecl3.film'
                mesh.id = this.addName(mesh.id)
                mesh.addBehavior(
                    new BABYLON.PointerDragBehavior({
                        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                    })
                );

            } 
            else if (pickid.split('-')[0] == 'cap' && hoverid.split('-')[0] == 'needle') {
                var mesh = this.scene.getMeshByID(pickid);
                var po = this.getMergedPosition(hoverid);
                mesh.position = new BABYLON.Vector3(po[0], po[1] + 0.01, po[2]);
                mesh = BABYLON.Mesh.MergeMeshes(
                    [this.scene.getMeshByID(hoverid), this.scene.getMeshByID(pickid)],
                    true,
                    true,
                    undefined,
                    false,
                    true
                );
                mesh.id = "needle.cap";
                mesh.id = this.addName(mesh.id)
                this.needlelist[this.needlelist.indexOf(hoverid)] = mesh.id
                this.needleprops[mesh.id] = this.needleprops[hoverid]
                delete(this.needleprops[hoverid])
                mesh.addBehavior(
                    new BABYLON.PointerDragBehavior({
                        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                    })
                );
            } 
            else if (pickid.split('-')[0] == 'needle' && hoverid.split('-')[0] == 'dib') {
                this.needleprops[pickid][0] += 0.05;
                this.needleprops[pickid][0] = Math.floor(this.needleprops[pickid][0] * 100) / 100;
                var po = this.getMergedPosition(pickid);
                this.addModel('needle_full', null, new BABYLON.Vector3(po[0], po[1] + 0.15, po[2]), new BABYLON.Vector3(0, 0, Math.PI), null, 'needle_full');
                this.scene.removeMesh(this.scene.getMeshByID(pickid));
                setTimeout(() => {
                    var mesh = this.scene.getMeshByID('needle_full')
                    mesh.id = this.addName(mesh.id)
                    this.activeIndex = mesh.id;
                    this.needlelist[this.needlelist.indexOf(pickid)] = mesh.id
                    this.needleprops[mesh.id] = this.needleprops[pickid]
                    delete(this.needleprops[pickid])
                    mesh.addBehavior(
                        new BABYLON.PointerDragBehavior({
                            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                        })
                    );
                    this.refreshComponents();
                }, 800);

            } 
            else if (pickid.split('-')[0] == 'needle_full' && hoverid.split('-')[0] == 'dib') {
                this.needleprops[pickid][0] += 0.05;
                this.needleprops[pickid][0] = Math.floor(this.needleprops[pickid][0] * 100) / 100;
                this.refreshComponents()
            } 
            else if (pickid.split('-')[0] == 'cap' && hoverid.split('-')[0] == 'needle_full') {
                var mesh1 = this.scene.getMeshByID(pickid);
                var po = this.getMergedPosition(hoverid);
                mesh1.position = new BABYLON.Vector3(po[0], po[1] + 0.01, po[2]);
                var mesh = BABYLON.Mesh.MergeMeshes(
                    [this.scene.getMeshByID(hoverid), this.scene.getMeshByID(pickid)],
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
                this.activeIndex = mesh.id
                this.needlelist[this.needlelist.indexOf(hoverid)] = mesh.id
                this.needleprops[mesh.id] = this.needleprops[hoverid]
                delete(this.needleprops[hoverid])
                this.refreshComponents();
            }
            else if (hoverid.split('-')[0] == "trash_can") {
                this.scene.removeMesh(this.scene.getMeshByID(pickid));
                if (this.weightlist.indexOf(pickid) != -1) {
                    var index = this.weightlist.indexOf(pickid);
                    //删除
                    {
                        this.weightlist.splice(index, 1)
                        delete(this.weightlist[pickid])
                    }
                } else if (this.measuring_cylinderlist.indexOf(pickid) != -1) {
                    var index = this.measuring_cylinderlist.indexOf(pickid);
                    //删除
                    {
                        this.measuring_cylinderlist.splice(index, 1)
                        delete(this.measuring_cylinderlist[pickid])
                    }
                } else if (this.needlelist.indexOf(pickid) != -1) {
                    var index = this.needlelist.indexOf(pickid);
                    //删除
                    {
                        this.needlelist.splice(index, 1)
                        delete(this.needlelist[pickid])
                    }
                } else if (pickid.split('-')[0] == 'clock') {
                    this.hasClock = false;
                }
                setTimeout(() => {
                    for (var i = 0; i < this.weightlist.length; i++) {
                        var re = this.weightprops[this.weightlist[i]][0]
                        this.$refs.weight[i].setAllNumber(re[0], re[1], re[2], re[3], re[4], re[5], this.weightlist[i]);
                    }
                    if (this.weightlist.length != 0) this.activeIndex = this.weightlist[this.weightlist.length - 1];
                    else if (this.measuring_cylinderlist.length != 0) this.activeIndex = this.measuring_cylinderlist[this.measuring_cylinderlist.length - 1]
                    else if (this.needlelist.length != 0) this.activeIndex = this.needlelist[this.needlelist.length - 1]
                    else this.activeIndex = 'default'
                }, 200);
            }
        },
        getScore_step1() {
            this.all_score = this.step1.all_score;
            this.step1.setStepNeed(this.scene, this.weightprops, this.measuring_cylinderprops, this.needleprops, this.shaked);
            var node = this.step1.checkAllNodeScore();
            if (node != null) {
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message: '<strong><span style="color:black;">' +
                        node.successtext +
                        "</span>&emsp;" +
                        '<span style="color: teal">得分+1</span></strong>',
                    type: "success"
                });
                this.now_score = this.step1.getNowScore();
            }
            if(this.step1node15 == 0 && this.step1.node_array[15].score == 1){
                this.step1node15 = 1;
                setTimeout(() => {
                    this.$notify({
                        title: 'Completed',
                        message: '你已经完成了第一步——反应前期准备',
                        type: 'warning'
                    });
                }, 1000);
            }
            var num = this.step1.unlockTools();
            var tool = ['', '装有硫辛酸的圆底烧瓶', '三氯化铁丙酮溶液', '装有dib试剂的针管']
            var message = '<strong><span style="color:black;">' +
                '恭喜你！得到了新工具' +
                "</span>&emsp;" +
                '<span style="color: teal">' +
                tool[num] +
                '</span></strong>';
            switch (num) {
                case 1:
                    this.show1 = true;
                    break;
                case 2:
                    this.show2 = true;
                    break;
                case 3:
                    this.show3 = true;
                    break;
                default:
                    break;
            }
            if (num != 0) {
                setTimeout(() => {
                    this.$message({
                        dangerouslyUseHTMLString: true,
                        message: message,
                        type: "warning"
                    });
                }, 800);
            }
        }
    }
}
export default step1Function