import { G_Utils } from './Utils';
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

//跑马灯
const {ccclass, property} = cc._decorator;

@ccclass
export default class ScrollMsg extends cc.Component {

    @property(cc.Node) maskNode: cc.Node = null;
    @property(cc.Label) label: cc.Label = null;

    @property(cc.RichText)
    richText : cc.RichText = null;


    private targetText : any = null;
    /**
     * 滾動內容
     */
    contentArr:Array<string> = new Array<string>()
    startPos:cc.Vec2 = null

    onLoad()
    {
        this.startPos = cc.v2(this.maskNode.width/2,0)

        // if(this.contentArr.length == 0)
        // {
        //     this.node.active = false
        // }

        // this.label.node.position = this.startPos
        // this.richText.node.position = this.startPos

        this.targetText = this.label.node.active ? this.label : this.richText
        this.targetText.node.position = this.startPos

        var strNum = String("123456789.0")
        var str = this.getRichText("玩家昵称七个字","石头剪刀布", strNum)
        
        this.targetText.string = str;
        // cc.find("Canvas/Btn").
        // let str = "各位看官，大家好！"+"000??"
        let count = 0
        // cc.Node.EventType.MOUSE_UP
        this.node.on(cc.Node.EventType.TOUCH_END,()=>{
            
            this.startScroll(str)
            count += 1
            str = str  + count
        })
    }

    start () {

    }

    // update (dt) {}


    /**
     * 開始滾動信息
     * @param content 滾動內容
     */
    startScroll(content:string):void
    {
        let self = this
        if(content == null || content.length == 0)
        {
            return
        }
        this.node.active = true
        this.contentArr.push(content)
        if(self.targetText.node.getActionByTag(0) != null 
            && this.targetText.node.getActionByTag(0).isDone() == false)//如果正在播放只插入數據
        {
            return
        }

        let scrollFunc = function()
        {
            if(self.contentArr.length > 0)
            {
                self.targetText.string = self.contentArr.shift()
                //需要先更新標籤的寬度，不然下一幀才更新，這裏取到的值就會是原來的值，導致寬度計算錯誤
                // self.targetText._updateRenderData(true)
                self.targetText.node.position = self.startPos
                let distance : number = self.targetText.node.width + self.targetText.node.parent.width
                let duration : number = distance / 100
                let seq = cc.sequence(
                    cc.moveBy(duration,cc.v2(-distance,0)),
                    cc.callFunc(function(){
                        self.targetText.string = ""
                        self.targetText.node.position = self.startPos
                        scrollFunc()
                    })
                )
                seq.setTag(0)
                self.targetText.node.runAction(seq)
            }
            else
            {
                // self.node.active = false
            }
        }
        scrollFunc()
    }
    onDestroy()
    {
        if(this.targetText.node.getActionByTag(0) != null )
        {
             this.targetText.node.stopAction(this.targetText.node.getActionByTag(0))
        }
    }

    getRichText(userName : string, gameType : string, gold : string) : string {
        var str : string = '';
        var _count : number = 0
        while (_count < gold.length) {
            var num : string = gold.charAt(_count)
            str = str + '<img src = "' + num + '"/>'
            _count++;
        }
        var strUserName : string = '<color=#fee39b> 恭喜玩家 <color = #ffffff> '+'"'+userName+'"'+' </color><color=#fee39b> 在 '
        var strGameType : string = '<color = #47fdcc> ' + gameType + ' </color><color = #fee39b> 中'
        var goldText : string ='<color = #fee39b>金币。'
        return strUserName + strGameType + str + goldText
    }

}
