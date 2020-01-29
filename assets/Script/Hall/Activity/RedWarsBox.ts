

import { G_Utils } from '../../Tool/Utils';
import { G_OnFire } from '../../Net/OnFire';
import { uiEventFunction} from '../../Config/uiEvent';

const {ccclass, property} = cc._decorator;

@ccclass
export default class RedWarsBox extends cc.Component {

    @property(cc.Node)
    hb:cc.Node = null;

    @property(cc.Node)
    peanl:cc.Node = null;

    @property(cc.Node)
    OpenGuessing:cc.Node = null;

    @property(cc.SpriteAtlas)
    numImage : cc.SpriteAtlas = null;

    @property(cc.Animation)
    yellowHalo : cc.Animation = null;

    @property(cc.Node)
    imageNum : cc.Node = null;

    private _updateflag = false;
    private _clickFlag = true;
    private _dt = 0;
    private _time = 10;
    // private count = 0;

    private _pool : cc.NodePool = null;
    private tempArray : cc.Node[] = [];
    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.peanl.on(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
        G_OnFire.on(uiEventFunction.awardClose,this.onCloseAwardNode.bind(this))
    }

    start () {

    }

    update (dt) {
        if(this._updateflag && this._clickFlag){
            this._dt += dt
            if(this._dt >= 1){
                this._time--;
                this._dt = 0;
            }
            if(this._time <= 5 ){
                this.yellowHalo.node.active = true;
                this.imageNum.getComponent(cc.Sprite).spriteFrame = this.numImage.getSpriteFrame(String(this._time));
            }
            if(this._time < 0){
                this.onCloseAwardNode();
            }
        }
    }

    onEnable(){
        this.yellowHalo.play();
        this._updateflag = true;
        this._clickFlag = true;
        this._time = 10;
        this._dt = 0;
        this._pool = new cc.NodePool();
        this.dropOut();
    }

    onDestroy() {
        console.log("销毁")
        this.peanl.off(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
        G_OnFire.off(uiEventFunction.awardClose)
        while (this._pool.size()) {
            let node = this._pool.get();
            node.destroy();
        }
    }


    nodePollPut(_item:cc.Node){
        if(!_item)
            return;
    
        this.tempArray.push(_item)
        _item.parent = this.peanl;
    
        var x = G_Utils.random(0, 1400)
        var rotation = G_Utils.random(0, 90)
        var scale = G_Utils.random(100, 120)
        _item.x = x
        _item.y = 800
        _item.scale = scale / 100
        _item.angle = rotation;

        var speed = G_Utils.random(150,500) 
        speed = speed / 100;

        var move = cc.moveTo(speed, x, -80)
        var cFunc = cc.callFunc(function(target){
            this.peanl.removeChild(target, false)
            this.tempArray.forEach(function(value,index){
                if(value === target){
                    this.tempArray.splice(index-1,index)
                }
            },this);
        },this, _item)
        var sseq = cc.sequence(move, cFunc)
        _item.runAction(sseq)
    }

    dropOut(){
        var func = cc.callFunc(function (target) {
            if(this._pool.size()){
                var item = this._pool.get()
                this.nodePollPut(item);
            }else{
                var _item  = cc.instantiate(this.hb);
                this._pool.put(_item);
                var item = this._pool.get()
                this.nodePollPut(item);
            }
        }, this);

        var seq = cc.sequence(cc.delayTime(0.5), func)
        var repeatf = cc.repeatForever(seq)
        this.peanl.runAction(repeatf);
    }

    _onTouchBegin(event){
        //获取当前点击的全局坐标
        this.tempArray.forEach(element => {
            if(element.getBoundingBoxToWorld().contains(event.getLocation())){
                this.OpenGuessing.active = true;
                this._clickFlag = false;
                this.peanl.stopAllActions()
                element.stopAllActions()
                this.yellowHalo.stop();
                return;
            }
        }, this);
    }

    onCloseAwardNode(){
        this._clickFlag = false;
        this.yellowHalo.node.active = false;
        this.yellowHalo.stop();
        this.peanl.removeAllChildren(false)
        this.peanl.stopAllActions()
        while (this._pool.size()) {
            let node = this._pool.get();
            node.destroy();
        }
        this.node.active = false;
    }

}
