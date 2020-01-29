

import {URL} from "../Config/config"
import { G_UserControl } from '../Controller/UserControl';
//import { context } from "../../../packVersion/ver_1_0.0.0/src/cocos2d-jsb";
import CryptoJS  = require('../Common/CryptoJS')
import { JSEncrypt } from "../Common/jsencrypt";


class HttpHelper {
    public static readonly Instance : HttpHelper = new HttpHelper();
    /**
     * get请求
     * @param {string} url 
     * @param {function} callback 
     */
    httpGet(url, callback) {
        // cc.myGame.gameUi.onShowLockScreen();
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status == 200) {
                let respone = xhr.responseText;
                let rsp = JSON.parse(respone);
                callback(rsp);
            } 
            else if (xhr.readyState === 4 && xhr.status == 401) {
                callback({status:401});
            } 
        };

        let data = this.doEncode(url);
        // xhr.withCredentials = true;
        console.log("[HTTP>GET]:URL>>>>>>>>>>>>>>>>>",URL+url)
        
        xhr.open('GET', URL + url, true);
 
        // if (cc.sys.isNative) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
        xhr.setRequestHeader('Access-Control-Allow-Credentials','true')
        //xhr.setRequestHeader('Access-Control-Allow-Methods', 'PUT,GET');
        //xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
        // xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('Authorization', 'Bearer '+G_UserControl.getUser().accessToken);

        // xhr.setRequestHeader('Authorization', 'Bearer ' + "");
        // }
        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        console.log("xhr  "+xhr.status)
        xhr.timeout = 5000;
        xhr.send();
    }

    /**
     * post请求
     * @param {string} url 
     * @param {object} params 
     * @param {function} callback 
     */
    httpPost(url, params, callback) {
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status == 200) {
                let respone = xhr.responseText;
                let rsp = JSON.parse(respone);
                callback(rsp);
            }else if(xhr.readyState === 3 &&  xhr.status != 200) {
                let respone = xhr.responseText;
                var rsp = JSON.parse(respone);
                callback(rsp);
            }
            console.log('respone  '+xhr.status);
        };
        console.log("[HTTP>POST]:URL>>>>>>>>>>>>>>>>>",URL+url," params "+JSON.stringify(params) )
        xhr.open('POST', URL+url, true);
        // if (cc.sys.isNative) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
        xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader('Authorization', 'Bearer ' + G_UserControl.getUser().accessToken);
        // }
        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000;// 8 seconds for timeout

        //xhr.send(JSON.stringify(params));
        if(params == null)
        {
            xhr.send();
        }else
        {
            let data = {"data":this.doEncode(params)};
            xhr.send(JSON.stringify(data));
        }
        
    }

        /**
     * put请求
     * @param {string} url 
     * @param {object} params 
     * @param {function} callback 
     */
    httpPut(url, params, callback) {
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status == 200) {
                let respone = xhr.responseText;
                let rsp = JSON.parse(respone);
                callback(rsp);
            }else if(xhr.readyState === 3 &&  xhr.status != 200) {
                let respone = xhr.responseText;
                var rsp = JSON.parse(respone);
                callback(rsp);
            }
            console.log('respone  '+xhr.status);
        };
        console.log("[HTTP>POST]:URL>>>>>>>>>>>>>>>>>",URL+url," params "+JSON.stringify(params) )
        xhr.open('PUT', URL+url, true);
        // if (cc.sys.isNative) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.open('PUT', URL+url, true);
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'PUT,GET, POST');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
        xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader('Authorization', 'Bearer ' + G_UserControl.getUser().accessToken);
        // }
        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000;// 8 seconds for timeout

        //xhr.send(JSON.stringify(params));
        if(params == null)
        {
            xhr.send();
        }else
        {
            let data = {"data":this.doEncode(params)};
            xhr.send(JSON.stringify(data));
        }
        
    }

    
    doEncode(data)
    {   
        // //偏移量 由前端每次请求随机生成 16位
        var IV = this.randomString(16);
        // //AES加密KEY 由前端自己每次请求随机生成
        var KEY = this.randomString(16);
        
        var public_key = "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgy6JOupuDqE9itVQvGSBDJotBEJFASuklIwvcMNtXUH99PdihJ+TJN2AjNphzCdgL9KlguDG+u4C719DZOC3YrGn7Ps9vWOFtQYLzh69cGd+nlqOR4LKVSAYRn2NtrV9elAzBjie/Y7ITMsU9+ZTsccRqb+qd+OlBsYdg9dhvVQIDAQAB-----END PUBLIC KEY-----";
        
        
        //加密后的数据 json 直接传递给后端
        var encrypt_data = this.AES_encrypt(data,KEY,IV,public_key);
        console.log('jiam  '+encrypt_data);
      //  var jiem  = this.doDecode(encrypt_data,KEY,IV);
      //  console.log('jiem   '+jiem);
        return encrypt_data;
    }

    
    
    //随机串
    randomString(len) {
    　　len = len || 32;
    　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    　　var maxPos = $chars.length;
    　　var pwd = '';
    　　for (var i = 0; i < len; i++) {
    　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return pwd;
    }
    
    /**
     * AES加密数组 传入参数为需要传递的数组JSON
     */
    AES_encrypt(data,KEY,IV,pkcs8_public) {              
        var key_utf8 = CryptoJS.enc.Utf8.parse(KEY);// 秘钥
        var iv_utf8= CryptoJS.enc.Utf8.parse(IV);//向量iv
          let srcs = ''
          switch (typeof (data)) {
            case 'string':
              srcs = CryptoJS.enc.Utf8.parse(data)
              break;
            case 'object':
              srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(data))
              break;
            default:
              srcs = CryptoJS.enc.Utf8.parse(data.toString())
          }
        //AES 加密
        var encrypted = CryptoJS.AES.encrypt(srcs, key_utf8, { iv: iv_utf8, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7}).toString();
        //RSA 加密 组包
        return this.pack(encrypted,IV,KEY,pkcs8_public)
    }
   //组包
    pack(encrypted,iv,key,pub_key) {
        var jsencrypt = new JSEncrypt();
        jsencrypt.setKey(pub_key);
        var rsa_iv =  jsencrypt.encrypt(iv);
        var rsa_key = jsencrypt.encrypt(key);
        var splitFlag = 'aesrsastart';
        var res_data = encrypted+splitFlag+rsa_iv+splitFlag+rsa_key
        return res_data
    }

    doDecode(data,key_utf8,iv_utf8)
    {
       // var key_utf8 = CryptoJS.enc.Utf8.parse(KEY);// 秘钥
        //var iv_utf8= CryptoJS.enc.Utf8.parse(IV);//向量iv
        let encryptedHexStr = CryptoJS.enc.Hex.parse(data);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let decrypt = CryptoJS.AES.decrypt(srcs,key_utf8,{iv: iv_utf8, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7}).toString();
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
}

export const G_HttpHelper = HttpHelper.Instance;
