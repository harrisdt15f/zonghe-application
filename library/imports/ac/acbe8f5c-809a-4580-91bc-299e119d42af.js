"use strict";
cc._RF.push(module, 'acbe89cgJpFgJG8KZ4RnUKv', 'PagingScrollView');
// Script/Hall/PagingScrollView.ts

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
// this.content.getComponent(cc.Layout).spacingY
// this.content.getComponent(cc.Layout).spacingX
// this.content.getComponent(cc.Layout).paddingBottom
// this.content.getComponent(cc.Layout).paddingLeft
// this.content.getComponent(cc.Layout).paddingRight
// this.content.getComponent(cc.Layout).paddingTop
// this.content.getComponent(cc.Layout).verticalDirection
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PagingScrollView = /** @class */ (function (_super) {
    __extends(PagingScrollView, _super);
    function PagingScrollView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = null;
        _this.labelTop = null;
        _this.labelBottom = null;
        //----------------------
        _this.content = null;
        _this.view = null;
        _this.tempArray = [];
        _this.endCount = 10;
        _this.mvoeCount = 0;
        _this.startCount = 0;
        _this.viewHeight = 0;
        _this.addItemFunc = null;
        _this.toTopRequestFunc = null;
        _this.toBottomRequesFunc = null;
        _this.time = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    PagingScrollView.prototype.onLoad = function () {
        this.view = this.node.getChildByName("view");
        this.content = this.view.getChildByName("content");
        this.content.removeAllChildren();
        // let arrayItem = this.content.children
        this.node.on('scroll-to-top', this.callbackToTop, this);
        this.node.on('scroll-to-bottom', this.callbackToBottom, this);
        this.node.on('touch-up', this.callbackTouchUp, this);
        this.node.on('bounce-bottom', this.callbackBounceBottom, this);
        this.node.on('bounce-top', this.callbackBounceTop, this);
        this.topTextActive(false);
        this.bottomTextActive(false);
        for (var index = 0; index < 13; index++) {
            this.tempArray.push(index + "测试：" + index);
        }
    };
    PagingScrollView.prototype.start = function () {
        this.init();
    };
    // update (dt) {
    // }
    PagingScrollView.prototype.init = function () {
        var _layout = this.content.getComponent(cc.Layout);
        var _spacingy = _layout.spacingY;
        var top = _layout.paddingTop;
        var bottom = _layout.paddingBottom;
        var y = 0;
        var h = 0;
        for (var index = this.startCount; index < this.endCount; index++) {
            if (this.tempArray[index]) {
                var temp = cc.instantiate(this.item);
                temp.parent = this.content;
                h += temp.height;
                y += _spacingy;
                if (this.addItemFunc) {
                    this.addItemFunc(temp, this.tempArray[index], index);
                }
            }
        }
        this.viewHeight = h + y + top + bottom;
        if (this.tempArray.length < 10 && this.viewHeight < this.view.height) {
            this.viewHeight += this.view.height;
        }
        this.content.height += this.viewHeight;
    };
    PagingScrollView.prototype.callbackToTop = function (scrollView) {
        // console.log("最顶",scrollView.getScrollOffset())
        this.topTextActive(true);
        if (this.toTopRequestFunc) {
            this.toTopRequestFunc();
        }
    };
    PagingScrollView.prototype.callbackToBottom = function () {
        if (this.mvoeCount >= Math.floor(this.tempArray.length / 10)) {
            // console.log("最低层了")
            this.bottomTextActive(true);
            return;
        }
        if (this.toBottomRequesFunc) {
            this.toBottomRequesFunc();
        }
        this.mvoeCount++;
        this.endCount += 10;
        this.startCount += 10;
        this.init();
    };
    PagingScrollView.prototype.callbackTouchUp = function (scrollView) {
    };
    PagingScrollView.prototype.callbackBounceBottom = function () {
        console.log("弹跳最低");
        this.bottomTextActive(false);
    };
    PagingScrollView.prototype.callbackBounceTop = function () {
        console.log("弹跳最高");
        this.topTextActive(false);
        this.content.removeAllChildren();
        this.mvoeCount = 0;
        this.endCount = 10;
        this.startCount = 0;
        this.content.height = 0;
        this.viewHeight = 0;
        this.init();
    };
    PagingScrollView.prototype.topTextActive = function (flag) {
        if (flag === void 0) { flag = false; }
        if (this.labelTop) {
            this.labelTop.active = flag;
        }
    };
    PagingScrollView.prototype.bottomTextActive = function (flag) {
        if (flag === void 0) { flag = false; }
        if (this.labelBottom) {
            this.labelBottom.active = flag;
        }
    };
    __decorate([
        property(cc.Node)
    ], PagingScrollView.prototype, "item", void 0);
    __decorate([
        property(cc.Node)
    ], PagingScrollView.prototype, "labelTop", void 0);
    __decorate([
        property(cc.Node)
    ], PagingScrollView.prototype, "labelBottom", void 0);
    PagingScrollView = __decorate([
        ccclass
    ], PagingScrollView);
    return PagingScrollView;
}(cc.Component));
exports.default = PagingScrollView;

cc._RF.pop();