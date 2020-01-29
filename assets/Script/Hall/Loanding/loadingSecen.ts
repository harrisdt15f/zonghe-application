

const {ccclass, property} = cc._decorator;

@ccclass
export default class loadingSecen extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';


    @property(cc.ProgressBar)
    progressBar : cc.ProgressBar = null;

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    nonius :　cc.Node = null;

    @property(cc.Node)
    bar : cc.Node = null;



    @property(cc.Animation)
    shockWave:cc.Animation = null;


    _dt : number = 0;
    _play : number = 1;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.node.scaleY = cc.director.getWinSize().height / 750
    }

    start () {
      // 先设置0%
      this.label.string = '0' + '%';
      this.progressBar.progress = 0;
      // 预加载，第一个是场景名，第二个callback中3个参数，第三个callback是完成回调
      cc.director.preloadScene('HallScene',(completedCount, totalCount, item) => {
          let p = completedCount/totalCount;
          this.progressBar.progress = p;
          this.label.string = Math.ceil(p * 100)+"%";
        //   parseInt(p * 100) + '%';
          // 打印观察
          //console.log(this.label.string);

          this.nonius.x  = this.bar.width;

      },() => {
          cc.director.loadScene('HallScene');
      });

    // this.v.getComponent(cc.VideoPlayer).play()



     
    }

    update (dt) {
      this._dt += dt
      if(this._dt >= this._play){
        this._dt = 0
        this._play  = 10
        this.shockWave.play("shockWaveClip")
      }
    }
}
