"use strict";
cc._RF.push(module, 'c8e4ewfcf5IKaVL9x2zvqxk', 'PersonalPanel');
// Script/Hall/PlayerCenter/PersonalPanel.ts

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
var List_1 = require("../../Common/List");
var UserControl_1 = require("../../Controller/UserControl");
var VipControl_1 = require("../../Controller/VipControl");
var UiForms_1 = require("../../Tool/UiForms");
var uiEvent_1 = require("../../Config/uiEvent");
var OnFire_1 = require("../../Net/OnFire");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PersonalPanel = /** @class */ (function (_super) {
    __extends(PersonalPanel, _super);
    function PersonalPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = null;
        // LIFE-CYCLE CALLBACKS:
        _this.headAtlas = null;
        _this.btnLeft = null;
        _this.btnRight = null;
        _this.btnAlterName = null;
        _this.btnUpdateBalance = null;
        _this.head = null;
        _this.vipImage = null;
        _this.progressBar = null;
        _this.labelCurrentVipLv = null;
        _this.labelNextVipLv = null;
        _this.vipExp = null;
        _this.labelID0 = null;
        _this.labelName0 = null;
        _this.labelIntegral0 = null;
        _this.labelBalance0 = null;
        _this.labelMembership = null;
        _this.myEditbox = null;
        _this.curLabel = null;
        _this.uponeLevel = null;
        _this.nextLevel = null;
        _this.max = 9;
        _this.min = 0;
        _this.index = 0;
        return _this;
    }
    PersonalPanel.prototype.start = function () {
        OnFire_1.G_OnFire.on(uiEvent_1.EventRequest.VipUpdate, this.showInfo.bind(this));
    };
    PersonalPanel.prototype.onLoad = function () {
        if (VipControl_1.G_VipControl.getVipConfig().data == null) {
            VipControl_1.G_VipControl.requesVipData();
        }
        // G_OnFire.on(uiEventFunction.rename_event,this.renameCallback.bind(this))
        this.btnAlterName.on(cc.Node.EventType.TOUCH_START, this.onXiuGaiMingZi.bind(this));
        this.btnUpdateBalance.on(cc.Node.EventType.TOUCH_START, this.onShuaXin.bind(this));
        this.btnLeft.on(cc.Node.EventType.TOUCH_END, this.onBtnEvent, this);
        this.btnRight.on(cc.Node.EventType.TOUCH_END, this.onBtnEvent, this);
        this.uponeLevel = this.btnLeft.getChildByName("text");
        this.nextLevel = this.btnRight.getChildByName("text");
        this.list.numItems = this.max;
        this.uponeLevel.getComponent(cc.Label).string = "VIP" + UserControl_1.G_UserControl.getUser().userVipLevel;
        this.nextLevel.getComponent(cc.Label).string = "VIP" + (UserControl_1.G_UserControl.getUser().userVipLevel + 1);
        this.btnLeft.active = UserControl_1.G_UserControl.getUser().userVipLevel > 0;
        this.btnRight.active = UserControl_1.G_UserControl.getUser().userVipLevel + 1 < this.max;
        var classMyEditbox = this.myEditbox.getComponent("MyEditbox");
        classMyEditbox.onDidEndedCallback = function (target) {
            var strName = this.myEditbox.getComponent("MyEditbox").getEdiboxComponent().string;
            this.labelName0.getComponent(cc.Label).string = strName;
            this.labelName0.active = true;
            this.myEditbox.active = false;
        }.bind(this);
        // onDidEndedCallback
        this.list.skipPage(UserControl_1.G_UserControl.getUser().userVipLevel, .1);
        this.labelName0.active = true;
        this.myEditbox.active = false;
    };
    PersonalPanel.prototype.onEnable = function () {
        if (VipControl_1.G_VipControl.getVipConfig().data) {
            this.showInfo();
        }
        // this.labelMembership.getComponent(cc.Label).string =G_Language.get("Membership")
        // this.labelMembership.getComponent(cc.Label).string = this.getVIPMembership(G_UserControl.getUser().userVipLevel)
    };
    PersonalPanel.prototype.showInfo = function () {
        //头像
        var spriteFrame = this.headAtlas.getSpriteFrame("touxiang" + 3);
        this.head.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        console.log('G_VipControl.getVipConfig()  ' + VipControl_1.G_VipControl.getVipConfig().data + "  G_UserControl.getUser().userVipLevel " + UserControl_1.G_UserControl.getUser().userVipLevel);
        this.progressBar.getComponent(cc.ProgressBar).progress = UserControl_1.G_UserControl.getUser().exp / VipControl_1.G_VipControl.getVipConfig().data[UserControl_1.G_UserControl.getUser().userVipLevel]["experience_max"];
        this.vipExp.getComponent(cc.Label).string = Math.floor(UserControl_1.G_UserControl.getUser().exp) + "/" + Math.floor(VipControl_1.G_VipControl.getVipConfig().data[UserControl_1.G_UserControl.getUser().userVipLevel]["experience_max"]);
        this.labelCurrentVipLv.getComponent(cc.Label).string = "VIP" + UserControl_1.G_UserControl.getUser().userVipLevel;
        var addLv = UserControl_1.G_UserControl.getUser().userVipLevel + 1;
        var nextLv = addLv > this.max ? this.max : addLv;
        this.labelNextVipLv.getComponent(cc.Label).string = "VIP" + nextLv;
        this.labelID0.getComponent(cc.Label).string = UserControl_1.G_UserControl.getUser().uid.toString();
        this.labelName0.getComponent(cc.Label).string = UserControl_1.G_UserControl.getUser().userName;
        this.labelIntegral0.getComponent(cc.Label).string = UserControl_1.G_UserControl.getUser().score.toString();
        this.labelBalance0.getComponent(cc.Label).string = (Math.floor(UserControl_1.G_UserControl.getUser().balance * 10) / 10).toString();
        this.labelMembership.getComponent(cc.Label).string = "VIP" + this.index.toString();
    };
    PersonalPanel.prototype.onListRender = function (item, idx) {
        if (idx <= 0) {
            item.active = false;
        }
        else {
            item.active = true;
            item.children.forEach(function (tt, index) {
                var goldeNode = tt.getChildByName("goldeNode");
                var gold = goldeNode.getChildByName("labGold");
                var btn = tt.getChildByName("btn");
                var box = tt.getChildByName("doNot");
                btn.active = (index <= 1) && idx == UserControl_1.G_UserControl.getUser().userVipLevel;
                box.active = !((index <= 1) && idx == UserControl_1.G_UserControl.getUser().userVipLevel);
                var data = VipControl_1.G_VipControl.getVipConfig().data[idx - 1];
                var mvalue = '';
                if (index == 0) {
                    mvalue = (Math.floor(data["grade_gift"] * 10) / 10).toString();
                }
                else if (index == 1) {
                    mvalue = (Math.floor(data["week_gift"] * 10) / 10).toString();
                }
                else if (index == 2) {
                    mvalue = "1";
                }
                else if (index == 3) {
                    mvalue = "1";
                }
                if (index == 0) //晋级奖金
                 {
                    btn.active = UserControl_1.G_UserControl.getUser().vippromotion == 1;
                }
                if (index == 1) //每周奖励
                 {
                    btn.active = UserControl_1.G_UserControl.getUser().vipweekly == 1;
                }
                // console.log('mvalue   '+mvalue+"  index  "+index + "tt  "+tt.name);
                gold.getComponent(cc.Label).string = mvalue;
            }, this);
        }
    };
    PersonalPanel.prototype.onListPageChange = function (pageNum) {
        cc.log('当前是第' + pageNum + '页');
        this.index = pageNum;
        this.uponeLevel.getComponent(cc.Label).string = pageNum - 1 >= 0 ? "VIP" + (pageNum - 1) : "";
        this.nextLevel.getComponent(cc.Label).string = "VIP" + (pageNum + 1);
        this.curLabel.getComponent(cc.Label).string = "VIP" + pageNum;
        this.btnLeft.active = pageNum > 0;
        this.btnRight.active = pageNum + 1 < this.max;
        // this.labelMembership.getComponent(cc.Label).string = this.getVIPMembership(pageNum)
    };
    PersonalPanel.prototype.onBtnEvent = function (event) {
        var name = event.target.name;
        switch (name) {
            case 'btnLeft':
                this.list.prePage(.5);
                break;
            case 'btnRight':
                this.list.nextPage(.5);
                break;
            // case 'btn3':
            //     t.list.skipPage(parseInt(t.input.string), .5);
            //     break;
        }
    };
    ///------------------------
    PersonalPanel.prototype.onXiuGaiMingZi = function () {
        // console.log("修改昵称")
        this.labelName0.active = !this.labelName0.active;
        this.myEditbox.active = !this.myEditbox.active;
        var strName = this.labelName0.getComponent(cc.Label).string;
        this.myEditbox.getComponent("MyEditbox").getEdiboxComponent().string = strName;
        if (strName == UserControl_1.G_UserControl.getUser().userName) {
            return;
        }
        console.log('strName   ' + strName);
        UserControl_1.G_UserControl.requesPlayerChange(strName, UserControl_1.G_UserControl.getUser().usePic, function (ret) {
            if (ret.status) {
                UiForms_1.G_UiForms.hint(Language_1.G_Language.get("nameChangeSuccess"));
                this.myEditbox.getComponent("MyEditbox").getEdiboxComponent().string = strName;
            }
            else {
                UiForms_1.G_UiForms.hint(ret.message);
            }
        }.bind(this));
    };
    PersonalPanel.prototype.onShuaXin = function () {
        var _this = this;
        if (!this.btnUpdateBalance.getComponent(cc.Button).interactable) {
            return;
        }
        this.btnUpdateBalance.getComponent(cc.Button).interactable = false;
        console.log("刷新金额");
        var tt = cc.repeatForever(cc.rotateBy(0.3, 360));
        this.btnUpdateBalance.runAction(tt);
        UserControl_1.G_UserControl.sendspecialPlayerData(function () {
            _this.scheduleOnce(function () {
                this.btnUpdateBalance.stopAction(tt);
                this.btnUpdateBalance.getComponent(cc.Button).interactable = true;
            }.bind(_this), 0.3);
        });
    };
    PersonalPanel.prototype.onvippromotionClick = function () {
        var _this = this;
        console.log("this.index  " + this.index + " G_UserControl.getUser().userVipLevel  " + UserControl_1.G_UserControl.getUser().userVipLevel + "G_UserControl.getUser().vippromotion " + UserControl_1.G_UserControl.getUser().vippromotion);
        if (this.index != UserControl_1.G_UserControl.getUser().userVipLevel) { //VIP等级不符
            return;
        }
        if (UserControl_1.G_UserControl.getUser().vippromotion <= 0) { //已领取过
            return;
        }
        VipControl_1.G_VipControl.requesVipPromotion(function (ret) {
            if (ret.status) {
                UiForms_1.G_UiForms.hint(Language_1.G_Language.get("getsucceed"));
                _this.showInfo();
            }
        });
    };
    PersonalPanel.prototype.onvipweeklyClick = function () {
        var _this = this;
        if (this.index != UserControl_1.G_UserControl.getUser().userVipLevel) { //VIP等级不符
            return;
        }
        if (UserControl_1.G_UserControl.getUser().vipweekly <= 0) { //已领取过
            return;
        }
        VipControl_1.G_VipControl.requesVipWeekLy(function (ret) {
            if (ret.status) {
                UiForms_1.G_UiForms.hint(Language_1.G_Language.get("getsucceed"));
                _this.showInfo();
            }
        });
    };
    PersonalPanel.prototype.calculateAngle = function (first, second) {
        var len_y = second.y - first.y;
        var len_x = second.x - first.x;
        var tan_yx = Math.abs(len_y / len_x);
        var temp = Math.atan(tan_yx) * 180 / Math.PI;
        var angle = 0;
        if (len_y > 0 && len_x < 0) {
            angle = temp - 90;
        }
        else if (len_y > 0 && len_x > 0) {
            angle = -temp + 90;
        }
        else if (len_y < 0 && len_x < 0) {
            angle = -temp - 90;
        }
        else if (len_y < 0 && len_x > 0) {
            angle = temp + 90;
        }
        else if (len_y == 0 && len_x != 0) {
            angle = len_x < 0 ? -90 : 90;
        }
        else if (len_x == 0 && len_y != 0) {
            angle = len_y < 0 ? 180 : 0;
        }
        console.log('Temp', temp);
        console.log('Angle ', angle);
        return angle;
    };
    PersonalPanel.prototype.renameCallback = function (text) {
        //修改名字
        // var labelNiCheng = this._top.getChildByName("labelNiCheng");
        // labelNiCheng.getComponent(cc.Label).string =  text;
    };
    PersonalPanel.prototype.getVIPMembership = function (index) {
        return UserControl_1.G_UserControl.getUser().userVipLevel == index ? Language_1.G_Language.get("currMembership") : Language_1.G_Language.get("Membership");
    };
    PersonalPanel.prototype.onDestroy = function () {
        OnFire_1.G_OnFire.off(uiEvent_1.EventRequest.VipUpdate, this.showInfo.bind(this));
    };
    __decorate([
        property(List_1.default)
    ], PersonalPanel.prototype, "list", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], PersonalPanel.prototype, "headAtlas", void 0);
    __decorate([
        property(cc.Node)
    ], PersonalPanel.prototype, "btnLeft", void 0);
    __decorate([
        property(cc.Node)
    ], PersonalPanel.prototype, "btnRight", void 0);
    __decorate([
        property(cc.Node)
    ], PersonalPanel.prototype, "btnAlterName", void 0);
    __decorate([
        property(cc.Node)
    ], PersonalPanel.prototype, "btnUpdateBalance", void 0);
    __decorate([
        property(cc.Node)
    ], PersonalPanel.prototype, "head", void 0);
    __decorate([
        property(cc.Node)
    ], PersonalPanel.prototype, "vipImage", void 0);
    __decorate([
        property(cc.Node)
    ], PersonalPanel.prototype, "progressBar", void 0);
    __decorate([
        property(cc.Node)
    ], PersonalPanel.prototype, "labelCurrentVipLv", void 0);
    __decorate([
        property(cc.Node)
    ], PersonalPanel.prototype, "labelNextVipLv", void 0);
    __decorate([
        property(cc.Node)
    ], PersonalPanel.prototype, "vipExp", void 0);
    __decorate([
        property(cc.Node)
    ], PersonalPanel.prototype, "labelID0", void 0);
    __decorate([
        property(cc.Node)
    ], PersonalPanel.prototype, "labelName0", void 0);
    __decorate([
        property(cc.Node)
    ], PersonalPanel.prototype, "labelIntegral0", void 0);
    __decorate([
        property(cc.Node)
    ], PersonalPanel.prototype, "labelBalance0", void 0);
    __decorate([
        property(cc.Node)
    ], PersonalPanel.prototype, "labelMembership", void 0);
    __decorate([
        property(cc.Node)
    ], PersonalPanel.prototype, "myEditbox", void 0);
    __decorate([
        property(cc.Node)
    ], PersonalPanel.prototype, "curLabel", void 0);
    PersonalPanel = __decorate([
        ccclass
    ], PersonalPanel);
    return PersonalPanel;
}(cc.Component));
exports.default = PersonalPanel;

cc._RF.pop();