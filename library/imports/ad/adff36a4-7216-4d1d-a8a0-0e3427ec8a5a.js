"use strict";
cc._RF.push(module, 'adff3akchZNHaigDjQn7Ipa', 'GameNode');
// Script/Game/GameNode.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameNode = /** @class */ (function (_super) {
    __extends(GameNode, _super);
    function GameNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.webview = null;
        _this.ccNode = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    GameNode.prototype.start = function () {
        var scheme = "http";
        function jsCallback(target, url) {
            // 这里的返回值是内部页面的 URL 数值，需要自行解析自己需要的数据。
            var str = url.replace(scheme + '://', ''); // str === 'a=1&b=2'
            // webview target
            console.log(">>>>>>>>>>>>>>", target, str);
        }
        this.webview.setJavascriptInterfaceScheme(scheme);
        this.webview.setOnJSCallback(jsCallback);
        // this.webview.
        // var vv = new cc.WebView();
        // vv.getComponent(cc.WebView).webviewLoadedEvents(function(){
        // })
        // vv.url = "https://www.baidu.com/"
        // this.ccNode.zIndex = 1000000000000000000
    };
    __decorate([
        property(cc.WebView)
    ], GameNode.prototype, "webview", void 0);
    __decorate([
        property(cc.Node)
    ], GameNode.prototype, "ccNode", void 0);
    GameNode = __decorate([
        ccclass
    ], GameNode);
    return GameNode;
}(cc.Component));
exports.default = GameNode;

cc._RF.pop();