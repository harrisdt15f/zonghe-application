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
    VipControl.Instance = new VipControl();
    return VipControl;
}());
exports.G_VipControl = VipControl.Instance;

cc._RF.pop();