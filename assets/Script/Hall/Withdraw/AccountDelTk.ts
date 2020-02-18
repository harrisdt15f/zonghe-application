

import { G_Language } from '../../Language/Language';
import { ACCOUNT_TYPE } from "../../Config/config";
import { uiEventModules, uiEventFunction } from "../../Config/uiEvent";
import {G_UiForms} from "../../Tool/UiForms"
import { G_OnFire } from '../../Net/OnFire';
import { TEXT_INFO } from '../../Config/IdentifyKey';
import { G_WithDrawControl } from '../../Controller/WithDrawControl';
import { G_Utils } from '../../Tool/Utils';
import { G_UserControl } from '../../Controller/UserControl';

const {ccclass, property} = cc._decorator;

@ccclass
export default class AccountDelTk extends cc.Component {

    @property(cc.Node)
    nameEditBox : cc.Node = null;
    @property(cc.Node)
    securyEditBox : cc.Node = null;
    @property(cc.Node)
    codeEditBox : cc.Node = null;
    @property(cc.Label)
    cdTimeLabel : cc.Label = null;  

    private cd_time = 0;

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

    set nameEditInfo(text : string){
        this.nameEditBox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get nameEditInfo(){
        return this.nameEditBox.getComponent("MyEditbox").getEdiboxComponent().string
    }
    
    set securyEditInfo(text : string){
        this.securyEditBox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get securyEditInfo(){
        return this.securyEditBox.getComponent("MyEditbox").getEdiboxComponent().string
    }
    
    set codeEditInfo(text : string){
        this.codeEditBox.getComponent("MyEditbox").getEdiboxComponent().string = text;
    }
    get codeEditInfo(){
        return this.codeEditBox.getComponent("MyEditbox").getEdiboxComponent().string
    }
 
    onVerificationClick(){
        if(this.cd_time > 0)
        {
            return;
        }
        G_UserControl.requestVerificationCode(G_UserControl.getUser().userMobile,function(ret){
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

    onBtnTrue(){      
        G_OnFire.fire(uiEventFunction.manage, true);
    }

    onBtnFalse(){
        G_OnFire.fire(uiEventFunction.manage, true);
    }

}
