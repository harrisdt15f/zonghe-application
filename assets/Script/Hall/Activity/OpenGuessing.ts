

import { G_Utils } from "../../Tool/Utils";
import { G_OnFire } from '../../Net/OnFire';
import { uiEventFunction } from '../../Config/uiEvent';


const {ccclass, property} = cc._decorator;

@ccclass
export default class OpenGuessing extends cc.Component {
    @property(cc.Node)
    gx : cc.Node = null;

    @property(cc.Node)
    box : cc.Node = null;

    @property(cc.Label)
    rmb : cc.Label = null;
    // LIFE-CYCLE CALLBACKS:

    private _dt = 0;

    onLoad () {

    }

    start () {

    }

    onEnable(){
        this._dt = 0;
        this.box.scale = 0;
        var seq0 = cc.sequence(cc.scaleTo(0.6, 1),cc.callFunc(function(){
            var scaleAction = cc.scaleBy(1, 2)
            var scaleAction1 = cc.scaleBy(1, 1)
            var ft90 = cc.fadeTo(4,90)
            var ft255 = cc.fadeTo(4,255)
            var rotateAction = cc.rotateBy(12,360)
            var seq = cc.sequence(ft90,ft255)
            var spawn = cc.spawn(rotateAction,seq,scaleAction,scaleAction1)
            var rf = cc.repeatForever(spawn)
            this.gx.runAction(rf)
        },this))
        this.box.runAction(seq0)

        this.rmb.string  = G_Utils.setStringOfUnit(10)

    }

    update (dt) {
        this._dt += dt;
        if (this._dt >= 4){
            this.node.active=false;
            // awardClose
            G_OnFire.fire(uiEventFunction.awardClose)
        }
    }



}
