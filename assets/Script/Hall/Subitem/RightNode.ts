

const {ccclass, property} = cc._decorator;

@ccclass
export default class RightNode extends cc.Component {

    @property
    strType : String = "";

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}


    tempList : any

    onOffNode(){
        //商店
        var temp = [
            [ 0,      1],
            [ 0,      1],
            [ 1,      1],
            [ -1,     0],
            [ -1,     0],
            [ 2,      1]
        ]

        return temp;
    }
}
