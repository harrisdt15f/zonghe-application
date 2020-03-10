"use strict";
cc._RF.push(module, '74c18/vzhtGbadwnfsyQzvY', 'MyPromotePanel');
// Script/Hall/Promote/MyPromotePanel.ts

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
var Platforms_1 = require("../../Platform/Platforms");
var UiForms_1 = require("../../Tool/UiForms");
var Language_1 = require("../../Language/Language");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label_url = null;
        _this.label_huoyue = null;
        _this.label_shouchong = null;
        _this.label_add = null;
        _this.label_teamAdd = null;
        _this.label_fanli = null;
        _this.platforms = null;
        return _this;
    }
    NewClass.prototype.onLoad = function () {
        this.platforms = new Platforms_1.Platforms();
    };
    NewClass.prototype.start = function () {
        this.showInfo();
    };
    NewClass.prototype.showInfo = function () {
        this.label_url.string = "http://www.xxxx.com";
        this.label_huoyue.string = String(3);
        this.label_shouchong.string = String(2);
        this.label_add.string = String(2);
        this.label_teamAdd.string = String(1);
        this.label_fanli.string = 23.3434.toFixed(2);
    };
    /**
     * 复制图片
     */
    NewClass.prototype.OnCopyCodeClick = function () {
    };
    /**
     * 复制地址
     */
    NewClass.prototype.OnCopyClick = function () {
        var str = "xxxxxxxxxxxxxxxxxxxxxxxxx";
        this.platforms.JsCopy(str);
        UiForms_1.G_UiForms.hint(Language_1.G_Language.get("copySucceed"));
    };
    //微信分享
    NewClass.prototype.OnShareWechatClick = function () {
        if (cc.sys.OS_ANDROID == cc.sys.os) {
            jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "wxLogin", "()V"); //登录
        }
    };
    NewClass.prototype.OnShareQQClick = function () {
    };
    NewClass.prototype.OnShareFriendCircleClick = function () {
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label_url", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label_huoyue", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label_shouchong", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label_add", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label_teamAdd", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label_fanli", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();