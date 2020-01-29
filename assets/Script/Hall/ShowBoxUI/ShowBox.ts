
import  {G_OnFire}  from "../../Net/OnFire";

import {uiEventModules, uiEventFunction} from "../../Config/uiEvent"
import { G_Utils } from '../../Tool/Utils';
import { BOX_TYPE } from "../../Config/IdentifyKey";


const {ccclass, property} = cc._decorator;

let boxTypeEnum = cc.Enum(BOX_TYPE);

@ccclass
export default class ShowBox extends cc.Component {

    @property(cc.Node)
    box:cc.Node = null;

    @property(cc.Node)
    peanl:cc.Node = null;

    @property({
        type:cc.Enum(boxTypeEnum),
        tooltip:"窗体类型：BOX_NONE 默认窗体, BOX_SMALL 小窗体, BOX_COM 通用窗体"
    })
    boxType = boxTypeEnum.BOX_NONE;

    @property(cc.SpriteAtlas)
    titleTextAtlas : cc.SpriteAtlas = null;

    @property(cc.SpriteAtlas)
    headAtals : cc.SpriteAtlas = null;

    @property({
        type:cc.Sprite,
        tooltip:"蓝色底图"
    })
    buleBg : cc.Sprite = null;

    @property({
        type:cc.Node,
        tooltip:"通用二级界面"
    })
    comBox : cc.Node = null;
    
    @property({
        type : cc.Sprite,
        tooltip:"灰色底图"
    })
    creamColouredBg : cc.Sprite = null;

    @property(cc.Sprite)
    SprTitle : cc.Sprite = null;
    @property(cc.Node)
    luImage : cc.Node = null;

    @property({
        type : cc.Sprite,
        tooltip : "标题名称"
    })
    sprTitleName : cc.Sprite = null;

    @property({
        type : cc.Node,
        tooltip : "关闭按钮"
    })
    btnColse : cc.Node = null;

    @property({
        type:cc.Prefab,
        tooltip:"功能模块"
    })
    modulesUI  = []


    //属性
    // peanl = null;
    tempNode = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.peanl.removeAllChildren()
        G_Utils.onClickEnd(this.btnColse, this.onColse, this)
        G_OnFire.on(uiEventFunction.colseBox,this.onColse.bind(this));
    }

    start () {

    }
    // update (dt) {}

    onEnable(){
    }

    onColse(){
        this.peanl.removeAllChildren()
        G_OnFire.fire(uiEventFunction.secondaryInterface);
        this.node.active = false;
    }

    onDestroy(){
        this.btnColse.off(cc.Node.EventType.TOUCH_END, this.onColse.bind(this));
        G_OnFire.off(uiEventFunction.colseBox,this.onColse.bind(this));
    }

    show(_event : string,style? : number){
        this.box.scale = 0.6
        console.log("_event",_event)
        this.node.active = true;
        this.boxType = style || boxTypeEnum.BOX_NONE;
        let nodeName = _event;
        let data = this.getPrefabAndKey(nodeName)
        let prefab = data.prefab
        let key = data.key
        this.setBoxStyle(nodeName)
        if(prefab){
            this.tempNode = cc.instantiate(prefab)
            this.tempNode.parent = this.peanl;
            this.sprTitleName.spriteFrame = this.titleTextAtlas.getSpriteFrame("title_"+key)
        }
        console.log("<<show UI>>[prefab]:",this.tempNode.name)
        var s1 = cc.scaleTo(0.2, 1.2)
        var s2 = cc.scaleTo(0.2, 1)
        var seq = cc.sequence(s1,s2)
        this.box.runAction(seq)
    }

    setSelectPanelShow(index){
        let subitem =  this.tempNode.getComponent("SubitemControl")
        subitem.leftSelectedItem = index

    }

    setBoxStyle(type){
        //商店，活动
        var flag = (type === uiEventModules.shopNode || type === uiEventModules.activityNode || this.boxType == boxTypeEnum.BOX_COM) ? false : true;
        this.luImage.active = flag

        this.buleBg.node.active = true
        this.SprTitle.node.active = true
        this.creamColouredBg.node.active = this.boxType != boxTypeEnum.BOX_COM;
        this.comBox.active = this.boxType == boxTypeEnum.BOX_COM;;
        switch (this.boxType) {
            case  boxTypeEnum.BOX_NONE:
                this.buleBg.node.width = 1120//1080
                this.SprTitle.node.width = 1230//1200
                this.creamColouredBg.node.x = 110
                this.btnColse.x = 580
                break;
            case  boxTypeEnum.BOX_SMALL:
                this.buleBg.node.width = 880
                this.SprTitle.node.width = 1000
                this.creamColouredBg.node.x = 0
                this.luImage.active = false;
                this.btnColse.x = 465
                break;
            case  boxTypeEnum.BOX_COM:
                this.buleBg.node.active = false
                this.SprTitle.node.active = false
                // this.luImage.active = false;
                break;              
            default:
                break;
        }
    }


    private getPrefabAndKey(prefabName : string){
        var prefab = null;
        var key = 0
        // console.log("this.modulesUI.length  "+this.modulesUI.length)
        // for(let index = 0; index < this.modulesUI.length; index++){
        //     const element = this.modulesUI[index];
        //     if(element){
        //         console.log("------------->name  "+element.name + "  index "+index);
        //     }
        // }
        for (let index = 0; index < this.modulesUI.length; index++) {
            const element = this.modulesUI[index];
            if(element){
                console.log("name  "+element.name + "  index "+index + " prefabName   " + prefabName);
                if (prefabName === element.name){
                    prefab = element;
                    key = index;
                    console.log("element.name  "+element.name + "  index "+index);
                    break;
                }
            }
        }
        return {"prefab" : prefab, "key" : key};
    }

}
