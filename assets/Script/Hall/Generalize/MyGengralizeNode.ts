

const {ccclass, property} = cc._decorator;

@ccclass
export default class MyGengralizeNode extends cc.Component {

    @property(cc.Node)
    node1:cc.Node = null;

    @property(cc.Node)
    node2:cc.Node = null;

    @property(cc.Node)
    save:cc.Node = null;

    @property(cc.Node)
    copywww:cc.Node = null;

    @property(cc.Label)
    labelURL:cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        for (let index = 0; index < this.node2.children.length; index++) {
            const element =  this.node2.children[index];
            element.on(cc.Node.EventType.TOUCH_END, this.onClick.bind(this));
        }
        this.save.on(cc.Node.EventType.TOUCH_END, this.onSave.bind(this));
        this.copywww.on(cc.Node.EventType.TOUCH_END, this.onCopyUrl.bind(this));
    }

    start () {

    }

    // update (dt) {}

    onEnable(){
        this.setTeamSizeData()
    }

    setTeamSizeData(){
        for (let index = 0; index < this.node1.children.length; index++) {
            const element = this.node1.children[index];
            element.getChildByName("label_0").getComponent(cc.Label).string = String(index);
        }
    }

    onClick(target){
        var nodeName = target.target.name
        if(nodeName === "ewm"){

        }else if(nodeName === "weixin"){

        }else if(nodeName === "QQ"){

        }else if(nodeName === "pyq"){

        }
        console.log("》》》分享》》",nodeName)
    }

    onSave(){
        console.log("》》》保存》》")
    }

    onCopyUrl(){
        console.log("》》》复制url》》")
    }
}
