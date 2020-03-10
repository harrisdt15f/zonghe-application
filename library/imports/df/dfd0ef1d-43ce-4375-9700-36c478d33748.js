"use strict";
cc._RF.push(module, 'dfd0e8dQ85DdZcANsR40zdI', 'WashRewardPanel');
// Script/Hall/Promote/WashRewardPanel.ts

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
var PromoteControl_1 = require("../../Controller/PromoteControl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WashRewardPanel = /** @class */ (function (_super) {
    __extends(WashRewardPanel, _super);
    function WashRewardPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        // @property(cc.Node)
        // typeList : cc.Node = null;
        // @property(cc.Node)
        // btnChaXun : cc.Node = null;
        _this.bottomLbParent = null;
        //private _typeMenu = null;
        //private _updateQueryFlag = false;
        _this.curList = null;
        _this.curBeginTimeDate = null;
        _this.curEndTimeDate = null;
        _this.dateType = 1;
        return _this;
    }
    WashRewardPanel.prototype.onLoad = function () {
        // this.btnChaXun.on(cc.Node.EventType.TOUCH_END, this.onChaXun.bind(this));
        // //this.list.numItems = 2;
        // if(this.typeList){
        //     this._typeMenu = this.typeList.getComponent("MyPulldownMenu")
        //     this._typeMenu.menuData =  G_PromoteControl.getConfig().getCurUnderLabelStr(-1);
        //     var _length = G_PromoteControl.getConfig().getCurUnderLabelStr(-1).length;
        //     if(_length >=8)
        //     {
        //         this._typeMenu.list.node.height = 37 * 8;
        //     }else
        //     {
        //         this._typeMenu.list.node.height = _length > 0 ? (37*_length):37;
        //     }
        //     var selectedId = this._typeMenu.selectResult.selectedId;
        //     var selectedText = this._typeMenu.selectResult.text;
        //     console.log("选择了什么》》",selectedId,selectedText)
        // }
    };
    WashRewardPanel.prototype.onEnable = function () {
        PromoteControl_1.G_PromoteControl.requesWashRewardMsg(function (ret) {
            // this.showInfo();
        }.bind(this));
        this.showInfo();
    };
    /**
    onChaXun(){
        this._updateQueryFlag = true;
        this.list.content.removeAllChildren();
        console.log("this._typeMenu.selectResult.selectedId   ",this._typeMenu.selectResult.selectedId);
        
        var _type = G_PromoteControl.getConfig().underLabelConfig[this._typeMenu.selectResult.selectedId].index;
        this.curList = G_PromoteControl.getConfig().getWashRewardListInfo(_type,this.curBeginTimeDate,this.curEndTimeDate);
        this.list.numItems = this.curList.length;
        let _score = 0;
        let _scoreColor = "";
        let _reward = 0;
        let _rewardColor = "";
        this.curList.forEach(element => {
            _score = _score + element.score;
            _reward = _reward + element.reward;
        });
        this.bottomLbParent.getChildByName("label_1").getComponent(cc.Label).string = this.curList.length+G_Language.get("underNumRecord");
        if(_score < 0)  //减少
        {
            _scoreColor = "37CC6E"
        }else
        {
            _scoreColor = "DF0F39"
        }
        if(_reward < 0)  //减少
        {
            _rewardColor = "37CC6E"
        }else
        {
            _rewardColor = "DF0F39"
        }
        this.bottomLbParent.getChildByName("label_2").getComponent(cc.RichText).string = "<color =#" +_scoreColor +">"+_score.toFixed(2) +"</color>"
        this.bottomLbParent.getChildByName("label_3").getComponent(cc.RichText).string = "<color =#" +_rewardColor +">"+_reward.toFixed(2) +"</color>"
    } */
    WashRewardPanel.prototype.showInfo = function () {
        this.getTimeDate();
        //  this.onChaXun();  
    };
    WashRewardPanel.prototype.onToggleClick = function (event) {
        console.log("event.name:", event.target._localZOrder);
        this.dateType = event.target._localZOrder; //1.全部 2.昨日 3.今日 4.上周 5.上月
        this.getTimeDate();
    };
    WashRewardPanel.prototype.getTimeDate = function () {
        Utils_1.G_Utils.getTimeDate(this.dateType, function (begin, end) {
            this.curBeginTimeDate = begin;
            this.curEndTimeDate = end;
            this.curList = PromoteControl_1.G_PromoteControl.getConfig().getWashRewardListInfo(this.curBeginTimeDate, this.curEndTimeDate);
            this.list.numItems = this.curList.length;
            if (this.curList.length > 0) {
                var _bet_1 = 0;
                var _money_1 = 0;
                this.curList.forEach(function (element) {
                    _bet_1 = _bet_1 + element.bet;
                    _money_1 = _money_1 + element.money;
                });
                this.bottomLbParent.getChildByName("label_1").getComponent(cc.RichText).string = "<color =#DF0F39>" + _bet_1.toFixed(2) + "</color>";
                this.bottomLbParent.getChildByName("label_3").getComponent(cc.RichText).string = "<color =#DF0F39>" + _money_1.toFixed(2) + "</color>";
            }
            else {
                this.bottomLbParent.getChildByName("label_1").getComponent(cc.RichText).string = "";
                this.bottomLbParent.getChildByName("label_3").getComponent(cc.RichText).string = "";
            }
        }.bind(this));
    };
    WashRewardPanel.prototype.onListRender = function (item, idx) {
        //console.log("item   ",this.curList.length);
        //console.log("idx   ",idx);
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        if (this.curList.length > idx) {
            var cur = this.curList[idx];
            item.getChildByName("label_0").getComponent(cc.RichText).string = cur.name.toString();
            item.getChildByName("label_1").getComponent(cc.RichText).string = "<color =#DF0F39>" + cur.bet.toFixed(2) + "</color>";
            item.getChildByName("label_2").getComponent(cc.RichText).string = Math.floor(cur.pro * 100) + "%";
            item.getChildByName("label_3").getComponent(cc.RichText).string = "<color =#DF0F39>" + cur.money.toFixed(2) + "</color>";
            item.getChildByName("label_4").getComponent(cc.RichText).string = cur.created_at;
        }
    };
    WashRewardPanel.prototype.onRequestData = function (item, idx) {
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
    ], WashRewardPanel.prototype, "list", void 0);
    __decorate([
        property(cc.Node)
    ], WashRewardPanel.prototype, "bottomLbParent", void 0);
    WashRewardPanel = __decorate([
        ccclass
    ], WashRewardPanel);
    return WashRewardPanel;
}(cc.Component));
exports.default = WashRewardPanel;

cc._RF.pop();