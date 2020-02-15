import { G_OnFire } from '../../Net/OnFire';
import { uiEventFunction } from '../../Config/uiEvent';
import { G_Utils } from '../../Tool/Utils';
import { G_UiForms } from '../../Tool/UiForms';
import List from '../../Common/List';
import { G_PayControl } from '../../Controller/PayControl';
import { G_Language } from '../../Language/Language';
import { Platforms } from '../../Platform/Platforms';
/**
 * app 支付方式
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class  abankPanel extends cc.Component {

    @property(cc.Node)
    typeDetail:cc.Node = null;
    @property(cc.Node)
    typeGrid:cc.Node = null;
    @property(cc.Node)
    typeItemPrefab:cc.Node = null;
    @property(cc.Node)
    typeDetailGrid:cc.Node = null;
    @property(cc.Node)
    typeDetailItemPrefab:cc.Node = null;
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
    @property(cc.Label)
    textTime:cc.Label = null; //倒计时
    @property(cc.Label)
    textCode:cc.Label = null; //订单号
    @property(cc.Node)
    numberDetail:cc.Node = null;

    @property(cc.Node)
    numberEditbox: cc.Node = null;  //输入金额

    private Data = null;   //充值类型data
    private dataList = null;  //充值方式list
    private curDataList = null;  //当前充值方式list   
    private curDataListIndex = -1;

    private curData = null;   //当前充值方式当前种   
    private curDataIndex = -1;

    private typeObjList =[]     //银行卡，支付宝，微信，等
    private typeDetailObjList = []  //通道1,2,3,4 
    private numObjList = []        //金额 10 100 1000 10000...

    private leftTime = 0;
    private bankInfo = null;

    private platforms : Platforms = null;

    onLoad () {
        this.platforms = new Platforms()
    }

    // data:{
    //     "is_online":0,
    //     "data":[] ==>"data":xxxxx, "config":xxxxxx
    // }
    init (data) {
        this.typeDetail.active = true;
        this.bankDetail.active = false;
        this.Data = data;
        this.bankInfo = null;
        this.textTip.getComponent(cc.Label).string ="";
        this.dataList = data.data;
        this.curDataListIndex = -1;
        this.curDataIndex = -1;
        this.showTypeList();
    }

    //充值渠道
    showTypeList()
    {
        this.typeObjList.forEach(element => {
            element.getChildByName('select').active = false;
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
                    this.sendDetailRechargeChannel(i);
                }, this)
            }else
            {
                item = this.typeObjList[i];
                item.active = true;
                item.name = i.toString();
            }
            item.getChildByName("text").getComponent(cc.Label).string = this.dataList[i].data.name
        }
        if(this.dataList.length > 0)
        {
            this.sendDetailRechargeChannel(0)
        }
    }

    sendDetailRechargeChannel(index){
        if(this.curDataListIndex >= 0 && this.curDataListIndex == index)
        {
            return;
        }
        this.curDataListIndex = index;
        this.typeObjList.forEach(element => {
            element.getChildByName('select').active = false;
        });

        this.typeObjList[index].getChildByName('select').active = true;
        this.numberDetail.active =false;
        this.typeDetailObjList.forEach(element => {
            element.active = false;
            element.getChildByName('select').active = false;
        });   
        if(this.dataList[index].data.offline_infos.length > 0){
            this.curDataList = this.dataList[index].data.offline_infos;
            this.showTypeDetail()
        }

    }

    //当前渠道详情
    showTypeDetail()
    {
        if(this.curDataList.length> 0){
            for(let i=0;i<this.curDataList.length;i++)
            {
                var item;
                if(this.typeDetailObjList[i] == null)
                {
                    item = cc.instantiate(this.typeDetailItemPrefab);
                    item.active = true;
                    item.name = i.toString();
                    this.typeDetailGrid.addChild(item);
                    this.typeDetailObjList.push(item);
                    G_Utils.onClickEnd(item, ()=>{
                        this.showDetailTypeDetail(i);
                    }, this)
                }else
                {
                    item = this.typeDetailObjList[i];
                    item.active = true;
                    item.name = i.toString();
                }
                item.getChildByName("text").getComponent(cc.Label).string = this.curDataList[i].name
            }
        }

    }

    showDetailTypeDetail(index)
    {
        // if(this.curDataIndex >= 0 && this.curDataIndex == index)
        // {
        //     return;
        // }
        this.numberDetail.active = true;
        this.curDataIndex = index;
        this.typeDetailObjList.forEach(element => {
            element.getChildByName('select').active = false;
        });
        this.typeDetailObjList[index].getChildByName('select').active = true;
        this.curData  = this.curDataList[index]
        if(this.numObjList.length <= 0)
        {
            var list = G_PayControl.getPayConfig().payMoneyList;
            for(let i = 0;i <list.length;i++){
                var numberItem = cc.instantiate(this.numberItemPrefab);
                numberItem.active = true;
                numberItem.name = i.toString();
                numberItem.getChildByName("text").getComponent(cc.Label).string = list[i].toString();
                this.numberGrid.addChild(numberItem);
                this.numObjList.push(numberItem);
                G_Utils.onClickEnd(numberItem, ()=>{
                    this.onNumberClick(i);
                }, this)
            }
        }
        //this.textTip.getComponent(cc.Label).string =this.curData.desc;
        this.textTip.getComponent(cc.Label).string = "";
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
        let val = parseInt(this.NumInfo);
        if(this.NumInfo == null || this.NumInfo == ''){
            G_UiForms.hint(G_Language.get("payMoneyInput"));
            return;
        }
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
        console.log("this.NumInfo   "+val,"   ",this.curData.id);
        G_PayControl.requesSendRecharge(this.Data.is_online,this.curData.id,val,function(ret){
            if(ret.status)
            {
                this.bankInfo = ret.data;
                this.typeDetail.active = false;
                this.bankDetail.active = true;
                //this.textBank.string = this.curData.xxxxxxxxxxxxxxxxx;
                this.textName.string = ret.data.username;
                this.textNumber.string = ret.data.account.toString();
                this.textAdress.string = ret.data.branch;
                this.textMoney.string = ret.data.money;
                this.textCode.string = "订单号: " +ret.data.order_no;
               // let order = vdata.order_no;  //订单号
               var before = new Date(ret.data.created_at).getTime()
               var after = new Date(ret.data.expired_at).getTime()
               this.leftTime = (after - before)/1000;
               this.textTime.string = G_Utils.getDateTimeStrTwo(this.leftTime);
            }

        }.bind(this));

    }
    
    update(dt){
        if(this.leftTime >0 && this.bankInfo != null){
            this.leftTime -= dt;
            this.textTime.string = G_Language.get("payLeftTime")+ G_Utils.getDateTimeStrTwo(this.leftTime);
            if(this.leftTime <= 0)
            {
                this.textTime.string = G_Language.get("payLeftTime") +"00:00";
            }
        }
    }

    set NumInfo(text : string){
        this.numberEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get NumInfo(){
        return this.numberEditbox.getComponent("MyEditbox").getEdiboxComponent().string
    }

    OnCopyBank()
    {
        if(this.bankInfo == null){
            return;
        }
        this.platforms.JsCopy(this.bankInfo.branch)
        G_UiForms.hint(G_Language.get("copySucceed"))
    }
    onCopyBankNumber()
    {
        if(this.bankInfo == null){
            return;
        }
        this.platforms.JsCopy(this.bankInfo.account)
        G_UiForms.hint(G_Language.get("copySucceed"))
    }
    onCopyName(){
        if(this.bankInfo == null){
            return;
        }
        this.platforms.JsCopy(this.bankInfo.username)
        G_UiForms.hint(G_Language.get("copySucceed"))
    }
    onCopyMoney(){
        if(this.bankInfo == null){
            return;
        }
        this.platforms.JsCopy(this.bankInfo.money)
        G_UiForms.hint(G_Language.get("copySucceed"))
    }

    ///我已转账
    onSendPaySuccess(){
        G_PayControl.requesSendPayTrue(this.bankInfo.order_no,function(ret){
            if(ret.status){
                this.init(this.Data)
                G_UiForms.hint(G_Language.get("payTrueTip"))
            }else
            {
                G_UiForms.hint(ret.message)
            }
        
        }.bind(this))
    }

    ///取消订单
    onSendPayRefuse(){
        G_PayControl.requesSendPayCancel(this.bankInfo.order_no,function(ret){

        }.bind(this))
        this.init(this.Data)
        //请求 撤销
    
    }

}