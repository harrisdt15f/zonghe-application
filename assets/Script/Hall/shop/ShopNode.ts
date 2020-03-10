import { G_PayControl } from "../../Controller/PayControl";
import  ShopLeftItem from "../shop/ShopLeftItem";
import alipayPanel from "./alipayPanel";
import abankPanel from "./payBankPanel";
import PayRecordPanel from "./PayRecordPanel";
import { G_RequestControl } from "../../Controller/RequestControl";
import { RequestEnum } from "../../Config/RequestConfig";

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
    private offlineList = []

    private leftObjList = []; //itemPrefab
    private curLeftIndex = 0;
    private curLeftData = null;


    onLoad () {
        let rightNode = this.node.getChildByName("RightNode");
        rightNode.getChildByName("payPanel").active = true;
    }

    onEnable()
    {
        this.LoadLeft();
    }
    LoadLeft()
    {     
        let cd = G_RequestControl.getConfig().getCD(RequestEnum.PayInfo)
        if(cd < 0)
        {
            G_PayControl.requesRechargeType(function(ret){
                let list = G_PayControl.getPayConfig().dataType
                this.LoadData(list);

            }.bind(this));
        }else
        {
            let list = G_PayControl.getPayConfig().dataType
            if(list && list.length > 0)
            {
                this.LoadData(list);
            }
        }
    }

    LoadData(list){
        let x = 0;
        let y = 0;  
        for(let i=0;i<list.length;i++){
            let tt = list[i]
            G_PayControl.getPayConfig().setPayItemInfo(tt.sign,tt.name,tt.is_online)
            let info = G_PayControl.getPayConfig().getPayItemInfo(tt.sign);
            if(info)
            {
                if(tt.is_online == 1)  //线上
                {
                    let leftInfo = {};
                    leftInfo["data"] = tt;
                    leftInfo["config"] = info;
                    leftInfo["is_online"] = 1;
                    this.leftList[x] = leftInfo;
                    x++;
                }else
                {
                    let leftInfo = {};
                    leftInfo["data"] = tt;
                    leftInfo["config"] = info;
                    this.offlineList[y] = leftInfo;
                    y++;
                }
            }
        }
        if(this.offlineList.length > 0)
        {
            let leftInfo = {};
            leftInfo["is_online"] = 0;
            leftInfo["config"] = G_PayControl.getPayConfig().getPayItemInfo("offline");
            leftInfo["data"] = this.offlineList;
            this.leftList.push(leftInfo);
        }
        //充值记录
        let leftInfoTwo = {};
        leftInfoTwo["is_online"] = -1;
        leftInfoTwo["config"] = G_PayControl.getPayConfig().getPayItemInfo("record");
        leftInfoTwo["data"] = null;
        this.leftList.push(leftInfoTwo);
    
        if(this.leftList.length > 0)
        {
            this.showLeft();
        }
    }
    showLeft()
    {
        for(let i=0;i<this.leftList.length;i++)
        {
            var item ;
            if(this.leftObjList.length >i)
            {
                item = this.leftObjList[i];
                item.active = true;
            }else
            {
                item = cc.instantiate(this.leftItem);
                item.active = true;
                this.leftGrid.addChild(item);
                this.leftObjList.push(item);
            }

           // item.active = true;
           // this.leftGrid.addChild(item);
            //this.leftObjList.push(item);
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
        if(this.curLeftIndex > 0 && this.curLeftIndex == index+1)
        {
            return;
        }
        if(this.curLeftIndex > 0 && this.curLeftIndex <= this.leftList.length + 1)
        {
            var tt = this.leftObjList[this.curLeftIndex - 1].getComponent(ShopLeftItem);
            tt.setSelectState(false);
        }
        this.curLeftIndex = index + 1;
        var ttt = this.leftObjList[this.curLeftIndex - 1].getComponent(ShopLeftItem);
        ttt.setSelectState(true);
        this.curLeftData = data;
        console.log("index>>>",index,"   ",this.curLeftData.config.name);
        this.onShowRightInfo();
    }
    private restttt;
    onShowRightInfo()
    {
        this.rightNode.children.forEach(element => {
            element.active = false;
        });
        this.rightNode.children.forEach(element => {
            if(this.curLeftData.is_online == 1)    //线上
            {
                if(this.curLeftData.config.panel == element.name)
                {
                    console.log("open panel ",element.name);
                    if(this.curLeftData.data.online_infos.length > 0)
                    {
                        element.active = true;
                        let script = element.getComponent(alipayPanel);  
                        script.init(this.curLeftData)                       
                    }else
                    {
                        this.nonePanel.active = true;                      
                    }
                }
            }
            else if(this.curLeftData.is_online == 0)    //线下
            {
                if(element.name == this.curLeftData.config.panel)
                {
                    element.active = true;
                    let script = element.getComponent(abankPanel); 
                    script.init(this.curLeftData);
                }
            }
            else  //充值记录
            {
                if(element.name == this.curLeftData.config.panel)
                {
                    element.active = true;
                   // let script = element.getComponent(PayRecordPanel); 
                   // script.init(this.curLeftData);
                }
            }
        });
      
      
    }


}
