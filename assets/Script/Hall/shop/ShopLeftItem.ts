import { G_CommonControl } from "../Controller/CommonControl";
import { G_Utils } from "../Tool/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HallLeftItem extends cc.Component {

    @property(cc.Sprite)
    normalImg: cc.Sprite = null;
    @property(cc.Sprite)
    specialImg: cc.Sprite = null;
    @property(cc.Node)
    selectNode :cc.Node = null;

    @property(cc.Sprite)
    icon: cc.Sprite = null;
    @property(cc.SpriteAtlas)
    subtitleAtlas:cc.SpriteAtlas = null;
    @property(cc.SpriteAtlas)
    iconAtlas:cc.SpriteAtlas = null;

    private back = null;
    private data = null;
    private index = 0;
    private pathList = null;

    onSelectClick()
    {
        if(this.back)
        {
            this.back(this.index,this.data);
        }
    }

    init(data,index,fback){
        this.data = data;
        this.back = fback;
        this.index = index;
         this.icon.spriteFrame = this.iconAtlas.getSpriteFrame(data.config.icon)
        this.normalImg.spriteFrame = this.subtitleAtlas.getSpriteFrame(data.config.normalText);
        this.specialImg.spriteFrame = this.subtitleAtlas.getSpriteFrame(data.config.specialText);    
        this.setSelectState(false);
    }

    setSelectState(bTrue){
        this.normalImg.node.active = !bTrue;
        this.specialImg.node.active = bTrue;
        this.selectNode.active = bTrue;
    }

    // update (dt) {}
}
