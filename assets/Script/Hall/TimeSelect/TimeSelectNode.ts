

import { G_Language } from '../../Language/Language';
const {ccclass, property} = cc._decorator;

@ccclass
export default class TimeSelectNode extends cc.Component {

   

    private classArray = [];

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.classArray = [];
        var panel = this.node.getChildByName("panel")
        var box = panel.getChildByName("box")
        
        var year =  this.getYear()
        var yearArray = [];
        yearArray.push(year.toString())

        var listYear = box.getChildByName("listYear")
        var classYear = listYear.getComponent("scrollviewTimesSelect")
        classYear.itemInit = yearArray
        
        //月
        let month = this.getMonth()
        var listMonth = box.getChildByName("listMonth")
        var classMonth = listMonth.getComponent("scrollviewTimesSelect");
        classMonth.itemInit = month;

        //日
        let selectIndex = classMonth.selectedIndex
        let day = this.getDay(selectIndex, year)
        var listDay = box.getChildByName("listDay")
        var classDay = listDay.getComponent("scrollviewTimesSelect")
        classDay.itemInit = day;

        //时
        let hour = this.getHour()
        var listHour = box.getChildByName("listHour")
        var classHour = listHour.getComponent("scrollviewTimesSelect")
        classHour.itemInit = hour;
   
        //分
        let minute = this.getMinute();
        var listMinute = box.getChildByName("listMinute")
        var calssMinute = listMinute.getComponent("scrollviewTimesSelect")
        calssMinute.itemInit = minute;

        //秒
        let second = this.getSecond();
        var listSecond = box.getChildByName("listSecond")
        var classSecond = listSecond.getComponent("scrollviewTimesSelect")
        classSecond.itemInit = second;

    }

    start () {

    }

    // update (dt) {}

    getYear() : number {
        var date = new Date();
        // date .getYear(); //获取当前年份(2位)
        return date.getFullYear(); //获取完整的年份(4位)
    }
    getDaysOfMonth(year,month) : number {
        var date = new Date(year,month,0);
        var days = date.getDate();
        return days;
    }


    //月
    getMonth() : string[] {
        let month : Array<string> = []
        let strMonth = G_Language.get("month")
        var index : number = 1;
        while (index <= 12) {
            month.push(index + strMonth)
            index++;
        }
        return month;
    }
    //天
    getDay( selectKey : number, year : number) : string[] {
        let maxDay = this.getDaysOfMonth(year, selectKey)
        let day : Array<string> = []
        let strDay = G_Language.get("day")
        var index : number = 1;
        while (index <= maxDay) {
            day.push(index + strDay)
            index++;
        }
        return day;
    }

    //时
    getHour() : string[] {
        let hour : Array<string> = []
        let strHour = G_Language.get("hour")
        var index : number = 0;
        while (index < 24) {
            hour.push(index + strHour)
            index++
        }
        return hour;
    }

    //分
    getMinute() : string[] {
        let minute : Array<string> = []
        let strMinute : string = G_Language.get("minute")
        var index : number = 0;
        while (index < 60) {
            minute.push(index + strMinute)
            index++
        }
        return minute
    }

    //秒
    getSecond() : string[] {
        let second : Array<string> = []
        let strSecond : string = G_Language.get("second")
        var index : number = 0;
        while (index < 60) {
            second.push(index + strSecond)
            index++
        }
        return second;
    }


    getSelectTiemGroup(){
        let n = this.classArray[0].getSelectIndex();
        let y = this.classArray[1].getSelectIndex();
        let r = this.classArray[2].getSelectIndex();
        let s = this.classArray[3].getSelectIndex();
        let f = this.classArray[4].getSelectIndex();
        let m = this.classArray[5].getSelectIndex();
        // string.formats
        return {n,y,r,s,f,m}
    }


}
