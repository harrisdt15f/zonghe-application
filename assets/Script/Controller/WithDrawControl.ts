
import { G_UiForms } from "../Tool/UiForms";
import { G_HttpHelper } from "../Net/HttpHelper";
import { CODE } from "../Config/IdentifyKey";
import { PayConfig } from "../Config/PayConfig";
import { RequestEnum } from "../Config/RequestConfig";
import { WithDrawConfig } from "../Config/WithDrawConfig";
import { G_UserControl } from "./UserControl";


class WithDrawControl {
  
    public static readonly Instance : WithDrawControl = new WithDrawControl();

    private withDrawConfig : WithDrawConfig = null;


    constructor(){
        this.withDrawConfig = new WithDrawConfig();
    }

    public getConfig(){
        return this.withDrawConfig;
    }

    private bindAlipay = false;

    public isBindAliPay()
    {
        return this.bindAlipay;
    }

    private bindBank = false;

    public isBindBank()
    {
        return this.bindBank;
    }

    // Banks ="Banks",
    // AlipayBind ="AlipayBind",
    // AlipayBindFirst ="AlipayBindFirst",
    // BankBind ="BankBind",
    // BankBindFirst ="BankBindFirst",
    // Accounts ="Accounts",
    // AccountDel ="AccountDel",
    // DrawCheck ="DrawCheck",
    // WithDraw ="WithDraw",   

    GetMyAccountList(call)
    {
        if(this.getConfig().MyAccountList == null||this.getConfig().MyAccountList.length <= 0)
        {
            this.requesMyAccounts(call);
        }
        else
        {
            call();
        }
    }

    GetBanksList(call){
        if(this.getConfig().BankList == null||this.getConfig().BankList.length <= 0)
        {
            this.requesBanks(call);
        }
        else
        {
            call();
        }
    }

    /**
     * 系统支持的银行列表
     */
    requesBanks(call){      
        G_HttpHelper.httpGet(RequestEnum.Banks, function(ret){
           console.log("[系统支持的银行列表]：返回数据",ret)   
            if(ret.status){
                this.getConfig().BankList = ret.data;
                //console.log("ret.data   "+ret.data);
                if(call)
                {
                    call(ret);
                }
            }
        }.bind(this))
        
    }
    /**
     * 账户列表
     */
    requesMyAccounts(call){
        G_HttpHelper.httpGet(RequestEnum.Accounts, function(ret){
            console.log("[账户列表]：返回数据",ret)   
             if(ret.status){
                 this.getConfig().MyAccountList = ret.data;
                 this.checkBindType();
                 //console.log("ret.data   "+ret.data);
                 if(call)
                 {
                     call(ret);
                 }
             }
         }.bind(this))      
    }

    checkBindType(){
        let list =  this.getConfig().MyAccountList
        list.forEach(element => {
            if(element.code == "ALIPAY"){
                this.bindAlipay = true;
            }else
            {
                this.bindBank = true;
            }
        });
    }

    /**
     * 立刻提现-绑定支付宝
     */
    requesAlipayBind(name,account,call){      
        G_HttpHelper.httpPost(RequestEnum.AlipayBind,{"owner_name":name,"card_number":account},function(ret){
           console.log("绑定：返回数据",ret)   
            if(ret.status){
                console.log("0000");
                this.requesMyAccounts(call);
            }else
            {
                if(call)
                {
                    call(ret);
                }
            }
        }.bind(this))        
    }

    /**
     * 立刻提现-绑定支付宝首次
     */
    requesAlipayBindFirst(name,account,password,passwordAgain,call){      
        G_HttpHelper.httpPost(RequestEnum.AlipayBindFirst,
            {
                "owner_name":name,
                "card_number":account,
                "fund_password":password,
                "fund_password_confirmation":passwordAgain
            },  function(ret){
           console.log("绑定：返回数据",ret)   
           if(ret.status){
                this.requesMyAccounts(call);
            }else
            {
                if(call)
                {
                    call(ret);
                }
            }
        }.bind(this))        
    }

    /**
     * 立刻提现-绑定银行卡
     */
    requesBankBind(name,account,branch,code,bank_id,call){      
        G_HttpHelper.httpPost(RequestEnum.BankBind,
            {
                "owner_name":name,
                "card_number":account,
                "branch":branch,
                "code":code,
                "bank_id":bank_id
            },  function(ret){
           console.log("绑定：返回数据",ret)   
           if(ret.status){
                this.requesMyAccounts(call);
            }else
            {
                if(call)
                {
                    call(ret);
                }
            }
        }.bind(this))        
    }

    /**
     * 立刻提现-绑定银行卡首次
     */
    requesBankBindFirst(name,account,branch,code,bank_id,password,passwordAgain,call){      
        G_HttpHelper.httpPost(RequestEnum.BankBindFirst,
            {
                "owner_name":name,
                "card_number":account,
                "branch":branch,
                "code":code,
                "bank_id":bank_id,
                "fund_password":password,
                "fund_password_confirmation":passwordAgain
            },  function(ret){
           console.log("绑定：返回数据",ret)   
           if(ret.status){
                this.requesMyAccounts(call);
            }else
            {
                if(call)
                {
                    call(ret);
                }
            }
        }.bind(this))        
    }

    /**
     *  账户管理-账户删除
     */
    requesAccountDel(cardid,securityCode,name,vcode,vcodeKey,call){      
        G_HttpHelper.httpPost(RequestEnum.AccountDel,
            {
                "card_id":cardid,
                "security_code":securityCode,  
                "owner_name":name,
                "verification_code":vcode,    
                "verification_key":vcodeKey,     
            },  function(ret){
           console.log("账户删除：返回数据",ret)   
           if(ret.status){
                this.requesMyAccounts(call);
            }else
            {
                if(call)
                {
                    call(ret);
                }
            }
        }.bind(this))        
    }

        /**
     *  账户管理-账户删除获取手机验证码
     */
    requesAccountDelVcode(call){      
        G_HttpHelper.httpPost(RequestEnum.AccountDelCode,null,  function(ret){
           console.log("验证码：返回数据",ret)   
           if(call)
           {
               call(ret);
           }
        }.bind(this))        
    }


    /**
     *  检查是否设置取款密码
     */
    requesDrawCheck(call){      
        G_HttpHelper.httpGet(RequestEnum.DrawCheck,function(ret){
           console.log("检查是否设置取款密码：返回数据",ret)   
            if(ret.status){
                //console.log("ret.data   "+ret.data);
                if(call)
                {
                    call(ret);
                }
            }
        }.bind(this))        
    }

    /**
     *  提现
     */
    requesWithDraw(amount,bankid,password,call){      
        G_HttpHelper.httpPost(RequestEnum.WithDraw,
            {
                "amount":amount,
                "bank_id":bankid,
                "fund_password":password,             
            },  function(ret){
           console.log("提现：返回数据",ret)   
            if(ret.status){
                //console.log("ret.data   "+ret.data);
                G_UserControl.sendspecialPlayerData(call);
            }else
            {
                call(ret);
            }
        }.bind(this))        
    }
  
    /**
     *  提现记录
     */
    requesWithDrawRecord(call){      
        G_HttpHelper.httpPost(RequestEnum.WithDrawRecord,
            {
                "type":3,           
            },  function(ret){
           console.log("提现记录：返回数据",ret)   
            if(ret.status){
                this.getConfig().RecordList = ret.data.data;
                console.log("ret.data.data.length   "+ret.data.data.length);
                call(ret);
            }
        }.bind(this))        
    }

}

export const G_WithDrawControl = WithDrawControl.Instance;
