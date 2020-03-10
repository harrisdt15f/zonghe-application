"use strict";
cc._RF.push(module, '9cf08LLYHBPhqDF2LWiUrM4', 'WebNode');
// Script/Hall/WebNode.js

"use strict";

if (cc.sys.isBrowser) {
    //这里是浏览器环境下， 接收web传过来的消息
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
        //this.webView.url = _url; // 如: "http://127.0.0.1:8190/web/"
        // 这里是与内部页面约定的关键字，请不要使用大写字符，会导致 location 无法正确识别。
        var scheme = "testkey";
        //这里是移动端， 接收web传过来的消息
        function jsCallback(target, url) {
            // 这里的返回值是内部页面的 URL 数值，需要自行解析自己需要的数据。
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
    init: function init(_url) {
        this.webView.url = _url;
        this.cocosToWeb();
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
            // this.webView._sgNode._renderCmd._iframe.contentWindow.postMessage(data, "*");
            //如果因为版本原因 _sgNode 被舍弃了，可以换成以下
            this.webView._impl._iframe.contentWindow.postMessage(data, "*");
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