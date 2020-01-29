import { G_Language } from '../../Language/Language';
import List from '../../Common/List';
import { G_UserControl } from '../../Controller/UserControl';
import { G_VipControl } from '../../Controller/VipControl';
import { CODE } from "../../Config/IdentifyKey";
import { G_UiForms } from '../../Tool/UiForms';


const {ccclass, property} = cc._decorator;

@ccclass
export default class PersonalPanel extends cc.Component {

    @property(List)
    list : List = null;

    // LIFE-CYCLE CALLBACKS:
    @property(cc.SpriteAtlas)
    headAtlas : cc.SpriteAtlas = null;

    @property(cc.Node)
    btnLeft:cc.Node = null;
    @property(cc.Node)
    btnRight:cc.Node = null;

    @property(cc.Node)
    btnAlterName:cc.Node = null;
    @property(cc.Node)
    btnUpdateBalance:cc.Node = null;

    @property(cc.Node)
    head:cc.Node = null;
    @property(cc.Node)
    vipImage:cc.Node = null;
    @property(cc.Node)
    progressBar:cc.Node = null;

    @property(cc.Node)
    labelCurrentVipLv:cc.Node = null;
    @property(cc.Node)
    labelNextVipLv:cc.Node = null;
    @property(cc.Node)
    vipExp:cc.Node = null;
    
    @property(cc.Node)
    labelID0:cc.Node = null;
    @property(cc.Node)
    labelName0:cc.Node = null;
    @property(cc.Node)
    labelIntegral0:cc.Node = null;
    @property(cc.Node)
    labelBalance0:cc.Node = null;
    @property(cc.Node)
    labelMembership:cc.Node = null;

    @property(cc.Node)
    myEditbox:cc.Node=null;

    @property(cc.Node)
    curLabel:cc.Label = null;


    uponeLevel : any = null;
    nextLevel : any = null;
    private max : number = 9;
    private min : number = 0;

    private index = 0;

    onLoad () {
        G_VipControl.requesVipData();
        // G_OnFire.on(uiEventFunction.rename_event,this.renameCallback.bind(this))
        this.btnAlterName.on(cc.Node.EventType.TOUCH_START, this.onXiuGaiMingZi.bind(this));
        this.btnUpdateBalance.on(cc.Node.EventType.TOUCH_START, this.onShuaXin.bind(this));
        this.btnLeft.on(cc.Node.EventType.TOUCH_END, this.onBtnEvent, this)
        this.btnRight.on(cc.Node.EventType.TOUCH_END, this.onBtnEvent, this)

        this.uponeLevel = this.btnLeft.getChildByName("text")
        this.nextLevel  = this.btnRight.getChildByName("text")

       
        G_UserControl.getUser().userVipLevel = 0
        this.list.numItems = this.max;
        
        this.uponeLevel.getComponent(cc.Label).string = "VIP"+ G_UserControl.getUser().userVipLevel
        this.nextLevel.getComponent(cc.Label).string = "VIP"+( G_UserControl.getUser().userVipLevel + 1)

        this.btnLeft.active =  G_UserControl.getUser().userVipLevel > 0;
        this.btnRight.active = G_UserControl.getUser().userVipLevel + 1 < this.max

        var classMyEditbox = this.myEditbox.getComponent("MyEditbox")
        classMyEditbox.onDidEndedCallback = function(target){
            var strName =  this.myEditbox.getComponent("MyEditbox").getEdiboxComponent().string 
            this.labelName0.getComponent(cc.Label).string =strName
            this.labelName0.active = true;
            this.myEditbox.active = false;
        }.bind(this)
        // onDidEndedCallback

        this.list.skipPage(G_UserControl.getUser().userVipLevel, .1);
        this.labelName0.active = true;
        this.myEditbox.active = false;

    }
    onEnable(){
        //头像
        var spriteFrame : cc.SpriteFrame = this.headAtlas.getSpriteFrame("touxiang"+3)
        this.head.getComponent(cc.Sprite).spriteFrame = spriteFrame;

        this.progressBar.getComponent(cc.ProgressBar).progress = 0.1;

        this.labelCurrentVipLv.getComponent(cc.Label).string = "VIP"+G_UserControl.getUser().userVipLevel
        var addLv : number = G_UserControl.getUser().userVipLevel + 1
        var nextLv : number = addLv > this.max ? this.max : addLv
        this.labelNextVipLv.getComponent(cc.Label).string = "VIP"+nextLv


        this.vipExp.getComponent(cc.Label).string = 100+"/"+900
        
        this.labelID0.getComponent(cc.Label).string = G_UserControl.getUser().uid.toString();
        this.labelName0.getComponent(cc.Label).string = G_UserControl.getUser().userName;
        this.labelIntegral0.getComponent(cc.Label).string ="999"
        this.labelBalance0.getComponent(cc.Label).string = (Math.floor(G_UserControl.getUser().balance*10)/10).toString();

        // this.labelMembership.getComponent(cc.Label).string =G_Language.get("Membership")
       // this.labelMembership.getComponent(cc.Label).string = this.getVIPMembership(G_UserControl.getUser().userVipLevel)
       this.labelMembership.getComponent(cc.Label).string = "VIP" + this.index.toString();

    }

