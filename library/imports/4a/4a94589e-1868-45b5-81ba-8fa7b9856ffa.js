"use strict";
cc._RF.push(module, '4a945ieGGhFtYG6j6e5hW/6', 'GuessingNode');
// Script/Hall/Activity/GuessingNode.ts

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
var GuessingNode = /** @class */ (function (_super) {
    __extends(GuessingNode, _super);
    function GuessingNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.guessingBox = null;
        _this.btnLkcy = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    GuessingNode.prototype.onLoad = function () {
        Utils_1.G_Utils.onClickEnd(this.btnLkcy, this.onCanyu, this);
    };
    GuessingNode.prototype.start = function () {
    };
    GuessingNode.prototype.onDestroy = function () {
    };
    // update (dt) {}
    GuessingNode.prototype.onCanyu = function () {
        this.guessingBox.active = true;
    };
    __decorate([
        property(cc.Node)
    ], GuessingNode.prototype, "guessingBox", void 0);
    __decorate([
        property(cc.Node)
    ], GuessingNode.prototype, "btnLkcy", void 0);
    GuessingNode = __decorate([
        ccclass
    ], GuessingNode);
    return GuessingNode;
}(cc.Component));
exports.default = GuessingNode;

cc._RF.pop();