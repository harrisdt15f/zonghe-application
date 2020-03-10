"use strict";
cc._RF.push(module, 'b3fd2KQmrxBFrYtpM9tOPtt', 'wechatpayPanel');
// Script/Hall/shop/wechatpayPanel.ts

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
/**
 * app 支付方式
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var wechatpayPanel = /** @class */ (function (_super) {
    __extends(wechatpayPanel, _super);
    function wechatpayPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.typeGrid = null;
        _this.typeItemPrefab = null;
        _this.typeDetail = null;
        _this.numberGrid = null;
        _this.numberItemPrefab = null;
        _this.bankDetail = null;
        _this.qrImage = null;
        _this.textTip = null;
        _this.numberEditbox = null; //输入金额
        _this.Data = null; //充值类型data
        _this.dataList = null; //充值方式list
        _this.curData = null; //当前方式
        _this.typeObjList = [];
        _this.numObjList = [];
        return _this;
    }
    wechatpayPanel.prototype.init = function (data) {
        this.typeDetail.active = true;
        this.bankDetail.active = false;
        this.Data = data;
        this.textTip.getComponent(cc.Label).string = "";
        this.dataList = data.data;
        this.showTypeList();
    };
    //充值渠道
    wechatpayPanel.prototype.showTypeList = function () {
        var _this = this;
        this.typeObjList.forEach(function (element) {
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
                    _this.showTypeDetail(i);
                }, this_1);
            }
            else {
                item = this_1.typeObjList[i];
                item.active = true;
                item.name = i.toString();
            }
            item.getChildByName("text").getComponent(cc.Label).string = this_1.dataList[i].frontend_name;
        };
        var this_1 = this, item;
        for (var i = 0; i < this.dataList.length; i++) {
            _loop_1(i);
        }
        if (this.dataList.length > 0) {
            this.showTypeDetail(0);
        }
    };
    //当前渠道详情
    wechatpayPanel.prototype.showTypeDetail = function (index) {
        var _this = this;
        this.curData = this.dataList[index];
        if (this.numObjList.length <= 0) {
            var list = PayControl_1.G_PayControl.getPayConfig().payMoneyList;
            var _loop_2 = function (i) {
                item = cc.instantiate(this_2.numberItemPrefab);
                item.active = true;
                item.name = i.toString();
                item.getChildByName("text").getComponent(cc.Label).string = list[i].toString();
                this_2.numberGrid.addChild(item);
                this_2.numObjList.push(item);
                Utils_1.G_Utils.onClickEnd(item, function () {
                    _this.onNumberClick(i);
                }, this_2);
            };
            var this_2 = this, item;
            for (var i = 0; i < list.length; i++) {
                _loop_2(i);
            }
        }
        this.textTip.getComponent(cc.Label).string = this.curData.desc;
        this.numberEditbox.getChildByName("editbox").getChildByName("text").getComponent(cc.Label).string = this.curData.min + " - " + this.curData.max;
    };
    wechatpayPanel.prototype.onNumberClick = function (index) {
        console.log("index  " + index);
        var list = PayControl_1.G_PayControl.getPayConfig().payMoneyList;
        this.numberEditbox.getComponent("MyEditbox").getEdiboxComponent().string = list[index];
    };
    wechatpayPanel.prototype.onPayClick = function () {
        if (this.curData == null) {
            return;
        }
        console.log("this.NumInfo   " + this.NumInfo);
        var val = parseInt(this.NumInfo);
        if (val < this.curData.min) {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("payMinTip") + this.curData.min);
            return;
        }
        if (val > this.curData.max) {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("payMaxTip") + this.curData.max);
            return;
        }
        PayControl_1.G_PayControl.requesSendRecharge(this.Data.data.is_online, this.curData.id, val, function (ret) {
            if (ret.status) {
                var url = ret.data.payContent;
                switch (ret.data.mode) {
                    case "html":
                        document.write(url);
                        break;
                    case "qrcode": //展示二维码
                        // this.initQrCode(url);
                        break;
                    case " jump":
                        if (CC_JSB) {
                            jsb.openURL(url);
                        }
                        else {
                            window.open(url);
                        }
                        break;
                }
                console.log("url  " + url);
            }
        }.bind(this));
    };
    Object.defineProperty(wechatpayPanel.prototype, "NumInfo", {
        get: function () {
            return this.numberEditbox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.numberEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        property(cc.Node)
    ], wechatpayPanel.prototype, "typeGrid", void 0);
    __decorate([
        property(cc.Node)
    ], wechatpayPanel.prototype, "typeItemPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], wechatpayPanel.prototype, "typeDetail", void 0);
    __decorate([
        property(cc.Node)
    ], wechatpayPanel.prototype, "numberGrid", void 0);
    __decorate([
        property(cc.Node)
    ], wechatpayPanel.prototype, "numberItemPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], wechatpayPanel.prototype, "bankDetail", void 0);
    __decorate([
        property(cc.Node)
    ], wechatpayPanel.prototype, "qrImage", void 0);
    __decorate([
        property(cc.Node)
    ], wechatpayPanel.prototype, "textTip", void 0);
    __decorate([
        property(cc.Node)
    ], wechatpayPanel.prototype, "numberEditbox", void 0);
    wechatpayPanel = __decorate([
        ccclass
    ], wechatpayPanel);
    return wechatpayPanel;
}(cc.Component));
exports.default = wechatpayPanel;

cc._RF.pop();