"use strict";
cc._RF.push(module, '83fc242+CFJDqAmy9c6hAMJ', 'ShopNode');
// Script/Hall/shop/ShopNode.ts

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
var PayControl_1 = require("../../Controller/PayControl");
var ShopLeftItem_1 = require("../shop/ShopLeftItem");
var alipayPanel_1 = require("./alipayPanel");
var payBankPanel_1 = require("./payBankPanel");
var RequestControl_1 = require("../../Controller/RequestControl");
var RequestConfig_1 = require("../../Config/RequestConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShopNode = /** @class */ (function (_super) {
    __extends(ShopNode, _super);
    function ShopNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.leftGrid = null;
        _this.leftItem = null;
        _this.rightNode = null;
        _this.nonePanel = null;
        _this.leftList = []; //data
        _this.offlineList = [];
        _this.leftObjList = []; //itemPrefab
        _this.curLeftIndex = 0;
        _this.curLeftData = null;
        return _this;
    }
    ShopNode.prototype.onLoad = function () {
        var rightNode = this.node.getChildByName("RightNode");
        rightNode.getChildByName("payPanel").active = true;
    };
    ShopNode.prototype.onEnable = function () {
        this.LoadLeft();
    };
    ShopNode.prototype.LoadLeft = function () {
        var cd = RequestControl_1.G_RequestControl.getConfig().getCD(RequestConfig_1.RequestEnum.PayInfo);
        if (cd < 0) {
            PayControl_1.G_PayControl.requesRechargeType(function (ret) {
                var list = PayControl_1.G_PayControl.getPayConfig().dataType;
                this.LoadData(list);
            }.bind(this));
        }
        else {
            var list = PayControl_1.G_PayControl.getPayConfig().dataType;
            if (list && list.length > 0) {
                this.LoadData(list);
            }
        }
    };
    ShopNode.prototype.LoadData = function (list) {
        var x = 0;
        var y = 0;
        for (var i = 0; i < list.length; i++) {
            var tt = list[i];
            PayControl_1.G_PayControl.getPayConfig().setPayItemInfo(tt.sign, tt.name, tt.is_online);
            var info = PayControl_1.G_PayControl.getPayConfig().getPayItemInfo(tt.sign);
            if (info) {
                if (tt.is_online == 1) //线上
                 {
                    var leftInfo = {};
                    leftInfo["data"] = tt;
                    leftInfo["config"] = info;
                    leftInfo["is_online"] = 1;
                    this.leftList[x] = leftInfo;
                    x++;
                }
                else {
                    var leftInfo = {};
                    leftInfo["data"] = tt;
                    leftInfo["config"] = info;
                    this.offlineList[y] = leftInfo;
                    y++;
                }
            }
        }
        if (this.offlineList.length > 0) {
            var leftInfo = {};
            leftInfo["is_online"] = 0;
            leftInfo["config"] = PayControl_1.G_PayControl.getPayConfig().getPayItemInfo("offline");
            leftInfo["data"] = this.offlineList;
            this.leftList.push(leftInfo);
        }
        //充值记录
        var leftInfoTwo = {};
        leftInfoTwo["is_online"] = -1;
        leftInfoTwo["config"] = PayControl_1.G_PayControl.getPayConfig().getPayItemInfo("record");
        leftInfoTwo["data"] = null;
        this.leftList.push(leftInfoTwo);
        if (this.leftList.length > 0) {
            this.showLeft();
        }
    };
    ShopNode.prototype.showLeft = function () {
        var _this = this;
        for (var i = 0; i < this.leftList.length; i++) {
            var item;
            if (this.leftObjList.length > i) {
                item = this.leftObjList[i];
                item.active = true;
            }
            else {
                item = cc.instantiate(this.leftItem);
                item.active = true;
                this.leftGrid.addChild(item);
                this.leftObjList.push(item);
            }
            // item.active = true;
            // this.leftGrid.addChild(item);
            //this.leftObjList.push(item);
            var itemJs = item.getComponent(ShopLeftItem_1.default);
            itemJs.init(this.leftList[i], i, function (index, data) {
                _this.onSelectedItem(index, data);
            });
        }
        if (this.curLeftIndex <= 0) {
            this.onSelectedItem(0, this.leftList[0]);
        }
    };
    //G_Utils.onClickEnd(item, this.onToggleEnd, this)
    ShopNode.prototype.onSelectedItem = function (index, data) {
        if (this.curLeftIndex > 0 && this.curLeftIndex == index + 1) {
            return;
        }
        if (this.curLeftIndex > 0 && this.curLeftIndex <= this.leftList.length + 1) {
            var tt = this.leftObjList[this.curLeftIndex - 1].getComponent(ShopLeftItem_1.default);
            tt.setSelectState(false);
        }
        this.curLeftIndex = index + 1;
        var ttt = this.leftObjList[this.curLeftIndex - 1].getComponent(ShopLeftItem_1.default);
        ttt.setSelectState(true);
        this.curLeftData = data;
        console.log("index>>>", index, "   ", this.curLeftData.config.name);
        this.onShowRightInfo();
    };
    ShopNode.prototype.onShowRightInfo = function () {
        var _this = this;
        this.rightNode.children.forEach(function (element) {
            element.active = false;
        });
        this.rightNode.children.forEach(function (element) {
            if (_this.curLeftData.is_online == 1) //线上
             {
                if (_this.curLeftData.config.panel == element.name) {
                    console.log("open panel ", element.name);
                    if (_this.curLeftData.data.online_infos.length > 0) {
                        element.active = true;
                        var script = element.getComponent(alipayPanel_1.default);
                        script.init(_this.curLeftData);
                    }
                    else {
                        _this.nonePanel.active = true;
                    }
                }
            }
            else if (_this.curLeftData.is_online == 0) //线下
             {
                if (element.name == _this.curLeftData.config.panel) {
                    element.active = true;
                    var script = element.getComponent(payBankPanel_1.default);
                    script.init(_this.curLeftData);
                }
            }
            else //充值记录
             {
                if (element.name == _this.curLeftData.config.panel) {
                    element.active = true;
                    // let script = element.getComponent(PayRecordPanel); 
                    // script.init(this.curLeftData);
                }
            }
        });
    };
    __decorate([
        property(cc.Node)
    ], ShopNode.prototype, "leftGrid", void 0);
    __decorate([
        property(cc.Node)
    ], ShopNode.prototype, "leftItem", void 0);
    __decorate([
        property(cc.Node)
    ], ShopNode.prototype, "rightNode", void 0);
    __decorate([
        property(cc.Node)
    ], ShopNode.prototype, "nonePanel", void 0);
    ShopNode = __decorate([
        ccclass
    ], ShopNode);
    return ShopNode;
}(cc.Component));
exports.default = ShopNode;

cc._RF.pop();