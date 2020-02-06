import { G_Utils } from '../../Tool/Utils';
import { G_UiForms } from '../../Tool/UiForms';
import { G_Language } from '../../Language/Language';
import { G_OnFire } from '../../Net/OnFire';
import { EventRequest, uiEventFunction } from '../../Config/uiEvent';
import { G_UserControl } from '../../Controller/UserControl';

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    resuricyNumEditbox: cc.Node = null;  //安全码
    @property(cc.Node)
    passwordEditbox: cc.Node = null;  //密码
    @property(cc.Node)
    passwordAgainbox: cc.Node = null;  //再次
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
        G_Utils.onClickEnd(this.btnLanding, this.onClick, this)
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
        /*
        let name = G_UserControl.getUser().userMobile
        if(name)
            this.phoneNumInfo = name
        let pass = G_UserControl.getUser().userPassword
        if(pass)
            this.passwordInfo = pass;
         */
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
      G_UserControl.requestPasswordChangeVCode(function(ret){
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
    }


    onClick(){
        if(this.phoneNumInfo === ''){
            G_UiForms.hint(G_Language.get("securityisEmpty"))
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

        G_UserControl.requestPasswordChange(this.passwordInfo,  this.passwordAgainInfo,this.phoneNumInfo,this.verificationInfo,this.ver_key, function(ret){
            if(ret.status)
            {
                G_UiForms.hint(G_Language.get('revisionSuccess'))
            }else
            {
                G_UiForms.hint(ret.message);
            }
            G_OnFire.fire(uiEventFunction.colseBox)
        })

    }

    set phoneNumInfo(text : string){
        this.resuricyNumEditbox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get phoneNumInfo(){
        return this.resuricyNumEditbox.getComponent("MyEditbox").getEdiboxComponent().string
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

    set verificationInfo(text : string){
        this.verificationBox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get verificationInfo(){
        return this.verificationBox.getComponent("MyEditbox").getEdiboxComponent().string;
    }    
}
