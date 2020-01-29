"use strict";
cc._RF.push(module, '59ffaKUUNlLZZL2AAMdIcRp', 'UIPickerView');
// Script/Hall/UIPickerView/UIPickerView.ts

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
// import AtOncePanel from '../Withdraw/AtOncePanel';
var Utils_1 = require("../../Tool/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIPickerView = /** @class */ (function (_super) {
    __extends(UIPickerView, _super);
    function UIPickerView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pickView = null;
        _this.done = false;
        _this.open = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    UIPickerView.prototype.onLoad = function () {
        var back = this.node.getChildByName("back");
        this.pickView = this.node.getChildByName("pickView");
        var panel = this.pickView.getChildByName("panel");
        var btn = panel.getChildByName("btn");
        var qx = btn.getChildByName("qx");
        var qd = btn.getChildByName("qd");
        Utils_1.G_Utils.onClickEnd(back, this.onClose, this);
        Utils_1.G_Utils.onClickEnd(qx, this.onClose, this);
        Utils_1.G_Utils.onClickEnd(qd, this.onOK, this);
        this.pickView.y = -400;
    };
    UIPickerView.prototype.start = function () {
    };
    UIPickerView.prototype.onEnable = function () {
        this.show();
    };
    // update (dt) {}
    UIPickerView.prototype.onClose = function () {
        this.show();
    };
    UIPickerView.prototype.onOK = function () {
        this.show();
    };
    UIPickerView.prototype.show = function () {
        if (this.done)
            return;
        this.done = true;
        this.open = !this.open;
        var callEnd = cc.callFunc(function () {
            this.done = false;
            if (!this.open)
                this.node.active = false;
        }, this);
        var y = this.open ? 0 : -400;
        var move = cc.moveTo(0.2, cc.v2(0, y));
        var seq = cc.sequence(move, callEnd);
        this.pickView.runAction(seq);
    };
    UIPickerView = __decorate([
        ccclass
    ], UIPickerView);
    return UIPickerView;
}(cc.Component));
exports.default = UIPickerView;

cc._RF.pop();