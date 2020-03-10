"use strict";
cc._RF.push(module, 'c3225OYcuxEgZ77CeKMERJX', 'RankNode');
// Script/Hall/RankNode.ts

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
var ListViewCommon_1 = require("../Common/ListViewCommon");
var RankItem_1 = require("./RankItem");
var Language_1 = require("../Language/Language");
var HttpHelper_1 = require("../Net/HttpHelper");
var UserControl_1 = require("../Controller/UserControl");
var RequestConfig_1 = require("../Config/RequestConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankNode = /** @class */ (function (_super) {
    __extends(RankNode, _super);
    function RankNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.titleLabel = null;
        _this.myTextLabel = null;
        _this.viewNode = null;
        _this.viewOne = null;
        _this.viewTwo = null;
        _this.contain = null;
        _this.tabSelectOne = null;
        _this.tabSelectTwo = null;
        _this.btnSprite1 = null;
        _this.btnSprite2 = null;
        _this.btnEffect = null;
        _this.tabBtn1 = null;
        _this.tabBtn2 = null;
        _this.listOne = [];
        _this.listTwo = [];
        //是否展开
        _this.isOpen = false;
        _this.index = 1; //1.盈利榜  2.富豪榜
        _this.myRankOne = 0; //我的盈利榜rank
        _this.myRankTwo = 0; //我的富豪榜rank
        return _this;
        // update (dt) {}
    }
    RankNode.prototype.onEnable = function () {
        /*
        this.scheduleOnce(()=>{
            this.showInfo();
        },3);
        */
    };
    RankNode.prototype.onShowClick = function (event) {
        /*
        if(!G_UserControl.isLogin()){
            G_UiForms.hint(G_Language.get("PleaseLogInFirst"))
            G_UiForms.show(uiEventModules.landingNode);
            return;
        }*/
        if (this.isOpen) {
            this.isOpen = false;
            var action = cc.moveTo(0.4, cc.v2(-400, -7));
            this.contain.runAction(action);
            this.scheduleOnce(function () {
                this.btnEffect.active = false;
                this.btnEffect.active = true;
            }.bind(this), 0.4);
            this.scheduleOnce(function () {
                this.btnSprite1.active = true;
                this.btnSprite2.active = false;
            }.bind(this), 0.8);
        }
        else {
            this.showInfo();
            this.isOpen = true;
            var action = cc.moveTo(0.4, cc.v2(0, -7));
            this.contain.runAction(action);
            this.tabBtnEffect();
            this.viewNodeEffect();
            this.scheduleOnce(function () {
                this.btnEffect.active = false;
                this.btnEffect.active = true;
            }.bind(this), 0.4);
            this.scheduleOnce(function () {
                this.btnSprite1.active = false;
                this.btnSprite2.active = true;
            }.bind(this), 0.8);
        }
    };
    RankNode.prototype.tabBtnEffect = function () {
        var scale1 = cc.scaleTo(0.1, 0.9, 0.9);
        var scale2 = cc.scaleTo(0.1, 1.1, 1.1);
        var scale3 = cc.scaleTo(0.1, 1, 1);
        this.tabBtn1.runAction(cc.sequence(cc.delayTime(0.35), scale1, scale2, scale3));
        var scale4 = cc.scaleTo(0.1, 0.9, 0.9);
        var scale5 = cc.scaleTo(0.1, 1.1, 1.1);
        var scale6 = cc.scaleTo(0.1, 1, 1);
        this.tabBtn2.runAction(cc.sequence(cc.delayTime(0.5), scale4, scale5, scale6));
    };
    RankNode.prototype.viewNodeEffect = function () {
        var alpha1 = cc.fadeOut(0);
        var alpha2 = cc.fadeTo(0.5, 255);
        this.viewNode.runAction(cc.sequence(alpha1, cc.delayTime(0.4), alpha2));
    };
    RankNode.prototype.showInfo = function () {
        if (this.index == 1) {
            this.viewOne.active = true;
            this.viewTwo.active = false;
            this.tabSelectOne.active = true;
            this.tabSelectTwo.active = false;
            this.titleLabel.string = Language_1.G_Language.get("rank_title1");
            if (this.listOne.length <= 0) {
                HttpHelper_1.G_HttpHelper.httpPost(RequestConfig_1.RequestEnum.Profit, null, function (data) {
                    if (data.status) {
                        console.log(data.data.length);
                        this.viewOne.getComponent(ListViewCommon_1.default).init(data.data.length, 35, function (index, itemPrefab) {
                            var itemTs = itemPrefab.getComponent(RankItem_1.default);
                            this.listOne[index] = itemTs;
                            itemTs.init(index + 1, data.data[index]);
                            //console.log("data.data.guid   "+data.data[index] + "  "+ G_UserControl.getUser().uid)
                            if (data.data[index].guid == UserControl_1.G_UserControl.getUser().uid) {
                                this.myRankOne = index + 1;
                                if (this.myRankOne <= 100) {
                                    this.myTextLabel.string = "你当前排名为第" + this.myRankOne + "名";
                                }
                                else {
                                    this.myTextLabel.string = "未上榜";
                                }
                            }
                        }.bind(this));
                    }
                }.bind(this));
            }
            else {
                if (this.myRankOne <= 100) {
                    this.myTextLabel.string = "你当前排名为第" + this.myRankOne + "名";
                }
                else {
                    this.myTextLabel.string = "未上榜";
                }
            }
        }
        else {
            this.viewOne.active = false;
            this.viewTwo.active = true;
            this.tabSelectOne.active = false;
            this.tabSelectTwo.active = true;
            this.titleLabel.string = Language_1.G_Language.get("rank_title2");
            if (this.listTwo.length <= 0) {
                HttpHelper_1.G_HttpHelper.httpGet(RequestConfig_1.RequestEnum.Rich, function (data) {
                    if (data.status) {
                        this.viewTwo.getComponent(ListViewCommon_1.default).init(data.data.length, 35, function (index, itemPrefab) {
                            var itemTs = itemPrefab.getComponent(RankItem_1.default);
                            this.listTwo[index] = itemTs;
                            itemTs.init(index + 1, data.data[index]);
                            if (data.data[index].guid == UserControl_1.G_UserControl.getUser().uid) {
                                this.myRankTwo = index + 1;
                                if (this.myRankTwo <= 100) {
                                    this.myTextLabel.string = "你当前排名为第" + this.myRankTwo + "名";
                                }
                                else {
                                    this.myTextLabel.string = "未上榜";
                                }
                            }
                        }.bind(this));
                    }
                }.bind(this));
            }
            else {
                if (this.myRankTwo <= 100) {
                    this.myTextLabel.string = "你当前排名为第" + this.myRankTwo + "名";
                }
                else {
                    this.myTextLabel.string = "未上榜";
                }
            }
        }
    };
    RankNode.prototype.tabCLickOne = function (target) {
        this.index = 1;
        this.showInfo();
    };
    RankNode.prototype.tabClickTwo = function () {
        this.index = 2;
        this.showInfo();
    };
    __decorate([
        property(cc.Label)
    ], RankNode.prototype, "titleLabel", void 0);
    __decorate([
        property(cc.Label)
    ], RankNode.prototype, "myTextLabel", void 0);
    __decorate([
        property(cc.Node)
    ], RankNode.prototype, "viewNode", void 0);
    __decorate([
        property(cc.Node)
    ], RankNode.prototype, "viewOne", void 0);
    __decorate([
        property(cc.Node)
    ], RankNode.prototype, "viewTwo", void 0);
    __decorate([
        property(cc.Node)
    ], RankNode.prototype, "contain", void 0);
    __decorate([
        property(cc.Node)
    ], RankNode.prototype, "tabSelectOne", void 0);
    __decorate([
        property(cc.Node)
    ], RankNode.prototype, "tabSelectTwo", void 0);
    __decorate([
        property(cc.Node)
    ], RankNode.prototype, "btnSprite1", void 0);
    __decorate([
        property(cc.Node)
    ], RankNode.prototype, "btnSprite2", void 0);
    __decorate([
        property(cc.Node)
    ], RankNode.prototype, "btnEffect", void 0);
    __decorate([
        property(cc.Node)
    ], RankNode.prototype, "tabBtn1", void 0);
    __decorate([
        property(cc.Node)
    ], RankNode.prototype, "tabBtn2", void 0);
    RankNode = __decorate([
        ccclass
    ], RankNode);
    return RankNode;
}(cc.Component));
exports.default = RankNode;

cc._RF.pop();