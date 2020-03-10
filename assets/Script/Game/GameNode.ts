

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameNode extends cc.Component {

    @property(cc.WebView)
    webview:cc.WebView=null;

    @property(cc.Node)
    ccNode : cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        var scheme = "http";
     
        function jsCallback (target, url) {
            // 这里的返回值是内部页面的 URL 数值，需要自行解析自己需要的数据。
            var str = url.replace(scheme + '://', ''); // str === 'a=1&b=2'
            // webview target
            console.log(">>>>>>>>>>>>>>",target,str);
        }

        this.webview.setJavascriptInterfaceScheme(scheme);
        this.webview.setOnJSCallback(jsCallback);

        // this.webview.

        // var vv = new cc.WebView();
        // vv.getComponent(cc.WebView).webviewLoadedEvents(function(){

        // })
        // vv.url = "https://www.baidu.com/"


        // this.ccNode.zIndex = 1000000000000000000
    }

    // update (dt) {}
}
