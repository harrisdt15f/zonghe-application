import { G_Utils } from '../../Tool/Utils';
import { G_UiForms } from '../../Tool/UiForms';
import { G_Language } from '../../Language/Language';
import { G_OnFire } from '../../Net/OnFire';
import { EventRequest, uiEventFunction } from '../../Config/uiEvent';
import { G_UserControl } from '../../Controller/UserControl';


const {ccclass, property} = cc._decorator;

@ccclass
export default class registerPanel extends cc.Component {

    @property(cc.Node)
    phoneNumEditbox: cc.Node = null;  //号码
    @property(cc.Node)
    passwordEditbox: cc.Node = null;  //密码
    @property(cc.Node)
    passwordAgainbox: cc.Node = null;  //再次
    @property(cc.Node)
    invatationBox: cc.Node = null;  //邀请码
    @property(cc.Node)
    verificationBox: cc.Node = null;  //验证码


    @property(cc.Node)
    verBtnLanding: cc.Node = null;  
    @property(cc.Label)
    cdTimeLabel:cc.Label = null;

    @property(cc.Node)
    btnLanding: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    private ver_mobile = null;  //验证码手机号
    private ver_key = null;   
   // private ver_code = null;  
    private cd_time = 0;

    onLoad () {
        G_Utils.onClickEnd(this.btnLanding, this.onLanding, this)
        G_Utils.onClickEnd(this.verBtnLanding,this.onVerificationClick,this)
    }

    start () {

    }

    update(dt){
        if(this.cd_time >0){
            this.cd_time -= dt;
            this.onCheckVerificationState();
        }
    }

    onEnable(){
        this.onCheckVerificationState();    
    }

    onCheckVerificationState()
    {
        if(this.cd_time > 0){
            this.cdTimeLabel.string = Math.floor(this.cd_time).toString(); 
        }
        else{
            this.cdTimeLabel.string = '发送';  
        }
    }

    onVerificationClick(){
        if(this.cd_time > 0)
        {
            return;
        }
        if(!this.verBtnLanding.getComponent(cc.Button).enabled)
        {
            return;
        }
        this.verBtnLanding.getComponent(cc.Button).enabled= false;
        this.scheduleOnce(()=>{
            this.verBtnLanding.getComponent(cc.Button).enabled= true;
        },1);

        let phone = this.phoneNumInfo 
        if(phone)
        {
            if(!G_Utils.isPoneAvailable(phone))
            {
                G_UiForms.hint(G_Language.get("PhoneFormatWrong"));
                return;
            }
            G_UserControl.requestVerificationCode(phone,function(ret){
                if(ret.status){
                    G_UiForms.hint(G_Language.get('verificationCodeSend'));

                    this.ver_mobile = this.phoneNumInfo;
                    this.cd_time = ret.data['nextReqTime'] - ret.data['currentReqTime'];
                    this.ver_key = ret.data['verification_key'];
                    // this.ver_code = ret.data['verification_code'];
                    console.log('cd_time  '+ this.cd_time + "  ver_code  " +ret.data['verification_code']);
                    this.onCheckVerificationState();   
                }else
                {
                    G_UiForms.hint(ret.message);
                }
            }.bind(this))   
        }else
        {
            console.log('phone   is empty');
        }

    }


    onLanding(){
        if(this.phoneNumInfo === ''){
            G_UiForms.hint(G_Language.get("AccountIsEmpty"))
            return;
        }
        if(this.passwordInfo === ''){
            G_UiForms.hint(G_Language.get("PasswordIsEmpty"))
            return;
        }
        if(this.passwordAgainInfo != this.passwordInfo){
            G_UiForms.hint(G_Language.get("PasswordAgainDifference"))
            return;
        }
        if(this.verificationInfo === '')
        {
            G_UiForms.hint(G_Language.get("verificationIsEmpty"))
            return;
        }
        if(!this.btnLanding.getComponent(cc.Button).enabled)
        {
            return;
        }
        //this.btnLanding.getComponent(cc.Button).enabled= false;
        //this.scheduleOnce(()=>{
        //    this.btnLanding.getComponent(cc.Button).enabled= true;
       // },1);
        G_UserControl.requestRegister(this.ver_mobile,this.passwordInfo,  this.passwordAgainInfo,this.verificationInfo,this.ver_key,this.invatationInfo, function(ret){
            //this.btnLanding.getComponent(cc.Button).enabled= true;
            if(ret.status)
            {
                G_UiForms.hint(G_Language.get('registerSuccess'))
            }else
            {
                G_UiForms.hint(ret.message);
            }
            G_OnFire.fire(uiEventFunction.colseBox)
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

    set passwordAgainInfo(text : string){
        this.passwordAgainbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get passwordAgainInfo(){
        return this.passwordAgainbox.getComponent("MyEditbox").getEdiboxComponent().string;
    }    

    set invatationInfo(text : string){
        this.invatationBox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get invatationInfo(){
        return this.invatationBox.getComponent("MyEditbox").getEdiboxComponent().string;
    }    

    set verificationInfo(text : string){
        this.verificationBox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get verificationInfo(){
        return this.verificationBox.getComponent("MyEditbox").getEdiboxComponent().string;
    }    

}
