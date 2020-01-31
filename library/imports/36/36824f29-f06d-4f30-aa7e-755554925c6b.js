"use strict";
cc._RF.push(module, '368248p8G1PMKp+dVVUklxr', 'UserModel');
// Script/Model/UserModel.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Storage_1 = require("../Tool/Storage");
var UserModel = /** @class */ (function () {
    function UserModel() {
        //用户名字
        this._userName = null;
        //用户头像
        this._usePic = null;
        //唯一id
        this._uid = null;
        //积分
        this._score = null;
        //等级
        this._level = null;
        //富豪榜排名
        this._richrank = null;
        //money
        this._balance = null;
        //经验
        this._exp = null;
        //用户VIP等级 最新等级0 最大等级9  可变
        this._userVipLevel = 0;
        //周赠金领取状态
        this._vipweekly = null;
        //晋级赠金领取状态
        this._vippromotion = null;
        //用户账号
        this._userMobile = null;
        this._userPassword = null;
        this._accessToken = null;
        // expires_at: "2019-12-10 15:06:59"
        // token_type: "Bearer"
        //到期时间
        this._expiresAt = null;
    }
    Object.defineProperty(UserModel.prototype, "userName", {
        get: function () {
            return this._userName;
        },
        set: function (name) {
            this._userName = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "usePic", {
        get: function () {
            return this._usePic;
        },
        set: function (pic) {
            this._usePic = pic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "uid", {
        get: function () {
            return this._uid;
        },
        set: function (id) {
            this._uid = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "score", {
        get: function () {
            return this._score;
        },
        set: function (score) {
            this._score = score;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (lvl) {
            this._level = lvl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "richrank", {
        get: function () {
            return this._richrank;
        },
        set: function (rank) {
            this._richrank = rank;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "balance", {
        get: function () {
            return this._balance;
        },
        set: function (money) {
            this._balance = money;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "exp", {
        get: function () {
            return this._exp;
        },
        set: function (exp) {
            this._exp = exp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "userVipLevel", {
        get: function () {
            return this._userVipLevel;
        },
        set: function (level) {
            this._userVipLevel = level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "vipweekly", {
        get: function () {
            return this._vipweekly;
        },
        set: function (_vipweekly) {
            this._vipweekly = _vipweekly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "vippromotion", {
        get: function () {
            return this._vippromotion;
        },
        set: function (_vippromotion) {
            this._vippromotion = _vippromotion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "userMobile", {
        get: function () {
            this._userMobile = Storage_1.G_Storage.getMobile();
            return this._userMobile;
        },
        set: function (account) {
            this._userMobile = account;
            Storage_1.G_Storage.setMobile(account);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "userPassword", {
        get: function () {
            this._userPassword = Storage_1.G_Storage.getPassword();
            return this._userPassword;
        },
        set: function (password) {
            this._userPassword = password;
            Storage_1.G_Storage.setPassword(password);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "accessToken", {
        get: function () {
            return this._accessToken;
        },
        set: function (token) {
            this._accessToken = token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "expiresAt", {
        get: function () {
            return this._expiresAt;
        },
        set: function (at) {
            this._expiresAt = at;
        },
        enumerable: true,
        configurable: true
    });
    return UserModel;
}());
exports.UserModel = UserModel;

cc._RF.pop();