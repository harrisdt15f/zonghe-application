"use strict";
cc._RF.push(module, 'c2072fkacxJ1aDu4Zj4npHe', 'alterCodePanel');
// Script/Hall/SetUI/alterCodePanel.ts

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
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.passwordEditbox = null; //密码
        _this.passwordAgainbox = null; //再次
        _this.verificationBox = null; //验证码
        _this.verBtnLanding = null;
        _this.cdTimeLabel = null;
        _this.btnLanding = null;
        // LIFE-CYCLE CALLBACKS:
        _this.ver_key = null;
        // private ver_code = null;  
        _this.cd_time = 0;
        return _this;
    }
    NewClass.prototype.onLoad = function () {
        Utils_1.G_Utils.onClickEnd(this.btnLanding, this.onLanding, this);
        Utils_1.G_Utils.onClickEnd(this.verBtnLanding, this.onVerificationClick, this);
    };
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.update = function (dt) {
        if (this.cd_time > 0) {
            this.cd_time -= dt;
            this.onCheckVerificationState();
        }
    };
    NewClass.prototype.onEnable = function () {
        /*
        let name = G_UserControl.getUser().userMobile
        if(name)
            this.phoneNumInfo = name
        let pass = G_UserControl.getUser().userPassword
        if(pass)
            this.passwordInfo = pass;
         */
        this.onCheckVerificationState();
    };
    NewClass.prototype.onCheckVerificationState = function () {
        if (this.cd_time > 0) {
            this.cdTimeLabel.string = Math.floor(this.cd_time).toString();
        }
        else {
            this.cdTimeLabel.string = '发送';
        }
    };
    NewClass.prototype.onVerificationClick = function () {
        if (this.cd_time > 0) {
            return;
        }
        //let phone = this.phoneNumInfo
        // let verificationNumber = this.verificationInfo
        // console.log('verificationNumber   '+verificationNumber);      
        UserControl_1.G_UserControl.requestSecurityVerificationCode(function (ret) {
            if (ret.status && ret.code == 200) {
                UiForms_1.G_UiForms.hint(Language_1.G_Language.get('verificationCodeSend'));
                this.cd_time = ret.data['nextReqTime'] - ret.data['currentReqTime'];
                this.ver_key = ret.data['verification_key'];
                // this.ver_code = ret.data['verification_code'];
                console.log('cd_time  ' + this.cd_time + "  ver_code  " + ret.data['verification_code']);
                this.onCheckVerificationState();
            }
            else {
                UiForms_1.G_UiForms.hint(ret.message);
            }
        }.bind(this));
    };
    NewClass.prototype.onLanding = function () {
        if (this.passwordInfo === '') {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("PasswordIsEmpty"));
            return;
        }
        if (this.passwordAgainInfo != this.passwordInfo) {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("PasswordAgainDifference"));
            return;
        }
        if (this.verificationInfo === '') {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("verificationIsEmpty"));
            return;
        }
        UserControl_1.G_UserControl.requestSecurityRecoverCode(this.passwordInfo, this.passwordAgainInfo, this.verificationInfo, this.ver_key, function (ret) {
            if (ret.status && ret.code == 200) {
                UiForms_1.G_UiForms.hint(Language_1.G_Language.get('securityCodeSuccess'));
            }
            else {
                UiForms_1.G_UiForms.hint(ret.message);
            }
            OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.colseBox);
        });
    };
    Object.defineProperty(NewClass.prototype, "passwordInfo", {
        get: function () {
            return this.passwordEditbox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.passwordEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewClass.prototype, "passwordAgainInfo", {
        get: function () {
            return this.passwordAgainbox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.passwordAgainbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewClass.prototype, "verificationInfo", {
        get: function () {
            return this.verificationBox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.verificationBox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "passwordEditbox", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "passwordAgainbox", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "verificationBox", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "verBtnLanding", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "cdTimeLabel", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "btnLanding", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();