"use strict";
cc._RF.push(module, 'b0033dhbqZHtLpb4MU8nz3E', 'payBankPanel');
// Script/Hall/shop/payBankPanel.ts

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
var Utils_1 = require("../../Tool/Utils");
var UiForms_1 = require("../../Tool/UiForms");
var PayControl_1 = require("../../Controller/PayControl");
var Language_1 = require("../../Language/Language");
var Platforms_1 = require("../../Platform/Platforms");
/**
 * app 支付方式
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var payBankPanel = /** @class */ (function (_super) {
    __extends(payBankPanel, _super);
    function payBankPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.typeDetail = null;
        _this.typeGrid = null;
        _this.typeItemPrefab = null;
        _this.typeDetailGrid = null;
        _this.typeDetailItemPrefab = null;
        _this.numberGrid = null;
        _this.numberItemPrefab = null;
        _this.textTip = null;
        _this.bankDetail = null;
        _this.textBank = null; //银行名
        _this.textName = null; //姓名
        _this.textNumber = null; //收款号
        _this.textAdress = null; //开户行
        _this.textMoney = null; //金额
        _this.textTime = null; //倒计时
        _this.textCode = null; //订单号
        _this.numberDetail = null;
        _this.numberEditbox = null; //输入金额
        _this.Data = null; //充值类型data
        _this.dataList = null; //充值方式list
        _this.curDataList = null; //当前充值方式list   
        _this.curDataListIndex = -1;
        _this.curData = null; //当前充值方式当前种   
        _this.curDataIndex = -1;
        _this.typeObjList = []; //银行卡，支付宝，微信，等
        _this.typeDetailObjList = []; //通道1,2,3,4 
        _this.numObjList = []; //金额 10 100 1000 10000...
        _this.leftTime = 0;
        _this.bankInfo = null;
        _this.platforms = null;
        return _this;
    }
    payBankPanel.prototype.onLoad = function () {
        this.platforms = new Platforms_1.Platforms();
    };
    // data:{
    //     "is_online":0,
    //     "data":[] ==>"data":xxxxx, "config":xxxxxx
    // }
    payBankPanel.prototype.init = function (data) {
        this.typeDetail.active = true;
        this.bankDetail.active = false;
        this.Data = data;
        this.bankInfo = null;
        this.textTip.getComponent(cc.Label).string = "";
        this.dataList = data.data;
        this.curDataListIndex = -1;
        this.curDataIndex = -1;
        this.showTypeList();
    };
    //充值渠道
    payBankPanel.prototype.showTypeList = function () {
        var _this = this;
        this.typeObjList.forEach(function (element) {
            element.getChildByName('select').active = false;
            element.active = false;
        });
        var _loop_1 = function (i) {
            if (this_1.typeObjList[i] == null) {
                item = cc.instantiate(this_1.typeItemPrefab);
                item.active = true;
                item.name = i.toString();
                this_1.typeGrid.addChild(item);
                this_1.typeObjList.push(item);
                Utils_1.G_Utils.onClickEnd(item, function () {
                    _this.sendDetailRechargeChannel(i);
                }, this_1);
            }
            else {
                item = this_1.typeObjList[i];
                item.active = true;
                item.name = i.toString();
            }
            item.getChildByName("text").getComponent(cc.Label).string = this_1.dataList[i].data.name;
        };
        var this_1 = this, item;
        for (var i = 0; i < this.dataList.length; i++) {
            _loop_1(i);
        }
        if (this.dataList.length > 0) {
            this.sendDetailRechargeChannel(0);
        }
    };
    payBankPanel.prototype.sendDetailRechargeChannel = function (index) {
        if (this.curDataListIndex >= 0 && this.curDataListIndex == index) {
            return;
        }
        this.curDataListIndex = index;
        this.typeObjList.forEach(function (element) {
            element.getChildByName('select').active = false;
        });
        this.typeObjList[index].getChildByName('select').active = true;
        this.numberDetail.active = false;
        this.typeDetailObjList.forEach(function (element) {
            element.active = false;
            element.getChildByName('select').active = false;
        });
        if (this.dataList[index].data.offline_infos.length > 0) {
            this.curDataList = this.dataList[index].data.offline_infos;
            this.showTypeDetail();
        }
    };
    //当前渠道详情
    payBankPanel.prototype.showTypeDetail = function () {
        var _this = this;
        if (this.curDataList.length > 0) {
            var _loop_2 = function (i) {
                if (this_2.typeDetailObjList[i] == null) {
                    item = cc.instantiate(this_2.typeDetailItemPrefab);
                    item.active = true;
                    item.name = i.toString();
                    this_2.typeDetailGrid.addChild(item);
                    this_2.typeDetailObjList.push(item);
                    Utils_1.G_Utils.onClickEnd(item, function () {
                        _this.showDetailTypeDetail(i);
                    }, this_2);
                }
                else {
                    item = this_2.typeDetailObjList[i];
                    item.active = true;
                    item.name = i.toString();
                }
                item.getChildByName("text").getComponent(cc.Label).string = this_2.curDataList[i].name;
            };
            var this_2 = this, item;
            for (var i = 0; i < this.curDataList.length; i++) {
                _loop_2(i);
            }
        }
    };
    payBankPanel.prototype.showDetailTypeDetail = function (index) {
        var _this = this;
        // if(this.curDataIndex >= 0 && this.curDataIndex == index)
        // {
        //     return;
        // }
        this.numberDetail.active = true;
        this.curDataIndex = index;
        this.typeDetailObjList.forEach(function (element) {
            element.getChildByName('select').active = false;
        });
        this.typeDetailObjList[index].getChildByName('select').active = true;
        this.curData = this.curDataList[index];
        if (this.numObjList.length <= 0) {
            var list = PayControl_1.G_PayControl.getPayConfig().payMoneyList;
            var _loop_3 = function (i) {
                numberItem = cc.instantiate(this_3.numberItemPrefab);
                numberItem.active = true;
                numberItem.name = i.toString();
                numberItem.getChildByName("text").getComponent(cc.Label).string = list[i].toString();
                this_3.numberGrid.addChild(numberItem);
                this_3.numObjList.push(numberItem);
                Utils_1.G_Utils.onClickEnd(numberItem, function () {
                    _this.onNumberClick(i);
                }, this_3);
            };
            var this_3 = this, numberItem;
            for (var i = 0; i < list.length; i++) {
                _loop_3(i);
            }
        }
        //this.textTip.getComponent(cc.Label).string =this.curData.desc;
        this.textTip.getComponent(cc.Label).string = "";
        this.numberEditbox.getChildByName("editbox").getChildByName("text").getComponent(cc.Label).string = Math.floor(this.curData.min) + " - " + Math.floor(this.curData.max);
    };
    payBankPanel.prototype.onNumberClick = function (index) {
        console.log("index  " + index);
        var list = PayControl_1.G_PayControl.getPayConfig().payMoneyList;
        this.numberEditbox.getComponent("MyEditbox").getEdiboxComponent().string = list[index];
    };
    payBankPanel.prototype.onPayClick = function () {
        if (this.curData == null) {
            return;
        }
        var val = parseInt(this.NumInfo);
        if (this.NumInfo == null || this.NumInfo == '') {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("payMoneyInput"));
            return;
        }
        if (val < this.curData.min) {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("payMinTip") + this.curData.min);
            return;
        }
        if (val > this.curData.max) {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("payMaxTip") + this.curData.max);
            return;
        }
        console.log("this.NumInfo   " + val, "   ", this.curData.id);
        PayControl_1.G_PayControl.requesSendRecharge(this.Data.is_online, this.curData.id, val, function (ret) {
            if (ret.status) {
                this.bankInfo = ret.data;
                this.typeDetail.active = false;
                this.bankDetail.active = true;
                //this.textBank.string = this.curData.xxxxxxxxxxxxxxxxx;
                this.textName.string = ret.data.username;
                this.textNumber.string = ret.data.account.toString();
                this.textAdress.string = ret.data.branch;
                this.textMoney.string = ret.data.money;
                this.textCode.string = "订单号: " + ret.data.order_no;
                // let order = vdata.order_no;  //订单号
                var before = new Date(ret.data.created_at).getTime();
                var after = new Date(ret.data.expired_at).getTime();
                this.leftTime = (after - before) / 1000;
                this.textTime.string = Utils_1.G_Utils.getDateTimeStrTwo(this.leftTime);
            }
        }.bind(this));
    };
    payBankPanel.prototype.update = function (dt) {
        if (this.leftTime > 0 && this.bankInfo != null) {
            this.leftTime -= dt;
            this.textTime.string = Language_1.G_Language.get("payLeftTime") + Utils_1.G_Utils.getDateTimeStrTwo(this.leftTime);
            if (this.leftTime <= 0) {
                this.textTime.string = Language_1.G_Language.get("payLeftTime") + "00:00";
            }
        }
    };
    Object.defineProperty(payBankPanel.prototype, "NumInfo", {
        get: function () {
            return this.numberEditbox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.numberEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    payBankPanel.prototype.OnCopyBank = function () {
        if (this.bankInfo == null) {
            return;
        }
        this.platforms.JsCopy(this.bankInfo.branch);
        UiForms_1.G_UiForms.hint(Language_1.G_Language.get("copySucceed"));
    };
    payBankPanel.prototype.onCopyBankNumber = function () {
        if (this.bankInfo == null) {
            return;
        }
        this.platforms.JsCopy(this.bankInfo.account);
        UiForms_1.G_UiForms.hint(Language_1.G_Language.get("copySucceed"));
    };
    payBankPanel.prototype.onCopyName = function () {
        if (this.bankInfo == null) {
            return;
        }
        this.platforms.JsCopy(this.bankInfo.username);
        UiForms_1.G_UiForms.hint(Language_1.G_Language.get("copySucceed"));
    };
    payBankPanel.prototype.onCopyMoney = function () {
        if (this.bankInfo == null) {
            return;
        }
        this.platforms.JsCopy(this.bankInfo.money);
        UiForms_1.G_UiForms.hint(Language_1.G_Language.get("copySucceed"));
    };
    ///我已转账
    payBankPanel.prototype.onSendPaySuccess = function () {
        PayControl_1.G_PayControl.requesSendPayTrue(this.bankInfo.order_no, function (ret) {
            if (ret.status) {
                this.init(this.Data);
                UiForms_1.G_UiForms.hint(Language_1.G_Language.get("payTrueTip"));
            }
            else {
                UiForms_1.G_UiForms.hint(ret.message);
            }
        }.bind(this));
    };
    ///取消订单
    payBankPanel.prototype.onSendPayRefuse = function () {
        PayControl_1.G_PayControl.requesSendPayCancel(this.bankInfo.order_no, function (ret) {
        }.bind(this));
        this.init(this.Data);
        //请求 撤销
    };
    __decorate([
        property(cc.Node)
    ], payBankPanel.prototype, "typeDetail", void 0);
    __decorate([
        property(cc.Node)
    ], payBankPanel.prototype, "typeGrid", void 0);
    __decorate([
        property(cc.Node)
    ], payBankPanel.prototype, "typeItemPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], payBankPanel.prototype, "typeDetailGrid", void 0);
    __decorate([
        property(cc.Node)
    ], payBankPanel.prototype, "typeDetailItemPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], payBankPanel.prototype, "numberGrid", void 0);
    __decorate([
        property(cc.Node)
    ], payBankPanel.prototype, "numberItemPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], payBankPanel.prototype, "textTip", void 0);
    __decorate([
        property(cc.Node)
    ], payBankPanel.prototype, "bankDetail", void 0);
    __decorate([
        property(cc.Label)
    ], payBankPanel.prototype, "textBank", void 0);
    __decorate([
        property(cc.Label)
    ], payBankPanel.prototype, "textName", void 0);
    __decorate([
        property(cc.Label)
    ], payBankPanel.prototype, "textNumber", void 0);
    __decorate([
        property(cc.Label)
    ], payBankPanel.prototype, "textAdress", void 0);
    __decorate([
        property(cc.Label)
    ], payBankPanel.prototype, "textMoney", void 0);
    __decorate([
        property(cc.Label)
    ], payBankPanel.prototype, "textTime", void 0);
    __decorate([
        property(cc.Label)
    ], payBankPanel.prototype, "textCode", void 0);
    __decorate([
        property(cc.Node)
    ], payBankPanel.prototype, "numberDetail", void 0);
    __decorate([
        property(cc.Node)
    ], payBankPanel.prototype, "numberEditbox", void 0);
    payBankPanel = __decorate([
        ccclass
    ], payBankPanel);
    return payBankPanel;
}(cc.Component));
exports.default = payBankPanel;

cc._RF.pop();