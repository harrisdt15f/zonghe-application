

import {G_Utils} from "../Tool/Utils"
//聊天面板
const {ccclass, property} = cc._decorator;

@ccclass
export default class HallLiaotianNode extends cc.Component {
    // onLoad () {}

    @property(cc.Sprite)
    sprGx : cc.Sprite = null;
    @property(cc.EditBox)
    editboxLiaotian : cc.EditBox = null;
    @property(cc.Sprite)
    btnSend : cc.Sprite = null;

    // @property(cc.Sprite)
    // vip : cc.Sprite = null;

    @property(cc.Label)
    labelInfo : cc.Label = null;

    @property(cc.SpriteAtlas)
    headAtlas : cc.SpriteAtlas = null;
    

    private strInfo = null;//输入框的内容

    private flagUn = false;
    private bg = null;
    private userPanel = null;
    private unfoldPanel = null;
    private timeDt = 0;
    private _ds = null;
    private _fh = null;
    private _xialajiant = null;
    private _content = null;
    private _userPanel = null;

    start () {
        let sq = cc.sequence(cc.fadeOut(2), cc.fadeIn(2))
        this.sprGx.node.runAction( cc.repeatForever(sq.easing(cc.easeInOut(2.0))))


        this.editboxLiaotian.node.on('editing-did-began', this.callbackEditingDidBegan, this);
        this.editboxLiaotian.node.on('text-changed', this.callbackTextChanged, this);

        this._xialajiant = this.node.getChildByName("xialajiant")
        this._xialajiant.x = 132;
        this._xialajiant.y = 139;
        this._xialajiant.on(cc.Node.EventType.TOUCH_END, this.onUnfold.bind(this));
        let m1 = cc.moveBy(1,cc.v2(0,10))
        let m2 = cc.moveBy(1,cc.v2(0,-10))
        let a2 = cc.sequence(m1, m2)
        this._xialajiant.runAction( cc.repeatForever( a2 ) )

        this.bg = this.node.getChildByName("bg");
        this.userPanel = this.node.getChildByName("userPanel");
        this.unfoldPanel = this.node.getChildByName("unfoldPanel");
        let panel = this.unfoldPanel.getChildByName("panel");
        let btnLeft = panel.getChildByName("btnLeft");
        let btnRight = panel.getChildByName("btnRight");
        let btnClose = panel.getChildByName("btnClose");
        btnClose.x = 140;
        btnClose.y = 116;
        btnClose.runAction( cc.repeatForever( a2 ) )

        btnLeft.on(cc.Node.EventType.TOUCH_END, this.onDirection.bind(this));
        btnRight.on(cc.Node.EventType.TOUCH_END, this.onDirection.bind(this));
        btnClose.on(cc.Node.EventType.TOUCH_END, this.onUnfoldClose.bind(this));

        let titleBox = panel.getChildByName("titleBox");
        this._ds = titleBox.getChildByName("jrdsb");//赌神
        this._fh = titleBox.getChildByName("jrfhb");//富豪  
        this._ds.active = true;
        this._fh.active = false;

        let strTemp = G_Utils.getPhoneNumberStar("12345678901");
        let LayoutList = panel.getChildByName("LayoutList");
        for (let index = 0; index < LayoutList.children.length ; index++) {
            let _node = LayoutList.children[index];
            _node.getChildByName("labShouJi").getComponent(cc.Label).string = strTemp;
            _node.getChildByName("labJinBi").getComponent(cc.Label).string = 0;
        }
        

        var scrollviewLT = this.unfoldPanel.getChildByName("scrollviewLT");
        var view = scrollviewLT.getChildByName("view");
        this._content = view.getChildByName("content");
        this._userPanel = this._content.getChildByName("userPanel");
        this._content.removeAllChildren()

        this.setUserPanel()

    }

    // update (dt) {

    // }

    callbackEditingDidBegan(){
        console.log("做了什么")
    }


    callbackTextChanged(event){
        // console.log("有什么信息》》",event)
        this.strInfo = event.string;
    }

    onSendCallBack(){
        this.labelInfo.string = this.strInfo
        this.editboxLiaotian.string = "";
    }


    onUnfold(event){
        console.log("展开")
        this.flagUn = true;
        this.bg.height = 390;
        this.userPanel.active = false;
        this.unfoldPanel.active = true;
        this._xialajiant.active = false;
    }

    onUnfoldClose(event){
        this.bg.height = 120;
        this.userPanel.active = true;
        this.unfoldPanel.active = false;
        this._xialajiant.active = true;
    }

    onDirection(event){
        if (event.target.name === "btnLeft"){

        }else if(event.target.name === "btnRight"){

        }
        this._ds.active = !this._ds.active;
        this._fh.active = !this._fh.active;
 
    }


    setUserPanel(){
        for (let index = 0; index < 10; index++) {
            let piece = cc.instantiate(this._userPanel)
            piece.parent = this._content;
            // var vip = piece.getChildByName("vip");
            // vip.getComponent(cc.Sprite).spriteFrame = this.headAtlas.getSpriteFrame("vip"+index);

            var labelInfo = piece.getChildByName("labelInfo");
            
            var head = piece.getChildByName("head");
            var head1 = head.getChildByName("head1");
            head1.getComponent(cc.Sprite).spriteFrame = this.headAtlas.getSpriteFrame("touxiang"+(index+1))
            
        }
    }

}
