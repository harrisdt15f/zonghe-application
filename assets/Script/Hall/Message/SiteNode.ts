
import List from '../../Common/List';
const {ccclass, property} = cc._decorator;

@ccclass
export default class SiteNode extends cc.Component {

    @property(List)
    list : List = null;

    private _updateQueryFlag : boolean = false;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.list.numItems = 10;
        var btnFaSong = this.node.getChildByName("btnFaSong")
        btnFaSong.on(cc.Node.EventType.TOUCH_END,this.onFaSong.bind(this))
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

    onToggleContainer(event){
        // console.log("，，，，，",event)
        // console.log("噢噢噢噢噢噢噢噢》》》",event.node.name)
        if (event.node.name === "toggle1"){

        }else if(event.node.name === "toggle2"){

        }else if(event.node.name === "toggle3"){

        }
    }

    onFaSong(){

    }
}
