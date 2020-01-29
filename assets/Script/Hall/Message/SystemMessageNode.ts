


import List from '../../Common/List';
const {ccclass, property} = cc._decorator;

@ccclass
export default class SystemMessageNode extends cc.Component {

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



    // onCallback(event){
    //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>",event.target.index)
    // }

    onListRender(item: cc.Node, idx: number) {
        // item.on(cc.Node.EventType.TOUCH_END, this.onCallback, this)
        item.getChildByName("labelText").getComponent(cc.Label).string = ""+idx;
        var unread = item.getChildByName("unread");//未读
        var read = item.getChildByName("read");//已读
        var he = item.getChildByName("he");//未读合起图标
        var kai = item.getChildByName("kai");//已读打开图标
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
