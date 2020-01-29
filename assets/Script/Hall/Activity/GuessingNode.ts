import { G_Utils } from '../../Tool/Utils';


const {ccclass, property} = cc._decorator;

@ccclass
export default class GuessingNode extends cc.Component {

    @property(cc.Node)
    guessingBox : cc.Node = null;

    @property(cc.Node)
    btnLkcy : cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        G_Utils.onClickEnd(this.btnLkcy, this.onCanyu, this)
    }

    start () {

    }
    
    onDestroy(){
    }

    // update (dt) {}
    onCanyu(){
        this.guessingBox.active = true;
    }




}
