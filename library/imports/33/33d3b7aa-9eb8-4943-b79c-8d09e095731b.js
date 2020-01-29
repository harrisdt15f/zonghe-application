"use strict";
cc._RF.push(module, '33d3beqnrhJQ7ecjQnglXMb', 'ManageAddNode');
// Script/Hall/Withdraw/ManageAddNode.ts

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
var Language_1 = require("../../Language/Language");
var config_1 = require("../../Config/config");
var uiEvent_1 = require("../../Config/uiEvent");
var UiForms_1 = require("../../Tool/UiForms");
var OnFire_1 = require("../../Net/OnFire");
var IdentifyKey_1 = require("../../Config/IdentifyKey");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var node = /** @class */ (function (_super) {
    __extends(node, _super);
    function node() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.menuList = null;
        _this.txt_khm = null;
        _this.txt_khdz = null;
        _this.txt_yhkh = null;
        _this.txt_xm = null;
        _this.txt_zfbzh = null;
        _this.txt_zh = null;
        _this.classNameEditbox = null;
        _this.classDiZiEditbox = null;
        _this.classKaHaoEditbox = null;
        _this.openAccountSiteName = Language_1.G_Language.get("PleaseEnterYourAccountName");
        _this.openAccountSite = Language_1.G_Language.get("PleaseEnterTheAccountOpeningAddress");
        _this.bankNum = Language_1.G_Language.get("PleaseEnterTheBankCardNumber");
        _this.alipayName = Language_1.G_Language.get("PleaseEnterYourAlipayUserName");
        _this.alipayAccount = Language_1.G_Language.get("PleaseEnterAlipayAccount");
        _this.againAlipayAccount = Language_1.G_Language.get("PleaseEnterTheAlipayAccountAgain");
        _this.classMenu = null;
        _this._myPulldownMenu = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    node.prototype.onLoad = function () {
        this.initBankCardNode();
        if (this.menuList) {
            this._myPulldownMenu = this.menuList.getComponent("MyPulldownMenu");
            this._myPulldownMenu.menuData = Language_1.G_Language.get("bankCardNameList");
            var selectedId = this._myPulldownMenu.selectResult.selectedId;
            var selectedText = this._myPulldownMenu.selectResult.text;
            console.log("选择了什么》》", selectedId, selectedText);
        }
    };
    node.prototype.start = function () {
    };
    // update (dt) {}
    node.prototype.initBankCardNode = function () {
        //开户名
        this.txt_khm = this.node.getChildByName("txt_khm");
        this.txt_khm.active = false;
        //开户银行
        // let txt_khyh = this.node.getChildByName("txt_khyh");
        //开户地址
        this.txt_khdz = this.node.getChildByName("txt_khdz");
        this.txt_khdz.active = false;
        //银行卡号
        this.txt_yhkh = this.node.getChildByName("txt_yhkh");
        this.txt_yhkh.active = false;
        //安全码
        // let txt_aqm = this.node.getChildByName("txt_aqm");
        //姓名
        this.txt_xm = this.node.getChildByName("txt_xm");
        this.txt_xm.active = true;
        //支付宝账号
        this.txt_zfbzh = this.node.getChildByName("txt_zfbzh");
        this.txt_zfbzh.active = true;
        //确定支付宝账号
        this.txt_zh = this.node.getChildByName("txt_zh");
        this.txt_zh.active = true;
        //开户名
        var nameEditbox = this.node.getChildByName("nameEditbox");
        //开户地址
        var diZiEditbox = this.node.getChildByName("diZiEditbox");
        //银行卡号
        var kaHaoEditbox = this.node.getChildByName("kaHaoEditbox");
        this.classNameEditbox = nameEditbox.getComponent("MyEditbox");
        this.classNameEditbox.getText().string = this.alipayName;
        this.classDiZiEditbox = diZiEditbox.getComponent("MyEditbox");
        this.classDiZiEditbox.getText().string = this.alipayAccount;
        this.classKaHaoEditbox = kaHaoEditbox.getComponent("MyEditbox");
        this.classKaHaoEditbox.getText().string = this.againAlipayAccount;
        this.classKaHaoEditbox.onDidEndedCallback = function (target) {
            console.log("输入结束》》");
        };
        this.classKaHaoEditbox.onEditboxTextChanged = function (target) {
            console.log("录入》》");
        };
        //确定绑定
        var btnQueDing = this.node.getChildByName("btnQueDing");
        btnQueDing.on(cc.Node.EventType.TOUCH_END, this.onQueDing.bind(this));
        //取消
        var btnQuXiao = this.node.getChildByName("btnQuXiao");
        btnQuXiao.on(cc.Node.EventType.TOUCH_END, this.onQuXiao.bind(this));
        //安全码
        var labelAnQuanMa = this.node.getChildByName("labelAnQuanMa");
        //设置安全码
        var btnSet = this.node.getChildByName("btnSet");
        btnSet.on(cc.Node.EventType.TOUCH_END, this.onSetanquanma.bind(this));
    };
    node.prototype.onSetanquanma = function () {
        UiForms_1.G_UiForms.show(uiEvent_1.uiEventModules.setNode);
        UiForms_1.G_UiForms.setSelectPanelShow(IdentifyKey_1.TEXT_INFO.xiuGaiAnMa);
    };
    node.prototype.onQueDing = function () {
        OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.manage, true);
    };
    node.prototype.onQuXiao = function () {
        OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.manage, true);
    };
    //当列表项被选择...
    node.prototype.onListSelected = function (data) {
        var _types = data.selectedId;
        //银行卡状态
        this.txt_khm.active = _types >= config_1.ACCOUNT_TYPE.BANK;
        this.txt_khdz.active = _types >= config_1.ACCOUNT_TYPE.BANK;
        this.txt_yhkh.active = _types >= config_1.ACCOUNT_TYPE.BANK;
        // 支付宝状态
        this.txt_xm.active = _types <= config_1.ACCOUNT_TYPE.ALIPAY;
        this.txt_zfbzh.active = _types <= config_1.ACCOUNT_TYPE.ALIPAY;
        this.txt_zh.active = _types <= config_1.ACCOUNT_TYPE.ALIPAY;
        var str1 = _types >= config_1.ACCOUNT_TYPE.BANK ? this.openAccountSiteName : this.alipayName;
        var str2 = _types >= config_1.ACCOUNT_TYPE.BANK ? this.openAccountSite : this.alipayAccount;
        var str3 = _types >= config_1.ACCOUNT_TYPE.BANK ? this.bankNum : this.againAlipayAccount;
        this.classNameEditbox.getText().string = str1;
        this.classDiZiEditbox.getText().string = str2;
        this.classKaHaoEditbox.getText().string = str3;
    };
    __decorate([
        property(cc.Node)
    ], node.prototype, "menuList", void 0);
    node = __decorate([
        ccclass
    ], node);
    return node;
}(cc.Component));
exports.default = node;

cc._RF.pop();