"use strict";
cc._RF.push(module, '0cd29rIn8tBj4kWy0bssLhT', 'PayControl');
// Script/Controller/PayControl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpHelper_1 = require("../Net/HttpHelper");
var PayConfig_1 = require("../Config/PayConfig");
var RequestConfig_1 = require("../Config/RequestConfig");
var PayControl = /** @class */ (function () {
    function PayControl() {
        this.payConfig = null;
        this.payConfig = new PayConfig_1.PayConfig();
    }
    PayControl.prototype.getPayConfig = function () {
        return this.payConfig;
    };
    /**
     * 获取充值分类
     */
    PayControl.prototype.requesRechargeType = function (call) {
        HttpHelper_1.G_HttpHelper.httpGet(RequestConfig_1.RequestEnum.PayInfo, function (ret) {
            console.log("[获取充值分类]：返回数据", ret);
            if (ret.status) {
                this.getPayConfig().dataType = ret.data;
                //console.log("ret.data   "+ret.data);
                if (call) {
                    call(ret);
                }
            }
        }.bind(this));
    };
    /**
     * 发起充值
     */
    PayControl.prototype.requesSendRecharge = function (isOnLine, channelId, money, call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.Recharge, { "is_online": isOnLine, "channel_id": channelId, "money": money }, function (ret) {
            console.log("[获取充值分类]：返回数据", ret);
            if (ret.status) {
                // this.getCommonConfig().gameHall = ret.data;
                //console.log("ret.data   "+ret.data);
                if (call) {
                    call(ret);
                }
            }
        }.bind(this));
    };
    /**
 * 撤销订单
 */
    PayControl.prototype.requesSendPayCancel = function (order, call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.PayCancel, { "order_no": order }, function (ret) {
            console.log("[撤销订单]：返回数据", ret);
            if (ret.status) {
                // this.getCommonConfig().gameHall = ret.data;
                //console.log("ret.data   "+ret.data);
                if (call) {
                    call(ret);
                }
            }
        }.bind(this));
    };
    /**
 * 确认支付
 */
    PayControl.prototype.requesSendPayTrue = function (order, call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.PayTrue, { "order_no": order }, function (ret) {
            console.log("[确认支付]：返回数据", ret);
            if (ret.status) {
                // this.getCommonConfig().gameHall = ret.data;
                //console.log("ret.data   "+ret.data);
                if (call) {
                    call(ret);
                }
            }
        }.bind(this));
    };
    /**
     *  账户记录
     */
    PayControl.prototype.requesAccountRecord = function (call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.AccountRecord, {
            "type": 1,
        }, function (ret) {
            console.log("账户记录：返回数据", ret);
            if (ret.status) {
                this.getPayConfig().AccountRecordList = ret.data.data;
                console.log("ret.data.data.length   " + ret.data.data.length);
                call(ret);
            }
        }.bind(this));
    };
    /**
     *  充值记录
     */
    PayControl.prototype.requesPayRecord = function (call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.PayRecord, {
            "type": 2,
        }, function (ret) {
            console.log("充值记录：返回数据", ret);
            if (ret.status) {
                this.getPayConfig().PayRecordList = ret.data.data;
                console.log("ret.data.data.length   " + ret.data.data.length);
                call(ret);
            }
        }.bind(this));
    };
    PayControl.Instance = new PayControl();
    return PayControl;
}());
exports.G_PayControl = PayControl.Instance;

cc._RF.pop();