import { G_Utils } from '../../Tool/Utils';


const {ccclass, property} = cc._decorator;

@ccclass
export default class RouletteNode extends cc.Component {

    @property(cc.Node)
    btnlkcy : cc.Node = null;

    @property(cc.Node)
    rouletteBox : cc.Node = null;

    @property(cc.Node)
    pic:cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        G_Utils.onClickEnd(this.btnlkcy, this.onlkcy, this)
        G_Utils.onClickEnd(this.pic, this.onlkcy, this)
    }

    start () {

    }

    onEnable(){
      
    }

    onlkcy(){
        this.rouletteBox.active = true;
    }


}
