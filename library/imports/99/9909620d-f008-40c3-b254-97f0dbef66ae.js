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
var Language_1 = require("../../Language/Language");
var List_1 = require("../../Common/List");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DetailPanel = /** @class */ (function (_super) {
    __extends(DetailPanel, _super);
    function DetailPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        _this.menuList = null;
        // private classMenu = null;
        _this._myPulldownMenu = null;
        _this._updateQueryFlag = false;
        return _this;
    }
    DetailPanel.prototype.onLoad = function () {
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
    DetailPanel.prototype.start = function () {
    };
    // update (dt) {}
    DetailPanel.prototype.onEnable = function () {
    };
    DetailPanel.prototype.onChaXun = function (event) {
        this._updateQueryFlag = true;
        this.list.content.removeAllChildren();
        this.list.numItems = 1;
        var selectedId = this._myPulldownMenu.selectResult.selectedId;
        var selectedText = this._myPulldownMenu.selectResult.text;
        console.log("选择了什么》》", selectedId, selectedText);
    };
    DetailPanel.prototype.onAreaInCallback = function () {
    };
    DetailPanel.prototype.onListRender = function (item, idx) {
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        for (var i = 0; i < 4; i++) {
            var labStr = item.getChildByName("label_" + i);
            labStr.getComponent(cc.Label).string = "csdd" + idx;
        }
    };
    DetailPanel.prototype.onRequestData = function (item, idx) {
        if (this.list.numItems >= 99) {
            return;
        }
        if (this._updateQueryFlag) {
            this._updateQueryFlag = false;
            return;
        }
        this.list.numItems += 10;
    };
    DetailPanel.prototype.onToggleClick = function (event) {
        console.log("event.name:", event.target.name);
    };
    __decorate([
        property(List_1.default)
    ], DetailPanel.prototype, "list", void 0);
    __decorate([
        property(cc.Node)
    ], DetailPanel.prototype, "menuList", void 0);
    DetailPanel = __decorate([
        ccclass
    ], DetailPanel);
    return DetailPanel;
}(cc.Component));
exports.default = DetailPanel;

cc._RF.pop();