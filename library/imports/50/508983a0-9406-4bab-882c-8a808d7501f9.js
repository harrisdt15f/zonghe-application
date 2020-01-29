"use strict";
cc._RF.push(module, '50898OglAZLq4gsioCNdQH5', 'AtOncePanel');
// Script/Hall/Withdraw/AtOncePanel.ts

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
var OnFire_1 = require("../../Net/OnFire");
var UiForms_1 = require("../../Tool/UiForms");
var uiEvent_1 = require("../../Config/uiEvent");
var IdentifyKey_1 = require("../../Config/IdentifyKey");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AtOncePanel = /** @class */ (function (_super) {
    __extends(AtOncePanel, _super);
    function AtOncePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.balance = null;
        //绑定
        _this.btnBangDing = null;
        //清除
        _this.btnClear = null;
        _this.btnSet = null;
        _this.labAccount = null;
        _this.myPulldownMenu = null;
        _this.myEditboxGolde = null;
        _this.labAnQuanMa = null;
        _this.myEditboxCode = null;
        _this.btnTiXian = null;
        _this.accountEditBox = null;
        return _this;
        // update (dt) {}
    }
    AtOncePanel.prototype.onLoad = function () {
        this.btnBangDing.on(cc.Node.EventType.TOUCH_END, this.onBangDing.bind(this));
        this.btnClear.on(cc.Node.EventType.TOUCH_END, this.onClear.bind(this));
        this.btnSet.on(cc.Node.EventType.TOUCH_END, this.onSet.bind(this));
        var classEdithbox = this.myEditboxGolde.getComponent("MyEditbox");
        classEdithbox.onDidEndedCallback = function (target) {
            console.log("输入结束》》");
        };
        classEdithbox.onTextChangedCallback = function (target) {
            console.log("录入》》");
        };
    };
    AtOncePanel.prototype.start = function () {
    };
    AtOncePanel.prototype.onEnable = function () {
    };
    AtOncePanel.prototype.onDestroy = function () {
        OnFire_1.G_OnFire.off(uiEvent_1.uiEventFunction.atOnceManage);
    };
    AtOncePanel.prototype.onBangDing = function () {
        UiForms_1.G_UiForms.setSelectPanelShow(IdentifyKey_1.TEXT_INFO.TX_bangding_quxiao_queding);
        OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.atOnceManage, false);
        UiForms_1.G_UiForms.hint("绑定了什么");
    };
    AtOncePanel.prototype.onClear = function () {
        this.myEditboxGolde.getComponent("MyEditbox").getEdiboxComponent().string = "";
    };
    AtOncePanel.prototype.onSet = function () {
        UiForms_1.G_UiForms.show(uiEvent_1.uiEventModules.setNode);
        UiForms_1.G_UiForms.setSelectPanelShow(IdentifyKey_1.TEXT_INFO.xiuGaiAnMa);
        OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.atOnceManage, false);
    };
    __decorate([
        property({
            type: cc.Label,
            tooltip: "账户余额"
        })
    ], AtOncePanel.prototype, "balance", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: "绑定账户"
        })
    ], AtOncePanel.prototype, "btnBangDing", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: "清除已输入的信息"
        })
    ], AtOncePanel.prototype, "btnClear", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: "设置安全码"
        })
    ], AtOncePanel.prototype, "btnSet", void 0);
    __decorate([
        property(cc.Node)
    ], AtOncePanel.prototype, "labAccount", void 0);
    __decorate([
        property(cc.Node)
    ], AtOncePanel.prototype, "myPulldownMenu", void 0);
    __decorate([
        property(cc.Node)
    ], AtOncePanel.prototype, "myEditboxGolde", void 0);
    __decorate([
        property(cc.Node)
    ], AtOncePanel.prototype, "labAnQuanMa", void 0);
    __decorate([
        property(cc.Node)
    ], AtOncePanel.prototype, "myEditboxCode", void 0);
    __decorate([
        property(cc.Node)
    ], AtOncePanel.prototype, "btnTiXian", void 0);
    AtOncePanel = __decorate([
        ccclass
    ], AtOncePanel);
    return AtOncePanel;
}(cc.Component));
exports.default = AtOncePanel;

cc._RF.pop();