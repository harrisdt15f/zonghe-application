


import { G_Utils } from '../../Tool/Utils';
import List from '../../Common/List';
import { G_UiForms } from '../../Tool/UiForms';
import { G_Language } from '../../Language/Language';

const colorList = [
    cc.color(108,20,19),
    cc.color(247,239,149),
    cc.color(255,255,255),
]
 
let tempSignInList =[]


const {ccclass, property} = cc._decorator;


class DateSignin{
    readonly _time : Date = new Date();
    constructor(){
    }
    /**
     * 获取当月总天数
     * @return number 总天数
     */
    getNowMonthDaySum() : number {
        let year = this._time.getFullYear();
        let month = this._time.getMonth() + 1;
        var date = new Date(year, month, 0);
        return date.getDate();
    }

    getNowMonth() : number {
        return this._time.getMonth();
    }
    
    getNowDay() : number {
        return this._time.getDate();
    }
}

@ccclass
export default class SignInBox extends cc.Component {
 
    @property(List)
    list : List = null;

    @property(cc.SpriteAtlas)
    headAtlas : cc.SpriteAtlas = null;
    @property(cc.Sprite)
    head :　cc.Sprite = null;
    @property(cc.Label)
    labDay : cc.Label = null;


    private _currMonth = null;
    private _currDay = null;

    readonly _datesignin : DateSignin = new DateSignin();

    //文字
    didNotSignIn = G_Language.get("DidNotSignIn")
    alreadySignedIn = G_Language.get("AlreadySignedIn")
    toSignIn= G_Language.get("ToSignIn")
    signinsucceed= G_Language.get("signinsucceed")
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        tempSignInList =[];
        this.initListItem()
        let _month = this._datesignin.getNowMonth()
        this._currMonth = G_Utils.sectionToChinese(Number(_month + 1))+"月" 
        var mDayNum = this._datesignin.getNowMonthDaySum();
        this._currDay = this._datesignin.getNowDay()
        this.list.numItems = mDayNum;
    }

    start () {
    }

    // update (dt) {}

    initListItem(){
        let temp = [2,6,10]
        let flag = true;
        let sum = this._datesignin.getNowMonthDaySum();
        for (let index = 0; index <= sum; index++) {
            flag = true;
            for (let j = 0; j < temp.length; j++) {
                if(index == temp[j]){
                    tempSignInList.push(1)
                    flag = false;
                }
            }
            if(flag){
                tempSignInList.push(0)
            }
        }
    }

    onEnable(){
        this.list.scrollTo(this._currDay-1, .1, null, false);
    }


    onListRender(item: cc.Node, idx: number) {
        var currDay = idx + 1;
        var data = tempSignInList[idx]
        var gx = item.getChildByName("fg")
        gx.active = false;
        let label1 = item.getChildByName("label_1")
        let label2 = item.getChildByName("label_2")
        let label3 = item.getChildByName("label_3")
        label2.getComponent(cc.Label).string =  this._currMonth
        label3.getComponent(cc.Label).string = String(idx+1)
        if(currDay >= this._currDay ){
            if (data == 1){
                this.setLabel(item, colorList[1], this.alreadySignedIn)
            }else{
                this.setLabel(item, colorList[2], this.toSignIn)
                gx.active = currDay == this._currDay;
            }
        }else{
            // gx.active = false;
            if (data == 1){
                this.setLabel(item, colorList[1], this.alreadySignedIn)
            }else{
                this.setLabel(item,colorList[0], this.didNotSignIn)
            }
        }
    }

    //当列表项被选择...
    onListSelected(item: any, selectedId: number, lastSelectedId: number, val: number) {
        if (!item)
            return;

        var data = tempSignInList[selectedId]
        var index = selectedId + 1;
        if(index  == this._currDay){
            let tips = data != 1 ? this.signinsucceed : this.alreadySignedIn;
            G_UiForms.hint(tips)
            var gx = item.getChildByName("fg")
            gx.active = false;
        }

        if(index > this._currDay){
            G_UiForms.hint(this.didNotSignIn)
        }

        if(index < this._currDay){
            let tips = data != 1 ? this.didNotSignIn : this.alreadySignedIn;
            G_UiForms.hint(tips)
        }

    }


    setLabel(item : cc.Node, color : cc.Color, txt : string){
        let lab1 = item.getChildByName("label_1")
        let lab2 = item.getChildByName("label_2")
        let lab3 = item.getChildByName("label_3")
        lab1.getComponent(cc.Label).string = txt
        lab1.color = color
        lab2.color = color
        lab3.color = color
    }

    onClose(){
        this.node.active = false;
    }

}
