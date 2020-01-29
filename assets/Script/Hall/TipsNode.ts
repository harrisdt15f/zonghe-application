

const {ccclass, property} = cc._decorator;
@ccclass
export default class TipsNode extends cc.Component {

    @property(cc.Label)
    text : cc.Label = null;
    // onLoad () {}
    start () {
    }
    // update (dt) {}
    onEnable(){
        this.scheduleOnce(function () {
            this.node.active = false;
        },2)
    }


    set textString(text : string){
        this.text.string = text;
        this.node.active = true;
    }

    get textString(){
        return this.text.string
    }

}


