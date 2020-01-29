import List from "../../Common/List";




const {ccclass, property} = cc._decorator;

@ccclass
export default class EBankPanel extends cc.Component {

    @property(List)
    bankCardWayList: List = null;

    private diKuan = null;
    onLoad () {
        this.diKuan = this.node.getChildByName("dikuan");

        var btnFuZhiHuMing  = this.diKuan.getChildByName("btnFuZhiHuMing");
        var btnFuZhiZhangHao = this.diKuan.getChildByName("btnFuZhiZhangHao");
        var btnFuZhiZhiHang = this.diKuan.getChildByName("btnFuZhiZhiHang");
        btnFuZhiHuMing.on(cc.Node.EventType.TOUCH_END,this.onCopy.bind(this))
        btnFuZhiZhangHao.on(cc.Node.EventType.TOUCH_END,this.onCopy.bind(this))
        btnFuZhiZhiHang.on(cc.Node.EventType.TOUCH_END,this.onCopy.bind(this))

        var btnRecharge = this.node.getChildByName("btnRecharge")
        btnRecharge.on(cc.Node.EventType.TOUCH_END,this.onConfirm.bind(this))

        this.bankCardWayList.numItems = 10
    }

    start () {

    }

    onEnable(){
        // this.setOpenBankList();
        this.setBankInfo()
    }

    // update (dt) {}

    onListRender(item: cc.Node, idx: number) {
        if(!item)
            return;

        item.getChildByName("text").getComponent(cc.Label).string = "中国银行"
    }

    //当列表项被选择...
    onListSelected(item: any, selectedId: number, lastSelectedId: number, val: number) {
        if (!item)
            return;

        console.log("选择了什么银行")
    }


    onOpenBankList(event){
        console.log("银行户名"+event.target.name)
    }

    onCopy(event){
        var eventName = event.target.name;
        switch (eventName) {
            case "btnFuZhiHuMing":
                console.log("收款户名")
                break;
            case "btnFuZhiHuMing":
                console.log("收款账号")
                break;  
            case "btnFuZhiHuMing":
                console.log("收款支行")
                break;     
            default:
                break;
        }
    }
    
    setBankInfo(){
        for (let index = 0; index < 4; index++) {
            var txt = this.diKuan.getChildByName("label_"+index)
            txt.getComponent(cc.Label).string = index
        }
    }

    onConfirm(){
        console.log("确定充值")
    }




    callbackEditingDidBegan(){
        console.log("做了什么")
    }


    // callbackTextChanged(event){
    //     console.log("有什么信息》》",event)
    //     switch (event.node.name) {
    //         case "editboxBank":
    //             console.log("银行号")
    //             break;
    //         case "editboxName":
    //             console.log("姓名")
    //             break;  
    //         default:
    //             break;
    //     }
    // }
}
