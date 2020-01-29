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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var rechargeType;
(function (rechargeType) {
    rechargeType[rechargeType["alipay"] = 0] = "alipay";
    rechargeType[rechargeType["weChat"] = 1] = "weChat";
    rechargeType[rechargeType["eBank"] = 2] = "eBank";
    rechargeType[rechargeType["unionpay"] = 3] = "unionpay";
    rechargeType[rechargeType["vip"] = 4] = "vip";
    rechargeType[rechargeType["rechargeInfo"] = 5] = "rechargeInfo";
})(rechargeType || (rechargeType = {}));
var ShopNode = /** @class */ (function (_super) {
    __extends(ShopNode, _super);
    function ShopNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // @property(cc.EditBox)
    // ee : cc.EditBox = null;
    // LIFE-CYCLE CALLBACKS:
    ShopNode.prototype.onLoad = function () {
        var rightNode = this.node.getChildByName("RightNode");
        rightNode.getChildByName("payPanel").active = true;
        var leftButtonList = this.node.getChildByName("leftButtonList");
        var classLeftNode = leftButtonList.getComponent("LeftButtonListSelect");
        classLeftNode.leftButtonClikcFunc = function (target) {
            var index = target.index;
            this.setNodeActive(rightNode, index);
        }.bind(this);
    };
    ShopNode.prototype.start = function () {
        // editBox.textLabel.node.color
    };
    // update (dt) {}
    ShopNode.prototype.setNodeActive = function (_node, key) {
        _node.getChildByName("payPanel").active = false;
        _node.getChildByName("ebankPanel").active = false;
        _node.getChildByName("topUpListPanel").active = false;
        _node.getChildByName("nonePanel").active = false;
        if ((key == rechargeType.alipay
            || key == rechargeType.weChat
            || key == rechargeType.unionpay) /** and 是否开启 */) {
            _node.getChildByName("payPanel").active = true;
        }
        else if (key == rechargeType.eBank) {
            _node.getChildByName("ebankPanel").active = true;
        }
        else if (key == rechargeType.vip) {
            _node.getChildByName("nonePanel").active = true;
        }
        else if (key == rechargeType.rechargeInfo) {
            _node.getChildByName("topUpListPanel").active = true;
        }
        else {
            _node.getChildByName("nonePanel").active = true;
        }
    };
    ShopNode = __decorate([
        ccclass
    ], ShopNode);
    return ShopNode;
}(cc.Component));
exports.default = ShopNode;

cc._RF.pop();