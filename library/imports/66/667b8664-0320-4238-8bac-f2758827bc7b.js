"use strict";
cc._RF.push(module, '667b8ZkAyBCOIus8nWIJ7x7', 'AccountDelTk');
// Script/Hall/Withdraw/AccountDelTk.ts

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
var Language_1 = require("../../Language/Language");
var uiEvent_1 = require("../../Config/uiEvent");
var UiForms_1 = require("../../Tool/UiForms");
var OnFire_1 = require("../../Net/OnFire");
var WithDrawControl_1 = require("../../Controller/WithDrawControl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AccountDelTk = /** @class */ (function (_super) {
    __extends(AccountDelTk, _super);
    function AccountDelTk() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nameEditBox = null;
        _this.securyEditBox = null;
        _this.codeEditBox = null;
        _this.cdTimeLabel = null;
        _this.data = null;
        _this.cd_time = 0;
        _this.ver_key = null;
        return _this;
    }
    AccountDelTk.prototype.update = function (dt) {
        if (this.cd_time > 0) {
            this.cd_time -= dt;
            this.onCheckVerificationState();
        }
    };
    AccountDelTk.prototype.init = function (_data) {
        if (this.data != null && this.data.id != _data.id) {
            this.cd_time = 0;
            this.cdTimeLabel.string = '发送';
        }
        this.data = _data;
        //this.nameEditbox.getText().string = this.alipayName;
        // this.nameEditInfo = "";
        // this.codeEditInfo = '';
        // this.nameEditBox.getComponent("MyEditbox").getText().string = G_Language.get("accountNameInput");
        // this.securyEditBox.getComponent("MyEditbox").getText().string = G_Language.get("serurityInput");
        // this.codeEditBox.getComponent("MyEditbox").getText().string = G_Language.get("vcodeInput");
    };
    AccountDelTk.prototype.onEnable = function () {
        this.onCheckVerificationState();
    };
    AccountDelTk.prototype.onCheckVerificationState = function () {
        if (this.cd_time > 0) {
            this.cdTimeLabel.string = Math.floor(this.cd_time).toString();
        }
        else {
            this.cdTimeLabel.string = '发送';
        }
    };
    Object.defineProperty(AccountDelTk.prototype, "nameEditInfo", {
        get: function () {
            return this.nameEditBox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.nameEditBox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountDelTk.prototype, "securyEditInfo", {
        get: function () {
            return this.securyEditBox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.securyEditBox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountDelTk.prototype, "codeEditInfo", {
        get: function () {
            return this.codeEditBox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.codeEditBox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    AccountDelTk.prototype.onVerificationClick = function () {
        if (this.cd_time > 0) {
            return;
        }
        WithDrawControl_1.G_WithDrawControl.requesAccountDelVcode(function (ret) {
            if (ret.status) {
                UiForms_1.G_UiForms.hint(Language_1.G_Language.get('verificationCodeSend'));
                // this.ver_mobile = this.phoneNumInfo;
                this.cd_time = ret.data['nextReqTime'] - ret.data['currentReqTime'];
                this.ver_key = ret.data['verification_key'];
                // this.ver_code = ret.data['verification_code'];
                //  console.log('cd_time  '+ this.cd_time + "  ver_code  " +ret.data['verification_code']);
                this.onCheckVerificationState();
            }
            else {
                UiForms_1.G_UiForms.hint(ret.message);
            }
        }.bind(this));
    };
    AccountDelTk.prototype.onBtnTrue = function () {
        //G_UiForms.Web("https://blog.k-res.net/archives/2428.html")
        if (this.data == null) {
            return;
        }
        if (this.nameEditInfo === '') {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("nameEmpty"));
            return;
        }
        if (this.nameEditInfo != this.data.owner_name) {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("nameError"));
            return;
        }
        if (this.securyEditInfo === '') {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("securityisEmpty"));
            return;
        }
        if (this.codeEditInfo === '') {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("verificationIsEmpty"));
            return;
        }
        WithDrawControl_1.G_WithDrawControl.requesAccountDel(this.data.id, this.securyEditInfo, this.nameEditInfo, this.codeEditInfo, this.ver_key, function (ret) {
            if (ret.status) {
                UiForms_1.G_UiForms.hint(Language_1.G_Language.get('delSuccess'));
                OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.manage, true);
                this.onCheckVerificationState();
            }
            else {
                UiForms_1.G_UiForms.hint(ret.message);
            }
        }.bind(this));
    };
    AccountDelTk.prototype.onBtnFalse = function () {
        OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.manage, true);
    };
    __decorate([
        property(cc.Node)
    ], AccountDelTk.prototype, "nameEditBox", void 0);
    __decorate([
        property(cc.Node)
    ], AccountDelTk.prototype, "securyEditBox", void 0);
    __decorate([
        property(cc.Node)
    ], AccountDelTk.prototype, "codeEditBox", void 0);
    __decorate([
        property(cc.Label)
    ], AccountDelTk.prototype, "cdTimeLabel", void 0);
    AccountDelTk = __decorate([
        ccclass
    ], AccountDelTk);
    return AccountDelTk;
}(cc.Component));
exports.default = AccountDelTk;

cc._RF.pop();