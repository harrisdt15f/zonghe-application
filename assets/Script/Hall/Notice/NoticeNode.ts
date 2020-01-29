



const {ccclass, property} = cc._decorator;

@ccclass
export default class NoticeNode extends cc.Component {


    @property(cc.Node)
    btnClose:cc.Node = null;
    @property(cc.Node)
    textgg:cc.Node = null;
    @property(cc.Node)
    pageview:cc.Node = null;
    @property(cc.Node)
    content:cc.Node = null;
    @property(cc.Node)
    page:cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.active = true;

        this.btnClose.on(cc.Node.EventType.TOUCH_END, this.onClose.bind(this));



    }

    start () {

    }

    // update (dt) {}


    onClose(){
        this.node.active = false;
    }
}
