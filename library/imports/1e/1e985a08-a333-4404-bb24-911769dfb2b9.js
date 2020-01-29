"use strict";
cc._RF.push(module, '1e985oIozNEBLskkRdp37K5', 'RecordPanel');
// Script/Hall/Withdraw/RecordPanel.ts

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
var RecordPanel = /** @class */ (function (_super) {
    __extends(RecordPanel, _super);
    function RecordPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        _this.content = null;
        _this.recorListItem = null;
        _this._updateQueryFlag = false;
        return _this;
    }
    RecordPanel.prototype.onLoad = function () {
        // let scrollviewList = this.node.getChildByName("scrollviewList")
        // let view = scrollviewList.getChildByName("view")
        // this.content = view.getChildByName("content")
        // this.recorListItem = this.content.getChildByName("recorListItem")
        // this.content.removeAllChildren()
        this.list.numItems = 10;
    };
    RecordPanel.prototype.start = function () {
    };
    // update (dt) {}
    RecordPanel.prototype.onEnable = function () {
        // this.setScrollviewList();
    };
    RecordPanel.prototype.setScrollviewList = function () {
        this.content.removeAllChildren();
        for (var index = 0; index < 20; index++) {
            var piece = cc.instantiate(this.recorListItem);
            piece.parent = this.content;
            piece.getChildByName("sprDiSe").active = index % 2 == 0;
            for (var i = 0; i < 5; i++) {
                var labStr = piece.getChildByName("label_" + i);
                labStr.getComponent(cc.Label).string = i;
            }
        }
    };
    RecordPanel.prototype.onListRender = function (item, idx) {
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        for (var i = 0; i < 5; i++) {
            var labStr = item.getChildByName("label_" + i);
            labStr.getComponent(cc.Label).string = "csdd" + idx;
        }
    };
    RecordPanel.prototype.onRequestData = function (item, idx) {
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
    ], RecordPanel.prototype, "list", void 0);
    RecordPanel = __decorate([
        ccclass
    ], RecordPanel);
    return RecordPanel;
}(cc.Component));
exports.default = RecordPanel;

cc._RF.pop();