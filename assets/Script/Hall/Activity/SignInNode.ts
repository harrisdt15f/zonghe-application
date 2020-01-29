
const {ccclass, property} = cc._decorator;

@ccclass
export default class SignInNode extends cc.Component {


    @property(cc.Node)
    signInBox:cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    onCanYu(){
        this.signInBox.active = true;
    }

}
