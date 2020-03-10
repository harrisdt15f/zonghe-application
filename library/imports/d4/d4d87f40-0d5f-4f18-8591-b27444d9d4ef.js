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
var uiEvent_1 = require("../../Config/uiEvent");
var List_1 = require("../../Common/List");
var WithDrawControl_1 = require("../../Controller/WithDrawControl");
var AccountDelTk_1 = require("./AccountDelTk");
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
        _this.delNode = null;
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
    };
    ManagePanel.prototype.start = function () {
    };
    ManagePanel.prototype.onEnable = function () {
        this.setManagePanelActive(true);
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
        var _this = this;
        this.list.node.active = flag;
        this.manageAddNode.active = !flag;
        this.delNode.active = false;
        this.temp = [];
        WithDrawControl_1.G_WithDrawControl.GetMyAccountList(function () {
            _this.temp = WithDrawControl_1.G_WithDrawControl.getConfig().MyAccountList;
            _this.list.numItems = _this.temp.length + 1;
        });
    };
    ManagePanel.prototype.onListRender = function (item, idx) {
        if (!item)
            return;
        // console.log("idx   ",idx);
        var box = item.getChildByName("box");
        var sprAccountName = item.getChildByName("sprAccountName");
        var sprAdd = item.getChildByName("sprAdd");
        var labelNode = item.getChildByName("labelNode");
        var labAccount = labelNode.getChildByName("labAccount");
        // var sprSuffix = labelNode.getChildByName("sprSuffix")
        //console.log("idx  "+idx+ " this.temp.length  "+this.temp.length);
        if (this.temp.length > idx) {
            sprAdd.active = false;
            labelNode.active = true;
            sprAccountName.active = true;
            box.active = true;
            var config = WithDrawControl_1.G_WithDrawControl.getConfig().getPayItemInfo(this.temp[idx].code);
            this.setSpriteFrame(sprAccountName, this.bankAtlas, config.nameSprite);
            this.setSpriteFrame(box, this.bankAtlas, config.image);
            labAccount.getComponent(cc.Label).string = this.temp[idx].card_number_hidden;
            // sprSuffix.active = this.temp[idx].code == "ALIPAY"
        }
        else { // add
            sprAdd.active = true;
            labelNode.active = false;
            sprAccountName.active = false;
            box.active = false;
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
        // var data = this.temp[selectedId]
        // if(data.accountType == ACCOUNT_TYPE.NONE){
        //     this.manageAddNode.active = true;
        //     //this.list.node.active = false;
        // }
        if (this.temp.length > selectedId) {
            this.delNode.active = true;
            var s1 = cc.scaleTo(0.1, 1.1);
            var s2 = cc.scaleTo(0.1, 1);
            var seq = cc.sequence(s1, s2);
            this.delNode.runAction(seq);
            this.delNode.getComponent(AccountDelTk_1.default).init(this.temp[selectedId]);
        }
        else {
            this.manageAddNode.active = true;
            this.list.node.active = false;
        }
    };
    __decorate([
        property(List_1.default)
    ], ManagePanel.prototype, "list", void 0);
    __decorate([
        property(cc.Node)
    ], ManagePanel.prototype, "delNode", void 0);
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