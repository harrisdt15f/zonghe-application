"use strict";
cc._RF.push(module, 'e205dw+d+VDTYgFOZ3BTaE3', 'RankEffect');
// Script/Animation/RankEffect.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankEffect = /** @class */ (function (_super) {
    __extends(RankEffect, _super);
    function RankEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 当前帧的图片
        _this.sprite = null;
        /** 播放动画所需要的图集 */
        _this.spriteFrameList = [];
        /** 播放动画所需要的间隔时间 */
        _this.duration = 0.2;
        /** 是否循环播放 */
        _this.is_loop = false;
        /** 是否加载的时候播放 */
        // @property(cc.Boolean)
        // is_play_onload: boolean = false;
        /** 播放完成后是否消耗 */
        _this.is_destroy = false;
        /** 延迟多少秒播放动画 */
        _this.timeDelay = 0;
        /** 如果是重复播放动画多少秒后在播放 */
        _this.playTimeEndDelay = 0;
        _this.played_time = 0;
        _this.is_playing = false;
        _this._currentDelay = false;
        _this._currentPlayDelay = false;
        return _this;
    }
    RankEffect.prototype.onEnable = function () {
        //  if (this.is_play_onload) {
        this.play();
        //  }
    };
    RankEffect.prototype.play = function () {
        if (this.is_loop) {
            this.play_loop();
        }
        else {
            this.play_once();
        }
    };
    RankEffect.prototype.play_once = function () {
        if (this.spriteFrameList.length <= 1) {
            return;
        }
        if (this.timeDelay > 0) {
            this._currentDelay = true;
            this.scheduleOnce(this._updateTimeDelayState.bind(this), this.timeDelay);
        }
        this.played_time = 0;
        this.is_playing = true;
        this.is_loop = false;
    };
    RankEffect.prototype.play_loop = function () {
        if (this.spriteFrameList.length <= 1) {
            return;
        }
        if (this.timeDelay > 0) {
            this._currentDelay = true;
            this.scheduleOnce(this._updateTimeDelayState.bind(this), this.timeDelay);
        }
        this.played_time = 0;
        this.is_playing = true;
        this.is_loop = true;
    };
    RankEffect.prototype.stop = function () {
        this.is_playing = false;
        this.played_time = 0;
    };
    RankEffect.prototype._updateTimeDelayState = function () {
        this._currentDelay = false;
    };
    RankEffect.prototype._updatePlayTimeDelayState = function () {
        this._currentPlayDelay = false;
    };
    RankEffect.prototype.update = function (dt) {
        if (!this.is_playing) {
            return;
        }
        if (this._currentDelay || this._currentPlayDelay) {
            return;
        }
        this.played_time += dt;
        var index = Math.floor(this.played_time / this.duration);
        if (!this.is_loop) {
            if (index >= this.spriteFrameList.length) {
                this.is_playing = false;
                this.played_time = 0;
                if (this.is_destroy) {
                    this.node.destroy();
                }
                return;
            }
            this.sprite.spriteFrame = this.spriteFrameList[index];
        }
        else {
            if (index >= this.spriteFrameList.length) {
                this.played_time -= (this.duration * this.spriteFrameList.length);
                index -= this.spriteFrameList.length;
                this._currentPlayDelay = (this.timeDelay > 0);
                this.scheduleOnce(this._updatePlayTimeDelayState.bind(this), this.playTimeEndDelay);
            }
            this.sprite.spriteFrame = this.spriteFrameList[index];
        }
    };
    __decorate([
        property(cc.Sprite)
    ], RankEffect.prototype, "sprite", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], RankEffect.prototype, "spriteFrameList", void 0);
    __decorate([
        property(cc.Integer)
    ], RankEffect.prototype, "duration", void 0);
    __decorate([
        property(cc.Boolean)
    ], RankEffect.prototype, "is_loop", void 0);
    __decorate([
        property(cc.Boolean)
    ], RankEffect.prototype, "is_destroy", void 0);
    __decorate([
        property(cc.Integer)
    ], RankEffect.prototype, "timeDelay", void 0);
    __decorate([
        property(cc.Integer)
    ], RankEffect.prototype, "playTimeEndDelay", void 0);
    RankEffect = __decorate([
        ccclass
    ], RankEffect);
    return RankEffect;
}(cc.Component));
exports.default = RankEffect;

cc._RF.pop();