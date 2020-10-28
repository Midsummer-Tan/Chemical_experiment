class Node {
    score = 0;
    errortext = ''
    successtext = "";
    id = 0;
    scene = null;
    weightprops = {};
    measuring_cylinderprops = {};
    needleprops = {};
    stand_movable_high = 0;
    step2node2 = 0;
    constructor(id) {
        this.id = id;
    }
    setNodeNeed(scene, weightprops, measuring_cylinderprops, needleprops, stand_movable_high, step2node2) {
        this.scene = scene;
        this.weightprops = weightprops;
        this.measuring_cylinderprops = measuring_cylinderprops;
        this.needleprops = needleprops;
        this.stand_movable_high = stand_movable_high;
        this.step2node2 = step2node2;
    } //node节点需要ExperimengtB中的哪些东西
    setScore(score) {
        this.score = score;
    }
    getScore() {
        //该方法是判断你有没有得到1分的条件
    }
}
class Node0 extends Node {
    errortext = '未将油浴锅置于磁力搅拌器上';
    successtext = "将油浴锅置于磁力搅拌器上";
    getScore() {
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('pot.heater')) {
                this.setScore(1);
                return 1;
            }
        }
        return 0;
    }
}
class Node1 extends Node {
    errortext = '未调整好铁夹高度';
    successtext = '调整铁夹高度';
    getScore() {
        if (this.stand_movable_high == -0.3) {
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node2 extends Node {
    errortext = '未将装有硫辛酸的圆底烧瓶浸入油浴锅中';
    successtext = '将装有硫辛酸的圆底烧瓶浸入油浴锅中';
    getScore() {
        if (this.step2node2==1) {
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Step2 {
    all_score = 3; //总分
    node_array = [];
    scene = null;
    weightprops = {};
    measuring_cylinderprops = {};
    needleprops = {};
    stand_movable_high = 0;
    step2node2 = 0;
    constructor(allnode) {
        for (var i = 0; i < allnode.length; i++) {
            this.node_array.push(allnode[i]);
        }

    }
    setStepNeed(scene, weightprops, measuring_cylinderprops, needleprops, stand_movable_high, step2node2) {
        this.scene = scene;
        for (var i = 0; i < this.node_array.length; i++) {
            this.node_array[i].setNodeNeed(scene, weightprops, measuring_cylinderprops, needleprops, stand_movable_high, step2node2);
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
    }
}
var node0 = new Node0(0);
var node1 = new Node1(1);
var node2 = new Node2(2);
const step2Function = {
    data(){
        return {
            step2:new Step2([node0, node1,node2]),
            step2node2:0
        }
    },
    methods:{
        checkPickHover2(pickid, hoverid) {
            if (pickid.split('-')[0] == 'pot' && hoverid.split('-')[0] == 'heater') {
                this.scene.getMeshByID(pickid).removeBehavior(this.scene.getMeshByID(pickid).behaviors[0]);
                this.scene.getMeshByID(hoverid).removeBehavior(this.scene.getMeshByID(hoverid).behaviors[0]);
                var po = this.getMergedPosition(hoverid)
                this.scene.getMeshByID(pickid).position = new BABYLON.Vector3(po[0]+0.22 , po[1]+0.02, po[2] + 0.25);
                var mesh = BABYLON.Mesh.MergeMeshes(
                    [this.scene.getMeshByID(hoverid), this.scene.getMeshByID(pickid)],
                    true,
                    true,
                    undefined,
                    false,
                    true
                );
                mesh.id = "pot.heater";
                mesh.id = this.addName(mesh.id)
                mesh.addBehavior(
                    new BABYLON.PointerDragBehavior({
                        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                    })
                );
            }
            else if (pickid.split('-')[0] == 'round_flask_cone' && hoverid.split('-')[0] == 'stand1_movable') {
                var mesh1 = this.scene.getMeshByID(hoverid);
                var mesh2 = this.scene.getMeshByID(pickid);
                mesh2.removeBehavior(mesh2.behaviors[0])
                var po = this.getMergedPosition(hoverid);
                mesh2.position = new BABYLON.Vector3(po[0]+0.02,po[1]-0.2,po[2]);
                var mesh = BABYLON.Mesh.MergeMeshes(
                    [mesh1,mesh2],
                    true,
                    true,
                    undefined,
                    false,
                    true
                );
                mesh.id = "stand1_movable.round_flask_cone";
                mesh.id = this.addName(mesh.id)
                for(var i=0;i<this.standlist.length;i++){
                    if(this.standlist[i][0]==hoverid){
                        this.standlist[i][0]=mesh.id;
                        break;
                    }
                }
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
                delete (this.needleprops[hoverid])
                this.refreshComponents();
            }
            //else if (pickid.split('-')[0] == 'thermometer' && hoverid.split('-')[0] == 'round_flask_cone.pot.heater.stand1') {
            //     var po = this.getMergedPosition(hoverid);
            //     this.scene.getMeshByID(pickid).position = new BABYLON.Vector3(po[0] - 0.15, po[1]+0.02, po[2]+0.03);
            //     //加绑在铁架台温度计上的绳子
            //     {
            //         var rope = BABYLON.Mesh.CreateCylinder("rope", Math.abs(this.stand_movable_high - (po[1] + 0.2)), 0.001, 0.001, 10, 1, this.scene, false, BABYLON.Mesh.DEFAULTSIDE);
            //         rope.position = new BABYLON.Vector3(po[0] - 0.15, this.stand_movable_high - (Math.abs(this.stand_movable_high - (po[1] + 0.2))/2), po[2] + 0.03)
            //         var mater = new BABYLON.StandardMaterial("texture1", this.scene);
            //         mater.diffuseColor = new BABYLON.Color3(1, 1, 1);
            //         rope.material = mater;
            //     }
            //     var mesh = BABYLON.Mesh.MergeMeshes(
            //         [this.scene.getMeshByID(pickid), this.scene.getMeshByID(hoverid),rope],
            //         true,
            //         true,
            //         undefined,
            //         false,
            //         true
            //     );
            //     mesh.id = "thermometer.round_flask_cone.pot.heater.stand1";
            //     mesh.id = this.addName(mesh.id)
            //     mesh.addBehavior(
            //         new BABYLON.PointerDragBehavior({
            //             dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
            //         })
            //     );
            // } 
            else if (pickid!='bruker' && hoverid== "trash_can") {
                this.scene.removeMesh(this.scene.getMeshByID(pickid));
                this.WhenNotSetModelsOnDesk(pickid);
            }
        },
        getScore_step2() {
            this.all_score = this.step2.all_score;
            this.step2.setStepNeed(this.scene, this.weightprops, this.measuring_cylinderprops, this.needleprops, this.stand_movable_high, this.step2node2);
            var node = this.step2.checkAllNodeScore();
            if (node != null) {
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message: '<strong><span style="color:black;">' +
                        node.successtext +
                        "</span>&emsp;" +
                        '<span style="color: teal">得分+1</span></strong>',
                    type: "success"
                });
                this.now_score = this.step2.getNowScore();
            }
            if (this.step2.node_array[2].score == 1 && this.step2node2==1) {
                this.step2node2 = 0
                setTimeout(() => {
                    this.$notify({
                        title: 'Completed',
                        message: '你已经完成了第二步——搭建反应装置',
                        type: 'warning'
                    });
                }, 1000);
                
            }
        },
        clearAllScore2() {
            for (var i = 0; i < this.step2.node_array.length; i++) {
                this.step2.node_array[i].score = 0;
            }
            this.step2node2 = 0;
        },
        getScoreString2() {
            var str = "";
            for (var i = 0; i < this.step2.node_array.length; i++) {
                str += this.step2.node_array[i].score;
                str += ',';
            }
            str = str.substr(0, str.length - 1);
            return str;
        }
    }
}
export default step2Function