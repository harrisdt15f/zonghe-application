


/**
 * 语言 zh 中文  en 英语
 */
export const LANGUAGE = "zh"


export const URL = "http://api.jianghu.local"
//export const URL = "http://api.jianghu.local"

//export const URL = "ws://10.10.50.117"

export const DNS = "app.jianghu.com"    //内
//export const DNS = "app.397017.com"   //外

export const PORT = "80"



// export const URL = "ws://www.baidu.com/"

/**
 * 头像个数
 */
export const  headNum : number = 17;

/** 是否需要登陆 */
export const IS_LOGIN :　boolean = false;


export enum BANK_CARD_NAME {
    ZFB = 0,
    PAYH = 1,
    ZGYH = 2,
    GFYH = 3,
    BJYH = 4,
    SHYH = 5,
    XYYH = 6,
    HXYH = 7,
    GSYH = 8,
    GDYH = 9,
    YZCHYH = 10,
    ZXYH = 11,
    MSYH = 12,
    JTYH = 13,
    NYYH = 14,
    JSYH = 15,
    ZSYH = 16,
}


export enum ACCOUNT_TYPE{
    NONE = -1,
    ALIPAY = 0,
    BANK = 1,
}



export enum RewardType{
    none = 0,
    iphone = 1,
    macbook = 2,
    iwatch = 3,
    car = 4,
    gold = 5,
}

export enum signInType{
    none = 0,//未
    now = 1,//待
    past = 2,//已

}

