import { G_Language } from '../../Language/Language';
import List from '../../Common/List';
import { G_UserControl } from '../../Controller/UserControl';
import { G_Utils } from '../../Tool/Utils';
import { G_PayControl } from '../../Controller/PayControl';

const {ccclass, property} = cc._decorator;

@ccclass
export default class RecordPanel extends cc.Component {


    @property(List)
    list : List = null;
    @property(cc.Node)
    typeList : cc.Node = null;
    @property(cc.Node)
    btnChaXun : cc.Node = null;

    // private classMenu = null;
    private _typeMenu = null;
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
           // G_PayControl.getPayConfig().getAccountTypeValueList()
            this._typeMenu.menuData =  G_PayControl.getPayConfig().getAccountTypeValueList()
            var _length = G_PayControl.getPayConfig().getAccountTypeValueList().length;
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

    }

    onEnable()
    {
        G_PayControl.requesAccountRecord(function(ret){         
            this.showInfo();
        }.bind(this));
    }

    onChaXun(){
        this._updateQueryFlag = true;
        this.list.content.removeAllChildren();
        console.log("this._typeMenu.selectResult.selectedId   ",this._typeMenu.selectResult.selectedId);
        
        var _type = G_PayControl.getPayConfig().getCurAccountSign(this._typeMenu.selectResult.selectedId);
        this.curList = G_PayControl.getPayConfig().getRecordListInfo(_type,this.curBeginTimeDate,this.curEndTimeDate);
        this.list.numItems = this.curList.length;
    }

    showInfo(){
        this.getTimeDate();   
        this.onChaXun();  
    }

    onToggleClick(event){
        console.log("event.name:",event.target._localZOrder)
        this.dateType =  event.target._localZOrder;    //1.全部 2.昨日 3.今日 4.上周 5.上月
        this.getTimeDate();        
    }

    getTimeDate()
    {
        G_Utils.getTimeDate(this.dateType,function(begin,end){
            this.curBeginTimeDate = begin;
            this.curEndTimeDate = end;
        }.bind(this));
    }

    /*
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

    //获得某月的天数
    getMonthDays(nowYear,myMonth) {
        let monthStartDate = new Date(nowYear, myMonth, 1);
        let monthEndDate = new Date(nowYear, myMonth + 1, 1);
        let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
        return days;
    }
    */

    onListRender(item: cc.Node, idx: number) {
        //console.log("item   ",this.curList.length);
        //console.log("idx   ",idx);
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        if(this.curList.length > idx)
        {
            let cur = this.curList[idx]
            console.log("cur   ",cur);
            let _color = "";
            let labStr = "";
            if(cur.in_out == 2)  //减少
            {
                _color = "37CC6E"
                labStr = "-"+parseFloat(cur.amount).toFixed(2);
            }else
            {
                _color = "DF0F39"
                labStr = "+"+parseFloat(cur.amount).toFixed(2);
            }
            item.getChildByName("label_0").getComponent(cc.RichText).string = "<color =#" +_color +">"+labStr +"</color>"
            item.getChildByName("label_1").getComponent(cc.Label).string = G_PayControl.getPayConfig().getCurAccoutSignValue(cur.type_sign);
            item.getChildByName("label_2").getComponent(cc.Label).string = parseInt(cur.balance).toFixed(2);
            item.getChildByName("label_3").getComponent(cc.Label).string = cur.created_at
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

}
