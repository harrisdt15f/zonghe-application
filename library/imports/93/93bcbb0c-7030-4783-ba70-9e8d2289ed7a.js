"use strict";
cc._RF.push(module, '93bcbsMcDBHg7pwno0iie16', 'HallScene');
// Script/Hall/HallScene.ts

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
var IdentifyKey_1 = require("../Config/IdentifyKey");
var uiEvent_1 = require("../Config/uiEvent");
var UiForms_1 = require("../Tool/UiForms");
var Language_1 = require("../Language/Language");
var config_1 = require("../Config/config");
var Sound_1 = require("../Tool/Sound");
var UserControl_1 = require("../Controller/UserControl");
var Platforms_1 = require("../Platform/Platforms");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HallScene = /** @class */ (function (_super) {
    __extends(HallScene, _super);
    function HallScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hall = null;
        return _this;
    }
    HallScene.prototype.onLoad = function () {
        // cc.debug.setDisplayStats(false)
        if (cc.winSize.height < 750 || cc.winSize.height > 750) {
            this.node.scaleY = cc.winSize.height / 750;
            console.log("【缩放比例】", cc.director.getWinSize().height / 750);
        }
        UiForms_1.G_UiForms.init(this.node);
        Sound_1.G_Sound.soundMusic();
        Language_1.G_Language.init(config_1.LANGUAGE);
        // cc.sys.localStorage.clear();
        UserControl_1.G_UserControl.detectionLogin(function (data) {
            if (!data.status) {
                var _nodeName = uiEvent_1.uiEventModules.landingNode;
                UiForms_1.G_UiForms.show(_nodeName);
                UiForms_1.G_UiForms.setSelectPanelShow(IdentifyKey_1.LoginTab_Type.login);
            }
        }.bind(this));
        var p = new Platforms_1.Platforms();
        p.eixtGame();
    };
    HallScene.prototype.start = function () {
    };
    // update (dt) {}
    HallScene.prototype.onSelectedItem = function (target) {
        var index = target.selecledId;
    };
    __decorate([
        property(cc.Prefab)
    ], HallScene.prototype, "hall", void 0);
    HallScene = __decorate([
        ccclass
    ], HallScene);
    return HallScene;
}(cc.Component));
exports.default = HallScene;

cc._RF.pop();