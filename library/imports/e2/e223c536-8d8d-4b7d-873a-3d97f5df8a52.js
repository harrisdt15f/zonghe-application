"use strict";
cc._RF.push(module, 'e223cU2jY1LfYc6PZf134pS', 'EBankPanel');
// Script/Hall/shop/EBankPanel.ts

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
var List_1 = require("../../Common/List");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EBankPanel = /** @class */ (function (_super) {
    __extends(EBankPanel, _super);
    function EBankPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bankCardWayList = null;
        _this.diKuan = null;
        return _this;
        // callbackTextChanged(event){
        //     console.log("有什么信息》》",event)
        //     switch (event.node.name) {
        //         case "editboxBank":
        //             console.log("银行号")
        //             break;
        //         case "editboxName":
        //             console.log("姓名")
        //             break;  
        //         default:
        //             break;
        //     }
        // }
    }
    EBankPanel.prototype.onLoad = function () {
        this.diKuan = this.node.getChildByName("dikuan");
        var btnFuZhiHuMing = this.diKuan.getChildByName("btnFuZhiHuMing");
        var btnFuZhiZhangHao = this.diKuan.getChildByName("btnFuZhiZhangHao");
        var btnFuZhiZhiHang = this.diKuan.getChildByName("btnFuZhiZhiHang");
        btnFuZhiHuMing.on(cc.Node.EventType.TOUCH_END, this.onCopy.bind(this));
        btnFuZhiZhangHao.on(cc.Node.EventType.TOUCH_END, this.onCopy.bind(this));
        btnFuZhiZhiHang.on(cc.Node.EventType.TOUCH_END, this.onCopy.bind(this));
        var btnRecharge = this.node.getChildByName("btnRecharge");
        btnRecharge.on(cc.Node.EventType.TOUCH_END, this.onConfirm.bind(this));
        this.bankCardWayList.numItems = 10;
    };
    EBankPanel.prototype.start = function () {
    };
    EBankPanel.prototype.onEnable = function () {
        // this.setOpenBankList();
        this.setBankInfo();
    };
    // update (dt) {}
    EBankPanel.prototype.onListRender = function (item, idx) {
        if (!item)
            return;
        item.getChildByName("text").getComponent(cc.Label).string = "中国银行";
    };
    //当列表项被选择...
    EBankPanel.prototype.onListSelected = function (item, selectedId, lastSelectedId, val) {
        if (!item)
            return;
        console.log("选择了什么银行");
    };
    EBankPanel.prototype.onOpenBankList = function (event) {
        console.log("银行户名" + event.target.name);
    };
    EBankPanel.prototype.onCopy = function (event) {
        var eventName = event.target.name;
        switch (eventName) {
            case "btnFuZhiHuMing":
                console.log("收款户名");
                break;
            case "btnFuZhiHuMing":
                console.log("收款账号");
                break;
            case "btnFuZhiHuMing":
                console.log("收款支行");
                break;
            default:
                break;
        }
    };
    EBankPanel.prototype.setBankInfo = function () {
        for (var index = 0; index < 4; index++) {
            var txt = this.diKuan.getChildByName("label_" + index);
            txt.getComponent(cc.Label).string = index;
        }
    };
    EBankPanel.prototype.onConfirm = function () {
        console.log("确定充值");
    };
    EBankPanel.prototype.callbackEditingDidBegan = function () {
        console.log("做了什么");
    };
    __decorate([
        property(List_1.default)
    ], EBankPanel.prototype, "bankCardWayList", void 0);
    EBankPanel = __decorate([
        ccclass
    ], EBankPanel);
    return EBankPanel;
}(cc.Component));
exports.default = EBankPanel;

cc._RF.pop();