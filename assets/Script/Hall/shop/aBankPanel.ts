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
export default class  abankPanel extends cc.Component {

    @property(cc.Node)
    typeGrid:cc.Node = null;
    @property(cc.Node)
    typeItemPrefab:cc.Node = null;
    @property(cc.Node)
    typeDetail:cc.Node = null;
    @property(cc.Node)
    numberGrid:cc.Node = null;
    @property(cc.Node)
    numberItemPrefab:cc.Node = null;
    @property(cc.Node)
    textTip:cc.Node = null;

    @property(cc.Node)
    bankDetail:cc.Node = null;
    @property(cc.Label)
    textBank:cc.Label = null;   //银行名
    @property(cc.Label)         
    textName:cc.Label = null;   //姓名
    @property(cc.Label)
    textNumber:cc.Label = null; //收款号
    @property(cc.Label)
    textAdress:cc.Label = null; //开户行
    @property(cc.Label)
    textMoney:cc.Label = null; //金额

    @property(cc.Node)
    numberEditbox: cc.Node = null;  //输入金额

    private Data = null;   //充值类型data
    private dataList = null;  //充值方式list
    private curDataList = null;  //当前充值方式list
    private curData = null;   //当前充值方式当前种

    private typeObjList =[]     //银行卡，支付宝，微信，等
    private typeDetailObjList = []  //通道1,2,3,4 
    private numObjList = []        //金额 10 100 1000 10000...


    
    // data:{
    //     "is_online":0,
    //     "data":[] ==>"data":xxxxx, "config":xxxxxx
    // }
    init (data) {
        this.typeDetail.active = true;
        this.bankDetail.active = false;
        this.Data = data;
        this.textTip.getComponent(cc.Label).string ="";
        this.dataList = data.data;
        this.showTypeList();
    }

    //充值渠道
    showTypeList()
    {
        this.typeObjList.forEach(element => {
            element.active = false;
        });
        this.typeDetailObjList.forEach(element => {
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
                  //  this.showTypeDetail(i);
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
          //  this.showTypeDetail(0);
        }
    }

    //当前渠道详情
    showTypeDetail(index)
    {
        
        this.curData  =this.dataList[index]
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
        this.textTip.getComponent(cc.Label).string =this.curData.desc;
        this.numberEditbox.getChildByName("editbox").getChildByName("text").getComponent(cc.Label).string = Math.floor(this.curData.min) + " - " +Math.floor(this.curData.max)
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
                this.typeDetail.active = false;
                this.bankDetail.active = true;
                this.textBank.string = this.curData.name;
                this.textName.string = this.curData.bank.name;
                this.textNumber.string = this.curData.bank.code;
                this.textAdress.string = " ";
                this.textMoney.string = " ";

            }

        }.bind(this));

    }
    

    set NumInfo(text : string){
        this.numberEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get NumInfo(){
        return this.numberEditbox.getComponent("MyEditbox").getEdiboxComponent().string
    }

    OnCopyBank()
    {

    }
    onCopyBankNumber()
    {

    }
    onCopyName(){

    }
    onCopyMoney(){

    }


}