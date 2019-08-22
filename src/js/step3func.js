class Node {
    score = 0;
    errortext = ''
    successtext = "";
    id = 0;
    scene = null;
    needleprops = {};
    heater_temp_value=0;
    temp_stable=0;
    step3node1 = 0;
    heater_temp_switch=false;
    heater_stir_switch=false;
    heater_stir_value = 0;
    step3node3 = 0;
    step3node4 = 0;
    liquid_transferorprops={};
    correct_use_transferor=[0,0];
    step3node8=0;
    constructor(id) {
        this.id = id;
    }
    setNodeNeed(scene, needleprops, heater_temp_value, temp_stable, step3node1, heater_temp_switch, heater_stir_switch, step3node3, heater_stir_value, step3node4
        , liquid_transferorprops, correct_use_transferor, step3node8) {
        this.scene = scene;
        this.needleprops = needleprops;
        this.heater_temp_value = heater_temp_value;
        this.temp_stable = temp_stable
        this.step3node1 = step3node1;
        this.heater_temp_switch = heater_temp_switch;
        this.heater_stir_switch = heater_stir_switch;
        this.heater_stir_value = heater_stir_value;
        this.step3node3 = step3node3;
        this.step3node4 = step3node4;
        this.liquid_transferorprops = liquid_transferorprops;
        this.correct_use_transferor = correct_use_transferor;
        this.step3node8 = step3node8;
    } //node节点需要ExperimengtB中的哪些东西
    setScore(score) {
        this.score = score;
    }
    getScore() {
        //该方法是判断你有没有得到1分的条件
    }
}
class Node0 extends Node {
    errortext = '未将磁力搅拌器温度调至120-160℃';
    successtext = "将磁力搅拌器温度调至120-160℃";
    getScore() {
        if (this.heater_temp_switch == true && this.temp_stable == 1) {
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node1 extends Node {
    errortext = '未在硫辛酸完全熔融后用镊子加入小磁子';
    successtext = '在硫辛酸完全熔融后用镊子加入小磁子';
    getScore() {
        //有完全熔融的硫辛酸 没有cone 有小磁子加入到硫辛酸中
        if (this.step3node1==1) {
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node2 extends Node {
    //有小磁子 有转速 开关打开
    errortext = '未调节磁力搅拌器转速';
    successtext = '调节磁力搅拌器转速';
    getScore() {
       
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-')[0] == 'magneton_stiring' && this.heater_stir_switch==true &&
                this.heater_stir_value>0) {
                this.setScore(1);
                return 1;
            }
        }
        return 0;
    }
}
class Node3 extends Node {
    errortext = '未将dib注射入反应烧瓶';
    successtext = '将dib注射入反应烧瓶';
    getScore() {
        if(this.step3node3==1){
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node4 extends Node {
    errortext = '没有在5分钟后将三氯化铁丙酮溶液挤入反应烧瓶中';
    successtext = '5分钟后将三氯化铁丙酮溶液挤入反应烧瓶中';
    getScore() {
        if (this.step3node3 == 1 && this.step3node4 == 1) {
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node5 extends Node {
    errortext = '未将移液枪量程调至20微升';
    successtext = '将移液枪量程调至20微升';
    in = 0;
    getScore() {
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-')[0] == 'liquid_transferor' && this.liquid_transferorprops[this.scene.meshes[i].id] != undefined && this.liquid_transferorprops[this.scene.meshes[i].id][1] == 20 && this.in == 0) {
                this.in = 2;
                setTimeout(() => {
                    this.in = 0;
                    for (var j = 0; j < this.scene.meshes.length; j++) {
                        if (this.scene.meshes[j].id.split('-')[0] == 'liquid_transferor' && this.liquid_transferorprops[this.scene.meshes[j].id][1]==20) {
                            this.in = 1;
                        }
                    }
                }, 500);
            }
        }
        if (this.in == 1) {
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node6 extends Node {
    errortext = '未能正确使用移液枪';
    successtext = '正确使用移液枪';
    getScore() {
        if (this.correct_use_transferor[0] == 1 && this.correct_use_transferor[1]==1)
        {
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node7 extends Node {
    errortext = '未关闭磁力搅拌器';
    successtext = '关闭磁力搅拌器';
    getScore() {
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('round_flask_c8h14o2s2') && this.heater_temp_switch==false) {
                this.setScore(1);
                return 1;
            }
        }
        return 0;
    }
}
class Node8 extends Node {
    errortext = '未用针管吸取反应烧瓶中产物';
    successtext = '用针管吸取反应烧瓶中产物';
    getScore() {
        if(this.step3node8==1){
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node9 extends Node {
    errortext = '未将装有产物的针管静置在锥形瓶中';
    successtext = '将装有产物的针管静置在锥形瓶中';
    getScore() {
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].id.split('-').includes('needle_full.tri_flask') || this.scene.meshes[i].id.split('-').includes('needle_full.cap.tri_flask')) {
                this.setScore(1);
                return 1;
            }
        }
        return 0;
    }
}
class Step3 {
    all_score = 10; //总分
    current_score = 0; //目前得分
    scene = null;
    node_array = [];
    hasNeedleFullTriFlask=0;
    constructor(allnode) {
        for (var i = 0; i < allnode.length; i++) {
            this.node_array.push(allnode[i]);
        }
    }
    setStepNeed(scene, needleprops, heater_temp_value, temp_stable, step3node1, heater_temp_switch, heater_stir_switch, step3node3, heater_stir_value, step3node4
        , liquid_transferorprops, correct_use_transferor, step3node8) {
        this.scene = scene;
        for (var i = 0; i < this.node_array.length; i++) {
            this.node_array[i].setNodeNeed(scene, needleprops, heater_temp_value, temp_stable, step3node1,
                 heater_temp_switch, heater_stir_switch, step3node3, heater_stir_value, step3node4,
                 liquid_transferorprops, correct_use_transferor, step3node8);
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
            if (this.hasNeedleFullTriFlask== 0 && this.scene.meshes[i].id.split('-').includes('needle_full.tri_flask') || this.scene.meshes[i].id.split('-').includes('needle_full.cap.tri_flask')) {
                this.hasNeedleFullTriFlask = 1;
                return 1;
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
const step3Function = {
    data(){
        return {
            step3:new Step3([node0,node1,node2,node3,node4,node5,node6,node7,node8,node9]),
            step3node9:0,
            
            step3node1:0,
            step3node3:0,
            step3node4:0,
            step3node8:0,
            dib_in_flask_5min:0,
        }
    },
    methods:{
        checkPickHover3(pickid, hoverid) {
            if (pickid.split('-')[0] == 'magneton.tweezer' && hoverid.split('-')[0] == 'round_flask_c8h14o2s2') {
                this.step3node1 = 1;
                for (var i = 0; i < this.scene.meshes.length; i++) {
                    if (this.scene.meshes[i].id == 'conedel') {
                        this.step3node1 = 0;
                    }
                }
                var po = this.getMergedPosition(pickid);
                this.scene.removeMesh(this.scene.getMeshByID(pickid));
                this.addModel('tweezer', new BABYLON.Vector3(0.03, 0.03, 0.03), new BABYLON.Vector3(-po[0], po[1], po[2]), null, ['PointerDragBehavior'], null);
                var id1 = this.addMagneton();
                this.scene.getMeshByID(id1).position = new BABYLON.Vector3(-0.5, 0.12, -0.33);
                var CoR_At = new BABYLON.Vector3(-0.5, 0.12, -0.3);
                var start_po = new BABYLON.Vector3(-0.5, 0.12, -0.33);
                var translate = start_po.subtract(CoR_At);
                this.scene.getMeshByID(id1).setPivotMatrix(BABYLON.Matrix.Translation(translate.x, translate.y, translate.z));
                this.scene.getMeshByID(id1).id = 'magneton_stiring'
                this.scene.getMeshByID('magneton_stiring').id = this.addName('magneton_stiring')
            } else if (pickid.split('-')[0] == 'cap' && hoverid.split('-')[0] == 'needle_full') {
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
            } else if (pickid.split('-')[0] == 'needle_full' && hoverid.split('-')[0] == 'round_flask_c8h14o2s2') {
                this.step3node3 = 1;
                setTimeout(() => {
                    this.dib_in_flask_5min = 1;
                }, 60000*5);
                var po = this.getMergedPosition(pickid);
                this.scene.removeMesh(this.scene.getMeshByID(pickid))
                this.addModel('needle', new BABYLON.Vector3(1.2, 1.2, 1.2), new BABYLON.Vector3(po[0], po[1] + 0.3, po[2]), new BABYLON.Vector3(0, 0, Math.PI), ['PointerDragBehavior'], 'needle');
                setTimeout(() => {
                    var mesh = this.scene.getMeshByID('needle');
                    mesh.id = this.addName(mesh.id);
                    this.needlelist[this.needlelist.indexOf(pickid)] = mesh.id;
                    this.needleprops[mesh.id] = this.needleprops[pickid]
                    this.needleprops[mesh.id][0] = 0;
                    delete(this.needleprops[pickid])
                    this.activeIndex = mesh.id;
                    this.refreshComponents()
                }, 500);
            } else if (pickid.split('-')[0] == 'needle' && hoverid.split('-')[0] == 'round_flask_c8h14o2s2') {
                this.step3node8 = 1;
                var po = this.getMergedPosition(pickid);
                this.scene.removeMesh(this.scene.getMeshByID(pickid))
                this.addModel('needle_full', new BABYLON.Vector3(1.2, 1.2, 1.2), new BABYLON.Vector3(po[0], po[1] + 0.3, po[2]), new BABYLON.Vector3(0, 0, Math.PI), ['PointerDragBehavior'], 'needle_full');
                var po1 = this.getMergedPosition(hoverid);
                this.scene.removeMesh(this.scene.getMeshByID(hoverid))
                this.addModel('round_flask', null, new BABYLON.Vector3(-po1[0]+0.03, po1[1]-0.05, po1[2]-0.08), null, null, null);                
                setTimeout(() => {
                    var mesh = this.scene.getMeshByID('needle_full');
                    mesh.id = this.addName(mesh.id);
                    this.needlelist[this.needlelist.indexOf(pickid)] = mesh.id;
                    this.needleprops[mesh.id] = this.needleprops[pickid]
                    this.needleprops[mesh.id][0] = 1;
                    delete(this.needleprops[pickid])
                    this.activeIndex = mesh.id;
                    this.refreshComponents()
                }, 500);
            } else if (pickid.split('-')[0] == 'film' && hoverid.split('-')[0] == 'tri_flask_full_fecl3') {
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
                mesh.id = 'tri_flask_full_fecl3.film';
                mesh.id = this.addName(mesh.id);
                mesh.addBehavior(
                    new BABYLON.PointerDragBehavior({
                        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                    })
                );
            } else if (pickid.split('-')[0] == 'liquid_transferor' && hoverid.split('-')[0] == 'tri_flask_full_fecl3' && this.liquid_transferorprops[pickid][0] == 0) {
                this.liquid_transferorprops[pickid][2] = false; //按钮取消禁用
                this.liquid_transferorprops[pickid][3] = hoverid;
                this.refreshComponents();
                this.scene.getMeshByID(pickid).removeBehavior(this.scene.getMeshByID(pickid).behaviors[0]);
                this.scene.getMeshByID(hoverid).removeBehavior(this.scene.getMeshByID(hoverid).behaviors[0]);
                //不挤出液体就不让这两个物体移动
            } else if (pickid.split('-')[0] == 'liquid_transferor' && hoverid.split('-')[0] == 'round_flask_c8h14o2s2' && this.liquid_transferorprops[pickid][0] != 0) {
                this.liquid_transferorprops[pickid][2] = false;
                this.liquid_transferorprops[pickid][3] = hoverid;
                this.refreshComponents();
                this.scene.getMeshByID(pickid).removeBehavior(this.scene.getMeshByID(pickid).behaviors[0]);
            } else if (pickid.split('-')[0] == 'needle_full' && hoverid.split('-')[0] == 'tri_flask') {
                var po = this.scene.getMeshByID(hoverid).position;
                this.scene.getMeshByID(pickid).position = new BABYLON.Vector3(-po.x, po.y + 0.01, po.z);
                this.scene.getMeshByID(pickid).rotation.z += 5 * Math.PI / 6;
                var mesh = BABYLON.Mesh.MergeMeshes(
                    [this.scene.getMeshByID(pickid), this.scene.getMeshByID(hoverid)],
                    true,
                    true,
                    undefined,
                    false,
                    true
                );
                mesh.id = 'needle_full.tri_flask';
                mesh.id = this.addName(mesh.id);
                var index = this.needlelist.indexOf(pickid);
                //删除
                {
                    this.needlelist.splice(index, 1)
                    delete(this.needleprops[pickid])
                    this.activeIndex = 'default';
                }
                mesh.addBehavior(
                    new BABYLON.PointerDragBehavior({
                        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                    })
                );
            } else if (pickid.split('-')[0] == 'needle_full.cap' && hoverid.split('-')[0] == 'tri_flask') {
                var po = this.scene.getMeshByID(hoverid).position;
                this.scene.getMeshByID(pickid).position = new BABYLON.Vector3(-po.x, po.y + 0.15, po.z);
                this.scene.getMeshByID(pickid).rotation.z += 5 * Math.PI / 6;
                var index = this.needlelist.indexOf(pickid);
                //删除
                {
                    this.needlelist.splice(index, 1)
                    delete(this.needleprops[pickid])
                    this.activeIndex = 'default';
                }
                var mesh = BABYLON.Mesh.MergeMeshes(
                    [this.scene.getMeshByID(pickid), this.scene.getMeshByID(hoverid)],
                    true,
                    true,
                    undefined,
                    false,
                    true
                );
                mesh.id = 'needle_full.cap.tri_flask';
                mesh.id = this.addName(mesh.id);
                mesh.addBehavior(
                    new BABYLON.PointerDragBehavior({
                        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                    })
                );
            } else if (pickid.split('-')[0] == 'tweezer' && hoverid.split('-')[0] == 'magneton') {
                var po = this.scene.getMeshByID(pickid).position;
                this.scene.getMeshByID(hoverid).position = new BABYLON.Vector3(-po.x,po.y,po.z);
                var mesh = BABYLON.Mesh.MergeMeshes(
                    [this.scene.getMeshByID(pickid), this.scene.getMeshByID(hoverid)],
                    true,
                    true,
                    undefined,
                    false,
                    true
                );
                mesh.id = 'magneton.tweezer';
                mesh.id = this.addName(mesh.id);
                mesh.addBehavior(
                    new BABYLON.PointerDragBehavior({
                        dragPlaneNormal: new BABYLON.Vector3(0, 1, 0)
                    })
                );
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
        getScore_step3() {
            this.all_score = this.step3.all_score;
            this.step3.setStepNeed(this.scene, this.needleprops, this.heater_temp_value, this.temp_stable, this.step3node1, 
                this.heater_temp_switch, this.heater_stir_switch, this.step3node3, this.heater_stir_value, 
                this.step3node4, this.liquid_transferorprops, this.correct_use_transferor, this.step3node8
                );
            var node = this.step3.checkAllNodeScore();
            if (node != null) {
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message: '<strong><span style="color:black;">' +
                        node.successtext +
                        "</span>&emsp;" +
                        '<span style="color: teal">得分+1</span></strong>',
                    type: "success"
                });
                this.now_score = this.step3.getNowScore();
            }
            if (this.step3node9 == 0 && this.step3.node_array[9].score == 1) {
                this.step3node9 = 1;
                setTimeout(() => {
                    this.$notify({
                        title: 'Completed',
                        message: '你已经完成了第三步——聚合物合成',
                        type: 'warning'
                    });
                }, 1000);
            }
            if(this.step3.unlockTools()){
                var message = '<strong><span style="color:black;">' +
                    '恭喜你！得到了新工具' +
                    "</span>&emsp;" +
                    '<span style="color: teal">' +
                    '装有胶黏生成物针管的锥形瓶' +
                    '</span></strong>';
                this.show4 = true;
                setTimeout(() => {
                    this.$message({
                        dangerouslyUseHTMLString: true,
                        message: message,
                        type: "warning"
                    });
                }, 500);
            }
        },
    }
}
export default step3Function