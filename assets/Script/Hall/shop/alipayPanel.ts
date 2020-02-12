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
export default class  alipayPanel extends cc.Component {

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
    bankDetail:cc.Node = null;
    @property(cc.Node)
    qrImage:cc.Graphics = null;
    @property(cc.Node)
    textTip:cc.Node = null;

    @property(cc.Node)
    numberEditbox: cc.Node = null;  //输入金额

    private Data = null;   //充值类型data
    private dataList = null;  //充值方式list
    private curData = null;   //当前方式

    private typeObjList =[] 
    private numObjList = []  

    init (data) {
        this.typeDetail.active = true;
        this.bankDetail.active = false;
        this.Data = data;
        this.textTip.getComponent(cc.Label).string ="";
        this.dataList = data.data;
        // G_PayControl.requesRechargeChannels(data.data.id,function(ret){ 
        //     if(ret.status)
        //     {
        //         this.dataList = ret.data;
        //         if(ret.data.length >0)
        //         {
        //             this.showTypeList()
        //         }
        //     }
        // }.bind(this));
        this.showTypeList()
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
        this.typeObjList.forEach(element => {
            element.getChildByName('select').active = false;
        });
        this.typeObjList[index].getChildByName('select').active = true;
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
                let url =  ret.data.payContent;
               // url = "https://www.lagou.com/lgeduarticle/74918.html"           
                switch(ret.data.mode)
                {
                    case "html":
                        document.write(url);                      
                    break;
                    case "qrcode":  //展示二维码
                        this.initQrCode(url);
                    break;
                    case " jump":
                        if(CC_JSB){
                            jsb.openURL(url);
                        }else{
                            window.open(url)
                        } 
                        break;
                }
            }

        }.bind(this));
        
    }
    

    set NumInfo(text : string){
        this.numberEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get NumInfo(){
        return this.numberEditbox.getComponent("MyEditbox").getEdiboxComponent().string
    }

    
    initQrCode(str){
        this.typeDetail.active = false;
        this.bankDetail.active = true;
        var qrcode = new QRCode(-1, QRErrorCorrectLevel.H);
        qrcode.addData(str);
        qrcode.make();

        var ctx = this.qrImage;
        ctx.fillColor = cc.Color.BLACK;
        // compute tileW/tileH based on node width and height
        var tileW = ctx.node.width / qrcode.getModuleCount();
        var tileH = ctx.node.height / qrcode.getModuleCount();

        // draw in the Graphics
        for (var row = 0; row < qrcode.getModuleCount(); row++) {
            for (var col = 0; col < qrcode.getModuleCount(); col++) {
                if (qrcode.isDark(row, col)) {
                    // ctx.fillColor = cc.Color.BLACK;
                    var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
                    var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
                    ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
                    ctx.fill();
                } else {
                    // ctx.fillColor = cc.Color.WHITE;
                }
                var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
                // var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
                // ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
                // ctx.fill();
            }
        }

    },
    

}