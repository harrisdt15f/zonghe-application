

import { G_Language } from '../../Language/Language';
import { ACCOUNT_TYPE } from "../../Config/config";
import { uiEventModules, uiEventFunction } from "../../Config/uiEvent";
import {G_UiForms} from "../../Tool/UiForms"
import { G_OnFire } from '../../Net/OnFire';
import { TEXT_INFO } from '../../Config/IdentifyKey';

const {ccclass, property} = cc._decorator;

@ccclass
export default class node extends cc.Component {

    @property(cc.Node)
    menuList : cc.Node = null;

    private txt_khm = null;
    private txt_khdz = null;
    private txt_yhkh = null;
    private txt_xm = null;
    private txt_zfbzh = null;
    private txt_zh = null;

    private classNameEditbox = null;
    private classDiZiEditbox = null;
    private classKaHaoEditbox = null;

    openAccountSiteName : string = G_Language.get("PleaseEnterYourAccountName")
    openAccountSite : string = G_Language.get("PleaseEnterTheAccountOpeningAddress")
    bankNum : string = G_Language.get("PleaseEnterTheBankCardNumber")
    alipayName : string = G_Language.get("PleaseEnterYourAlipayUserName")
    alipayAccount : string = G_Language.get("PleaseEnterAlipayAccount")
    againAlipayAccount : string = G_Language.get("PleaseEnterTheAlipayAccountAgain")


    private classMenu = null;
    private _myPulldownMenu = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initBankCardNode();
        if(this.menuList){
            this._myPulldownMenu = this.menuList.getComponent("MyPulldownMenu")
            this._myPulldownMenu.menuData = G_Language.get("bankCardNameList")
            var selectedId = this._myPulldownMenu.selectResult.selectedId;
            var selectedText = this._myPulldownMenu.selectResult.text;
            console.log("选择了什么》》",selectedId,selectedText)
        }
    }

    start () {

    }

    // update (dt) {}

    initBankCardNode(){
        //开户名
        this.txt_khm = this.node.getChildByName("txt_khm");
        this.txt_khm.active = false;
        //开户银行
        // let txt_khyh = this.node.getChildByName("txt_khyh");
        //开户地址
        this.txt_khdz = this.node.getChildByName("txt_khdz");
        this.txt_khdz.active = false;
        //银行卡号
        this.txt_yhkh = this.node.getChildByName("txt_yhkh");
        this.txt_yhkh.active = false;
        //安全码
        // let txt_aqm = this.node.getChildByName("txt_aqm");
        //姓名
        this.txt_xm = this.node.getChildByName("txt_xm");
        this.txt_xm.active = true;
        //支付宝账号
        this.txt_zfbzh = this.node.getChildByName("txt_zfbzh");
        this.txt_zfbzh.active = true;
        //确定支付宝账号
        this.txt_zh = this.node.getChildByName("txt_zh");
        this.txt_zh.active = true;
        
        //开户名
        let nameEditbox = this.node.getChildByName("nameEditbox");
        //开户地址
        let diZiEditbox = this.node.getChildByName("diZiEditbox");
        //银行卡号
        let kaHaoEditbox = this.node.getChildByName("kaHaoEditbox");
    
        this.classNameEditbox = nameEditbox.getComponent("MyEditbox");
        this.classNameEditbox.getText().string = this.alipayName;

        this.classDiZiEditbox = diZiEditbox.getComponent("MyEditbox");
        this.classDiZiEditbox.getText().string =this.alipayAccount

        this.classKaHaoEditbox = kaHaoEditbox.getComponent("MyEditbox");
        this.classKaHaoEditbox.getText().string = this.againAlipayAccount

        this.classKaHaoEditbox.onDidEndedCallback = function(target) {
            console.log("输入结束》》")
        }
        this.classKaHaoEditbox.onEditboxTextChanged = function(target) {
            console.log("录入》》")
        }

        //确定绑定
        let btnQueDing = this.node.getChildByName("btnQueDing");
        btnQueDing.on(cc.Node.EventType.TOUCH_END, this.onQueDing.bind(this));
        //取消
        let btnQuXiao = this.node.getChildByName("btnQuXiao");
        btnQuXiao.on(cc.Node.EventType.TOUCH_END, this.onQuXiao.bind(this));

        //安全码
        let labelAnQuanMa = this.node.getChildByName("labelAnQuanMa");
        //设置安全码
        let btnSet = this.node.getChildByName("btnSet");
        btnSet.on(cc.Node.EventType.TOUCH_END, this.onSetanquanma.bind(this));
        
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

       //当列表项被选择...
    onListSelected(data : any) {
        var _types = data.selectedId
        //银行卡状态
        this.txt_khm.active = _types >= ACCOUNT_TYPE.BANK;
        this.txt_khdz.active = _types >= ACCOUNT_TYPE.BANK;
        this.txt_yhkh.active = _types >= ACCOUNT_TYPE.BANK;
        // 支付宝状态
        this.txt_xm.active = _types <= ACCOUNT_TYPE.ALIPAY;
        this.txt_zfbzh.active = _types <= ACCOUNT_TYPE.ALIPAY;
        this.txt_zh.active = _types <= ACCOUNT_TYPE.ALIPAY;

        let str1 = _types >= ACCOUNT_TYPE.BANK ? this.openAccountSiteName : this.alipayName;
        let str2 = _types >= ACCOUNT_TYPE.BANK ? this.openAccountSite : this.alipayAccount;
        let str3 = _types >= ACCOUNT_TYPE.BANK ? this.bankNum :this.againAlipayAccount;

        this.classNameEditbox.getText().string = str1;
        this.classDiZiEditbox.getText().string = str2;
        this.classKaHaoEditbox.getText().string = str3;
    }

}
