"use strict";
cc._RF.push(module, 'd42dcosEURETJKxGfXqOTBo', 'config');
// Script/Config/config.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 语言 zh 中文  en 英语
 */
exports.LANGUAGE = "zh";
exports.URL = "http://api.jianghu.local";
//export const URL = "http://api.jianghu.local"
//export const URL = "ws://10.10.50.117"
exports.DNS = "app.jianghu.com"; //内
//export const DNS = "app.397017.com"   //外
exports.PORT = "80";
// export const URL = "ws://www.baidu.com/"
/**
 * 头像个数
 */
exports.headNum = 17;
/** 是否需要登陆 */
exports.IS_LOGIN = false;
var BANK_CARD_NAME;
(function (BANK_CARD_NAME) {
    BANK_CARD_NAME[BANK_CARD_NAME["ZFB"] = 0] = "ZFB";
    BANK_CARD_NAME[BANK_CARD_NAME["PAYH"] = 1] = "PAYH";
    BANK_CARD_NAME[BANK_CARD_NAME["ZGYH"] = 2] = "ZGYH";
    BANK_CARD_NAME[BANK_CARD_NAME["GFYH"] = 3] = "GFYH";
    BANK_CARD_NAME[BANK_CARD_NAME["BJYH"] = 4] = "BJYH";
    BANK_CARD_NAME[BANK_CARD_NAME["SHYH"] = 5] = "SHYH";
    BANK_CARD_NAME[BANK_CARD_NAME["XYYH"] = 6] = "XYYH";
    BANK_CARD_NAME[BANK_CARD_NAME["HXYH"] = 7] = "HXYH";
    BANK_CARD_NAME[BANK_CARD_NAME["GSYH"] = 8] = "GSYH";
    BANK_CARD_NAME[BANK_CARD_NAME["GDYH"] = 9] = "GDYH";
    BANK_CARD_NAME[BANK_CARD_NAME["YZCHYH"] = 10] = "YZCHYH";
    BANK_CARD_NAME[BANK_CARD_NAME["ZXYH"] = 11] = "ZXYH";
    BANK_CARD_NAME[BANK_CARD_NAME["MSYH"] = 12] = "MSYH";
    BANK_CARD_NAME[BANK_CARD_NAME["JTYH"] = 13] = "JTYH";
    BANK_CARD_NAME[BANK_CARD_NAME["NYYH"] = 14] = "NYYH";
    BANK_CARD_NAME[BANK_CARD_NAME["JSYH"] = 15] = "JSYH";
    BANK_CARD_NAME[BANK_CARD_NAME["ZSYH"] = 16] = "ZSYH";
})(BANK_CARD_NAME = exports.BANK_CARD_NAME || (exports.BANK_CARD_NAME = {}));
var ACCOUNT_TYPE;
(function (ACCOUNT_TYPE) {
    ACCOUNT_TYPE[ACCOUNT_TYPE["NONE"] = -1] = "NONE";
    ACCOUNT_TYPE[ACCOUNT_TYPE["ALIPAY"] = 0] = "ALIPAY";
    ACCOUNT_TYPE[ACCOUNT_TYPE["BANK"] = 1] = "BANK";
})(ACCOUNT_TYPE = exports.ACCOUNT_TYPE || (exports.ACCOUNT_TYPE = {}));
var RewardType;
(function (RewardType) {
    RewardType[RewardType["none"] = 0] = "none";
    RewardType[RewardType["iphone"] = 1] = "iphone";
    RewardType[RewardType["macbook"] = 2] = "macbook";
    RewardType[RewardType["iwatch"] = 3] = "iwatch";
    RewardType[RewardType["car"] = 4] = "car";
    RewardType[RewardType["gold"] = 5] = "gold";
})(RewardType = exports.RewardType || (exports.RewardType = {}));
var signInType;
(function (signInType) {
    signInType[signInType["none"] = 0] = "none";
    signInType[signInType["now"] = 1] = "now";
    signInType[signInType["past"] = 2] = "past";
})(signInType = exports.signInType || (exports.signInType = {}));

cc._RF.pop();