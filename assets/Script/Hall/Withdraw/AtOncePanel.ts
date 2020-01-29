
import { G_OnFire } from '../../Net/OnFire';
import {G_UiForms} from "../../Tool/UiForms"
import {uiEventModules, uiEventFunction} from "../../Config/uiEvent"
import { TEXT_INFO } from '../../Config/IdentifyKey';

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

    onLoad () {
        this.btnBangDing.on(cc.Node.EventType.TOUCH_END, this.onBangDing.bind(this));
        this.btnClear.on(cc.Node.EventType.TOUCH_END, this.onClear.bind(this));
        this.btnSet.on(cc.Node.EventType.TOUCH_END, this.onSet.bind(this));
        var classEdithbox = this.myEditboxGolde.getComponent("MyEditbox")
        classEdithbox.onDidEndedCallback = function(target) {
            console.log("输入结束》》")
        }
        classEdithbox.onTextChangedCallback = function(target) {
            console.log("录入》》")
        }
    }

    start () {
    }

    onEnable(){
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
