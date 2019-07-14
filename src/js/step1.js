class Node{
    score = 0;
    text = "";
    id = 0;
    constructor(id){
        this.id = id;
    }
    setText(str){
        this.text = str;
        //你没有做到。。。。
    }
    setScore(score){
        this.score = score;
    }
    getScore(){
    }
}
class Node0 extends Node{
    getScore(){
        
    }
}
class Step1{
    textarray = ['你未调零', '你未用药匙取硫辛酸药品'
        , '硫辛酸药品未到5.000g', '没有将硫辛酸药品倒入10ml烧瓶中',
        '未进行第二次调零', '没有用药匙取出三氯化铁药品并放于称量纸上',
        '三氯化铁质量未达到0.100g', '三氯化铁药品未放入25ml锥形瓶中', '未用滴管量取丙酮并放入25ml锥形瓶中',
        '丙酮液面未达到量筒的14ml刻度处', '未将丙酮与三氯化铁混合', '没有左右震荡丙酮与三氯化铁混合溶液',
        '未用塑料薄膜将锥形瓶口封口', '未用针管吸取DIB交联剂', 'DIB试剂并未达到针管的0.35ml刻度处'];
    all_score = 0;//总分
    current_score=0;//目前得分
    node_array = [];
    constructor(all_score){
        this.all_score = all_score;
    }
}
var step1 = new Step1(15); 

export {
    step1
}