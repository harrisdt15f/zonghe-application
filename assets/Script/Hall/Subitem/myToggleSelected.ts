import { G_Utils } from '../../Tool/Utils';

const {ccclass, property, executionOrder} = cc._decorator;

interface  itemNode{
    selecledId : number;
    isChecked : boolean;
}

@ccclass
@executionOrder(-6000)
export default class myToggleSelected extends cc.Component {
    @property(cc.Node)
    content:cc.Node = null;

    @property({
        tooltip:"选中此选项，在选择后下次点击还可以响应，状态不变"
    })
    allowSwitchOff : boolean = false;

    @property({
        type: cc.Component.EventHandler,
        tooltip: CC_DEV && '点击事件',
    })
    private clickEndEvent: cc.Component.EventHandler = new cc.Component.EventHandler();

    private currNode : cc.Node = null;
    private lastSelected : cc.Node = null;

    onLoad () {
        this.currNode = this.content || this.node;
        this.currNode.children.forEach((item, index)=>{
            if(index == 0)
                this.lastSelected = item

            var itemAs = item as unknown as itemNode
            itemAs.selecledId = index
            itemAs.isChecked = index == 0;
            this.singleItem(item, index == 0)
            G_Utils.onClickEnd(item, this.onToggleEnd, this)
        }, this)
    }

    start () {
    }
    
    // update (dt) {}

    onEnable(){
    }

    onToggleEnd(item){
        this.select = item.target
    }

    /**
     * 选项显隐控制
     * @param item 当前的选择
     * @param flag 显隐
     */
    singleItem(item : any, flag : boolean){
        item.isChecked = flag;
        item.getChildByName("select").active = flag
        item.getChildByName("BgText").active = !flag
        item.getChildByName("checkmarkText").active = flag
    }

    /**
     * 控制选择某一项
     * @param key  下标（有序）
     */
    set selectSingle(key : any){
        this.select =  this.currNode.children[key];
    }

    get selectSingle(){
        return this.lastSelected
    }

    set select(item : any){
        if(!this.allowSwitchOff && item.isChecked)
            return;
        if(this.lastSelected) 
            this.singleItem(this.lastSelected, false)

        this.lastSelected = item
        this.singleItem(item, true)
        if(this.clickEndEvent)
            cc.Component.EventHandler.emitEvents([this.clickEndEvent], item);
    }
    get select(){
        return this.lastSelected
    }
}
