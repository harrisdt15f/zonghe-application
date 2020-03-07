import { G_Language } from '../../Language/Language';
import List from '../../Common/List';
import { G_PayControl } from '../../Controller/PayControl';
import { G_Utils } from '../../Tool/Utils';

const {ccclass, property} = cc._decorator;

@ccclass
export default class PayRecordPanel extends cc.Component {


    @property(List)
    list : List = null;

    @property(cc.Node)
    typeList : cc.Node = null;
    @property(cc.Node)
    stateList : cc.Node = null;
    @property(cc.Node)
    btnChaXun : cc.Node = null;
    @property(cc.Node)
    mainObj : cc.Node = null;
    @property(cc.Node)
    detailObj : cc.Node = null;

    @property(cc.Label)
    detail_MoneyText:cc.Label = null;
    @property(cc.Label)
    detail_StateText:cc.Label = null;
    @property(cc.Label)
    detail_OrderText:cc.Label = null;
    @property(cc.Label)
    detail_TimeText:cc.Label = null;
    @property(cc.Label)
    detail_TypeText:cc.Label = null;
    @property(cc.Label)
    detail_DescText:cc.Label = null;

    // private classMenu = null;
    private _typeMenu = null;
    private _stateMenu = null;
    private _updateQueryFlag = false;

    private curList = null;
    private curBeginTimeDate = null;
    private curEndTimeDate = null;

    private dateType = 1;

    onLoad () {
       // let btnChaXun = this.node.getChildByName("btnChaXun")
        this.btnChaXun.on(cc.Node.EventType.TOUCH_END, this.onChaXun.bind(this));
        //this.list.numItems = 2;
        if(this.typeList){
            this._typeMenu = this.typeList.getComponent("MyPulldownMenu")
            this._typeMenu.menuData = G_Language.get("payStateList")
            let _length = G_Language.get("payStateList").length
            if(_length >=8)
            {
                this._typeMenu.list.node.height = 37 * 8;
            }else
            {
                this._typeMenu.list.node.height = _length > 0 ? (37*_length):37;
            }
            var selectedId = this._typeMenu.selectResult.selectedId;
            var selectedText = this._typeMenu.selectResult.text;
            console.log("选择了什么》》",selectedId,selectedText)
        }
        // if(this.stateList){
        //     this._stateMenu = this.stateList.getComponent("MyPulldownMenu")
        //     this._stateMenu.menuData = G_Language.get("withDrawStateList")
        //     let _length = G_Language.get("withDrawStateList").length
        //     if(_length >=8)
        //     {
        //         this._stateMenu.list.node.height = 37 * 8;
        //     }else
        //     {
        //         this._stateMenu.list.node.height = _length > 0 ? (37*_length):37;
        //     }
        //     var selectedId = this._stateMenu.selectResult.selectedId;
        //     var selectedText = this._stateMenu.selectResult.text;
        //     console.log("选择了什么》》",selectedId,selectedText)
        // }

    }

    onEnable()
    {
        this.mainObj.active = true;
        this.detailObj.active = false;
        G_PayControl.requesPayRecord(function(ret){         
            this.showInfo();
        }.bind(this));
    }

    onChaXun(){
        this._updateQueryFlag = true;
        this.list.content.removeAllChildren();
        var typeId =  this._typeMenu.selectResult.selectedId;
        //var stateId =  G_WithDrawControl.getConfig().withDrawStateConfig[this._stateMenu.selectResult.selectedId].status;
        //var selectedText = this._typeMenu.selectResult.text;
        this.curList = G_PayControl.getPayConfig().getPayRecordListInfo(typeId,this.curBeginTimeDate,this.curEndTimeDate);
        this.list.numItems = this.curList.length;
    }

    showInfo(){
        this.getTimeDate();   
        this.onChaXun();  
    }

    onToggleClick(event){
        //console.log("event.name:",event.target._localZOrder)
        this.dateType =  event.target._localZOrder;    //1.全部 2.昨日 3.今日 4.上周 5.上月
        this.getTimeDate();   
    }

    getTimeDate()
    {
        G_Utils.getTimeDate(this.dateType,function(begin,end){
            this.curBeginTimeDate = begin;
            this.curEndTimeDate = end;
        }.bind(this))
    }

    onListRender(item: cc.Node, idx: number) {
        //console.log("item   ",this.curList.length);
        //console.log("idx   ",idx);
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        if(this.curList.length > idx)
        {
            let cur = this.curList[idx]
            //item.strin = idx;
            item.getChildByName("label_0").getComponent(cc.Label).string = parseInt(cur.money).toFixed(2);
            let _str = "";
            if(cur.recharge_status == 0)  //未支付
            {
                _str = G_Language.get("payStateList")[1];
            }else if(cur.recharge_status == 1 && cur.status == 0)  //已支付/审核中
            {
                _str = G_Language.get("payStateList")[2];
            }else if(cur.recharge_status == 1 && cur.status == 1)  //充值成功
            {
                _str = G_Language.get("payStateList")[3];
            }
            item.getChildByName("label_1").getComponent(cc.Label).string = _str;
           // item.getChildByName("label_2").getComponent(cc.Label).string = G_WithDrawControl.getConfig().ServerStateConfig[cur.status].name;
            item.getChildByName("label_2").getComponent(cc.Label).string = cur.created_at
            item.getChildByName("btn").name = idx.toString();
        }
    }

    onRequestData(item: cc.Node, idx: number){
        // if (this.list.length >= 99){
        //     return;
        // }
        // if(this._updateQueryFlag){
        //     this._updateQueryFlag = false;
        //     return;
        // }
        // this.list.numItems += 10
    }
    
    onDetailClick(event){
       // console.log("event  ",event.target);
       // console.log("event  ",event.target._localZOrder);
        var idx = parseInt(event.target.name);
        if(this.curList.length > idx)
        {
            var cur = this.curList[idx]
            this.mainObj.active = false;
            this.detailObj.active = true;
            this.detail_MoneyText.string = parseInt(cur.money).toFixed(2);
            this.detail_OrderText.string = cur.order_no.toString();
            this.detail_TimeText.string = cur.created_at
            let _str = ""
            if(cur.recharge_status == 0)  //未支付
            {
                _str = G_Language.get("payStateList")[1];
            }else if(cur.recharge_status == 1 && cur.status == 0)  //已支付/审核中
            {
                _str = G_Language.get("payStateList")[2];
            }else if(cur.recharge_status == 1 && cur.status == 1)  //充值成功
            {
                _str = G_Language.get("payStateList")[3];
            }
            this.detail_TypeText.string = _str;
            this.detail_StateText.string = ""
            this.detail_DescText.string = "";
        }
    }

    onDetailClose()
    {
        this.mainObj.active = true;
        this.detailObj.active =false;
    }

}
