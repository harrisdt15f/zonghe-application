"use strict";
cc._RF.push(module, '5c081/Gah9HZIABzQ7tIOAj', 'RouletteBox');
// Script/Hall/Activity/RouletteBox.ts

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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
var _m = cc._decorator, ccclass = _m.ccclass, property = _m.property;
var config_1 = require("../../Config/config");
var Utils_1 = require("../../Tool/Utils");
var rewardList = (_a = {},
    _a[0] = (_b = {},
        _b[config_1.RewardType.iphone] = 0,
        _b),
    _a[1] = (_c = {},
        _c[config_1.RewardType.gold] = 1,
        _c),
    _a[2] = (_d = {},
        _d[config_1.RewardType.none] = 0,
        _d),
    _a[3] = (_e = {},
        _e[config_1.RewardType.gold] = 99,
        _e),
    _a[4] = (_f = {},
        _f[config_1.RewardType.macbook] = 0,
        _f),
    _a[5] = (_g = {},
        _g[config_1.RewardType.gold] = 8,
        _g),
    _a[6] = (_h = {},
        _h[config_1.RewardType.gold] = 8888,
        _h),
    _a[7] = (_j = {},
        _j[config_1.RewardType.iwatch] = 0,
        _j),
    _a[8] = (_k = {},
        _k[config_1.RewardType.gold] = 588,
        _k),
    _a[9] = (_l = {},
        _l[config_1.RewardType.car] = 0,
        _l),
    _a);
var animationType;
(function (animationType) {
    animationType[animationType["rotate"] = 0] = "rotate";
    animationType[animationType["trailing"] = 1] = "trailing";
})(animationType || (animationType = {}));
var RouletteBox = /** @class */ (function (_super) {
    __extends(RouletteBox, _super);
    function RouletteBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actionType = animationType.rotate;
        _this.btnStart = null;
        _this.btnClose = null;
        _this.gainNode = null;
        _this.dial = null;
        _this.pointer = null;
        _this.dialTrailing = null;
        _this.inMotion = false;
        _this.tempAngle = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    RouletteBox.prototype.onLoad = function () {
        Utils_1.G_Utils.onClickEnd(this.btnClose, this.onClose, this);
        Utils_1.G_Utils.onClickEnd(this.btnStart, this.onStart, this);
    };
    RouletteBox.prototype.start = function () {
    };
    // update (dt) {}
    RouletteBox.prototype.onEnable = function () {
        this.pointer.active = this.actionType == animationType.rotate;
        this.dialTrailing.active = this.actionType == animationType.trailing;
        if (this.actionType == animationType.trailing)
            this.trailingInit();
    };
    RouletteBox.prototype.onStart = function () {
        if (this.inMotion) {
            return;
        }
        this.inMotion = true;
        this.btnStart.getComponent(cc.Button).interactable = false;
        var target = Utils_1.G_Utils.random(0, 9);
        switch (this.actionType) {
            case animationType.rotate:
                this.rotateAnimation(target);
                break;
            case animationType.trailing:
                this.trailingAnimation(target);
                break;
            default:
                break;
        }
    };
    RouletteBox.prototype.onDestroy = function () {
        this.btnStart.off(cc.Node.EventType.TOUCH_END, this.onStart, this);
        this.btnClose.off(cc.Node.EventType.TOUCH_END, this.onClose, this);
    };
    RouletteBox.prototype.onClose = function () {
        this.node.active = false;
    };
    RouletteBox.prototype.trailingInit = function () {
        if (!this.dialTrailing || this.dialTrailing.children.length <= 0)
            return;
        this.dialTrailing.children.forEach(function (item, idx) {
            item.opacity = 0;
        }, this);
        this.dialTrailing.children[0].opacity = 255;
    };
    /**
     * 拖尾光效动画
     *
     */
    RouletteBox.prototype.trailingAnimation = function (targetNum) {
        this.trailingInit();
        var condition = 6;
        var tiemCont = 0;
        while (condition) {
            var tempIdx = 0;
            var tempNum = condition == 1 ? targetNum : 9;
            for (var index = 0; index <= tempNum; index++) {
                tempIdx = index % 10;
                var dTime = (tiemCont / 10);
                // console.log("间隔时间》》",dTime)
                if (condition == 1 && targetNum == index) {
                    cc.tween(this.dialTrailing.children[tempIdx])
                        .delay(dTime)
                        .to(0, { opacity: 255 })
                        .then(cc.blink(1, 6))
                        .call(function () {
                        var data = rewardList[targetNum];
                        this.prizeShow(data);
                    }.bind(this))
                        .start();
                }
                else {
                    cc.tween(this.dialTrailing.children[tempIdx])
                        .delay(dTime)
                        .to(0, { opacity: 255 })
                        .to(0.4, { opacity: 0 })
                        .start();
                }
                tiemCont++;
            }
            condition--;
        }
    };
    /**
     * 旋转动画
     */
    RouletteBox.prototype.rotateAnimation = function (targetNum) {
        var targetRotate = 36 * targetNum;
        var rotateCount = 30 * 360;
        var targetAngle = targetRotate + rotateCount;
        if (this.tempAngle)
            targetAngle = targetAngle - this.tempAngle;
        cc.tween(this.dial)
            .then(cc.rotateBy(6, targetAngle).easing(cc.easeOut(8)))
            .call(function () {
            var data = rewardList[10 - targetNum];
            this.prizeShow(data);
            this.tempAngle = targetRotate;
        }.bind(this))
            .start();
    };
    RouletteBox.prototype.prizeShow = function (targetData) {
        this.btnStart.getComponent(cc.Button).interactable = true;
        this.inMotion = false;
        this.gainNode.active = true;
        this.gainNode.getComponent("GainNode").openGain(targetData);
    };
    __decorate([
        property({
            type: cc.Enum(animationType),
            tooltip: "动作类型： rotate:旋转动画 trailing:拖尾动画"
        })
    ], RouletteBox.prototype, "actionType", void 0);
    __decorate([
        property(cc.Node)
    ], RouletteBox.prototype, "btnStart", void 0);
    __decorate([
        property(cc.Node)
    ], RouletteBox.prototype, "btnClose", void 0);
    __decorate([
        property(cc.Node)
    ], RouletteBox.prototype, "gainNode", void 0);
    __decorate([
        property(cc.Node)
    ], RouletteBox.prototype, "dial", void 0);
    __decorate([
        property(cc.Node)
    ], RouletteBox.prototype, "pointer", void 0);
    __decorate([
        property(cc.Node)
    ], RouletteBox.prototype, "dialTrailing", void 0);
    RouletteBox = __decorate([
        ccclass
    ], RouletteBox);
    return RouletteBox;
}(cc.Component));
exports.default = RouletteBox;

cc._RF.pop();