"use strict";
cc._RF.push(module, 'c4f1dKL2nJPqq+QU1lmtwm4', 'PayConfig');
// Script/Config/PayConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Language_1 = require("../Language/Language");
var PayConfig = /** @class */ (function () {
    function PayConfig() {
        this.payTabAtlasList = {
            //线下支付
            "offline": { "name": "官方充值", "is_online": 0, "normalText": "subtitle_vipchongzhi_0", "specialText": "subtitle_vipchongzhi_1", "icon": "leftic5", "panel": "abankPanel" },
            "record": { "name": "充值记录", "is_online": -1, "normalText": "subtitle_chongzijilu_0", "specialText": "subtitle_chongzijilu_1", "icon": "leftic6", "panel": "recordPanel" },
            "alipay_transfer": { "name": "", "is_online": 0, "normalText": "subtitle_zhifubaocongzhi_0", "specialText": "subtitle_zhifubaocongzhi_1", "icon": "leftic1", "panel": "payPanel" },
            "bank_transfer": { "name": "", "is_online": 0, "normalText": "subtitle_zhifubaocongzhi_0", "specialText": "subtitle_zhifubaocongzhi_1", "icon": "leftic1", "panel": "payPanel" },
            "wechat_transfer": { "name": "", "is_online": 0, "normalText": "subtitle_zhifubaocongzhi_0", "specialText": "subtitle_zhifubaocongzhi_1", "icon": "leftic1", "panel": "payPanel" },
            "unionPay_transfer": { "name": "", "is_online": 0, "normalText": "subtitle_zhifubaocongzhi_0", "specialText": "subtitle_zhifubaocongzhi_1", "icon": "leftic1", "panel": "payPanel" },
            //线上支付
            "alipay": { "name": "", "is_online": 1, "normalText": "subtitle_zhifubaocongzhi_0", "specialText": "subtitle_zhifubaocongzhi_1", "icon": "leftic1", "panel": "payPanel" },
            "wechat": { "name": "", "is_online": 1, "normalText": "subtitle_weixinchongzhi_0", "specialText": "subtitle_weixinchongzhi_1", "icon": "leftic2", "panel": "payPanel" },
            "online_bank": { "name": "", "is_online": 1, "normalText": "subtitle_wangyinchongzhi_0", "specialText": "subtitle_wangyinchongzhi_1", "icon": "leftic3", "panel": "payPanel" },
            "unionPay": { "name": "", "is_online": 1, "normalText": "subtitle_yinliansaoma_0", "specialText": "subtitle_yinliansaoma_1", "icon": "leftic4", "panel": "payPanel" },
            "jd": { "name": "", "is_online": 1, "normalText": "subtitle_yinliansaoma_0", "specialText": "subtitle_yinliansaoma_1", "icon": "leftic4", "panel": "payPanel" },
            "baidu": { "name": "", "is_online": 1, "normalText": "subtitle_yinliansaoma_0", "specialText": "subtitle_yinliansaoma_1", "icon": "leftic4", "panel": "payPanel" },
            "withdraw": { "name": "", "is_online": 1, "normalText": "subtitle_yinliansaoma_0", "specialText": "subtitle_yinliansaoma_1", "icon": "leftic4", "panel": "payPanel" },
            4: { "name": "", "is_online": 1, "normalText": "subtitle_vipchongzhi_0", "specialText": "subtitle_vipchongzhi_1", "icon": "leftic5", "panel": "nonePanel" },
            5: { "name": "", "is_online": 1, "normalText": "subtitle_chongzijilu_0", "specialText": "subtitle_chongzijilu_1", "icon": "leftic6", "panel": "topUpListPanel" },
        };
        /** serverConfig
         *
         * 账变类型
         */
        this.accountTypeList = {
            "all": { "name": "accountType_all" },
            "recharge": { "name": "accountType_recharge" },
            "point_from_child": { "name": "accountType_point_from_child" },
            "game_bonus": { "name": "accountType_game_bonus" },
            "cancel_order": { "name": "accountType_cancel_order" },
            "gift": { "name": "accountType_gift" },
            "recharge_from_parent": { "name": "accountType_recharge_from_parent" },
            "system_claim": { "name": "accountType_system_claim" },
            "day_salary": { "name": "accountType_day_salary" },
            "dividend_from_parent": { "name": "accountType_dividend_from_parent" },
            "withdraw_un_frozen": { "name": "accountType_withdraw_un_frozen" },
            "withdraw_frozen": { "name": "accountType_withdraw_frozen" },
            "withdraw_finish": { "name": "accountType_withdraw_finish" },
            "bet_cost": { "name": "accountType_bet_cost" },
            "trace_cost": { "name": "accountType_trace_cost" },
            "real_cost": { "name": "accountType_real_cost" },
            "cancel_point": { "name": "accountType_cancel_point" },
            "cancel_bonus": { "name": "accountType_cancel_bonus" },
            "cancel_fee": { "name": "accountType_cancel_fee" },
            "recharge_to_child": { "name": "accountType_recharge_to_child" },
            "system_reduce": { "name": "accountType_system_reduce" },
            "dividend_to_child": { "name": "accountType_dividend_to_child" },
            "bonus_limit_reduce": { "name": "accountType_bonus_limit_reduce" },
            "artificial_recharge": { "name": "accountType_artificial_recharge" },
            "artificial_deduction": { "name": "accountType_artificial_deduction" },
            "bet_commission": { "name": "accountType_bet_commission" },
            "commission": { "name": "accountType_commission" },
            "trace_un_frozen": { "name": "accountType_trace_un_frozen" },
            "trace_refund": { "name": "accountType_trace_refund" },
            "casino_in": { "name": "accountType_casino_in" },
            "casino_to": { "name": "accountType_casino_to" },
        };
        this.accountTypeNameList = [];
        this.accountSignList = [];
        this.payMoneyList = [10, 50, 100, 200, 300, 500, 1000, 5000];
        //充值分类
        this._dataType = null;
        this._dataDetail = {};
        //賬戶记录列表
        this._recordList = null;
        //充值记录列表
        this._payrecordList = null;
    }
    PayConfig.prototype.getCurAccountSign = function (index) {
        if (this.accountSignList.length <= 0) {
            for (var k in this.accountTypeList) {
                var str = Language_1.G_Language.get(this.accountTypeList[k].name);
                this.accountTypeNameList.push(str);
                this.accountSignList.push(k);
            }
        }
        if (this.accountSignList.length > index) {
            return this.accountSignList[index];
        }
        return null;
    };
    PayConfig.prototype.getAccountTypeValueList = function () {
        if (this.accountTypeNameList.length <= 0) {
            for (var k in this.accountTypeList) {
                var str = Language_1.G_Language.get(this.accountTypeList[k].name);
                this.accountTypeNameList.push(str);
                this.accountSignList.push(k);
            }
        }
        return this.accountTypeNameList;
    };
    PayConfig.prototype.getCurAccoutSignValue = function (sign) {
        if (this.accountTypeList[sign]) {
            var str = Language_1.G_Language.get(this.accountTypeList[sign].name);
            return str;
        }
        return "";
    };
    PayConfig.prototype.setPayItemInfo = function (str, name, is_online) {
        if (this.payTabAtlasList[str] == null) {
            this.payTabAtlasList[str] = this.payTabAtlasList["offline"];
        }
        var tt = this.payTabAtlasList[str];
        tt.name = name;
        tt.is_online = is_online;
    };
    PayConfig.prototype.getPayItemInfo = function (str) {
        return this.payTabAtlasList[str];
    };
    PayConfig.prototype.getRecordListInfo = function (_type, beginTime, endTime) {
        if (this.AccountRecordList == null || this.AccountRecordList.length <= 0) {
            return [];
        }
        console.log("this.AccountRecordList.length     ", this.AccountRecordList.length);
        console.log("_type     ", _type);
        console.log("beginTime     ", beginTime);
        console.log("endTime     ", endTime);
        var list = [];
        this.AccountRecordList.forEach(function (item) {
            var curTime = Date.parse(item.created_at);
            if (curTime >= beginTime && curTime <= endTime) {
                if (_type == "all") {
                    list.push(item);
                }
                else if (item["type_sign"] == _type) {
                    list.push(item);
                }
                else {
                    //empty
                }
            }
        });
        return list;
    };
    PayConfig.prototype.getPayRecordListInfo = function (_type, beginTime, endTime) {
        if (this.PayRecordList == null || this.PayRecordList.length <= 0) {
            return [];
        }
        console.log("this.PayRecordList.length     ", this.PayRecordList.length);
        console.log("_type     ", _type);
        console.log("beginTime     ", beginTime);
        console.log("endTime     ", endTime);
        var list = [];
        this.PayRecordList.forEach(function (item) {
            var curTime = Date.parse(item.created_at);
            if (curTime >= beginTime && curTime <= endTime) {
                if (_type == 0) {
                    list.push(item);
                }
                else if (_type == 1 && item.recharge_status == 0) {
                    list.push(item);
                }
                else if (_type == 2 && item.recharge_status == 1 && item.status == 0) {
                    list.push(item);
                }
                else if (_type == 3 && item.recharge_status == 1 && item.status == 1) {
                    list.push(item);
                }
                else {
                    //empty
                }
            }
        });
        return list;
    };
    Object.defineProperty(PayConfig.prototype, "dataType", {
        get: function () {
            return this._dataType;
        },
        set: function (data) {
            this._dataType = data;
        },
        enumerable: true,
        configurable: true
    });
    PayConfig.prototype.getDataDetail = function (index) {
        console.log('get ' + index);
        return this._dataDetail[index];
    };
    PayConfig.prototype.setDataDetail = function (index, data) {
        console.log('set ' + index);
        this._dataDetail[index] = data;
    };
    Object.defineProperty(PayConfig.prototype, "AccountRecordList", {
        get: function () {
            return this._recordList;
        },
        set: function (data) {
            this._recordList = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PayConfig.prototype, "PayRecordList", {
        get: function () {
            return this._payrecordList;
        },
        set: function (data) {
            this._payrecordList = data;
        },
        enumerable: true,
        configurable: true
    });
    return PayConfig;
}());
exports.PayConfig = PayConfig;

cc._RF.pop();