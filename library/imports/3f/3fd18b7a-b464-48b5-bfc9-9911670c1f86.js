"use strict";
cc._RF.push(module, '3fd18t6tGRItb/JmRFnDB+G', 'ChatNode');
// Script/Hall/ChatNode.ts

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
//聊天面板
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ChatNode = /** @class */ (function (_super) {
    __extends(ChatNode, _super);
    function ChatNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //收起后显示的 obj
        _this.unopenObj = null;
        _this.xialajiant = null;
        _this.hideBtn = null;
        //展开后显示的obj
        _this.openObj = null;
        _this.openBtn = null;
        _this.chatBack = null;
        _this.chatTop = null;
        _this.chatView = null;
        _this.inputBox = null;
        _this.lastPic = null;
        _this.lastNameLabel = null;
        _this.lastDescLabel = null;
        _this.chatMsgList = []; //聊天信息
        return _this;
    }
    ChatNode.prototype.start = function () {
        this.xialajiant.x = 326;
        this.xialajiant.y = -5;
        var m1 = cc.moveBy(1, cc.v2(0, 10));
        var m2 = cc.moveBy(1, cc.v2(0, -10));
        var a2 = cc.sequence(m1, m2);
        this.xialajiant.runAction(cc.repeatForever(a2));
    };
    ChatNode.prototype.onOpenClick = function () {
        this.unopenObj.active = false;
        this.openObj.active = true;
        this.chatBack.scaleX = 1;
        this.chatBack.scaleY = 0;
        this.chatView.scale = 0;
        this.chatView.runAction(cc.fadeOut(0));
        this.chatTop.y = 45;
        this.chatBack.runAction(cc.sequence(cc.delayTime(0.3), cc.scaleTo(0.3, 1, 1)));
        this.chatTop.runAction(cc.sequence(cc.delayTime(0.3), cc.moveTo(0.3, cc.v2(0, 452))));
        this.chatView.runAction(cc.sequence(cc.delayTime(0.6), cc.scaleTo(0.2, 1, 1)));
        this.chatView.runAction(cc.sequence(cc.delayTime(0.6), cc.fadeTo(0.2, 255)));
        this.showChatInfo();
    };
    ChatNode.prototype.onHideClick = function () {
        this.chatBack.runAction(cc.scaleTo(0.3, 1, 0));
        this.chatTop.runAction(cc.moveTo(0.3, cc.v2(0, 45)));
        this.chatView.runAction(cc.fadeOut(0));
        //this.chatView.runAction(cc.scaleTo(0.1,0,0));
        //this.chatView.runAction(cc.fadeTo(0.1,0));
        cc.delayTime(0.3);
        this.scheduleOnce(function () {
            this.unopenObj.active = true;
            this.openObj.active = false;
            this.showLastNote();
        }.bind(this), 0.3);
    };
    ChatNode.prototype.showChatInfo = function () {
    };
    ChatNode.prototype.showLastNote = function () {
    };
    ChatNode.prototype.onDisable = function () {
    };
    __decorate([
        property(cc.Node)
    ], ChatNode.prototype, "unopenObj", void 0);
    __decorate([
        property(cc.Node)
    ], ChatNode.prototype, "xialajiant", void 0);
    __decorate([
        property(cc.Node)
    ], ChatNode.prototype, "hideBtn", void 0);
    __decorate([
        property(cc.Node)
    ], ChatNode.prototype, "openObj", void 0);
    __decorate([
        property(cc.Node)
    ], ChatNode.prototype, "openBtn", void 0);
    __decorate([
        property(cc.Node)
    ], ChatNode.prototype, "chatBack", void 0);
    __decorate([
        property(cc.Node)
    ], ChatNode.prototype, "chatTop", void 0);
    __decorate([
        property(cc.Node)
    ], ChatNode.prototype, "chatView", void 0);
    __decorate([
        property(cc.Node)
    ], ChatNode.prototype, "inputBox", void 0);
    __decorate([
        property(cc.Node)
    ], ChatNode.prototype, "lastPic", void 0);
    __decorate([
        property(cc.Label)
    ], ChatNode.prototype, "lastNameLabel", void 0);
    __decorate([
        property(cc.Label)
    ], ChatNode.prototype, "lastDescLabel", void 0);
    ChatNode = __decorate([
        ccclass
    ], ChatNode);
    return ChatNode;
}(cc.Component));
exports.default = ChatNode;

cc._RF.pop();