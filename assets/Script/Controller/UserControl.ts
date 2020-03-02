
import { G_UiForms } from "../Tool/UiForms";
import { G_HttpHelper } from "../Net/HttpHelper";
import { CODE } from "../Config/IdentifyKey";
import { UserModel } from '../Model/UserModel';
import { IS_LOGIN } from "../Config/config";
import {EventRequest, uiEventFunction} from "../Config/uiEvent";
import { G_OnFire } from '../Net/OnFire';
import { G_VipControl } from "./VipControl";
import { G_CommonControl } from "./CommonControl";
import { G_RequestControl } from "./RequestControl";
import { RequestEnum } from "../Config/RequestConfig";

class UserControl {
  
    public static readonly Instance : UserControl = new UserControl();

    public _userModel : UserModel = null;


    constructor(){
        this._userModel = new UserModel();
    }

    getUser(){
        return this._userModel;
    }

    /**
     * 是否有登陆过
     */
    isLogin() : boolean{
        if(IS_LOGIN)
            return IS_LOGIN;

        let isAccount=  this._userModel.userMobile;
        let isPassword = this._userModel.userPassword;
        if(!isAccount || isAccount ==='')
            return false;

        if(!isPassword || isPassword === '')
            return false;
        return true;
    }

    /**
     * 在启动的时候检测一次是否上一次有登陆成功的账户 有就主动登陆一次
     */
    detectionLogin(ret){
        let flag = this.isLogin()
        if(!flag)
            return;
            

        if(IS_LOGIN)
            return;

        let isAccount=  this._userModel.userMobile;
        let isPassword = this._userModel.userPassword;
        this.requestLogin(isAccount, isPassword,function(data){
          //  console.log("[游戏启动]","自动重新登陆一次")
            if(ret){
                ret(data);
            }
        })
    }

    /**
     * 登陆请求
     * @param mobile 账户
     * @param password 
     * @param call 
     */
    requestLogin(mobile : string, password : string, call? : Function ){      
        G_HttpHelper.httpPost(RequestEnum.Login,{
            mobile : mobile,
            password : password
        }, function(ret){
            //console.log("[登陆]：返回数据",ret)    
            if(ret.status && ret.code == CODE.SUCCEED){
                //保存登陆名称，密码
                this._userModel.userMobile = mobile;
                this._userModel.userPassword = password;
                this._userModel.accessToken = ret.data.access_token;
                this.requesPlayerData(function(data){
                    if(call){
                        call(data)
                    }
                })
               // G_CommonControl.requesGameData();
            }else if(!ret.status){
                this._userModel.userPassword = '';
                this._userModel.accessToken = '';
                G_OnFire.fire(EventRequest.HeadUpdata)
                G_UiForms.hint(ret.message)
                if(call){
                    call(ret)
                }
            }
        }.bind(this))
    
    }
    
    /**
     * 注册请求
     * @param mobile 账户
     * @param password 密码
     * @param passwordagain 二次密码
     * @param ver_code 验证码
     * @param ver_key  验证key
     * @param invite_code 邀请码
     */
    requestRegister(mobile : string,password : string, passwordagain:string,ver_code:string,ver_key:string,invite_code:string, call? : Function ){
        let list = {};
        list["password"] = password;
        list["password_confirmation"] = passwordagain;
        list["verification_code"] = ver_code;
        list["verification_key"] = ver_key;
        if(invite_code)
            list["invite_code"] = invite_code;

        G_HttpHelper.httpPost(RequestEnum.Register,list, function(ret){
           // console.log("[注册]：返回数据",ret)    
            if(ret.status && ret.code == CODE.SUCCEED){
                //保存登陆名称，密码
                this._userModel.userMobile = mobile;
                this._userModel.userPassword = password;
                this._userModel.accessToken = ret.data["access_token"];
                this.requesPlayerData(function(data){
                    if(call){
                        call(data)
                    }
                });
            }else if(!ret.status){
                G_UiForms.hint(ret.message)
            }
        }.bind(this))

    }

