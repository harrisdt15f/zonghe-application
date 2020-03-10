"use strict";
cc._RF.push(module, '50898OglAZLq4gsioCNdQH5', 'AtOncePanel');
// Script/Hall/Withdraw/AtOncePanel.ts

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
var UiForms_1 = require("../../Tool/UiForms");
var uiEvent_1 = require("../../Config/uiEvent");
var IdentifyKey_1 = require("../../Config/IdentifyKey");
var WithDrawControl_1 = require("../../Controller/WithDrawControl");
var Language_1 = require("../../Language/Language");
var UserControl_1 = require("../../Controller/UserControl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AtOncePanel = /** @class */ (function (_super) {
    __extends(AtOncePanel, _super);
    function AtOncePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.balance = null;
        //绑定
        _this.btnBangDing = null;
        //清除
        _this.btnClear = null;
        _this.btnSet = null;
        _this.labAccount = null;
        _this.myPulldownMenu = null;
        _this.myEditboxGolde = null;
        _this.labAnQuanMa = null;
        _this.myEditboxCode = null;
        _this.btnTiXian = null;
        _this.accountEditBox = null;
        _this.accountList = []; //绑定账户列表
        _this._myPulldownMenu = null;
        _this.accoutNameList = []; //绑定账户列表名称
        _this.chooseId = 0; //当前选定绑定账户index
        _this.isSecurityCode = false;
        return _this;
        // update (dt) {}
    }
    AtOncePanel.prototype.onLoad = function () {
        this.btnBangDing.on(cc.Node.EventType.TOUCH_END, this.onBangDing.bind(this));
        this.btnClear.on(cc.Node.EventType.TOUCH_END, this.onClear.bind(this));
        this.btnSet.on(cc.Node.EventType.TOUCH_END, this.onSet.bind(this));
        var classEdithbox = this.myEditboxGolde.getComponent("MyEditbox");
        classEdithbox.onDidEndedCallback = function (target) {
            var strName = classEdithbox.getEdiboxComponent().string;
            console.log("录完》》", typeof (strName));
            var num = Number(strName);
            if (!isNaN(num) && num > 0) {
                classEdithbox.getEdiboxComponent().string = num.toFixed(2);
            }
            //if('number' ==typeof(parseInt(strName)))
        };
        classEdithbox.onTextChangedCallback = function (target) {
            console.log("录入》》");
        };
    };
    AtOncePanel.prototype.onEnable = function () {
        var _this = this;
        console.log("G_UserControl.getUser().balance  ", typeof (UserControl_1.G_UserControl.getUser().balance));
        if (UserControl_1.G_UserControl.getUser().balance) {
            this.balance.string = UserControl_1.G_UserControl.getUser().balance.toFixed(2);
        }
        WithDrawControl_1.G_WithDrawControl.GetMyAccountList(function () {
            _this.accountList = WithDrawControl_1.G_WithDrawControl.getConfig().MyAccountList;
            _this.showInfo();
        });
    };
    AtOncePanel.prototype.showInfo = function () {
        if (this.accountList.length <= 0) {
            this.labAccount.active = true;
            this.btnBangDing.active = true;
            this.myPulldownMenu.active = false;
            this.isSecurityCode = false;
            this.labAnQuanMa.active = true;
            this.myEditboxCode.active = false;
            this.btnSet.active = true;
        }
        else {
            this.labAccount.active = false;
            this.myPulldownMenu.active = true;
            this.btnBangDing.active = false;
            this.isSecurityCode = true;
            this.labAnQuanMa.active = false;
            this.myEditboxCode.active = true;
            this.btnSet.active = false;
            for (var i = 0; i < this.accountList.length; i++) {
                console.log("this.accountList[i].code " + this.accountList[i].code);
                var bankInfo = WithDrawControl_1.G_WithDrawControl.getConfig().getPayItemInfo(this.accountList[i].code);
                this.accoutNameList[i] = bankInfo.name + " " + this.accountList[i].card_number_hidden;
            }
            if (this.myPulldownMenu) {
                this._myPulldownMenu = this.myPulldownMenu.getComponent("MyPulldownMenu");
                this._myPulldownMenu.menuData = this.accoutNameList;
                //this.chooseId = this._myPulldownMenu.selectResult.selectedId;
                var selectedText = this._myPulldownMenu.selectResult.text;
                console.log("选择了什么》》", this.chooseId, selectedText);
            }
        }
    };
    AtOncePanel.prototype.onWithDrwClick = function () {
        if (this.accountList == null || this.accountList.length == 0) {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("bindEmpty"));
            return;
        }
        var val = this.myEditboxGolde.getComponent("MyEditbox").getEdiboxComponent().string;
        var money = Number(val);
        console.log(typeof (money), "   ", money);
        //if(money)
        var code = '';
        if (this.isSecurityCode) {
            code = this.myEditboxCode.getComponent("MyEditbox").getEdiboxComponent().string;
            if (code == null || code == '') {
                UiForms_1.G_UiForms.hint(Language_1.G_Language.get("securityisEmpty"));
                return;
            }
        }
        else {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("securityisEmpty"));
            return;
        }
        if (isNaN(money)) {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("balanceError"));
            return;
        }
        if (money > UserControl_1.G_UserControl.getUser().balance) {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("balanceLess"));
            return;
        }
        var choose = this._myPulldownMenu.selectResult.selectedId;
        console.log("choose  ", choose);
        WithDrawControl_1.G_WithDrawControl.requesWithDraw(money, this.accountList[choose].id, code, function (ret) {
            if (ret.status) {
                UiForms_1.G_UiForms.hint(Language_1.G_Language.get("withDrawing"));
                this.balance.string = UserControl_1.G_UserControl.getUser().balance.toFixed(2);
            }
            else {
                UiForms_1.G_UiForms.hint(ret.message);
            }
        }.bind(this));
    };
    AtOncePanel.prototype.onDestroy = function () {
        OnFire_1.G_OnFire.off(uiEvent_1.uiEventFunction.atOnceManage);
    };
    AtOncePanel.prototype.onBangDing = function () {
        UiForms_1.G_UiForms.setSelectPanelShow(IdentifyKey_1.TEXT_INFO.TX_bangding_quxiao_queding);
        OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.atOnceManage, false);
        UiForms_1.G_UiForms.hint("绑定了什么");
    };
    AtOncePanel.prototype.onClear = function () {
        this.myEditboxGolde.getComponent("MyEditbox").getEdiboxComponent().string = "";
    };
    AtOncePanel.prototype.onSet = function () {
        UiForms_1.G_UiForms.show(uiEvent_1.uiEventModules.setNode);
        UiForms_1.G_UiForms.setSelectPanelShow(IdentifyKey_1.TEXT_INFO.xiuGaiAnMa);
        OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.atOnceManage, false);
    };
    __decorate([
        property({
            type: cc.Label,
            tooltip: "账户余额"
        })
    ], AtOncePanel.prototype, "balance", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: "绑定账户"
        })
    ], AtOncePanel.prototype, "btnBangDing", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: "清除已输入的信息"
        })
    ], AtOncePanel.prototype, "btnClear", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: "设置安全码"
        })
    ], AtOncePanel.prototype, "btnSet", void 0);
    __decorate([
        property(cc.Node)
    ], AtOncePanel.prototype, "labAccount", void 0);
    __decorate([
        property(cc.Node)
    ], AtOncePanel.prototype, "myPulldownMenu", void 0);
    __decorate([
        property(cc.Node)
    ], AtOncePanel.prototype, "myEditboxGolde", void 0);
    __decorate([
        property(cc.Node)
    ], AtOncePanel.prototype, "labAnQuanMa", void 0);
    __decorate([
        property(cc.Node)
    ], AtOncePanel.prototype, "myEditboxCode", void 0);
    __decorate([
        property(cc.Node)
    ], AtOncePanel.prototype, "btnTiXian", void 0);
    AtOncePanel = __decorate([
        ccclass
    ], AtOncePanel);
    return AtOncePanel;
}(cc.Component));
exports.default = AtOncePanel;

cc._RF.pop();