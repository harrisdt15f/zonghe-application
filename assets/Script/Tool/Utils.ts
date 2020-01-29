

 class Utils {
    public static readonly Instance : Utils = new Utils();

    onButtonClick(node: cc.Node, className: string, funcName: string, eventData: string) {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = node; //这个 node 节点是你的事件处理代码组件所属的节点，这里就是Button2
        clickEventHandler.component = className;//这个是脚本文件名
        clickEventHandler.handler = funcName; //回调函名称
        clickEventHandler.customEventData = eventData; //用户数据

        var button = node.getComponent(cc.Button); //获取cc.Button组件
        button.clickEvents.push(clickEventHandler); //增加处理
    }


    onClickEnd(node : cc.Node, callback : Function, self? : any){
        node.on(cc.Node.EventType.TOUCH_END, callback, self)
    }


    getPhoneNumberStar(str:string){
        return str.substring(0,3) + "****" + str.substring(7,str.length)
    }

    //"元"符号 
    setStringOfUnit(str: string | number){
        return str + "/"
    }

    //校验手机号码
    isPoneAvailable(str) {
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 是否iOS
    **/
    isiOS = function() {
        var u = navigator.userAgent, app = navigator.appVersion;   
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端   
        return isiOS;
    };

    /**
     * 是否Android
    **/
    isAndroid = function() {
        var u = navigator.userAgent, app = navigator.appVersion;   
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器   
        return isAndroid;
    };
       
    //阿拉伯数字转中文数字
    sectionToChinese(_section: number) : string{
        let REG_NUMBER = /^([+-])?0*(\d+)(\.(\d+))?$/;
        let ch = '零一二三四五六七八九';
        let ch_u = '个十百千万亿';
        let tenm =  true;
        let n0 = ch.charAt(0);
        let getNumbResult = function (num: { toString: () => string; }) {
            var result = REG_NUMBER.exec(num.toString());
            if (result) {
                return {
                    int: result[2],  //整数部分
                    decimal: result[4], //小数部分
                    minus: result[1] == "-",  
                    num: result.slice(1, 3).join('') // 带符号整数
                }
            }
        }

        let clearZero =  function(str: string, zero: string, type = null) {
            if(str == null) return "";
            var reg0 = ~"*.?+$^[](){}|\\/".indexOf(zero) ? "\\" + zero : zero; 
            var arg_s = new RegExp("^"+reg0+"+")
                ,arg_e = new RegExp(reg0+"+$")
                ,arg_d = new RegExp(reg0+"{2}","g")
            str = str.toString();
            if (type == "^") {
                str = str.replace(arg_s,"");
            }
            if (!type || type == "$") {
                str = str.replace(arg_e,"");
            }
            if (!type || type == "nto1") {
                str = str.replace(arg_d,zero);
            }
            return str;
        }


        let encodeInt = function(_int: string){
            _int = getNumbResult(_int).int;
            var int = "";
            var _length = _int.length;
            if (_length == 1) {
                return ch.charAt(+_int);
            }
          
            if (_length <= 4) { //小于四位
                for (let i = 0, n = _length; n--;) {
                    var _num = +_int.charAt(i);
                    int += (tenm && _length == 2 && i == 0 && _num == 1) ? "" : ch.charAt(_num);
                    int += (_num && n ? ch_u.charAt(n) : '')
                    i++;
                }
            } else {
                var d = _int.length / 4 >> 0;
                var y = _int.length % 4;      
                while (y == 0 || !ch_u.charAt(3 + d)) {
                    y += 4;
                    d--;              
                }
            }
            int = clearZero(int, n0);
            return int;
        }
        return encodeInt(String(_section))
    }

    //随机数
    random(lower: number, upper: number) {
        return Math.round(Math.random()*(upper-lower)+lower)
        //或者 Math.ceil(Math.random() *(upper-lower)+lower)
    }


    getObjectEvent(_event : Object){
        const tempData = Object.keys(_event);
        return tempData
    }

    getObjectEventByIndex(){

        return 0;
    }

    //字符串格式化
    format(str, ...placeholder) {
        if(placeholder.length == 0) return this;
        var param = placeholder[0];
        var s = str;
        if(typeof(param) == 'object') {
            for(var key in param)
                s = s.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
            return s;
        } else {
            for(var i = 0; i < placeholder.length; i++)
                s = s.replace(new RegExp("\\{" + i + "\\}", "g"), placeholder[i]);
            return s;
        }
    }



    //整数
    isInteger(str){
        var t = /^\d*$/;
        var m =  t.test(str)
        return m
    }



}

// declare const testNumm = 0;

export const G_Utils = Utils.Instance;