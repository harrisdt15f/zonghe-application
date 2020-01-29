
import { LoginTab_Type } from '../Config/IdentifyKey';
import {uiEventModules, EventRequest} from "../Config/uiEvent"
import { G_UiForms } from '../Tool/UiForms';
import { G_Language } from '../Language/Language';
import {LANGUAGE} from "../Config/config"
import { G_Sound } from '../Tool/Sound';
import { G_UserControl } from '../Controller/UserControl';
import { Platforms } from '../Platform/Platforms';

const {ccclass, property} = cc._decorator;
@ccclass
export default class HallScene extends cc.Component {

    @property(cc.Prefab)
    hall : cc.Prefab = null;

    onLoad () {

        // cc.debug.setDisplayStats(false)
        if(cc.winSize.height    < 750 || cc.winSize.height > 750){
            this.node.scaleY = cc.winSize.height / 750
            console.log("【缩放比例】", cc.director.getWinSize().height/750 )
        }


        G_UiForms.init(this.node);
        G_Sound.soundMusic()
        G_Language.init(LANGUAGE)

        // cc.sys.localStorage.clear();
        G_UserControl.detectionLogin(function(data){
            if(!data.status){
                let _nodeName = uiEventModules.landingNode;
                G_UiForms.show(_nodeName)
                G_UiForms.setSelectPanelShow(LoginTab_Type.login);
            }
        }.bind(this));

        let p = new Platforms()
        p.eixtGame();


    }

    start () {
    }
    // update (dt) {}

    onSelectedItem(target){
        var index = target.selecledId;
    }

}
