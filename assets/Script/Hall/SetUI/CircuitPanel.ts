

const {ccclass, property} = cc._decorator;

@ccclass
export default class CircuitPanel extends cc.Component {



    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let formNode = this.node.getChildByName("formNode")
        for (let index = 1; index <= formNode.children.length; index++) {
            let box = formNode.getChildByName("sprCircuitBox_"+index);
            box.on(cc.Node.EventType.TOUCH_END, this.onSelectLine.bind(this));
        }
        this.setToggle(1)
    }

    start () {

    }

    // update (dt) {}


    onSelectLine(event){
        let str = event.target.name
        var strList = str.split("_")
        this.setToggle(strList[1])
    }


    setToggle(key){
        let formNode = this.node.getChildByName("formNode")
        for (let index = 1; index <= formNode.children.length; index++) {
            let sound = formNode.getChildByName("sprCircuitBox_"+index)
            let checkmark = sound.getChildByName("checkmark")
            checkmark.active = false;
        }
        let sound2 = formNode.getChildByName("sprCircuitBox_"+key)
        let checkmark = sound2.getChildByName("checkmark")
        checkmark.active = !checkmark.active;
    }
}
