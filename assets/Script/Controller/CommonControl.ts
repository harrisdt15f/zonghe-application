
import { G_UiForms } from "../Tool/UiForms";
import { G_HttpHelper } from "../Net/HttpHelper";
import { CODE } from "../Config/IdentifyKey";
import { CommonConfig } from "../Config/CommonConfig";


class CommonControl {
  
    public static readonly Instance : CommonControl = new CommonControl();

    private commonConfig : CommonConfig = null;


    constructor(){
        this.commonConfig = new CommonConfig();
    }

    public getCommonConfig(){
        return this.commonConfig;
    }


   

    /**
     * 获取游戏大厅数据
     */
    requesGameData(call){
        
        G_HttpHelper.httpPost("/app-api/games-lobby/game-categories",{"device":2}, function(ret){
           console.log("[游戏大厅]：返回数据",ret)   
            if(ret.status && ret.code == CODE.SUCCEED){
                this.getCommonConfig().gameHall = ret.data;
                console.log("ret.data   "+ret.data);
                if(call)
                {
                    call();
                }
            }
        }.bind(this))
        
    }
    /** 
     * 获取游戏分类列表数据
    */
    requesGameDetailData(typeid,call){
        
        G_HttpHelper.httpPost("/app-api/games-lobby/game-list",{"device":2,"type_id":typeid}, function(ret){
           console.log("[游戏列表]：返回数据",ret)   
            if(ret.status && ret.code == CODE.SUCCEED){
                // if(ret.data.length > 0)
                // {
                //     this.getCommonConfig().setGameSub(typeid,ret.data);
                // }
                this.getCommonConfig().setGameSub(typeid,ret.data);
                console.log("ret.data   "+ret.data);
                if(call)
                {
                    call();
                }
            }
        }.bind(this))
        
    }


}



export const G_CommonControl = CommonControl.Instance;
