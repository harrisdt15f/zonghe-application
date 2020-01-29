
import List from '../../Common/List';
const {ccclass, property} = cc._decorator;

@ccclass
export default class RecordPanel extends cc.Component {

    @property(List)
    list : List = null;

    private content = null;
    private recorListItem = null;


    private _updateQueryFlag = false;

    onLoad () {
        // let scrollviewList = this.node.getChildByName("scrollviewList")
        // let view = scrollviewList.getChildByName("view")
        // this.content = view.getChildByName("content")
        // this.recorListItem = this.content.getChildByName("recorListItem")
        // this.content.removeAllChildren()

        this.list.numItems = 10;
    }

    start () {

    }

    // update (dt) {}

    onEnable(){
        // this.setScrollviewList();
    }

    setScrollviewList(){
        this.content.removeAllChildren()
        for (let index = 0; index < 20; index++) {
            let piece = cc.instantiate(this.recorListItem )
            piece.parent = this.content;
            piece.getChildByName("sprDiSe").active = index % 2 == 0;
            for (let i = 0; i < 5; i++) {
                let labStr = piece.getChildByName("label_"+i)
                labStr.getComponent(cc.Label).string = i;
            }
        }
    }
    
    onListRender(item: cc.Node, idx: number) {
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        for (let i = 0; i < 5; i++) {
            let labStr = item.getChildByName("label_"+i)
            labStr.getComponent(cc.Label).string = "csdd"+idx;
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
