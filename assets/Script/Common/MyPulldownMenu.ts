
/**
 * 自定义 下拉列表
 */
import List from './List';
import { G_Utils } from '../Tool/Utils';


const {ccclass, property} = cc._decorator;

@ccclass
export default class MyPullDownSelectNode extends cc.Component {
    @property(List)
    list : List = null;
    @property(cc.Node)
    selectMenu : cc.Node = null;
    @property(cc.Label)
    text : cc.Label = null;
    @property(cc.Node)
    arrows : cc.Node = null;


    @property(cc.Node)
    mask : cc.Node = null;

    @property({
        type: cc.Component.EventHandler,
        tooltip: CC_DEV && '选择',
    })
    private selectedEvent: cc.Component.EventHandler = new cc.Component.EventHandler();
   

    @property({
        type: cc.Component.EventHandler,
        tooltip: CC_DEV && '点击事件',
    })
    private clickEvent: cc.Component.EventHandler = new cc.Component.EventHandler();
    // LIFE-CYCLE CALLBACKS:

    private _tempFlag : boolean = true;

    private _selectResult : any = {};
    set selectResult(result : any){
        this._selectResult = result;
    }
    get selectResult(){
        return this._selectResult
    }

    private _menuData : any = null;
    set menuData(data: any){
        this._menuData = data;
        this.text.getComponent(cc.Label).string = data[0];
        if(this.list.node.active){
            this.list.numItems = this._menuData.length
        }
        this.selectResult = {
            "selectedId" : 0,
            "text": data[0],
        }
    }
    get menuData(){
        return this._menuData;
    }

    private _menuView : boolean = null;
    set menuView(flag : boolean){
        this._menuView = flag;
        this.list.node.active = flag;
        this.mask.active = flag;
        if(this._menuData 
            && this.list.numItems <= 0){
            this._tempFlag = false;
            this.list.numItems = this._menuData.length
            this.list.selectedId = 0;
        }
        this.arrows.angle = !this.list.node.active ? 0 : 180;
        //点击在此控件 注册事件监听
        if(this.clickEvent){
            cc.Component.EventHandler.emitEvents([this.clickEvent], this.node, flag);
        }
    }
    get menuView(){
        return this._menuView;
    }

    onLoad () {
        // this.selectMenu.on(cc.Node.EventType.TOUCH_END, this.onSelectMenu.bind(this));
        G_Utils.onClickEnd(this.selectMenu, this.onSelectMenu, this)
        this._menuView = this.list.node.active
        if(this.mask){
            this.mask.x = 0;
            this.mask.y = 0;
            this.mask.width = cc.winSize.width
            this.mask.height = cc.winSize.height
            var pos : cc.Vec2 = this.mask.convertToWorldSpaceAR(
                cc.v2(
                    this.mask.x - this.mask.anchorX * this.mask.width,
                    this.mask.y - this.mask.anchorY * this.mask.height
                )
            )
            this.mask.x = -pos.x
            this.mask.y = -pos.y
            // this.mask.on(cc.Node.EventType.TOUCH_END, this.onMaskClose, this);
            G_Utils.onClickEnd(this.mask, this.onMaskClose, this)
            this.mask.active = this._menuView
        }
    }

    start () {
    }


    onEnable(){
 
    }

    // update (dt) {}

    onSelectMenu(){
        this.menuView = !this.menuView;
    }

    onListRender(item: cc.Node, idx: number) {
        item.getChildByName("text").getComponent(cc.Label).string = this._menuData[idx]
    }

    //当列表项被选择...
    onListSelected(item: any, selectedId: number, lastSelectedId: number, val: number) {
        if (!item)
            return;

        //防止第一次初始的时候关闭了下拉列表框
        if(!this._tempFlag){
            this._tempFlag = true;
            return;
        }

        this.selectResult = {
            "selectedId" : selectedId,
            "text": this._menuData[selectedId],
        }
        this.menuView = !this.menuView;
        this.text.getComponent(cc.Label).string = this._menuData[selectedId];
        
        if (this.selectedEvent) {
            cc.Component.EventHandler.emitEvents([this.selectedEvent], this.selectResult);
        }
    }

    onMaskClose(){
        this.menuView = !this.menuView;
    }

}
