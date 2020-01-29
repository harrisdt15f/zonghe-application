import ListViewCommon from "../Common/ListViewCommon";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankItem extends cc.Component {

    @property(cc.RichText)
    rankLabel: cc.Label = null;
    @property(cc.RichText)
    nameLabel: cc.Label = null;   
    @property(cc.RichText)
    moneyLabel: cc.Label = null;
    @property(cc.Node)
    back:cc.Node =null;

    private index = null;
    private msg = null;

    private colorList = ["ffeb1f","D33F11","1885AD"];
    private colorNormal = "a1582b";

    start(){

    }

    init(_index,_msg){
        this.index = _index;
        this.msg = _msg;
        this.onRefreshData();
    }

    onRefreshData(){
        console.log("this.msg    "+this.msg);
        if(this.msg == null)
        {
            return
        }
        //'<color=#fee39b> 恭喜玩家 <color = #ffffff> '+'"'+userName+'"'+' </color><color=#fee39b> 在 '
        let rgb = null;
        if(this.colorList[this.index-1])
        {
            rgb = this.colorList[this.index-1]
        }else
        {
            rgb = this.colorNormal;
        }
        console.log('rgb  '+rgb);
        this.rankLabel.string = '<color=#'+rgb+">" + this.index + "</color>";
        this.nameLabel.string = '<color=#'+rgb+">" + this.msg.name + "</color>";
        this.moneyLabel.string = '<color=#'+rgb+">" + Math.floor(this.msg.balance) +"</color>";
        this.back.active = this.index % 2 == 0;
    }

    // update (dt) {}
}
