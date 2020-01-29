"use strict";
cc._RF.push(module, '7b6b2uJxatDsaduIJAw8nFU', 'RedWarsBox');
// Script/Hall/Activity/RedWarsBox.ts

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
var RedWarsBox = /** @class */ (function (_super) {
    __extends(RedWarsBox, _super);
    function RedWarsBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hb = null;
        _this.peanl = null;
        _this.OpenGuessing = null;
        _this.numImage = null;
        _this.yellowHalo = null;
        _this.imageNum = null;
        _this._updateflag = false;
        _this._clickFlag = true;
        _this._dt = 0;
        _this._time = 10;
        // private count = 0;
        _this._pool = null;
        _this.tempArray = [];
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    RedWarsBox.prototype.onLoad = function () {
        this.peanl.on(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
        OnFire_1.G_OnFire.on(uiEvent_1.uiEventFunction.awardClose, this.onCloseAwardNode.bind(this));
    };
    RedWarsBox.prototype.start = function () {
    };
    RedWarsBox.prototype.update = function (dt) {
        if (this._updateflag && this._clickFlag) {
            this._dt += dt;
            if (this._dt >= 1) {
                this._time--;
                this._dt = 0;
            }
            if (this._time <= 5) {
                this.yellowHalo.node.active = true;
                this.imageNum.getComponent(cc.Sprite).spriteFrame = this.numImage.getSpriteFrame(String(this._time));
            }
            if (this._time < 0) {
                this.onCloseAwardNode();
            }
        }
    };
    RedWarsBox.prototype.onEnable = function () {
        this.yellowHalo.play();
        this._updateflag = true;
        this._clickFlag = true;
        this._time = 10;
        this._dt = 0;
        this._pool = new cc.NodePool();
        this.dropOut();
    };
    RedWarsBox.prototype.onDestroy = function () {
        console.log("销毁");
        this.peanl.off(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
        OnFire_1.G_OnFire.off(uiEvent_1.uiEventFunction.awardClose);
        while (this._pool.size()) {
            var node = this._pool.get();
            node.destroy();
        }
    };
    RedWarsBox.prototype.nodePollPut = function (_item) {
        if (!_item)
            return;
        this.tempArray.push(_item);
        _item.parent = this.peanl;
        var x = Utils_1.G_Utils.random(0, 1400);
        var rotation = Utils_1.G_Utils.random(0, 90);
        var scale = Utils_1.G_Utils.random(100, 120);
        _item.x = x;
        _item.y = 800;
        _item.scale = scale / 100;
        _item.angle = rotation;
        var speed = Utils_1.G_Utils.random(150, 500);
        speed = speed / 100;
        var move = cc.moveTo(speed, x, -80);
        var cFunc = cc.callFunc(function (target) {
            this.peanl.removeChild(target, false);
            this.tempArray.forEach(function (value, index) {
                if (value === target) {
                    this.tempArray.splice(index - 1, index);
                }
            }, this);
        }, this, _item);
        var sseq = cc.sequence(move, cFunc);
        _item.runAction(sseq);
    };
    RedWarsBox.prototype.dropOut = function () {
        var func = cc.callFunc(function (target) {
            if (this._pool.size()) {
                var item = this._pool.get();
                this.nodePollPut(item);
            }
            else {
                var _item = cc.instantiate(this.hb);
                this._pool.put(_item);
                var item = this._pool.get();
                this.nodePollPut(item);
            }
        }, this);
        var seq = cc.sequence(cc.delayTime(0.5), func);
        var repeatf = cc.repeatForever(seq);
        this.peanl.runAction(repeatf);
    };
    RedWarsBox.prototype._onTouchBegin = function (event) {
        var _this = this;
        //获取当前点击的全局坐标
        this.tempArray.forEach(function (element) {
            if (element.getBoundingBoxToWorld().contains(event.getLocation())) {
                _this.OpenGuessing.active = true;
                _this._clickFlag = false;
                _this.peanl.stopAllActions();
                element.stopAllActions();
                _this.yellowHalo.stop();
                return;
            }
        }, this);
    };
    RedWarsBox.prototype.onCloseAwardNode = function () {
        this._clickFlag = false;
        this.yellowHalo.node.active = false;
        this.yellowHalo.stop();
        this.peanl.removeAllChildren(false);
        this.peanl.stopAllActions();
        while (this._pool.size()) {
            var node = this._pool.get();
            node.destroy();
        }
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], RedWarsBox.prototype, "hb", void 0);
    __decorate([
        property(cc.Node)
    ], RedWarsBox.prototype, "peanl", void 0);
    __decorate([
        property(cc.Node)
    ], RedWarsBox.prototype, "OpenGuessing", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], RedWarsBox.prototype, "numImage", void 0);
    __decorate([
        property(cc.Animation)
    ], RedWarsBox.prototype, "yellowHalo", void 0);
    __decorate([
        property(cc.Node)
    ], RedWarsBox.prototype, "imageNum", void 0);
    RedWarsBox = __decorate([
        ccclass
    ], RedWarsBox);
    return RedWarsBox;
}(cc.Component));
exports.default = RedWarsBox;

cc._RF.pop();