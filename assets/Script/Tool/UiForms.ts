

import {uiEventFunction} from "../Config/uiEvent"
import  {G_OnFire}  from "../Net/OnFire";

/**
 * 窗体
 */
class UiForms{
    public static readonly Instance : UiForms = new UiForms();

    private _node : cc.Node = null;
    private _uiNode :　cc.Node = null;
    private _tipsNode : cc.Node = null;

    private _showBox : cc.Node = null;
    private _tempBox : cc.Node = null;

    constructor(){
        G_OnFire.on(uiEventFunction.secondaryInterface,this.removeFromParent.bind(this));
    }

    destroy(){
    }
    /**
     * 必须在常驻场景里初始
     * @param node tipsNode
     */
    init(node : cc.Node){
        this._node = node
        this._uiNode = node.getChildByName("UiNode")
        this._tipsNode = node.getChildByName("TipsNode")
    }

    /**
     * 展示与操作界面
     * 具体的功能模块
     * @param event 功能模块名称
     * @param style 窗体类型 
     */
    show(event : string, style? : number){
        if(!this._node)
            return;
        this._showBox = this._uiNode.getChildByName("ShowBox")
        if(this._showBox.active)
            this.creationForms()

        var formsComponent = this._showBox.getComponent("ShowBox")
        formsComponent.show(event, style);
    }

    //创建一个新窗体 进行二级页面展示
    creationForms(){
        var uiForms = this._showBox;
        if(!uiForms)
            return;

        var priest = cc.instantiate(uiForms);
        priest.active = true;
        priest.parent = this._uiNode;
        this._tempBox = priest;
        this._showBox = priest;
    }

    private removeFromParent(){
        if (this._tempBox){
            this._tempBox.removeFromParent();
            this._tempBox = null;
            this._showBox = null;
        }
    }

    setSelectPanelShow(index){
        if(this._showBox)
            this._showBox.getComponent("ShowBox").setSelectPanelShow(index)
    }

    uiPickView(){
        let pick : cc.Node = this._tipsNode.getChildByName("UIPickerView")
        pick.active = true;
    }
 
    hint(_text : string){
        if(!this._tipsNode)
            return;
            
        let tips : cc.Node = this._tipsNode.getChildByName("TipsNode")
        let _tips = tips.getComponent("TipsNode")
        _tips.textString = _text
    }
}

export const G_UiForms = UiForms.Instance;