    start () {
    }

    // update (dt) {}


    onListRender(item: cc.Node, idx: number) {
        if(idx <= 0 )
        {
            item.active = false;
        }else
        {
            item.active = true;
            item.children.forEach((tt : cc.Node, index : number)=>{
                var goldeNode = tt.getChildByName("goldeNode")
                var gold = goldeNode.getChildByName("labGold")
                var btn = tt.getChildByName("btn")
                var box = tt.getChildByName("doNot")
                btn.active = (index <= 1) && idx == G_UserControl.getUser().userVipLevel
                box.active =!((index <= 1) && idx == G_UserControl.getUser().userVipLevel);  
                let data = G_VipControl.getVipConfig().data[idx -1];
                let mvalue = '';
                if(index == 0)
                {
                    mvalue = (Math.floor(data["grade_gift"]*10)/10).toString();
                }else if(index == 1)
                {
                    mvalue = (Math.floor(data["week_gift"]*10)/10).toString();
                }else if(index == 2)
                {
                    mvalue = "1";
                }else if(index == 3)
                {
                    mvalue = "1";
                }
               // console.log('mvalue   '+mvalue+"  index  "+index + "tt  "+tt.name);
                gold.getComponent(cc.Label).string = mvalue;
            },this)
        }
       
    }

    onListPageChange(pageNum: number) {
        cc.log('当前是第' + pageNum + '页');
        this.uponeLevel.getComponent(cc.Label).string = pageNum-1 >= 0 ?"VIP"+(pageNum-1) : "";
        this.nextLevel.getComponent(cc.Label).string = "VIP"+(pageNum + 1)
        this.curLabel.getComponent(cc.Label).string = "VIP"+pageNum
        this.btnLeft.active =  pageNum > 0;
        this.btnRight.active = pageNum + 1 < this.max
       // this.labelMembership.getComponent(cc.Label).string = this.getVIPMembership(pageNum)
    }

    onBtnEvent(event){
        let name = event.target.name;
        switch (name) {
            case 'btnLeft':
                this.list.prePage(.5);
                break;
            case 'btnRight':
                this.list.nextPage(.5);
                break;
            // case 'btn3':
            //     t.list.skipPage(parseInt(t.input.string), .5);
            //     break;
        }
    }

    ///------------------------
    onXiuGaiMingZi(){
        // console.log("修改昵称")
        this.labelName0.active = !this.labelName0.active;
        this.myEditbox.active = !this.myEditbox.active;
        var strName = this.labelName0.getComponent(cc.Label).string
        this.myEditbox.getComponent("MyEditbox").getEdiboxComponent().string = strName
        if(strName == G_UserControl.getUser().userName){
            return;
        }
        console.log('strName   '+strName);
        G_UserControl.requesPlayerChange(strName,G_UserControl.getUser().usePic,function(ret){
            if(ret.code==CODE.SUCCEED)
            {
                G_UiForms.hint(G_Language.get("nameChangeSuccess"));
                 this.myEditbox.getComponent("MyEditbox").getEdiboxComponent().string = strName
                
            }else
            {
                G_UiForms.hint(ret.message);
            }

        }.bind(this));
        
    }

    onShuaXin(){
        if(!this.btnUpdateBalance.getComponent(cc.Button).interactable)
        {
            return;
        }
        this.btnUpdateBalance.getComponent(cc.Button).interactable= false;
        console.log("刷新金额")
        let tt  = cc.repeatForever(cc.rotateBy(0.3,360));
        this.btnUpdateBalance.runAction(tt);
        G_UserControl.sendspecialPlayerData(()=>{
            this.scheduleOnce(function(){
                this.btnUpdateBalance.stopAction(tt);
                this.btnUpdateBalance.getComponent(cc.Button).interactable= true;
            }.bind(this),0.3);
        });
    }

   
   
    calculateAngle(first:cc.Vec2, second:cc.Vec2)
    {
        let len_y = second.y - first.y;
        let len_x = second.x - first.x;
        let tan_yx = Math.abs(len_y / len_x);
        let temp = Math.atan(tan_yx) * 180/Math.PI;
        let angle = 0;
        if(len_y > 0 && len_x < 0){
            angle = temp - 90;
        }
        else if(len_y > 0 && len_x > 0){
            angle = -temp + 90;
        }
        else if(len_y < 0 && len_x < 0){
            angle = -temp - 90;
        }
        else if(len_y < 0 && len_x > 0){
            angle = temp + 90;
        }
        else if(len_y == 0 && len_x != 0){
            angle = len_x < 0 ? -90 : 90;
        }
        else if(len_x == 0 && len_y != 0){
            angle = len_y < 0 ? 180 : 0;
        }
        console.log('Temp', temp);
        console.log('Angle ', angle)
        return angle;
    }
    renameCallback(text){
        //修改名字
        // var labelNiCheng = this._top.getChildByName("labelNiCheng");
        // labelNiCheng.getComponent(cc.Label).string =  text;
    }

    getVIPMembership(index : number) : string {
        return G_UserControl.getUser().userVipLevel == index ? G_Language.get("currMembership") :G_Language.get("Membership")
    }

}
