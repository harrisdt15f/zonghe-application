

export  class CommonConfig {

    private gameHallAtlasList = {
        0:{"normalText":"subtitle_hot_0","specialText":"subtitle_hot_1","icon":"leftbar_icon1"},
        1:{"normalText":"subtitle_jingdianqipai_0","specialText":"subtitle_jingdianqipai_1","icon":"leftbar_icon2"},
        2:{"normalText":"subtitle_jingjijingcai_0","specialText":"subtitle_jingjijingcai_1","icon":"leftbar_icon6"},  
        3:{"normalText":"subtitle_quweijingcai_0","specialText":"subtitle_quweijingcai_1","icon":"leftbar_icon3"},
        4:{"normalText":"subtitle_laohujiheji_0","specialText":"subtitle_laohujiheji_1","icon":"leftbar_icon4"},
        5:{"normalText":"subtitle_realityShow_0","specialText":"subtitle_realityShow_1","icon":"leftbar_icon5"},  
        6:{"normalText":"subtitle_caipiaotouzhu_0","specialText":"subtitle_caipiaotouzhu_1","icon":"leftbar_icon7"},  
    }

    private gameDetailAtlasList = {
        "kxxxq":{"icon":"game_btn1"},
        "ddz":{"icon":"game_btn2"}, 
    }

    public getJsonPath(index)
    {
        return this.gameHallAtlasList[index];
    }
    public getGameJsonPath(str)
    {
        return this.gameDetailAtlasList[str];
    }
    //游戏大厅
    private _dataHall:[] = null;
    public get gameHall(){
        return this._dataHall;
    }
    public set gameHall(data:[]){
        this._dataHall = data;
    }

    private _dataGame = {};

    public getGameSub(index){
        return this._dataGame[index];
    }

    public setGameSub(index,data){
        this._dataGame[index] = data;
    }
}
