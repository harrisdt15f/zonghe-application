

export  class VipConfig {

    //配置文件
    private _data:[] = null;
    public get data(){
        return this._data;
    }
    public set data(data:[]){
        this._data = data;
    }

    //VIP 领取状态
    private _personMsg:[] = null;
    public get personMsg(){
        return this._personMsg;
    }
    public set personMsg(data:[]){
        this._personMsg = data;
    }    

}
