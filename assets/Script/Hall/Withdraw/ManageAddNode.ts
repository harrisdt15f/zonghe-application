

import { G_Language } from '../../Language/Language';
import { ACCOUNT_TYPE } from "../../Config/config";
import { uiEventModules, uiEventFunction } from "../../Config/uiEvent";
import {G_UiForms} from "../../Tool/UiForms"
import { G_OnFire } from '../../Net/OnFire';
import { TEXT_INFO } from '../../Config/IdentifyKey';
import { G_WithDrawControl } from '../../Controller/WithDrawControl';

const {ccclass, property} = cc._decorator;

@ccclass
export default class node extends cc.Component {

    @property(cc.Node)
    typeList : cc.Node = null;
    @property(cc.Node)
    menuList : cc.Node = null;
    @property(cc.Node)
    grid : cc.Node = null;

    private txt_type = null;
    private txt_name = null;
    private txt_khyh = null;
    private txt_yhkh = null;
    private txt_khh = null;
    private txt_mima = null;
    private txt_mimaAgain = null;


    //private typeEditbox = null;    //取款方式    
    private nameEditbox = null;  //姓名
   // private khyhEditbox = null;  //银行名称
    private yhkhEditbox = null;  //银行卡号
    private khhEditbox = null;  //开户行
    private mimaEditbox = null;      //取款密码
    private mimaAgainEditbox = null; //确认取款密码

    // openAccountSiteName : string = G_Language.get("PleaseEnterYourAccountName")
    // openAccountSite : string = G_Language.get("PleaseEnterTheAccountOpeningAddress")
    // bankNum : string = G_Language.get("PleaseEnterTheBankCardNumber")
    // alipayName : string = G_Language.get("PleaseEnterYourAlipayUserName")
    // alipayAccount : string = G_Language.get("PleaseEnterAlipayAccount")
    // againAlipayAccount : string = G_Language.get("PleaseEnterTheAlipayAccountAgain")
    // mimaString : string = G_Language.get("PleaseEnterWithDrawPassCode")
    // mimaAgainString : string = G_Language.get("PleaseEnterWithDrawPassCodeAgain")


    private typeMenu = null;
    private _myPulldownMenu = null;

