
export const zh = {
    bankCardNameList : [
        "支付宝",
        "平安银行",
        "中国银行",
        "广发银行",
        "北京银行",
        "上海银行",
        "兴业银行",
        "华夏银行",
        "工商银行",
        "光大银行",
        "邮政储汇银行",
        "中信银行",
        "民生银行",
        "交通银行",
        "农业银行",
        "建设银行",
        "招商银行",
    ],
    accountTypeList : [
        "全部",
        "主账号转出",
        "转入主账号",
        "返水",
        "退佣",
        "代理收益",
        "平台分红",
        "契约分红",
        "平台日工资",
        "契约日工资",
        "充值",
        "提款",
        "活动",
        "红利",
    ],


    /**
     * 收款账户类型 -1全部 , 1 银行卡, 2 支付宝
     */
    withDrawTypeList:[
        "全部",
        "银行卡",  
        "支付宝",
    ],


    /** 
     * 全部
     * 申请中/待处理/待审核
     * 处理中
     * 拒绝/审核不通过/拒绝审核/手动失败
     * 已审核
     * 提款成功/线上提款成功
     * 手动成功/已人工转正
     * 回调失败/线上提款失败/三方提款失败
    */
    withDrawStateList:[   
        "全部",         
        "审核中",       
        "处理中",       
        "审核失败",     
        "已审核",       
        "已提款",       
        "提款失败",     
    ],

    payStateList:[   
        "全部",         
        "未支付",       // recharge_status = 0
        "已支付/审核中",   //recharge_status = 1 && status = 0
        "充值成功",        //recharge_status = 1 && status = 1
    ],  


    PleaseEnterYourAccountName : "请输入您的开户名",
    PleaseEnterTheAccountOpeningAddress : "请输入开户地址",
    BankAccount:"银行卡号：",
    PleaseEnterTheBankCardNumber: "请输入银行卡号",
    PleaseEnterYourAlipayUserName:"请输入您的支付宝用户名",
    AlipayAccount:"支付宝账号：",
    PleaseEnterAlipayAccount : "请输入支付宝账号",
    PleaseEnterTheAlipayAccountAgain : "请再次输入支付宝账号",
    PleaseEnterWithDrawPassCode:"请设置取款密码",
    PleaseEnterWithDrawPassCodeAgain:"二次确认取款密码",
    gameType:[
        "全部",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
    ],

    fafangleixing:[
        "全部",
        "分红",
        "差额佣金",
        "日工资",
    ],
    fafangzhuangtai:[
        "全部",
        "未发放",
        "已发放",
        "发放失败"
    ],
    second : "秒",
    minute : "分",
    hour : "时",
    year : "年",
    month : "月",
    day : "日",
    ToSignIn :"待签到",
    DidNotSignIn:"未签到",
    AlreadySignedIn:"已签到",
    
    firstList :[
        "平台已开启无限代理赚差额佣金模式\n一次推广，终生受益，躺着也能赚佣金\n无线代理佣金制制度表",
        "直属业绩：直属的意思是代理本人邀请的下级玩家；例如：A邀请了B，B就是A的直属。\nB的流水就等于它产生的直属业绩 ",
        "团队业绩：例如A邀请B，B邀请C，C邀请D；那么ABCD4个人就是一个团队；A团队的成员\nBCD3个人所有的业绩都是A的团队业绩。比如：B的业绩是20万，C的业绩是10，D的业绩是\n5万，那么A的团队业绩就是35万。",
        "无限代佣一天结算一次。",
        "注：自己的流水只能给上级产生佣金，不能给自己产生佣金",
    ],

    agencyLevelList:[
        "会员",
        "资深会员",
        "代理",
        "高级代理",
        "超级代理",
        "总代理",
        "超级总代理",
        "总监",
        "超级总监",
        "股东",
        "大股东",
        "超级大股东",
        "董事长",
    ],


    vipUpgradeText :"还需充值{0}升级到",
    pleaseEnterInteger:"请输入整数!",
    tipsText : "提示，你什么都没有操作",

    signinsucceed : "签到成功！",
    getsucceed : "领取成功！",
    havesucceedTip : "已领取过",
    Membership : "会员专属",
    currMembership: "当前会员专属",
    PleaseLogInFirst :"未登陆，请您先登陆！",
    AccountIsEmpty : "账户错误，请重新输入！",
    PasswordIsEmpty :　"密码错误，请重新输入！",
    PasswordAgainDifference :　"两次密码输入不一致,请重新输入",    
    securityisEmpty : "安全码错误，请重新输入！",
    PhoneFormatWrong: "手机号码格式有误",
    copySucceed : "复制成功",
    verificationIsEmpty: "验证码不能为空",  //手机验证码
    verificationCodeSend: "已发送",  //手机验证码已发送
    registerSuccess : "注册成功! ",   //注册成功
    revisionSuccess : "修改成功! ",   //密码修改成功    
    recoverSuccess : "密码找回成功! ",   //密码找回成功
    securityCodeSuccess : "安全码设置成功! ",   //安全码设置成功   
    nameChangeSuccess : "改名成功! ",   //改名成功  
    rank_title1:"盈利榜",
    rank_title2:"富豪榜",
    payMinTip:"单笔充值金额不得低于",
    payMaxTip:"单笔充值金额不得高于",
    payMoneyInput:"请输入金额",
    payLeftTime:"转账倒计时:",
    payTrueTip:"订单已提交",
    bindEmpty:"您还未绑定银行卡，不能取款",
    withDrawing:"提现已申请",
    nameEmpty:"名字不能为空",
    accountEmpty:"账号不能为空",
    bindSuccess:"绑定成功",
    balanceError:"金额输入有误",
    balanceLess:"账户余额不足",
    delSuccess:"删除成功",
    nameError:"姓名输入有误",
    accountNameInput:"请输入该账户姓名",
    serurityInput:"请输入安全码",
    vcodeInput:"请输入验证码",

    accountType_all:"全部",
    accountType_recharge:"充值",
    accountType_point_from_child:"下级返点",
    accountType_game_bonus:"游戏奖金",
    accountType_cancel_order:"撤单返款",   
    accountType_gift:"活动礼金",
    accountType_recharge_from_parent:"上级充值",
    accountType_system_claim:"系统活动转账",
    accountType_day_salary:"日工资",
    accountType_dividend_from_parent:"上级分红",
    accountType_withdraw_un_frozen:"提现解冻",
    accountType_withdraw_frozen:"提现冻结",
    accountType_withdraw_finish:"提现成功",
    accountType_bet_cost:"投注扣款",
    accountType_trace_cost:"追号冻结",
    accountType_real_cost:"真实扣款",
    accountType_cancel_point:"撤销返点",
    accountType_cancel_bonus:"撤销派奖",
    accountType_cancel_fee:"撤单手续费",
    accountType_recharge_to_child:"为下级充值",
    accountType_system_reduce:"系统扣减",
    accountType_dividend_to_child:"分红给下级",
    accountType_bonus_limit_reduce:"奖金限额扣除",
    accountType_artificial_recharge:"人工充值",
    accountType_artificial_deduction:"人口扣款",
    accountType_bet_commission:"投注返点",
    accountType_commission:"下级投注返佣",
    accountType_trace_un_frozen:"追号解冻",
    accountType_trace_refund:"追号返款",
    accountType_casino_in:"转入娱乐城",
    accountType_casino_to:"娱乐城转入平台",


}

