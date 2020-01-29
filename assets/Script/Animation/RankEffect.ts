const {ccclass, property} = cc._decorator;
@ccclass
export default class RankEffect extends cc.Component {
    // 当前帧的图片
    @property(cc.Sprite)
    sprite: cc.Sprite = null;
    /** 播放动画所需要的图集 */
    @property([cc.SpriteFrame])
    spriteFrameList: cc.SpriteFrame[] = [];
    /** 播放动画所需要的间隔时间 */
    @property(cc.Integer)
    duration: number = 0.2;
    /** 是否循环播放 */
    @property(cc.Boolean)
    is_loop: boolean = false;
    /** 是否加载的时候播放 */
   // @property(cc.Boolean)
   // is_play_onload: boolean = false;
    /** 播放完成后是否消耗 */
    @property(cc.Boolean)
    is_destroy: boolean = false;
    /** 延迟多少秒播放动画 */
    @property(cc.Integer)
    timeDelay: number = 0;
    /** 如果是重复播放动画多少秒后在播放 */
    @property(cc.Integer)
    playTimeEndDelay: number = 0;
    played_time = 0;
    is_playing = false;
    _currentDelay = false;
    _currentPlayDelay = false
    onEnable () {
      //  if (this.is_play_onload) {
            this.play();
      //  }
    }
    play() {
        if (this.is_loop) {
            this.play_loop();
        } else {
            this.play_once();
        }
    }
    play_once() {
        if (this.spriteFrameList.length <= 1) {
            return;
        }
        if (this.timeDelay > 0) {
            this._currentDelay = true;
            this.scheduleOnce(this._updateTimeDelayState.bind(this), this.timeDelay);
        }
        this.played_time = 0;
        this.is_playing = true;
        this.is_loop = false;
    }
    play_loop() {
        if (this.spriteFrameList.length <= 1) {
            return;
        }
        if (this.timeDelay > 0) {
            this._currentDelay = true;
            this.scheduleOnce(this._updateTimeDelayState.bind(this), this.timeDelay);
        }
        this.played_time = 0;
        this.is_playing = true;
        this.is_loop = true;
    }
    stop() {
        this.is_playing = false;
        this.played_time = 0;
    }
    _updateTimeDelayState() {
        this._currentDelay  = false;
    }
    _updatePlayTimeDelayState() {
        this._currentPlayDelay = false;
    }
    update (dt) {
        if (!this.is_playing) {
            return;
        }
        if (this._currentDelay || this._currentPlayDelay) {
            return;
        }
        this.played_time += dt;
        let index = Math.floor(this.played_time / this.duration);
        if (!this.is_loop) {
            if (index >= this.spriteFrameList.length) {
                this.is_playing = false;
                this.played_time = 0;
                if (this.is_destroy) {
                    this.node.destroy();
                }
                return;
            }
            this.sprite.spriteFrame = this.spriteFrameList[index];
        } else {
            if(index >= this.spriteFrameList.length) {
                this.played_time -= (this.duration * this.spriteFrameList.length);
                index -= this.spriteFrameList.length;
                this._currentPlayDelay = (this.timeDelay > 0);
                this.scheduleOnce(this._updatePlayTimeDelayState.bind(this), this.playTimeEndDelay);
            }
            this.sprite.spriteFrame = this.spriteFrameList[index];
        }
    }
}