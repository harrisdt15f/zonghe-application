import { G_Language } from '../../Language/Language';
import List from '../../Common/List';
import { G_UserControl } from '../../Controller/UserControl';
import { G_WithDrawControl } from '../../Controller/WithDrawControl';
import { G_Utils } from '../../Tool/Utils';

const {ccclass, property} = cc._decorator;

@ccclass
export default class RecordPanel extends cc.Component {


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
            this._typeMenu.menuData = G_Language.get("withDrawTypeList")
            var selectedId = this._typeMenu.selectResult.selectedId;
            var selectedText = this._typeMenu.selectResult.text;
            console.log("选择了什么》》",selectedId,selectedText)
        }
        if(this.stateList){
            this._stateMenu = this.stateList.getComponent("MyPulldownMenu")
            this._stateMenu.menuData = G_Language.get("withDrawStateList")
            var selectedId = this._stateMenu.selectResult.selectedId;
            var selectedText = this._stateMenu.selectResult.text;
            console.log("选择了什么》》",selectedId,selectedText)
        }

    }

    onEnable()
    {
        this.mainObj.active = true;
        this.detailObj.active = false;
        G_WithDrawControl.requesWithDrawRecord(function(ret){         
            this.showInfo();
        }.bind(this));
    }

    onChaXun(){
        this._updateQueryFlag = true;
        this.list.content.removeAllChildren();
        var typeId =  G_WithDrawControl.getConfig().withDrawTypeConfig[this._typeMenu.selectResult.selectedId].account_type;
        var stateId =  G_WithDrawControl.getConfig().withDrawStateConfig[this._stateMenu.selectResult.selectedId].status;
        //var selectedText = this._typeMenu.selectResult.text;
        this.curList = G_WithDrawControl.getConfig().getRecordListInfo(typeId,stateId,this.curBeginTimeDate,this.curEndTimeDate);
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
        var now = new Date(); //当前日期
        var nowDayOfWeek = now.getDay()-1; //今天本周的第几天
        var nowDay = now.getDate(); //当前日
        var nowMonth = now.getMonth(); //当前月
        var nowYear = now.getFullYear(); //当前年
        nowYear += (nowYear < 2000) ? 1900 : 0;
        var lastMonthDate = new Date(); //上月日期
        lastMonthDate.setDate(1);
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
        var lastYear = lastMonthDate.getFullYear();       
        var lastMonth = lastMonthDate.getMonth();
        let begin = null;
        let end = null;
        if(this.dateType == 1)
        {
            begin =  new Date(nowYear-3, lastMonth, 1);
            end = new Date();
            this.curBeginTimeDate = begin.getTime();
            this.curEndTimeDate = end.getTime();
        }
       else if(this.dateType == 2)  //2.昨日
       {
            begin =  new Date(nowYear, nowMonth, nowDay-1);      
            end = new Date(nowYear, nowMonth, nowDay);
            this.curBeginTimeDate = begin.getTime();
            this.curEndTimeDate = end.getTime();
       }
       else if(this.dateType == 3)  //3.今日
       {
            begin = new Date(nowYear, nowMonth, nowDay);      
            end = new Date();
            this.curBeginTimeDate = begin.getTime();
            this.curEndTimeDate = end.getTime();
       } 
       else if(this.dateType == 4)  //4.上周
       {
            begin =  new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);      
            end = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
            this.curBeginTimeDate = begin.getTime();
            this.curEndTimeDate = end.getTime();

       }else if(this.dateType == 5)  //5.上月
       {
           if(lastMonth==11){
               begin = new Date(nowYear-1, lastMonth, 1);
               end = new Date(nowYear-1, lastMonth, this.getMonthDays(nowYear,lastMonth));
            }else{
                begin = new Date(nowYear, lastMonth, 1);
                end = new Date(nowYear-1, lastMonth, this.getMonthDays(nowYear,lastMonth));
            }    
            this.curBeginTimeDate = begin.getTime();
            this.curEndTimeDate = end.getTime();
       } 
    //    console.log("type ",this.dateType);
    //    console.log("begin ",begin);
    //    console.log("end ",end);
    }

    formatDate(date) {
        var myyear = date.getFullYear();
        var mymonth = date.getMonth() + 1;
        var myweekday = date.getDate();
        if (mymonth < 10) {
            mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
            myweekday = "0" + myweekday;
        }
        return (myyear + "-" + mymonth + "-" + myweekday);
    }

    //获得某月的天数
    getMonthDays(nowYear,myMonth) {
        let monthStartDate = new Date(nowYear, myMonth, 1);
        let monthEndDate = new Date(nowYear, myMonth + 1, 1);
        let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
        return days;
    }

    onListRender(item: cc.Node, idx: number) {
        //console.log("item   ",this.curList.length);
        //console.log("idx   ",idx);
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        if(this.curList.length > idx)
        {
            let cur = this.curList[idx]
            //item.strin = idx;
            item.getChildByName("label_0").getComponent(cc.Label).string = parseInt(cur.amount).toFixed(2);
            item.getChildByName("label_1").getComponent(cc.Label).string = G_WithDrawControl.getConfig().ServerTypeConfig[cur.account_type].name;
            item.getChildByName("label_2").getComponent(cc.Label).string = G_WithDrawControl.getConfig().ServerStateConfig[cur.status].name;
            item.getChildByName("label_3").getComponent(cc.Label).string = cur.created_at
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
            console.log("cur  ",cur);
            this.detail_MoneyText.string = parseInt(cur.amount).toFixed(2);
            this.detail_OrderText.string = cur.order_no.toString();
            this.detail_StateText.string = G_WithDrawControl.getConfig().ServerStateConfig[cur.status].name;
            this.detail_TimeText.string = cur.created_at
            this.detail_TypeText.string = G_WithDrawControl.getConfig().ServerTypeConfig[cur.account_type].name;
            this.detail_DescText.string = "";
        }
    }

    onDetailClose()
    {
        this.mainObj.active = true;
        this.detailObj.active =false;
    }

}
