"use strict";
cc._RF.push(module, '1e985oIozNEBLskkRdp37K5', 'RecordPanel');
// Script/Hall/Withdraw/RecordPanel.ts

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
var Language_1 = require("../../Language/Language");
var List_1 = require("../../Common/List");
var WithDrawControl_1 = require("../../Controller/WithDrawControl");
var Utils_1 = require("../../Tool/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RecordPanel = /** @class */ (function (_super) {
    __extends(RecordPanel, _super);
    function RecordPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        _this.typeList = null;
        _this.stateList = null;
        _this.btnChaXun = null;
        _this.mainObj = null;
        _this.detailObj = null;
        _this.detail_MoneyText = null;
        _this.detail_StateText = null;
        _this.detail_OrderText = null;
        _this.detail_TimeText = null;
        _this.detail_TypeText = null;
        _this.detail_DescText = null;
        // private classMenu = null;
        _this._typeMenu = null;
        _this._stateMenu = null;
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
            this._typeMenu.menuData = Language_1.G_Language.get("withDrawTypeList");
            var _length = Language_1.G_Language.get("withDrawTypeList").length;
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
        if (this.stateList) {
            this._stateMenu = this.stateList.getComponent("MyPulldownMenu");
            this._stateMenu.menuData = Language_1.G_Language.get("withDrawStateList");
            var _length = Language_1.G_Language.get("withDrawStateList").length;
            if (_length >= 8) {
                this._stateMenu.list.node.height = 37 * 8;
            }
            else {
                this._stateMenu.list.node.height = _length > 0 ? (37 * _length) : 37;
            }
            var selectedId = this._stateMenu.selectResult.selectedId;
            var selectedText = this._stateMenu.selectResult.text;
            console.log("选择了什么》》", selectedId, selectedText);
        }
    };
    RecordPanel.prototype.onEnable = function () {
        this.mainObj.active = true;
        this.detailObj.active = false;
        WithDrawControl_1.G_WithDrawControl.requesWithDrawRecord(function (ret) {
            this.showInfo();
        }.bind(this));
    };
    RecordPanel.prototype.onChaXun = function () {
        this._updateQueryFlag = true;
        this.list.content.removeAllChildren();
        var typeId = WithDrawControl_1.G_WithDrawControl.getConfig().withDrawTypeConfig[this._typeMenu.selectResult.selectedId].account_type;
        var stateId = WithDrawControl_1.G_WithDrawControl.getConfig().withDrawStateConfig[this._stateMenu.selectResult.selectedId].status;
        //var selectedText = this._typeMenu.selectResult.text;
        this.curList = WithDrawControl_1.G_WithDrawControl.getConfig().getRecordListInfo(typeId, stateId, this.curBeginTimeDate, this.curEndTimeDate);
        this.list.numItems = this.curList.length;
    };
    RecordPanel.prototype.showInfo = function () {
        this.getTimeDate();
        this.onChaXun();
    };
    RecordPanel.prototype.onToggleClick = function (event) {
        //console.log("event.name:",event.target._localZOrder)
        this.dateType = event.target._localZOrder; //1.全部 2.昨日 3.今日 4.上周 5.上月
        this.getTimeDate();
    };
    RecordPanel.prototype.getTimeDate = function () {
        Utils_1.G_Utils.getTimeDate(this.dateType, function (begin, end) {
            this.curBeginTimeDate = begin;
            this.curEndTimeDate = end;
        }.bind(this));
    };
    RecordPanel.prototype.onListRender = function (item, idx) {
        //console.log("item   ",this.curList.length);
        //console.log("idx   ",idx);
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        if (this.curList.length > idx) {
            var cur = this.curList[idx];
            //item.strin = idx;
            item.getChildByName("label_0").getComponent(cc.Label).string = parseInt(cur.amount).toFixed(2);
            item.getChildByName("label_1").getComponent(cc.Label).string = WithDrawControl_1.G_WithDrawControl.getConfig().ServerTypeConfig[cur.account_type].name;
            item.getChildByName("label_2").getComponent(cc.Label).string = WithDrawControl_1.G_WithDrawControl.getConfig().ServerStateConfig[cur.status].name;
            item.getChildByName("label_3").getComponent(cc.Label).string = cur.created_at;
            item.getChildByName("btn").name = idx.toString();
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
    RecordPanel.prototype.onDetailClick = function (event) {
        // console.log("event  ",event.target);
        // console.log("event  ",event.target._localZOrder);
        var idx = parseInt(event.target.name);
        if (this.curList.length > idx) {
            var cur = this.curList[idx];
            this.mainObj.active = false;
            this.detailObj.active = true;
            this.detail_MoneyText.string = parseInt(cur.amount).toFixed(2);
            this.detail_OrderText.string = cur.order_no.toString();
            this.detail_StateText.string = WithDrawControl_1.G_WithDrawControl.getConfig().ServerStateConfig[cur.status].name;
            this.detail_TimeText.string = cur.created_at;
            this.detail_TypeText.string = WithDrawControl_1.G_WithDrawControl.getConfig().ServerTypeConfig[cur.account_type].name;
            this.detail_DescText.string = "";
        }
    };
    RecordPanel.prototype.onDetailClose = function () {
        this.mainObj.active = true;
        this.detailObj.active = false;
    };
    __decorate([
        property(List_1.default)
    ], RecordPanel.prototype, "list", void 0);
    __decorate([
        property(cc.Node)
    ], RecordPanel.prototype, "typeList", void 0);
    __decorate([
        property(cc.Node)
    ], RecordPanel.prototype, "stateList", void 0);
    __decorate([
        property(cc.Node)
    ], RecordPanel.prototype, "btnChaXun", void 0);
    __decorate([
        property(cc.Node)
    ], RecordPanel.prototype, "mainObj", void 0);
    __decorate([
        property(cc.Node)
    ], RecordPanel.prototype, "detailObj", void 0);
    __decorate([
        property(cc.Label)
    ], RecordPanel.prototype, "detail_MoneyText", void 0);
    __decorate([
        property(cc.Label)
    ], RecordPanel.prototype, "detail_StateText", void 0);
    __decorate([
        property(cc.Label)
    ], RecordPanel.prototype, "detail_OrderText", void 0);
    __decorate([
        property(cc.Label)
    ], RecordPanel.prototype, "detail_TimeText", void 0);
    __decorate([
        property(cc.Label)
    ], RecordPanel.prototype, "detail_TypeText", void 0);
    __decorate([
        property(cc.Label)
    ], RecordPanel.prototype, "detail_DescText", void 0);
    RecordPanel = __decorate([
        ccclass
    ], RecordPanel);
    return RecordPanel;
}(cc.Component));
exports.default = RecordPanel;

cc._RF.pop();