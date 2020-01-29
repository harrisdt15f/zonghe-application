"use strict";
cc._RF.push(module, '6b3f4npkm9Bmbwn0mUtb6UZ', 'UIDatePicker');
// Script/Hall/test/UIDatePicker.ts

"use strict";
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
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
var UIDatePicker = /** @class */ (function (_super) {
    __extends(UIDatePicker, _super);
    function UIDatePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contentNode = null;
        _this.text = null;
        _this._visibleClipNumber = 3; // 同时显示Item的个数
        _this._velocity = 3; // 速率
        _this._timeLimit = 0.5; // 时间限制
        _this._distanceLimit = 500; // 距离限制
        _this._timeCondition = 0.3; // 时间条件
        _this._distanceCondition = 30; // 距离条件
        _this._diffY = 0;
        _this._diffYCount = 0; // 周期性计数,y轴的移动距离
        _this._onceDiffYCount = 0; // 一次触摸y轴的移动距离
        _this._timeCount = 0; // 触摸时间计时
        _this._runningAction = null;
        _this._list = []; // item列表，用来平衡坐标
        _this._originList = [];
        _this._currentItemIndex = 2; // 目前是第几个item
        _this._value = null; // 当前item的value
        _this._beginPos = null;
        _this._backGround = null;
        _this._bMoveing = false;
        _this._bTouching = false;
        _this._bBeginCountTime = false;
        return _this;
    }
    // _fontColor: cc.Color = cc.Color.BLACK
    // cc.color. BLACK
    // _fontSize : number = 40
    // _fontname : string = "Arial"
    // LIFE-CYCLE CALLBACKS:
    UIDatePicker.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchBegin, this);
        var list = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        for (var i = 0; i < list.length; i++) {
            var _text = cc.instantiate(this.text);
            _text.getComponent(cc.Label).string = list[i];
            _text.width = 60;
            _text.height = 125 / 3;
            // _text.x = 0;
            // _text.y = i * _text.height + _text.height / 2
            this.contentNode.addChild(_text, 1, String(i));
            this._list.push(_text);
            this._originList.push(_text);
        }
        this._value = this._originList[0].getComponent(cc.Label).string;
        this._diffYCount = this._list[0].height;
        this._beginPos = cc.p(0, 0);
        this._distanceLimit = 125 * 2 + Math.random() * 50;
    };
    UIDatePicker.prototype.start = function () {
    };
    UIDatePicker.prototype.update = function (dt) {
        if (!this._bTouching && this._bMoveing) { // Action中的时候，计算偏移量
            var diffY = this.contentNode.y - this._beginPos.y;
            this._diffYCount = this._diffYCount + diffY;
            this._beginPos = this.contentNode.getPosition();
        }
        this._balance();
        if (this._bBeginCountTime)
            this._timeCount = this._timeCount + dt;
    };
    UIDatePicker.prototype.onEnable = function () {
    };
    UIDatePicker.prototype._onTouchEnded = function (touch) {
        // var target = touch.getCurrentTarget();
        this._bTouching = false;
        // 计算滑动  计算距离  计算速度
        if ( /*Math.abs(target._onceDiffYCount) > target._distanceCondition &&*/this._timeCount < this._timeCondition) {
            if (this.contentNode.getActionByTag(1))
                this.contentNode.stopAction(this._runningAction);
            var distance = Math.round(this._onceDiffYCount * this._velocity);
            var time = this._timeCount * this._velocity;
            var pn = distance > 0 ? 1 : -1;
            distance = Math.abs(distance) > Math.abs(this._distanceLimit) ? pn * this._distanceLimit : distance;
            time = time < this._timeLimit ? this._timeLimit : time;
            var move = cc.moveBy(time, 0, distance);
            this._runningAction = cc.sequence(move.easing(cc.easeSineOut()), cc.callFunc(this._bounceBalance, this));
            this._runningAction.setTag(1);
            this.contentNode.runAction(this._runningAction);
            console.log("运行》》》》");
            this._beginPos = this.contentNode.getPosition();
            this._bMoveing = true;
        }
        else { // 如果不移动，那么直接做平衡
            this._bounceBalance();
        }
        this._onceDiffYCount = 0;
        this._timeCount = 0;
        this._bBeginCountTime = false;
    };
    UIDatePicker.prototype._onTouchBegan = function (touch) {
        var target = touch.getCurrentTarget();
        if (!target.getBoundingBoxToWorld().contains(touch.getLocation()))
            return false;
        this._beginPos = touch.getLocation();
        this._bTouching = true;
        this._bMoveing = false;
        if (this.contentNode.getActionByTag(1))
            this.contentNode.stopAction(this._runningAction);
        // if (target._contentNode.isRunning())
        //     target._contentNode.stopAction(target._runningAction);
        // 开启滑动计时
        this._bBeginCountTime = true;
        this._timeCount = 0;
        return true;
    };
    UIDatePicker.prototype._onTouchMoved = function (touch) {
        // Move中的时候，计算偏移量
        // var target = touch.getCurrentTarget();
        var getPoint = touch.getLocation();
        var diffY = getPoint.y - this._beginPos.y;
        this.contentNode.y = this.contentNode.y + diffY;
        this._beginPos = getPoint;
        this._diffYCount = this._diffYCount + diffY;
        this._onceDiffYCount = this._onceDiffYCount + diffY;
    };
    UIDatePicker.prototype._bounceBalance = function () {
        var itemHight = this._list[0].height;
        var num = Math.round(this.contentNode.y % itemHight);
        var distance = 0;
        if (num > 0) {
            distance = num > itemHight / 2 ? itemHight - num : -num;
        }
        else {
            distance = num > -itemHight / 2 ? -num : -(itemHight + num);
        }
        var action = cc.moveBy(0.2, 0, distance).easing(cc.easeSineOut());
        this._runningAction = cc.sequence(action, cc.callFunc(this._end, this));
        this._runningAction.setTag(1);
        this.contentNode.runAction(this._runningAction);
        console.log("运行》》000》》");
    };
    UIDatePicker.prototype._end = function () {
        var num = Math.round(this.contentNode.y / this._list[0].height);
        var num2 = -1 * (num % this._list.length);
        if (num2 > 0) {
            this._currentItemIndex = num2 + 2;
        }
        else if (num2 < 0) {
            this._currentItemIndex = this._list.length + num2 + 2;
        }
        else {
            this._currentItemIndex = 2;
        }
        if (this._currentItemIndex > this._list.length) {
            this._currentItemIndex = this._currentItemIndex % this._list.length;
        }
        this._value = this._originList[this._currentItemIndex - 1].getComponent(cc.Label).string;
        cc.log("_end", this._value);
    };
    UIDatePicker.prototype._balance = function () {
        if (this._diffYCount > this._list[0].height) {
            var topItem = this._list.pop();
            topItem.y = this._list[0].y - this._list[0].height;
            this._list.unshift(topItem);
            this._diffYCount = this._diffYCount - this._list[0].height;
        }
        else if (this._diffYCount < -this._list[0].height) {
            var bottomItem = this._list.shift();
            bottomItem.y = this._list[this._list.length - 1].y + this._list[this._list.length - 1].height;
            this._list.push(bottomItem);
            this._diffYCount = this._diffYCount + this._list[0].height;
        }
    };
    __decorate([
        property(cc.Node)
    ], UIDatePicker.prototype, "contentNode", void 0);
    __decorate([
        property(cc.Node)
    ], UIDatePicker.prototype, "text", void 0);
    UIDatePicker = __decorate([
        ccclass
    ], UIDatePicker);
    return UIDatePicker;
}(cc.Component));
exports.default = UIDatePicker;

cc._RF.pop();