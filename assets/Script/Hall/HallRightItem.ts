import { G_CommonControl } from "../Controller/CommonControl";
import { G_Utils } from "../Tool/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HallRightItem extends cc.Component {

    @property(cc.Sprite)
    icon: cc.Sprite = null;
    @property(cc.SpriteAtlas)
    iconAtlas:cc.SpriteAtlas = null;

    private data = null;
    private back = null;
    private pathList = null;

    onSelectClick()
    {
        if(this.back)
        {
            this.back(this.data);
        }
    }

    init(data,fback){
        this.data = data;
        this.back = fback;
        /*
        this.pathList = G_CommonControl.getCommonConfig().getGameJsonPath(data.game_sign);
        if(this.pathList != null)
        {
            console.log("this.pathList  is null "+data.game_sign)
        }else
        {
            console.log("this.pathList "+this.pathList)
            this.icon.spriteFrame = this.iconAtlas.getSpriteFrame(this.pathList.icon)
        }
        */
    }

    /*
    setSelectState(bTrue){
        this.normalImg.node.active = !bTrue;
        this.specialImg.node.active = bTrue;
        this.selectNode.active = bTrue;
    }
    */

    // update (dt) {}
}
