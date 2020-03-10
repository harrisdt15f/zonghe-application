"use strict";
cc._RF.push(module, 'e223cU2jY1LfYc6PZf134pS', 'eBankPanel');
// Script/Hall/shop/eBankPanel.ts

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
var ebankPanel = /** @class */ (function (_super) {
    __extends(ebankPanel, _super);
    function ebankPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.typeGrid = null;
        _this.typeItemPrefab = null;
        _this.typeDetail = null;
        _this.textBank = null; //银行名
        _this.textName = null; //姓名
        _this.textNumber = null; //收款号
        _this.textAdress = null; //开户行
        _this.textTip = null;
        _this.numberEditbox = null; //存款金额  
        _this.nameEditbox = null; //存款姓名
        _this.Data = null; //充值类型data
        _this.dataList = null; //充值方式list
        _this.curData = null; //当前方式
        _this.typeObjList = [];
        _this.numObjList = [];
        return _this;
    }
    // data:{
    //     "is_online":0,
    //     "data":[] ==>"data":xxxxx, "config":xxxxxx
    // }
    ebankPanel.prototype.init = function (data) {
        this.Data = data;
        //this.textTip.getComponent(cc.Label).string = ""
        console.log("offline  " + data.data[0].config.name);
    };
    //充值渠道
    ebankPanel.prototype.showTypeList = function () {
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
    ebankPanel.prototype.showTypeDetail = function (index) {
        this.curData = this.dataList[index];
        if (this.curData == null) {
            this.typeDetail.active = false;
        }
        else {
            this.typeDetail.active = true;
            this.textBank.string = this.curData.name;
            this.textName.string = this.curData.bank.name;
            this.textNumber.string = this.curData.bank.code;
            this.textAdress.string = " ";
            this.textTip.getComponent(cc.Label).string = this.curData.desc;
        }
        /*
        if(this.numObjList.length <= 0)
        {
            var list = G_PayControl.getPayConfig().payMoneyList;
            for(let i = 0;i <list.length;i++){
                var item = cc.instantiate(this.numberItemPrefab);
                item.active = true;
                item.name = i.toString();
                item.getChildByName("text").getComponent(cc.Label).string = list[i].toString();
                this.numberGrid.addChild(item);
                this.numObjList.push(item);
                G_Utils.onClickEnd(item, ()=>{
                    this.onNumberClick(i);
                }, this)
            }
        }
        */
        this.numberEditbox.getChildByName("editbox").getChildByName("text").getComponent(cc.Label).string = this.curData.min + " - " + this.curData.max;
    };
    ebankPanel.prototype.onNumberClick = function (index) {
        console.log("index  " + index);
        var list = PayControl_1.G_PayControl.getPayConfig().payMoneyList;
        this.numberEditbox.getComponent("MyEditbox").getEdiboxComponent().string = list[index];
    };
    ebankPanel.prototype.onPayClick = function () {
        if (this.curData == null) {
            return;
        }
        if (this.NameInfo == null || this.NameInfo == '') {
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
                        this.webObj.node.active = true;
                        this.webObj.evaluateJS(url);
                        break;
                    case "qrcode": //展示二维码
                        break;
                    case " jump":
                        break;
                }
                console.log("url  " + url);
            }
        }.bind(this));
    };
    Object.defineProperty(ebankPanel.prototype, "NameInfo", {
        get: function () {
            return this.nameEditbox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.nameEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ebankPanel.prototype, "NumInfo", {
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
    ], ebankPanel.prototype, "typeGrid", void 0);
    __decorate([
        property(cc.Node)
    ], ebankPanel.prototype, "typeItemPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], ebankPanel.prototype, "typeDetail", void 0);
    __decorate([
        property(cc.Label)
    ], ebankPanel.prototype, "textBank", void 0);
    __decorate([
        property(cc.Label)
    ], ebankPanel.prototype, "textName", void 0);
    __decorate([
        property(cc.Label)
    ], ebankPanel.prototype, "textNumber", void 0);
    __decorate([
        property(cc.Label)
    ], ebankPanel.prototype, "textAdress", void 0);
    __decorate([
        property(cc.Node)
    ], ebankPanel.prototype, "textTip", void 0);
    __decorate([
        property(cc.Node)
    ], ebankPanel.prototype, "numberEditbox", void 0);
    __decorate([
        property(cc.Node)
    ], ebankPanel.prototype, "nameEditbox", void 0);
    ebankPanel = __decorate([
        ccclass
    ], ebankPanel);
    return ebankPanel;
}(cc.Component));
exports.default = ebankPanel;

cc._RF.pop();