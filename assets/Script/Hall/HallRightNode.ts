

const {ccclass, property} = cc._decorator;

@ccclass
export default class HallRightNode extends cc.Component {

    @property(cc.Prefab)
    private gamePrefab: cc.Prefab[] = [];


    // onLoad () {}

    start () {
    //    this.creatorGameIcon(0)
    }

    // update (dt) {}


    creatorGameIcon(types){
        let GameScrollview = this.node.getChildByName("GameScrollview")
        let view = GameScrollview.getChildByName("view")
        let content = view.getChildByName("content")
        content.removeAllChildren();
        for (let index = 0; index < 13; index++) {
            let piece = cc.instantiate(this.gamePrefab[types])
            piece.parent = content;
            piece.on(cc.Node.EventType.TOUCH_END, this.onOpenGame.bind(this));

        }
    }


    onOpenGame(){
        // this.gameNode.active = true;

    }

    onDestroy(){
    }
}
