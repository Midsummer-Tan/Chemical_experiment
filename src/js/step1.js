class Node{
    static textarray = ['', '你未调零', '你未调零','你未用药匙取硫辛酸药品'
    ,'硫辛酸药品未到5.000g','没有将硫辛酸药品倒入10ml烧瓶中',
    '未进行第二次调零','未进行第二次调零','没有用药匙取出三氯化铁药品并放于称量纸上',
    '三氯化铁质量未达到0.100g','三氯化铁药品未放入25ml锥形瓶中','未用滴管量取丙酮并放入25ml锥形瓶中',
    '丙酮液面未达到量筒的14ml刻度处','未将丙酮与三氯化铁混合','没有左右震荡丙酮与三氯化铁混合溶液',
    '未用塑料薄膜将锥形瓶口封口','未用针管吸取DIB交联剂','DIB试剂并未达到针管的0.35ml刻度处'];
    score = 0;
    text = "";
    id = 0;
    constructor(id){
        this.id = id;
    }
    setText(id){
        this.text = textarray[id];
        //你没有做到。。。。
    }
}
var newNode = new Node();
class Step1_1{
    all_score = 2;
    separate_score = [0,0];

}
var newStep1_1 = new Step1_1(); 
export {
    newNode,newStep1_1
}