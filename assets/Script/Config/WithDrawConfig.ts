import { G_Utils } from "../Tool/Utils";


export  class WithDrawConfig {
    private payTabAtlasList = {
        "ALIPAY":{"name":"支付宝","nameSprite":"yh0","image":"zfb_panel"},
        "PBC":{"name":"中国人民银行","nameSprite":"","image":"yh_panel"},
        "CCB":{"name":"中国建设银行","nameSprite":"yh15","image":"yh_panel"},
        "ABC":{"name":"中国农业银行","nameSprite":"yh14","image":"yh_panel"},
        "ICBC":{"name":"中国工商银行","nameSprite":"yh8","image":"yh_panel"},
        "BOC":{"name":"中国银行","nameSprite":"yh2","image":"yh_panel"},
        "CMBC":{"name":"中国民生银行","nameSprite":"yh12","image":"yh_panel"},
        "CMB":{"name":"招商银行","nameSprite":"yh16","image":"yh_panel"},
        "CIB":{"name":"兴业银行","nameSprite":"yh6","image":"yh_panel"},
        "BCOM":{"name":"交通银行","nameSprite":"yh13","image":"yh_panel"},
        "BOB":{"name":"北京银行","nameSprite":"yh4","image":"yh_panel"},
        "CITIC":{"name":"中信银行","nameSprite":"yh11","image":"yh_panel"},
        "GDB":{"name":"广东发展银行","nameSprite":"","image":"yh_panel"},
        "SPDB":{"name":"上海浦东发展银行","nameSprite":"","image":"yh_panel"},
        "SDB":{"name":"深圳发展银行","nameSprite":"","image":"yh_panel"},
        "CDB":{"name":"国家开发银行","nameSprite":"","image":"yh_panel"},
        "HSBC":{"name":"汇丰银行","nameSprite":"","image":"yh_panel"},
        "HXB":{"name":"华夏银行","nameSprite":"","image":"yh_panel"},
        "CEB":{"name":"中国光大银行","nameSprite":"yh9","image":"yh_panel"},
        "PSBC":{"name":"中国邮政储蓄银行","nameSprite":"yh10","image":"yh_panel"},
        "BOS":{"name":"上海银行","nameSprite":"yh5","image":"yh_panel"},
        "EXIMBANK":{"name":"中国进出口银行","nameSprite":"yh14","image":"yh_panel"},
        "ADBC":{"name":"中国农业发展银行","nameSprite":"","image":"yh_panel"},
        "EGBANK":{"name":"恒丰银行","nameSprite":"","image":"yh_panel"},
        "CZB":{"name":"浙商银行","nameSprite":"","image":"yh_panel"},
        "HKBEA":{"name":"东亚银行","nameSprite":"","image":"yh_panel"},
        "HANGSENG":{"name":"恒生银行","nameSprite":"","image":"yh_panel"},
        "HCCB":{"name":"杭州银行","nameSprite":"","image":"yh_panel"},
        "NJCB":{"name":"南京银行","nameSprite":"","image":"yh_panel"},
        "BRCB":{"name":"北京农村商业银行","nameSprite":"","image":"yh_panel"},
        "NBBANK":{"name":"宁波银行","nameSprite":"","image":"yh_panel"},
        "BOHAIB":{"name":"渤海银行","nameSprite":"","image":"yh_panel"},
        "DLB":{"name":"大连银行","nameSprite":"","image":"yh_panel"},
        "HSBANK":{"name":"徽商银行","nameSprite":"","image":"yh_panel"},

    }

   // --------------------------- 提款下拉列表 对应配置  ------------------------------- 
    /**
     * account_type:
     * 收款账户类型 -1全部 , 1 银行卡, 2 支付宝
     */
    withDrawTypeConfig  = {
        0:{"name":"全部","account_type":-1},
        1:{"name":"银行卡","account_type":1},
        2:{"name":"支付宝","account_type":2},
    }

    /** 
     * status:
     * -1全部
     * 0申请中/待处理/待审核
     * 1处理中
     * 2拒绝/审核不通过/拒绝审核/手动失败
     * 3已审核
     * 4提款成功/线上提款成功
     * 5手动成功/已人工转正
     * 6回调失败/线上提款失败/三方提款失败
    */
    withDrawStateConfig  = {
        0:{"name":"全部","status":-1},
        1:{"name":"审核中","status":0},
        2:{"name":"处理中","status":1},
        3:{"name":"审核失败","status":2},
        4:{"name":"已审核","status":3},
        5:{"name":"已提款","status":4},   //提款状态下拉列表中。 类型4 和类型5 合为一个下拉选项，都是提款成功
        6:{"name":"提款失败","status":6},
    }
   // --------------------------- end ------------------------------- 

