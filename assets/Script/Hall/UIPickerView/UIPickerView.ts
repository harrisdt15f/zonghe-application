
// import AtOncePanel from '../Withdraw/AtOncePanel';
import { G_Utils } from '../../Tool/Utils';


const {ccclass, property} = cc._decorator;

@ccclass
export default class UIPickerView extends cc.Component {
    private pickView : cc.Node = null;
    private done : boolean = false;
    private open : boolean = false;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var back = this.node.getChildByName("back")
        this.pickView = this.node.getChildByName("pickView")
        let panel = this.pickView.getChildByName("panel")
        let btn = panel.getChildByName("btn")
        let qx = btn.getChildByName("qx")
        let qd = btn.getChildByName("qd")

        G_Utils.onClickEnd(back, this.onClose, this)
        G_Utils.onClickEnd(qx, this.onClose, this)
        G_Utils.onClickEnd(qd, this.onOK, this)
     
        this.pickView.y = -400;
    }

    start () {

    }

    onEnable(){
        this.show()
    }

    // update (dt) {}
    onClose(){
        this.show()
    }

    onOK(){
        this.show()
    }

    show(){
        if(this.done)
            return;
        this.done = true;
        this.open = !this.open;
        var callEnd = cc.callFunc(function(){
            this.done = false;
            if(!this.open)
                this.node.active = false;
        }, this)
        var y = this.open ? 0 : -400
        var move = cc.moveTo(0.2, cc.v2(0, y))
        var seq = cc.sequence(move, callEnd)
        this.pickView.runAction(seq)
    }


}
