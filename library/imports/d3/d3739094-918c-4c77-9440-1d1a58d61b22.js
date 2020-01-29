"use strict";
cc._RF.push(module, 'd3739CUkYxMd5RAHRpY1hsi', 'RankItem');
// Script/Hall/RankItem.ts

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
var RankItem = /** @class */ (function (_super) {
    __extends(RankItem, _super);
    function RankItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rankLabel = null;
        _this.nameLabel = null;
        _this.moneyLabel = null;
        _this.back = null;
        _this.index = null;
        _this.msg = null;
        _this.colorList = ["ffeb1f", "D33F11", "1885AD"];
        _this.colorNormal = "a1582b";
        return _this;
        // update (dt) {}
    }
    RankItem.prototype.start = function () {
    };
    RankItem.prototype.init = function (_index, _msg) {
        this.index = _index;
        this.msg = _msg;
        this.onRefreshData();
    };
    RankItem.prototype.onRefreshData = function () {
        console.log("this.msg    " + this.msg);
        if (this.msg == null) {
            return;
        }
        //'<color=#fee39b> 恭喜玩家 <color = #ffffff> '+'"'+userName+'"'+' </color><color=#fee39b> 在 '
        var rgb = null;
        if (this.colorList[this.index - 1]) {
            rgb = this.colorList[this.index - 1];
        }
        else {
            rgb = this.colorNormal;
        }
        console.log('rgb  ' + rgb);
        this.rankLabel.string = '<color=#' + rgb + ">" + this.index + "</color>";
        this.nameLabel.string = '<color=#' + rgb + ">" + this.msg.name + "</color>";
        this.moneyLabel.string = '<color=#' + rgb + ">" + Math.floor(this.msg.balance) + "</color>";
        this.back.active = this.index % 2 == 0;
    };
    __decorate([
        property(cc.RichText)
    ], RankItem.prototype, "rankLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], RankItem.prototype, "nameLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], RankItem.prototype, "moneyLabel", void 0);
    __decorate([
        property(cc.Node)
    ], RankItem.prototype, "back", void 0);
    RankItem = __decorate([
        ccclass
    ], RankItem);
    return RankItem;
}(cc.Component));
exports.default = RankItem;

cc._RF.pop();