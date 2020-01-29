"use strict";
cc._RF.push(module, '7d336JcVS5CZK/6h2EYjrUJ', 'TimeSelectNode');
// Script/Hall/TimeSelect/TimeSelectNode.ts

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
var Language_1 = require("../../Language/Language");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TimeSelectNode = /** @class */ (function (_super) {
    __extends(TimeSelectNode, _super);
    function TimeSelectNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.classArray = [];
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    TimeSelectNode.prototype.onLoad = function () {
        this.classArray = [];
        var panel = this.node.getChildByName("panel");
        var box = panel.getChildByName("box");
        var year = this.getYear();
        var yearArray = [];
        yearArray.push(year.toString());
        var listYear = box.getChildByName("listYear");
        var classYear = listYear.getComponent("scrollviewTimesSelect");
        classYear.itemInit = yearArray;
        //月
        var month = this.getMonth();
        var listMonth = box.getChildByName("listMonth");
        var classMonth = listMonth.getComponent("scrollviewTimesSelect");
        classMonth.itemInit = month;
        //日
        var selectIndex = classMonth.selectedIndex;
        var day = this.getDay(selectIndex, year);
        var listDay = box.getChildByName("listDay");
        var classDay = listDay.getComponent("scrollviewTimesSelect");
        classDay.itemInit = day;
        //时
        var hour = this.getHour();
        var listHour = box.getChildByName("listHour");
        var classHour = listHour.getComponent("scrollviewTimesSelect");
        classHour.itemInit = hour;
        //分
        var minute = this.getMinute();
        var listMinute = box.getChildByName("listMinute");
        var calssMinute = listMinute.getComponent("scrollviewTimesSelect");
        calssMinute.itemInit = minute;
        //秒
        var second = this.getSecond();
        var listSecond = box.getChildByName("listSecond");
        var classSecond = listSecond.getComponent("scrollviewTimesSelect");
        classSecond.itemInit = second;
    };
    TimeSelectNode.prototype.start = function () {
    };
    // update (dt) {}
    TimeSelectNode.prototype.getYear = function () {
        var date = new Date();
        // date .getYear(); //获取当前年份(2位)
        return date.getFullYear(); //获取完整的年份(4位)
    };
    TimeSelectNode.prototype.getDaysOfMonth = function (year, month) {
        var date = new Date(year, month, 0);
        var days = date.getDate();
        return days;
    };
    //月
    TimeSelectNode.prototype.getMonth = function () {
        var month = [];
        var strMonth = Language_1.G_Language.get("month");
        var index = 1;
        while (index <= 12) {
            month.push(index + strMonth);
            index++;
        }
        return month;
    };
    //天
    TimeSelectNode.prototype.getDay = function (selectKey, year) {
        var maxDay = this.getDaysOfMonth(year, selectKey);
        var day = [];
        var strDay = Language_1.G_Language.get("day");
        var index = 1;
        while (index <= maxDay) {
            day.push(index + strDay);
            index++;
        }
        return day;
    };
    //时
    TimeSelectNode.prototype.getHour = function () {
        var hour = [];
        var strHour = Language_1.G_Language.get("hour");
        var index = 0;
        while (index < 24) {
            hour.push(index + strHour);
            index++;
        }
        return hour;
    };
    //分
    TimeSelectNode.prototype.getMinute = function () {
        var minute = [];
        var strMinute = Language_1.G_Language.get("minute");
        var index = 0;
        while (index < 60) {
            minute.push(index + strMinute);
            index++;
        }
        return minute;
    };
    //秒
    TimeSelectNode.prototype.getSecond = function () {
        var second = [];
        var strSecond = Language_1.G_Language.get("second");
        var index = 0;
        while (index < 60) {
            second.push(index + strSecond);
            index++;
        }
        return second;
    };
    TimeSelectNode.prototype.getSelectTiemGroup = function () {
        var n = this.classArray[0].getSelectIndex();
        var y = this.classArray[1].getSelectIndex();
        var r = this.classArray[2].getSelectIndex();
        var s = this.classArray[3].getSelectIndex();
        var f = this.classArray[4].getSelectIndex();
        var m = this.classArray[5].getSelectIndex();
        // string.formats
        return { n: n, y: y, r: r, s: s, f: f, m: m };
    };
    TimeSelectNode = __decorate([
        ccclass
    ], TimeSelectNode);
    return TimeSelectNode;
}(cc.Component));
exports.default = TimeSelectNode;

cc._RF.pop();