"use strict";
cc._RF.push(module, '52376UEN/JAlatcss+WaV1x', 'RightNode');
// Script/Hall/Subitem/RightNode.ts

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
var RightNode = /** @class */ (function (_super) {
    __extends(RightNode, _super);
    function RightNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.strType = "";
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    RightNode.prototype.start = function () {
    };
    RightNode.prototype.onOffNode = function () {
        //商店
        var temp = [
            [0, 1],
            [0, 1],
            [1, 1],
            [-1, 0],
            [-1, 0],
            [2, 1]
        ];
        return temp;
    };
    __decorate([
        property
    ], RightNode.prototype, "strType", void 0);
    RightNode = __decorate([
        ccclass
    ], RightNode);
    return RightNode;
}(cc.Component));
exports.default = RightNode;

cc._RF.pop();