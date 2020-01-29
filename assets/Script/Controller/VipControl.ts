
import { G_UiForms } from "../Tool/UiForms";
import { G_HttpHelper } from "../Net/HttpHelper";
import { CODE } from "../Config/IdentifyKey";
import { VipConfig } from "../Config/VipConfig";


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
        G_HttpHelper.httpGet("/app-api/user/grades", function(ret){
           // console.log("[退出登陆]：返回数据",ret)   
            if(ret.status && ret.code == CODE.SUCCEED){
                this.vipConfig.data = ret.data;
                console.log("ret.data   "+ret.data);
            }
        }.bind(this))
    }


}



export const G_VipControl = VipControl.Instance;
