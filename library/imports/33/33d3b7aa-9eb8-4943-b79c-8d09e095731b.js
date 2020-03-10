"use strict";
cc._RF.push(module, '33d3beqnrhJQ7ecjQnglXMb', 'ManageAddNode');
// Script/Hall/Withdraw/ManageAddNode.ts

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
var IdentifyKey_1 = require("../../Config/IdentifyKey");
var WithDrawControl_1 = require("../../Controller/WithDrawControl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var node = /** @class */ (function (_super) {
    __extends(node, _super);
    function node() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.typeList = null;
        _this.menuList = null;
        _this.grid = null;
        _this.txt_type = null;
        _this.txt_name = null;
        _this.txt_khyh = null;
        _this.txt_yhkh = null;
        _this.txt_khh = null;
        _this.txt_mima = null;
        _this.txt_mimaAgain = null;
        //private typeEditbox = null;    //取款方式    
        _this.nameEditbox = null; //姓名
        // private khyhEditbox = null;  //银行名称
        _this.yhkhEditbox = null; //银行卡号
        _this.khhEditbox = null; //开户行
        _this.mimaEditbox = null; //取款密码
        _this.mimaAgainEditbox = null; //确认取款密码
        _this.BankAccount = Language_1.G_Language.get("BankAccount");
        _this.PleaseEnterBankAccount = Language_1.G_Language.get("PleaseEnterTheBankCardNumber");
        _this.alipayAccount = Language_1.G_Language.get("AlipayAccount");
        _this.PleaseEnterAlipayAccount = Language_1.G_Language.get("PleaseEnterAlipayAccount");
        _this.mimaString = Language_1.G_Language.get("PleaseEnterWithDrawPassCode");
        _this.mimaAgainString = Language_1.G_Language.get("PleaseEnterWithDrawPassCodeAgain");
        _this.PleaseEnterBankName = Language_1.G_Language.get("PleaseEnterYourAccountName");
        _this.PleaseEnterAlipayName = Language_1.G_Language.get("PleaseEnterYourAlipayUserName");
        _this.typeMenu = null;
        _this._myPulldownMenu = null;
        _this.bankList = [];
        _this.typeNameList = ["支付宝", "银行卡"];
        _this.bankNameList = [];
        _this.typeId = 0;
        _this.chooseId = 0; //当前选定账户index
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    node.prototype.onLoad = function () {
        var _this = this;
        this.initBankCardNode();
        WithDrawControl_1.G_WithDrawControl.GetBanksList(function () {
            _this.bankList = WithDrawControl_1.G_WithDrawControl.getConfig().BankList;
            for (var i = 0; i < _this.bankList.length; i++) {
                var config = WithDrawControl_1.G_WithDrawControl.getConfig().getPayItemInfo(_this.bankList[i].code);
                _this.bankNameList[i] = config.name;
            }
            if (_this.typeList) {
                _this.typeMenu = _this.typeList.getComponent("MyPulldownMenu");
                _this.typeMenu.menuData = _this.typeNameList;
                _this.typeId = _this.typeMenu.selectResult.selectedId;
                var selectedText = _this.typeMenu.selectResult.text;
                console.log("选择了什么》》", _this.typeId, selectedText);
                var msg = _this.bankList[0];
                if (msg) {
                    // this.onSelectItem(msg) 
                }
            }
            if (_this.menuList) {
                _this._myPulldownMenu = _this.menuList.getComponent("MyPulldownMenu");
                _this._myPulldownMenu.menuData = _this.bankNameList;
                _this.chooseId = _this._myPulldownMenu.selectResult.selectedId;
                var selectedText = _this._myPulldownMenu.selectResult.text;
                console.log("选择了什么》》", _this.chooseId, selectedText);
                var msg = _this.bankList[0];
                if (msg) {
                    // this.onSelectItem(msg) 
                }
            }
            _this.onSelectItem();
        });
    };
    // onEnabel () {
    //     G_WithDrawControl.GetMyAccountList(()=>{
    //         this.bankList = G_WithDrawControl.getConfig().BankList;
    //         if(this.menuList){
    //             this._myPulldownMenu = this.menuList.getComponent("MyPulldownMenu")
    //             this._myPulldownMenu.menuData = this.bankList;
    //             this.chooseId = this._myPulldownMenu.selectResult.selectedId;
    //             var selectedText = this._myPulldownMenu.selectResult.text;
    //             console.log("选择了什么》》",this.chooseId,selectedText)
    //         }
    //     });
    // }
    // update (dt) {}
    node.prototype.initBankCardNode = function () {
        this.txt_type = this.grid.getChildByName("txt_type");
        // this.typeEditbox = this.txt_type.node.getChildByName("nameEditbox").getComponent("MyEditbox");
        // this.typeEditbox.getText().string = this.alipayName;
        this.txt_name = this.grid.getChildByName("txt_name");
        this.nameEditbox = this.txt_name.getChildByName("nameEditbox").getComponent("MyEditbox");
        //this.nameEditbox.getText().string = this.alipayName;
        this.txt_khyh = this.grid.getChildByName("txt_khyh");
        // this.khyhEditbox = this.txt_khyh.node.getChildByName("nameEditbox").getComponent("MyEditbox");
        this.txt_yhkh = this.grid.getChildByName("txt_yhkh");
        this.yhkhEditbox = this.txt_yhkh.getChildByName("yhkhEditbox").getComponent("MyEditbox");
        this.txt_khh = this.grid.getChildByName("txt_khh");
        this.khhEditbox = this.txt_khh.getChildByName("khhEditbox").getComponent("MyEditbox");
        this.txt_mima = this.grid.getChildByName("txt_mima");
        this.mimaEditbox = this.txt_mima.getChildByName("mimaEditbox").getComponent("MyEditbox");
        this.txt_mimaAgain = this.grid.getChildByName("txt_mimaAgain");
        this.mimaAgainEditbox = this.txt_mimaAgain.getChildByName("mimaAgainEditbox").getComponent("MyEditbox");
        // this.classKaHaoEditbox.onDidEndedCallback = function(target) {
        //     console.log("输入结束》》")
        // }
        // this.classKaHaoEditbox.onEditboxTextChanged = function(target) {
        //     console.log("录入》》")
        // }
        //确定绑定
        // let btnQueDing = this.node.getChildByName("btnQueDing");
        // btnQueDing.on(cc.Node.EventType.TOUCH_END, this.onQueDing.bind(this));
        // //取消
        // let btnQuXiao = this.node.getChildByName("btnQuXiao");
        // btnQuXiao.on(cc.Node.EventType.TOUCH_END, this.onQuXiao.bind(this));
        // //安全码
        // //let labelAnQuanMa = this.node.getChildByName("labelAnQuanMa");
        // //设置安全码
        // let btnSet = this.node.getChildByName("btnSet");
        // btnSet.on(cc.Node.EventType.TOUCH_END, this.onSetanquanma.bind(this));
    };
    node.prototype.onSetanquanma = function () {
        UiForms_1.G_UiForms.show(uiEvent_1.uiEventModules.setNode);
        UiForms_1.G_UiForms.setSelectPanelShow(IdentifyKey_1.TEXT_INFO.xiuGaiAnMa);
    };
    node.prototype.onQueDing = function () {
        var _name = this.nameEditInfo;
        var _account = this.yhkhEditInfo;
        if (_name === '') {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("nameEmpty"));
            return;
        }
        if (_account === '') {
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("accountEmpty"));
            return;
        }
        console.log("_name  ", _name, '  _account', _account);
        if (this.typeId == 0) //支付宝
         {
            if (WithDrawControl_1.G_WithDrawControl.isBindAliPay) {
                WithDrawControl_1.G_WithDrawControl.requesAlipayBind(_name, _account, function (ret) {
                    if (ret.status) {
                        UiForms_1.G_UiForms.hint(Language_1.G_Language.get("bindSuccess"));
                        OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.manage, true);
                    }
                    else {
                        UiForms_1.G_UiForms.hint(ret.message);
                    }
                    console.log("11111111111111111111111", ret.status);
                }.bind(this));
            }
            else {
                if (this.mimaEditInfo === '') {
                    UiForms_1.G_UiForms.hint(Language_1.G_Language.get("PasswordIsEmpty"));
                    return;
                }
                if (this.mimaAgainEditInfo === '') {
                    UiForms_1.G_UiForms.hint(Language_1.G_Language.get("PasswordIsEmpty"));
                    return;
                }
                if (this.mimaEditInfo != this.mimaAgainEditInfo) {
                    UiForms_1.G_UiForms.hint(Language_1.G_Language.get("PasswordAgainDifference"));
                    return;
                }
                WithDrawControl_1.G_WithDrawControl.requesAlipayBindFirst(_name, _account, this.mimaEditInfo, this.mimaAgainEditInfo, function (ret) {
                    if (ret.status) {
                        UiForms_1.G_UiForms.hint(Language_1.G_Language.get("bindSuccess"));
                        OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.manage, true);
                    }
                    else {
                        UiForms_1.G_UiForms.hint(ret.message);
                    }
                }.bind(this));
            }
        }
        else //银行卡
         {
            if (WithDrawControl_1.G_WithDrawControl.isBindBank) {
                WithDrawControl_1.G_WithDrawControl.requesBankBind(_name, _account, this.khhEditInfo, this.bankList[this.chooseId].code, this.bankList[this.chooseId].id, function (ret) {
                    if (ret.status) {
                        UiForms_1.G_UiForms.hint(Language_1.G_Language.get("bindSuccess"));
                        OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.manage, true);
                    }
                    else {
                        UiForms_1.G_UiForms.hint(ret.message);
                    }
                    console.log("11111111111111111111111", ret.status);
                }.bind(this));
            }
            else {
                if (this.mimaEditInfo === '') {
                    UiForms_1.G_UiForms.hint(Language_1.G_Language.get("PasswordIsEmpty"));
                    return;
                }
                if (this.mimaAgainEditInfo === '') {
                    UiForms_1.G_UiForms.hint(Language_1.G_Language.get("PasswordIsEmpty"));
                    return;
                }
                if (this.mimaEditInfo != this.mimaAgainEditInfo) {
                    UiForms_1.G_UiForms.hint(Language_1.G_Language.get("PasswordAgainDifference"));
                    return;
                }
                WithDrawControl_1.G_WithDrawControl.requesBankBindFirst(_name, _account, this.khhEditInfo, this.bankList[this.chooseId].code, this.bankList[this.chooseId].id, this.mimaEditInfo, this.mimaAgainEditInfo, function (ret) {
                    if (ret.status) {
                        UiForms_1.G_UiForms.hint(Language_1.G_Language.get("bindSuccess"));
                        OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.manage, true);
                    }
                    else {
                        UiForms_1.G_UiForms.hint(ret.message);
                    }
                }.bind(this));
            }
        }
        //G_OnFire.fire(uiEventFunction.manage, true);
    };
    node.prototype.onQuXiao = function () {
        OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.manage, true);
    };
    node.prototype.onListRender = function (item, idx) {
        console.log("idx   " + idx);
        /*
        let msg = this.bankList[idx]
        if(msg){
            this.onSelectItem(msg)
        }
        */
    };
    //当列表项被选择...
    node.prototype.onOneListSelected = function (data) {
        var _types = data.selectedId;
        console.log("_types   " + _types);
        this.typeId = _types;
        this.onSelectItem();
    };
    //当列表项被选择...
    node.prototype.onTwoListSelected = function (data) {
        var _types = data.selectedId;
        console.log("_types   " + _types);
        this.chooseId = _types;
        this.onSelectItem();
    };
    node.prototype.onSelectItem = function () {
        if (this.typeId == 0) //支付宝
         {
            this.txt_khyh.active = false;
            this.txt_khh.active = false;
            this.txt_mima.active = !WithDrawControl_1.G_WithDrawControl.isBindAliPay();
            this.txt_mimaAgain.active = !WithDrawControl_1.G_WithDrawControl.isBindAliPay();
            this.nameEditbox.getText().string = this.PleaseEnterAlipayName;
            this.txt_yhkh.getComponent(cc.Label).string = this.alipayAccount;
            this.yhkhEditbox.getText().string = this.PleaseEnterAlipayAccount;
        }
        else //银行卡
         {
            this.txt_khyh.active = true;
            this.txt_khh.active = true;
            this.txt_mima.active = !WithDrawControl_1.G_WithDrawControl.isBindBank();
            this.txt_mimaAgain.active = !WithDrawControl_1.G_WithDrawControl.isBindBank();
            this.nameEditbox.getText().string = this.PleaseEnterBankName;
            this.txt_yhkh.getComponent(cc.Label).string = this.BankAccount;
            this.yhkhEditbox.getText().string = this.PleaseEnterBankAccount;
        }
    };
    Object.defineProperty(node.prototype, "nameEditInfo", {
        get: function () {
            return this.nameEditbox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.nameEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(node.prototype, "yhkhEditInfo", {
        get: function () {
            return this.yhkhEditbox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.yhkhEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(node.prototype, "khhEditInfo", {
        get: function () {
            return this.khhEditbox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.khhEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(node.prototype, "mimaEditInfo", {
        get: function () {
            return this.mimaEditbox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.mimaEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(node.prototype, "mimaAgainEditInfo", {
        get: function () {
            return this.mimaAgainEditbox.getComponent("MyEditbox").getEdiboxComponent().string;
        },
        set: function (text) {
            this.mimaAgainEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        property(cc.Node)
    ], node.prototype, "typeList", void 0);
    __decorate([
        property(cc.Node)
    ], node.prototype, "menuList", void 0);
    __decorate([
        property(cc.Node)
    ], node.prototype, "grid", void 0);
    node = __decorate([
        ccclass
    ], node);
    return node;
}(cc.Component));
exports.default = node;

cc._RF.pop();