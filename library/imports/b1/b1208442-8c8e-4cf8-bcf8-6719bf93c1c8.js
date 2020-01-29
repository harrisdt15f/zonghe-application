"use strict";
cc._RF.push(module, 'b1208RCjI5M+Lz4Zxm/k8HI', 'myToggleSelected');
// Script/Hall/Subitem/myToggleSelected.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
var myToggleSelected = /** @class */ (function (_super) {
    __extends(myToggleSelected, _super);
    function myToggleSelected() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.allowSwitchOff = false;
        _this.clickEndEvent = new cc.Component.EventHandler();
        _this.currNode = null;
        _this.lastSelected = null;
        return _this;
    }
    myToggleSelected.prototype.onLoad = function () {
        var _this = this;
        this.currNode = this.content || this.node;
        this.currNode.children.forEach(function (item, index) {
            if (index == 0)
                _this.lastSelected = item;
            var itemAs = item;
            itemAs.selecledId = index;
            itemAs.isChecked = index == 0;
            _this.singleItem(item, index == 0);
            Utils_1.G_Utils.onClickEnd(item, _this.onToggleEnd, _this);
        }, this);
    };
    myToggleSelected.prototype.start = function () {
    };
    // update (dt) {}
    myToggleSelected.prototype.onEnable = function () {
    };
    myToggleSelected.prototype.onToggleEnd = function (item) {
        this.select = item.target;
    };
    /**
     * 选项显隐控制
     * @param item 当前的选择
     * @param flag 显隐
     */
    myToggleSelected.prototype.singleItem = function (item, flag) {
        item.isChecked = flag;
        item.getChildByName("select").active = flag;
        item.getChildByName("BgText").active = !flag;
        item.getChildByName("checkmarkText").active = flag;
    };
    Object.defineProperty(myToggleSelected.prototype, "selectSingle", {
        get: function () {
            return this.lastSelected;
        },
        /**
         * 控制选择某一项
         * @param key  下标（有序）
         */
        set: function (key) {
            this.select = this.currNode.children[key];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(myToggleSelected.prototype, "select", {
        get: function () {
            return this.lastSelected;
        },
        set: function (item) {
            if (!this.allowSwitchOff && item.isChecked)
                return;
            if (this.lastSelected)
                this.singleItem(this.lastSelected, false);
            this.lastSelected = item;
            this.singleItem(item, true);
            if (this.clickEndEvent)
                cc.Component.EventHandler.emitEvents([this.clickEndEvent], item);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        property(cc.Node)
    ], myToggleSelected.prototype, "content", void 0);
    __decorate([
        property({
            tooltip: "选中此选项，在选择后下次点击还可以响应，状态不变"
        })
    ], myToggleSelected.prototype, "allowSwitchOff", void 0);
    __decorate([
        property({
            type: cc.Component.EventHandler,
            tooltip: CC_DEV && '点击事件',
        })
    ], myToggleSelected.prototype, "clickEndEvent", void 0);
    myToggleSelected = __decorate([
        ccclass,
        executionOrder(-6000)
    ], myToggleSelected);
    return myToggleSelected;
}(cc.Component));
exports.default = myToggleSelected;

cc._RF.pop();