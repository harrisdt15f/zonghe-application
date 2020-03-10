"use strict";
cc._RF.push(module, '99096IN8AhAw7JUl/Db72au', 'DetailPanel');
// Script/Hall/Withdraw/DetailPanel.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("../../Common/List");
var Utils_1 = require("../../Tool/Utils");
var PayControl_1 = require("../../Controller/PayControl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RecordPanel = /** @class */ (function (_super) {
    __extends(RecordPanel, _super);
    function RecordPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        _this.typeList = null;
        _this.btnChaXun = null;
        // private classMenu = null;
        _this._typeMenu = null;
        _this._updateQueryFlag = false;
        _this.curList = null;
        _this.curBeginTimeDate = null;
        _this.curEndTimeDate = null;
        _this.dateType = 1;
        return _this;
    }
    RecordPanel.prototype.onLoad = function () {
        // let btnChaXun = this.node.getChildByName("btnChaXun")
        this.btnChaXun.on(cc.Node.EventType.TOUCH_END, this.onChaXun.bind(this));
        //this.list.numItems = 2;
        if (this.typeList) {
            this._typeMenu = this.typeList.getComponent("MyPulldownMenu");
            // G_PayControl.getPayConfig().getAccountTypeValueList()
            this._typeMenu.menuData = PayControl_1.G_PayControl.getPayConfig().getAccountTypeValueList();
            var _length = PayControl_1.G_PayControl.getPayConfig().getAccountTypeValueList().length;
            if (_length >= 8) {
                this._typeMenu.list.node.height = 37 * 8;
            }
            else {
                this._typeMenu.list.node.height = _length > 0 ? (37 * _length) : 37;
            }
            var selectedId = this._typeMenu.selectResult.selectedId;
            var selectedText = this._typeMenu.selectResult.text;
            console.log("选择了什么》》", selectedId, selectedText);
        }
    };
    RecordPanel.prototype.onEnable = function () {
        PayControl_1.G_PayControl.requesAccountRecord(function (ret) {
            this.showInfo();
        }.bind(this));
    };
    RecordPanel.prototype.onChaXun = function () {
        this._updateQueryFlag = true;
        this.list.content.removeAllChildren();
        console.log("this._typeMenu.selectResult.selectedId   ", this._typeMenu.selectResult.selectedId);
        var _type = PayControl_1.G_PayControl.getPayConfig().getCurAccountSign(this._typeMenu.selectResult.selectedId);
        this.curList = PayControl_1.G_PayControl.getPayConfig().getRecordListInfo(_type, this.curBeginTimeDate, this.curEndTimeDate);
        this.list.numItems = this.curList.length;
    };
    RecordPanel.prototype.showInfo = function () {
        this.getTimeDate();
        this.onChaXun();
    };
    RecordPanel.prototype.onToggleClick = function (event) {
        console.log("event.name:", event.target._localZOrder);
        this.dateType = event.target._localZOrder; //1.全部 2.昨日 3.今日 4.上周 5.上月
        this.getTimeDate();
    };
    RecordPanel.prototype.getTimeDate = function () {
        Utils_1.G_Utils.getTimeDate(this.dateType, function (begin, end) {
            this.curBeginTimeDate = begin;
            this.curEndTimeDate = end;
        }.bind(this));
    };
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
    RecordPanel.prototype.onListRender = function (item, idx) {
        //console.log("item   ",this.curList.length);
        //console.log("idx   ",idx);
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        if (this.curList.length > idx) {
            var cur = this.curList[idx];
            console.log("cur   ", cur);
            var _color = "";
            var labStr = "";
            if (cur.in_out == 2) //减少
             {
                _color = "37CC6E";
                labStr = "-" + parseFloat(cur.amount).toFixed(2);
            }
            else {
                _color = "DF0F39";
                labStr = "+" + parseFloat(cur.amount).toFixed(2);
            }
            item.getChildByName("label_0").getComponent(cc.RichText).string = "<color =#" + _color + ">" + labStr + "</color>";
            item.getChildByName("label_1").getComponent(cc.Label).string = PayControl_1.G_PayControl.getPayConfig().getCurAccoutSignValue(cur.type_sign);
            item.getChildByName("label_2").getComponent(cc.Label).string = parseInt(cur.balance).toFixed(2);
            item.getChildByName("label_3").getComponent(cc.Label).string = cur.created_at;
        }
    };
    RecordPanel.prototype.onRequestData = function (item, idx) {
        // if (this.list.length >= 99){
        //     return;
        // }
        // if(this._updateQueryFlag){
        //     this._updateQueryFlag = false;
        //     return;
        // }
        // this.list.numItems += 10
    };
    __decorate([
        property(List_1.default)
    ], RecordPanel.prototype, "list", void 0);
    __decorate([
        property(cc.Node)
    ], RecordPanel.prototype, "typeList", void 0);
    __decorate([
        property(cc.Node)
    ], RecordPanel.prototype, "btnChaXun", void 0);
    RecordPanel = __decorate([
        ccclass
    ], RecordPanel);
    return RecordPanel;
}(cc.Component));
exports.default = RecordPanel;

cc._RF.pop();