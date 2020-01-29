"use strict";
cc._RF.push(module, '61597ZbfapD5aVU1oWgd9zr', 'AlterNameNode');
// Script/Hall/PlayerCenter/AlterNameNode.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AlterNameNode = /** @class */ (function (_super) {
    __extends(AlterNameNode, _super);
    function AlterNameNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    AlterNameNode.prototype.onLoad = function () {
        var btnNO = this.node.getChildByName("btnNO");
        var myEditboxName = this.node.getChildByName("myEditboxName");
        var classEdithbox = myEditboxName.getComponent("MyEditbox");
        classEdithbox.onDidEndedCallback = function (target) {
            console.log("输入结束》》");
        };
        classEdithbox.onTextChangedCallback = function (target) {
            console.log("录入》》");
            this.name = target.string;
        }.bind(this);
        var btnOK = this.node.getChildByName("btnOK");
        btnNO.on(cc.Node.EventType.TOUCH_END, this.onCilck, this);
        btnOK.on(cc.Node.EventType.TOUCH_END, this.onCilck, this);
    };
    AlterNameNode.prototype.start = function () {
    };
    // update (dt) {}
    AlterNameNode.prototype.onCilck = function (event) {
        var btnName = event.target.name;
        if (btnName === "btnOK") {
            // G_OnFire.fire(uiEventFunction.rename_event,this.name)
        }
        OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.secondaryInterface);
    };
    AlterNameNode = __decorate([
        ccclass
    ], AlterNameNode);
    return AlterNameNode;
}(cc.Component));
exports.default = AlterNameNode;

cc._RF.pop();