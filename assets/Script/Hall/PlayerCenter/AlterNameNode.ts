


import { G_OnFire } from "../../Net/OnFire";
import { uiEventFunction } from '../../Config/uiEvent';


const {ccclass, property} = cc._decorator;

@ccclass
export default class AlterNameNode extends cc.Component {

    name : string = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var btnNO = this.node.getChildByName("btnNO")
        var myEditboxName = this.node.getChildByName("myEditboxName")
        var classEdithbox = myEditboxName.getComponent("MyEditbox")
        classEdithbox.onDidEndedCallback = function(target) {
            console.log("输入结束》》")
        }
        classEdithbox.onTextChangedCallback = function(target) {
            console.log("录入》》")
            this.name = target.string;
        }.bind(this)

        var btnOK = this.node.getChildByName("btnOK")
        btnNO.on(cc.Node.EventType.TOUCH_END, this.onCilck, this);
        btnOK.on(cc.Node.EventType.TOUCH_END, this.onCilck, this);

    }

    start () {

    }

    // update (dt) {}


    onCilck(event){
        var btnName = event.target.name;
        if(btnName === "btnOK"){
            // G_OnFire.fire(uiEventFunction.rename_event,this.name)
        }
        G_OnFire.fire(uiEventFunction.secondaryInterface);
    }
}