    private bankList = []
    private typeNameList = ["支付宝","银行卡"];
    private bankNameList = []
    private typeId = 0;
    private chooseId = 0;  //当前选定账户index
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initBankCardNode();
        G_WithDrawControl.GetBanksList(()=>{
            this.bankList = G_WithDrawControl.getConfig().BankList;
            for(let i=0;i<this.bankList.length;i++){
                let config = G_WithDrawControl.getConfig().getPayItemInfo(this.bankList[i].code)
                this.bankNameList[i] = config.name
            }
            if(this.typeList){
                this.typeMenu = this.typeList.getComponent("MyPulldownMenu")
                this.typeMenu.menuData = this.typeNameList;
                this.typeId = this.typeMenu.selectResult.selectedId;
                var selectedText = this.typeMenu.selectResult.text;
                console.log("选择了什么》》",this.typeId,selectedText)
                let msg = this.bankList[0]
                if(msg){
                   // this.onSelectItem(msg) 
                }
            }
            if(this.menuList){
                this._myPulldownMenu = this.menuList.getComponent("MyPulldownMenu")
                this._myPulldownMenu.menuData = this.bankNameList;
                this.chooseId = this._myPulldownMenu.selectResult.selectedId;
                var selectedText = this._myPulldownMenu.selectResult.text;
                console.log("选择了什么》》",this.chooseId,selectedText)
                let msg = this.bankList[0]
                if(msg){
                   // this.onSelectItem(msg) 
                }
            }
        });
    }

    // onEnabel () {
    //     G_WithDrawControl.GetMyAccountList(()=>{
    //         this.bankList = G_WithDrawControl.getConfig().BankList;
    //         if(this.menuList){
    //             this._myPulldownMenu = this.menuList.getComponent("MyPulldownMenu")
    //             this._myPulldownMenu.menuData = this.bankList;
    //             this.chooseId = this._myPulldownMenu.selectResult.selectedId;
    //             var selectedText = this._myPulldownMenu.selectResult.text;
    //             console.log("选择了什么》》",this.chooseId,selectedText)
    //         }
    //     });
    // }

    // update (dt) {}

    initBankCardNode(){
        this.txt_type = this.grid.getChildByName("txt_type");
       // this.typeEditbox = this.txt_type.node.getChildByName("nameEditbox").getComponent("MyEditbox");
       // this.typeEditbox.getText().string = this.alipayName;

        this.txt_name = this.grid.getChildByName("txt_name");
        this.nameEditbox = this.txt_name.getChildByName("nameEditbox").getComponent("MyEditbox");
        //this.nameEditbox.getText().string = this.alipayName;

        this.txt_khyh = this.grid.getChildByName("txt_khyh");
       // this.khyhEditbox = this.txt_khyh.node.getChildByName("nameEditbox").getComponent("MyEditbox");

        this.txt_yhkh = this.grid.getChildByName("txt_yhkh");
        this.yhkhEditbox = this.txt_yhkh.getChildByName("yhkhEditbox").getComponent("MyEditbox");

        this.txt_khh = this.grid.getChildByName("txt_khh");
        this.khhEditbox = this.txt_khh.getChildByName("khhEditbox").getComponent("MyEditbox");

        this.txt_mima = this.grid.getChildByName("txt_mima");
        this.mimaEditbox = this.txt_mima.getChildByName("mimaEditbox").getComponent("MyEditbox");

        this.txt_mimaAgain = this.grid.getChildByName("txt_mimaAgain");
        this.mimaAgainEditbox = this.txt_mimaAgain.getChildByName("mimaAgainEditbox").getComponent("MyEditbox");


        // this.classKaHaoEditbox.onDidEndedCallback = function(target) {
        //     console.log("输入结束》》")
        // }
        // this.classKaHaoEditbox.onEditboxTextChanged = function(target) {
        //     console.log("录入》》")
        // }

        //确定绑定
        let btnQueDing = this.node.getChildByName("btnQueDing");
        btnQueDing.on(cc.Node.EventType.TOUCH_END, this.onQueDing.bind(this));
        // //取消
        // let btnQuXiao = this.node.getChildByName("btnQuXiao");
        // btnQuXiao.on(cc.Node.EventType.TOUCH_END, this.onQuXiao.bind(this));

        // //安全码
        // //let labelAnQuanMa = this.node.getChildByName("labelAnQuanMa");
        // //设置安全码
        // let btnSet = this.node.getChildByName("btnSet");
        // btnSet.on(cc.Node.EventType.TOUCH_END, this.onSetanquanma.bind(this));
        
    }

    onSetanquanma(){
        G_UiForms.show(uiEventModules.setNode)
        G_UiForms.setSelectPanelShow(TEXT_INFO.xiuGaiAnMa);
    }

    onQueDing(){
        G_OnFire.fire(uiEventFunction.manage, true);
    }

    onQuXiao(){
        G_OnFire.fire(uiEventFunction.manage, true);
    }

    onListRender(item: cc.Node, idx: number) {
        console.log("item.name   "+item.name);
        /*
        let msg = this.bankList[idx]
        if(msg){
            this.onSelectItem(msg) 
        }
        */
    }

       //当列表项被选择...
    onListSelected(data : any) {
        var _types = data.selectedId
        console.log("_types   "+_types);
        /*
        let msg = this.bankList[_types]
        if(msg){
            this.onSelectItem(msg) 
        }*/
    }
    /*
    onSelectItem(msg){
        //银行卡状态
        this.txt_khm.active = msg.code != "ALIPAY";
        this.txt_khdz.active = msg.code != "ALIPAY";
        this.txt_yhkh.active = msg.code != "ALIPAY";
        // 支付宝状态
        this.txt_xm.active = msg.code == "ALIPAY";
        this.txt_zfbzh.active = msg.code == "ALIPAY";
        this.txt_zh.active = msg.code == "ALIPAY";

        let str1 = msg.code != "ALIPAY" ? this.openAccountSiteName : this.alipayName;
        let str2 = msg.code != "ALIPAY" ? this.openAccountSite : this.alipayAccount;
        let str3 = msg.code != "ALIPAY" ? this.bankNum :this.againAlipayAccount;

        this.classNameEditbox.getText().string = str1;
        this.classDiZiEditbox.getText().string = str2;
        this.classKaHaoEditbox.getText().string = str3;

        this.txt_mima.active = msg.code == "ALIPAY" ? !G_WithDrawControl.isBindAliPay():!G_WithDrawControl.isBindBank();
        this.txt_mimaAgain.active = msg.code == "ALIPAY" ? !G_WithDrawControl.isBindAliPay():!G_WithDrawControl.isBindBank();
        this.mimaEditbox.node.active = msg.code == "ALIPAY" ? !G_WithDrawControl.isBindAliPay():!G_WithDrawControl.isBindBank();
        this.mimaAgainEditbox.node.active = msg.code == "ALIPAY" ? !G_WithDrawControl.isBindAliPay():!G_WithDrawControl.isBindBank();  
    }
    */
   //仅处理 下拉列表层级，
   onClickMenu(target : cc.Node, flag : boolean){
        if(flag){
            console.log(" target.name   "+ target.name );
            
            // switch ( target.name ) {
            //     case "menuGrantType":
            //         this.menuListGrantType.zIndex = 3
            //         this.menuListGameType.zIndex = 2
            //         this.menuListGrantState.zIndex = 1
            //         break;
            //     case "menuGameType":
            //         this.menuListGrantType.zIndex = 2
            //         this.menuListGameType.zIndex = 3
            //         this.menuListGrantState.zIndex = 1
            //         break;
            //     case "menuGrantState":
            //         this.menuListGrantType.zIndex = 1
            //         this.menuListGameType.zIndex = 2
            //         this.menuListGrantState.zIndex = 3
            //         break;
            //     default:
            //         break;
            // }
        }
    }
}
