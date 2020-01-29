"use strict";
cc._RF.push(module, '00fa3NvVylEwIsGnxdkEpzH', 'RedWarsNode');
// Script/Hall/Activity/RedWarsNode.ts

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
var RedWarsNode = /** @class */ (function (_super) {
    __extends(RedWarsNode, _super);
    function RedWarsNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.redWarsBox = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    RedWarsNode.prototype.start = function () {
    };
    // update (dt) {}
    RedWarsNode.prototype.onCanYu = function () {
        this.redWarsBox.active = true;
    };
    __decorate([
        property(cc.Node)
    ], RedWarsNode.prototype, "redWarsBox", void 0);
    RedWarsNode = __decorate([
        ccclass
    ], RedWarsNode);
    return RedWarsNode;
}(cc.Component));
exports.default = RedWarsNode;

cc._RF.pop();