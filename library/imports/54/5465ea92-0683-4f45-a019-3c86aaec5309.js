"use strict";
cc._RF.push(module, '5465eqSBoNPRaAZPIaq7FMJ', 'Storage');
// Script/Tool/Storage.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../Config/config");
/**
 * 本地保存数据
 */
var Storage = /** @class */ (function () {
    function Storage() {
    }
    /**
     * 音效音量
     * @param volume 0.1
     */
    Storage.prototype.setSoundEffectVolume = function (volume) {
        cc.sys.localStorage.setItem("effectVolume", volume);
    };
    Storage.prototype.getSoundEffectVolume = function () {
        return cc.sys.localStorage.getItem("effectVolume");
    };
    /**
     * 音乐音量
     * @param volume 0.1
     */
    Storage.prototype.setSoundMusicVolume = function (volume) {
        cc.sys.localStorage.setItem("music", volume);
    };
    Storage.prototype.getSoundMusicVolume = function () {
        return cc.sys.localStorage.getItem("music");
    };
    Storage.prototype.getMobile = function () {
        return cc.sys.localStorage.getItem(config_1.URL + "Mobile");
    };
    /**
     * 用户登陆账户
     * @param account
     */
    Storage.prototype.setMobile = function (account) {
        cc.sys.localStorage.setItem(config_1.URL + "Mobile", account);
    };
    Storage.prototype.getPassword = function () {
        return cc.sys.localStorage.getItem(config_1.URL + "Password");
    };
    /**
     * 用户登陆密码
     * @param password
     */
    Storage.prototype.setPassword = function (password) {
        cc.sys.localStorage.setItem(config_1.URL + "Password", password);
    };
    Storage.Instance = new Storage();
    return Storage;
}());
exports.G_Storage = Storage.Instance;

cc._RF.pop();