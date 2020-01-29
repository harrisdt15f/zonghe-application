
import { G_Language } from '../../Language/Language';
import {G_UiForms} from "../../Tool/UiForms"
import List from '../../Common/List';
const {ccclass, property} = cc._decorator;

@ccclass
export default class TeamReportPanel extends cc.Component {

    @property(List)
    list : List = null;
    
    @property(cc.Node)
    menuList : cc.Node = null;



    classMenu = null;
    private _myPulldownMenu = null;
    private _updateQueryFlag = false;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        let beginTime = this.node.getChildByName("beginTime")
        let endTime = this.node.getChildByName("endTime")
        beginTime.on(cc.Node.EventType.TOUCH_END, this.onTimeSelectBeginByEnd.bind(this));
        endTime.on(cc.Node.EventType.TOUCH_END, this.onTimeSelectBeginByEnd.bind(this));

        let bottomHeadline = this.node.getChildByName("bottomHeadline")
        for (let index = 0; index < 5; index++) {
            let labtxt = bottomHeadline.getChildByName("label_"+index)
            labtxt.getComponent(cc.Label).string = "+"+index;
        }

        var myEditbox = this.node.getChildByName("myEditbox")
        var classEdithbox = myEditbox.getComponent("MyEditbox")
        classEdithbox.onDidEndedCallback = function(target) {
            console.log("输入结束》》")
        }
        classEdithbox.onTextChangedCallback = function(target) {
            console.log("录入》》")
        }
        
        let btnChaXun = this.node.getChildByName("btnChaXun")
        btnChaXun.on(cc.Node.EventType.TOUCH_END, this.onChaXun.bind(this));
        
        if(this.menuList){
            this._myPulldownMenu = this.menuList.getComponent("MyPulldownMenu")
            this._myPulldownMenu.menuData = G_Language.get("accountTypeList")
            var selectedId = this._myPulldownMenu.selectResult.selectedId;
            var selectedText = this._myPulldownMenu.selectResult.text;
        }
        
        this.list.numItems = 10;
    }

    start () {

    }

    // update (dt) {}

    onEnable(){

    }

    onListRender(item: cc.Node, idx: number) {
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        for (let i = 0; i < 6; i++) {
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

    onChaXun(event){
        this._updateQueryFlag = true;
        this.list.content.removeAllChildren();
        this.list.numItems = 1

        var selectedId = this._myPulldownMenu.selectResult.selectedId;
        var selectedText = this._myPulldownMenu.selectResult.text;
    }

    onTimeSelectBeginByEnd(event){
        G_UiForms.uiPickView();
    }



    onAreaInCallback(){
        // this.classMenu.setScrollviewSelectActive()
        // this.areaInNode.active = false
    }
}
