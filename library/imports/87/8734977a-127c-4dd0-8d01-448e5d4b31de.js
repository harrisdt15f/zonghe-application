"use strict";
cc._RF.push(module, '87349d6EnxN0I0BRI5dSzHe', 'HttpHelper');
// Script/Net/HttpHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../Config/config");
var UserControl_1 = require("../Controller/UserControl");
//import { context } from "../../../packVersion/ver_1_0.0.0/src/cocos2d-jsb";
var CryptoJS = require("../Common/CryptoJS");
var jsencrypt_1 = require("../Common/jsencrypt");
var HttpHelper = /** @class */ (function () {
    function HttpHelper() {
    }
    /**
     * get请求
     * @param {string} url
     * @param {function} callback
     */
    HttpHelper.prototype.httpGet = function (url, callback) {
        // cc.myGame.gameUi.onShowLockScreen();
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status == 200) {
                var respone = xhr.responseText;
                var rsp = JSON.parse(respone);
                callback(rsp);
            }
            else if (xhr.readyState === 4 && xhr.status == 401) {
                callback({ status: 401 });
            }
        };
        var data = this.doEncode(url);
        // xhr.withCredentials = true;
        console.log("[HTTP>GET]:URL>>>>>>>>>>>>>>>>>", config_1.URL + url);
        xhr.open('GET', config_1.URL + url, true);
        // if (cc.sys.isNative) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
        xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
        //xhr.setRequestHeader('Access-Control-Allow-Methods', 'PUT,GET');
        //xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
        // xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('Authorization', 'Bearer ' + UserControl_1.G_UserControl.getUser().accessToken);
        // xhr.setRequestHeader('Authorization', 'Bearer ' + "");
        // }
        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        console.log("xhr  " + xhr.status);
        xhr.timeout = 5000;
        xhr.send();
    };
    /**
     * post请求
     * @param {string} url
     * @param {object} params
     * @param {function} callback
     */
    HttpHelper.prototype.httpPost = function (url, params, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status == 200) {
                var respone = xhr.responseText;
                var rsp_1 = JSON.parse(respone);
                callback(rsp_1);
            }
            else if (xhr.readyState === 3 && xhr.status != 200) {
                var respone = xhr.responseText;
                var rsp = JSON.parse(respone);
                callback(rsp);
            }
            console.log('respone  ' + xhr.status);
        };
        console.log("[HTTP>POST]:URL>>>>>>>>>>>>>>>>>", config_1.URL + url, " params " + JSON.stringify(params));
        xhr.open('POST', config_1.URL + url, true);
        // if (cc.sys.isNative) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('Authorization', 'Bearer ' + UserControl_1.G_UserControl.getUser().accessToken);
        // }
        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000; // 8 seconds for timeout
        //xhr.send(JSON.stringify(params));
        if (params == null) {
            xhr.send();
        }
        else {
            var data = { "data": this.doEncode(params) };
            xhr.send(JSON.stringify(data));
        }
    };
    /**
 * put请求
 * @param {string} url
 * @param {object} params
 * @param {function} callback
 */
    HttpHelper.prototype.httpPut = function (url, params, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status == 200) {
                var respone = xhr.responseText;
                var rsp_2 = JSON.parse(respone);
                callback(rsp_2);
            }
            else if (xhr.readyState === 3 && xhr.status != 200) {
                var respone = xhr.responseText;
                var rsp = JSON.parse(respone);
                callback(rsp);
            }
            console.log('respone  ' + xhr.status);
        };
        console.log("[HTTP>POST]:URL>>>>>>>>>>>>>>>>>", config_1.URL + url, " params " + JSON.stringify(params));
        xhr.open('PUT', config_1.URL + url, true);
        // if (cc.sys.isNative) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.open('PUT', config_1.URL + url, true);
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'PUT,GET, POST');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('Authorization', 'Bearer ' + UserControl_1.G_UserControl.getUser().accessToken);
        // }
        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000; // 8 seconds for timeout
        //xhr.send(JSON.stringify(params));
        if (params == null) {
            xhr.send();
        }
        else {
            var data = { "data": this.doEncode(params) };
            xhr.send(JSON.stringify(data));
        }
    };
    HttpHelper.prototype.doEncode = function (data) {
        // //偏移量 由前端每次请求随机生成 16位
        var IV = this.randomString(16);
        // //AES加密KEY 由前端自己每次请求随机生成
        var KEY = this.randomString(16);
        var public_key = "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgy6JOupuDqE9itVQvGSBDJotBEJFASuklIwvcMNtXUH99PdihJ+TJN2AjNphzCdgL9KlguDG+u4C719DZOC3YrGn7Ps9vWOFtQYLzh69cGd+nlqOR4LKVSAYRn2NtrV9elAzBjie/Y7ITMsU9+ZTsccRqb+qd+OlBsYdg9dhvVQIDAQAB-----END PUBLIC KEY-----";
        //加密后的数据 json 直接传递给后端
        var encrypt_data = this.AES_encrypt(data, KEY, IV, public_key);
        console.log('jiam  ' + encrypt_data);
        //  var jiem  = this.doDecode(encrypt_data,KEY,IV);
        //  console.log('jiem   '+jiem);
        return encrypt_data;
    };
    //随机串
    HttpHelper.prototype.randomString = function (len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    };
    /**
     * AES加密数组 传入参数为需要传递的数组JSON
     */
    HttpHelper.prototype.AES_encrypt = function (data, KEY, IV, pkcs8_public) {
        var key_utf8 = CryptoJS.enc.Utf8.parse(KEY); // 秘钥
        var iv_utf8 = CryptoJS.enc.Utf8.parse(IV); //向量iv
        var srcs = '';
        switch (typeof (data)) {
            case 'string':
                srcs = CryptoJS.enc.Utf8.parse(data);
                break;
            case 'object':
                srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
                break;
            default:
                srcs = CryptoJS.enc.Utf8.parse(data.toString());
        }
        //AES 加密
        var encrypted = CryptoJS.AES.encrypt(srcs, key_utf8, { iv: iv_utf8, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();
        //RSA 加密 组包
        return this.pack(encrypted, IV, KEY, pkcs8_public);
    };
    //组包
    HttpHelper.prototype.pack = function (encrypted, iv, key, pub_key) {
        var jsencrypt = new jsencrypt_1.JSEncrypt();
        jsencrypt.setKey(pub_key);
        var rsa_iv = jsencrypt.encrypt(iv);
        var rsa_key = jsencrypt.encrypt(key);
        var splitFlag = 'aesrsastart';
        var res_data = encrypted + splitFlag + rsa_iv + splitFlag + rsa_key;
        return res_data;
    };
    HttpHelper.prototype.doDecode = function (data, key_utf8, iv_utf8) {
        // var key_utf8 = CryptoJS.enc.Utf8.parse(KEY);// 秘钥
        //var iv_utf8= CryptoJS.enc.Utf8.parse(IV);//向量iv
        var encryptedHexStr = CryptoJS.enc.Hex.parse(data);
        var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        var decrypt = CryptoJS.AES.decrypt(srcs, key_utf8, { iv: iv_utf8, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();
        var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    };
    HttpHelper.Instance = new HttpHelper();
    return HttpHelper;
}());
exports.G_HttpHelper = HttpHelper.Instance;

cc._RF.pop();