

const {ccclass, property} = cc._decorator;

export const textColor = {
    white : cc.color(255,255,255),
    yellow : cc.color(234,238,139)
}



@ccclass
export default class scrollviewTimesSelect extends cc.Component {

    @property(cc.Node)
    content:cc.Node= null;
    @property(cc.Node)
    listItem:cc.Node=null;

    // private _listItem = null;
    // private content = null;
    private tempItemY = [];
    private tempItem = [];

    // public selectItemIndex = 0;
    // public slideEndFunc = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // let view = this.node.getChildByName("view");
        // this.content = view.getChildByName("content");
        // this._listItem = this.content.getChildByName("item")
        this.node.on('scrolling', this._callbackScrolling, this);
        this.node.on('scroll-ended', this._callbackScrollEnded, this);
    }

    start () {
    }

    private _itemInit : Array<string> = null;
    set itemInit(array : Array<string>){
        this._itemInit = array;
        this.content.removeAllChildren();
        this.tempItem = [];
        this.tempItemY = [];
        let y = 0;
        array.forEach(function(value, index){
            var _item : cc.Node  = cc.instantiate(this.listItem)
            var _numNode : cc.Node = _item.getChildByName("num")
            _numNode.getComponent(cc.Label).string = value;
            _item.parent = this.content;
            this.setColorByScale(_numNode, 0.8, textColor.white)
            this.tempItemY.push(y)
            this.tempItem.push(_item)
            y += _item.height
        },this);

        this.selectedIndex = 0;
        var scrollviewNode = this.node.getComponent(cc.ScrollView)
        scrollviewNode.scrollToOffset(cc.v2(0, this.tempItemY[ this.selectedIndex ]));
        var _numNode = this.tempItem[this.selectedIndex].getChildByName("num")
        this.setColorByScale(_numNode, 1, textColor.yellow)
    }
    get itemInit(){
        return this._itemInit;
    }
    

    private _selectedIndex : number = 0;
    set selectedIndex(sIdx : number){
        this._selectedIndex = sIdx;
    }
    get selectedIndex(){
        return this._selectedIndex;
    }

    setColorByScale(node : cc.Node, scale : number, color : cc.Color){
        node.color = color;
        node.scale = scale
    }

    // update (dt) {}
    
    _callbackScrolling(scrollView) {
        scrollView.content.children.forEach((childNode: cc.Node, idx : number) => {
            var _numNode = childNode.getChildByName("num")
            this.setColorByScale(_numNode, 0.8, textColor.white)
        },this)

        for (let index = 0; index < this.tempItemY.length; index++) {
            let offy = scrollView.getScrollOffset().y - 10;
            let itemY = this.tempItemY[index];
            let endItemY = this.tempItemY[this.tempItemY.length-1]
            if (offy <= itemY || ( itemY >= endItemY && offy > endItemY) ){
                this.selectedIndex = index
                var numNode = this.tempItem[index].getChildByName("num")
                this.setColorByScale(numNode, 1, textColor.yellow);
                break;
            }
        }

    }

    _callbackScrollEnded(scrollView){
        var idx = this.selectedIndex;
        var itemY = this.tempItemY[idx]
        var scrollviewNode = this.node.getComponent(cc.ScrollView)
        scrollviewNode.scrollToOffset(cc.v2( .1, itemY ));
    }



}
