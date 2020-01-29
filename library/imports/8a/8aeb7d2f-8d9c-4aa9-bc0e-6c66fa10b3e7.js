"use strict";
cc._RF.push(module, '8aeb70vjZxKqbwObGb6ELPn', 'HallBottomNode');
// Script/Hall/HallBottomNode.ts

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
var uiEvent_1 = require("../Config/uiEvent");
var UiForms_1 = require("../Tool/UiForms");
var UserControl_1 = require("../Controller/UserControl");
var Utils_1 = require("../Tool/Utils");
var Language_1 = require("../Language/Language");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HallBottomNode = /** @class */ (function (_super) {
    __extends(HallBottomNode, _super);
    function HallBottomNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HallBottomNode.prototype.onLoad = function () {
        var _this = this;
        var tempData = Object.keys(uiEvent_1.uiEventModules);
        this.node.children.forEach(function (item, idx) {
            item.name = tempData[idx + 1]; //不需要取第一个
            Utils_1.G_Utils.onClickEnd(item, _this.onClick, _this);
        });
    };
    HallBottomNode.prototype.start = function () {
    };
    // update (dt) {}
    HallBottomNode.prototype.onClick = function (event) {
        var eventName = event.target.name;
        console.log("eventName  " + eventName);
        var exclude = (eventName === "activityNode" || eventName === "serviceNode");
        var flag = UserControl_1.G_UserControl.isLogin();
        var formsName = exclude ? eventName : (flag ? eventName : uiEvent_1.uiEventModules.landingNode);
        if (!flag)
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("PleaseLogInFirst"));
        console.log("formsName  " + formsName);
        UiForms_1.G_UiForms.show(formsName);
    };
    HallBottomNode = __decorate([
        ccclass
    ], HallBottomNode);
    return HallBottomNode;
}(cc.Component));
exports.default = HallBottomNode;

cc._RF.pop();