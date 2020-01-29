


import List from '../../Common/List';
import {G_UiForms} from "../../Tool/UiForms"
import { G_Utils } from '../../Tool/Utils';
const {ccclass, property} = cc._decorator;

@ccclass
export default class TeamManagetPanel extends cc.Component {

    @property(List)
    list : List = null;

    private _updateQueryFlag : boolean = false;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        this.list.numItems = 10;

        let beginTime = this.node.getChildByName("beginTime")
        let endTime = this.node.getChildByName("endTime")
        
        let myEditbox = this.node.getChildByName("myEditbox")
        var classEdithbox = myEditbox.getComponent("MyEditbox")
        classEdithbox.onDidEndedCallback = function(target) {
            console.log("输入结束》》")
        }
        classEdithbox.onTextChangedCallback = function(target) {
            console.log("录入》》")
        }

        G_Utils.onClickEnd(beginTime, this.onTimeSelectBeginByEnd, this)
        G_Utils.onClickEnd(endTime, this.onTimeSelectBeginByEnd, this)
        let bottomHeadline = this.node.getChildByName("bottomHeadline")
        for (let index = 0; index < 5; index++) {
            let labtxt = bottomHeadline.getChildByName("label_"+index)
            labtxt.getComponent(cc.Label).string = "+"+index;
        }
        
        let btnChaXun = this.node.getChildByName("btnChaXun")
        G_Utils.onClickEnd(btnChaXun, this.onChaXun, this)
    }

    start () {

    }

    onEnable(){
    }
    // update (dt) {}

    onListRender(item: cc.Node, idx: number) {
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        for (let i = 0; i < 6; i++) {
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


    onChaXun(event){
        this._updateQueryFlag = true;
        this.list.content.removeAllChildren();
        this.list.numItems = 1
        console.log("更新》》？")
    }

    onTimeSelectBeginByEnd(event){
        console.log("》》》",event.target.name)
        G_UiForms.uiPickView();
    }

    onTextChanged(event){
        console.log("输入了什么》》》",event.string)
    }

}
