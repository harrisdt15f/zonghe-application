

const {ccclass, property} = cc._decorator;
import { RewardType } from "../../Config/config";
import { G_Utils } from '../../Tool/Utils';

const rewardList ={
    [0]:{
        [RewardType.iphone]:0
    },
    [1]:{
        [RewardType.gold]:1
    },
    [2]:{
        [RewardType.none]:0
    },
    [3]:{
        [RewardType.gold]:99
    },
    [4]:{
        [RewardType.macbook]:0
    },
    [5]:{
        [RewardType.gold]:8
    },
    [6]:{
        [RewardType.gold]:8888
    },
    [7]:{
        [RewardType.iwatch]:0
    },
    [8]:{
        [RewardType.gold]:588
    },
    [9]:{
        [RewardType.car]:0
    },

}

enum animationType{
    rotate =0,
    trailing = 1,
}

@ccclass
export default class RouletteBox extends cc.Component {

    @property({
        type : cc.Enum(animationType),
        tooltip:"动作类型： rotate:旋转动画 trailing:拖尾动画"
    })
    actionType = animationType.rotate;


    @property(cc.Node)
    btnStart : cc.Node = null;

    @property(cc.Node)
    btnClose : cc.Node = null;

    @property(cc.Node)
    gainNode : cc.Node = null;

    
    @property(cc.Node)
    dial : cc.Node = null;

    @property(cc.Node)
    pointer : cc.Node = null;

    @property(cc.Node)
    dialTrailing : cc.Node = null;
 
    private inMotion : boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        G_Utils.onClickEnd(this.btnClose, this.onClose, this)
        G_Utils.onClickEnd(this.btnStart, this.onStart, this)
    }

    start () {

    }

    // update (dt) {}

    onEnable(){
        this.pointer.active = this.actionType == animationType.rotate;
        this.dialTrailing.active = this.actionType == animationType.trailing;
        if(this.actionType == animationType.trailing)
            this.trailingInit()
    }

    onStart(){
        if(this.inMotion){
            return;
        }
        this.inMotion = true;
        this.btnStart.getComponent(cc.Button).interactable = false

        var target : number = G_Utils.random(0,9)
        switch (this.actionType) {
            case animationType.rotate:
                this.rotateAnimation(target)
                break;
            case animationType.trailing:
                this.trailingAnimation(target)
                break;
            default:
                break;
        }
 
    }

    onDestroy(){
        this.btnStart.off(cc.Node.EventType.TOUCH_END, this.onStart,this);
        this.btnClose.off(cc.Node.EventType.TOUCH_END, this.onClose,this);
    }

    onClose(){
        this.node.active = false;
    }


    trailingInit(){
        if(!this.dialTrailing || this.dialTrailing.children.length <= 0)
            return;

        this.dialTrailing.children.forEach(function(item, idx){
            item.opacity = 0;
        },this)
        this.dialTrailing.children[0].opacity = 255
    }
    /**
     * 拖尾光效动画
     * 
     */
    trailingAnimation(targetNum : number){
        this.trailingInit();
        var condition = 6
        var tiemCont = 0
        while (condition) {
            var tempIdx = 0
            var tempNum = condition == 1 ? targetNum : 9
            for (let index = 0; index <= tempNum; index++) {
                tempIdx = index % 10
                var dTime = (tiemCont / 10) ;
                // console.log("间隔时间》》",dTime)
                if(condition == 1 && targetNum  == index){
                    cc.tween(this.dialTrailing.children[tempIdx])
                    .delay(dTime)
                    .to(0 ,{opacity : 255})
                    .then(cc.blink(1, 6))
                    .call(function(){
                        var data = rewardList[ targetNum ]
                        this.prizeShow(data)
                    }.bind(this))
                    .start()
                }else{
                    cc.tween(this.dialTrailing.children[tempIdx])
                    .delay(dTime)
                    .to(0 ,{opacity : 255})
                    .to(0.4,{opacity : 0})
                    .start()
                }
                tiemCont++
            }
            condition--
        }
    }

    private tempAngle : number = 0;
    /**
     * 旋转动画
     */
    rotateAnimation(targetNum : number){
        var targetRotate : number = 36 * targetNum;
        var rotateCount : number = 30 * 360
        var targetAngle : number = targetRotate + rotateCount;
        if(this.tempAngle)
            targetAngle = targetAngle - this.tempAngle

        cc.tween(this.dial)
        .then( cc.rotateBy(6,targetAngle).easing(cc.easeOut(8)) )
        .call(function(){
            var data : any = rewardList[ 10 - targetNum ]
            this.prizeShow(data)
            this.tempAngle = targetRotate
        }.bind(this))
        .start()
    
    }

    prizeShow(targetData : any){
        this.btnStart.getComponent(cc.Button).interactable = true;
        this.inMotion = false;
        this.gainNode.active = true;
        this.gainNode.getComponent("GainNode").openGain(targetData)
    }

}
