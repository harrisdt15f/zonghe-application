import ListViewCommon from "../Common/ListViewCommon";
import RankItem from "./RankItem";
import { G_Language } from "../Language/Language";
import { G_HttpHelper } from "../Net/HttpHelper";
import { G_UserControl } from "../Controller/UserControl";
import { G_UiForms } from "../Tool/UiForms";
import { uiEventModules } from "../Config/uiEvent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankNode extends cc.Component {

    @property(cc.Label)
    titleLabel: cc.Label = null;
    @property(cc.Label)
    myTextLabel: cc.Label = null;   

    @property(cc.Node)
    viewNode:cc.Node = null;
    @property(cc.Node)
    viewOne: cc.Node = null;
    @property(cc.Node)
    viewTwo: cc.Node = null;    
    @property(cc.Node)
    contain:cc.Node =null;
    @property(cc.Node)
    tabSelectOne:cc.Node = null;
    @property(cc.Node)
    tabSelectTwo:cc.Node = null;

    @property(cc.Node)
    btnSprite1:cc.Node = null;
    @property(cc.Node)
    btnSprite2:cc.Node = null;
    @property(cc.Node)
    btnEffect:cc.Node = null;


    @property(cc.Node)
    tabBtn1:cc.Node = null;
    @property(cc.Node)
    tabBtn2:cc.Node = null;

    private listOne = [];
    private listTwo = [];

    //是否展开
    private isOpen = false;

    private index = 1;    //1.盈利榜  2.富豪榜

    private myRankOne = 0;  //我的盈利榜rank
    private myRankTwo = 0;  //我的富豪榜rank

    onEnable () {
        /*
        this.scheduleOnce(()=>{
            this.showInfo();
        },3);
        */
    }

    onShowClick(event){
        /*
        if(!G_UserControl.isLogin()){
            G_UiForms.hint(G_Language.get("PleaseLogInFirst"))
            G_UiForms.show(uiEventModules.landingNode);
            return;
        }*/

        if(this.isOpen)
        {     
           this.isOpen = false;
           let action = cc.moveTo(0.4,cc.v2(-400,-7));
           this.contain.runAction(action);
           this.scheduleOnce(function(){
               this.btnEffect.active = false;
               this.btnEffect.active = true;
           }.bind(this),0.4);   
            this.scheduleOnce(function(){
                this.btnSprite1.active = true;
                this.btnSprite2.active = false;    
            }.bind(this),0.8); 
        }else{
            this.showInfo()
            this.isOpen = true;
            let action = cc.moveTo(0.4,cc.v2(0,-7));
            this.contain.runAction(action);
            this.tabBtnEffect();
            this.viewNodeEffect();

            this.scheduleOnce(function(){
                this.btnEffect.active = false;
                this.btnEffect.active = true;
            }.bind(this),0.4);
            this.scheduleOnce(function(){
                this.btnSprite1.active = false;
                this.btnSprite2.active = true;    
            }.bind(this),0.8);
        }
    }

    tabBtnEffect()
    {
        let scale1 = cc.scaleTo(0.1,0.9,0.9);
        let scale2 = cc.scaleTo(0.1,1.1,1.1);
        let scale3 = cc.scaleTo(0.1,1,1);
        this.tabBtn1.runAction(cc.sequence(cc.delayTime(0.35),scale1,scale2,scale3));
        let scale4 = cc.scaleTo(0.1,0.9,0.9);
        let scale5 = cc.scaleTo(0.1,1.1,1.1);
        let scale6 = cc.scaleTo(0.1,1,1);
        this.tabBtn2.runAction(cc.sequence(cc.delayTime(0.5),scale4,scale5,scale6));
    }

    viewNodeEffect()
    {
        let alpha1 = cc.fadeOut(0);
        let alpha2 = cc.fadeTo(0.5,255);
        this.viewNode.runAction(cc.sequence(alpha1,cc.delayTime(0.4),alpha2));
    }

    showInfo()
    {
        if(this.index== 1)
        {
            this.viewOne.active = true;
            this.viewTwo.active = false;
            this.tabSelectOne.active = true;
            this.tabSelectTwo.active = false;
            this.titleLabel.string = G_Language.get("rank_title1");
            if(this.listOne.length <= 0){
                G_HttpHelper.httpGet("/app-api/games-lobby/rich-list",function(data){
                    
                    if(data.status && data.code == 200)
                    {
                        console.log(data.data.length)
                        this.viewOne.getComponent(ListViewCommon).init(data.data.length,35,function(index,itemPrefab){
                            let itemTs = itemPrefab.getComponent(RankItem);
                            this.listOne[index] = itemTs;
                            itemTs.init(index+1,data.data[index]);
                            console.log("data.data.guid   "+data.data[index] + "  "+ G_UserControl.getUser().uid)
                            if(data.data[index].guid == G_UserControl.getUser().uid)
                            {
                                this.myRankOne = index + 1;
                                if( this.myRankOne <= 100)
                                {
                                    this.myTextLabel.string = "你当前排名为第"+ this.myRankOne+"名";
                                }else
                                {
                                    this.myTextLabel.string = "未上榜";
                                }
                            }
                        }.bind(this));
                    }
                }.bind(this));
            }else
            {
                if( this.myRankOne <= 100)
                {
                    this.myTextLabel.string = "你当前排名为第"+ this.myRankOne+"名";
                }else
                {
                    this.myTextLabel.string = "未上榜";
                }
            }
        }else{
           
            this.viewOne.active = false;
            this.viewTwo.active = true;
            this.tabSelectOne.active = false;
            this.tabSelectTwo.active = true;
            this.titleLabel.string = G_Language.get("rank_title2");
            if(this.listTwo.length <= 0){
                G_HttpHelper.httpGet("/app-api/games-lobby/rich-list",function(data){
                    if(data.status && data.code == 200)
                    {
                        this.viewTwo.getComponent(ListViewCommon).init(data.data.length,35,function(index,itemPrefab){
                            let itemTs = itemPrefab.getComponent(RankItem);
                            this.listTwo[index] = itemTs;
                            itemTs.init(index+1,data.data[index]);
                            if(data.data[index].guid == G_UserControl.getUser().uid)
                            {
                                this.myRankTwo = index + 1;
                                if(this.myRankTwo <= 100)
                                {
                                    this.myTextLabel.string = "你当前排名为第"+this.myRankTwo+"名";
                                }else
                                {
                                    this.myTextLabel.string = "未上榜";
                                }
                            }
                        }.bind(this));
                    }
                }.bind(this));
            }else
            {
                if(this.myRankTwo <= 100)
                {
                    this.myTextLabel.string = "你当前排名为第"+this.myRankTwo+"名";
                }else
                {
                    this.myTextLabel.string = "未上榜";
                }
            }           
        }     
    }

    tabCLickOne(target)
    {
        this.index = 1;
        this.showInfo()
    }
    tabClickTwo()
    {
        this.index = 2;
        this.showInfo()
    }


    // update (dt) {}
}
