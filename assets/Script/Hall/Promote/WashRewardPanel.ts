import { G_Language } from '../../Language/Language';
import List from '../../Common/List';
import { G_Utils } from '../../Tool/Utils';
import { G_PayControl } from '../../Controller/PayControl';
import { G_PromoteControl } from '../../Controller/PromoteControl';

const {ccclass, property} = cc._decorator;

@ccclass
export default class WashRewardPanel extends cc.Component {


    @property(List)
    list : List = null;
    // @property(cc.Node)
    // typeList : cc.Node = null;
    // @property(cc.Node)
    // btnChaXun : cc.Node = null;
    @property(cc.Node)
    bottomLbParent:cc.Node = null;

    //private _typeMenu = null;
    //private _updateQueryFlag = false;

    private curList = null;
    private curBeginTimeDate = null;
    private curEndTimeDate = null;

    private dateType = 1;

    onLoad () {
        // this.btnChaXun.on(cc.Node.EventType.TOUCH_END, this.onChaXun.bind(this));
        // //this.list.numItems = 2;
        // if(this.typeList){
        //     this._typeMenu = this.typeList.getComponent("MyPulldownMenu")
        //     this._typeMenu.menuData =  G_PromoteControl.getConfig().getCurUnderLabelStr(-1);
        //     var _length = G_PromoteControl.getConfig().getCurUnderLabelStr(-1).length;
        //     if(_length >=8)
        //     {
        //         this._typeMenu.list.node.height = 37 * 8;
        //     }else
        //     {
        //         this._typeMenu.list.node.height = _length > 0 ? (37*_length):37;
        //     }
        //     var selectedId = this._typeMenu.selectResult.selectedId;
        //     var selectedText = this._typeMenu.selectResult.text;
        //     console.log("选择了什么》》",selectedId,selectedText)
        // }

    }

    onEnable()
    {
        G_PromoteControl.requesWashRewardMsg(function(ret){         
           // this.showInfo();
        }.bind(this));
        this.showInfo();
    }

    /**
    onChaXun(){
        this._updateQueryFlag = true;
        this.list.content.removeAllChildren();
        console.log("this._typeMenu.selectResult.selectedId   ",this._typeMenu.selectResult.selectedId);
        
        var _type = G_PromoteControl.getConfig().underLabelConfig[this._typeMenu.selectResult.selectedId].index;
        this.curList = G_PromoteControl.getConfig().getWashRewardListInfo(_type,this.curBeginTimeDate,this.curEndTimeDate);
        this.list.numItems = this.curList.length;
        let _score = 0;
        let _scoreColor = "";
        let _reward = 0;
        let _rewardColor = "";
        this.curList.forEach(element => {
            _score = _score + element.score;
            _reward = _reward + element.reward;
        });
        this.bottomLbParent.getChildByName("label_1").getComponent(cc.Label).string = this.curList.length+G_Language.get("underNumRecord");
        if(_score < 0)  //减少
        {
            _scoreColor = "37CC6E"
        }else
        {
            _scoreColor = "DF0F39"
        }
        if(_reward < 0)  //减少
        {
            _rewardColor = "37CC6E"
        }else
        {
            _rewardColor = "DF0F39"
        }
        this.bottomLbParent.getChildByName("label_2").getComponent(cc.RichText).string = "<color =#" +_scoreColor +">"+_score.toFixed(2) +"</color>"
        this.bottomLbParent.getChildByName("label_3").getComponent(cc.RichText).string = "<color =#" +_rewardColor +">"+_reward.toFixed(2) +"</color>"
    } */

    showInfo(){
        this.getTimeDate();   
      //  this.onChaXun();  
    }

    onToggleClick(event){
        console.log("event.name:",event.target._localZOrder)
        this.dateType =  event.target._localZOrder;    //1.全部 2.昨日 3.今日 4.上周 5.上月
        this.getTimeDate();        
    }

    getTimeDate()
    {
        G_Utils.getTimeDate(this.dateType,function(begin,end){
            this.curBeginTimeDate = begin;
            this.curEndTimeDate = end;
            this.curList = G_PromoteControl.getConfig().getWashRewardListInfo(this.curBeginTimeDate,this.curEndTimeDate);
            this.list.numItems = this.curList.length;
            if(this.curList.length >0)
            {
                let _bet = 0;
                let _money = 0;
                this.curList.forEach(element => {
                    _bet = _bet + element.bet;
                    _money = _money + element.money;
                });
                this.bottomLbParent.getChildByName("label_1").getComponent(cc.RichText).string = "<color =#DF0F39>"+_bet.toFixed(2) +"</color>"
                this.bottomLbParent.getChildByName("label_3").getComponent(cc.RichText).string = "<color =#DF0F39>"+_money.toFixed(2) +"</color>"
            }else
            {
                this.bottomLbParent.getChildByName("label_1").getComponent(cc.RichText).string = ""
                this.bottomLbParent.getChildByName("label_3").getComponent(cc.RichText).string = ""
            }
        }.bind(this));
    }


    onListRender(item: cc.Node, idx: number) {
        //console.log("item   ",this.curList.length);
        //console.log("idx   ",idx);
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        if(this.curList.length > idx)
        {
            let cur = this.curList[idx]
            item.getChildByName("label_0").getComponent(cc.RichText).string = cur.name.toString();
            item.getChildByName("label_1").getComponent(cc.RichText).string = "<color =#DF0F39>"+cur.bet.toFixed(2) +"</color>"
            item.getChildByName("label_2").getComponent(cc.RichText).string = Math.floor(cur.pro*100) +"%"
            item.getChildByName("label_3").getComponent(cc.RichText).string = "<color =#DF0F39>"+cur.money.toFixed(2) +"</color>"
            item.getChildByName("label_4").getComponent(cc.RichText).string = cur.created_at
        }
    }

    onRequestData(item: cc.Node, idx: number){
        // if (this.list.length >= 99){
        //     return;
        // }
        // if(this._updateQueryFlag){
        //     this._updateQueryFlag = false;
        //     return;
        // }
        // this.list.numItems += 10
    }

}
