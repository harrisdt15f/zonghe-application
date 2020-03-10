"use strict";
cc._RF.push(module, 'ca5bfuGsY1MCYsc1qyEx4Zm', 'MyEditbox');
// Script/Common/MyEditbox.ts

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
var MyEditbox = /** @class */ (function (_super) {
    __extends(MyEditbox, _super);
    function MyEditbox() {
        // this.myEditBox.node.getChildByName("TEXT_LABEL").getComponent(cc.Label).string
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**输入的文字 */
        _this.text = null;
        _this.myEditBox = null;
        _this.onDidBeganCallback = null;
        _this.onDidEndedCallback = null;
        _this.onTextChangedCallback = null;
        _this.onReturnCallback = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    MyEditbox.prototype.onLoad = function () {
        if (this.myEditBox) {
            this.myEditBox.node.on('editing-did-began', this.onEditboxDidBegan, this);
            this.myEditBox.node.on('editing-did-ended', this.onEditboxDidEnded, this);
            this.myEditBox.node.on('text-changed', this.onEditboxTextChanged, this);
            this.myEditBox.node.on('editing-return', this.onEditboxReturn, this);
        }
    };
    MyEditbox.prototype.start = function () {
    };
    MyEditbox.prototype.update = function (dt) {
        var str = this.getEdiboxComponent().string;
        if (str && this.text.node.active) {
            this.text.node.active = false;
        }
    };
    MyEditbox.prototype.onEditboxDidBegan = function (target) {
        console.log("[myEditbox Did Began]", target.string);
        this.text.node.active = false;
        if (this.onDidBeganCallback) {
            this.onDidBeganCallback(target);
        }
    };
    MyEditbox.prototype.onEditboxTextChanged = function (target) {
        console.log("[myEditbox Text Changed]", target.string);
        if (this.onTextChangedCallback) {
            this.onTextChangedCallback(target);
        }
    };
    MyEditbox.prototype.onEditboxDidEnded = function (target) {
        var strText = target.string;
        console.log("[myEditbox Did Ended]", strText, strText.length);
        this.text.node.active = !strText ? true : strText.length == 0;
        if (this.onDidEndedCallback) {
            this.onDidEndedCallback(target);
        }
    };
    MyEditbox.prototype.onEditboxReturn = function (target) {
        console.log("[myEditbox Return]", target.string);
        if (this.onReturnCallback) {
            this.onReturnCallback(target);
        }
    };
    MyEditbox.prototype.getEditbox = function () {
        return this.myEditBox;
    };
    MyEditbox.prototype.getEdiboxComponent = function () {
        return this.myEditBox.getComponent(cc.EditBox);
    };
    MyEditbox.prototype.getText = function () {
        return this.text;
    };
    MyEditbox.prototype.getTEXTLABEL = function () {
        return this.myEditBox.node.getChildByName("TEXT_LABEL");
    };
    __decorate([
        property(cc.Label)
    ], MyEditbox.prototype, "text", void 0);
    __decorate([
        property(cc.EditBox)
    ], MyEditbox.prototype, "myEditBox", void 0);
    MyEditbox = __decorate([
        ccclass
    ], MyEditbox);
    return MyEditbox;
}(cc.Component));
exports.default = MyEditbox;

cc._RF.pop();