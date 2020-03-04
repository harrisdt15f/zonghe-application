

import List from '../../Common/List';
import { G_VipControl } from '../../Controller/VipControl';
const {ccclass, property} = cc._decorator;

@ccclass
export default class VipPromotedMoSiPanel extends cc.Component {

    @property(List)
    list : List = null;
    @property(cc.Node)
    content : cc.Node = null;
    @property(cc.Node)
    itemPrefab: cc.Node = null;

    private itemList = null;

    onLoad () {
        if(this.itemList == null)
        {
            this.itemList = [];
            this.setScrollviewList();
        }
    }

    start () {

    }

    // update (dt) {}

    onEnable(){
    }

    setScrollviewList(){
        var data = G_VipControl.getVipConfig().data;
       // this.content.removeAllChildren()
       console.log('data  '+data);
        for (let index = 0; index < data.length; index++) {
            var piece = cc.instantiate(this.itemPrefab);
            piece.active = true;
            this.content.addChild(piece);
            piece.getChildByName("sprDiSe").active = index % 2 == 0;
            let _data = data[index];
            /*
            for (let i = 0; i < 5; i++) {
                piece.getChildByName("label_"+i).getComponent(cc.Label).string = _data["name"];
                //_data["name"]
            }*/
            piece.getChildByName("label_0").getComponent(cc.Label).string = _data["level"];
            piece.getChildByName("label_1").getComponent(cc.Label).string = Math.floor(_data["experience_max"]).toString();
            piece.getChildByName("label_2").getComponent(cc.Label).string = (Math.floor(_data["promotion_gift"]*10)/10).toString();
            piece.getChildByName("label_3").getComponent(cc.Label).string = (Math.floor(_data["weekly_gift"]*10)/10).toString();
            piece.getChildByName("label_4").getComponent(cc.Label).string = "1倍";
            piece.getChildByName("label_5").getComponent(cc.Label).string =  "1倍";
        }
    }

    // public setListItem(len){
    //     this.content.removeAllChildren()
    //     for (let index = 0; index < len; index++) {
    //         let piece = cc.instantiate(this.item)
    //         piece.parent = this.content;
    //         piece.getChildByName("sprDiSe").active = index % 2 == 0;
    //         for (let i = 0; i < 6; i++) {
    //             let labStr = piece.getChildByName("label_"+i)
    //             labStr.getComponent(cc.Label).string = i;
    //         }
    //     }
    // }

    /*
    onListRender(item: cc.Node, idx: number) {
        item.getChildByName("sprDiSe").active = idx % 2 == 0;
        for (let i = 0; i < 6; i++) {
            let labStr = item.getChildByName("label_"+i)
            labStr.getComponent(cc.Label).string = "cs"+idx;
        }
    }

    onRequestData(item: cc.Node, idx: number){
        if (this.list.numItems >= 5){
            return;
        }
  
        this.list.numItems += 10
    }
    */
}
