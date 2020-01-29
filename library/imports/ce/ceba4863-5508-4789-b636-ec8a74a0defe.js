"use strict";
cc._RF.push(module, 'ceba4hjVQhHibY27Ip0oN7+', 'MyGengralizeNode');
// Script/Hall/Generalize/MyGengralizeNode.ts

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
var MyGengralizeNode = /** @class */ (function (_super) {
    __extends(MyGengralizeNode, _super);
    function MyGengralizeNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.node1 = null;
        _this.node2 = null;
        _this.save = null;
        _this.copywww = null;
        _this.labelURL = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    MyGengralizeNode.prototype.onLoad = function () {
        for (var index = 0; index < this.node2.children.length; index++) {
            var element = this.node2.children[index];
            element.on(cc.Node.EventType.TOUCH_END, this.onClick.bind(this));
        }
        this.save.on(cc.Node.EventType.TOUCH_END, this.onSave.bind(this));
        this.copywww.on(cc.Node.EventType.TOUCH_END, this.onCopyUrl.bind(this));
    };
    MyGengralizeNode.prototype.start = function () {
    };
    // update (dt) {}
    MyGengralizeNode.prototype.onEnable = function () {
        this.setTeamSizeData();
    };
    MyGengralizeNode.prototype.setTeamSizeData = function () {
        for (var index = 0; index < this.node1.children.length; index++) {
            var element = this.node1.children[index];
            element.getChildByName("label_0").getComponent(cc.Label).string = String(index);
        }
    };
    MyGengralizeNode.prototype.onClick = function (target) {
        var nodeName = target.target.name;
        if (nodeName === "ewm") {
        }
        else if (nodeName === "weixin") {
        }
        else if (nodeName === "QQ") {
        }
        else if (nodeName === "pyq") {
        }
        console.log("》》》分享》》", nodeName);
    };
    MyGengralizeNode.prototype.onSave = function () {
        console.log("》》》保存》》");
    };
    MyGengralizeNode.prototype.onCopyUrl = function () {
        console.log("》》》复制url》》");
    };
    __decorate([
        property(cc.Node)
    ], MyGengralizeNode.prototype, "node1", void 0);
    __decorate([
        property(cc.Node)
    ], MyGengralizeNode.prototype, "node2", void 0);
    __decorate([
        property(cc.Node)
    ], MyGengralizeNode.prototype, "save", void 0);
    __decorate([
        property(cc.Node)
    ], MyGengralizeNode.prototype, "copywww", void 0);
    __decorate([
        property(cc.Label)
    ], MyGengralizeNode.prototype, "labelURL", void 0);
    MyGengralizeNode = __decorate([
        ccclass
    ], MyGengralizeNode);
    return MyGengralizeNode;
}(cc.Component));
exports.default = MyGengralizeNode;

cc._RF.pop();