
import { G_OnFire } from '../../Net/OnFire';
import { ACCOUNT_TYPE ,BANK_CARD_NAME} from "../../Config/config"
import {uiEventFunction} from "../../Config/uiEvent"
import List from '../../Common/List';
import { G_WithDrawControl } from '../../Controller/WithDrawControl';

const {ccclass, property} = cc._decorator;

class tempModel{
    accountType : any;
    bankType : any;
    number : any;
}

@ccclass
export default class ManagePanel extends cc.Component {

    @property(List)
    list : List = null;

    @property(cc.SpriteAtlas)
    bankAtlas : cc.SpriteAtlas = null;
    @property(cc.SpriteAtlas)
    com9sAtlas : cc.SpriteAtlas = null;
    @property(cc.SpriteAtlas)
    caption : cc.SpriteAtlas = null;
    
    // private content = null;
    private temp = [];
    private manageAddNode = null;
    // private scrollviewAddBank = null;

    onLoad () {
        this.list.node.active = true;
        this.manageAddNode = this.node.getChildByName("manageAddNode")
        this.manageAddNode.active = false;

        G_OnFire.on(uiEventFunction.manage, this.setManagePanelActive.bind(this));
        G_OnFire.on(uiEventFunction.atOnceManage, this.setManagePanelActive.bind(this));
        
        // this.temp = [];
        // for (let key in BANK_CARD_NAME) {
        //     var tempmodel = new tempModel();
        //     let keyType = Number(key)
        //     if (keyType == ACCOUNT_TYPE.ALIPAY){
        //         tempmodel.accountType = ACCOUNT_TYPE.ALIPAY
        //         tempmodel.bankType = 0;
        //         tempmodel.number = key + "123525" + "@qq.com";
        //     }else{
        //         tempmodel.accountType = ACCOUNT_TYPE.BANK;
        //         tempmodel.bankType = key;
        //         tempmodel.number ="123456789101234";
        //     }
        //     this.temp.push(tempmodel)
        // }
        // var tempnone = new tempModel();
        // tempnone.accountType = ACCOUNT_TYPE.NONE
        // tempnone.bankType = ACCOUNT_TYPE.NONE;
        // tempnone.number = ACCOUNT_TYPE.NONE;
        // this.temp.push(tempnone)
        
        // // console.log(">>>",BANK_CARD_NAME[1])
        // //this.list.numItems = this.temp.length / 2
        // this.list.numItems = this.temp.length
    }

    start () {

    }

    onEnable()
    {
        this.temp = [];
        G_WithDrawControl.GetMyAccountList(()=>{
            this.temp = G_WithDrawControl.getConfig().MyAccountList;
           // this.showInfo();
        //    var tempnone = new tempModel();
        //    tempnone.accountType = ACCOUNT_TYPE.NONE
        //    tempnone.bankType = ACCOUNT_TYPE.NONE;
        //    tempnone.number = ACCOUNT_TYPE.NONE;
        //    this.temp.push(tempnone)
           this.list.numItems = this.temp.length+1
        });

    }

    // update (dt) {}

    onDestroy(){
        G_OnFire.off(uiEventFunction.manage);
    }
    

    accountBySeparator(account : string){
        var strLen = Math.round( account.length / 4 )
        var count = 0
        let str = "";
        for (let index = 0; index < strLen; index++) {
            var strNo = account.substring(count, count + 4)
            var separator = strNo.length <= 3 ?  "" : "/";
            str += strNo.concat(separator)
            count += 4;
        }
        return str;
    }

    accountBySeparatorSuffix(account : string){
        var strList = account.split("@")
        return strList
    }

    setManagePanelActive(flag){
        this.list.node.active = flag;
        this.manageAddNode.active = !flag;
    }

    
    onListRender(item: cc.Node, idx: number) {
        if(!item)
            return;

        var box = item.getChildByName("box");
        var sprAccountName = item.getChildByName("sprAccountName")
        var sprAdd = item.getChildByName("sprAdd")

        var labelNode = item.getChildByName("labelNode")
        var labAccount = labelNode.getChildByName("labAccount")
        var sprSuffix = labelNode.getChildByName("sprSuffix")
        console.log("idx  "+idx+ " this.temp.length  "+this.temp.length);
        if(this.temp.length > idx){
            sprAdd.active =false;
            labelNode.active = true;
            sprAccountName.active = true;
            let config = G_WithDrawControl.getConfig().getPayItemInfo(this.temp[idx].code)
            this.setSpriteFrame(sprAccountName, this.bankAtlas, config.nameSprite)
            this.setSpriteFrame(box, this.bankAtlas, config.image);
            labAccount.getComponent(cc.Label).string = this.temp[idx].card_number_hidden
            sprSuffix.active = this.temp[idx].code == "ALIPAY"
        }else   
        {   // add
            sprAdd.active =true;
            labelNode.active = false;
            sprAccountName.active = false;
        }
        /*
        var data = this.temp[idx]
        var box = item.getChildByName("box");
        var sprAccountName = item.getChildByName("sprAccountName")
        var sprAdd = item.getChildByName("sprAdd")
        sprAdd.active = data.accountType == ACCOUNT_TYPE.NONE;

        var labelNode = item.getChildByName("labelNode")
        var labAccount = labelNode.getChildByName("labAccount")
        var sprSuffix = labelNode.getChildByName("sprSuffix")
        sprSuffix.active = data.accountType == ACCOUNT_TYPE.ALIPAY;
        console.log("data.accountType  "+data.accountType +"  "+data.bankType)
        switch ( data.accountType ) {
            case ACCOUNT_TYPE.NONE:
                this.setSpriteFrame(box, this.com9sAtlas, "hesiBox");
                this.setSpriteFrame(sprAccountName, this.caption, "tjzh")
                labAccount.active = false;
                labelNode.active = false;
                sprAccountName.active = false;
                break;
            case ACCOUNT_TYPE.ALIPAY:
                labelNode.active = true;
                sprAccountName.active = true;
                this.setSpriteFrame(box, this.bankAtlas, "zfb_panel");
                this.setSpriteFrame(sprAccountName, this.bankAtlas, "yh"+data.bankType)
                var strList = this.accountBySeparatorSuffix(data.number)
                labAccount.getComponent(cc.Label).string = strList[0]
                break;
            case ACCOUNT_TYPE.BANK:
                labelNode.active = true;
                sprAccountName.active = true;
                this.setSpriteFrame(box, this.bankAtlas, "yh_panel");
                this.setSpriteFrame(sprAccountName, this.bankAtlas, "yh"+data.bankType)
                var str = this.accountBySeparator(data.number)
                labAccount.getComponent(cc.Label).string = str
                break;        
        }
        */
    
    }

    //更新图案
    setSpriteFrame(target : cc.Node, atlas : cc.SpriteAtlas , frameName : string){
        target.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(frameName);
    }

    //当列表项被选择...
    onListSelected(item: any, selectedId: number, lastSelectedId: number, val: number) {
        if (!item)
            return;

        // console.log("》》》》》》》》",selectedId,this.temp[selectedId])
        // var data = this.temp[selectedId]
        // if(data.accountType == ACCOUNT_TYPE.NONE){
        //     this.manageAddNode.active = true;
        //     //this.list.node.active = false;
        // }
        if(this.temp.length > selectedId)
        {

        }else
        {
            this.manageAddNode.active = true;
            this.list.node.active = false;  
        }
   
    }
}
