"use strict";
cc._RF.push(module, '87e76ybyQ1F0KtbEqxIsRox', 'RouletteNode');
// Script/Hall/Activity/RouletteNode.ts

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
var Utils_1 = require("../../Tool/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RouletteNode = /** @class */ (function (_super) {
    __extends(RouletteNode, _super);
    function RouletteNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btnlkcy = null;
        _this.rouletteBox = null;
        _this.pic = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    RouletteNode.prototype.onLoad = function () {
        Utils_1.G_Utils.onClickEnd(this.btnlkcy, this.onlkcy, this);
        Utils_1.G_Utils.onClickEnd(this.pic, this.onlkcy, this);
    };
    RouletteNode.prototype.start = function () {
    };
    RouletteNode.prototype.onEnable = function () {
    };
    RouletteNode.prototype.onlkcy = function () {
        this.rouletteBox.active = true;
    };
    __decorate([
        property(cc.Node)
    ], RouletteNode.prototype, "btnlkcy", void 0);
    __decorate([
        property(cc.Node)
    ], RouletteNode.prototype, "rouletteBox", void 0);
    __decorate([
        property(cc.Node)
    ], RouletteNode.prototype, "pic", void 0);
    RouletteNode = __decorate([
        ccclass
    ], RouletteNode);
    return RouletteNode;
}(cc.Component));
exports.default = RouletteNode;

cc._RF.pop();