"use strict";
cc._RF.push(module, 'c7afcNdLuVK3bng3nJ1KzKH', 'Platforms');
// Script/Platform/Platforms.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UiForms_1 = require("../Tool/UiForms");
var Utils_1 = require("../Tool/Utils");
var Platforms = /** @class */ (function () {
    function Platforms() {
        this._toExitGame = null;
    }
    Platforms.prototype.eixtGame = function () {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        }
    };
    Platforms.prototype.onKeyDown = function (event) {
        var self = this;
        switch (event.keyCode) {
            case cc.macro.KEY.back:
                if (!self._toExitGame) {
                    // 首次点击，重置该标记
                    self._toExitGame = true;
                    UiForms_1.G_UiForms.hint("再次点击后退，退出游戏");
                    setTimeout(function () {
                        self._toExitGame = false;
                    }, 3000);
                }
                else {
                    // 已经点击过一次，则直接退出
                    cc.game.end();
                    return;
                }
                break;
        }
    };
    Platforms.prototype.webCopyString = function (str) {
        var el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.contain = 'strict';
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        el.style.fontSize = '12pt'; // Prevent zooming on iOS
        var selection = getSelection();
        var originalRange = null;
        if (selection.rangeCount > 0) {
            originalRange = selection.getRangeAt(0);
        }
        document.body.appendChild(el);
        el.select();
        el.selectionStart = 0;
        el.selectionEnd = str.length;
        var success = false;
        try {
            success = document.execCommand('copy');
        }
        catch (err) { }
        document.body.removeChild(el);
        if (originalRange) {
            selection.removeAllRanges();
            selection.addRange(originalRange);
        }
        return success;
    };
    Platforms.prototype.JsCopy = function (copyText) {
        /*
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "JavaCopy", "(Ljava/lang/String;)V", str);
        }
        */
        if (cc.sys.isNative && cc.sys.isMobile) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "JavaCopy", "(Ljava/lang/String;)V", copyText);
            }
            else if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "callNativeCopyText:", copyText);
            }
        }
        else if (cc.sys.isBrowser) {
            if (Utils_1.G_Utils.isiOS()) {
                var el = document.createElement('input');
                el.value = copyText;
                el.style.opacity = '0';
                document.body.appendChild(el);
                var editable = el.contentEditable;
                var readOnly = el.readOnly;
                //el.contentEditable = true;
                el.readOnly = false;
                var range = document.createRange();
                range.selectNodeContents(el);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                el.setSelectionRange(0, 999999);
                el.contentEditable = editable;
                el.readOnly = readOnly;
                var ret = document.execCommand('copy');
                el.blur();
                document.body.removeChild(el);
                // btn.text = ret ? '已复制' : '复制失败';
            }
            else {
                this.webCopyString(copyText);
                /*
                var textArea = document.getElementById("clipBoard");
                if (textArea === null) {
                    textArea = document.createElement("textarea");
                    textArea.id = "clipBoard";

                    textArea.textContent = copyText;
                    document.body.appendChild(textArea);
                }
             //   textArea.select();
                try {
                    const msg = document.execCommand('copy') ? 'successful' : 'unsuccessful';
                    document.body.removeChild(textArea);
                } catch (err) {
                }
                */
            }
        }
    };
    return Platforms;
}());
exports.Platforms = Platforms;

cc._RF.pop();