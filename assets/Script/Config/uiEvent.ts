

/**
 * 按钮 点击注册事件
 */
// 点击结束  cc.Node.EventType.TOUCH_END 
// 点击开始  cc.Node.EventType.TOUCH_START
// 点击  cc.Node.EventType.TOUCH_MOVE
// 点击  cc.Node.EventType.TOUCH_CANCEL

//配置功能
export const uiEventModules = {
    /**默认值 没有模块 0*/
    none : "none",
    /**商店中心 1*/
    shopNode : "shopNode",
    /** 提现 2*/
    withdrawNode : "withdrawNode",
    /**推广 3*/
    generalizeNode : "generalizeNode",
    /** 玩家中心 4*/
    playerCenterNode : "playerCenterNode",
    /**活动 5*/
    activityNode : "activityNode",
    /**消息 6*/
    messageNode : "messageNode",
    /**公告 7*/
    NoticeNode : "NoticeNode",
    /**设置 8*/
    setNode : "setNode",
    /** 头像设置 9*/
    headSetNode : "headSetNode", 
    /** 登陆 10*/
    landingNode : "landingNode",
    /** 消息读取 11*/
    readMessageNode:"readMessageNode",
    /** 修改昵称 12*/
    alterNameNode:"alterNameNode",
    /** 客服 13*/
    serviceNode:"serviceNode",
}

//功能事件操作
export const uiEventFunction={
    none : "none",
    funcSetNodeShow : "funcSetNodeShow",
    /** 二级界面关闭 */
    secondaryInterface : "secondaryInterface",

    colseBox : "colseBox",

    /** 提现界面操作 */
    manage : "manage",
    atOnceManage:"atOnceManage",

    /** 修改名字 */
    // rename_event : "rename_event",

    /** 抢红包 奖励展示 关闭 */
    awardClose : "awardClose",

}

//msg 消息推送
export const EventRequest = {
    HeadUpdata : "loginUserHeadUpdata",
}


