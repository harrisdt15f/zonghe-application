"use strict";
cc._RF.push(module, '4818cDGhUxCIKjHHDRL3Bwo', 'SiteNode');
// Script/Hall/Message/SiteNode.ts

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
var SiteNode = /** @class */ (function (_super) {
    __extends(SiteNode, _super);
    function SiteNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        _this._updateQueryFlag = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    SiteNode.prototype.onLoad = function () {
        this.list.numItems = 10;
        var btnFaSong = this.node.getChildByName("btnFaSong");
        btnFaSong.on(cc.Node.EventType.TOUCH_END, this.onFaSong.bind(this));
    };
    SiteNode.prototype.start = function () {
    };
    // update (dt) {}
    SiteNode.prototype.onEnable = function () {
        this._updateQueryFlag = false;
    };
    SiteNode.prototype.onListRender = function (item, idx) {
        item.getChildByName("label").getComponent(cc.Label).string = "" + idx;
    };
    SiteNode.prototype.onRequestData = function (item, idx) {
        if (this.list.numItems >= 99) {
            return;
        }
        if (this._updateQueryFlag) {
            this._updateQueryFlag = false;
            return;
        }
        this.list.numItems += 10;
    };
    SiteNode.prototype.onToggleContainer = function (event) {
        // console.log("，，，，，",event)
        // console.log("噢噢噢噢噢噢噢噢》》》",event.node.name)
        if (event.node.name === "toggle1") {
        }
        else if (event.node.name === "toggle2") {
        }
        else if (event.node.name === "toggle3") {
        }
    };
    SiteNode.prototype.onFaSong = function () {
    };
    __decorate([
        property(List_1.default)
    ], SiteNode.prototype, "list", void 0);
    SiteNode = __decorate([
        ccclass
    ], SiteNode);
    return SiteNode;
}(cc.Component));
exports.default = SiteNode;

cc._RF.pop();