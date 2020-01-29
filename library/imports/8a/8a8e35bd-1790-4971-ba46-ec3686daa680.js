"use strict";
cc._RF.push(module, '8a8e3W9F5BJcbpG7DaG2qaA', 'TopUpListPanel');
// Script/Hall/shop/TopUpListPanel.ts

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
var TopUpListPanel = /** @class */ (function (_super) {
    __extends(TopUpListPanel, _super);
    function TopUpListPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        _this._updateQueryFlag = false;
        return _this;
    }
    TopUpListPanel.prototype.onLoad = function () {
        this.list.numItems = 10;
    };
    TopUpListPanel.prototype.start = function () {
    };
    // update (dt) {}
    TopUpListPanel.prototype.onEnable = function () {
        this._updateQueryFlag = false;
    };
    TopUpListPanel.prototype.onListRender = function (item, idx) {
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        for (var i = 0; i < 4; i++) {
            var labStr = item.getChildByName("label_" + i);
            labStr.getComponent(cc.Label).string = "cs" + idx;
        }
    };
    TopUpListPanel.prototype.onRequestData = function (item, idx) {
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
    ], TopUpListPanel.prototype, "list", void 0);
    TopUpListPanel = __decorate([
        ccclass
    ], TopUpListPanel);
    return TopUpListPanel;
}(cc.Component));
exports.default = TopUpListPanel;

cc._RF.pop();