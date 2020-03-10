"use strict";
cc._RF.push(module, 'f5d3bDc3MdKBIm6I2nbb2yw', 'PromoteControl');
// Script/Controller/PromoteControl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromoteConfig_1 = require("../Config/PromoteConfig");
var PromoteControl = /** @class */ (function () {
    function PromoteControl() {
        this.promoteConfig = null;
        this.promoteConfig = new PromoteConfig_1.PromoteConfig();
    }
    PromoteControl.prototype.getConfig = function () {
        return this.promoteConfig;
    };
    /**
     * 请求 推广收益msg
     * @param call
     */
    PromoteControl.prototype.requesProRewardMsg = function (call) {
        // G_HttpHelper.httpPost(RequestEnum.AccountRecord,
        //     {
        //         "type":1,           
        //     },  function(ret){
        //    console.log("推广收益：返回数据",ret)   
        //     if(ret.status){
        //         this.getConfig().ProRewardList = ret.data.data;
        //         console.log("ret.data.data.length   "+ret.data.data.length);
        //         call(ret);
        //     }
        // }.bind(this))        
    };
    /**
     * 请求 洗码收益msg
     * @param call
     */
    PromoteControl.prototype.requesWashRewardMsg = function (call) {
        // G_HttpHelper.httpPost(RequestEnum.AccountRecord,
        //     {
        //         "type":1,           
        //     },  function(ret){
        //    console.log("洗码收益：返回数据",ret)   
        //     if(ret.status){
        //         this.getConfig().WashRewardList = ret.data.data;
        //         console.log("ret.data.data.length   "+ret.data.data.length);
        //         call(ret);
        //     }
        // }.bind(this))        
    };
    PromoteControl.Instance = new PromoteControl();
    return PromoteControl;
}());
exports.G_PromoteControl = PromoteControl.Instance;

cc._RF.pop();