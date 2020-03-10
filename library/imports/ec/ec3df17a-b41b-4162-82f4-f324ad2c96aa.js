"use strict";
cc._RF.push(module, 'ec3dfF6tBtBYoL08yStLJaq', 'PromoteRewardPanel');
// Script/Hall/Promote/PromoteRewardPanel.ts

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
var Utils_1 = require("../../Tool/Utils");
var PromoteControl_1 = require("../../Controller/PromoteControl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PromoteRewardPanel = /** @class */ (function (_super) {
    __extends(PromoteRewardPanel, _super);
    function PromoteRewardPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        _this.typeList = null;
        _this.btnChaXun = null;
        _this.bottomLbParent = null;
        // private classMenu = null;
        _this._typeMenu = null;
        _this._updateQueryFlag = false;
        _this.curList = null;
        _this.curBeginTimeDate = null;
        _this.curEndTimeDate = null;
        _this.dateType = 1;
        return _this;
    }
    PromoteRewardPanel.prototype.onLoad = function () {
        // let btnChaXun = this.node.getChildByName("btnChaXun")
        this.btnChaXun.on(cc.Node.EventType.TOUCH_END, this.onChaXun.bind(this));
        //this.list.numItems = 2;
        if (this.typeList) {
            this._typeMenu = this.typeList.getComponent("MyPulldownMenu");
            this._typeMenu.menuData = PromoteControl_1.G_PromoteControl.getConfig().getCurUnderLabelStr(-1);
            var _length = PromoteControl_1.G_PromoteControl.getConfig().getCurUnderLabelStr(-1).length;
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
    PromoteRewardPanel.prototype.onEnable = function () {
        PromoteControl_1.G_PromoteControl.requesProRewardMsg(function (ret) {
            //  this.showInfo();
        }.bind(this));
        this.showInfo();
    };
    PromoteRewardPanel.prototype.onChaXun = function () {
        this._updateQueryFlag = true;
        this.list.content.removeAllChildren();
        console.log("this._typeMenu.selectResult.selectedId   ", this._typeMenu.selectResult.selectedId);
        var _type = PromoteControl_1.G_PromoteControl.getConfig().underLabelConfig[this._typeMenu.selectResult.selectedId].index;
        this.curList = PromoteControl_1.G_PromoteControl.getConfig().getProRewardListInfo(_type, this.curBeginTimeDate, this.curEndTimeDate);
        this.list.numItems = this.curList.length;
        if (this.curList.length > 0) {
            var _score_1 = 0;
            var _scoreColor = "";
            var _reward_1 = 0;
            var _rewardColor = "";
            this.curList.forEach(function (element) {
                _score_1 = _score_1 + element.score;
                _reward_1 = _reward_1 + element.reward;
            });
            if (_score_1 < 0) //减少
             {
                _scoreColor = "37CC6E";
            }
            else {
                _scoreColor = "DF0F39";
            }
            if (_reward_1 < 0) //减少
             {
                _rewardColor = "37CC6E";
            }
            else {
                _rewardColor = "DF0F39";
            }
            this.bottomLbParent.getChildByName("label_1").getComponent(cc.Label).string = this.curList.length + Language_1.G_Language.get("underNumRecord");
            this.bottomLbParent.getChildByName("label_2").getComponent(cc.RichText).string = "<color =#" + _scoreColor + ">" + _score_1.toFixed(2) + "</color>";
            this.bottomLbParent.getChildByName("label_3").getComponent(cc.RichText).string = "<color =#" + _rewardColor + ">" + _reward_1.toFixed(2) + "</color>";
        }
        else {
            this.bottomLbParent.getChildByName("label_1").getComponent(cc.Label).string = "";
            this.bottomLbParent.getChildByName("label_2").getComponent(cc.RichText).string = "";
            this.bottomLbParent.getChildByName("label_3").getComponent(cc.RichText).string = "";
        }
    };
    PromoteRewardPanel.prototype.showInfo = function () {
        this.getTimeDate();
        this.onChaXun();
    };
    PromoteRewardPanel.prototype.onToggleClick = function (event) {
        console.log("event.name:", event.target._localZOrder);
        this.dateType = event.target._localZOrder; //1.全部 2.昨日 3.今日 4.上周 5.上月
        this.getTimeDate();
    };
    PromoteRewardPanel.prototype.getTimeDate = function () {
        Utils_1.G_Utils.getTimeDate(this.dateType, function (begin, end) {
            this.curBeginTimeDate = begin;
            this.curEndTimeDate = end;
        }.bind(this));
    };
    PromoteRewardPanel.prototype.onListRender = function (item, idx) {
        //console.log("item   ",this.curList.length);
        //console.log("idx   ",idx);
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        if (this.curList.length > idx) {
            var cur = this.curList[idx];
            var _color = "";
            var labStr = "";
            if (cur.score < 0) //减少
             {
                _color = "37CC6E";
                labStr = cur.score.toFixed(2);
            }
            else {
                _color = "DF0F39";
                labStr = cur.score.toFixed(2);
            }
            item.getChildByName("label_0").getComponent(cc.RichText).string = cur.id.toString();
            item.getChildByName("label_1").getComponent(cc.Label).string = PromoteControl_1.G_PromoteControl.getConfig().getCurUnderLabelStr(cur.level);
            item.getChildByName("label_2").getComponent(cc.RichText).string = "<color =#" + _color + ">" + labStr + "</color>";
            item.getChildByName("label_3").getComponent(cc.RichText).string = "<color =#DF0F39>" + cur.reward.toFixed(2) + "</color>";
            item.getChildByName("label_4").getComponent(cc.Label).string = cur.created_at;
        }
    };
    PromoteRewardPanel.prototype.onRequestData = function (item, idx) {
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
    ], PromoteRewardPanel.prototype, "list", void 0);
    __decorate([
        property(cc.Node)
    ], PromoteRewardPanel.prototype, "typeList", void 0);
    __decorate([
        property(cc.Node)
    ], PromoteRewardPanel.prototype, "btnChaXun", void 0);
    __decorate([
        property(cc.Node)
    ], PromoteRewardPanel.prototype, "bottomLbParent", void 0);
    PromoteRewardPanel = __decorate([
        ccclass
    ], PromoteRewardPanel);
    return PromoteRewardPanel;
}(cc.Component));
exports.default = PromoteRewardPanel;

cc._RF.pop();