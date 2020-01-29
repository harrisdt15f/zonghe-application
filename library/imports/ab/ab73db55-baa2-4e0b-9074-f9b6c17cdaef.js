"use strict";
cc._RF.push(module, 'ab73dtVuqJOC5B0+bbBfNrv', 'NoticeNode');
// Script/Hall/Notice/NoticeNode.ts

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
var NoticeNode = /** @class */ (function (_super) {
    __extends(NoticeNode, _super);
    function NoticeNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btnClose = null;
        _this.textgg = null;
        _this.pageview = null;
        _this.content = null;
        _this.page = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NoticeNode.prototype.onLoad = function () {
        this.node.active = true;
        this.btnClose.on(cc.Node.EventType.TOUCH_END, this.onClose.bind(this));
    };
    NoticeNode.prototype.start = function () {
    };
    // update (dt) {}
    NoticeNode.prototype.onClose = function () {
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], NoticeNode.prototype, "btnClose", void 0);
    __decorate([
        property(cc.Node)
    ], NoticeNode.prototype, "textgg", void 0);
    __decorate([
        property(cc.Node)
    ], NoticeNode.prototype, "pageview", void 0);
    __decorate([
        property(cc.Node)
    ], NoticeNode.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], NoticeNode.prototype, "page", void 0);
    NoticeNode = __decorate([
        ccclass
    ], NoticeNode);
    return NoticeNode;
}(cc.Component));
exports.default = NoticeNode;

cc._RF.pop();