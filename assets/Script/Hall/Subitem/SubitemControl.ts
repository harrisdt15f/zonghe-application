import RightNode from './RightNode';


const {ccclass, property} = cc._decorator;

const enum OPEN_TYPE{
    NONE = 0, //关闭
    OPEN = 1,  //开启
}

@ccclass
export default class SubitemControl extends cc.Component {

    @property(cc.Node)
    leftNode : cc.Node = null;
    @property(cc.Node)
    rightNode : cc.Node = null;

    @property({
        type : cc.Prefab,
        tooltip:"仅对有序的有效，往最后一层级添加"
    })
    nonePanel : cc.Prefab = null;

    private lastItem : cc.Node = null;
    private deficiencyNode : cc.Node = null;

    onLoad () {
        this.rightNode.children.forEach((item, index)=>{
            item.active = index == 0;
            if(index == 0)
                this.lastItem = item;
        },this)
        
    }

    start () {

    }
    
    onEnable(){

    }

    // update (dt) {}
    
    onSelectedItem(target){
        this.rightSelectdeItem = target.selecledId;
    }

    /**
     * 选中的页面
     * @param index 有序的下标
     */
    set rightSelectdeItem(index : any){
        var item = this.rightNode.children[index]
        this.singlePage(item, true, !item)     
    }
    get rightSelectdeItem(){
        return this.lastItem
    }

    set leftSelectedItem(index){
        var selected = this.leftNode.getComponent("myToggleSelected")
        selected.selectSingle = index
    }
    get leftSelectedItem(){
        var selected = this.leftNode.getComponent("myToggleSelected")
        return selected.selectSingle 
    }

    /**
     * 页面的显隐，会先隐藏上一次选中的页面
     * @param item 当前选中的对象
     * @param flag 显隐控制
     * @param deficiency 可选项 出现两边选择项不一样的时候使用
     */
    singlePage(item : cc.Node, flag : boolean, deficiency? : boolean){
        if(this.lastItem)
            this.lastItem.active = false;

        item = item ? item : this.addNonePanle(!item || deficiency)
        this.lastItem = item
        item.active = flag;
    }

    /**
     * 预设界面 未开启界面展示
     * @param execute 是否需要加入预设界面
     */
    addNonePanle(execute :　boolean){
        if(this.deficiencyNode){
            this.rightNode.removeChild(this.deficiencyNode)
            delete this.deficiencyNode;
            this.deficiencyNode = null;
        }
        if(!execute || !this.nonePanel)
            return;
        this.deficiencyNode = cc.instantiate(this.nonePanel)
        this.deficiencyNode.parent =  this.rightNode;
        this.deficiencyNode.active = true;
        return this.deficiencyNode
    }

}
