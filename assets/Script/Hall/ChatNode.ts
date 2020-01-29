

import {G_Utils} from "../Tool/Utils"
//聊天面板
const {ccclass, property} = cc._decorator;

@ccclass
export default class ChatNode extends cc.Component {

    //收起后显示的 obj
    @property(cc.Node)
    unopenObj:cc.Node = null
    @property(cc.Node)
    xialajiant : cc.Node = null;
    @property(cc.Node)
    hideBtn:cc.Node = null;

    //展开后显示的obj
    @property(cc.Node)
    openObj:cc.Node = null;
    @property(cc.Node)
    openBtn:cc.Node = null;
    @property(cc.Node)
    chatBack:cc.Node = null;
    @property(cc.Node)
    chatTop:cc.Node = null;
    @property(cc.Node)
    chatView:cc.Node = null;
    @property(cc.Node)
    inputBox:cc.Node = null;

    @property(cc.Node)
    lastPic:cc.Node = null;
    @property(cc.Label)
    lastNameLabel:cc.Label = null;
    @property(cc.Label)
    lastDescLabel:cc.Label = null;

    private chatMsgList = []  //聊天信息

    start () {
        this.xialajiant.x = 326;
        this.xialajiant.y = -5;
        let m1 = cc.moveBy(1,cc.v2(0,10))
        let m2 = cc.moveBy(1,cc.v2(0,-10))
        let a2 = cc.sequence(m1, m2)
        this.xialajiant.runAction( cc.repeatForever( a2 ) )
      }

      onOpenClick(){
        this.unopenObj.active =false;
        this.openObj.active = true;       
        this.chatBack.scaleX = 1;
        this.chatBack.scaleY = 0;
        this.chatView.scale = 0;
        this.chatView.runAction(cc.fadeOut(0));
        this.chatTop.y = 45;
        this.chatBack.runAction(cc.sequence(cc.delayTime(0.3),cc.scaleTo(0.3,1,1)));
        this.chatTop.runAction(cc.sequence(cc.delayTime(0.3),cc.moveTo(0.3,cc.v2(0,452))));
        this.chatView.runAction(cc.sequence(cc.delayTime(0.6),cc.scaleTo(0.2,1,1)));
        this.chatView.runAction(cc.sequence(cc.delayTime(0.6),cc.fadeTo(0.2,255)));
        this.showChatInfo();
      }

      onHideClick()
      {
        this.chatBack.runAction(cc.scaleTo(0.3,1,0));
        this.chatTop.runAction(cc.moveTo(0.3,cc.v2(0,45)));
        this.chatView.runAction(cc.fadeOut(0));
        //this.chatView.runAction(cc.scaleTo(0.1,0,0));
        //this.chatView.runAction(cc.fadeTo(0.1,0));
        cc.delayTime(0.3);
        this.scheduleOnce(function(){
            this.unopenObj.active =true;
            this.openObj.active = false; 
            this.showLastNote();
        }.bind(this),0.3);     
      }

      showChatInfo()
      {

      }

      showLastNote()
      {
        
      }

      onDisable()
      {

      }

}
