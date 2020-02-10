import { G_PayControl } from "../../Controller/PayControl";
import  ShopLeftItem from "../shop/ShopLeftItem";
import alipayPanel from "./alipayPanel";
import wechatpayPanel from "./wechatpayPanel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShopNode extends cc.Component {


    @property(cc.Node)
    leftGrid:cc.Node = null;
    @property(cc.Node)
    leftItem:cc.Node = null;
    @property(cc.Node)
    rightNode:cc.Node = null;
    @property(cc.Node)
    nonePanel:cc.Node = null;

    private leftList = [];  //data

    private leftObjList = []; //itemPrefab
    private curLeftIndex = 0;
    private curLeftData = null;


    onLoad () {
        let rightNode = this.node.getChildByName("RightNode");
        rightNode.getChildByName("payPanel").active = true;
    }

    onEnable()
    {
        this.showLeft();
    }
    showLeft()
    {       
        if(this.leftObjList.length <= 0)
        { 
            G_PayControl.requesRechargeType(true,function(ret){
                let list = G_PayControl.getPayConfig().dataType
                for(let i=0;i<list.length;i++){
                    let tt = list[i]
                    G_PayControl.getPayConfig().setPayItemInfo(tt.sign,tt.name,tt.is_online)
                    let info = G_PayControl.getPayConfig().getPayItemInfo(tt.sign);
                    if(info)
                    {
                        let leftInfo = {};
                        leftInfo["data"] = tt;
                        leftInfo["config"] = info;
                        this.leftList[i] = leftInfo;
                    }
                }
                if(this.leftList.length > 0)
                {
                    this.LoadLeft();
                }

            }.bind(this));
        }
    }
    LoadLeft()
    {
        for(let i=0;i<this.leftList.length;i++)
        {
            var item = cc.instantiate(this.leftItem);
            item.active = true;
            this.leftGrid.addChild(item);
            this.leftObjList.push(item);
            var itemJs = item.getComponent(ShopLeftItem);             
            itemJs.init(this.leftList[i],i,(index,data)=>{
                this.onSelectedItem(index,data);
            });
        }
        if(this.curLeftIndex <= 0)
        {
            this.onSelectedItem(0,this.leftList[0]);
        }
    }

    //G_Utils.onClickEnd(item, this.onToggleEnd, this)
    onSelectedItem(index,data){
        if(this.curLeftIndex > 0 && this.curLeftIndex <= this.leftList.length + 1)
        {
            var tt = this.leftObjList[this.curLeftIndex - 1].getComponent(ShopLeftItem);
            tt.setSelectState(false);
        }
        this.curLeftIndex = index + 1;
        var ttt = this.leftObjList[this.curLeftIndex - 1].getComponent(ShopLeftItem);
        ttt.setSelectState(true);
        this.curLeftData = data;
        console.log("index>>>",index,"    ",this.curLeftData.data.sign,"    ",this.curLeftData.config.name);
        this.onShowRightInfo();
    }
    private restttt;
    onShowRightInfo()
    {
        this.rightNode.children.forEach(element => {
          element.active = false;
          if(this.curLeftData.config.panel == element.name)
          {
              console.log("open panel ",element.name);
              let script = null;

              switch(this.curLeftData.data.sign)
              {
                  case "alipay":
                    script = element.getComponent(alipayPanel);                  
                  break;
                  case "wechat":
                    script = element.getComponent(wechatpayPanel);                  
                  break;
                //   case "online_bank":
                //     script = element.getComponent(alipayPanel);                  
                //   break;
                //   case "unionPay":
                //     script = element.getComponent(alipayPanel);                  
                //   break;
                //   case "jd":
                //     script = element.getComponent(alipayPanel);                  
                //   break;
                //   case "baidu":
                //     script = element.getComponent(alipayPanel);                  
                //   break;
                //   case "withdraw":
                //     script = element.getComponent(alipayPanel);                  
                //   break;
              }
              G_PayControl.requesRechargeChannels(this.curLeftData.data.id,function(ret){ 
                if(ret.status)
                {
                    if(ret.data.length >0)
                    {
                        if(script)
                        {
                            this.restttt = ret;
                            // this.nonePanel.active = false;
                            // element.active = true;
                            // script.init(ret);
                        }
                    }else
                    {
                        element.active = false;
                        this.nonePanel.active = true;
                    }
                   if(this.restttt.data.length >0)
                   {
                      this.nonePanel.active = false;
                      element.active = true;
                      script.init(ret);
                   }
                }
            }.bind(this));

          }
      });
      
    }

}
