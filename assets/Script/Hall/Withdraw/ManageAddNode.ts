

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

    BankAccount : string = G_Language.get("BankAccount")
    PleaseEnterBankAccount : string = G_Language.get("PleaseEnterTheBankCardNumber")
    alipayAccount : string = G_Language.get("AlipayAccount")
    PleaseEnterAlipayAccount : string = G_Language.get("PleaseEnterAlipayAccount")
    mimaString : string = G_Language.get("PleaseEnterWithDrawPassCode")
    mimaAgainString : string = G_Language.get("PleaseEnterWithDrawPassCodeAgain")
    PleaseEnterBankName : string = G_Language.get("PleaseEnterYourAccountName")
    PleaseEnterAlipayName : string = G_Language.get("PleaseEnterYourAlipayUserName")

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
            this.onSelectItem();
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
        // let btnQueDing = this.node.getChildByName("btnQueDing");
        // btnQueDing.on(cc.Node.EventType.TOUCH_END, this.onQueDing.bind(this));
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
        let _name = this.nameEditInfo
        let _account = this.yhkhEditInfo
        if(_name === ''){
            G_UiForms.hint(G_Language.get("nameEmpty"))
            return;
        }
        if(_account === ''){
            G_UiForms.hint(G_Language.get("accountEmpty"))
            return;
        }
        console.log("_name  ",_name,'  _account',_account)
        if(this.typeId == 0)   //支付宝
        {
            if(G_WithDrawControl.isBindAliPay){
                G_WithDrawControl.requesAlipayBind(_name,_account,function(ret){
                    if(ret.status)
                    {
                        G_UiForms.hint(G_Language.get("bindSuccess"));
                        G_OnFire.fire(uiEventFunction.manage, true);
                    }else
                    {
                        G_UiForms.hint(ret.message);
                    }
                    console.log("11111111111111111111111",ret.status)
                }.bind(this));
            }
            else
            {
                if(this.mimaEditInfo === ''){
                    G_UiForms.hint(G_Language.get("PasswordIsEmpty"))
                    return;
                }
                if(this.mimaAgainEditInfo === ''){
                    G_UiForms.hint(G_Language.get("PasswordIsEmpty"))
                    return;
                }               
                if(this.mimaEditInfo != this.mimaAgainEditInfo){
                    G_UiForms.hint(G_Language.get("PasswordAgainDifference"))
                    return;
                }
                G_WithDrawControl.requesAlipayBindFirst(_name,_account,this.mimaEditInfo,this.mimaAgainEditInfo,function(ret){
                    if(ret.status)
                    {
                        G_UiForms.hint(G_Language.get("bindSuccess"));
                        G_OnFire.fire(uiEventFunction.manage, true);
                    }else
                    {
                        G_UiForms.hint(ret.message);
                    }
                }.bind(this));
            }
        }else   //银行卡
        {
            if(G_WithDrawControl.isBindBank){
                G_WithDrawControl.requesBankBind(_name,_account,this.khhEditInfo,this.bankList[this.chooseId].code,this.bankList[this.chooseId].id,function(ret){
                    if(ret.status)
                    {
                        G_UiForms.hint(G_Language.get("bindSuccess"));
                        G_OnFire.fire(uiEventFunction.manage, true);
                    }else
                    {
                        G_UiForms.hint(ret.message);
                    }
                    console.log("11111111111111111111111",ret.status)
                }.bind(this));
            }
            else
            {
                if(this.mimaEditInfo === ''){
                    G_UiForms.hint(G_Language.get("PasswordIsEmpty"))
                    return;
                }
                if(this.mimaAgainEditInfo === ''){
                    G_UiForms.hint(G_Language.get("PasswordIsEmpty"))
                    return;
                }               
                if(this.mimaEditInfo != this.mimaAgainEditInfo){
                    G_UiForms.hint(G_Language.get("PasswordAgainDifference"))
                    return;
                }
                G_WithDrawControl.requesBankBindFirst(_name,_account,this.khhEditInfo,this.bankList[this.chooseId].code,this.bankList[this.chooseId].id,
                    this.mimaEditInfo,this.mimaAgainEditInfo,function(ret){
                    if(ret.status)
                    {
                        G_UiForms.hint(G_Language.get("bindSuccess"));
                        G_OnFire.fire(uiEventFunction.manage, true);
                    }else
                    {
                        G_UiForms.hint(ret.message);
                    }
                }.bind(this));
            }
        }
        //G_OnFire.fire(uiEventFunction.manage, true);
        
    }

    onQuXiao(){
        G_OnFire.fire(uiEventFunction.manage, true);


    }

    onListRender(item: cc.Node, idx: number) {
        console.log("idx   "+idx);
        /*
        let msg = this.bankList[idx]
        if(msg){
            this.onSelectItem(msg) 
        }
        */
    }

       //当列表项被选择...
    onOneListSelected(data : any) {
        var _types = data.selectedId
        console.log("_types   "+_types);
        this.typeId = _types;
        this.onSelectItem() 
    }
    //当列表项被选择...
    onTwoListSelected(data : any) {
        var _types = data.selectedId
        console.log("_types   "+_types);
        this.chooseId = _types;
        this.onSelectItem() 
    }
    
    onSelectItem(){
        if(this.typeId == 0)   //支付宝
        {
            this.txt_khyh.active = false;
            this.txt_khh.active = false;
            this.txt_mima.active = !G_WithDrawControl.isBindAliPay();
            this.txt_mimaAgain.active = !G_WithDrawControl.isBindAliPay();
            this.nameEditbox.getText().string = this.PleaseEnterAlipayName;
            this.txt_yhkh.getComponent(cc.Label).string = this.alipayAccount;
            this.yhkhEditbox.getText().string = this.PleaseEnterAlipayAccount;
        }else  //银行卡
        {
            this.txt_khyh.active = true;
            this.txt_khh.active = true;
            this.txt_mima.active = !G_WithDrawControl.isBindBank();
            this.txt_mimaAgain.active = !G_WithDrawControl.isBindBank();
            this.nameEditbox.getText().string = this.PleaseEnterBankName;
            this.txt_yhkh.getComponent(cc.Label).string = this.BankAccount;
            this.yhkhEditbox.getText().string = this.PleaseEnterBankAccount;
        }
    }

    
    set nameEditInfo(text : string){
        this.nameEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get nameEditInfo(){
        return this.nameEditbox.getComponent("MyEditbox").getEdiboxComponent().string
    }
    
    set yhkhEditInfo(text : string){
        this.yhkhEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get yhkhEditInfo(){
        return this.yhkhEditbox.getComponent("MyEditbox").getEdiboxComponent().string
    }
    
    set khhEditInfo(text : string){
        this.khhEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get khhEditInfo(){
        return this.khhEditbox.getComponent("MyEditbox").getEdiboxComponent().string
    }
    
    set mimaEditInfo(text : string){
        this.mimaEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get mimaEditInfo(){
        return this.mimaEditbox.getComponent("MyEditbox").getEdiboxComponent().string
    }
    
    set mimaAgainEditInfo(text : string){
        this.mimaAgainEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get mimaAgainEditInfo(){
        return this.mimaAgainEditbox.getComponent("MyEditbox").getEdiboxComponent().string
    }


}
