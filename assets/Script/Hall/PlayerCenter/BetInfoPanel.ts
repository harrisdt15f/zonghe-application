
import { G_Language } from '../../Language/Language';
import List from '../../Common/List';

const {ccclass, property} = cc._decorator;

@ccclass
export default class BetInfoPanel extends cc.Component {

    @property(List)
    list : List = null;

    @property(cc.Node)
    menuList : cc.Node = null;

    private labTotal : any = null;
    private _updateQueryFlag : boolean = false;
    private _myPulldownMenu : any = null;

    onLoad(){

        let btnChaXun = this.node.getChildByName("btnChaXun")
        btnChaXun.on(cc.Node.EventType.TOUCH_END, this.onChaXun.bind(this));

        let bottomHeadline = this.node.getChildByName("bottomHeadline");
        this.labTotal = bottomHeadline.getChildByName("label_0");
        this.labTotal.getComponent(cc.Label).string = "10000000.0"

        this.list.numItems = 10;

        if(this.menuList){
            this._myPulldownMenu = this.menuList.getComponent("MyPulldownMenu")
            this._myPulldownMenu.menuData = G_Language.get("accountTypeList")
            var selectedId = this._myPulldownMenu.selectResult.selectedId;
            var selectedText = this._myPulldownMenu.selectResult.text;
            console.log("选择了什么》》",selectedId,selectedText)
        }

    }

    onEnable(){
        this._updateQueryFlag = false;
    }

    onListRender(item: cc.Node, idx: number) {
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        for (let i = 0; i < 5; i++) {
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


    onToggleClick(event){
        console.log("event.name:",event.target.name)
    }


    onChaXun(event){
        this._updateQueryFlag = true;
        this.list.content.removeAllChildren();
        this.list.numItems = 1
        var selectedId : number = this._myPulldownMenu.selectResult.selectedId;
        var selectedText : string = this._myPulldownMenu.selectResult.text;
        console.log("选择了什么》》",selectedId,selectedText)
    }
}
