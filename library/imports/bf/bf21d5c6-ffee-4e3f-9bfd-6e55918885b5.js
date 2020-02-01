"use strict";
cc._RF.push(module, 'bf21dXG/+5OP5v9blWRiIW1', 'registerPanel');
// Script/Hall/Login/registerPanel.ts

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
var registerPanel = /** @class */ (function (_super) {
    __extends(registerPanel, _super);
    function registerPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.phoneNumEditbox = null; //号码
        _this.passwordEditbox = null; //密码
        _this.passwordAgainbox = null; //再次
        _this.invatationBox = null; //邀请码
        _this.verificationBox = null; //验证码
        _this.verBtnLanding = null;
        _this.cdTimeLabel = null;
        _this.btnLanding = null;
        // LIFE-CYCLE CALLBACKS:
        _this.ver_mobile = null; //验证码手机号
        _this.ver_key = null;
        // private ver_code = null;  
        _this.cd_time = 0;
        return _this;
    }
    registerPanel.prototype.onLoad = function () {
        Utils_1.G_Utils.onClickEnd(this.btnLanding, this.onLanding, this);
        Utils_1.G_Utils.onClickEnd(this.verBtnLanding, this.onVerificationClick, this);
    };
    registerPanel.prototype.start = function () {
    };
    registerPanel.prototype.update = function (dt) {
        if (this.cd_time > 0) {
            this.cd_time -= dt;
            this.onCheckVerificationState();
        }
    };
    registerPanel.prototype.onEnable = function () {
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
    registerPanel.prototype.onCheckVerificationState = function () {
        if (this.cd_time > 0) {
            this.cdTimeLabel.string = Math.floor(this.cd_time).toString();
        }
        else {
            this.cdTimeLabel.string = '发送';
        }
    };
    registerPanel.prototype.onVerificationClick = function () {
        var _this = this;
        if (this.cd_time > 0) {
            return;
        }
        if (!this.verBtnLanding.getComponent(cc.Button).enabled) {
            return;
        }
        this.verBtnLanding.getComponent(cc.Button).enabled = false;
        this.scheduleOnce(function () {
            _this.verBtnLanding.getComponent(cc.Button).enabled = true;
        }, 1);
        var phone = this.phoneNumInfo;
        if (phone) {
            if (!Utils_1.G_Utils.isPoneAvailable(phone)) {
                UiForms_1.G_UiForms.hint(Language_1.G_Language.get("PhoneFormatWrong"));
                return;
            }
            UserControl_1.G_UserControl.requestVerificationCode(phone, function (ret) {
                if (ret.status) {
                    UiForms_1.G_UiForms.hint(Language_1.G_Language.get('verificationCodeSend'));
                    this.ver_mobile = this.phoneNumInfo;
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
        }
        else {
            console.log('phone   is empty');
        }
    };
    registerPanel.prototype.onLanding = function () {
        if (this.phoneNumInfo === '') {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("AccountIsEmpty"));
            return;
        }
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
        if (!this.btnLanding.getComponent(cc.Button).enabled) {
            return;
        }
        this.btnLanding.getComponent(cc.Button).enabled = false;
        //this.scheduleOnce(()=>{
        //    this.btnLanding.getComponent(cc.Button).enabled= true;
        // },1);
        UserControl_1.G_UserControl.requestRegister(this.ver_mobile, this.passwordInfo, this.passwordAgainInfo, this.verificationInfo, this.ver_key, this.invatationInfo, function (ret) {
            this.btnLanding.getComponent(cc.Button).enabled = true;
            if (ret.status) {
                UiForms_1.G_UiForms.hint(Language_1.G_Language.get('registerSuccess'));
            }
            else {
                UiForms_1.G_UiForms.hint(ret.message);
            }
            OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.colseBox);
        }.bind(this));
    };
    Object.defineProperty(registerPanel.prototype, "phoneNumInfo", {
        get: function () {
            return this.phoneNumEditbox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.phoneNumEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(registerPanel.prototype, "passwordInfo", {
        get: function () {
            return this.passwordEditbox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.passwordEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(registerPanel.prototype, "passwordAgainInfo", {
        get: function () {
            return this.passwordAgainbox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.passwordAgainbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(registerPanel.prototype, "invatationInfo", {
        get: function () {
            return this.invatationBox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.invatationBox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(registerPanel.prototype, "verificationInfo", {
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
    ], registerPanel.prototype, "phoneNumEditbox", void 0);
    __decorate([
        property(cc.Node)
    ], registerPanel.prototype, "passwordEditbox", void 0);
    __decorate([
        property(cc.Node)
    ], registerPanel.prototype, "passwordAgainbox", void 0);
    __decorate([
        property(cc.Node)
    ], registerPanel.prototype, "invatationBox", void 0);
    __decorate([
        property(cc.Node)
    ], registerPanel.prototype, "verificationBox", void 0);
    __decorate([
        property(cc.Node)
    ], registerPanel.prototype, "verBtnLanding", void 0);
    __decorate([
        property(cc.Label)
    ], registerPanel.prototype, "cdTimeLabel", void 0);
    __decorate([
        property(cc.Node)
    ], registerPanel.prototype, "btnLanding", void 0);
    registerPanel = __decorate([
        ccclass
    ], registerPanel);
    return registerPanel;
}(cc.Component));
exports.default = registerPanel;

cc._RF.pop();