
import { G_OnFire } from '../../Net/OnFire';
import {G_UiForms} from "../../Tool/UiForms"
import {uiEventModules, uiEventFunction} from "../../Config/uiEvent"
import { TEXT_INFO } from '../../Config/IdentifyKey';
import { G_WithDrawControl } from '../../Controller/WithDrawControl';
import { G_Language } from '../../Language/Language';
import { G_UserControl } from '../../Controller/UserControl';
const {ccclass, property} = cc._decorator;

@ccclass
export default class AtOncePanel extends cc.Component {


    @property({
        type : cc.Label,
        tooltip :"账户余额"
    })
    balance : cc.Label=null;
 


    //绑定
    @property({
        type : cc.Node,
        tooltip :"绑定账户"
    })
    btnBangDing:cc.Node = null;
    //清除
    @property({
        type : cc.Node,
        tooltip :"清除已输入的信息"
    })
    btnClear:cc.Node = null;

    @property({
        type : cc.Node,
        tooltip :"设置安全码"
    })
    btnSet:cc.Node = null;



    @property(cc.Node)
    labAccount:cc.Node = null;
    @property(cc.Node)
    myPulldownMenu:cc.Node = null;
    
    @property(cc.Node)
    myEditboxGolde:cc.Node = null;


    @property(cc.Node)
    labAnQuanMa:cc.Node = null;
    @property(cc.Node)
    myEditboxCode = null;

    @property(cc.Node)
    btnTiXian:cc.Node = null;

    private accountEditBox = null;

    private accountList = [];  //绑定账户列表
    private _myPulldownMenu : any = null; 
    
    private accoutNameList = []  //绑定账户列表名称
    private chooseId = 0;  //当前选定绑定账户index

    private isSecurityCode = false;


    onLoad () {
        this.btnBangDing.on(cc.Node.EventType.TOUCH_END, this.onBangDing.bind(this));
        this.btnClear.on(cc.Node.EventType.TOUCH_END, this.onClear.bind(this));
        this.btnSet.on(cc.Node.EventType.TOUCH_END, this.onSet.bind(this));
        var classEdithbox = this.myEditboxGolde.getComponent("MyEditbox")
        classEdithbox.onDidEndedCallback = function(target) {
            var strName =  classEdithbox.getEdiboxComponent().string 
            console.log("录完》》",typeof(strName))
            var num = Number(strName)
            if(!isNaN(num) && num > 0){
                classEdithbox.getEdiboxComponent().string = num.toFixed(2);
            }
            //if('number' ==typeof(parseInt(strName)))
        }
        classEdithbox.onTextChangedCallback = function(target) {
            console.log("录入》》")
        }

    }

    onEnable()
    {
        console.log("G_UserControl.getUser().balance  ",typeof(G_UserControl.getUser().balance));
        
        this.balance.string = G_UserControl.getUser().balance.toFixed(2);
        G_WithDrawControl.GetMyAccountList(()=>{
            this.accountList = G_WithDrawControl.getConfig().MyAccountList;
            this.showInfo();
        });
    }
    showInfo(){
        if(this.accountList.length <= 0)
        {
            this.labAccount.active = true;
            this.btnBangDing.active = true;
            this.myPulldownMenu.active = false;
            this.isSecurityCode = false;
            this.labAnQuanMa.active = true;
            this.myEditboxCode.active = false;
            this.btnSet.active = true;
        }else
        {
            this.labAccount.active = false;
            this.myPulldownMenu.active = true;
            this.btnBangDing.active = false;
            this.isSecurityCode = true;
            this.labAnQuanMa.active = false;
            this.myEditboxCode.active = true;
            this.btnSet.active =false;
            for(let i=0;i<this.accountList.length;i++)
            {
                console.log("this.accountList[i].code "+this.accountList[i].code);
                
                let bankInfo =  G_WithDrawControl.getConfig().getPayItemInfo(this.accountList[i].code);
                this.accoutNameList[i] = bankInfo.name+" "+this.accountList[i].card_number_hidden
            }
            if(this.myPulldownMenu){
                this._myPulldownMenu = this.myPulldownMenu.getComponent("MyPulldownMenu")
                this._myPulldownMenu.menuData = this.accoutNameList;
                //this.chooseId = this._myPulldownMenu.selectResult.selectedId;
                var selectedText = this._myPulldownMenu.selectResult.text;
                console.log("选择了什么》》",this.chooseId,selectedText)
            }
        }

    }



    onWithDrwClick(){
        if(this.accountList == null || this.accountList.length == 0)
        {
            G_UiForms.hint(G_Language.get("bindEmpty"))
            return
        }
        var val = this.myEditboxGolde.getComponent("MyEditbox").getEdiboxComponent().string 
        var money = Number(val);
        console.log(typeof(money),"   ",money);
        //if(money)
        var code = '';
        if(this.isSecurityCode)
        {
            code = this.myEditboxCode.getComponent("MyEditbox").getEdiboxComponent().string 
            if(code == null || code == '')
            {
                G_UiForms.hint(G_Language.get("securityisEmpty"))
                return;
            }
        }else
        {
            G_UiForms.hint(G_Language.get("securityisEmpty"))
            return;
        }
        if(isNaN(money)){
            G_UiForms.hint(G_Language.get("balanceError"))
            return;
        }
        if(money > G_UserControl.getUser().balance){
            G_UiForms.hint(G_Language.get("balanceLess"))
            return;           
        }
        var choose = this._myPulldownMenu.selectResult.selectedId;
        console.log("choose  ",choose);
        
        G_WithDrawControl.requesWithDraw(money,this.accountList[choose].id,code,function(ret){
            if(ret.status){
                G_UiForms.hint(G_Language.get("withDrawing"))
                this.balance.string = G_UserControl.getUser().balance.toString();
            }else
            {
                G_UiForms.hint(ret.message)
            }
        })
        
    }
    onDestroy(){
        G_OnFire.off(uiEventFunction.atOnceManage);
    }

    onBangDing(){
        G_UiForms.setSelectPanelShow(TEXT_INFO.TX_bangding_quxiao_queding);
        G_OnFire.fire(uiEventFunction.atOnceManage, false);
        G_UiForms.hint("绑定了什么")
    }

    onClear(){
        this.myEditboxGolde.getComponent("MyEditbox").getEdiboxComponent().string = "";
    }

    onSet(){
        G_UiForms.show(uiEventModules.setNode)
        G_UiForms.setSelectPanelShow(TEXT_INFO.xiuGaiAnMa);
        G_OnFire.fire(uiEventFunction.atOnceManage, false);
    }
    // update (dt) {}

}
