

import {G_Utils} from "../Tool/Utils"
//聊天面板
const {ccclass, property} = cc._decorator;

@ccclass
export default class ChatItem extends cc.Component {

    @property(cc.Node)
    otherObj:cc.Node = null;
    @property(cc.Node)
    otherHeadSprite:cc.Node = null
    @property(cc.Node)
    otherDescBack:cc.Node = null  
    @property(cc.Label)
    otherNameLabel : cc.Label = null;
    @property(cc.Label)
    otherDescLabel:cc.Label = null;

    @property(cc.Node)
    myObj:cc.Node = null;
    @property(cc.Node)
    myHeadSprite:cc.Node = null
    @property(cc.Node)
    myDescBack:cc.Node = null  
    @property(cc.Label)
    myDescLabel:cc.Label = null;    

    private isMine = false;
    private data = null;

    init(msg){
      this.data = msg;

      if(!this.isMine)
      {
        this.showOtherInfo();
      }else{
        this.showMyInfo();
      }

    }

    showOtherInfo()
    {
      this.otherObj.active = true;
      this.myObj.active = false;
      this.otherNameLabel.string = '张三';
      this.otherDescLabel.string = "sdfsdfsdfsdfsdfsdfsdfsdfsd";
      console.log("otherDescLabel.node.height  " +this.otherDescLabel.node.height);
      this.otherDescBack.height = this.otherDescLabel.node.height + 5;
      this.node.height = this.otherDescLabel.node.height + 10;
    }

    showMyInfo()
    {
      this.otherObj.active = false;
      this.myObj.active = true;
      this.myDescLabel.string = 'trrtrtgrtgrtgrtggggggggggggggggggggggggggggggggdfgdfgerrrrrrrrr';
      console.log('this.myDescLabel node height  ' +this.myDescLabel.node.height)
      this.myDescBack.height = this.myDescLabel.node.height + 5;
      this.node.height = this.myDescLabel.node.height + 10;
    }



}
