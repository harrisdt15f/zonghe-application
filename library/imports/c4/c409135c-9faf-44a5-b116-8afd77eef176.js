"use strict";
cc._RF.push(module, 'c4091Ncn69EpbEWiv137vF2', 'ShopWebView');
// Script/Hall/shop/ShopWebView.js

"use strict";

if (cc.sys.isBrowser) {
    window.addEventListener('message', function (e) {
        console.log("----cocos---", e.data);
        window.closeWebView(e);
    });
}

cc.Class({
    extends: cc.Component,

    properties: {
        webView: cc.WebView,
        debugText: cc.Label
    },

    start: function start() {
        this.setDebugText("start.....");
        this.webView.url = "web ip 地址";
        this.init();
    },
    init: function init() {
        var scheme = "testkey";
        function jsCallback(target, url) {
            var str = url.replace(scheme + '://', ''); // str === 'a=1&b=2'
            // webview target
            console.log("jsCallback-------str-------", str);
            window.closeWebView(target, url);
        }
        this.webView.setJavascriptInterfaceScheme(scheme);
        this.webView.setOnJSCallback(jsCallback);

        //web
        window.closeWebView = this.closeWebView.bind(this);
    },
    setDebugText: function setDebugText(str) {
        this.debugText.string = str;
    },


    //绑定按钮
    cocosToWeb: function cocosToWeb() {
        var data = {
            width: this.webView.node.width,
            height: this.webView.node.height,
            isNative: cc.sys.isNative,
            color: "#FF9800"
        };
        var text = void 0;
        console.log("------cocos------data-----------", data);
        //浏览器
        if (cc.sys.isBrowser) {
            console.log("-----cocos------Browser---------");
            text = "-----cocos------Browser---------";
            this.webView._sgNode._renderCmd._iframe.contentWindow.postMessage(data, "*");
        }
        //移动端
        else if (cc.sys.isNative) {
                console.log("-----cocos------Native---------");
                text = "-----cocos------Native---------";
                data = JSON.stringify(data);
                //setBackgroundColor 是 web 全局函数， data 参数
                this.webView.evaluateJS("setBackgroundColor(" + data + ")");
            }

        this.webView.node.active = true;
        this.setDebugText(text);
    },


    //关闭WebView
    closeWebView: function closeWebView(e, url) {
        this.webView.node.active = false;
        this.setDebugText("--------cocos-----close----webView-------" + url);
    },


    //事件
    onWebFinishLoad: function onWebFinishLoad(sender, event) {
        if (event === cc.WebView.EventType.LOADED) {
            this.setDebugText("----webView---loaded---finish!!----");
            this.cocosToWeb();
        } else if (event === cc.WebView.EventType.LOADING) {
            this.setDebugText("----webView---loading----");
        } else if (event === cc.WebView.EventType.ERROR) {
            this.setDebugText("----webView---load---error----");
        }
    }

});

cc._RF.pop();