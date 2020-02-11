import { G_CommonControl } from "../Controller/CommonControl";
import  HallLeftItem from "../Hall/HallLeftItem";
import  HallRightItem from "../Hall/HallRightItem";
import { G_Utils } from "../Tool/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Hall extends cc.Component {

    @property(cc.Node)
    topNode : cc.Node = null;

    @property(cc.Node)
    bottomNode : cc.Node = null;

    @property(cc.Node)
    rightNode : cc.Node = null;

    @property(cc.Node)
    liaotianPanel : cc.Node = null;
    
    @property(cc.Node)
    leftGrid:cc.Node = null;
    @property(cc.Node)
    leftItem:cc.Node = null;
    @property(cc.Node)
    rightGrid:cc.Node = null;
    @property(cc.Node)
    rightItem:cc.Node = null;

    private leftList = [];
    private curLeftIndex = 0;

    private rightList = [];

    start () {
        G_CommonControl.requesGameData(()=>{
            this.RefreshLeft();
        });
    }

    RefreshLeft()
    {
        if(this.leftList.length >0)
        {
            return;
        }
        if(G_CommonControl.getCommonConfig().gameHall.length > 0)
        {
            for(var i=0;i<G_CommonControl.getCommonConfig().gameHall.length;i++)
            {
                var item = cc.instantiate(this.leftItem);
                item.active = true;
                this.leftGrid.addChild(item);
                this.leftList.push(item);
                var itemJs = item.getComponent(HallLeftItem);               
                itemJs.init(G_CommonControl.getCommonConfig().gameHall[i],(index)=>{
                    this.onSelectedItem(index);
                });
            }
            if(this.curLeftIndex <= 0)
            {
                this.onSelectedItem(1);
            }
        }
    }
    
    //G_Utils.onClickEnd(item, this.onToggleEnd, this)
    onSelectedItem(index){
        if(this.curLeftIndex > 0 && this.curLeftIndex <= this.leftList.length + 1)
        {
            var tt = this.leftList[this.curLeftIndex - 1].getComponent(HallLeftItem);
            tt.setSelectState(false);
        }
        this.curLeftIndex = index;
        var tt = this.leftList[this.curLeftIndex - 1].getComponent(HallLeftItem);
        tt.setSelectState(true);
        //console.log("index>>>",index)
        
        if(G_CommonControl.getCommonConfig().getGameSub(this.curLeftIndex) == null)
        {
            G_CommonControl.requesGameDetailData(this.curLeftIndex,()=>{
                this.onShowRightInfo();
            });
        }else
        {
            this.onShowRightInfo();
        }

        // classRightNode.creatorGameIcon(_target.index)
        //     classTopNode.setVIP(_target.index);
    }

    onShowRightInfo()
    {
        if(this.rightList.length > 0)
        {
            this.rightList.forEach(item=>{
                item.active = false;
            });
        }
        var rightInfo  = G_CommonControl.getCommonConfig().getGameSub(this.curLeftIndex)
        if(rightInfo && rightInfo.length > 0)
        {
            for(var i = 0; i <rightInfo.length;i++)
            {
                var item = cc.instantiate(this.rightItem);
                item.active = true;
                this.rightGrid.addChild(item);
                this.rightList.push(item);
                var itemJs = item.getComponent(HallRightItem);   
                itemJs.init(rightInfo[i],()=>{

                }); 
            }
        }
    }

}
