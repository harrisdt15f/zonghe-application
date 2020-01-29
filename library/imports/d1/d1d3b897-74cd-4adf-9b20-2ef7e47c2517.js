"use strict";
cc._RF.push(module, 'd1d3biXdM1K35sgLvfkfCUX', 'TeamManagetPanel');
// Script/Hall/Generalize/TeamManagetPanel.ts

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
var UiForms_1 = require("../../Tool/UiForms");
var Utils_1 = require("../../Tool/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TeamManagetPanel = /** @class */ (function (_super) {
    __extends(TeamManagetPanel, _super);
    function TeamManagetPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        _this._updateQueryFlag = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    TeamManagetPanel.prototype.onLoad = function () {
        this.list.numItems = 10;
        var beginTime = this.node.getChildByName("beginTime");
        var endTime = this.node.getChildByName("endTime");
        var myEditbox = this.node.getChildByName("myEditbox");
        var classEdithbox = myEditbox.getComponent("MyEditbox");
        classEdithbox.onDidEndedCallback = function (target) {
            console.log("输入结束》》");
        };
        classEdithbox.onTextChangedCallback = function (target) {
            console.log("录入》》");
        };
        Utils_1.G_Utils.onClickEnd(beginTime, this.onTimeSelectBeginByEnd, this);
        Utils_1.G_Utils.onClickEnd(endTime, this.onTimeSelectBeginByEnd, this);
        var bottomHeadline = this.node.getChildByName("bottomHeadline");
        for (var index = 0; index < 5; index++) {
            var labtxt = bottomHeadline.getChildByName("label_" + index);
            labtxt.getComponent(cc.Label).string = "+" + index;
        }
        var btnChaXun = this.node.getChildByName("btnChaXun");
        Utils_1.G_Utils.onClickEnd(btnChaXun, this.onChaXun, this);
    };
    TeamManagetPanel.prototype.start = function () {
    };
    TeamManagetPanel.prototype.onEnable = function () {
    };
    // update (dt) {}
    TeamManagetPanel.prototype.onListRender = function (item, idx) {
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        for (var i = 0; i < 6; i++) {
            var labStr = item.getChildByName("label_" + i);
            labStr.getComponent(cc.Label).string = "cs" + idx;
        }
    };
    TeamManagetPanel.prototype.onRequestData = function (item, idx) {
        if (this.list.numItems >= 99) {
            return;
        }
        if (this._updateQueryFlag) {
            this._updateQueryFlag = false;
            return;
        }
        this.list.numItems += 10;
    };
    TeamManagetPanel.prototype.onChaXun = function (event) {
        this._updateQueryFlag = true;
        this.list.content.removeAllChildren();
        this.list.numItems = 1;
        console.log("更新》》？");
    };
    TeamManagetPanel.prototype.onTimeSelectBeginByEnd = function (event) {
        console.log("》》》", event.target.name);
        UiForms_1.G_UiForms.uiPickView();
    };
    TeamManagetPanel.prototype.onTextChanged = function (event) {
        console.log("输入了什么》》》", event.string);
    };
    __decorate([
        property(List_1.default)
    ], TeamManagetPanel.prototype, "list", void 0);
    TeamManagetPanel = __decorate([
        ccclass
    ], TeamManagetPanel);
    return TeamManagetPanel;
}(cc.Component));
exports.default = TeamManagetPanel;

cc._RF.pop();