
import { G_UiForms } from "../Tool/UiForms";
import { G_HttpHelper } from "../Net/HttpHelper";
import { CODE } from "../Config/IdentifyKey";
import { VipConfig } from "../Config/VipConfig";
import { G_OnFire } from "../Net/OnFire";
import { EventRequest } from "../Config/uiEvent";
import { G_UserControl } from "./UserControl";
import { RequestEnum } from "../Config/RequestConfig";


class VipControl {
  
    public static readonly Instance : VipControl = new VipControl();

    private vipConfig : VipConfig = null;


    constructor(){
        this.vipConfig = new VipConfig();
    }

    public getVipConfig(){
        return this.vipConfig;
    }


   

    /**
     * 获取VIP配置
     */
    requesVipData(){
        if(this.vipConfig.data != null)
        {
            return;
        }
        G_HttpHelper.httpPost(RequestEnum.VIP,null, function(ret){
            console.log("[获取VIP配置]：返回数据",ret)   
            if(ret.status && ret.code == CODE.SUCCEED){
                this.vipConfig.data = ret.data.system_level;
                this.vipConfig.personMsg = ret.data.level_benefits_status;
                console.log("ret.data   "+ret.data);
            }
            G_OnFire.fire(EventRequest.VipUpdate)  
        }.bind(this))
    }

    /**
     * 领取晋级赠金
     */
    requesVipPromotion(call){
        console.log("领取晋级赠金1")   
        if(this.vipConfig.data == null)
        {
            return;
        }
        console.log("领取晋级赠金2")   
        G_HttpHelper.httpPost(RequestEnum.Promotion,null, function(ret){
            console.log("[领取晋级赠金]：返回数据",ret)   
            if(ret.status && ret.code == CODE.SUCCEED){
                G_UserControl.getUser().vippromotion = 0;
                console.log("ret.data   "+ret.data);
            }
           // G_OnFire.fire(EventRequest.VipUpdate)  
            if(call)
            {
                call(ret)
            }
        }.bind(this))
    }
    /**
     * 领取每周赠金
     */
    requesVipWeekLy(call){
        console.log("领取每周赠金1")   
        if(this.vipConfig.data == null)
        {
            return;
        }
        console.log("领取每周赠金2")   
        G_HttpHelper.httpPost(RequestEnum.Weekly,null, function(ret){
            console.log("[领取每周赠金]：返回数据",ret)   
            if(ret.status && ret.code == CODE.SUCCEED){
                G_UserControl.getUser().vipweekly = 0;
                console.log("ret.data   "+ret.data);
            }
           // G_OnFire.fire(EventRequest.VipUpdate)  
            if(call)
            {
                call(ret)
            }
        }.bind(this))
    }



}



export const G_VipControl = VipControl.Instance;
