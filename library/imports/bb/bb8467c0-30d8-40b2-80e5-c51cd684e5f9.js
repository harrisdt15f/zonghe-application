"use strict";
cc._RF.push(module, 'bb846fAMNhAsoDlxRzWhOX5', 'GainNode');
// Script/Hall/Activity/GainNode.ts

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
var Utils_1 = require("../../Tool/Utils");
var config_1 = require("../../Config/config");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GainNode = /** @class */ (function (_super) {
    __extends(GainNode, _super);
    function GainNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bx = null;
        _this.xczj = null;
        _this.gxhd = null;
        _this.iphone = null;
        _this.iwatch = null;
        _this.macbook = null;
        _this.car = null;
        _this.gold = null;
        _this.bgs = null;
        _this._dt = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    GainNode.prototype.onLoad = function () {
        Utils_1.G_Utils.onClickEnd(this.bgs, this.onClose, this);
    };
    GainNode.prototype.start = function () {
    };
    GainNode.prototype.onEnable = function () {
        this._dt = 0;
        // this.bx.active = false;
        this.xczj.active = false;
        this.gxhd.active = false;
        this.iphone.active = false;
        this.iwatch.active = false;
        this.macbook.active = false;
        this.car.active = false;
        this.gold.active = false;
    };
    GainNode.prototype.update = function (dt) {
        this._dt += dt;
        if (this._dt >= 4) {
            this.node.active = false;
        }
    };
    GainNode.prototype.openGain = function (data) {
        var list = data;
        for (var key in list) {
            var element = list[key];
            switch (Number(key)) {
                case config_1.RewardType.none:
                    this.xczj.active = true;
                    break;
                case config_1.RewardType.iphone:
                    this.gxhd.active = true;
                    this.iphone.active = true;
                    break;
                case config_1.RewardType.macbook:
                    this.gxhd.active = true;
                    this.macbook.active = true;
                    break;
                case config_1.RewardType.iwatch:
                    this.gxhd.active = true;
                    this.iwatch.active = true;
                    break;
                case config_1.RewardType.car:
                    this.gxhd.active = true;
                    this.car.active = true;
                    break;
                case config_1.RewardType.gold:
                    this.gxhd.active = true;
                    this.gold.active = true;
                    var txt = this.gold.getComponent(cc.Label);
                    txt.string = Utils_1.G_Utils.setStringOfUnit(element);
                    break;
                default:
                    break;
            }
        }
    };
    GainNode.prototype.onClose = function () {
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], GainNode.prototype, "bx", void 0);
    __decorate([
        property(cc.Node)
    ], GainNode.prototype, "xczj", void 0);
    __decorate([
        property(cc.Node)
    ], GainNode.prototype, "gxhd", void 0);
    __decorate([
        property(cc.Node)
    ], GainNode.prototype, "iphone", void 0);
    __decorate([
        property(cc.Node)
    ], GainNode.prototype, "iwatch", void 0);
    __decorate([
        property(cc.Node)
    ], GainNode.prototype, "macbook", void 0);
    __decorate([
        property(cc.Node)
    ], GainNode.prototype, "car", void 0);
    __decorate([
        property(cc.Node)
    ], GainNode.prototype, "gold", void 0);
    __decorate([
        property(cc.Node)
    ], GainNode.prototype, "bgs", void 0);
    GainNode = __decorate([
        ccclass
    ], GainNode);
    return GainNode;
}(cc.Component));
exports.default = GainNode;

cc._RF.pop();