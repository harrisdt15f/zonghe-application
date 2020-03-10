"use strict";
cc._RF.push(module, '7ba4fxGtmFMZaJrNo33tDhf', 'UserControl');
// Script/Controller/UserControl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UiForms_1 = require("../Tool/UiForms");
var HttpHelper_1 = require("../Net/HttpHelper");
var IdentifyKey_1 = require("../Config/IdentifyKey");
var UserModel_1 = require("../Model/UserModel");
var config_1 = require("../Config/config");
var uiEvent_1 = require("../Config/uiEvent");
var OnFire_1 = require("../Net/OnFire");
var RequestConfig_1 = require("../Config/RequestConfig");
var UserControl = /** @class */ (function () {
    function UserControl() {
        this._userModel = null;
        this._userModel = new UserModel_1.UserModel();
    }
    UserControl.prototype.getUser = function () {
        return this._userModel;
    };
    /**
     * 是否有登陆过
     */
    UserControl.prototype.isLogin = function () {
        if (config_1.IS_LOGIN)
            return config_1.IS_LOGIN;
        var isAccount = this._userModel.userMobile;
        var isPassword = this._userModel.userPassword;
        if (!isAccount || isAccount === '')
            return false;
        if (!isPassword || isPassword === '')
            return false;
        return true;
    };
    /**
     * 在启动的时候检测一次是否上一次有登陆成功的账户 有就主动登陆一次
     */
    UserControl.prototype.detectionLogin = function (ret) {
        var flag = this.isLogin();
        if (!flag)
            return;
        if (config_1.IS_LOGIN)
            return;
        var isAccount = this._userModel.userMobile;
        var isPassword = this._userModel.userPassword;
        this.requestLogin(isAccount, isPassword, function (data) {
            //  console.log("[游戏启动]","自动重新登陆一次")
            if (ret) {
                ret(data);
            }
        });
    };
    /**
     * 登陆请求
     * @param mobile 账户
     * @param password
     * @param call
     */
    UserControl.prototype.requestLogin = function (mobile, password, call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.Login, {
            mobile: mobile,
            password: password
        }, function (ret) {
            //console.log("[登陆]：返回数据",ret)    
            if (ret.status && ret.code == IdentifyKey_1.CODE.SUCCEED) {
                //保存登陆名称，密码
                this._userModel.userMobile = mobile;
                this._userModel.userPassword = password;
                this._userModel.accessToken = ret.data.access_token;
                this.requesPlayerData(function (data) {
                    if (call) {
                        call(data);
                    }
                });
                // G_CommonControl.requesGameData();
            }
            else if (!ret.status) {
                this._userModel.userPassword = '';
                this._userModel.accessToken = '';
                OnFire_1.G_OnFire.fire(uiEvent_1.EventRequest.HeadUpdata);
                UiForms_1.G_UiForms.hint(ret.message);
                if (call) {
                    call(ret);
                }
            }
        }.bind(this));
    };
    /**
     * 注册请求
     * @param mobile 账户
     * @param password 密码
     * @param passwordagain 二次密码
     * @param ver_code 验证码
     * @param ver_key  验证key
     * @param invite_code 邀请码
     */
    UserControl.prototype.requestRegister = function (mobile, password, passwordagain, ver_code, ver_key, invite_code, call) {
        var list = {};
        list["password"] = password;
        list["password_confirmation"] = passwordagain;
        list["verification_code"] = ver_code;
        list["verification_key"] = ver_key;
        if (invite_code)
            list["invite_code"] = invite_code;
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.Register, list, function (ret) {
            // console.log("[注册]：返回数据",ret)    
            if (ret.status && ret.code == IdentifyKey_1.CODE.SUCCEED) {
                //保存登陆名称，密码
                this._userModel.userMobile = mobile;
                this._userModel.userPassword = password;
                this._userModel.accessToken = ret.data["access_token"];
                this.requesPlayerData(function (data) {
                    if (call) {
                        call(data);
                    }
                });
            }
            else if (!ret.status) {
                UiForms_1.G_UiForms.hint(ret.message);
            }
        }.bind(this));
    };
    /**
    *密码找回
    * @param mobile 账户
    * @param password 密码
    * @param passwordagain 二次密码
    * @param ver_code 验证码
    * @param ver_key  验证key
    */
    UserControl.prototype.requestRecoverCode = function (mobile, password, passwordagain, ver_code, ver_key, call) {
        var list = {};
        list["password"] = password;
        list["password_confirmation"] = passwordagain;
        list["verification_code"] = ver_code;
        list["verification_key"] = ver_key;
        HttpHelper_1.G_HttpHelper.httpPut(RequestConfig_1.RequestEnum.PasswordReset, list, function (ret) {
            console.log("[密码找回]：返回数据", ret);
            if (ret.status) {
                //保存登陆名称，密码
                this._userModel.userMobile = mobile;
                this._userModel.userPassword = password;
                if (call) {
                    call(ret);
                }
                this.requestLogin(mobile, password);
                // this.requesPlayerData(function(){
                // });
            }
            else if (!ret.status) {
                UiForms_1.G_UiForms.hint(ret.message);
            }
        }.bind(this));
    };
    /**
    *密码修改
    * @param mobile 账户
    * @param password 密码
    * @param passwordagain 二次密码
    * @param ver_code 验证码
    * @param ver_key  验证key
    */
    UserControl.prototype.requestPasswordChange = function (password, passwordagain, securitycode, ver_code, ver_key, call) {
        var list = {};
        list["password"] = password;
        list["password_confirmation"] = passwordagain;
        list["security_code"] = securitycode;
        list["verification_code"] = ver_code;
        list["verification_key"] = ver_key;
        HttpHelper_1.G_HttpHelper.httpPut(RequestConfig_1.RequestEnum.PasswordChange, list, function (ret) {
            //console.log("[注册]：返回数据",ret)    
            if (ret.status) {
                //保存登陆名称，密码
                // this._userModel.userMobile = mobile;
                this._userModel.userPassword = password;
                this.requesPlayerData(function () {
                    if (call) {
                        call(ret);
                    }
                });
            }
            else if (!ret.status) {
                UiForms_1.G_UiForms.hint(ret.message);
            }
        }.bind(this));
    };
    /**
     * 密码修改码验证
     * @param mobile 账户
     * @param password
     * @param call
     */
    UserControl.prototype.requestPasswordChangeVCode = function (call) {
        HttpHelper_1.G_HttpHelper.httpGet(RequestConfig_1.RequestEnum.ChangeCode, function (ret) {
            if (ret.status) {
                if (call) {
                    call(ret);
                }
            }
            else {
                UiForms_1.G_UiForms.hint(ret.message);
            }
        }.bind(this));
    };
    /**
     * 手机注册码验证
     * @param mobile 账户
     * @param password
     * @param call
     */
    UserControl.prototype.requestVerificationCode = function (mobile, call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.RegisterCode, {
            mobile: mobile,
        }, function (ret) {
            if (ret.status && ret.code == IdentifyKey_1.CODE.SUCCEED) {
                if (call) {
                    call(ret);
                }
            }
            else {
                UiForms_1.G_UiForms.hint(ret.message);
            }
        }.bind(this));
    };
    /**
     * 密码重置码验证
     * @param mobile 账户
     * @param password
     * @param call
     */
    UserControl.prototype.requestVerificationRecoveCode = function (mobile, call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.ResetCode, {
            mobile: mobile,
        }, function (ret) {
            if (ret.status && ret.code == IdentifyKey_1.CODE.SUCCEED) {
                if (call) {
                    call(ret);
                }
            }
            else {
                UiForms_1.G_UiForms.hint(ret.message);
            }
        }.bind(this));
    };
    /**
     * 手机安全码验证
     * @param mobile 账户
     * @param password
     * @param call
     */
    UserControl.prototype.requestSecurityVerificationCode = function (call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.SecurityCode, null, function (ret) {
            if (ret.status && ret.code == IdentifyKey_1.CODE.SUCCEED) {
                if (call) {
                    call(ret);
                }
            }
            else {
                UiForms_1.G_UiForms.hint(ret.message);
            }
        }.bind(this));
    };
    /**
   *修改安全码
   * @param mobile 账户
   * @param password 密码
   * @param passwordagain 二次密码
   * @param ver_code 验证码
   * @param ver_key  验证key
   */
    UserControl.prototype.requestSecurityRecoverCode = function (password, passwordagain, ver_code, ver_key, call) {
        var list = {};
        list["security_code"] = password;
        list["security_code_confirmation"] = passwordagain;
        list["verification_key"] = ver_key;
        list["verification_code"] = ver_code;
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.Security, list, function (ret) {
            console.log("[修改安全码]：返回数据", ret);
            if (ret.status && ret.code == IdentifyKey_1.CODE.SUCCEED) {
                if (call) {
                    call(ret);
                }
            }
            else if (!ret.status) {
                UiForms_1.G_UiForms.hint(ret.message);
            }
        }.bind(this));
    };
    /**
     * 请求玩家信息
     */
    UserControl.prototype.requesPlayerData = function (call) {
        if (!this._userModel.accessToken) {
            UiForms_1.G_UiForms.hint("请重新登陆！");
            return;
        }
        this.sendnormalInfoPlaydata(call);
        //G_VipControl.requesVipData();
    };
    UserControl.prototype.sendnormalInfoPlaydata = function (call) {
        HttpHelper_1.G_HttpHelper.httpGet(RequestConfig_1.RequestEnum.Information, function (ret) {
            console.log("[玩家信息]：1返回数据", ret);
            if (ret.status && ret.code == IdentifyKey_1.CODE.SUCCEED) {
                this._userModel.userName = ret.data.nickname;
                this._userModel.uid = ret.data.guid;
                this._userModel.usePic = ret.data.avatar_id;
                // console.log("pic "+this._userModel.usePic)
            }
            // G_OnFire.fire(EventRequest.HeadUpdata)          
            this.sendspecialPlayerData(call);
        }.bind(this));
    };
    UserControl.prototype.sendspecialPlayerData = function (call) {
        HttpHelper_1.G_HttpHelper.httpGet(RequestConfig_1.RequestEnum.DynamicInfo, function (ret) {
            console.log("[玩家信息]：2返回数据", ret);
            if (ret.status) {
                this._userModel.richrank = ret.data.rich_rank;
                this._userModel.level = ret.data.level;
                this._userModel.balance = parseInt(ret.data.balance);
                this._userModel.exp = ret.data.experience;
                this._userModel.score = ret.data.score;
                //this._userModel.userVipLevel = ret.data.grade
                this._userModel.userVipLevel = ret.data.level;
                // this._userModel.vipweekly = ret.data.weekly_gift
                // this._userModel.vippromotion = ret.data.promotion_gift
                // console.log("pic "+this._userModel.richrank)
            }
            if (call) {
                call(ret);
            }
            OnFire_1.G_OnFire.fire(uiEvent_1.EventRequest.HeadUpdata);
            // G_OnFire.fire(uiEventFunction.colseBox)
        }.bind(this));
    };
    UserControl.prototype.requesPlayerChange = function (name, pic, call) {
        HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.UpdateInfo, {
            avatar: pic,
            nickname: name,
        }, function (ret) {
            console.log("[更改信息]：1返回数据", ret);
            if (ret.status) {
                this._userModel.userName = name;
                this._userModel.usePic = pic;
                OnFire_1.G_OnFire.fire(uiEvent_1.EventRequest.HeadUpdata);
            }
            if (call) {
                call(ret);
            }
        }.bind(this));
    };
    /**
    *刷新token
    */
    UserControl.prototype.requestAccesstoken = function (call) {
        HttpHelper_1.G_HttpHelper.httpPut(RequestConfig_1.RequestEnum.RefreshToken, null, function (ret) {
            console.log("[刷新token]：返回数据", ret);
            if (ret.status) {
                //保存登陆名称，密码
                this._userModel.accessToken = ret.data["access_token"];
                if (call) {
                    call(ret);
                }
            }
        }.bind(this));
    };
    /**
     * 退出登陆
     */
    UserControl.prototype.requesLoginOut = function (call) {
        if (!this._userModel.accessToken) {
            UiForms_1.G_UiForms.hint("请重新登陆！");
            return;
        }
        HttpHelper_1.G_HttpHelper.httpGet(RequestConfig_1.RequestEnum.Logout, function (ret) {
            // console.log("[退出登陆]：返回数据",ret)   
            if (ret.status && ret.code == IdentifyKey_1.CODE.SUCCEED) {
                //保存登陆名称，密码
                //  this._userModel.userMobile = '';
                this._userModel.userPassword = '';
                this._userModel.accessToken = '';
                OnFire_1.G_OnFire.fire(uiEvent_1.EventRequest.HeadUpdata);
                if (call)
                    call(ret);
            }
            else if (!ret.status) {
                UiForms_1.G_UiForms.hint(ret.message);
            }
        }.bind(this));
    };
    UserControl.Instance = new UserControl();
    return UserControl;
}());
exports.G_UserControl = UserControl.Instance;

cc._RF.pop();