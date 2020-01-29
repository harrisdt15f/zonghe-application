

// this.content.getComponent(cc.Layout).spacingY
// this.content.getComponent(cc.Layout).spacingX
// this.content.getComponent(cc.Layout).paddingBottom
// this.content.getComponent(cc.Layout).paddingLeft
// this.content.getComponent(cc.Layout).paddingRight
// this.content.getComponent(cc.Layout).paddingTop
// this.content.getComponent(cc.Layout).verticalDirection
const {ccclass, property} = cc._decorator;

@ccclass
export default class PagingScrollView extends cc.Component {

    @property(cc.Node)
    item : cc.Node = null;

    @property(cc.Node)
    labelTop:cc.Node = null;
    @property(cc.Node)
    labelBottom:cc.Node = null;

    //----------------------

    public content = null;
    public view = null;

    private tempArray = [];

    private endCount = 10;
    private mvoeCount = 0;
    private startCount = 0;
    private viewHeight = 0;

    public addItemFunc = null;
    public toTopRequestFunc = null;
    public toBottomRequesFunc = null;

    time = 0;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        this.view = this.node.getChildByName("view");
        this.content = this.view.getChildByName("content");
        this.content.removeAllChildren();
        // let arrayItem = this.content.children
        this.node.on('scroll-to-top', this.callbackToTop, this);
        this.node.on('scroll-to-bottom', this.callbackToBottom, this);
        this.node.on('touch-up', this.callbackTouchUp, this);

        this.node.on('bounce-bottom', this.callbackBounceBottom, this);
        this.node.on('bounce-top', this.callbackBounceTop, this);

        this.topTextActive(false)
        this.bottomTextActive(false)

        for (let index = 0; index < 13; index++) {
           this.tempArray.push(index+"测试："+index)
        }

    }

    start () {
        this.init();
    }

    // update (dt) {
    // }

    init(){
        var _layout = this.content.getComponent(cc.Layout)
        var _spacingy = _layout.spacingY
        var top = _layout.paddingTop
        var bottom = _layout.paddingBottom
        var y = 0;
        var h = 0;
        for (let index = this.startCount; index < this.endCount; index++) {
            if (this.tempArray[index]){
                let temp = cc.instantiate(this.item)
                temp.parent = this.content
                h += temp.height;
                y += _spacingy;
                if (this.addItemFunc){
                    this.addItemFunc(temp, this.tempArray[index], index)
                }
            }
        }
        this.viewHeight = h + y + top + bottom;
        if(this.tempArray.length <10 && this.viewHeight <  this.view.height){
            this.viewHeight += this.view.height 
        }
        this.content.height  += this.viewHeight
    }


    callbackToTop(scrollView){
        // console.log("最顶",scrollView.getScrollOffset())
        this.topTextActive(true)
        if (this.toTopRequestFunc) {
            this.toTopRequestFunc();
        }  
    }

    callbackToBottom(){
        if (this.mvoeCount >= Math.floor(this.tempArray.length / 10)){
            // console.log("最低层了")
            this.bottomTextActive(true)
            return;
        }
        if (this.toBottomRequesFunc){
            this.toBottomRequesFunc();
        }
        this.mvoeCount++;
        this.endCount += 10;
        this.startCount += 10;
        this.init();
    }


    callbackTouchUp(scrollView){
    }

    callbackBounceBottom(){
        console.log("弹跳最低")
        this.bottomTextActive(false)
    }

    callbackBounceTop(){
        console.log("弹跳最高")
        this.topTextActive(false)
        this.content.removeAllChildren();
        this.mvoeCount = 0;
        this.endCount = 10;
        this.startCount = 0;
        this.content.height = 0
        this.viewHeight = 0;
        this.init();
    }


    topTextActive(flag = false){
        if(this.labelTop){
            this.labelTop.active = flag;
        }
    }
    bottomTextActive(flag = false){
        if(this.labelBottom){
            this.labelBottom.active = flag;
        }
    }
}
