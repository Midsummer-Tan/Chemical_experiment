class Node{
    score = 0;
    errortext = ''
    successtext = "";
    id = 0;
    electronicScaleQuality=[];
    scene=null;
    constructor(id){
        this.id = id;
    }
    setNodeNeed(scene, electronicScaleQuality){
        this.scene = scene;
        this.electronicScaleQuality = electronicScaleQuality;
    }//node节点需要ExperimengtB中的哪些东西
    setScore(score){
        this.score = score;
    }
    getScore(){
        //该方法是判断你有没有得到1分的条件
    }
}
class Node0 extends Node{
    errortext = '你未调零';
    successtext = "调零";
    getScore(){
        if (this.scene.getMeshByID('round_flask.Cone') == null && this.scene.getMeshByID("tri_flask.powder_brown")==null && this.scene.getMeshByID('weight.paper') != null && this.electronicScaleQuality.toString() == [null, null, 0, 0, 0, 0].toString())
        {
            this.setScore(1);
            return 1;
        }
        else return 0;
    }
}
class Node1 extends Node{
    errortext = '你未称量硫辛酸药品';
    successtext = '称量硫辛酸药品';
    getScore(){
        if(this.scene.getMeshByID('weight.paper_Cone')!=null){
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node2 extends Node{
    errortext = '硫辛酸药品未到5.000g';
    successtext = '量取5.000g硫辛酸药品';
    getScore(){
        if (this.scene.getMeshByID('weight.paper_Cone') != null && this.electronicScaleQuality.toString() == [null,null,5,0,0,0]){
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node3 extends Node{
    errortext = '没有将硫辛酸药品倒入10ml烧瓶中';
    successtext = '将硫辛酸药品倒入10ml烧瓶中';
    getScore(){
        if(this.scene.getMeshByID('round_flask.Cone')!=null){
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node4 extends Node{
    errortext = '你未调零';
    successtext = '调零';
    getScore(){
        if (this.scene.getMeshByID('weight.paper') != null && this.electronicScaleQuality.toString() == [null, null, 0, 0, 0, 0].toString()) {
            if (this.scene.getMeshByID('round_flask.Cone') != null && this.scene.getMeshByID('tri_flask.powder_brown') == null){
                this.setScore(1);
                return 1;
            }
            else if (this.scene.getMeshByID('round_flask.Cone') == null && this.scene.getMeshByID('tri_flask.powder_brown') != null) {
               this.setScore(1);
               return 1;
            }
            else return 0;
            
        }
        return 0;
    }
}
class Node5 extends Node{
    errortext = '没有用药匙取出三氯化铁药品并放于称量纸上';
    successtext = '量取三氯化铁药品并称量';
    getScore(){
        if (this.scene.getMeshByID('weight.paper_powder_brown')!=null){
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node6 extends Node{
    errortext = '三氯化铁质量未达到0.100g';
    successtext = '三氯化铁质量达到0.100g';
    getScore(){
        if (this.scene.getMeshByID('weight.paper_powder_brown') != null && this.electronicScaleQuality.toString() == [null, null, 0, 1, 0, 0]){
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Node7 extends Node{
    errortext = '未将三氯化铁药品放入25ml锥形瓶中';
    successtext = '将三氯化铁药品放入25ml锥形瓶中';
    getScore(){
        if (this.scene.getMeshByID('tri_flask.powder_brown')!=null){
            this.setScore(1);
            return 1;
        }
        return 0;
    }
}
class Step1{
    // textarray = ['你未调零', '你未称量硫辛酸药品'
    //     , '硫辛酸药品未到5.000g', '没有将硫辛酸药品倒入10ml烧瓶中',
    //     '称量氯化铁之前未调零', '没有用药匙取出三氯化铁药品并放于称量纸上',
    //     '三氯化铁质量未达到0.100g', '三氯化铁药品未放入25ml锥形瓶中', '未用滴管量取丙酮并放入25ml锥形瓶中',
    //     '丙酮液面未达到量筒的14ml刻度处', '未将丙酮与三氯化铁混合', '没有左右震荡丙酮与三氯化铁混合溶液',
    //     '未用塑料薄膜将锥形瓶口封口', '未用针管吸取DIB交联剂', 'DIB试剂并未达到针管的0.35ml刻度处'];
    all_score = 15;//总分
    current_score=0;//目前得分
    node_array = [];
    scene=null;
    electronicScaleQuality=[];
    constructor(allnode){
        for(var i=0;i<allnode.length;i++){
            this.node_array.push(allnode[i]);
        }
        
    }
    setStepNeed(scene,electronicScaleQuality){
        for (var i = 0; i < this.node_array.length; i++) {
            this.node_array[i].setNodeNeed(scene, electronicScaleQuality);
        }
    }
    checkAllNodeScore(){
        for (var i = 0; i < this.node_array.length; i++) {
            if (this.node_array[i].score == 0 && this.node_array[i].getScore()) {
                return this.node_array[i];
            }
        }
        return null;
    }
    getAllNodeErrorText(){
        //遍历得到现在没有得分步骤的错误提示
        var textarray = [];
        for (var i = 0; i < this.node_array.length; i++) {
            console.log(this.node_array[i])
            // if (this.node_array[i].score==0){
            //     console.log(this.node_array[i].errortext)
            //     textarray.push(this.node_array[i].errortext);
            // }
        }
        return textarray;
    }
    getNowScore(){
        var sum1 = 0;
        for (var i = 0; i < this.node_array.length; i++) {
            sum1+=this.node_array[i].score;
        }
        return sum1;
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
var step1 = new Step1([node0,node1,node2,node3,node4,node5,node6,node7]); 

export {
    step1
}