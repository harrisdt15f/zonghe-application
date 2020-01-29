"use strict";
cc._RF.push(module, '37f5cJENl9Gl6ASqRObKE3A', 'SystemMessageNode');
// Script/Hall/Message/SystemMessageNode.ts

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
var List_1 = require("../../Common/List");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SystemMessageNode = /** @class */ (function (_super) {
    __extends(SystemMessageNode, _super);
    function SystemMessageNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        _this._updateQueryFlag = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    SystemMessageNode.prototype.onLoad = function () {
        this.list.numItems = 10;
    };
    SystemMessageNode.prototype.start = function () {
    };
    // update (dt) {}
    SystemMessageNode.prototype.onEnable = function () {
        this._updateQueryFlag = false;
    };
    // onCallback(event){
    //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>",event.target.index)
    // }
    SystemMessageNode.prototype.onListRender = function (item, idx) {
        // item.on(cc.Node.EventType.TOUCH_END, this.onCallback, this)
        item.getChildByName("labelText").getComponent(cc.Label).string = "" + idx;
        var unread = item.getChildByName("unread"); //未读
        var read = item.getChildByName("read"); //已读
        var he = item.getChildByName("he"); //未读合起图标
        var kai = item.getChildByName("kai"); //已读打开图标
    };
    SystemMessageNode.prototype.onRequestData = function (item, idx) {
        if (this.list.numItems >= 99) {
            return;
        }
        if (this._updateQueryFlag) {
            this._updateQueryFlag = false;
            return;
        }
        this.list.numItems += 10;
    };
    __decorate([
        property(List_1.default)
    ], SystemMessageNode.prototype, "list", void 0);
    SystemMessageNode = __decorate([
        ccclass
    ], SystemMessageNode);
    return SystemMessageNode;
}(cc.Component));
exports.default = SystemMessageNode;

cc._RF.pop();