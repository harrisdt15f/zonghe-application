"use strict";
cc._RF.push(module, '8d74eAKw/tPLKC7E5B60hHG', 'SignInBox');
// Script/Hall/Activity/SignInBox.ts

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
var List_1 = require("../../Common/List");
var UiForms_1 = require("../../Tool/UiForms");
var Language_1 = require("../../Language/Language");
var colorList = [
    cc.color(108, 20, 19),
    cc.color(247, 239, 149),
    cc.color(255, 255, 255),
];
var tempSignInList = [];
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DateSignin = /** @class */ (function () {
    function DateSignin() {
        this._time = new Date();
    }
    /**
     * 获取当月总天数
     * @return number 总天数
     */
    DateSignin.prototype.getNowMonthDaySum = function () {
        var year = this._time.getFullYear();
        var month = this._time.getMonth() + 1;
        var date = new Date(year, month, 0);
        return date.getDate();
    };
    DateSignin.prototype.getNowMonth = function () {
        return this._time.getMonth();
    };
    DateSignin.prototype.getNowDay = function () {
        return this._time.getDate();
    };
    return DateSignin;
}());
var SignInBox = /** @class */ (function (_super) {
    __extends(SignInBox, _super);
    function SignInBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        _this.headAtlas = null;
        _this.head = null;
        _this.labDay = null;
        _this._currMonth = null;
        _this._currDay = null;
        _this._datesignin = new DateSignin();
        //文字
        _this.didNotSignIn = Language_1.G_Language.get("DidNotSignIn");
        _this.alreadySignedIn = Language_1.G_Language.get("AlreadySignedIn");
        _this.toSignIn = Language_1.G_Language.get("ToSignIn");
        _this.signinsucceed = Language_1.G_Language.get("signinsucceed");
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    SignInBox.prototype.onLoad = function () {
        tempSignInList = [];
        this.initListItem();
        var _month = this._datesignin.getNowMonth();
        this._currMonth = Utils_1.G_Utils.sectionToChinese(Number(_month + 1)) + "月";
        var mDayNum = this._datesignin.getNowMonthDaySum();
        this._currDay = this._datesignin.getNowDay();
        this.list.numItems = mDayNum;
    };
    SignInBox.prototype.start = function () {
    };
    // update (dt) {}
    SignInBox.prototype.initListItem = function () {
        var temp = [2, 6, 10];
        var flag = true;
        var sum = this._datesignin.getNowMonthDaySum();
        for (var index = 0; index <= sum; index++) {
            flag = true;
            for (var j = 0; j < temp.length; j++) {
                if (index == temp[j]) {
                    tempSignInList.push(1);
                    flag = false;
                }
            }
            if (flag) {
                tempSignInList.push(0);
            }
        }
    };
    SignInBox.prototype.onEnable = function () {
        this.list.scrollTo(this._currDay - 1, .1, null, false);
    };
    SignInBox.prototype.onListRender = function (item, idx) {
        var currDay = idx + 1;
        var data = tempSignInList[idx];
        var gx = item.getChildByName("fg");
        gx.active = false;
        var label1 = item.getChildByName("label_1");
        var label2 = item.getChildByName("label_2");
        var label3 = item.getChildByName("label_3");
        label2.getComponent(cc.Label).string = this._currMonth;
        label3.getComponent(cc.Label).string = String(idx + 1);
        if (currDay >= this._currDay) {
            if (data == 1) {
                this.setLabel(item, colorList[1], this.alreadySignedIn);
            }
            else {
                this.setLabel(item, colorList[2], this.toSignIn);
                gx.active = currDay == this._currDay;
            }
        }
        else {
            // gx.active = false;
            if (data == 1) {
                this.setLabel(item, colorList[1], this.alreadySignedIn);
            }
            else {
                this.setLabel(item, colorList[0], this.didNotSignIn);
            }
        }
    };
    //当列表项被选择...
    SignInBox.prototype.onListSelected = function (item, selectedId, lastSelectedId, val) {
        if (!item)
            return;
        var data = tempSignInList[selectedId];
        var index = selectedId + 1;
        if (index == this._currDay) {
            var tips = data != 1 ? this.signinsucceed : this.alreadySignedIn;
            UiForms_1.G_UiForms.hint(tips);
            var gx = item.getChildByName("fg");
            gx.active = false;
        }
        if (index > this._currDay) {
            UiForms_1.G_UiForms.hint(this.didNotSignIn);
        }
        if (index < this._currDay) {
            var tips = data != 1 ? this.didNotSignIn : this.alreadySignedIn;
            UiForms_1.G_UiForms.hint(tips);
        }
    };
    SignInBox.prototype.setLabel = function (item, color, txt) {
        var lab1 = item.getChildByName("label_1");
        var lab2 = item.getChildByName("label_2");
        var lab3 = item.getChildByName("label_3");
        lab1.getComponent(cc.Label).string = txt;
        lab1.color = color;
        lab2.color = color;
        lab3.color = color;
    };
    SignInBox.prototype.onClose = function () {
        this.node.active = false;
    };
    __decorate([
        property(List_1.default)
    ], SignInBox.prototype, "list", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], SignInBox.prototype, "headAtlas", void 0);
    __decorate([
        property(cc.Sprite)
    ], SignInBox.prototype, "head", void 0);
    __decorate([
        property(cc.Label)
    ], SignInBox.prototype, "labDay", void 0);
    SignInBox = __decorate([
        ccclass
    ], SignInBox);
    return SignInBox;
}(cc.Component));
exports.default = SignInBox;

cc._RF.pop();