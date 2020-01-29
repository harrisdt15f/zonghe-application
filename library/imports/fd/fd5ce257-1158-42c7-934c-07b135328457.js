"use strict";
cc._RF.push(module, 'fd5ceJXEVhCx5NMB7E1MoRX', 'loadingSecen');
// Script/Hall/Loanding/loadingSecen.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var loadingSecen = /** @class */ (function (_super) {
    __extends(loadingSecen, _super);
    function loadingSecen() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        _this.progressBar = null;
        _this.label = null;
        _this.nonius = null;
        _this.bar = null;
        _this.shockWave = null;
        _this._dt = 0;
        _this._play = 1;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    loadingSecen.prototype.onLoad = function () {
        this.node.scaleY = cc.director.getWinSize().height / 750;
    };
    loadingSecen.prototype.start = function () {
        var _this = this;
        // 先设置0%
        this.label.string = '0' + '%';
        this.progressBar.progress = 0;
        // 预加载，第一个是场景名，第二个callback中3个参数，第三个callback是完成回调
        cc.director.preloadScene('HallScene', function (completedCount, totalCount, item) {
            var p = completedCount / totalCount;
            _this.progressBar.progress = p;
            _this.label.string = Math.ceil(p * 100) + "%";
            //   parseInt(p * 100) + '%';
            // 打印观察
            //console.log(this.label.string);
            _this.nonius.x = _this.bar.width;
        }, function () {
            cc.director.loadScene('HallScene');
        });
        // this.v.getComponent(cc.VideoPlayer).play()
    };
    loadingSecen.prototype.update = function (dt) {
        this._dt += dt;
        if (this._dt >= this._play) {
            this._dt = 0;
            this._play = 10;
            this.shockWave.play("shockWaveClip");
        }
    };
    __decorate([
        property(cc.ProgressBar)
    ], loadingSecen.prototype, "progressBar", void 0);
    __decorate([
        property(cc.Label)
    ], loadingSecen.prototype, "label", void 0);
    __decorate([
        property(cc.Node)
    ], loadingSecen.prototype, "nonius", void 0);
    __decorate([
        property(cc.Node)
    ], loadingSecen.prototype, "bar", void 0);
    __decorate([
        property(cc.Animation)
    ], loadingSecen.prototype, "shockWave", void 0);
    loadingSecen = __decorate([
        ccclass
    ], loadingSecen);
    return loadingSecen;
}(cc.Component));
exports.default = loadingSecen;

cc._RF.pop();