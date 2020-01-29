"use strict";
cc._RF.push(module, '7c703t4RHxB0L6NIwx9EEZ4', 'ScrollMsg');
// Script/Tool/ScrollMsg.ts

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
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
//跑马灯
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ScrollMsg = /** @class */ (function (_super) {
    __extends(ScrollMsg, _super);
    function ScrollMsg() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.maskNode = null;
        _this.label = null;
        _this.richText = null;
        _this.targetText = null;
        /**
         * 滾動內容
         */
        _this.contentArr = new Array();
        _this.startPos = null;
        return _this;
    }
    ScrollMsg.prototype.onLoad = function () {
        var _this = this;
        this.startPos = cc.v2(this.maskNode.width / 2, 0);
        // if(this.contentArr.length == 0)
        // {
        //     this.node.active = false
        // }
        // this.label.node.position = this.startPos
        // this.richText.node.position = this.startPos
        this.targetText = this.label.node.active ? this.label : this.richText;
        this.targetText.node.position = this.startPos;
        var strNum = String("123456789.0");
        var str = this.getRichText("玩家昵称七个字", "石头剪刀布", strNum);
        this.targetText.string = str;
        // cc.find("Canvas/Btn").
        // let str = "各位看官，大家好！"+"000??"
        var count = 0;
        // cc.Node.EventType.MOUSE_UP
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            _this.startScroll(str);
            count += 1;
            str = str + count;
        });
    };
    ScrollMsg.prototype.start = function () {
    };
    // update (dt) {}
    /**
     * 開始滾動信息
     * @param content 滾動內容
     */
    ScrollMsg.prototype.startScroll = function (content) {
        var self = this;
        if (content == null || content.length == 0) {
            return;
        }
        this.node.active = true;
        this.contentArr.push(content);
        if (self.targetText.node.getActionByTag(0) != null
            && this.targetText.node.getActionByTag(0).isDone() == false) //如果正在播放只插入數據
         {
            return;
        }
        var scrollFunc = function () {
            if (self.contentArr.length > 0) {
                self.targetText.string = self.contentArr.shift();
                //需要先更新標籤的寬度，不然下一幀才更新，這裏取到的值就會是原來的值，導致寬度計算錯誤
                // self.targetText._updateRenderData(true)
                self.targetText.node.position = self.startPos;
                var distance = self.targetText.node.width + self.targetText.node.parent.width;
                var duration = distance / 100;
                var seq = cc.sequence(cc.moveBy(duration, cc.v2(-distance, 0)), cc.callFunc(function () {
                    self.targetText.string = "";
                    self.targetText.node.position = self.startPos;
                    scrollFunc();
                }));
                seq.setTag(0);
                self.targetText.node.runAction(seq);
            }
            else {
                // self.node.active = false
            }
        };
        scrollFunc();
    };
    ScrollMsg.prototype.onDestroy = function () {
        if (this.targetText.node.getActionByTag(0) != null) {
            this.targetText.node.stopAction(this.targetText.node.getActionByTag(0));
        }
    };
    ScrollMsg.prototype.getRichText = function (userName, gameType, gold) {
        var str = '';
        var _count = 0;
        while (_count < gold.length) {
            var num = gold.charAt(_count);
            str = str + '<img src = "' + num + '"/>';
            _count++;
        }
        var strUserName = '<color=#fee39b> 恭喜玩家 <color = #ffffff> ' + '"' + userName + '"' + ' </color><color=#fee39b> 在 ';
        var strGameType = '<color = #47fdcc> ' + gameType + ' </color><color = #fee39b> 中';
        var goldText = '<color = #fee39b>金币。';
        return strUserName + strGameType + str + goldText;
    };
    __decorate([
        property(cc.Node)
    ], ScrollMsg.prototype, "maskNode", void 0);
    __decorate([
        property(cc.Label)
    ], ScrollMsg.prototype, "label", void 0);
    __decorate([
        property(cc.RichText)
    ], ScrollMsg.prototype, "richText", void 0);
    ScrollMsg = __decorate([
        ccclass
    ], ScrollMsg);
    return ScrollMsg;
}(cc.Component));
exports.default = ScrollMsg;

cc._RF.pop();