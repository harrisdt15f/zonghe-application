"use strict";
cc._RF.push(module, 'bb3c2zHt/tOi7ljvWwVCKzS', 'HallLiaotianNode');
// Script/Hall/HallLiaotianNode.ts

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
var Utils_1 = require("../Tool/Utils");
//聊天面板
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HallLiaotianNode = /** @class */ (function (_super) {
    __extends(HallLiaotianNode, _super);
    function HallLiaotianNode() {
        // onLoad () {}
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprGx = null;
        _this.editboxLiaotian = null;
        _this.btnSend = null;
        // @property(cc.Sprite)
        // vip : cc.Sprite = null;
        _this.labelInfo = null;
        _this.headAtlas = null;
        _this.strInfo = null; //输入框的内容
        _this.flagUn = false;
        _this.bg = null;
        _this.userPanel = null;
        _this.unfoldPanel = null;
        _this.timeDt = 0;
        _this._ds = null;
        _this._fh = null;
        _this._xialajiant = null;
        _this._content = null;
        _this._userPanel = null;
        return _this;
    }
    HallLiaotianNode.prototype.start = function () {
        var sq = cc.sequence(cc.fadeOut(2), cc.fadeIn(2));
        this.sprGx.node.runAction(cc.repeatForever(sq.easing(cc.easeInOut(2.0))));
        this.editboxLiaotian.node.on('editing-did-began', this.callbackEditingDidBegan, this);
        this.editboxLiaotian.node.on('text-changed', this.callbackTextChanged, this);
        this._xialajiant = this.node.getChildByName("xialajiant");
        this._xialajiant.x = 132;
        this._xialajiant.y = 139;
        this._xialajiant.on(cc.Node.EventType.TOUCH_END, this.onUnfold.bind(this));
        var m1 = cc.moveBy(1, cc.v2(0, 10));
        var m2 = cc.moveBy(1, cc.v2(0, -10));
        var a2 = cc.sequence(m1, m2);
        this._xialajiant.runAction(cc.repeatForever(a2));
        this.bg = this.node.getChildByName("bg");
        this.userPanel = this.node.getChildByName("userPanel");
        this.unfoldPanel = this.node.getChildByName("unfoldPanel");
        var panel = this.unfoldPanel.getChildByName("panel");
        var btnLeft = panel.getChildByName("btnLeft");
        var btnRight = panel.getChildByName("btnRight");
        var btnClose = panel.getChildByName("btnClose");
        btnClose.x = 140;
        btnClose.y = 116;
        btnClose.runAction(cc.repeatForever(a2));
        btnLeft.on(cc.Node.EventType.TOUCH_END, this.onDirection.bind(this));
        btnRight.on(cc.Node.EventType.TOUCH_END, this.onDirection.bind(this));
        btnClose.on(cc.Node.EventType.TOUCH_END, this.onUnfoldClose.bind(this));
        var titleBox = panel.getChildByName("titleBox");
        this._ds = titleBox.getChildByName("jrdsb"); //赌神
        this._fh = titleBox.getChildByName("jrfhb"); //富豪  
        this._ds.active = true;
        this._fh.active = false;
        var strTemp = Utils_1.G_Utils.getPhoneNumberStar("12345678901");
        var LayoutList = panel.getChildByName("LayoutList");
        for (var index = 0; index < LayoutList.children.length; index++) {
            var _node = LayoutList.children[index];
            _node.getChildByName("labShouJi").getComponent(cc.Label).string = strTemp;
            _node.getChildByName("labJinBi").getComponent(cc.Label).string = 0;
        }
        var scrollviewLT = this.unfoldPanel.getChildByName("scrollviewLT");
        var view = scrollviewLT.getChildByName("view");
        this._content = view.getChildByName("content");
        this._userPanel = this._content.getChildByName("userPanel");
        this._content.removeAllChildren();
        this.setUserPanel();
    };
    // update (dt) {
    // }
    HallLiaotianNode.prototype.callbackEditingDidBegan = function () {
        console.log("做了什么");
    };
    HallLiaotianNode.prototype.callbackTextChanged = function (event) {
        // console.log("有什么信息》》",event)
        this.strInfo = event.string;
    };
    HallLiaotianNode.prototype.onSendCallBack = function () {
        this.labelInfo.string = this.strInfo;
        this.editboxLiaotian.string = "";
    };
    HallLiaotianNode.prototype.onUnfold = function (event) {
        console.log("展开");
        this.flagUn = true;
        this.bg.height = 390;
        this.userPanel.active = false;
        this.unfoldPanel.active = true;
        this._xialajiant.active = false;
    };
    HallLiaotianNode.prototype.onUnfoldClose = function (event) {
        this.bg.height = 120;
        this.userPanel.active = true;
        this.unfoldPanel.active = false;
        this._xialajiant.active = true;
    };
    HallLiaotianNode.prototype.onDirection = function (event) {
        if (event.target.name === "btnLeft") {
        }
        else if (event.target.name === "btnRight") {
        }
        this._ds.active = !this._ds.active;
        this._fh.active = !this._fh.active;
    };
    HallLiaotianNode.prototype.setUserPanel = function () {
        for (var index = 0; index < 10; index++) {
            var piece = cc.instantiate(this._userPanel);
            piece.parent = this._content;
            // var vip = piece.getChildByName("vip");
            // vip.getComponent(cc.Sprite).spriteFrame = this.headAtlas.getSpriteFrame("vip"+index);
            var labelInfo = piece.getChildByName("labelInfo");
            var head = piece.getChildByName("head");
            var head1 = head.getChildByName("head1");
            head1.getComponent(cc.Sprite).spriteFrame = this.headAtlas.getSpriteFrame("touxiang" + (index + 1));
        }
    };
    __decorate([
        property(cc.Sprite)
    ], HallLiaotianNode.prototype, "sprGx", void 0);
    __decorate([
        property(cc.EditBox)
    ], HallLiaotianNode.prototype, "editboxLiaotian", void 0);
    __decorate([
        property(cc.Sprite)
    ], HallLiaotianNode.prototype, "btnSend", void 0);
    __decorate([
        property(cc.Label)
    ], HallLiaotianNode.prototype, "labelInfo", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], HallLiaotianNode.prototype, "headAtlas", void 0);
    HallLiaotianNode = __decorate([
        ccclass
    ], HallLiaotianNode);
    return HallLiaotianNode;
}(cc.Component));
exports.default = HallLiaotianNode;

cc._RF.pop();