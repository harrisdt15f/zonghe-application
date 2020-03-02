
import { G_UiForms } from "../Tool/UiForms";
import { G_HttpHelper } from "../Net/HttpHelper";
import { CODE } from "../Config/IdentifyKey";
import { PayConfig } from "../Config/PayConfig";
import { RequestEnum } from "../Config/RequestConfig";


class PayControl {
  
    public static readonly Instance : PayControl = new PayControl();

    private payConfig : PayConfig = null;


    constructor(){
        this.payConfig = new PayConfig();
    }

    public getPayConfig(){
        return this.payConfig;
    }


   

    /**
     * 获取充值分类
     */
    requesRechargeType(call){      

        G_HttpHelper.httpGet(RequestEnum.PayInfo, function(ret){
           console.log("[获取充值分类]：返回数据",ret)   
            if(ret.status){
                this.getPayConfig().dataType = ret.data;
                //console.log("ret.data   "+ret.data);
                if(call)
                {
                    call(ret);
                }
            }
        }.bind(this))
        
    }

    /**
     * 发起充值
     */
    requesSendRecharge(isOnLine,channelId,money,call){      
        G_HttpHelper.httpPost(RequestEnum.Recharge,{"is_online":isOnLine,"channel_id":channelId,"money":money}, function(ret){
           console.log("[获取充值分类]：返回数据",ret)   
            if(ret.status){
               // this.getCommonConfig().gameHall = ret.data;
                //console.log("ret.data   "+ret.data);
                if(call)
                {
                    call(ret);
                }
            }
        }.bind(this))
        
    }
        /**
     * 撤销订单
     */
    requesSendPayCancel(order,call){      
        G_HttpHelper.httpPost(RequestEnum.PayCancel,{"order_no":order}, function(ret){
           console.log("[撤销订单]：返回数据",ret)   
            if(ret.status){
               // this.getCommonConfig().gameHall = ret.data;
                //console.log("ret.data   "+ret.data);
                if(call)
                {
                    call(ret);
                }
            }
        }.bind(this))
        
    }
        /**
     * 确认支付
     */
    requesSendPayTrue(order,call){      
        G_HttpHelper.httpPost(RequestEnum.PayTrue,{"order_no":order}, function(ret){
           console.log("[确认支付]：返回数据",ret)   
            if(ret.status){
               // this.getCommonConfig().gameHall = ret.data;
                //console.log("ret.data   "+ret.data);
                if(call)
                {
                    call(ret);
                }
            }
        }.bind(this))
        
    }
    /**
     *  账户记录
     */
    requesAccountRecord(call){      
        G_HttpHelper.httpPost(RequestEnum.AccountRecord,
            {
                "type":1,           
            },  function(ret){
           console.log("账户记录：返回数据",ret)   
            if(ret.status){
                this.getPayConfig().AccountRecordList = ret.data.data;
                console.log("ret.data.data.length   "+ret.data.data.length);
                call(ret);
            }
        }.bind(this))        
    }
    /**
     *  充值记录
     */
    requesPayRecord(call){      
        G_HttpHelper.httpPost(RequestEnum.PayRecord,
            {
                "type":2,           
            },  function(ret){
           console.log("充值记录：返回数据",ret)   
            if(ret.status){
                this.getPayConfig().PayRecordList = ret.data.data;
                console.log("ret.data.data.length   "+ret.data.data.length);
                call(ret);
            }
        }.bind(this))        
    }
}



export const G_PayControl = PayControl.Instance;
