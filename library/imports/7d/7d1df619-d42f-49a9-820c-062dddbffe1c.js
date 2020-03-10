"use strict";
cc._RF.push(module, '7d1dfYZ1C9JqYIMBi3dv/4c', 'UiForms');
// Script/Tool/UiForms.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uiEvent_1 = require("../Config/uiEvent");
var OnFire_1 = require("../Net/OnFire");
/**
 * 窗体
 */
var UiForms = /** @class */ (function () {
    function UiForms() {
        this._node = null;
        this._uiNode = null;
        this._tipsNode = null;
        this._webNode = null;
        this._showBox = null;
        this._tempBox = null;
        OnFire_1.G_OnFire.on(uiEvent_1.uiEventFunction.secondaryInterface, this.removeFromParent.bind(this));
    }
    UiForms.prototype.destroy = function () {
    };
    /**
     * 必须在常驻场景里初始
     * @param node tipsNode
     */
    UiForms.prototype.init = function (node) {
        this._node = node;
        this._uiNode = node.getChildByName("UiNode");
        this._tipsNode = node.getChildByName("TipsNode");
        this._webNode = node.getChildByName("WebNode");
    };
    /**
     * 展示与操作界面
     * 具体的功能模块
     * @param event 功能模块名称
     * @param style 窗体类型
     */
    UiForms.prototype.show = function (event, style) {
        if (!this._node)
            return;
        this._showBox = this._uiNode.getChildByName("ShowBox");
        if (this._showBox.active)
            this.creationForms();
        var formsComponent = this._showBox.getComponent("ShowBox");
        formsComponent.show(event, style);
    };
    //创建一个新窗体 进行二级页面展示
    UiForms.prototype.creationForms = function () {
        var uiForms = this._showBox;
        if (!uiForms)
            return;
        var priest = cc.instantiate(uiForms);
        priest.active = true;
        priest.parent = this._uiNode;
        this._tempBox = priest;
        this._showBox = priest;
    };
    UiForms.prototype.removeFromParent = function () {
        if (this._tempBox) {
            this._tempBox.removeFromParent();
            this._tempBox = null;
            this._showBox = null;
        }
    };
    UiForms.prototype.setSelectPanelShow = function (index) {
        if (this._showBox)
            this._showBox.getComponent("ShowBox").setSelectPanelShow(index);
    };
    UiForms.prototype.uiPickView = function () {
        var pick = this._tipsNode.getChildByName("UIPickerView");
        pick.active = true;
    };
    UiForms.prototype.hint = function (_text) {
        if (!this._tipsNode)
            return;
        var tips = this._tipsNode.getChildByName("TipsNode");
        var _tips = tips.getComponent("TipsNode");
        _tips.textString = _text;
    };
    UiForms.prototype.Web = function (url) {
        if (!this._webNode)
            return;
        this._webNode.active = true;
        var web = this._webNode.getComponent("WebNode");
        web.init(url);
    };
    UiForms.Instance = new UiForms();
    return UiForms;
}());
exports.G_UiForms = UiForms.Instance;

cc._RF.pop();