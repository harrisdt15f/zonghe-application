"use strict";
cc._RF.push(module, '0cd5crTVoxDb4vd6DXRO51E', 'MyPulldownMenu');
// Script/Common/MyPulldownMenu.ts

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
/**
 * 自定义 下拉列表
 */
var List_1 = require("./List");
var Utils_1 = require("../Tool/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MyPullDownSelectNode = /** @class */ (function (_super) {
    __extends(MyPullDownSelectNode, _super);
    function MyPullDownSelectNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        _this.selectMenu = null;
        _this.text = null;
        _this.arrows = null;
        _this.mask = null;
        _this.selectedEvent = new cc.Component.EventHandler();
        _this.clickEvent = new cc.Component.EventHandler();
        // LIFE-CYCLE CALLBACKS:
        _this._tempFlag = true;
        _this._selectResult = {};
        _this._menuData = null;
        _this._menuView = null;
        return _this;
    }
    Object.defineProperty(MyPullDownSelectNode.prototype, "selectResult", {
        get: function () {
            return this._selectResult;
        },
        set: function (result) {
            this._selectResult = result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPullDownSelectNode.prototype, "menuData", {
        get: function () {
            return this._menuData;
        },
        set: function (data) {
            this._menuData = data;
            this.text.getComponent(cc.Label).string = data[0];
            if (this.list.node.active) {
                this.list.numItems = this._menuData.length;
            }
            this.selectResult = {
                "selectedId": 0,
                "text": data[0],
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyPullDownSelectNode.prototype, "menuView", {
        get: function () {
            return this._menuView;
        },
        set: function (flag) {
            this._menuView = flag;
            this.list.node.active = flag;
            this.mask.active = flag;
            if (this._menuData
                && this.list.numItems <= 0) {
                this._tempFlag = false;
                this.list.numItems = this._menuData.length;
                this.list.selectedId = 0;
            }
            this.arrows.angle = !this.list.node.active ? 0 : 180;
            //点击在此控件 注册事件监听
            if (this.clickEvent) {
                cc.Component.EventHandler.emitEvents([this.clickEvent], this.node, flag);
            }
        },
        enumerable: true,
        configurable: true
    });
    MyPullDownSelectNode.prototype.onLoad = function () {
        // this.selectMenu.on(cc.Node.EventType.TOUCH_END, this.onSelectMenu.bind(this));
        Utils_1.G_Utils.onClickEnd(this.selectMenu, this.onSelectMenu, this);
        this._menuView = this.list.node.active;
        if (this.mask) {
            this.mask.x = 0;
            this.mask.y = 0;
            this.mask.width = cc.winSize.width;
            this.mask.height = cc.winSize.height;
            var pos = this.mask.convertToWorldSpaceAR(cc.v2(this.mask.x - this.mask.anchorX * this.mask.width, this.mask.y - this.mask.anchorY * this.mask.height));
            this.mask.x = -pos.x;
            this.mask.y = -pos.y;
            // this.mask.on(cc.Node.EventType.TOUCH_END, this.onMaskClose, this);
            Utils_1.G_Utils.onClickEnd(this.mask, this.onMaskClose, this);
            this.mask.active = this._menuView;
        }
    };
    MyPullDownSelectNode.prototype.start = function () {
    };
    MyPullDownSelectNode.prototype.onEnable = function () {
    };
    // update (dt) {}
    MyPullDownSelectNode.prototype.onSelectMenu = function () {
        this.menuView = !this.menuView;
    };
    MyPullDownSelectNode.prototype.onListRender = function (item, idx) {
        item.getChildByName("text").getComponent(cc.Label).string = this._menuData[idx];
    };
    //当列表项被选择...
    MyPullDownSelectNode.prototype.onListSelected = function (item, selectedId, lastSelectedId, val) {
        if (!item)
            return;
        //防止第一次初始的时候关闭了下拉列表框
        if (!this._tempFlag) {
            this._tempFlag = true;
            return;
        }
        this.selectResult = {
            "selectedId": selectedId,
            "text": this._menuData[selectedId],
        };
        this.menuView = !this.menuView;
        this.text.getComponent(cc.Label).string = this._menuData[selectedId];
        if (this.selectedEvent) {
            cc.Component.EventHandler.emitEvents([this.selectedEvent], this.selectResult);
        }
    };
    MyPullDownSelectNode.prototype.onMaskClose = function () {
        this.menuView = !this.menuView;
    };
    __decorate([
        property(List_1.default)
    ], MyPullDownSelectNode.prototype, "list", void 0);
    __decorate([
        property(cc.Node)
    ], MyPullDownSelectNode.prototype, "selectMenu", void 0);
    __decorate([
        property(cc.Label)
    ], MyPullDownSelectNode.prototype, "text", void 0);
    __decorate([
        property(cc.Node)
    ], MyPullDownSelectNode.prototype, "arrows", void 0);
    __decorate([
        property(cc.Node)
    ], MyPullDownSelectNode.prototype, "mask", void 0);
    __decorate([
        property({
            type: cc.Component.EventHandler,
            tooltip: CC_DEV && '选择',
        })
    ], MyPullDownSelectNode.prototype, "selectedEvent", void 0);
    __decorate([
        property({
            type: cc.Component.EventHandler,
            tooltip: CC_DEV && '点击事件',
        })
    ], MyPullDownSelectNode.prototype, "clickEvent", void 0);
    MyPullDownSelectNode = __decorate([
        ccclass
    ], MyPullDownSelectNode);
    return MyPullDownSelectNode;
}(cc.Component));
exports.default = MyPullDownSelectNode;

cc._RF.pop();