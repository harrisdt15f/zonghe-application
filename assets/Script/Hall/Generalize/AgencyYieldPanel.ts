

import { G_Language } from '../../Language/Language';
import { G_UiForms } from '../../Tool/UiForms';
import List from '../../Common/List';

const {ccclass, property} = cc._decorator;

@ccclass
export default class AgencyYieldPanel extends cc.Component {
    @property(List)
    list : List = null;

    @property(cc.Node)
    menuListGrantType : cc.Node = null;
    @property(cc.Node)
    menuListGameType : cc.Node = null;
    @property(cc.Node)
    menuListGrantState : cc.Node = null;

    private _updateQueryFlag : boolean = false;
    private _myMenuGrantType = null;
    private _myMenuGameType = null;
    private _myMenuGrantState = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let beginTime = this.node.getChildByName("beginTime")
        let endTime = this.node.getChildByName("endTime")
        beginTime.on(cc.Node.EventType.TOUCH_END, this.onTimeSelectBeginByEnd.bind(this));
        endTime.on(cc.Node.EventType.TOUCH_END, this.onTimeSelectBeginByEnd.bind(this));

        let btnChaXun = this.node.getChildByName("btnChaXun")
        btnChaXun.on(cc.Node.EventType.TOUCH_END, this.onChaXun.bind(this));
 
        this.list.numItems = 10;

        if(this.menuListGrantType){
            this._myMenuGrantType = this.menuListGrantType.getComponent("MyPulldownMenu")
            this._myMenuGrantType.menuData = G_Language.get("accountTypeList")
            var selectedId = this._myMenuGrantType.selectResult.selectedId;
            var selectedText = this._myMenuGrantType.selectResult.text;
        }
        
        if(this.menuListGameType){
            this._myMenuGameType = this.menuListGameType.getComponent("MyPulldownMenu")
            this._myMenuGameType.menuData = G_Language.get("accountTypeList")
            var selectedId = this._myMenuGameType.selectResult.selectedId;
            var selectedText = this._myMenuGameType.selectResult.text;
        }
        
        if(this.menuListGrantState){
            this._myMenuGrantState = this.menuListGrantState.getComponent("MyPulldownMenu")
            this._myMenuGrantState.menuData = G_Language.get("accountTypeList")
            var selectedId = this._myMenuGrantState.selectResult.selectedId;
            var selectedText = this._myMenuGrantState.selectResult.text;
        }

    }

    start () {

    }

    // update (dt) {}
    onEnable(){
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
        // var selectedId = this._myPulldownMenu.selectResult.selectedId;
        // var selectedText = this._myPulldownMenu.selectResult.text;
        // console.log("选择了什么》》",selectedId,selectedText)
    }

    onTimeSelectBeginByEnd(event){
        G_UiForms.uiPickView();
    }

    //仅处理 下拉列表层级，
    onClickMenu(target : cc.Node, flag : boolean){
        if(flag){
            switch ( target.name ) {
                case "menuGrantType":
                    this.menuListGrantType.zIndex = 3
                    this.menuListGameType.zIndex = 2
                    this.menuListGrantState.zIndex = 1
                    break;
                case "menuGameType":
                    this.menuListGrantType.zIndex = 2
                    this.menuListGameType.zIndex = 3
                    this.menuListGrantState.zIndex = 1
                    break;
                case "menuGrantState":
                    this.menuListGrantType.zIndex = 1
                    this.menuListGameType.zIndex = 2
                    this.menuListGrantState.zIndex = 3
                    break;
                default:
                    break;
            }
        }
    }
}
