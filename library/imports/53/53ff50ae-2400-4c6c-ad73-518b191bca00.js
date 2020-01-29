"use strict";
cc._RF.push(module, '53ff5CuJABMbK1zUYsZG8oA', 'TeamReportPanel');
// Script/Hall/Generalize/TeamReportPanel.ts

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
var UiForms_1 = require("../../Tool/UiForms");
var List_1 = require("../../Common/List");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TeamReportPanel = /** @class */ (function (_super) {
    __extends(TeamReportPanel, _super);
    function TeamReportPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        _this.menuList = null;
        _this.classMenu = null;
        _this._myPulldownMenu = null;
        _this._updateQueryFlag = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    TeamReportPanel.prototype.onLoad = function () {
        var beginTime = this.node.getChildByName("beginTime");
        var endTime = this.node.getChildByName("endTime");
        beginTime.on(cc.Node.EventType.TOUCH_END, this.onTimeSelectBeginByEnd.bind(this));
        endTime.on(cc.Node.EventType.TOUCH_END, this.onTimeSelectBeginByEnd.bind(this));
        var bottomHeadline = this.node.getChildByName("bottomHeadline");
        for (var index = 0; index < 5; index++) {
            var labtxt = bottomHeadline.getChildByName("label_" + index);
            labtxt.getComponent(cc.Label).string = "+" + index;
        }
        var myEditbox = this.node.getChildByName("myEditbox");
        var classEdithbox = myEditbox.getComponent("MyEditbox");
        classEdithbox.onDidEndedCallback = function (target) {
            console.log("输入结束》》");
        };
        classEdithbox.onTextChangedCallback = function (target) {
            console.log("录入》》");
        };
        var btnChaXun = this.node.getChildByName("btnChaXun");
        btnChaXun.on(cc.Node.EventType.TOUCH_END, this.onChaXun.bind(this));
        if (this.menuList) {
            this._myPulldownMenu = this.menuList.getComponent("MyPulldownMenu");
            this._myPulldownMenu.menuData = Language_1.G_Language.get("accountTypeList");
            var selectedId = this._myPulldownMenu.selectResult.selectedId;
            var selectedText = this._myPulldownMenu.selectResult.text;
        }
        this.list.numItems = 10;
    };
    TeamReportPanel.prototype.start = function () {
    };
    // update (dt) {}
    TeamReportPanel.prototype.onEnable = function () {
    };
    TeamReportPanel.prototype.onListRender = function (item, idx) {
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        for (var i = 0; i < 6; i++) {
            var labStr = item.getChildByName("label_" + i);
            labStr.getComponent(cc.Label).string = "csdd" + idx;
        }
    };
    TeamReportPanel.prototype.onRequestData = function (item, idx) {
        if (this.list.numItems >= 99) {
            return;
        }
        if (this._updateQueryFlag) {
            this._updateQueryFlag = false;
            return;
        }
        this.list.numItems += 10;
    };
    TeamReportPanel.prototype.onToggleClick = function (event) {
        console.log("event.name:", event.target.name);
    };
    TeamReportPanel.prototype.onChaXun = function (event) {
        this._updateQueryFlag = true;
        this.list.content.removeAllChildren();
        this.list.numItems = 1;
        var selectedId = this._myPulldownMenu.selectResult.selectedId;
        var selectedText = this._myPulldownMenu.selectResult.text;
    };
    TeamReportPanel.prototype.onTimeSelectBeginByEnd = function (event) {
        UiForms_1.G_UiForms.uiPickView();
    };
    TeamReportPanel.prototype.onAreaInCallback = function () {
        // this.classMenu.setScrollviewSelectActive()
        // this.areaInNode.active = false
    };
    __decorate([
        property(List_1.default)
    ], TeamReportPanel.prototype, "list", void 0);
    __decorate([
        property(cc.Node)
    ], TeamReportPanel.prototype, "menuList", void 0);
    TeamReportPanel = __decorate([
        ccclass
    ], TeamReportPanel);
    return TeamReportPanel;
}(cc.Component));
exports.default = TeamReportPanel;

cc._RF.pop();