class Node {
    score = 0;
    errortext = ''
    successtext = "";
    id = 0;
    scene = null;
    stretched = 0;
    constructor(id) {
        this.id = id;
    }
    setNodeNeed(scene,stretched) {
        this.scene = scene;
        this.stretched = stretched;
    } //node节点需要ExperimengtB中的哪些东西
    setScore(score) {
        this.score = score;
    }
    getScore() {
        //该方法是判断你有没有得到1分的条件
    }
}
class Node0 extends Node {
    errortext = '未用剪刀剪开针管取出胶黏物';
    successtext = "用剪刀剪开针管取出胶黏物";
    getScore() {
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('yellow_cylinder')) {
                this.setScore(1);
                return 1;
            }
        }
        return 0;
    }
}
class Node1 extends Node {
    errortext = '未用玻璃片夹住胶黏物并拉伸';
    successtext = "用玻璃片夹住胶黏物并拉伸";
    getScore() {
        if (this.stretched==1){
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Step4 {
    all_score = 2; //总分
    current_score = 0; //目前得分
    node_array = [];
    constructor(allnode) {
        for (var i = 0; i < allnode.length; i++) {
            this.node_array.push(allnode[i]);
        }
    }
    setStepNeed(scene,stretched) {
        for (var i = 0; i < this.node_array.length; i++) {
            this.node_array[i].setNodeNeed(scene, stretched);
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
        this.current_score = sum1;
        return sum1;
    }
    unlockTools() {
    }
}
var node0 = new Node0(0);
var node1 = new Node1(1);
const step4Function = {
    data(){
        return {
            step4:new Step4([node0,node1]),
            step4node1:0
        }
    },
    methods:{
        checkPickHover4(pickid, hoverid) {
            if (pickid.split('-')[0] == 'scissors' && hoverid.split('-')[0] == 'needle_full_glue') {
                var mesh = this.scene.getMeshByID(hoverid);
                var po = this.getMergedPosition(hoverid);
                this.scene.removeMesh(mesh);
                var index = this.needlelist.indexOf(hoverid);
                //删除
                {
                    this.needlelist.splice(index, 1)
                    delete(this.needleprops[hoverid])
                }
                this.activeIndex = 'default';
                this.addModel('yellow_cylinder', new BABYLON.Vector3(0.08, 0.08, 0.08), new BABYLON.Vector3(-po[0], po[1], po[2]), new BABYLON.Vector3(0, Math.PI / 2, 0), ['PointerDragBehavior'], null);
            } else if (pickid.split('-')[0] == 'glass_pad' && hoverid.split('-')[0] == 'yellow_cylinder') {
                var mesh = this.scene.getMeshByID(hoverid);
                var po = mesh.position;
                mesh.removeBehavior(mesh.behaviors[0]);
                this.scene.removeMesh(this.scene.getMeshByID(pickid));
                this.addModel('glass_pad', new BABYLON.Vector3(0.01, 0.01, 0.01), new BABYLON.Vector3(po.x - 0.07, po.y, po.z), null, null, 'g1');
                this.addModel('glass_pad', new BABYLON.Vector3(0.01, 0.01, 0.01), new BABYLON.Vector3(po.x + 0.05, po.y, po.z), null, null, 'g2');
                this.addModel('glass_pad', new BABYLON.Vector3(0.01, 0.01, 0.01), new BABYLON.Vector3(po.x - 0.07, po.y + 0.02, po.z), null, null, 'g3');
                this.addModel('glass_pad', new BABYLON.Vector3(0.01, 0.01, 0.01), new BABYLON.Vector3(po.x + 0.05, po.y + 0.02, po.z), null, null, 'g4');
                setTimeout(() => {
                    var mesh = BABYLON.Mesh.MergeMeshes(
                        [this.scene.getMeshByID('g1'), this.scene.getMeshByID('g2'),
                            this.scene.getMeshByID('g3'), this.scene.getMeshByID('g4'), this.scene.getMeshByID(hoverid)
                        ],
                        true,
                        true,
                        undefined,
                        false,
                        true
                    );
                    mesh.id = 'glass_pad_yellow_cylinder';
                    mesh.id = this.addName(mesh.id);
                    mesh.addBehavior(
                        new BABYLON.PointerDragBehavior({
                            dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                        })
                    );
                }, 500);
            } else if (hoverid.split('-')[0] == "trash_can") {
                this.scene.removeMesh(this.scene.getMeshByID(pickid));
                if (this.weightlist.indexOf(pickid) != -1) {
                    var index = this.weightlist.indexOf(pickid);
                    //删除
                    {
                        this.weightlist.splice(index, 1)
                        delete(this.weightprops[pickid])
                    }
                } else if (this.measuring_cylinderlist.indexOf(pickid) != -1) {
                    var index = this.measuring_cylinderlist.indexOf(pickid);
                    //删除
                    {
                        this.measuring_cylinderlist.splice(index, 1)
                        delete(this.measuring_cylinderprops[pickid])
                    }
                } else if (this.needlelist.indexOf(pickid) != -1) {
                    var index = this.needlelist.indexOf(pickid);
                    //删除
                    {
                        this.needlelist.splice(index, 1)
                        delete(this.needleprops[pickid])
                    }
                } else if (pickid.split('-')[0] == 'clock') {
                    this.hasClock = false;
                } else if (this.liquid_transferorlist.indexOf(pickid) != -1) {
                    var index = this.liquid_transferorlist.indexOf(pickid);
                    //删除
                    {
                        this.liquid_transferorlist.splice(index, 1)
                        delete(this.liquid_transferorprops[pickid])
                    }
                }
                setTimeout(() => {
                    for (var i = 0; i < this.weightlist.length; i++) {
                        var re = this.weightprops[this.weightlist[i]][0]
                        this.$refs.weight[i].setAllNumber(re[0], re[1], re[2], re[3], re[4], re[5], this.weightlist[i]);
                    }
                    if (this.weightlist.length != 0) this.activeIndex = this.weightlist[this.weightlist.length - 1];
                    else if (this.measuring_cylinderlist.length != 0) this.activeIndex = this.measuring_cylinderlist[this.measuring_cylinderlist.length - 1]
                    else if (this.needlelist.length != 0) this.activeIndex = this.needlelist[this.needlelist.length - 1]
                    else if (this.liquid_transferorlist.length != 0) this.activeIndex = this.liquid_transferorlist[this.liquid_transferorlist.length - 1]
                    else if (this.e1 == 3) this.activeIndex = 'heater';
                    else this.activeIndex = 'default'
                }, 200);
            }
        },
        getScore_step4() {
            this.all_score = this.step4.all_score;
            this.step4.setStepNeed(this.scene,this.stretched);
            var node = this.step4.checkAllNodeScore();
            if (node != null) {
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message: '<strong><span style="color:black;">' +
                        node.successtext +
                        "</span>&emsp;" +
                        '<span style="color: teal">得分+1</span></strong>',
                    type: "success"
                });
                this.now_score = this.step4.getNowScore();
            }
            if (this.step4node1 == 0 && this.step4.node_array[1].score == 1) {
                this.step4node1 = 1;
                setTimeout(() => {
                    this.$notify({
                        title: 'Completed',
                        message: '你已经完成了第四步——鉴定表征',
                        type: 'warning'
                    });
                }, 1000);
            }
        },
    }
}
export default step4Function