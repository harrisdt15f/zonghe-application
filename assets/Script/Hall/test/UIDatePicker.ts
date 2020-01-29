// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIDatePicker extends cc.Component {


    @property(cc.Node)
    contentNode : cc.Node = null
    @property(cc.Node)
    text :　cc.Node = null;

    _visibleClipNumber : number = 3  // 同时显示Item的个数
    _velocity : number = 3            // 速率
    _timeLimit : number = 0.5         // 时间限制
    _distanceLimit : number = 500     // 距离限制
    _timeCondition : number = 0.3     // 时间条件
    _distanceCondition : number = 30  // 距离条件
 
    _diffY : number = 0
    _diffYCount : number = 0          // 周期性计数,y轴的移动距离
    _onceDiffYCount : number = 0      // 一次触摸y轴的移动距离
    _timeCount : number = 0          // 触摸时间计时
    _runningAction : any = null
    _list : Array<cc.Node> = [];            // item列表，用来平衡坐标
    _originList :Array<cc.Node> = [];    
    _currentItemIndex : number = 2         // 目前是第几个item
    _value : any = null        // 当前item的value
    _beginPos : any = null
  
    _backGround : any = null
 
    _bMoveing : boolean = false
    _bTouching : boolean = false
    _bBeginCountTime : boolean = false
 
    // _fontColor: cc.Color = cc.Color.BLACK
    // cc.color. BLACK
    // _fontSize : number = 40
    // _fontname : string = "Arial"

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchBegin, this);

        var list = ["1","2","3","4","5","6","7","8","9","10"];
        for(var i = 0; i < list.length; i++){
            var _text = cc.instantiate(this.text)
            _text.getComponent(cc.Label).string = list[i]
            _text.width = 60;
            _text.height = 125/3
            // _text.x = 0;
            // _text.y = i * _text.height + _text.height / 2
            this.contentNode.addChild(_text, 1, String(i))
            this._list.push(_text);
            this._originList.push(_text);
        }
        this._value = this._originList[0].getComponent(cc.Label).string;
        this._diffYCount = this._list[0].height;
        this._beginPos = cc.p(0,0);
        this._distanceLimit = 125*2 + Math.random()*50;

    }

    start () {
    }

    update (dt) {
        if(!this._bTouching && this._bMoveing){ // Action中的时候，计算偏移量
            var diffY = this.contentNode.y - this._beginPos.y;
            this._diffYCount = this._diffYCount + diffY;
            this._beginPos = this.contentNode.getPosition();
        }
        this._balance();
        if(this._bBeginCountTime) this._timeCount = this._timeCount + dt; 
    }

    onEnable(){

    }


    _onTouchEnded (touch) {
        // var target = touch.getCurrentTarget();
        this._bTouching = false;
 
        // 计算滑动  计算距离  计算速度
        if (/*Math.abs(target._onceDiffYCount) > target._distanceCondition &&*/ 
            this._timeCount < this._timeCondition) {

            if( this.contentNode.getActionByTag(1) )
                this.contentNode.stopAction(this._runningAction);

            var distance = Math.round(this._onceDiffYCount*this._velocity);
            var time = this._timeCount * this._velocity;
            var pn = distance > 0 ? 1 : -1;
            distance = Math.abs(distance) > Math.abs(this._distanceLimit) ? pn * this._distanceLimit: distance;
            time = time < this._timeLimit ? this._timeLimit: time;
            var move = cc.moveBy(time, 0, distance);
            this._runningAction = cc.sequence(move.easing(cc.easeSineOut()), cc.callFunc(this._bounceBalance, this));
            this._runningAction.setTag(1)
            this.contentNode.runAction(this._runningAction);
            console.log("运行》》》》")
            this._beginPos = this.contentNode.getPosition();
            this._bMoveing = true;
        }else{ // 如果不移动，那么直接做平衡
            this._bounceBalance();
        }
        this._onceDiffYCount = 0;
        this._timeCount = 0;
        this._bBeginCountTime = false;
    }

    _onTouchBegan (touch) {
        var target = touch.getCurrentTarget();
        if (!target.getBoundingBoxToWorld().contains(touch.getLocation())) return false;

        this._beginPos = touch.getLocation();
        this._bTouching = true;
        this._bMoveing = false;
        
        if( this.contentNode.getActionByTag(1) )
            this.contentNode.stopAction(this._runningAction);

        // if (target._contentNode.isRunning())
        //     target._contentNode.stopAction(target._runningAction);
        // 开启滑动计时
        this._bBeginCountTime = true;
        this._timeCount = 0;
        return true;
    }

    _onTouchMoved (touch) {
        // Move中的时候，计算偏移量
        // var target = touch.getCurrentTarget();
        var getPoint = touch.getLocation();
        var diffY = getPoint.y - this._beginPos.y;
        this.contentNode.y = this.contentNode.y + diffY;
        this._beginPos = getPoint;
        this._diffYCount = this._diffYCount + diffY;
        this._onceDiffYCount = this._onceDiffYCount + diffY;
    }


     
    _bounceBalance(){
        var itemHight = this._list[0].height;
        var num = Math.round(this.contentNode.y % itemHight);
        var distance = 0;
        if ( num > 0){
            distance = num > itemHight/2 ? itemHight - num : -num;
        }else {
            distance = num > -itemHight/2 ? -num : -(itemHight + num);
        }
        var action = cc.moveBy(0.2, 0, distance).easing(cc.easeSineOut());
        this._runningAction = cc.sequence(action, cc.callFunc(this._end, this))
        this._runningAction.setTag(1)
        this.contentNode.runAction(this._runningAction);
        console.log("运行》》000》》")
    }

    _end(){
        var num = Math.round(this.contentNode.y / this._list[0].height);
        var num2 = -1 * (num % this._list.length);
        if (num2 > 0){
            this._currentItemIndex = num2 + 2;
        }else if (num2 < 0){
            this._currentItemIndex = this._list.length + num2 + 2;
 
        }else{
            this._currentItemIndex = 2;
        }
        if (this._currentItemIndex > this._list.length){
            this._currentItemIndex = this._currentItemIndex % this._list.length;
        }
        this._value = this._originList[this._currentItemIndex-1].getComponent(cc.Label).string;
        cc.log("_end",this._value);
    }


    _balance(){
        if(this._diffYCount > this._list[0].height){
            var topItem = this._list.pop();
            topItem.y = this._list[0].y - this._list[0].height;
            this._list.unshift(topItem);
            this._diffYCount = this._diffYCount - this._list[0].height;
        }else if (this._diffYCount < -this._list[0].height) {
            var bottomItem = this._list.shift();
            bottomItem.y = this._list[this._list.length-1].y + this._list[this._list.length-1].height;
            this._list.push(bottomItem);
            this._diffYCount = this._diffYCount + this._list[0].height;
        }
    }

}
