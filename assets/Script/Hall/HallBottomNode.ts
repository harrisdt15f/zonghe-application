
import {uiEventModules} from "../Config/uiEvent"
import {G_UiForms} from "../Tool/UiForms"
import { G_UserControl } from "../Controller/UserControl";
import { G_Utils } from "../Tool/Utils";
import { G_Language } from "../Language/Language";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HallBottomNode extends cc.Component {

    onLoad () {
        let tempData = Object.keys(uiEventModules)
        this.node.children.forEach((item, idx)=>{
            item.name = tempData[idx+1]; //不需要取第一个
            G_Utils.onClickEnd(item, this.onClick, this)
        })
    }

    start () {
    }

    // update (dt) {}
    onClick(event){
        let eventName = event.target.name
        console.log("eventName  "+eventName)
        let exclude = (eventName === "activityNode" || eventName === "serviceNode") 
        let flag = G_UserControl.isLogin()
        let formsName = exclude ? eventName : (flag ? eventName : uiEventModules.landingNode);
        if(!flag)
            G_UiForms.hint(G_Language.get("PleaseLogInFirst"))
            console.log("formsName  "+formsName)  
        G_UiForms.show(formsName)
        //G_UiForms.show(eventName)
    }
}
