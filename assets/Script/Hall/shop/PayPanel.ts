import { G_OnFire } from '../../Net/OnFire';
import { uiEventFunction } from '../../Config/uiEvent';
import { G_Utils } from '../../Tool/Utils';
import { G_UiForms } from '../../Tool/UiForms';
import List from '../../Common/List';
/**
 * app 支付方式
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class  PayPanel extends cc.Component {

    @property(List)
    wayList : List=null;

    @property(List)
    moneyList : List=null;

    @property(cc.EditBox)
    editBoxJinE : cc.EditBox = null;

    private jinEEditBox = null;

    private classEdithbox = null;

    onLoad () {
        var btnRecharge = this.node.getChildByName("btnRecharge")
        btnRecharge.on(cc.Node.EventType.TOUCH_END,this.onChongZhi.bind(this))
        this.jinEEditBox = this.node.getChildByName("myEditbox")
        this.classEdithbox = this.jinEEditBox.getComponent("MyEditbox")
        this.wayList.numItems= 10
        this.moneyList.numItems=10;
    }

    start () {

    }

    onEnable(){
        // this.setChognZhiFanShi();
        // this.setChongZhiList();
    }


    onListRenderWay(item: cc.Node, idx: number) {
        if(!item)
            return;

        item.getChildByName("text").getComponent(cc.Label).string = idx.toString();
    }

    //当列表项被选择...
    onListSelectedWay(item: any, selectedId: number, lastSelectedId: number, val: number) {
        if (!item)
            return;

        console.log("选择了什么方式")
    }


    onListRenderMoney(item: cc.Node, idx: number) {
        if(!item)
            return;

        item.getChildByName("text").getComponent(cc.Label).string = idx.toString();
    }

    //当列表项被选择...
    onListSelectedMoney(item: any, selectedId: number, lastSelectedId: number, val: number) {
        if (!item)
            return;

        console.log("选择了充值金额")
        let strGold : string = item.getChildByName("text").getComponent(cc.Label).string
        this.classEdithbox.getEdiboxComponent().string = strGold
    }

    onChongZhi(event){
        var str = this.classEdithbox.getEdiboxComponent().string 
        if(!G_Utils.isInteger(str)){
            G_UiForms.hint("pleaseEnterInteger")
            return
        }
        G_OnFire.fire(uiEventFunction.colseBox);
    }

}