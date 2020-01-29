"use strict";
cc._RF.push(module, 'd2cb4Vm6HlM95/0xxznLt+L', 'HeadBoxNode');
// Script/Hall/Head/HeadBoxNode.ts

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
// import { UI_EVENT_STATE } from '../../Config/uiEvent';
var config_1 = require("../../Config/config");
var HttpHelper_1 = require("../../Net/HttpHelper");
var uiEvent_1 = require("../../Config/uiEvent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HeadBoxNode = /** @class */ (function (_super) {
    __extends(HeadBoxNode, _super);
    function HeadBoxNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.headAtlas = null;
        _this.headImage = null;
        _this.headSelect = null;
        //属性
        _this.selectBox = null;
        // headList : Array<cc.Node> = new Array<cc.Node>();
        _this.tmpSelectBox = null;
        _this.selectIdx = 0;
        return _this;
    }
    HeadBoxNode.prototype.onLoad = function () {
        HttpHelper_1.G_HttpHelper.httpGet("/app-api/user/system-avatar", function (ret) {
            console.log("app-api/user/system-avatar数据", ret);
            OnFire_1.G_OnFire.fire(uiEvent_1.EventRequest.HeadUpdata);
        }.bind(this));
    };
    HeadBoxNode.prototype.start = function () {
        var scrollview = this.node.getChildByName("scrollview");
        var view = scrollview.getChildByName("view");
        var content = view.getChildByName("content");
        content.removeAllChildren();
        this.selectBox = cc.instantiate(this.headSelect);
        for (var index = 1; index <= config_1.headNum; index++) {
            var piece = cc.instantiate(this.headImage);
            piece.getComponent(cc.Sprite).spriteFrame = this.headAtlas.getSpriteFrame("touxiang" + index);
            piece.parent = content;
            piece.name = "heand_" + index;
            if (index == 1) {
                this.selectIdx = index;
                this.tmpSelectBox = piece;
                this.selectBox.setPosition(cc.v2(0, 0));
                piece.getComponent(cc.Sprite).node.addChild(this.selectBox);
            }
            piece.on(cc.Node.EventType.TOUCH_END, this.onSelectHead.bind(this));
        }
        var btnTiJiao = this.node.getChildByName("btnTiJiao");
        btnTiJiao.on(cc.Node.EventType.TOUCH_END, this.onTiJiao.bind(this));
    };
    // update (dt) {}
    HeadBoxNode.prototype.onSelectHead = function (event) {
        if (this.tmpSelectBox == event.target) {
            return;
        }
        if (this.tmpSelectBox != null && this.tmpSelectBox != event.target) {
            this.tmpSelectBox.removeAllChildren();
        }
        event.target.getComponent(cc.Sprite).node.addChild(this.selectBox);
        this.tmpSelectBox = event.target;
        var strTxt = event.target.getName();
        var idx = strTxt.indexOf("_");
        var str = strTxt.substring(idx + 1, strTxt.length);
        this.selectIdx = Number(str);
    };
    HeadBoxNode.prototype.onTiJiao = function () {
        // G_OnFire.fire(UI_EVENT_STATE.UI_HEAD_replace, this.selectIdx);
        // G_OnFire.fire(UI_EVENT_STATE.UI_HEAD_colse);
    };
    HeadBoxNode.prototype.onDestroy = function () {
        // G_OnFire.off(UI_EVENT_STATE.UI_HEAD_replace)
        // G_OnFire.off(UI_EVENT_STATE.UI_HEAD_colse)
    };
    __decorate([
        property(cc.SpriteAtlas)
    ], HeadBoxNode.prototype, "headAtlas", void 0);
    __decorate([
        property(cc.Prefab)
    ], HeadBoxNode.prototype, "headImage", void 0);
    __decorate([
        property(cc.Prefab)
    ], HeadBoxNode.prototype, "headSelect", void 0);
    HeadBoxNode = __decorate([
        ccclass
    ], HeadBoxNode);
    return HeadBoxNode;
}(cc.Component));
exports.default = HeadBoxNode;

cc._RF.pop();