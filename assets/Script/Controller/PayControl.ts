
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
     * 获取充值渠道
    */
    requesRechargeChannels(typeid,call){       
        G_HttpHelper.httpPost(RequestEnum.Channels,{"type_id":typeid}, function(ret){
           console.log("[获取充值渠道]：返回数据",ret)   
            if(ret.status ){
                // if(ret.data.length > 0)
                // {
                //     this.getCommonConfig().setGameSub(typeid,ret.data);
                // }
                //this.getCommonConfig().setGameSub(typeid,ret.data);
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

}



export const G_PayControl = PayControl.Instance;
