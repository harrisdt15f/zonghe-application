

export  class WithDrawConfig {
    private payTabAtlasList = {
        
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

    //充值分类
    private _dataType:[] = null;
    public get dataType(){
        return this._dataType;
    }
    public set dataType(data:[]){
        this._dataType = data;
    }

    

    private _dataDetail = {};

    public getDataDetail(index){
        console.log('get '+index);
        return this._dataDetail[index];
    }

    public setDataDetail(index,data){
        console.log('set '+index);
        this._dataDetail[index] = data;
    }
}
