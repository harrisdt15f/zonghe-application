"use strict";
cc._RF.push(module, '91f01hNMx9FboKOcIqlSt6Y', 'CommonControl');
// Script/Controller/CommonControl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpHelper_1 = require("../Net/HttpHelper");
var IdentifyKey_1 = require("../Config/IdentifyKey");
var CommonConfig_1 = require("../Config/CommonConfig");
var RequestConfig_1 = require("../Config/RequestConfig");
var CommonControl = /** @class */ (function () {
    function CommonControl() {
        this.commonConfig = null;
        this.commonConfig = new CommonConfig_1.CommonConfig();
    }
    CommonControl.prototype.getCommonConfig = function () {
        return this.commonConfig;
    };
    /**
     * 获取游戏大厅数据
     */
    CommonControl.prototype.requesGameData = function (call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.GameCategories, { "device": 2 }, function (ret) {
            console.log("[游戏大厅]：返回数据", ret);
            if (ret.status && ret.code == IdentifyKey_1.CODE.SUCCEED) {
                this.getCommonConfig().gameHall = ret.data;
                console.log("ret.data   " + ret.data);
                if (call) {
                    call();
                }
            }
        }.bind(this));
    };
    /**
     * 获取游戏分类列表数据
    */
    CommonControl.prototype.requesGameDetailData = function (typeid, call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.GameList, { "device": 2, "type_id": typeid }, function (ret) {
            console.log("[游戏列表]：返回数据", ret);
            if (ret.status && ret.code == IdentifyKey_1.CODE.SUCCEED) {
                // if(ret.data.length > 0)
                // {
                //     this.getCommonConfig().setGameSub(typeid,ret.data);
                // }
                this.getCommonConfig().setGameSub(typeid, ret.data);
                console.log("ret.data   " + ret.data);
                if (call) {
                    call();
                }
            }
        }.bind(this));
    };
    CommonControl.Instance = new CommonControl();
    return CommonControl;
}());
exports.G_CommonControl = CommonControl.Instance;

cc._RF.pop();