import { G_Utils } from "../../Tool/Utils";
import { RewardType } from "../../Config/config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GainNode extends cc.Component {

    @property(cc.Node)
    bx : cc.Node = null;

    @property(cc.Node)
    xczj : cc.Node = null;
    
    @property(cc.Node)
    gxhd : cc.Node = null;

    @property(cc.Node)
    iphone : cc.Node = null;
    
    @property(cc.Node)
    iwatch : cc.Node = null;
    
    @property(cc.Node)
    macbook : cc.Node = null;

    @property(cc.Node)
    car : cc.Node = null;

    @property(cc.Node)
    gold : cc.Node = null;


    @property(cc.Node)
    bgs:cc.Node = null;

    private _dt : number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        G_Utils.onClickEnd(this.bgs, this.onClose, this)
    }

    

    start () {

    }

    onEnable(){
        this._dt = 0;
        // this.bx.active = false;
        this.xczj.active = false;
        this.gxhd.active = false;
        this.iphone.active = false;
        this.iwatch.active = false;
        this.macbook.active = false;
        this.car.active = false;
        this.gold.active = false;
    }

    update (dt) {
        this._dt += dt;
        if (this._dt >= 4){
            this.node.active=false;
        }
    }


    openGain(data){
        let list = data;
        for (const key in list) {
            const element = list[key];
            switch (Number( key) ) {
                case RewardType.none:
                    this.xczj.active = true;
                    break;
                case RewardType.iphone:
                    this.gxhd.active = true;
                    this.iphone.active = true;
                    break;
                case RewardType.macbook:
                    this.gxhd.active = true;
                    this.macbook.active = true;
                    break;
                case RewardType.iwatch:
                    this.gxhd.active = true;
                    this.iwatch.active = true;
                    break;
                case RewardType.car:
                    this.gxhd.active = true;
                    this.car.active = true;
                    break;
                case RewardType.gold:
                    this.gxhd.active = true;
                    this.gold.active = true;
                    let txt = this.gold.getComponent(cc.Label)
                    txt.string = G_Utils.setStringOfUnit(element);
                    break;
                default:
                    break;
            }
        }

    }

    onClose(){
        this.node.active = false;
    }


}
