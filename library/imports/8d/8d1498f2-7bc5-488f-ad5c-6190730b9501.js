"use strict";
cc._RF.push(module, '8d149jye8VIj61cYZBzC5UB', 'ChatItem');
// Script/Hall/ChatItem.ts

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
var ChatItem = /** @class */ (function (_super) {
    __extends(ChatItem, _super);
    function ChatItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.otherObj = null;
        _this.otherHeadSprite = null;
        _this.otherDescBack = null;
        _this.otherNameLabel = null;
        _this.otherDescLabel = null;
        _this.myObj = null;
        _this.myHeadSprite = null;
        _this.myDescBack = null;
        _this.myDescLabel = null;
        _this.isMine = false;
        _this.data = null;
        return _this;
    }
    ChatItem.prototype.init = function (msg) {
        this.data = msg;
        if (!this.isMine) {
            this.showOtherInfo();
        }
        else {
            this.showMyInfo();
        }
    };
    ChatItem.prototype.showOtherInfo = function () {
        this.otherObj.active = true;
        this.myObj.active = false;
        this.otherNameLabel.string = '张三';
        this.otherDescLabel.string = "sdfsdfsdfsdfsdfsdfsdfsdfsd";
        console.log("otherDescLabel.node.height  " + this.otherDescLabel.node.height);
        this.otherDescBack.height = this.otherDescLabel.node.height + 5;
        this.node.height = this.otherDescLabel.node.height + 10;
    };
    ChatItem.prototype.showMyInfo = function () {
        this.otherObj.active = false;
        this.myObj.active = true;
        this.myDescLabel.string = 'trrtrtgrtgrtgrtggggggggggggggggggggggggggggggggdfgdfgerrrrrrrrr';
        console.log('this.myDescLabel node height  ' + this.myDescLabel.node.height);
        this.myDescBack.height = this.myDescLabel.node.height + 5;
        this.node.height = this.myDescLabel.node.height + 10;
    };
    __decorate([
        property(cc.Node)
    ], ChatItem.prototype, "otherObj", void 0);
    __decorate([
        property(cc.Node)
    ], ChatItem.prototype, "otherHeadSprite", void 0);
    __decorate([
        property(cc.Node)
    ], ChatItem.prototype, "otherDescBack", void 0);
    __decorate([
        property(cc.Label)
    ], ChatItem.prototype, "otherNameLabel", void 0);
    __decorate([
        property(cc.Label)
    ], ChatItem.prototype, "otherDescLabel", void 0);
    __decorate([
        property(cc.Node)
    ], ChatItem.prototype, "myObj", void 0);
    __decorate([
        property(cc.Node)
    ], ChatItem.prototype, "myHeadSprite", void 0);
    __decorate([
        property(cc.Node)
    ], ChatItem.prototype, "myDescBack", void 0);
    __decorate([
        property(cc.Label)
    ], ChatItem.prototype, "myDescLabel", void 0);
    ChatItem = __decorate([
        ccclass
    ], ChatItem);
    return ChatItem;
}(cc.Component));
exports.default = ChatItem;

cc._RF.pop();