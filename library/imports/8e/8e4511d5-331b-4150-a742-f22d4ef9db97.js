"use strict";
cc._RF.push(module, '8e451HVMxtBUKdC8i1O+duX', 'landingPanel');
// Script/Hall/Loanding/landingPanel.ts

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
var Utils_1 = require("../../Tool/Utils");
var UiForms_1 = require("../../Tool/UiForms");
var Language_1 = require("../../Language/Language");
var OnFire_1 = require("../../Net/OnFire");
var uiEvent_1 = require("../../Config/uiEvent");
var UserControl_1 = require("../../Controller/UserControl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var landingPanel = /** @class */ (function (_super) {
    __extends(landingPanel, _super);
    function landingPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.phoneNumEditbox = null;
        _this.passwordEditbox = null;
        _this.btnLanding = null;
        _this.isLanding = true;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    landingPanel.prototype.onLoad = function () {
        Utils_1.G_Utils.onClickEnd(this.btnLanding, this.onLanding, this);
    };
    landingPanel.prototype.start = function () {
    };
    // update (dt) {}
    landingPanel.prototype.onEnable = function () {
        var name = UserControl_1.G_UserControl.getUser().userMobile;
        if (name)
            this.phoneNumInfo = name;
        var pass = UserControl_1.G_UserControl.getUser().userPassword;
        if (pass)
            this.passwordInfo = pass;
    };
    landingPanel.prototype.onLanding = function () {
        var _this = this;
        if (this.phoneNumInfo === '') {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("AccountIsEmpty"));
            return;
        }
        if (this.passwordInfo === '') {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("PasswordIsEmpty"));
            return;
        }
        if (!this.btnLanding.getComponent(cc.Button).enabled) {
            console.log('2222');
            return;
        }
        if (!this.isLanding) {
            return;
        }
        console.log('333');
        this.btnLanding.getComponent(cc.Button).enabled = false;
        this.isLanding = false;
        this.scheduleOnce(function () {
            // this.btnLanding.getComponent(cc.Button).enabled= true;
            _this.isLanding = true;
        }, 1);
        UserControl_1.G_UserControl.requestLogin(this.phoneNumInfo, this.passwordInfo, function (data) {
            this.btnLanding.getComponent(cc.Button).enabled = true;
            if (data.status) {
                OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.colseBox);
            }
            else {
                UiForms_1.G_UiForms.hint(data.message);
            }
        }.bind(this));
    };
    Object.defineProperty(landingPanel.prototype, "phoneNumInfo", {
        get: function () {
            return this.phoneNumEditbox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.phoneNumEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(landingPanel.prototype, "passwordInfo", {
        get: function () {
            return this.passwordEditbox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.passwordEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        property(cc.Node)
    ], landingPanel.prototype, "phoneNumEditbox", void 0);
    __decorate([
        property(cc.Node)
    ], landingPanel.prototype, "passwordEditbox", void 0);
    __decorate([
        property(cc.Node)
    ], landingPanel.prototype, "btnLanding", void 0);
    landingPanel = __decorate([
        ccclass
    ], landingPanel);
    return landingPanel;
}(cc.Component));
exports.default = landingPanel;

cc._RF.pop();