    /** 
    *密码找回
    * @param mobile 账户
    * @param password 密码
    * @param passwordagain 二次密码
    * @param ver_code 验证码
    * @param ver_key  验证key
    */
    requestRecoverCode(mobile : string,password : string, passwordagain:string,ver_code:string,ver_key:string, call? : Function ){
        let list = {};
        list["password"] = password;
        list["password_confirmation"] = passwordagain;
        list["verification_code"] = ver_code;
        list["verification_key"] = ver_key;
        G_HttpHelper.httpPut(RequestEnum.PasswordReset,list, function(ret){
            console.log("[密码找回]：返回数据",ret)    
            if(ret.status){
                //保存登陆名称，密码
                this._userModel.userMobile = mobile;
                this._userModel.userPassword = password;
                if(call){
                    call(ret)
                }
                this.requestLogin(mobile,password);
               // this.requesPlayerData(function(){
               // });
            }else if(!ret.status){
                G_UiForms.hint(ret.message)
            }
        }.bind(this))

    }

    
    /** 
    *密码修改
    * @param mobile 账户
    * @param password 密码
    * @param passwordagain 二次密码
    * @param ver_code 验证码
    * @param ver_key  验证key
    */
   requestPasswordChange(password : string, passwordagain:string, securitycode : string,ver_code:string,ver_key:string, call? : Function ){
        let list = {};
        list["password"] = password;
        list["password_confirmation"] = passwordagain;
        list["security_code"] = securitycode;
        list["verification_code"] = ver_code;
        list["verification_key"] = ver_key;
        G_HttpHelper.httpPut(RequestEnum.PasswordChange,list, function(ret){
            //console.log("[注册]：返回数据",ret)    
            if(ret.status){
                //保存登陆名称，密码
            // this._userModel.userMobile = mobile;
            this._userModel.userPassword = password;
            this.requesPlayerData(function(){
                if(call){
                    call(ret)
                }
                });
            }else if(!ret.status){
                G_UiForms.hint(ret.message)
            }
        }.bind(this))

    }

    /**
     * 密码修改码验证
     * @param mobile 账户
     * @param password 
     * @param call 
     */
    requestPasswordChangeVCode(call? : Function ){
        G_HttpHelper.httpGet(RequestEnum.ChangeCode,function(ret){
            if(ret.status)
            {
                if(call)
                {
                    call(ret);
                }  
            }else
            {
                G_UiForms.hint(ret.message); 
            }
        }.bind(this))

    }


    /**
     * 手机注册码验证
     * @param mobile 账户
     * @param password 
     * @param call 
     */
    requestVerificationCode(mobile : string, call? : Function ){
        G_HttpHelper.httpPost(RequestEnum.RegisterCode,{
            mobile : mobile,
        }, function(ret){
            if(ret.status && ret.code== CODE.SUCCEED)
            {
                if(call)
                {
                    call(ret);
                }  
            }else
            {
                G_UiForms.hint(ret.message); 
            }
        }.bind(this))

    }


    /**
     * 密码重置码验证
     * @param mobile 账户
     * @param password 
     * @param call 
     */
    requestVerificationRecoveCode(mobile : string, call? : Function ){
        G_HttpHelper.httpPost(RequestEnum.ResetCode,{
            mobile : mobile,
        }, function(ret){
            if(ret.status && ret.code== CODE.SUCCEED)
            {
                if(call)
                {
                    call(ret);
                }  
            }else
            {
                G_UiForms.hint(ret.message); 
            }
        }.bind(this))

    }


    
    /**
     * 手机安全码验证
     * @param mobile 账户
     * @param password 
     * @param call 
     */
    requestSecurityVerificationCode(call? : Function ){
        G_HttpHelper.httpPost(RequestEnum.SecurityCode,null, function(ret){
            if(ret.status && ret.code== CODE.SUCCEED)
            {
                if(call)
                {
                    call(ret);
                }  
            }else
            {
                G_UiForms.hint(ret.message); 
            }
        }.bind(this))

    }


