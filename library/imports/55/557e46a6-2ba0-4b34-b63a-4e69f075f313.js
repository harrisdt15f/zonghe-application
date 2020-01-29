"use strict";
cc._RF.push(module, '557e4amK6BLNLY6TmnwdfMT', 'HallRightNode');
// Script/Hall/HallRightNode.ts

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
var HallRightNode = /** @class */ (function (_super) {
    __extends(HallRightNode, _super);
    function HallRightNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gamePrefab = [];
        return _this;
    }
    // onLoad () {}
    HallRightNode.prototype.start = function () {
        //    this.creatorGameIcon(0)
    };
    // update (dt) {}
    HallRightNode.prototype.creatorGameIcon = function (types) {
        var GameScrollview = this.node.getChildByName("GameScrollview");
        var view = GameScrollview.getChildByName("view");
        var content = view.getChildByName("content");
        content.removeAllChildren();
        for (var index = 0; index < 13; index++) {
            var piece = cc.instantiate(this.gamePrefab[types]);
            piece.parent = content;
            piece.on(cc.Node.EventType.TOUCH_END, this.onOpenGame.bind(this));
        }
    };
    HallRightNode.prototype.onOpenGame = function () {
        // this.gameNode.active = true;
    };
    HallRightNode.prototype.onDestroy = function () {
    };
    __decorate([
        property(cc.Prefab)
    ], HallRightNode.prototype, "gamePrefab", void 0);
    HallRightNode = __decorate([
        ccclass
    ], HallRightNode);
    return HallRightNode;
}(cc.Component));
exports.default = HallRightNode;

cc._RF.pop();