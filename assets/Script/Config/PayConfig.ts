import { G_Language } from "../Language/Language";


export  class PayConfig {

    private payTabAtlasList = {
        //线下支付
        "offline":{"name":"官方充值","is_online":0,"normalText":"subtitle_vipchongzhi_0","specialText":"subtitle_vipchongzhi_1","icon":"leftic5","panel":"abankPanel"}, //官方充值
        "record":{"name":"充值记录","is_online":-1,"normalText":"subtitle_chongzijilu_0","specialText":"subtitle_chongzijilu_1","icon":"leftic6","panel":"recordPanel"}, //充值记录       
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



    /** serverConfig
     * 
     * 账变类型
     */
    private accountTypeList = {
        "all":{"name":"accountType_all"},
        "recharge":{"name":"accountType_recharge"},
        "point_from_child":{"name":"accountType_point_from_child"},
        "game_bonus":{"name":"accountType_game_bonus"},
        "cancel_order":{"name":"accountType_cancel_order"},  
        "gift":{"name":"accountType_gift"},
        "recharge_from_parent":{"name":"accountType_recharge_from_parent"},
        "system_claim":{"name":"accountType_system_claim"},
        "day_salary":{"name":"accountType_day_salary"},
        "dividend_from_parent":{"name":"accountType_dividend_from_parent"},
        "withdraw_un_frozen":{"name":"accountType_withdraw_un_frozen"},
        "withdraw_frozen":{"name":"accountType_withdraw_frozen"},
        "withdraw_finish":{"name":"accountType_withdraw_finish"},
        "bet_cost":{"name":"accountType_bet_cost"},
        "trace_cost":{"name":"accountType_trace_cost"},
        "real_cost":{"name":"accountType_real_cost"},
        "cancel_point":{"name":"accountType_cancel_point"},
        "cancel_bonus":{"name":"accountType_cancel_bonus"},
        "cancel_fee":{"name":"accountType_cancel_fee"},
        "recharge_to_child":{"name":"accountType_recharge_to_child"},
        "system_reduce":{"name":"accountType_system_reduce"},
        "dividend_to_child":{"name":"accountType_dividend_to_child"},
        "bonus_limit_reduce":{"name":"accountType_bonus_limit_reduce"},
        "artificial_recharge":{"name":"accountType_artificial_recharge"},
        "artificial_deduction":{"name":"accountType_artificial_deduction"},
        "bet_commission":{"name":"accountType_bet_commission"},
        "commission":{"name":"accountType_commission"},
        "trace_un_frozen":{"name":"accountType_trace_un_frozen"},
        "trace_refund":{"name":"accountType_trace_refund"},
        "casino_in":{"name":"accountType_casino_in"},
        "casino_to":{"name":"accountType_casino_to"},
    }

    private accountTypeNameList = [];
    private accountSignList = [];
    
    public getCurAccountSign(index)
    {
        if(this.accountSignList.length <= 0)
        {
            for(var k in this.accountTypeList)
            {
                let str = G_Language.get(this.accountTypeList[k].name);
                this.accountTypeNameList.push(str);   
                this.accountSignList.push(k);   
            } 
        }
        if(this.accountSignList.length > index)
        {
            return this.accountSignList[index]
        }
        return null;
    }

    public getAccountTypeValueList()
    {
        if(this.accountTypeNameList.length <= 0)
        {
            for(var k in this.accountTypeList)
            {
                let str = G_Language.get(this.accountTypeList[k].name);
                this.accountTypeNameList.push(str);   
                this.accountSignList.push(k);   
            } 
        }
       return this.accountTypeNameList;
    }
    
    public getCurAccoutSignValue(sign)
    {
        if(this.accountTypeList[sign])
        {
            let str =  G_Language.get(this.accountTypeList[sign].name);
            return str;
        }
        return "";
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


    public getRecordListInfo(_type,beginTime,endTime){
        if(this.AccountRecordList == null || this.AccountRecordList.length <= 0)
        {
            return [];
        }
        console.log("this.AccountRecordList.length     ",this.AccountRecordList.length);
        console.log("_type     ",_type);
        console.log("beginTime     ",beginTime);
        console.log("endTime     ",endTime);
        let list = [];
        this.AccountRecordList.forEach(item=>{
            let curTime = Date.parse(item.created_at)
            if(curTime >= beginTime && curTime <= endTime)
            {
                if(_type == "all")
                {
                    list.push(item);
                }
                else if(item["type_sign"] == _type)
                {
                    list.push(item);
                
                }else
                {
                    //empty
                }  
            }
        });
        return list;
    }
    public getPayRecordListInfo(_type,beginTime,endTime){
        if(this.PayRecordList == null || this.PayRecordList.length <= 0)
        {
            return [];
        }
        console.log("this.PayRecordList.length     ",this.PayRecordList.length);
        console.log("_type     ",_type);
        console.log("beginTime     ",beginTime);
        console.log("endTime     ",endTime);
        let list = [];
        this.PayRecordList.forEach(item=>{
            let curTime = Date.parse(item.created_at)
            if(curTime >= beginTime && curTime <= endTime)
            {
                if(_type == 0)
                {
                    list.push(item);
                }
                else  if(_type == 1 && item.recharge_status == 0)
                {
                    list.push(item);
                
                }
                else  if(_type == 2 && item.recharge_status == 1 && item.status == 0)
                {
                    list.push(item);
                
                }
                else  if(_type == 3 && item.recharge_status == 1 && item.status == 1)
                {
                    list.push(item);
                
                }
                else
                {
                    //empty
                }  
            }
        });
        return list;
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

    //賬戶记录列表
    private _recordList:[] = null;
    public get AccountRecordList(){
        return this._recordList;
    }
    public set AccountRecordList(data:[]){
        this._recordList = data;
    }   

    //充值记录列表
    private _payrecordList:[] = null;
    public get PayRecordList(){
        return this._payrecordList;
    }
    public set PayRecordList(data:[]){
        this._payrecordList = data;
    }   
}