     /** 
    *修改安全码
    * @param mobile 账户
    * @param password 密码
    * @param passwordagain 二次密码
    * @param ver_code 验证码
    * @param ver_key  验证key
    */
   requestSecurityRecoverCode(password : string, passwordagain:string,ver_code:string,ver_key:string, call? : Function ){
    let list = {};
    list["security_code"] = password;
    list["security_code_confirmation"] = passwordagain;
    list["verification_key"] = ver_key;
    list["verification_code"] = ver_code;
    G_HttpHelper.httpPost(RequestEnum.Security,list, function(ret){
        console.log("[修改安全码]：返回数据",ret)    
        if(ret.status && ret.code == CODE.SUCCEED){
            if(call)
            {
                call(ret);
            }           
        }else if(!ret.status){
            G_UiForms.hint(ret.message)
        }
    }.bind(this))

}

 
    /**
     * 请求玩家信息 
     */
    requesPlayerData(call){
        if(!this._userModel.accessToken){
            G_UiForms.hint("请重新登陆！")
            return;
        }   
       this.sendnormalInfoPlaydata(call);
       //G_VipControl.requesVipData();
    }

    sendnormalInfoPlaydata(call){
        G_HttpHelper.httpGet(RequestEnum.Information, function(ret){
            console.log("[玩家信息]：1返回数据",ret); 
            if(ret.status && ret.code == CODE.SUCCEED)
            {
                this._userModel.userName = ret.data.nickname
                this._userModel.uid = ret.data.guid
                this._userModel.usePic =ret.data.avatar_id
               // console.log("pic "+this._userModel.usePic)
            }
           // G_OnFire.fire(EventRequest.HeadUpdata)          
            this.sendspecialPlayerData(call);
        }.bind(this))
    }

    sendspecialPlayerData(call){
        G_HttpHelper.httpGet(RequestEnum.DynamicInfo, function(ret){
            console.log("[玩家信息]：2返回数据",ret); 
            if(ret.status)
            {
                this._userModel.richrank =ret.data.rich_rank
                this._userModel.level = ret.data.level_deep
                this._userModel.balance = parseInt(ret.data.balance);
                this._userModel.exp = ret.data.experience
                this._userModel.score = ret.data.score
                //this._userModel.userVipLevel = ret.data.grade
                this._userModel.userVipLevel = 8
                this._userModel.vipweekly = ret.data.weekly_gift
                this._userModel.vippromotion = ret.data.promotion_gift
               // console.log("pic "+this._userModel.richrank)
            }
            if(call)
            {
                call(ret)
            }
            G_OnFire.fire(EventRequest.HeadUpdata)
           // G_OnFire.fire(uiEventFunction.colseBox)
        }.bind(this))
    }
   
    requesPlayerChange(name,pic,call){
        G_HttpHelper.httpPost(RequestEnum.UpdateInfo,{
            avatar:pic,
            nickname:name,
        }, function(ret){
            console.log("[更改信息]：1返回数据",ret); 
            if(ret.status)
            {
                this._userModel.userName = name
                this._userModel.usePic = pic
                G_OnFire.fire(EventRequest.HeadUpdata)
            }
            if(call)
            {
                call(ret)
            }
        }.bind(this))
    }
    
    /** 
    *刷新token
    */
   requestAccesstoken(call? : Function ){
    G_HttpHelper.httpPut(RequestEnum.RefreshToken,null, function(ret){
        console.log("[刷新token]：返回数据",ret)    
        if(ret.status){
            //保存登陆名称，密码
            this._userModel.accessToken = ret.data["access_token"];
            if(call){
                call(ret)
            }
        }
    }.bind(this));
}


   

    /**
     * 退出登陆
     */
    requesLoginOut(call){
        if(!this._userModel.accessToken){
            G_UiForms.hint("请重新登陆！")
            return;
        }
        G_HttpHelper.httpGet(RequestEnum.Logout, function(ret){
           // console.log("[退出登陆]：返回数据",ret)   
            if(ret.status && ret.code == CODE.SUCCEED){
                //保存登陆名称，密码
              //  this._userModel.userMobile = '';
                this._userModel.userPassword = '';
                this._userModel.accessToken = '';
                G_OnFire.fire(EventRequest.HeadUpdata)
                if(call)
                    call(ret);
            }else if(!ret.status){
                G_UiForms.hint(ret.message)
            }
        }.bind(this))
    }


}



export const G_UserControl = UserControl.Instance;
