"use strict";
cc._RF.push(module, '20634HgSAtH65910jacHpNE', 'WithDrawControl');
// Script/Controller/WithDrawControl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpHelper_1 = require("../Net/HttpHelper");
var RequestConfig_1 = require("../Config/RequestConfig");
var WithDrawConfig_1 = require("../Config/WithDrawConfig");
var UserControl_1 = require("./UserControl");
var WithDrawControl = /** @class */ (function () {
    function WithDrawControl() {
        this.withDrawConfig = null;
        this.bindAlipay = false;
        this.bindBank = false;
        this.withDrawConfig = new WithDrawConfig_1.WithDrawConfig();
    }
    WithDrawControl.prototype.getConfig = function () {
        return this.withDrawConfig;
    };
    WithDrawControl.prototype.isBindAliPay = function () {
        return this.bindAlipay;
    };
    WithDrawControl.prototype.isBindBank = function () {
        return this.bindBank;
    };
    // Banks ="Banks",
    // AlipayBind ="AlipayBind",
    // AlipayBindFirst ="AlipayBindFirst",
    // BankBind ="BankBind",
    // BankBindFirst ="BankBindFirst",
    // Accounts ="Accounts",
    // AccountDel ="AccountDel",
    // DrawCheck ="DrawCheck",
    // WithDraw ="WithDraw",   
    WithDrawControl.prototype.GetMyAccountList = function (call) {
        if (this.getConfig().MyAccountList == null || this.getConfig().MyAccountList.length <= 0) {
            this.requesMyAccounts(call);
        }
        else {
            call();
        }
    };
    WithDrawControl.prototype.GetBanksList = function (call) {
        if (this.getConfig().BankList == null || this.getConfig().BankList.length <= 0) {
            this.requesBanks(call);
        }
        else {
            call();
        }
    };
    /**
     * 系统支持的银行列表
     */
    WithDrawControl.prototype.requesBanks = function (call) {
        HttpHelper_1.G_HttpHelper.httpGet(RequestConfig_1.RequestEnum.Banks, function (ret) {
            console.log("[系统支持的银行列表]：返回数据", ret);
            if (ret.status) {
                this.getConfig().BankList = ret.data;
                //console.log("ret.data   "+ret.data);
                if (call) {
                    call(ret);
                }
            }
        }.bind(this));
    };
    /**
     * 账户列表
     */
    WithDrawControl.prototype.requesMyAccounts = function (call) {
        HttpHelper_1.G_HttpHelper.httpGet(RequestConfig_1.RequestEnum.Accounts, function (ret) {
            console.log("[账户列表]：返回数据", ret);
            if (ret.status) {
                this.getConfig().MyAccountList = ret.data;
                this.checkBindType();
                //console.log("ret.data   "+ret.data);
                if (call) {
                    call(ret);
                }
            }
        }.bind(this));
    };
    WithDrawControl.prototype.checkBindType = function () {
        var _this = this;
        var list = this.getConfig().MyAccountList;
        list.forEach(function (element) {
            if (element.code == "ALIPAY") {
                _this.bindAlipay = true;
            }
            else {
                _this.bindBank = true;
            }
        });
    };
    /**
     * 立刻提现-绑定支付宝
     */
    WithDrawControl.prototype.requesAlipayBind = function (name, account, call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.AlipayBind, { "owner_name": name, "card_number": account }, function (ret) {
            console.log("绑定：返回数据", ret);
            if (ret.status) {
                console.log("0000");
                this.requesMyAccounts(call);
            }
            else {
                if (call) {
                    call(ret);
                }
            }
        }.bind(this));
    };
    /**
     * 立刻提现-绑定支付宝首次
     */
    WithDrawControl.prototype.requesAlipayBindFirst = function (name, account, password, passwordAgain, call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.AlipayBindFirst, {
            "owner_name": name,
            "card_number": account,
            "fund_password": password,
            "fund_password_confirmation": passwordAgain
        }, function (ret) {
            console.log("绑定：返回数据", ret);
            if (ret.status) {
                this.requesMyAccounts(call);
            }
            else {
                if (call) {
                    call(ret);
                }
            }
        }.bind(this));
    };
    /**
     * 立刻提现-绑定银行卡
     */
    WithDrawControl.prototype.requesBankBind = function (name, account, branch, code, bank_id, call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.BankBind, {
            "owner_name": name,
            "card_number": account,
            "branch": branch,
            "code": code,
            "bank_id": bank_id
        }, function (ret) {
            console.log("绑定：返回数据", ret);
            if (ret.status) {
                this.requesMyAccounts(call);
            }
            else {
                if (call) {
                    call(ret);
                }
            }
        }.bind(this));
    };
    /**
     * 立刻提现-绑定银行卡首次
     */
    WithDrawControl.prototype.requesBankBindFirst = function (name, account, branch, code, bank_id, password, passwordAgain, call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.BankBindFirst, {
            "owner_name": name,
            "card_number": account,
            "branch": branch,
            "code": code,
            "bank_id": bank_id,
            "fund_password": password,
            "fund_password_confirmation": passwordAgain
        }, function (ret) {
            console.log("绑定：返回数据", ret);
            if (ret.status) {
                this.requesMyAccounts(call);
            }
            else {
                if (call) {
                    call(ret);
                }
            }
        }.bind(this));
    };
    /**
     *  账户管理-账户删除
     */
    WithDrawControl.prototype.requesAccountDel = function (cardid, securityCode, name, vcode, vcodeKey, call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.AccountDel, {
            "card_id": cardid,
            "security_code": securityCode,
            "owner_name": name,
            "verification_code": vcode,
            "verification_key": vcodeKey,
        }, function (ret) {
            console.log("账户删除：返回数据", ret);
            if (ret.status) {
                this.requesMyAccounts(call);
            }
            else {
                if (call) {
                    call(ret);
                }
            }
        }.bind(this));
    };
    /**
 *  账户管理-账户删除获取手机验证码
 */
    WithDrawControl.prototype.requesAccountDelVcode = function (call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.AccountDelCode, null, function (ret) {
            console.log("验证码：返回数据", ret);
            if (call) {
                call(ret);
            }
        }.bind(this));
    };
    /**
     *  检查是否设置取款密码
     */
    WithDrawControl.prototype.requesDrawCheck = function (call) {
        HttpHelper_1.G_HttpHelper.httpGet(RequestConfig_1.RequestEnum.DrawCheck, function (ret) {
            console.log("检查是否设置取款密码：返回数据", ret);
            if (ret.status) {
                //console.log("ret.data   "+ret.data);
                if (call) {
                    call(ret);
                }
            }
        }.bind(this));
    };
    /**
     *  提现
     */
    WithDrawControl.prototype.requesWithDraw = function (amount, bankid, password, call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.WithDraw, {
            "amount": amount,
            "bank_id": bankid,
            "fund_password": password,
        }, function (ret) {
            console.log("提现：返回数据", ret);
            if (ret.status) {
                //console.log("ret.data   "+ret.data);
                UserControl_1.G_UserControl.sendspecialPlayerData(call);
            }
            else {
                call(ret);
            }
        }.bind(this));
    };
    /**
     *  提现记录
     */
    WithDrawControl.prototype.requesWithDrawRecord = function (call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.WithDrawRecord, {
            "type": 3,
        }, function (ret) {
            console.log("提现记录：返回数据", ret);
            if (ret.status) {
                this.getConfig().RecordList = ret.data.data;
                console.log("ret.data.data.length   " + ret.data.data.length);
                call(ret);
            }
        }.bind(this));
    };
    WithDrawControl.Instance = new WithDrawControl();
    return WithDrawControl;
}());
exports.G_WithDrawControl = WithDrawControl.Instance;

cc._RF.pop();