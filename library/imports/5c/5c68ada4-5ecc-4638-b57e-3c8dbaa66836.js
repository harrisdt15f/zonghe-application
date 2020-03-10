"use strict";
cc._RF.push(module, '5c68a2kXsxGOLV+PI26pmg2', 'GuessingBox');
// Script/Hall/Activity/GuessingBox.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GuessingBox = /** @class */ (function (_super) {
    __extends(GuessingBox, _super);
    function GuessingBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.openGuessing = null;
        _this.clickFlag = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    GuessingBox.prototype.onLoad = function () {
        var peanl = this.node.getChildByName("peanl");
        var hbNode = peanl.getChildByName("hbNode");
        for (var index = 0; index < hbNode.children.length; index++) {
            var piece = hbNode.children[index];
            Utils_1.G_Utils.onClickEnd(piece, this.onClickHB, this);
        }
        var blueBg = this.node.getChildByName("blueBg");
        var btnClose = blueBg.getChildByName("btnClose");
        Utils_1.G_Utils.onClickEnd(btnClose, this.onClose, this);
    };
    GuessingBox.prototype.start = function () {
    };
    // update (dt) {}
    GuessingBox.prototype.onClickHB = function (event) {
        if (this.clickFlag) {
            return;
        }
        this.clickFlag = true;
        var item = event.target;
        var scaleTo = cc.scaleTo(0.5, 0, 1.1);
        var skewBy = cc.skewBy(0.5, 0, -40);
        var spawn = cc.spawn(skewBy, scaleTo);
        //var tt = cc.sequence(cc.rotateBy(0,0,-180),cc.rotateBy(0.5,0,90));
        var func = cc.callFunc(function () {
            item.scaleY = 1;
            item.scaleX = 1;
            this.clickFlag = false;
        }, this);
        var action = cc.sequence(spawn, func, cc.skewBy(0, 0, -140), cc.callFunc(function () {
            this.openGuessing.active = true;
            this.node.active = false;
        }, this));
        item.runAction(action);
    };
    GuessingBox.prototype.onClose = function () {
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], GuessingBox.prototype, "openGuessing", void 0);
    GuessingBox = __decorate([
        ccclass
    ], GuessingBox);
    return GuessingBox;
}(cc.Component));
exports.default = GuessingBox;

cc._RF.pop();