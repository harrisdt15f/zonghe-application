"use strict";
cc._RF.push(module, 'a43fexsiUJLi4lIGA4Hk6o4', 'VipControl');
// Script/Controller/VipControl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpHelper_1 = require("../Net/HttpHelper");
var IdentifyKey_1 = require("../Config/IdentifyKey");
var VipConfig_1 = require("../Config/VipConfig");
var OnFire_1 = require("../Net/OnFire");
var uiEvent_1 = require("../Config/uiEvent");
var UserControl_1 = require("./UserControl");
var VipControl = /** @class */ (function () {
    function VipControl() {
        this.vipConfig = null;
        this.vipConfig = new VipConfig_1.VipConfig();
    }
    VipControl.prototype.getVipConfig = function () {
        return this.vipConfig;
    };
    /**
     * 获取VIP配置
     */
    VipControl.prototype.requesVipData = function () {
        if (this.vipConfig.data != null) {
            return;
        }
        HttpHelper_1.G_HttpHelper.httpGet("/app-api/user/grades", function (ret) {
            console.log("[获取VIP配置]：返回数据", ret);
            if (ret.status && ret.code == IdentifyKey_1.CODE.SUCCEED) {
                this.vipConfig.data = ret.data;
                console.log("ret.data   " + ret.data);
            }
            OnFire_1.G_OnFire.fire(uiEvent_1.EventRequest.VipUpdate);
        }.bind(this));
    };
    /**
     * 领取晋级赠金
     */
    VipControl.prototype.requesVipPromotion = function (call) {
        console.log("领取晋级赠金1");
        if (this.vipConfig.data == null) {
            return;
        }
        console.log("领取晋级赠金2");
        HttpHelper_1.G_HttpHelper.httpPost("/app-api/user/promotion-gifts", null, function (ret) {
            console.log("[领取晋级赠金]：返回数据", ret);
            if (ret.status && ret.code == IdentifyKey_1.CODE.SUCCEED) {
                UserControl_1.G_UserControl.getUser().vippromotion = 0;
                console.log("ret.data   " + ret.data);
            }
            // G_OnFire.fire(EventRequest.VipUpdate)  
            if (call) {
                call(ret);
            }
        }.bind(this));
    };
    /**
     * 领取每周赠金
     */
    VipControl.prototype.requesVipWeekLy = function (call) {
        console.log("领取每周赠金1");
        if (this.vipConfig.data == null) {
            return;
        }
        console.log("领取每周赠金2");
        HttpHelper_1.G_HttpHelper.httpPost("/app-api/user/weekly-gifts", null, function (ret) {
            console.log("[领取每周赠金]：返回数据", ret);
            if (ret.status && ret.code == IdentifyKey_1.CODE.SUCCEED) {
                UserControl_1.G_UserControl.getUser().vipweekly = 0;
                console.log("ret.data   " + ret.data);
            }
            // G_OnFire.fire(EventRequest.VipUpdate)  
            if (call) {
                call(ret);
            }
        }.bind(this));
    };
    VipControl.Instance = new VipControl();
    return VipControl;
}());
exports.G_VipControl = VipControl.Instance;

cc._RF.pop();