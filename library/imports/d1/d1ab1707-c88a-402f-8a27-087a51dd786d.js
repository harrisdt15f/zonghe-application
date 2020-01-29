"use strict";
cc._RF.push(module, 'd1ab1cHyIpAL4onCHpR3Xht', 'scrollviewTimesSelect');
// Script/Hall/TimeSelect/scrollviewTimesSelect.ts

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
exports.textColor = {
    white: cc.color(255, 255, 255),
    yellow: cc.color(234, 238, 139)
};
var scrollviewTimesSelect = /** @class */ (function (_super) {
    __extends(scrollviewTimesSelect, _super);
    function scrollviewTimesSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.listItem = null;
        // private _listItem = null;
        // private content = null;
        _this.tempItemY = [];
        _this.tempItem = [];
        _this._itemInit = null;
        _this._selectedIndex = 0;
        return _this;
    }
    // public selectItemIndex = 0;
    // public slideEndFunc = null;
    // LIFE-CYCLE CALLBACKS:
    scrollviewTimesSelect.prototype.onLoad = function () {
        // let view = this.node.getChildByName("view");
        // this.content = view.getChildByName("content");
        // this._listItem = this.content.getChildByName("item")
        this.node.on('scrolling', this._callbackScrolling, this);
        this.node.on('scroll-ended', this._callbackScrollEnded, this);
    };
    scrollviewTimesSelect.prototype.start = function () {
    };
    Object.defineProperty(scrollviewTimesSelect.prototype, "itemInit", {
        get: function () {
            return this._itemInit;
        },
        set: function (array) {
            this._itemInit = array;
            this.content.removeAllChildren();
            this.tempItem = [];
            this.tempItemY = [];
            var y = 0;
            array.forEach(function (value, index) {
                var _item = cc.instantiate(this.listItem);
                var _numNode = _item.getChildByName("num");
                _numNode.getComponent(cc.Label).string = value;
                _item.parent = this.content;
                this.setColorByScale(_numNode, 0.8, exports.textColor.white);
                this.tempItemY.push(y);
                this.tempItem.push(_item);
                y += _item.height;
            }, this);
            this.selectedIndex = 0;
            var scrollviewNode = this.node.getComponent(cc.ScrollView);
            scrollviewNode.scrollToOffset(cc.v2(0, this.tempItemY[this.selectedIndex]));
            var _numNode = this.tempItem[this.selectedIndex].getChildByName("num");
            this.setColorByScale(_numNode, 1, exports.textColor.yellow);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(scrollviewTimesSelect.prototype, "selectedIndex", {
        get: function () {
            return this._selectedIndex;
        },
        set: function (sIdx) {
            this._selectedIndex = sIdx;
        },
        enumerable: true,
        configurable: true
    });
    scrollviewTimesSelect.prototype.setColorByScale = function (node, scale, color) {
        node.color = color;
        node.scale = scale;
    };
    // update (dt) {}
    scrollviewTimesSelect.prototype._callbackScrolling = function (scrollView) {
        var _this = this;
        scrollView.content.children.forEach(function (childNode, idx) {
            var _numNode = childNode.getChildByName("num");
            _this.setColorByScale(_numNode, 0.8, exports.textColor.white);
        }, this);
        for (var index = 0; index < this.tempItemY.length; index++) {
            var offy = scrollView.getScrollOffset().y - 10;
            var itemY = this.tempItemY[index];
            var endItemY = this.tempItemY[this.tempItemY.length - 1];
            if (offy <= itemY || (itemY >= endItemY && offy > endItemY)) {
                this.selectedIndex = index;
                var numNode = this.tempItem[index].getChildByName("num");
                this.setColorByScale(numNode, 1, exports.textColor.yellow);
                break;
            }
        }
    };
    scrollviewTimesSelect.prototype._callbackScrollEnded = function (scrollView) {
        var idx = this.selectedIndex;
        var itemY = this.tempItemY[idx];
        var scrollviewNode = this.node.getComponent(cc.ScrollView);
        scrollviewNode.scrollToOffset(cc.v2(.1, itemY));
    };
    __decorate([
        property(cc.Node)
    ], scrollviewTimesSelect.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], scrollviewTimesSelect.prototype, "listItem", void 0);
    scrollviewTimesSelect = __decorate([
        ccclass
    ], scrollviewTimesSelect);
    return scrollviewTimesSelect;
}(cc.Component));
exports.default = scrollviewTimesSelect;

cc._RF.pop();