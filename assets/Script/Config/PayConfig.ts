

export  class PayConfig {

    private payTabAtlasList = {
        //线下支付
        "offline":{"name":"官方充值","is_online":0,"normalText":"subtitle_vipchongzhi_0","specialText":"subtitle_vipchongzhi_1","icon":"leftic5","panel":"abankPanel"}, //官方充值
        "alipay_transfer":{"name":"","is_online":0,"normalText":"subtitle_zhifubaocongzhi_0","specialText":"subtitle_zhifubaocongzhi_1","icon":"leftic1","panel":"payPanel"}, //支付宝转账
        "bank_transfer":{"name":"","is_online":0,"normalText":"subtitle_zhifubaocongzhi_0","specialText":"subtitle_zhifubaocongzhi_1","icon":"leftic1","panel":"payPanel"}, //银行卡转账
        "wechat_transfer":{"name":"","is_online":0,"normalText":"subtitle_zhifubaocongzhi_0","specialText":"subtitle_zhifubaocongzhi_1","icon":"leftic1","panel":"payPanel"}, //微信转账
        "unionPay_transfer":{"name":"","is_online":0,"normalText":"subtitle_zhifubaocongzhi_0","specialText":"subtitle_zhifubaocongzhi_1","icon":"leftic1","panel":"payPanel"}, //云闪付转账

        //线上支付
        "alipay":{"name":"","is_online":1,"normalText":"subtitle_zhifubaocongzhi_0","specialText":"subtitle_zhifubaocongzhi_1","icon":"leftic1","panel":"payPanel"}, //支付宝
        "wechat":{"name":"","is_online":1,"normalText":"subtitle_weixinchongzhi_0","specialText":"subtitle_weixinchongzhi_1","icon":"leftic2","panel":"payPanel"},   //微信
        "online_bank":{"name":"","is_online":1,"normalText":"subtitle_wangyinchongzhi_0","specialText":"subtitle_wangyinchongzhi_1","icon":"leftic3","panel":"payPanel"},   //网银充值
        "unionPay":{"name":"","is_online":1,"normalText":"subtitle_yinliansaoma_0","specialText":"subtitle_yinliansaoma_1","icon":"leftic4","panel":"payPanel"},    //银联扫码
        "jd":{"name":"","is_online":1,"normalText":"subtitle_yinliansaoma_0","specialText":"subtitle_yinliansaoma_1","icon":"leftic4","panel":"payPanel"},    //京东钱包
        "baidu":{"name":"","is_online":1,"normalText":"subtitle_yinliansaoma_0","specialText":"subtitle_yinliansaoma_1","icon":"leftic4","panel":"payPanel"},    //百度钱包
        "withdraw":{"name":"","is_online":1,"normalText":"subtitle_yinliansaoma_0","specialText":"subtitle_yinliansaoma_1","icon":"leftic4","panel":"payPanel"},    //在线出款        

        4:{"name":"","is_online":1,"normalText":"subtitle_vipchongzhi_0","specialText":"subtitle_vipchongzhi_1","icon":"leftic5","panel":"nonePanel"},     //VIP充值
        5:{"name":"","is_online":1,"normalText":"subtitle_chongzijilu_0","specialText":"subtitle_chongzijilu_1","icon":"leftic6","panel":"topUpListPanel"},     //充值记录  
    }

    public payMoneyList = [10,50,100,200,300,500,1000,5000];

   public setPayItemInfo(str,name,is_online)
   {
        if(this.payTabAtlasList[str] == null)
        {
            this.payTabAtlasList[str] = this.payTabAtlasList["offline"];
        }
        var tt = this.payTabAtlasList[str];
        tt.name = name;
        tt.is_online = is_online;
   }
    public getPayItemInfo(str)
    {
        return this.payTabAtlasList[str];
    }

    //充值分类
    private _dataType:[] = null;
    public get dataType(){
        return this._dataType;
    }
    public set dataType(data:[]){
        this._dataType = data;
    }

    

    private _dataDetail = {};

    public getDataDetail(index){
        console.log('get '+index);
        return this._dataDetail[index];
    }

    public setDataDetail(index,data){
        console.log('set '+index);
        this._dataDetail[index] = data;
    }
}
