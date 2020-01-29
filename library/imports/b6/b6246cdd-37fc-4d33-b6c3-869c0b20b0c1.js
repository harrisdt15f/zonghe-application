"use strict";
cc._RF.push(module, 'b6246zdN/xNM7bDhpwLILDB', 'TerraceNoticeNode');
// Script/Hall/Message/TerraceNoticeNode.ts

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
var TerraceNoticeNode = /** @class */ (function (_super) {
    __extends(TerraceNoticeNode, _super);
    function TerraceNoticeNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        _this._updateQueryFlag = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    TerraceNoticeNode.prototype.onLoad = function () {
        this.list.numItems = 10;
    };
    TerraceNoticeNode.prototype.start = function () {
    };
    // update (dt) {}
    TerraceNoticeNode.prototype.onEnable = function () {
        this._updateQueryFlag = false;
    };
    TerraceNoticeNode.prototype.onListRender = function (item, idx) {
        item.getChildByName("label").getComponent(cc.Label).string = "" + idx;
    };
    TerraceNoticeNode.prototype.onRequestData = function (item, idx) {
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
    ], TerraceNoticeNode.prototype, "list", void 0);
    TerraceNoticeNode = __decorate([
        ccclass
    ], TerraceNoticeNode);
    return TerraceNoticeNode;
}(cc.Component));
exports.default = TerraceNoticeNode;

cc._RF.pop();