"use strict";
cc._RF.push(module, '1ba3dP3+3VLaJcPPel3E8jB', 'ShowBox');
// Script/Hall/ShowBoxUI/ShowBox.ts

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
var OnFire_1 = require("../../Net/OnFire");
var uiEvent_1 = require("../../Config/uiEvent");
var Utils_1 = require("../../Tool/Utils");
var IdentifyKey_1 = require("../../Config/IdentifyKey");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var boxTypeEnum = cc.Enum(IdentifyKey_1.BOX_TYPE);
var ShowBox = /** @class */ (function (_super) {
    __extends(ShowBox, _super);
    function ShowBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.box = null;
        _this.peanl = null;
        _this.boxType = boxTypeEnum.BOX_NONE;
        _this.titleTextAtlas = null;
        _this.headAtals = null;
        _this.buleBg = null;
        _this.comBox = null;
        _this.creamColouredBg = null;
        _this.SprTitle = null;
        _this.luImage = null;
        _this.sprTitleName = null;
        _this.btnColse = null;
        _this.modulesUI = [];
        //属性
        // peanl = null;
        _this.tempNode = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    ShowBox.prototype.onLoad = function () {
        this.peanl.removeAllChildren();
        Utils_1.G_Utils.onClickEnd(this.btnColse, this.onColse, this);
        OnFire_1.G_OnFire.on(uiEvent_1.uiEventFunction.colseBox, this.onColse.bind(this));
    };
    ShowBox.prototype.start = function () {
    };
    // update (dt) {}
    ShowBox.prototype.onEnable = function () {
    };
    ShowBox.prototype.onColse = function () {
        this.peanl.removeAllChildren();
        OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.secondaryInterface);
        this.node.active = false;
    };
    ShowBox.prototype.onDestroy = function () {
        this.btnColse.off(cc.Node.EventType.TOUCH_END, this.onColse.bind(this));
        OnFire_1.G_OnFire.off(uiEvent_1.uiEventFunction.colseBox, this.onColse.bind(this));
    };
    ShowBox.prototype.show = function (_event, style) {
        this.box.scale = 0.6;
        console.log("_event", _event);
        this.node.active = true;
        this.boxType = style || boxTypeEnum.BOX_NONE;
        var nodeName = _event;
        var data = this.getPrefabAndKey(nodeName);
        var prefab = data.prefab;
        var key = data.key;
        this.setBoxStyle(nodeName);
        if (prefab) {
            this.tempNode = cc.instantiate(prefab);
            this.tempNode.parent = this.peanl;
            this.sprTitleName.spriteFrame = this.titleTextAtlas.getSpriteFrame("title_" + key);
        }
        console.log("<<show UI>>[prefab]:", this.tempNode.name);
        var s1 = cc.scaleTo(0.2, 1.2);
        var s2 = cc.scaleTo(0.2, 1);
        var seq = cc.sequence(s1, s2);
        this.box.runAction(seq);
    };
    ShowBox.prototype.setSelectPanelShow = function (index) {
        var subitem = this.tempNode.getComponent("SubitemControl");
        subitem.leftSelectedItem = index;
    };
    ShowBox.prototype.setBoxStyle = function (type) {
        //商店，活动
        var flag = (type === uiEvent_1.uiEventModules.shopNode || type === uiEvent_1.uiEventModules.activityNode || this.boxType == boxTypeEnum.BOX_COM) ? false : true;
        this.luImage.active = flag;
        this.buleBg.node.active = true;
        this.SprTitle.node.active = true;
        this.creamColouredBg.node.active = this.boxType != boxTypeEnum.BOX_COM;
        this.comBox.active = this.boxType == boxTypeEnum.BOX_COM;
        ;
        switch (this.boxType) {
            case boxTypeEnum.BOX_NONE:
                this.buleBg.node.width = 1120; //1080
                this.SprTitle.node.width = 1230; //1200
                this.creamColouredBg.node.x = 110;
                this.btnColse.x = 580;
                break;
            case boxTypeEnum.BOX_SMALL:
                this.buleBg.node.width = 880;
                this.SprTitle.node.width = 1000;
                this.creamColouredBg.node.x = 0;
                this.luImage.active = false;
                this.btnColse.x = 465;
                break;
            case boxTypeEnum.BOX_COM:
                this.buleBg.node.active = false;
                this.SprTitle.node.active = false;
                // this.luImage.active = false;
                break;
            default:
                break;
        }
    };
    ShowBox.prototype.getPrefabAndKey = function (prefabName) {
        var prefab = null;
        var key = 0;
        // console.log("this.modulesUI.length  "+this.modulesUI.length)
        // for(let index = 0; index < this.modulesUI.length; index++){
        //     const element = this.modulesUI[index];
        //     if(element){
        //         console.log("------------->name  "+element.name + "  index "+index);
        //     }
        // }
        for (var index = 0; index < this.modulesUI.length; index++) {
            var element = this.modulesUI[index];
            if (element) {
                console.log("name  " + element.name + "  index " + index + " prefabName   " + prefabName);
                if (prefabName === element.name) {
                    prefab = element;
                    key = index;
                    console.log("element.name  " + element.name + "  index " + index);
                    break;
                }
            }
        }
        return { "prefab": prefab, "key": key };
    };
    __decorate([
        property(cc.Node)
    ], ShowBox.prototype, "box", void 0);
    __decorate([
        property(cc.Node)
    ], ShowBox.prototype, "peanl", void 0);
    __decorate([
        property({
            type: cc.Enum(boxTypeEnum),
            tooltip: "窗体类型：BOX_NONE 默认窗体, BOX_SMALL 小窗体, BOX_COM 通用窗体"
        })
    ], ShowBox.prototype, "boxType", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], ShowBox.prototype, "titleTextAtlas", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], ShowBox.prototype, "headAtals", void 0);
    __decorate([
        property({
            type: cc.Sprite,
            tooltip: "蓝色底图"
        })
    ], ShowBox.prototype, "buleBg", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: "通用二级界面"
        })
    ], ShowBox.prototype, "comBox", void 0);
    __decorate([
        property({
            type: cc.Sprite,
            tooltip: "灰色底图"
        })
    ], ShowBox.prototype, "creamColouredBg", void 0);
    __decorate([
        property(cc.Sprite)
    ], ShowBox.prototype, "SprTitle", void 0);
    __decorate([
        property(cc.Node)
    ], ShowBox.prototype, "luImage", void 0);
    __decorate([
        property({
            type: cc.Sprite,
            tooltip: "标题名称"
        })
    ], ShowBox.prototype, "sprTitleName", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: "关闭按钮"
        })
    ], ShowBox.prototype, "btnColse", void 0);
    __decorate([
        property({
            type: cc.Prefab,
            tooltip: "功能模块"
        })
    ], ShowBox.prototype, "modulesUI", void 0);
    ShowBox = __decorate([
        ccclass
    ], ShowBox);
    return ShowBox;
}(cc.Component));
exports.default = ShowBox;

cc._RF.pop();