     /** 服务器配置
     * status:
     * 0申请中/待处理/待审核
     * 1处理中
     * 2拒绝/审核不通过/拒绝审核/手动失败
     * 3已审核
     * 4提款成功/线上提款成功
     * 5手动成功/已人工转正
     * 6回调失败/线上提款失败/三方提款失败
    */  
   ServerStateConfig  = {
        0:{"name":"审核中",},
        1:{"name":"处理中",},
        2:{"name":"审核失败",},
        3:{"name":"已审核",},
        4:{"name":"已提款",},   
        5:{"name":"已提款",},
        6:{"name":"提款失败",},
    }
    /**  服务器配置
     * account_type:
     * 收款账户类型  1 银行卡, 2 支付宝
     */
    ServerTypeConfig  = {
        1:{"name":"银行卡",},
        2:{"name":"支付宝",},
    }



    public payMoneyList = [10,50,100,200,300,500,1000,5000];

   public setPayItemInfo(str,name,is_online)
   {
        if(this.payTabAtlasList[str] == null)
        {
            this.payTabAtlasList[str] = this.payTabAtlasList["offline"];
        }
        var tt = this.payTabAtlasList[str];
        tt.name = name;
        tt.is_online = is_online;
   }
    public getPayItemInfo(str)
    {
        return this.payTabAtlasList[str];
    }

    /** 
    * _type = -1 查询全部,    1 银行卡,    2 支付宝
    * _state = -1 查询全部，   
    *           0申请中/待处理/待审核
                1处理中
                2拒绝/审核不通过/拒绝审核/手动失败
                3已审核
                4提款成功 (线上)
                5手动成功 (线下)
                6回调失败/线上提款失败/三方提款失败
    **/
    public getRecordListInfo(_type,_state,beginTime,endTime){
        if(this.RecordList == null || this.RecordList.length <= 0)
        {
            return [];
        }
        let list = [];
        this.RecordList.forEach(item=>{
            let curTime = Date.parse(item.created_at)
            // console.log("curTime  ",curTime);
            // console.log("beginTime  ",beginTime);
            // console.log("endTime  ",endTime);
            if(curTime >= beginTime && curTime <= endTime)
            {
                if(_type < 0)
                {
                    if(_state < 0)
                    {
                        list.push(item);
                    }else if(item["status"] == _state)
                    {
                        list.push(item);
                    }else if(_state == 4 && item["status"] == 5)      //提款状态下拉列表中。 类型4 和类型5 合为一个下拉选项，都是提款成功
                    {
                        list.push(item);
                    }
                    else if(_state == 5 && item["status"] == 4)      //提款状态下拉列表中。 类型4 和类型5 合为一个下拉选项，都是提款成功
                    {
                        list.push(item);
                    }
                }else if(item["account_type"] == _type)
                {
                    if(_state < 0)
                    {
                        list.push(item);
                    }else if(item["status"] == _state)
                    {
                        list.push(item);
                    }else if(_state == 4 && item["status"] == 5)
                    {
                        list.push(item);
                    }
                    else if(_state == 5 && item["status"] == 4)
                    {
                        list.push(item);
                    }
                }else
                {
                    //empty
                }  
            }
        });
        list.push(list[0]);
        list.push(list[0]);
        list.push(list[0]);
        list.push(list[0]);
        list.push(list[0]);
        list.push(list[0]);

        return list;
    }

    //支持的银行列表
    private _bankList:[] = null;
    public get BankList(){
        return this._bankList;
    }
    public set BankList(data:[]){
        this._bankList = data;
    }

    //绑定的账户
    private _accountList:[] = null;
    public get MyAccountList(){
        return this._accountList;
    }
    public set MyAccountList(data:[]){
        this._accountList = data;
    }

     //提现记录列表
     private _recordList:[] = null;
     public get RecordList(){
         return this._recordList;
     }
     public set RecordList(data:[]){
         this._recordList = data;
     }   

}
