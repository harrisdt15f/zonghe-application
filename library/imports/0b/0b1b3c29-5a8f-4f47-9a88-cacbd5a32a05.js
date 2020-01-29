"use strict";
cc._RF.push(module, '0b1b3wpWo9PR5qIysvVoyoF', 'PayPanel');
// Script/Hall/shop/PayPanel.ts

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
var uiEvent_1 = require("../../Config/uiEvent");
var Utils_1 = require("../../Tool/Utils");
var UiForms_1 = require("../../Tool/UiForms");
var List_1 = require("../../Common/List");
/**
 * app 支付方式
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PayPanel = /** @class */ (function (_super) {
    __extends(PayPanel, _super);
    function PayPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wayList = null;
        _this.moneyList = null;
        _this.editBoxJinE = null;
        _this.jinEEditBox = null;
        _this.classEdithbox = null;
        return _this;
    }
    PayPanel.prototype.onLoad = function () {
        var btnRecharge = this.node.getChildByName("btnRecharge");
        btnRecharge.on(cc.Node.EventType.TOUCH_END, this.onChongZhi.bind(this));
        this.jinEEditBox = this.node.getChildByName("myEditbox");
        this.classEdithbox = this.jinEEditBox.getComponent("MyEditbox");
        this.wayList.numItems = 10;
        this.moneyList.numItems = 10;
    };
    PayPanel.prototype.start = function () {
    };
    PayPanel.prototype.onEnable = function () {
        // this.setChognZhiFanShi();
        // this.setChongZhiList();
    };
    PayPanel.prototype.onListRenderWay = function (item, idx) {
        if (!item)
            return;
        item.getChildByName("text").getComponent(cc.Label).string = idx.toString();
    };
    //当列表项被选择...
    PayPanel.prototype.onListSelectedWay = function (item, selectedId, lastSelectedId, val) {
        if (!item)
            return;
        console.log("选择了什么方式");
    };
    PayPanel.prototype.onListRenderMoney = function (item, idx) {
        if (!item)
            return;
        item.getChildByName("text").getComponent(cc.Label).string = idx.toString();
    };
    //当列表项被选择...
    PayPanel.prototype.onListSelectedMoney = function (item, selectedId, lastSelectedId, val) {
        if (!item)
            return;
        console.log("选择了充值金额");
        var strGold = item.getChildByName("text").getComponent(cc.Label).string;
        this.classEdithbox.getEdiboxComponent().string = strGold;
    };
    PayPanel.prototype.onChongZhi = function (event) {
        var str = this.classEdithbox.getEdiboxComponent().string;
        if (!Utils_1.G_Utils.isInteger(str)) {
            UiForms_1.G_UiForms.hint("pleaseEnterInteger");
            return;
        }
        OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.colseBox);
    };
    __decorate([
        property(List_1.default)
    ], PayPanel.prototype, "wayList", void 0);
    __decorate([
        property(List_1.default)
    ], PayPanel.prototype, "moneyList", void 0);
    __decorate([
        property(cc.EditBox)
    ], PayPanel.prototype, "editBoxJinE", void 0);
    PayPanel = __decorate([
        ccclass
    ], PayPanel);
    return PayPanel;
}(cc.Component));
exports.default = PayPanel;

cc._RF.pop();