import { G_HttpHelper } from "../Net/HttpHelper";
import { RequestEnum } from "../Config/RequestConfig";
import { G_UserControl } from "./UserControl";
import { PromoteConfig } from "../Config/PromoteConfig";


class PromoteControl {
  
    public static readonly Instance : PromoteControl = new PromoteControl();

    private promoteConfig : PromoteConfig = null;


    constructor(){
        this.promoteConfig = new PromoteConfig();
    }

    public getConfig(){
        return this.promoteConfig;
    }
    /**
     * 请求 推广收益msg
     * @param call 
     */
    requesProRewardMsg(call){      
        // G_HttpHelper.httpPost(RequestEnum.AccountRecord,
        //     {
        //         "type":1,           
        //     },  function(ret){
        //    console.log("推广收益：返回数据",ret)   
        //     if(ret.status){
        //         this.getConfig().ProRewardList = ret.data.data;
        //         console.log("ret.data.data.length   "+ret.data.data.length);
        //         call(ret);
        //     }
        // }.bind(this))        
    }

    /**
     * 请求 洗码收益msg
     * @param call 
     */
    requesWashRewardMsg(call){      
        // G_HttpHelper.httpPost(RequestEnum.AccountRecord,
        //     {
        //         "type":1,           
        //     },  function(ret){
        //    console.log("洗码收益：返回数据",ret)   
        //     if(ret.status){
        //         this.getConfig().WashRewardList = ret.data.data;
        //         console.log("ret.data.data.length   "+ret.data.data.length);
        //         call(ret);
        //     }
        // }.bind(this))        
    }

}

export const G_PromoteControl = PromoteControl.Instance;
