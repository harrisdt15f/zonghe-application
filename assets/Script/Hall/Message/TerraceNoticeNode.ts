

import List from '../../Common/List';
const {ccclass, property} = cc._decorator;

@ccclass
export default class TerraceNoticeNode extends cc.Component {

    @property(List)
    list : List = null;

    private _updateQueryFlag : boolean = false;
    // LIFE-CYCLE CALLBACKS:

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
        item.getChildByName("label").getComponent(cc.Label).string = ""+idx;
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
