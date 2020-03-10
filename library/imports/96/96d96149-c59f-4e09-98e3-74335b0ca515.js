"use strict";
cc._RF.push(module, '96d96FJxZ9OCZjjdDNbDKUV', 'PromoteConfig');
// Script/Config/PromoteConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Language_1 = require("../Language/Language");
var PromoteConfig = /** @class */ (function () {
    function PromoteConfig() {
        // --------------------------- 推广收益  下属层级下拉列表 对应配置  ------------------------------- 
        /**
         * account_type:
         * 下属层级类型 -1全部 , 1 一级, 2 二级,  3 三级
         */
        this.underLabelConfig = {
            0: { "name": "underLevelAll", index: -1 },
            1: { "name": "underLevelFirst", index: 1 },
            2: { "name": "underLevelTwo", index: 2 },
            3: { "name": "underLevelThird", index: 3 },
        };
        this.underLabelNameList = [];
        //推广收益列表
        //  private _porRewardList:[] = null;
        //  public get ProRewardList(){
        //      return this._porRewardList;
        //  }
        //  public set ProRewardList(data:[]){
        //      this._porRewardList = data;
        //  }   
        this.ProRewardList = [];
        //洗码收益列表
        //  private _washRewardList:[] = null;
        //  public get WashRewardList(){
        //      return this._washRewardList;
        //  }
        //  public set WashRewardList(data:[]){
        //      this._washRewardList = data;
        //  }   
        this.WashRewardList = [];
        //     /** 
        //      * status:
        //      * -1全部
        //      * 0申请中/待处理/待审核
        //      * 1处理中
        //      * 2拒绝/审核不通过/拒绝审核/手动失败
        //      * 3已审核
        //      * 4提款成功/线上提款成功
        //      * 5手动成功/已人工转正
        //      * 6回调失败/线上提款失败/三方提款失败
        //     */
        //     withDrawStateConfig  = {
        //         0:{"name":"全部","status":-1},
        //         1:{"name":"审核中","status":0},
        //         2:{"name":"处理中","status":1},
        //         3:{"name":"审核失败","status":2},
        //         4:{"name":"已审核","status":3},
        //         5:{"name":"已提款","status":4},   //提款状态下拉列表中。 类型4 和类型5 合为一个下拉选项，都是提款成功
        //         6:{"name":"提款失败","status":6},
        //     }
        //    // --------------------------- end ------------------------------- 
        //      /** 服务器配置
        //      * status:
        //      * 0申请中/待处理/待审核
        //      * 1处理中
        //      * 2拒绝/审核不通过/拒绝审核/手动失败
        //      * 3已审核
        //      * 4提款成功/线上提款成功
        //      * 5手动成功/已人工转正
        //      * 6回调失败/线上提款失败/三方提款失败
        //     */  
        //    ServerStateConfig  = {
        //         0:{"name":"审核中",},
        //         1:{"name":"处理中",},
        //         2:{"name":"审核失败",},
        //         3:{"name":"已审核",},
        //         4:{"name":"已提款",},   
        //         5:{"name":"已提款",},
        //         6:{"name":"提款失败",},
        //     }
        //     /**  服务器配置
        //      * account_type:
        //      * 收款账户类型  1 银行卡, 2 支付宝
        //      */
        //     ServerTypeConfig  = {
        //         1:{"name":"银行卡",},
        //         2:{"name":"支付宝",},
        //     }
        //     /** 
        //     * _type = -1 查询全部,    1 银行卡,    2 支付宝
        //     * _state = -1 查询全部，   
        //     *           0申请中/待处理/待审核
        //                 1处理中
        //                 2拒绝/审核不通过/拒绝审核/手动失败
        //                 3已审核
        //                 4提款成功 (线上)
        //                 5手动成功 (线下)
        //                 6回调失败/线上提款失败/三方提款失败
        //     **/
        //     public getRecordListInfo(_type,_state,beginTime,endTime){
        //         if(this.RecordList == null || this.RecordList.length <= 0)
        //         {
        //             return [];
        //         }
        //         let list = [];
        //         this.RecordList.forEach(item=>{
        //             let curTime = Date.parse(item.created_at)
        //             // console.log("curTime  ",curTime);
        //             // console.log("beginTime  ",beginTime);
        //             // console.log("endTime  ",endTime);
        //             if(curTime >= beginTime && curTime <= endTime)
        //             {
        //                 if(_type < 0)
        //                 {
        //                     if(_state < 0)
        //                     {
        //                         list.push(item);
        //                     }else if(item["status"] == _state)
        //                     {
        //                         list.push(item);
        //                     }else if(_state == 4 && item["status"] == 5)      //提款状态下拉列表中。 类型4 和类型5 合为一个下拉选项，都是提款成功
        //                     {
        //                         list.push(item);
        //                     }
        //                     else if(_state == 5 && item["status"] == 4)      //提款状态下拉列表中。 类型4 和类型5 合为一个下拉选项，都是提款成功
        //                     {
        //                         list.push(item);
        //                     }
        //                 }else if(item["account_type"] == _type)
        //                 {
        //                     if(_state < 0)
        //                     {
        //                         list.push(item);
        //                     }else if(item["status"] == _state)
        //                     {
        //                         list.push(item);
        //                     }else if(_state == 4 && item["status"] == 5)
        //                     {
        //                         list.push(item);
        //                     }
        //                     else if(_state == 5 && item["status"] == 4)
        //                     {
        //                         list.push(item);
        //                     }
        //                 }else
        //                 {
        //                     //empty
        //                 }  
        //             }
        //         });
        //         return list;
        //     }
        //     //支持的银行列表
        //     private _bankList:[] = null;
        //     public get BankList(){
        //         return this._bankList;
        //     }
        //     public set BankList(data:[]){
        //         this._bankList = data;
        //     }
        //     //绑定的账户
        //     private _accountList:[] = null;
        //     public get MyAccountList(){
        //         return this._accountList;
        //     }
        //     public set MyAccountList(data:[]){
        //         this._accountList = data;
        //     }
        //      //提现记录列表
        //      private _recordList:[] = null;
        //      public get RecordList(){
        //          return this._recordList;
        //      }
        //      public set RecordList(data:[]){
        //          this._recordList = data;
        //      }   
    }
    /**
     *
     * @param index  小于0 传list, 大于 0 传指定 item
     */
    PromoteConfig.prototype.getCurUnderLabelStr = function (index) {
        if (this.underLabelNameList.length <= 0) {
            for (var i = 0; i < 4; i++) {
                var con = this.underLabelConfig[i];
                var str = Language_1.G_Language.get(con.name);
                console.log("str   ", str);
                this.underLabelNameList.push(str);
            }
        }
        if (index < 0) {
            return this.underLabelNameList;
        }
        if (this.underLabelNameList.length > index) {
            return this.underLabelNameList[index];
        }
        return "";
    };
    /**
     * 推广收益数据list
     * @param _type 代理层级
     * @param beginTime 开始时间
     * @param endTime  结束时间
     */
    PromoteConfig.prototype.getProRewardListInfo = function (_type, beginTime, endTime) {
        //假数据
        if (this.ProRewardList.length <= 0) {
            var a = { "id": 34323, "level": 1, "score": -3434, "reward": 55, "created_at": "2020-03-04 19:44:52", };
            var b = { "id": 543, "level": 2, "score": 234.54, "reward": 0, "created_at": "2020-03-05 08:08:26", };
            var c = { "id": 323, "level": 1, "score": -6556.322, "reward": 122.343, "created_at": "2020-02-15 11:59:35", };
            var d = { "id": 353, "level": 1, "score": 4232, "reward": 0, "created_at": "2020-03-04 22:41:26", };
            var e = { "id": 2343, "level": 2, "score": -1111.343, "reward": 665.2321, "created_at": "2020-02-28 19:21:21", };
            var f = { "id": 765, "level": 1, "score": 4545, "reward": 0, "created_at": "2020-02-02 19:33:00", };
            var g = { "id": 11, "level": 1, "score": 433, "reward": 0, "created_at": "2020-02-02 19:33:00", };
            var h = { "id": 22, "level": 1, "score": 234, "reward": 0, "created_at": "2020-02-22 11:23:00", };
            var j = { "id": 54, "level": 2, "score": -133, "reward": 4, "created_at": "2020-02-09 21:11:00", };
            var k = { "id": 34, "level": 3, "score": -10000, "reward": 200, "created_at": "2020-03-02 18:34:00", };
            this.ProRewardList.push(a);
            this.ProRewardList.push(b);
            this.ProRewardList.push(c);
            this.ProRewardList.push(d);
            this.ProRewardList.push(e);
            this.ProRewardList.push(f);
            this.ProRewardList.push(g);
            this.ProRewardList.push(h);
            this.ProRewardList.push(j);
            this.ProRewardList.push(k);
        }
        if (this.ProRewardList == null || this.ProRewardList.length <= 0) {
            return [];
        }
        console.log("this.ProRewardList.length     ", this.ProRewardList.length);
        // console.log("_type     ",_type);
        // console.log("beginTime     ",beginTime);
        // console.log("endTime     ",endTime);
        var list = [];
        this.ProRewardList.forEach(function (item) {
            var curTime = Date.parse(item.created_at);
            if (curTime >= beginTime && curTime <= endTime) {
                if (_type <= 0) {
                    list.push(item);
                }
                else if (item["level"] == _type) {
                    list.push(item);
                }
                else {
                    //empty
                }
            }
        });
        return list;
    };
    /**
     * 洗码收益数据list
     * @param beginTime 开始时间
     * @param endTime  结束时间
     */
    PromoteConfig.prototype.getWashRewardListInfo = function (beginTime, endTime) {
        //假数据
        if (this.WashRewardList.length <= 0) {
            var a = { "name": "AA平台", "bet": 2322.2, "pro": 0.05, "money": 25, "created_at": "2020-03-05 08:08:26", };
            var b = { "name": "BB平台", "bet": 222.455, "pro": 0.05, "money": 55, "created_at": "2020-03-04 22:41:26", };
            var c = { "name": "CC平台", "bet": 5422.3, "pro": 0.05, "money": 15, "created_at": "2020-02-02 19:33:00", };
            var d = { "name": "DD平台", "bet": 236542.1, "pro": 0.05, "money": 456, "created_at": "2020-03-05 14:44:52", };
            var e = { "name": "AA平台", "bet": 5322.244, "pro": 0.05, "money": 25, "created_at": "2020-02-15 11:59:35", };
            var f = { "name": "AC平台", "bet": 232565.0, "pro": 0.05, "money": 33, "created_at": "2020-02-02 19:33:02", };
            var g = { "name": "BD平台", "bet": 6666, "pro": 0.05, "money": 88, "created_at": "2020-03-04 19:44:52", };
            var h = { "name": "FF平台", "bet": 0, "pro": 0.05, "money": 0, "created_at": "2020-03-01 16:04:12", };
            var j = { "name": "TT平台", "bet": 5433, "pro": 0.05, "money": 45, "created_at": "2020-02-09 21:11:00", };
            var k = { "name": "TS平台", "bet": 1233, "pro": 0.05, "money": 15, "created_at": "2020-03-02 18:34:00", };
            this.WashRewardList.push(a);
            this.WashRewardList.push(b);
            this.WashRewardList.push(c);
            this.WashRewardList.push(d);
            this.WashRewardList.push(e);
            this.WashRewardList.push(f);
            this.WashRewardList.push(g);
            this.WashRewardList.push(h);
            this.WashRewardList.push(j);
            this.WashRewardList.push(k);
        }
        if (this.WashRewardList == null || this.WashRewardList.length <= 0) {
            return [];
        }
        console.log("this.WashRewardList.length     ", this.WashRewardList.length);
        // console.log("beginTime     ",beginTime);
        // console.log("endTime     ",endTime);
        var list = [];
        this.WashRewardList.forEach(function (item) {
            var curTime = Date.parse(item.created_at);
            if (curTime >= beginTime && curTime <= endTime) {
                list.push(item);
            }
        });
        return list;
    };
    return PromoteConfig;
}());
exports.PromoteConfig = PromoteConfig;

cc._RF.pop();