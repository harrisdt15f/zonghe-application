"use strict";
cc._RF.push(module, 'fdfc6TVIJ5Ma7Ht0XaH/xnA', 'SubitemControl');
// Script/Hall/Subitem/SubitemControl.ts

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
var OPEN_TYPE;
(function (OPEN_TYPE) {
    OPEN_TYPE[OPEN_TYPE["NONE"] = 0] = "NONE";
    OPEN_TYPE[OPEN_TYPE["OPEN"] = 1] = "OPEN";
})(OPEN_TYPE || (OPEN_TYPE = {}));
var SubitemControl = /** @class */ (function (_super) {
    __extends(SubitemControl, _super);
    function SubitemControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.leftNode = null;
        _this.rightNode = null;
        _this.nonePanel = null;
        _this.lastItem = null;
        _this.deficiencyNode = null;
        return _this;
    }
    SubitemControl.prototype.onLoad = function () {
        var _this = this;
        this.rightNode.children.forEach(function (item, index) {
            item.active = index == 0;
            if (index == 0)
                _this.lastItem = item;
        }, this);
    };
    SubitemControl.prototype.start = function () {
    };
    SubitemControl.prototype.onEnable = function () {
    };
    // update (dt) {}
    SubitemControl.prototype.onSelectedItem = function (target) {
        this.rightSelectdeItem = target.selecledId;
    };
    Object.defineProperty(SubitemControl.prototype, "rightSelectdeItem", {
        get: function () {
            return this.lastItem;
        },
        /**
         * 选中的页面
         * @param index 有序的下标
         */
        set: function (index) {
            var item = this.rightNode.children[index];
            this.singlePage(item, true, !item);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubitemControl.prototype, "leftSelectedItem", {
        get: function () {
            var selected = this.leftNode.getComponent("myToggleSelected");
            return selected.selectSingle;
        },
        set: function (index) {
            var selected = this.leftNode.getComponent("myToggleSelected");
            selected.selectSingle = index;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 页面的显隐，会先隐藏上一次选中的页面
     * @param item 当前选中的对象
     * @param flag 显隐控制
     * @param deficiency 可选项 出现两边选择项不一样的时候使用
     */
    SubitemControl.prototype.singlePage = function (item, flag, deficiency) {
        if (this.lastItem)
            this.lastItem.active = false;
        item = item ? item : this.addNonePanle(!item || deficiency);
        this.lastItem = item;
        item.active = flag;
    };
    /**
     * 预设界面 未开启界面展示
     * @param execute 是否需要加入预设界面
     */
    SubitemControl.prototype.addNonePanle = function (execute) {
        if (this.deficiencyNode) {
            this.rightNode.removeChild(this.deficiencyNode);
            delete this.deficiencyNode;
            this.deficiencyNode = null;
        }
        if (!execute || !this.nonePanel)
            return;
        this.deficiencyNode = cc.instantiate(this.nonePanel);
        this.deficiencyNode.parent = this.rightNode;
        this.deficiencyNode.active = true;
        return this.deficiencyNode;
    };
    __decorate([
        property(cc.Node)
    ], SubitemControl.prototype, "leftNode", void 0);
    __decorate([
        property(cc.Node)
    ], SubitemControl.prototype, "rightNode", void 0);
    __decorate([
        property({
            type: cc.Prefab,
            tooltip: "仅对有序的有效，往最后一层级添加"
        })
    ], SubitemControl.prototype, "nonePanel", void 0);
    SubitemControl = __decorate([
        ccclass
    ], SubitemControl);
    return SubitemControl;
}(cc.Component));
exports.default = SubitemControl;

cc._RF.pop();