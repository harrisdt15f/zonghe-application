import { G_OnFire } from '../../Net/OnFire';
import { uiEventFunction } from '../../Config/uiEvent';
import { G_Utils } from '../../Tool/Utils';
import { G_UiForms } from '../../Tool/UiForms';
import List from '../../Common/List';
import { G_PayControl } from '../../Controller/PayControl';
import { G_Language } from '../../Language/Language';
/**
 * app 支付方式
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class  ebankPanel extends cc.Component {

    @property(cc.Node)
    typeGrid:cc.Node = null;
    @property(cc.Node)
    typeItemPrefab:cc.Node = null;
    @property(cc.Node)
    typeDetail:cc.Node = null;

    @property(cc.Label)
    textBank:cc.Label = null;   //银行名
    @property(cc.Label)         
    textName:cc.Label = null;   //姓名
    @property(cc.Label)
    textNumber:cc.Label = null; //收款号
    @property(cc.Label)
    textAdress:cc.Label = null; //开户行

    @property(cc.Node)
    textTip:cc.Node = null;

    @property(cc.Node)
    numberEditbox: cc.Node = null;  //存款金额  
    @property(cc.Node)
    nameEditbox: cc.Node = null;  //存款姓名

    private Data = null;   //充值类型data
    private dataList = null;  //充值方式list
    private curData = null;   //当前方式

    private typeObjList =[] 
    private numObjList = []  

    // data:{
    //     "is_online":0,
    //     "data":[] ==>"data":xxxxx, "config":xxxxxx
    // }
    init (data) {    
        this.Data = data;
        //this.textTip.getComponent(cc.Label).string = ""
        console.log("offline  "+data.data[0].config.name)
        /*
        G_PayControl.requesRechargeChannels(data.data.id,function(ret){ 
            if(ret.status)
            {
                this.dataList = ret.data;
                if(ret.data.length >0)
                {
                    this.showTypeList()
                }
            }
        }.bind(this));
        */
    }

    //充值渠道
    showTypeList()
    {
        this.typeObjList.forEach(element => {
            element.active = false;
        });

        for(let i=0;i<this.dataList.length;i++)
        {
            var item;
            if(this.typeObjList[i] == null)
            {
                item = cc.instantiate(this.typeItemPrefab);
                item.active = true;
                item.name = i.toString();
                this.typeGrid.addChild(item);
                this.typeObjList.push(item);
                G_Utils.onClickEnd(item, ()=>{
                    this.showTypeDetail(i);
                }, this)
            }else
            {
                item = this.typeObjList[i];
                item.active = true;
                item.name = i.toString();
            }
            item.getChildByName("text").getComponent(cc.Label).string = this.dataList[i].frontend_name
        }
        if(this.dataList.length > 0)
        {
            this.showTypeDetail(0);
        }
    }

    //当前渠道详情
    showTypeDetail(index)
    {
        this.curData  =this.dataList[index]
        if(this.curData == null)
        {
            this.typeDetail.active = false;
        }else
        {
            this.typeDetail.active = true;
            this.textBank.string = this.curData.name;
            this.textName.string = this.curData.bank.name;
            this.textNumber.string = this.curData.bank.code;
            this.textAdress.string = " ";
            this.textTip.getComponent(cc.Label).string =this.curData.desc;
        }

        
        /*
        if(this.numObjList.length <= 0)
        {
            var list = G_PayControl.getPayConfig().payMoneyList;
            for(let i = 0;i <list.length;i++){
                var item = cc.instantiate(this.numberItemPrefab);
                item.active = true;
                item.name = i.toString();
                item.getChildByName("text").getComponent(cc.Label).string = list[i].toString();
                this.numberGrid.addChild(item);
                this.numObjList.push(item);
                G_Utils.onClickEnd(item, ()=>{
                    this.onNumberClick(i);
                }, this)
            }
        }
        */
        this.numberEditbox.getChildByName("editbox").getChildByName("text").getComponent(cc.Label).string = this.curData.min + " - " + this.curData.max
    }


    onNumberClick(index)
    {
        console.log("index  "+index)
        var list = G_PayControl.getPayConfig().payMoneyList;
        this.numberEditbox.getComponent("MyEditbox").getEdiboxComponent().string = list[index];
    }

    onPayClick()
    {
        if(this.curData == null)
        {
            return;
        }
        if(this.NameInfo == null || this.NameInfo == '')
        {
            return;
        }
        console.log("this.NumInfo   "+this.NumInfo);
        let val = parseInt(this.NumInfo);
        if(val < this.curData.min)
        {
            G_UiForms.hint(G_Language.get("payMinTip")+this.curData.min);
            return;
        }
        if(val > this.curData.max)
        {
            G_UiForms.hint(G_Language.get("payMaxTip")+this.curData.max);
            return;
        }
        G_PayControl.requesSendRecharge(this.Data.data.is_online,this.curData.id,val,function(ret){
            if(ret.status)
            {
                let url =  ret.data.payContent;
                switch(ret.data.mode)
                {
                    case "html":
                        this.webObj.node.active = true;
                        this.webObj.evaluateJS(url);
                    break;
                    case "qrcode":  //展示二维码

                    break;
                    case " jump":

                        break;
                }
                console.log("url  "+url);
            }

        }.bind(this));

    }
 
    set NameInfo(text : string){
        this.nameEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get NameInfo(){
        return this.nameEditbox.getComponent("MyEditbox").getEdiboxComponent().string
    }   

    set NumInfo(text : string){
        this.numberEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get NumInfo(){
        return this.numberEditbox.getComponent("MyEditbox").getEdiboxComponent().string
    }

}