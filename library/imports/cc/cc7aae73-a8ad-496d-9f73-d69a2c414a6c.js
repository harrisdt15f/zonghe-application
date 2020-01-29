"use strict";
cc._RF.push(module, 'cc7aa5zqK1JbZ9z1posQUps', 'TipsNode');
// Script/Hall/TipsNode.ts

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
var TipsNode = /** @class */ (function (_super) {
    __extends(TipsNode, _super);
    function TipsNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = null;
        return _this;
    }
    // onLoad () {}
    TipsNode.prototype.start = function () {
    };
    // update (dt) {}
    TipsNode.prototype.onEnable = function () {
        this.scheduleOnce(function () {
            this.node.active = false;
        }, 2);
    };
    Object.defineProperty(TipsNode.prototype, "textString", {
        get: function () {
            return this.text.string;
        },
        set: function (text) {
            this.text.string = text;
            this.node.active = true;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        property(cc.Label)
    ], TipsNode.prototype, "text", void 0);
    TipsNode = __decorate([
        ccclass
    ], TipsNode);
    return TipsNode;
}(cc.Component));
exports.default = TipsNode;

cc._RF.pop();