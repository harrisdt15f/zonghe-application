

const {ccclass, property} = cc._decorator;

const enum rechargeType{
    alipay = 0, //支付宝
    weChat = 1, //微信
    eBank = 2, //网银
    unionpay = 3,   //银联扫码
    vip = 4,        //vip
    rechargeInfo = 5, //记录
}

@ccclass
export default class ShopNode extends cc.Component {

    // @property(cc.EditBox)
    // ee : cc.EditBox = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let rightNode = this.node.getChildByName("RightNode");
        rightNode.getChildByName("payPanel").active = true;
        let leftButtonList = this.node.getChildByName("leftButtonList")
        let classLeftNode = leftButtonList.getComponent("LeftButtonListSelect")
        classLeftNode.leftButtonClikcFunc = function(target){
            var index = target.index
            this.setNodeActive(rightNode, index)
        }.bind(this)

    }

    start () {
        // editBox.textLabel.node.color
    }

    // update (dt) {}
    setNodeActive(_node, key){
        _node.getChildByName("payPanel").active = false;
        _node.getChildByName("ebankPanel").active = false;
        _node.getChildByName("topUpListPanel").active = false;
        _node.getChildByName("nonePanel").active = false;
        if ( (key == rechargeType.alipay 
                || key == rechargeType.weChat 
                || key == rechargeType.unionpay)  /** and 是否开启 */){
            _node.getChildByName("payPanel").active = true;
        }else if(key == rechargeType.eBank){
            _node.getChildByName("ebankPanel").active = true;
        }else if(key == rechargeType.vip){
            _node.getChildByName("nonePanel").active = true;
        }else if(key == rechargeType.rechargeInfo){
            _node.getChildByName("topUpListPanel").active = true;
        }else {
            _node.getChildByName("nonePanel").active = true;
        }

    }
}
