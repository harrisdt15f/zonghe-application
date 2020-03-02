

import { G_OnFire } from '../../Net/OnFire';
 import {uiEventFunction } from '../../Config/uiEvent';
import { headNum } from '../../Config/config';

import { G_UserControl } from '../../Controller/UserControl';
import { G_UiForms } from '../../Tool/UiForms';
import { G_Language } from '../../Language/Language';

const {ccclass, property} = cc._decorator;
@ccclass
export default class HeadBoxNode extends cc.Component {

    @property(cc.SpriteAtlas)
    headAtlas : cc.SpriteAtlas = null;
    @property(cc.Prefab)
    headImage : cc.Prefab = null;
    @property(cc.Prefab)
    headSelect : cc.Prefab = null;
    
    //属性
    private selectBox　: cc.Node = null;
    // headList : Array<cc.Node> = new Array<cc.Node>();
    private tmpSelectBox : cc.Node = null;
    private selectIdx : number = 0;

    onLoad () {
        // G_HttpHelper.httpGet(RequestEnum.Avatar, function(ret){
        //     console.log("app-api/user/system-avatar数据",ret); 

        //     G_OnFire.fire(EventRequest.HeadUpdata)
        // }.bind(this))
    }

    start () {
        let scrollview = this.node.getChildByName("scrollview");
        let view = scrollview.getChildByName("view");
        let content = view.getChildByName("content");
        content.removeAllChildren()

        this.selectBox = cc.instantiate(this.headSelect)
        let cur = parseInt(G_UserControl.getUser().usePic);
        if(!isNaN(cur) && cur > 0)
        {
           // cur = cur;
        }else
        {
            cur = 1;
        }
        for (let index = 1; index <= headNum; index++) {
            let piece = cc.instantiate(this.headImage)
            piece.getComponent(cc.Sprite).spriteFrame = this.headAtlas.getSpriteFrame("touxiang"+index)
            piece.parent =  content;
            piece.name = "heand_"+index;
            if (index == cur){
                this.selectIdx = index;
                this.tmpSelectBox = piece;
                this.selectBox.setPosition(cc.v2(0,0))
                piece.getComponent(cc.Sprite).node.addChild(this.selectBox)
            }
            piece.on(cc.Node.EventType.TOUCH_END, this.onSelectHead.bind(this));
        }
        let btnTiJiao = this.node.getChildByName("btnTiJiao");
        btnTiJiao.on(cc.Node.EventType.TOUCH_END, this.onTiJiao.bind(this));
    }

    // update (dt) {}

    onSelectHead(event){
        if (this.tmpSelectBox  == event.target){return;}
        if (this.tmpSelectBox != null && this.tmpSelectBox != event.target){
            this.tmpSelectBox.removeAllChildren()
        }
        event.target.getComponent(cc.Sprite).node.addChild(this.selectBox)
        this.tmpSelectBox = event.target;
        let strTxt = event.target.getName()
        let idx = strTxt.indexOf("_")
        let str = strTxt.substring(idx+1, strTxt.length)
        this.selectIdx = Number(str);
    }

    onTiJiao(){
         //G_OnFire.fire(UI_EVENT_STATE.UI_HEAD_replace, this.selectIdx);
        // G_OnFire.fire(UI_EVENT_STATE.UI_HEAD_colse);
        console.log("selectIdx  ",this.selectIdx);
        
        G_UserControl.requesPlayerChange(G_UserControl.getUser().userName,this.selectIdx,function(ret){
            if(ret.status)
            {
                G_UiForms.hint(G_Language.get("picChangeSuccess"));
                G_OnFire.fire(uiEventFunction.colseBox);
            }else
            {
                G_UiForms.hint(ret.message);
            }

        }.bind(this));
    }

    onDestroy(){
        // G_OnFire.off(UI_EVENT_STATE.UI_HEAD_replace)
        // G_OnFire.off(UI_EVENT_STATE.UI_HEAD_colse)
    }

}
