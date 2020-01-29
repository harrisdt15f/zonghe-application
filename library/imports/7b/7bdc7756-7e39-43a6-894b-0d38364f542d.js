"use strict";
cc._RF.push(module, '7bdc7dWfjlDpolLDTg2T1Qt', 'IdentifyKey');
// Script/Config/IdentifyKey.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CODE;
(function (CODE) {
    /** 请求成功 */
    CODE[CODE["SUCCEED"] = 200] = "SUCCEED";
    /** 请求失败 */
    CODE[CODE["FAILED"] = 500] = "FAILED";
    /** token 过期时间 */
    CODE[CODE["TOKEN"] = 402] = "TOKEN";
})(CODE = exports.CODE || (exports.CODE = {}));
exports.BOX_TYPE = {
    BOX_NONE: 0,
    BOX_SMALL: 1,
    BOX_COM: 2,
};
exports.LoginTab_Type = {
    login: 0,
    register: 1,
    password: 2,
    line: 3,
};
/**文字声明 表示当前字面意思  拼音*/
exports.TEXT_INFO = {
    xiuGaiAnMa: 2,
    TX_bangding_quxiao_queding: 2
};
/**
 * 错误码
 */
var ERROR_KEY;
(function (ERROR_KEY) {
    /** 机器人等不正常客户禁止请求 */
    ERROR_KEY[ERROR_KEY["ROBOTS_ARE_NOT_NORMAL"] = 100000] = "ROBOTS_ARE_NOT_NORMAL";
    /** 您没有访问权限 */
    ERROR_KEY[ERROR_KEY["NO_ACCESS_RIGHTS"] = 100001] = "NO_ACCESS_RIGHTS";
    /** 账号密码错误 */
    ERROR_KEY[ERROR_KEY["ACCOUNT_PASSWORD_ERROR"] = 100002] = "ACCOUNT_PASSWORD_ERROR";
})(ERROR_KEY = exports.ERROR_KEY || (exports.ERROR_KEY = {}));

cc._RF.pop();