
export enum CODE{
    /** 请求成功 */
    SUCCEED = 200,
    /** 请求失败 */
    FAILED = 500,
    /** token 过期时间 */
    TOKEN = 402,
}

export let BOX_TYPE = {
    BOX_NONE : 0,
    BOX_SMALL : 1,
    BOX_COM : 2,
}

export const LoginTab_Type = {
    login:0,   //登录tab
    register:1, //注册tab
    password:2, //找回密码tab
    line:3,    //切换线路tab
}


/**文字声明 表示当前字面意思  拼音*/
export const TEXT_INFO ={
    xiuGaiAnMa : 2, //修改安全码
    TX_bangding_quxiao_queding : 2
}

/**
 * 错误码
 */
export enum ERROR_KEY{
    /** 机器人等不正常客户禁止请求 */
    ROBOTS_ARE_NOT_NORMAL = 100000,
    /** 您没有访问权限 */
    NO_ACCESS_RIGHTS = 100001,
    /** 账号密码错误 */
    ACCOUNT_PASSWORD_ERROR = 100002

}
