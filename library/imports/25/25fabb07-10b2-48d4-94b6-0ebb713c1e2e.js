"use strict";
cc._RF.push(module, '25fabsHELJI1JS2DrtxPB4u', 'Utils');
// Script/Tool/Utils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
        /**
         * 是否iOS
        **/
        this.isiOS = function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端   
            return isiOS;
        };
        /**
         * 是否Android
        **/
        this.isAndroid = function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器   
            return isAndroid;
        };
    }
    Utils.prototype.onButtonClick = function (node, className, funcName, eventData) {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = node; //这个 node 节点是你的事件处理代码组件所属的节点，这里就是Button2
        clickEventHandler.component = className; //这个是脚本文件名
        clickEventHandler.handler = funcName; //回调函名称
        clickEventHandler.customEventData = eventData; //用户数据
        var button = node.getComponent(cc.Button); //获取cc.Button组件
        button.clickEvents.push(clickEventHandler); //增加处理
    };
    Utils.prototype.onClickEnd = function (node, callback, self) {
        node.on(cc.Node.EventType.TOUCH_END, callback, self);
    };
    Utils.prototype.getPhoneNumberStar = function (str) {
        return str.substring(0, 3) + "****" + str.substring(7, str.length);
    };
    //"元"符号 
    Utils.prototype.setStringOfUnit = function (str) {
        return str + "/";
    };
    //校验手机号码
    Utils.prototype.isPoneAvailable = function (str) {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        }
        else {
            return true;
        }
    };
    //阿拉伯数字转中文数字
    Utils.prototype.sectionToChinese = function (_section) {
        var REG_NUMBER = /^([+-])?0*(\d+)(\.(\d+))?$/;
        var ch = '零一二三四五六七八九';
        var ch_u = '个十百千万亿';
        var tenm = true;
        var n0 = ch.charAt(0);
        var getNumbResult = function (num) {
            var result = REG_NUMBER.exec(num.toString());
            if (result) {
                return {
                    int: result[2],
                    decimal: result[4],
                    minus: result[1] == "-",
                    num: result.slice(1, 3).join('') // 带符号整数
                };
            }
        };
        var clearZero = function (str, zero, type) {
            if (type === void 0) { type = null; }
            if (str == null)
                return "";
            var reg0 = ~"*.?+$^[](){}|\\/".indexOf(zero) ? "\\" + zero : zero;
            var arg_s = new RegExp("^" + reg0 + "+"), arg_e = new RegExp(reg0 + "+$"), arg_d = new RegExp(reg0 + "{2}", "g");
            str = str.toString();
            if (type == "^") {
                str = str.replace(arg_s, "");
            }
            if (!type || type == "$") {
                str = str.replace(arg_e, "");
            }
            if (!type || type == "nto1") {
                str = str.replace(arg_d, zero);
            }
            return str;
        };
        var encodeInt = function (_int) {
            _int = getNumbResult(_int).int;
            var int = "";
            var _length = _int.length;
            if (_length == 1) {
                return ch.charAt(+_int);
            }
            if (_length <= 4) { //小于四位
                for (var i = 0, n = _length; n--;) {
                    var _num = +_int.charAt(i);
                    int += (tenm && _length == 2 && i == 0 && _num == 1) ? "" : ch.charAt(_num);
                    int += (_num && n ? ch_u.charAt(n) : '');
                    i++;
                }
            }
            else {
                var d = _int.length / 4 >> 0;
                var y = _int.length % 4;
                while (y == 0 || !ch_u.charAt(3 + d)) {
                    y += 4;
                    d--;
                }
            }
            int = clearZero(int, n0);
            return int;
        };
        return encodeInt(String(_section));
    };
    //随机数
    Utils.prototype.random = function (lower, upper) {
        return Math.round(Math.random() * (upper - lower) + lower);
        //或者 Math.ceil(Math.random() *(upper-lower)+lower)
    };
    Utils.prototype.getObjectEvent = function (_event) {
        var tempData = Object.keys(_event);
        return tempData;
    };
    Utils.prototype.getObjectEventByIndex = function () {
        return 0;
    };
    //字符串格式化
    Utils.prototype.format = function (str) {
        var placeholder = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            placeholder[_i - 1] = arguments[_i];
        }
        if (placeholder.length == 0)
            return this;
        var param = placeholder[0];
        var s = str;
        if (typeof (param) == 'object') {
            for (var key in param)
                s = s.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
            return s;
        }
        else {
            for (var i = 0; i < placeholder.length; i++)
                s = s.replace(new RegExp("\\{" + i + "\\}", "g"), placeholder[i]);
            return s;
        }
    };
    //整数
    Utils.prototype.isInteger = function (str) {
        var t = /^\d*$/;
        var m = t.test(str);
        return m;
    };
    Utils.Instance = new Utils();
    return Utils;
}());
// declare const testNumm = 0;
exports.G_Utils = Utils.Instance;

cc._RF.pop();