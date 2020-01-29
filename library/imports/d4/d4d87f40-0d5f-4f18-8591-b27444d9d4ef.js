"use strict";
cc._RF.push(module, 'd4d879ADV9PGIWRsnRE2dTv', 'ManagePanel');
// Script/Hall/Withdraw/ManagePanel.ts

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
var config_1 = require("../../Config/config");
var uiEvent_1 = require("../../Config/uiEvent");
var List_1 = require("../../Common/List");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var tempModel = /** @class */ (function () {
    function tempModel() {
    }
    return tempModel;
}());
var ManagePanel = /** @class */ (function (_super) {
    __extends(ManagePanel, _super);
    function ManagePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        _this.bankAtlas = null;
        _this.com9sAtlas = null;
        _this.caption = null;
        // private content = null;
        _this.temp = [];
        _this.manageAddNode = null;
        return _this;
    }
    // private scrollviewAddBank = null;
    ManagePanel.prototype.onLoad = function () {
        this.list.node.active = true;
        this.manageAddNode = this.node.getChildByName("manageAddNode");
        this.manageAddNode.active = false;
        OnFire_1.G_OnFire.on(uiEvent_1.uiEventFunction.manage, this.setManagePanelActive.bind(this));
        OnFire_1.G_OnFire.on(uiEvent_1.uiEventFunction.atOnceManage, this.setManagePanelActive.bind(this));
        this.temp = [];
        var tempmodel = new tempModel();
        tempmodel.accountType = config_1.ACCOUNT_TYPE.NONE;
        tempmodel.bankType = config_1.ACCOUNT_TYPE.NONE;
        tempmodel.number = config_1.ACCOUNT_TYPE.NONE;
        this.temp.push(tempmodel);
        for (var key in config_1.BANK_CARD_NAME) {
            tempmodel = new tempModel();
            var keyType = Number(key);
            if (keyType == config_1.ACCOUNT_TYPE.ALIPAY) {
                tempmodel.accountType = config_1.ACCOUNT_TYPE.ALIPAY;
                tempmodel.bankType = 0;
                tempmodel.number = key + "123525" + "@qq.com";
            }
            else {
                tempmodel.accountType = config_1.ACCOUNT_TYPE.BANK;
                tempmodel.bankType = key;
                tempmodel.number = "123456789101234";
            }
            this.temp.push(tempmodel);
        }
        // console.log(">>>",BANK_CARD_NAME[1])
        this.list.numItems = this.temp.length / 2;
    };
    ManagePanel.prototype.start = function () {
    };
    ManagePanel.prototype.onEnable = function () {
    };
    // update (dt) {}
    ManagePanel.prototype.onDestroy = function () {
        OnFire_1.G_OnFire.off(uiEvent_1.uiEventFunction.manage);
    };
    ManagePanel.prototype.accountBySeparator = function (account) {
        var strLen = Math.round(account.length / 4);
        var count = 0;
        var str = "";
        for (var index = 0; index < strLen; index++) {
            var strNo = account.substring(count, count + 4);
            var separator = strNo.length <= 3 ? "" : "/";
            str += strNo.concat(separator);
            count += 4;
        }
        return str;
    };
    ManagePanel.prototype.accountBySeparatorSuffix = function (account) {
        var strList = account.split("@");
        return strList;
    };
    ManagePanel.prototype.setManagePanelActive = function (flag) {
        this.list.node.active = flag;
        this.manageAddNode.active = !flag;
    };
    ManagePanel.prototype.onListRender = function (item, idx) {
        if (!item)
            return;
        var data = this.temp[idx];
        var box = item.getChildByName("box");
        var sprAccountName = item.getChildByName("sprAccountName");
        var sprAdd = item.getChildByName("sprAdd");
        sprAdd.active = data.accountType == config_1.ACCOUNT_TYPE.NONE;
        var labelNode = item.getChildByName("labelNode");
        var labAccount = labelNode.getChildByName("labAccount");
        var sprSuffix = labelNode.getChildByName("sprSuffix");
        sprSuffix.active = data.accountType == config_1.ACCOUNT_TYPE.ALIPAY;
        switch (data.accountType) {
            case config_1.ACCOUNT_TYPE.NONE:
                this.setSpriteFrame(box, this.com9sAtlas, "hesiBox");
                this.setSpriteFrame(sprAccountName, this.caption, "tjzh");
                labAccount.active = false;
                break;
            case config_1.ACCOUNT_TYPE.ALIPAY:
                this.setSpriteFrame(box, this.bankAtlas, "zfb_panel");
                this.setSpriteFrame(sprAccountName, this.bankAtlas, "yh" + data.bankType);
                var strList = this.accountBySeparatorSuffix(data.number);
                labAccount.getComponent(cc.Label).string = strList[0];
                break;
            case config_1.ACCOUNT_TYPE.BANK:
                this.setSpriteFrame(box, this.bankAtlas, "yh_panel");
                this.setSpriteFrame(sprAccountName, this.bankAtlas, "yh" + data.bankType);
                var str = this.accountBySeparator(data.number);
                labAccount.getComponent(cc.Label).string = str;
                break;
        }
    };
    //更新图案
    ManagePanel.prototype.setSpriteFrame = function (target, atlas, frameName) {
        target.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(frameName);
    };
    //当列表项被选择...
    ManagePanel.prototype.onListSelected = function (item, selectedId, lastSelectedId, val) {
        if (!item)
            return;
        console.log("》》》》》》》》", selectedId, this.temp[selectedId]);
        var data = this.temp[selectedId];
        if (data.accountType == config_1.ACCOUNT_TYPE.NONE) {
            this.manageAddNode.active = true;
            this.list.node.active = false;
        }
    };
    __decorate([
        property(List_1.default)
    ], ManagePanel.prototype, "list", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], ManagePanel.prototype, "bankAtlas", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], ManagePanel.prototype, "com9sAtlas", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], ManagePanel.prototype, "caption", void 0);
    ManagePanel = __decorate([
        ccclass
    ], ManagePanel);
    return ManagePanel;
}(cc.Component));
exports.default = ManagePanel;

cc._RF.pop();