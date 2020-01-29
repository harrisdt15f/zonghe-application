

const {ccclass, property} = cc._decorator;

@ccclass
export default class RedWarsNode extends cc.Component {

    @property(cc.Node)
    redWarsBox: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    onCanYu(){
        this.redWarsBox.active = true;
    }
}
