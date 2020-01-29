"use strict";
cc._RF.push(module, '400bexP/FBHQ7AKDmHLynSd', 'CircuitPanel');
// Script/Hall/SetUI/CircuitPanel.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CircuitPanel = /** @class */ (function (_super) {
    __extends(CircuitPanel, _super);
    function CircuitPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    CircuitPanel.prototype.onLoad = function () {
        var formNode = this.node.getChildByName("formNode");
        for (var index = 1; index <= formNode.children.length; index++) {
            var box = formNode.getChildByName("sprCircuitBox_" + index);
            box.on(cc.Node.EventType.TOUCH_END, this.onSelectLine.bind(this));
        }
        this.setToggle(1);
    };
    CircuitPanel.prototype.start = function () {
    };
    // update (dt) {}
    CircuitPanel.prototype.onSelectLine = function (event) {
        var str = event.target.name;
        var strList = str.split("_");
        this.setToggle(strList[1]);
    };
    CircuitPanel.prototype.setToggle = function (key) {
        var formNode = this.node.getChildByName("formNode");
        for (var index = 1; index <= formNode.children.length; index++) {
            var sound = formNode.getChildByName("sprCircuitBox_" + index);
            var checkmark_1 = sound.getChildByName("checkmark");
            checkmark_1.active = false;
        }
        var sound2 = formNode.getChildByName("sprCircuitBox_" + key);
        var checkmark = sound2.getChildByName("checkmark");
        checkmark.active = !checkmark.active;
    };
    CircuitPanel = __decorate([
        ccclass
    ], CircuitPanel);
    return CircuitPanel;
}(cc.Component));
exports.default = CircuitPanel;

cc._RF.pop();