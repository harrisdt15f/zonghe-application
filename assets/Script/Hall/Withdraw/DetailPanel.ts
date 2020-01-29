import { G_Language } from '../../Language/Language';
import List from '../../Common/List';

const {ccclass, property} = cc._decorator;

@ccclass
export default class DetailPanel extends cc.Component {


    @property(List)
    list : List = null;

    @property(cc.Node)
    menuList : cc.Node = null;



    // private classMenu = null;
    private _myPulldownMenu = null;
    private _updateQueryFlag = false;

    onLoad () {
        let btnChaXun = this.node.getChildByName("btnChaXun")
        btnChaXun.on(cc.Node.EventType.TOUCH_END, this.onChaXun.bind(this));
        this.list.numItems = 10;
        if(this.menuList){
            this._myPulldownMenu = this.menuList.getComponent("MyPulldownMenu")
            this._myPulldownMenu.menuData = G_Language.get("accountTypeList")
            var selectedId = this._myPulldownMenu.selectResult.selectedId;
            var selectedText = this._myPulldownMenu.selectResult.text;
            console.log("选择了什么》》",selectedId,selectedText)
        }

    }

    start () {

    }

    // update (dt) {}

    onEnable(){

    }

    onChaXun(event){
        this._updateQueryFlag = true;
        this.list.content.removeAllChildren();
        this.list.numItems = 1

        var selectedId = this._myPulldownMenu.selectResult.selectedId;
        var selectedText = this._myPulldownMenu.selectResult.text;
        console.log("选择了什么》》",selectedId,selectedText)
    }
    

    onAreaInCallback(){
  
    }

    onListRender(item: cc.Node, idx: number) {
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        for (let i = 0; i < 4; i++) {
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

    onToggleClick(event){
        console.log("event.name:",event.target.name)
    }

}
