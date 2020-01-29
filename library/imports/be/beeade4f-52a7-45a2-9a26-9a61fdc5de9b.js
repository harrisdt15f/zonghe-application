"use strict";
cc._RF.push(module, 'beead5PUqdFopommmH9xd6b', 'ReportPanel');
// Script/Hall/PlayerCenter/ReportPanel.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ReportPanel = /** @class */ (function (_super) {
    __extends(ReportPanel, _super);
    function ReportPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        _this.menuList = null;
        _this._updateQueryFlag = false;
        _this._myPulldownMenu = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    ReportPanel.prototype.onLoad = function () {
        // super.onLoad()
        // this.timeSelectFunc = function(event){
        //     console.log("选择 什么时间段条件",event)
        // };
        // this.typeSelectFunc = function(key){
        //     console.log("选择 什么类型条件"+key)
        // };
        var bottomHeadline = this.node.getChildByName("bottomHeadline");
        for (var index = 0; index < 4; index++) {
            var labTempTxt = bottomHeadline.getChildByName("label_" + index);
            labTempTxt.getComponent(cc.Label).string = "10000000.0" + index;
        }
        var btnChaXun = this.node.getChildByName("btnChaXun");
        btnChaXun.on(cc.Node.EventType.TOUCH_END, this.onChaXun.bind(this));
        this.list.numItems = 10;
        if (this.menuList) {
            this._myPulldownMenu = this.menuList.getComponent("MyPulldownMenu");
            this._myPulldownMenu.menuData = Language_1.G_Language.get("accountTypeList");
            var selectedId = this._myPulldownMenu.selectResult.selectedId;
            var selectedText = this._myPulldownMenu.selectResult.text;
            console.log("选择了什么》》", selectedId, selectedText);
        }
    };
    ReportPanel.prototype.start = function () {
    };
    // update (dt) {}
    ReportPanel.prototype.onEnable = function () {
    };
    ReportPanel.prototype.onListRender = function (item, idx) {
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        for (var i = 0; i < 5; i++) {
            var labStr = item.getChildByName("label_" + i);
            labStr.getComponent(cc.Label).string = "cs" + idx;
        }
    };
    ReportPanel.prototype.onRequestData = function (item, idx) {
        if (this.list.numItems >= 99) {
            return;
        }
        if (this._updateQueryFlag) {
            this._updateQueryFlag = false;
            return;
        }
        this.list.numItems += 10;
    };
    ReportPanel.prototype.onToggleClick = function (event) {
        console.log("event.name:", event.target.name);
    };
    ReportPanel.prototype.onChaXun = function (event) {
        this._updateQueryFlag = true;
        this.list.content.removeAllChildren();
        this.list.numItems = 1;
        var selectedId = this._myPulldownMenu.selectResult.selectedId;
        var selectedText = this._myPulldownMenu.selectResult.text;
        console.log("选择了什么》》", selectedId, selectedText);
    };
    __decorate([
        property(List_1.default)
    ], ReportPanel.prototype, "list", void 0);
    __decorate([
        property(cc.Node)
    ], ReportPanel.prototype, "menuList", void 0);
    ReportPanel = __decorate([
        ccclass
    ], ReportPanel);
    return ReportPanel;
}(cc.Component));
exports.default = ReportPanel;

cc._RF.pop();