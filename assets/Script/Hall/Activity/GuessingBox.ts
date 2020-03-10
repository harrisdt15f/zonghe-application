import { G_Utils } from '../../Tool/Utils';

const {ccclass, property} = cc._decorator;

@ccclass
export default class GuessingBox extends cc.Component {

    
    @property(cc.Node)
    openGuessing : cc.Node = null;
    
    private clickFlag = false;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let peanl = this.node.getChildByName("peanl")
        let hbNode = peanl.getChildByName("hbNode")
        
        for (let index = 0; index < hbNode.children.length; index++) {
            let piece = hbNode.children[index]
            G_Utils.onClickEnd(piece, this.onClickHB, this)
        }

        let blueBg = this.node.getChildByName("blueBg")
        let btnClose = blueBg.getChildByName("btnClose")
        G_Utils.onClickEnd(btnClose, this.onClose, this)
    }

    start () {

    }

    // update (dt) {}

    onClickHB(event){
        if (this.clickFlag){
            return;
        }
        this.clickFlag = true;
        let item = event.target
        var scaleTo = cc.scaleTo(0.5, 0, 1.1);
        var skewBy = cc.skewBy(0.5, 0, -40)
        var spawn = cc.spawn(skewBy, scaleTo)
        //var tt = cc.sequence(cc.rotateBy(0,0,-180),cc.rotateBy(0.5,0,90));
        var func = cc.callFunc(function(){
            item.scaleY = 1
            item.scaleX = 1
            this.clickFlag = false;
        },this)
        var action = cc.sequence(spawn, func, cc.skewBy(0, 0, -140),cc.callFunc(function(){
            this.openGuessing.active = true;
            this.node.active = false;
        },this))
        item.runAction(action);

    }

    onClose(){
        this.node.active = false;
    }
}
