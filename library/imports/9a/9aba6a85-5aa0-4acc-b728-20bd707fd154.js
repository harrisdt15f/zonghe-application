"use strict";
cc._RF.push(module, '9aba6qFWqBKzLcoIL1wf9FU', 'AgencyYieldPanel');
// Script/Hall/Generalize/AgencyYieldPanel.ts

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
var AgencyYieldPanel = /** @class */ (function (_super) {
    __extends(AgencyYieldPanel, _super);
    function AgencyYieldPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        _this.menuListGrantType = null;
        _this.menuListGameType = null;
        _this.menuListGrantState = null;
        _this._updateQueryFlag = false;
        _this._myMenuGrantType = null;
        _this._myMenuGameType = null;
        _this._myMenuGrantState = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    AgencyYieldPanel.prototype.onLoad = function () {
        var beginTime = this.node.getChildByName("beginTime");
        var endTime = this.node.getChildByName("endTime");
        beginTime.on(cc.Node.EventType.TOUCH_END, this.onTimeSelectBeginByEnd.bind(this));
        endTime.on(cc.Node.EventType.TOUCH_END, this.onTimeSelectBeginByEnd.bind(this));
        var btnChaXun = this.node.getChildByName("btnChaXun");
        btnChaXun.on(cc.Node.EventType.TOUCH_END, this.onChaXun.bind(this));
        this.list.numItems = 10;
        if (this.menuListGrantType) {
            this._myMenuGrantType = this.menuListGrantType.getComponent("MyPulldownMenu");
            this._myMenuGrantType.menuData = Language_1.G_Language.get("accountTypeList");
            var selectedId = this._myMenuGrantType.selectResult.selectedId;
            var selectedText = this._myMenuGrantType.selectResult.text;
        }
        if (this.menuListGameType) {
            this._myMenuGameType = this.menuListGameType.getComponent("MyPulldownMenu");
            this._myMenuGameType.menuData = Language_1.G_Language.get("accountTypeList");
            var selectedId = this._myMenuGameType.selectResult.selectedId;
            var selectedText = this._myMenuGameType.selectResult.text;
        }
        if (this.menuListGrantState) {
            this._myMenuGrantState = this.menuListGrantState.getComponent("MyPulldownMenu");
            this._myMenuGrantState.menuData = Language_1.G_Language.get("accountTypeList");
            var selectedId = this._myMenuGrantState.selectResult.selectedId;
            var selectedText = this._myMenuGrantState.selectResult.text;
        }
    };
    AgencyYieldPanel.prototype.start = function () {
    };
    // update (dt) {}
    AgencyYieldPanel.prototype.onEnable = function () {
    };
    AgencyYieldPanel.prototype.onListRender = function (item, idx) {
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        for (var i = 0; i < 5; i++) {
            var labStr = item.getChildByName("label_" + i);
            labStr.getComponent(cc.Label).string = "cs" + idx;
        }
    };
    AgencyYieldPanel.prototype.onRequestData = function (item, idx) {
        if (this.list.numItems >= 99) {
            return;
        }
        if (this._updateQueryFlag) {
            this._updateQueryFlag = false;
            return;
        }
        this.list.numItems += 10;
    };
    AgencyYieldPanel.prototype.onToggleClick = function (event) {
        console.log("event.name:", event.target.name);
    };
    AgencyYieldPanel.prototype.onChaXun = function (event) {
        this._updateQueryFlag = true;
        this.list.content.removeAllChildren();
        this.list.numItems = 1;
        // var selectedId = this._myPulldownMenu.selectResult.selectedId;
        // var selectedText = this._myPulldownMenu.selectResult.text;
        // console.log("选择了什么》》",selectedId,selectedText)
    };
    AgencyYieldPanel.prototype.onTimeSelectBeginByEnd = function (event) {
        UiForms_1.G_UiForms.uiPickView();
    };
    //仅处理 下拉列表层级，
    AgencyYieldPanel.prototype.onClickMenu = function (target, flag) {
        if (flag) {
            switch (target.name) {
                case "menuGrantType":
                    this.menuListGrantType.zIndex = 3;
                    this.menuListGameType.zIndex = 2;
                    this.menuListGrantState.zIndex = 1;
                    break;
                case "menuGameType":
                    this.menuListGrantType.zIndex = 2;
                    this.menuListGameType.zIndex = 3;
                    this.menuListGrantState.zIndex = 1;
                    break;
                case "menuGrantState":
                    this.menuListGrantType.zIndex = 1;
                    this.menuListGameType.zIndex = 2;
                    this.menuListGrantState.zIndex = 3;
                    break;
                default:
                    break;
            }
        }
    };
    __decorate([
        property(List_1.default)
    ], AgencyYieldPanel.prototype, "list", void 0);
    __decorate([
        property(cc.Node)
    ], AgencyYieldPanel.prototype, "menuListGrantType", void 0);
    __decorate([
        property(cc.Node)
    ], AgencyYieldPanel.prototype, "menuListGameType", void 0);
    __decorate([
        property(cc.Node)
    ], AgencyYieldPanel.prototype, "menuListGrantState", void 0);
    AgencyYieldPanel = __decorate([
        ccclass
    ], AgencyYieldPanel);
    return AgencyYieldPanel;
}(cc.Component));
exports.default = AgencyYieldPanel;

cc._RF.pop();