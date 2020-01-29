

import List from "../../Common/List";
const {ccclass, property} = cc._decorator;

@ccclass
export default class TopUpListPanel extends cc.Component {

    @property(List)
    list : List = null;

    private _updateQueryFlag : boolean = false;

    onLoad () {
 
        this.list.numItems = 10;
    }

    start () {

    }

    // update (dt) {}

    onEnable(){
        this._updateQueryFlag = false;
    }


    onListRender(item: cc.Node, idx: number) {
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        for (let i = 0; i < 4; i++) {
            let labStr = item.getChildByName("label_"+i)
            labStr.getComponent(cc.Label).string = "cs"+idx;
        }
    }

    onRequestData(item: cc.Node, idx: number){
        if (this.list.numItems >= 99){
            return;
        }
        if(this._updateQueryFlag){
            this._updateQueryFlag = false;
            return;
        }
        this.list.numItems += 10
    }

}
