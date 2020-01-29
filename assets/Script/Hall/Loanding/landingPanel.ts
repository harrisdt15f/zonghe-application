import { G_Utils } from '../../Tool/Utils';
import { G_UiForms } from '../../Tool/UiForms';
import { G_Language } from '../../Language/Language';
import { G_OnFire } from '../../Net/OnFire';
import { EventRequest, uiEventFunction } from '../../Config/uiEvent';
import { G_UserControl } from '../../Controller/UserControl';


const {ccclass, property} = cc._decorator;

@ccclass
export default class landingPanel extends cc.Component {

    @property(cc.Node)
    phoneNumEditbox: cc.Node = null;
    @property(cc.Node)
    passwordEditbox: cc.Node = null;
    @property(cc.Node)
    btnLanding: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        G_Utils.onClickEnd(this.btnLanding, this.onLanding, this)
    }

    start () {

    }

    // update (dt) {}

    onEnable(){
        let name = G_UserControl.getUser().userMobile
        if(name)
            this.phoneNumInfo = name
        let pass = G_UserControl.getUser().userPassword
        if(pass)
            this.passwordInfo = pass;
    }

    private isLanding = true;
    onLanding(){
        if(this.phoneNumInfo === ''){
            G_UiForms.hint(G_Language.get("AccountIsEmpty"))
            return;
        }
        if(this.passwordInfo === ''){
            G_UiForms.hint(G_Language.get("PasswordIsEmpty"))
            return;
        }
        if(!this.btnLanding.getComponent(cc.Button).enabled)
        {
            console.log('2222')
            return;
        }
        if(!this.isLanding)
        {
            return;
        }
        console.log('333')
        this.btnLanding.getComponent(cc.Button).enabled= false;
        this.isLanding = false;
        this.scheduleOnce(()=>{
           // this.btnLanding.getComponent(cc.Button).enabled= true;
            this.isLanding = true;
        },1);
        G_UserControl.requestLogin(this.phoneNumInfo,  this.passwordInfo, function(data){
            this.btnLanding.getComponent(cc.Button).enabled= true;
            if(data.status)
            {
                G_OnFire.fire(uiEventFunction.colseBox)
            }else
            {
                G_UiForms.hint(data.message);
            }
        }.bind(this))

    }

    set phoneNumInfo(text : string){
        this.phoneNumEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get phoneNumInfo(){
        return this.phoneNumEditbox.getComponent("MyEditbox").getEdiboxComponent().string
    }

    set passwordInfo(text : string){
        this.passwordEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get passwordInfo(){
        return this.passwordEditbox.getComponent("MyEditbox").getEdiboxComponent().string;
    }

}
