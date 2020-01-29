"use strict";
cc._RF.push(module, '47afcRjgiBHj5UhWXo4H/GN', 'OpenGuessing');
// Script/Hall/Activity/OpenGuessing.ts

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
var OnFire_1 = require("../../Net/OnFire");
var uiEvent_1 = require("../../Config/uiEvent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var OpenGuessing = /** @class */ (function (_super) {
    __extends(OpenGuessing, _super);
    function OpenGuessing() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gx = null;
        _this.box = null;
        _this.rmb = null;
        // LIFE-CYCLE CALLBACKS:
        _this._dt = 0;
        return _this;
    }
    OpenGuessing.prototype.onLoad = function () {
    };
    OpenGuessing.prototype.start = function () {
    };
    OpenGuessing.prototype.onEnable = function () {
        this._dt = 0;
        this.box.scale = 0;
        var seq0 = cc.sequence(cc.scaleTo(0.6, 1), cc.callFunc(function () {
            var scaleAction = cc.scaleBy(1, 2);
            var scaleAction1 = cc.scaleBy(1, 1);
            var ft90 = cc.fadeTo(4, 90);
            var ft255 = cc.fadeTo(4, 255);
            var rotateAction = cc.rotateBy(12, 360);
            var seq = cc.sequence(ft90, ft255);
            var spawn = cc.spawn(rotateAction, seq, scaleAction, scaleAction1);
            var rf = cc.repeatForever(spawn);
            this.gx.runAction(rf);
        }, this));
        this.box.runAction(seq0);
        this.rmb.string = Utils_1.G_Utils.setStringOfUnit(10);
    };
    OpenGuessing.prototype.update = function (dt) {
        this._dt += dt;
        if (this._dt >= 4) {
            this.node.active = false;
            // awardClose
            OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.awardClose);
        }
    };
    __decorate([
        property(cc.Node)
    ], OpenGuessing.prototype, "gx", void 0);
    __decorate([
        property(cc.Node)
    ], OpenGuessing.prototype, "box", void 0);
    __decorate([
        property(cc.Label)
    ], OpenGuessing.prototype, "rmb", void 0);
    OpenGuessing = __decorate([
        ccclass
    ], OpenGuessing);
    return OpenGuessing;
}(cc.Component));
exports.default = OpenGuessing;

cc._RF.pop();