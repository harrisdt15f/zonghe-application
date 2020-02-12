export enum RequestEnum{
    //1
    Avatar ="Avatar",
    //2
    Login ="Login",
    Logout ="Logout",
    RefreshToken ="RefreshToken",
    Register ="Register",
    RegisterCode ="RegisterCode",
    PasswordReset ="PasswordReset",
    ResetCode ="ResetCode",
    CurrentSSL ="CurrentSSL",
    PasswordChange ="PasswordChange",
    ChangeCode ="ChangeCode",
    //3
    Rich ="Rich",
    Profit ="Profit",
    GameCategories ="GameCategories",
    GameList ="GameList",
    //4
    Information ="Information",
    DynamicInfo ="DynamicInfo",
    UpdateInfo ="UpdateInfo",
    VIP ="VIP",
    Promotion ="Promotion",
    Weekly ="Weekly",
    //5
    Banks ="Banks",
    Alipay ="Alipay",
    BandBind ="BandBind",
    Accounts ="Accounts",
    AccountDel ="AccountDel",
    //6
    Security ="Security",
    SecurityCode ="SecurityCode",
    //7
    RechargeType ="RechargeType",
    Channels ="Channels",
    Recharge ="Recharge",
    PayInfo = "PayInfo",
}

export  class RequestConfig {

    private requestList = {
        //1
        Avatar : {url:"/app-api/system/avatar",cdTime:10,sendTime:0,},
        //2
        Login : {url:"/app-api/login",cdTime:3,sendTime:0,},
        Logout : {url:"/app-api/user/logout",cdTime:3,sendTime:0,},
        RefreshToken : {url:"/app-api/user/refresh-token",cdTime:10,sendTime:0,},
        Register : {url:"/app-api/register",cdTime:3,sendTime:0,},
        RegisterCode : {url:"/app-api/register/verification-code",cdTime:3,sendTime:0,},
        PasswordReset : {url:"/app-api/user/password-reset",cdTime:3,sendTime:0,},
        ResetCode : {url:"/app-api/password-reset/verification-code",cdTime:3,sendTime:0,},
        CurrentSSL  : {url:"/app-api/platform/current-ssl",cdTime:3,sendTime:0,},
        PasswordChange : {url:"/app-api/user/password-change",cdTime:3,sendTime:0,},
        ChangeCode : {url:"/app-api/password/change-code",cdTime:3,sendTime:0,},
        //3
        Rich : {url:"/app-api/games-lobby/rich-list",cdTime:3,sendTime:0,},
        Profit : {url:"/app-api/games-lobby/profit-list",cdTime:3,sendTime:0,},
        GameCategories : {url:"/app-api/games-lobby/game-categories",cdTime:3,sendTime:0,},
        GameList : {url:"/app-api/games-lobby/game-list",cdTime:3,sendTime:0,},
        //4
        Information : {url:"/app-api/user/information",cdTime:3,sendTime:0,},
        DynamicInfo : {url:"/app-api/user/dynamic-information",cdTime:3,sendTime:0,},
        UpdateInfo : {url:"/app-api/user/information",cdTime:0,sendTime:0,},
        VIP : {url:"/app-api/user/grades",cdTime:3,sendTime:0,},
        Promotion : {url:"/app-api/user/promotion-gifts",cdTime:3,sendTime:0,},
        Weekly : {url:"/app-api/user/weekly-gifts",cdTime:3,sendTime:0,},
        //5
        Banks : {url:"/app-api/system/banks",cdTime:3,sendTime:0,},
        Alipay : {url:"/app-api/account/alipay/save",cdTime:3,sendTime:0,},
        BandBind : {url:"/app-api/account/bank-card/save",cdTime:3,sendTime:0,},
        Accounts : {url:"/app-api/account/list",cdTime:3,sendTime:0,},
        AccountDel : {url:"/app-api/account/destroy",cdTime:3,sendTime:0,},
        //6
        Security : {url:"/app-api/user/security-code",cdTime:3,sendTime:0,},
        SecurityCode : {url:"/app-api/security-verification-code",cdTime:3,sendTime:0,},
        //7
        RechargeType : {url:"/app-api/recharge/types",cdTime:3,sendTime:0,},
        Channels : {url:"/app-api/recharge/channels",cdTime:3,sendTime:0,},
        Recharge : {url:"/app-api/recharge/recharge",cdTime:3,sendTime:0,},
        PayInfo : {url:"/app-api/recharge/get-finance-info",cdTime:5,sendTime:0,},

    }

    public getURL(str)
    {
        return this.requestList[str].url;
    }

    //  true--> 冷却中   
    public isCD(str)
    {
        let member = this.requestList[str]
        console.log(str,"  cd ------------->  ",Math.floor((member.cdTime - (Date.parse(new Date().toString()) - member.sendTime))/1000))
        if(member.sendTime <= 0)
        {
            this.setSendTime(str,Date.parse(new Date().toString()));
            return false ;
        }

        if((Date.parse(new Date().toString()) - member.sendTime) >= (member.cdTime*1000))
        {
            this.setSendTime(str,Date.parse(new Date().toString()));
            return false;
        }
        return true;
    }

    public setSendTime(str,number)
    {
        let member = this.requestList[str]
        member.sendTime = number;
    }
  
}
