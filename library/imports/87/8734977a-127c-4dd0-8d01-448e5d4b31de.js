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
var RequestControl_1 = require("../Controller/RequestControl");
var HttpHelper = /** @class */ (function () {
    function HttpHelper() {
        this.lastTime = null;
    }
    HttpHelper.prototype.cd = function (path) {
        if (this.lastTime == null) {
            this.lastTime = new Date().getTime();
            console.log("Time--------------------------->", path, "       ", 0);
        }
        else {
            var tt = new Date().getTime() - this.lastTime;
            //this.lastTime = new Date().getTime();
            console.log("Time--------------------------->", path, "       ", tt / 1000);
        }
    };
    /**
     * get请求
     * @param {string} url
     * @param {function} callback
     */
    HttpHelper.prototype.httpGet = function (path, callback) {
        this.cd(path);
        var isCD = RequestControl_1.G_RequestControl.getConfig().isCD(path);
        if (isCD) {
            return;
        }
        var url = RequestControl_1.G_RequestControl.getConfig().getURL(path);
        // cc.myGame.gameUi.onShowLockScreen();
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status == 200) {
                var data_1 = this.doDecode(xhr.responseText);
                callback(data_1);
            }
            else if (xhr.readyState === 4 && xhr.status == 401) {
                callback({ status: 401 });
            }
        }.bind(this);
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
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('JHReferer', config_1.DNS);
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
    HttpHelper.prototype.httpPost = function (path, params, callback) {
        console.log("path  ", path);
        this.cd(path);
        var isCD = RequestControl_1.G_RequestControl.getConfig().isCD(path);
        if (isCD) {
            console.log("return  ", path);
            return;
        }
        console.log("nocdddddddddddddd  ", path);
        var url = RequestControl_1.G_RequestControl.getConfig().getURL(path);
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status == 200) {
                var respone = xhr.responseText;
                var data = this.doDecode(xhr.responseText);
                // let rsp = JSON.parse(data);
                callback(data);
            }
            else if (xhr.readyState === 3 && xhr.status != 200) {
                var respone = xhr.responseText;
                var data = this.doDecode(xhr.responseText);
                // let rsp = JSON.parse(data);
                callback(data);
            }
            //console.log('respone  '+xhr.responseText);
        }.bind(this);
        console.log("[HTTP>POST]:URL>>>>>>>>>>>>>>>>>", config_1.URL + url, " params " + JSON.stringify(params));
        xhr.open('POST', config_1.URL + url, true);
        // if (cc.sys.isNative) {
        // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        //xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
        //xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        //xhr.setRequestHeader("Accept", "application/json");
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader('JHReferer', config_1.DNS);
        if (UserControl_1.G_UserControl.getUser().accessToken) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + UserControl_1.G_UserControl.getUser().accessToken);
        }
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
    HttpHelper.prototype.httpPut = function (path, params, callback) {
        this.cd(path);
        var isCD = RequestControl_1.G_RequestControl.getConfig().isCD(path);
        if (isCD) {
            return;
        }
        var url = RequestControl_1.G_RequestControl.getConfig().getURL(path);
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log("xhr.readyState   " + xhr.readyState + "  xhr.status == 200  " + xhr.status);
            if (xhr.readyState === 4 && xhr.status == 200) {
                var data = this.doDecode(xhr.responseText);
                callback(data);
            }
            else if (xhr.readyState === 3 && xhr.status != 200) {
                var data = this.doDecode(xhr.responseText);
                callback(data);
            }
            //console.log('respone  '+xhr.status);
        }.bind(this);
        console.log("[HTTP>POST]:URL>>>>>>>>>>>>>>>>>", config_1.URL + url, " params " + JSON.stringify(params));
        xhr.open('PUT', config_1.URL + url, true);
        // if (cc.sys.isNative) {
        // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.open('PUT', config_1.URL + url, true);
        //xhr.setRequestHeader('Access-Control-Allow-Methods', 'PUT,GET, POST');
        //xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('JHReferer', config_1.DNS);
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
        console.log("typeof data   ", typeof (data));
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
    //解密
    HttpHelper.prototype.doDecode = function (responseData) {
        //console.log("解密 responseData  "+responseData);
        if (responseData == null) {
            return null;
        }
        var data = JSON.parse(responseData);
        var cryptData = data.data;
        if (cryptData != undefined) {
            var cryptDataArr = cryptData.split("hDdoAPaXI3S");
            if (cryptDataArr.length == 3) {
                var cryptDataStr = cryptDataArr[0];
                var privateKey = "-----BEGIN PRIVATE KEY-----MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAPTYUA2oNnnEwCM+firQEh3qtvhzy2sPcCCPBuk1ALN98ThFtwbsAIXn4iflC8cL74OxsW5LhVLqRaNJwrj19nUWRNg2V0UG0qiSMDoFQzcf14Tl3YEMVhHmhT60KEc/mcOkGp7BGFneNRkUrnAedUPaI18hHfwlOXCTBOXjsLEHAgMBAAECgYAOsZCUUTz7r8gMFWsC7Lu5meVjIafag/GpsouqoSiqnOtGAkEKpE0fvBvBYyiCyH+WOqq4QMX+hNqrAvkxmmkw3Zj6pqGIGBm8qP0sC7kV9l3+1GyNweBaPqnZs02Kb3WCZnw8h1NaJRR9uqXFITzLkNgxEOuq9oiQqmI9UmP7sQJBAP1qL2O32RS/i08lCHR1r/XQTF/0pkSPX+a6SEf25iewzKm5do8hOtSG7+zjOlOQwsGwCPuNovz5g8BPMv2juQ8CQQD3V78skMtTp+0c6WjVh5ORIkkYAyOnSfl3nigkQKCfGyiTwX1cm3GLTHkDHZBVJjFyz8U/ngZZbG8ScHZCMtiJAkEAroiApQxNXaXiu5rE7PjVPNa+k2P7U8LviQiJmc7pizKQcuDCUCfRzeg1vJBvbniIOkAUn7RYKiVrYXrqopgtbwJAd+zzpIgQDd+99+a0DdROmHAnQJ1FDDex3W2xyOIM/xgL9Jg8UEqOIxxREFGlSaPbFe/nk5DrQzBwKmCc9jvxAQJALe9ZaKqPeZywh2aUa8huotTe5lj/iDeGdHOgxx4xkDK9ddzuSks1dbJQ/gHl8lA7MjOI6TvtgeLB9FOOvsi5EQ==-----END PRIVATE KEY-----";
                var jsencrypt = new jsencrypt_1.JSEncrypt();
                jsencrypt.setPrivateKey(privateKey);
                var iValue = jsencrypt.decrypt(cryptDataArr[1]);
                var iKey = jsencrypt.decrypt(cryptDataArr[2]);
                //console.log("cryptDataArr",cryptDataArr[0])
                //console.log('iValue', iValue);
                //console.log('iKey',iKey);
                var options = {
                    iv: CryptoJS.enc.Utf8.parse(iValue),
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                };
                var tt = CryptoJS.AES.decrypt(cryptDataStr, CryptoJS.enc.Utf8.parse(iKey), options);
                var srcs = '';
                switch (typeof (tt)) {
                    case 'string':
                        srcs = CryptoJS.enc.Utf8.parse(tt);
                        break;
                    case 'object':
                        srcs = tt.toString(CryptoJS.enc.Utf8);
                        //srcs = CryptoJS.enc.Utf8.parse(tt.toString());
                        break;
                    default:
                        srcs = CryptoJS.enc.Utf8.parse(tt.toString());
                }
                var jsonData = JSON.parse(srcs);
                console.log("typeof (tt)  " + typeof (tt) + "        srcs " + srcs);
                return jsonData;
            }
        }
        else {
            console.log("cryptData   underfined");
        }
        return null;
    };
    HttpHelper.Instance = new HttpHelper();
    return HttpHelper;
}());
exports.G_HttpHelper = HttpHelper.Instance;

cc._RF.pop();