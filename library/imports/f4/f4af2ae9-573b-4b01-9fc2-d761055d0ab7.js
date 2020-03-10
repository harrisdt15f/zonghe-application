"use strict";
cc._RF.push(module, 'f4af2rpVztLAZ/C12EFXQq3', 'VipPromotedMoSiPanel');
// Script/Hall/PlayerCenter/VipPromotedMoSiPanel.ts

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
var VipControl_1 = require("../../Controller/VipControl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var VipPromotedMoSiPanel = /** @class */ (function (_super) {
    __extends(VipPromotedMoSiPanel, _super);
    function VipPromotedMoSiPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        _this.content = null;
        _this.itemPrefab = null;
        _this.itemList = null;
        return _this;
        // public setListItem(len){
        //     this.content.removeAllChildren()
        //     for (let index = 0; index < len; index++) {
        //         let piece = cc.instantiate(this.item)
        //         piece.parent = this.content;
        //         piece.getChildByName("sprDiSe").active = index % 2 == 0;
        //         for (let i = 0; i < 6; i++) {
        //             let labStr = piece.getChildByName("label_"+i)
        //             labStr.getComponent(cc.Label).string = i;
        //         }
        //     }
        // }
        /*
        onListRender(item: cc.Node, idx: number) {
            item.getChildByName("sprDiSe").active = idx % 2 == 0;
            for (let i = 0; i < 6; i++) {
                let labStr = item.getChildByName("label_"+i)
                labStr.getComponent(cc.Label).string = "cs"+idx;
            }
        }
    
        onRequestData(item: cc.Node, idx: number){
            if (this.list.numItems >= 5){
                return;
            }
      
            this.list.numItems += 10
        }
        */
    }
    VipPromotedMoSiPanel.prototype.onLoad = function () {
        if (this.itemList == null) {
            this.itemList = [];
            this.setScrollviewList();
        }
    };
    VipPromotedMoSiPanel.prototype.start = function () {
    };
    // update (dt) {}
    VipPromotedMoSiPanel.prototype.onEnable = function () {
    };
    VipPromotedMoSiPanel.prototype.setScrollviewList = function () {
        var data = VipControl_1.G_VipControl.getVipConfig().data;
        // this.content.removeAllChildren()
        console.log('data  ' + data);
        for (var index = 0; index < data.length; index++) {
            var piece = cc.instantiate(this.itemPrefab);
            piece.active = true;
            this.content.addChild(piece);
            piece.getChildByName("sprDiSe").active = index % 2 == 0;
            var _data = data[index];
            /*
            for (let i = 0; i < 5; i++) {
                piece.getChildByName("label_"+i).getComponent(cc.Label).string = _data["name"];
                //_data["name"]
            }*/
            piece.getChildByName("label_0").getComponent(cc.Label).string = _data["level"];
            piece.getChildByName("label_1").getComponent(cc.Label).string = Math.floor(_data["experience_max"]).toString();
            piece.getChildByName("label_2").getComponent(cc.Label).string = (Math.floor(_data["promotion_gift"] * 10) / 10).toString();
            piece.getChildByName("label_3").getComponent(cc.Label).string = (Math.floor(_data["weekly_gift"] * 10) / 10).toString();
            piece.getChildByName("label_4").getComponent(cc.Label).string = "1倍";
            piece.getChildByName("label_5").getComponent(cc.Label).string = "1倍";
        }
    };
    __decorate([
        property(List_1.default)
    ], VipPromotedMoSiPanel.prototype, "list", void 0);
    __decorate([
        property(cc.Node)
    ], VipPromotedMoSiPanel.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], VipPromotedMoSiPanel.prototype, "itemPrefab", void 0);
    VipPromotedMoSiPanel = __decorate([
        ccclass
    ], VipPromotedMoSiPanel);
    return VipPromotedMoSiPanel;
}(cc.Component));
exports.default = VipPromotedMoSiPanel;

cc._RF.pop();