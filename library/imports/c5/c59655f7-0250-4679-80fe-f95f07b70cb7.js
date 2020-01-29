"use strict";
cc._RF.push(module, 'c5965X3AlBGeYD++V8Htwy3', 'SoundPanel');
// Script/Hall/SetUI/SoundPanel.ts

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
var Sound_1 = require("../../Tool/Sound");
var Storage_1 = require("../../Tool/Storage");
var UserControl_1 = require("../../Controller/UserControl");
var OnFire_1 = require("../../Net/OnFire");
var uiEvent_1 = require("../../Config/uiEvent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SoundPanel = /** @class */ (function (_super) {
    __extends(SoundPanel, _super);
    function SoundPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // LIFE-CYCLE CALLBACKS:
        _this.sounEffectBackground = null;
        // private handle = null;
        _this.sounEffectBoxWidth = null;
        _this.musicSliderBoxWidth = null;
        _this.musicBackground = null;
        return _this;
    }
    SoundPanel.prototype.onLoad = function () {
        var sounEffectSliderBox = this.node.getChildByName("sounEffectSliderBox");
        this.sounEffectBoxWidth = sounEffectSliderBox.width;
        var sounEffectSlider = sounEffectSliderBox.getChildByName("sounEffectSlider");
        this.sounEffectBackground = sounEffectSlider.getChildByName("Background");
        var temp = this.sounEffectBackground.width / this.sounEffectBoxWidth;
        sounEffectSlider.getComponent(cc.Slider).progress = temp;
        sounEffectSlider.on('slide', this.onSounEffectSet.bind(this));
        var musicSliderBox = this.node.getChildByName("musicSliderBox");
        this.musicSliderBoxWidth = musicSliderBox.width;
        var musicSlider = musicSliderBox.getChildByName("musicSlider");
        this.musicBackground = musicSlider.getChildByName("Background");
        var temp1 = this.musicBackground.width / this.musicSliderBoxWidth;
        musicSlider.getComponent(cc.Slider).progress = temp1;
        musicSlider.on('slide', this.onMusicSliderSet.bind(this));
        var btnColse = this.node.getChildByName("btnColse");
        btnColse.on(cc.Node.EventType.TOUCH_END, this.onExit.bind(this));
        var box = this.node.getChildByName("box");
        for (var index = 1; index <= 4; index++) {
            var sound = box.getChildByName("sound_" + index);
            sound.on(cc.Node.EventType.TOUCH_END, this.onSelectSoun.bind(this));
            var checkmark = sound.getChildByName("checkmark");
            checkmark.active = false;
        }
        this.setToggle(1);
    };
    SoundPanel.prototype.start = function () {
    };
    SoundPanel.prototype.onEnable = function () {
        var musicVolume = Storage_1.G_Storage.getSoundMusicVolume();
        if (musicVolume) {
            var musicSliderBox = this.node.getChildByName("musicSliderBox");
            var musicSlider = musicSliderBox.getChildByName("musicSlider");
            musicSlider.getComponent(cc.Slider).progress = Number(musicVolume);
            this.musicBackground.width = this.musicSliderBoxWidth * Number(musicVolume);
            musicSlider.getChildByName("Handle").x = this.musicSliderBoxWidth * Number(musicVolume);
        }
        var effectVolume = Storage_1.G_Storage.getSoundEffectVolume();
        if (effectVolume) {
            var sounEffectSliderBox = this.node.getChildByName("sounEffectSliderBox");
            var sounEffectSlider = sounEffectSliderBox.getChildByName("sounEffectSlider");
            sounEffectSlider.getComponent(cc.Slider).progress = Number(effectVolume);
            this.sounEffectBackground.width = this.musicSliderBoxWidth * Number(effectVolume);
            sounEffectSlider.getChildByName("Handle").x = this.sounEffectBoxWidth * Number(effectVolume);
        }
    };
    // update (dt) {}
    SoundPanel.prototype.onMusicSliderSet = function (event) {
        // console.log("多少》》音乐",event.progress)
        this.musicBackground.width = this.musicSliderBoxWidth * event.progress;
        Sound_1.G_Sound.setMusicVolume(event.progress);
    };
    SoundPanel.prototype.onSounEffectSet = function (event) {
        // console.log("多少》》音效",   event.progress.toFixed(2), event.progress )
        this.sounEffectBackground.width = this.sounEffectBoxWidth * event.progress;
        Sound_1.G_Sound.setEffectsVolume(event.progress);
    };
    SoundPanel.prototype.onExit = function () {
        // console.log("退出登录")
        UserControl_1.G_UserControl.requesLoginOut(function (ret) {
            OnFire_1.G_OnFire.fire(uiEvent_1.uiEventFunction.colseBox);
        });
    };
    SoundPanel.prototype.onSelectSoun = function (event) {
        var str = event.target.name;
        var strList = str.split("_");
        this.setToggle(strList[1]);
        Sound_1.G_Sound.soundEffect();
    };
    SoundPanel.prototype.setToggle = function (key) {
        var box = this.node.getChildByName("box");
        for (var index = 1; index <= 4; index++) {
            var sound = box.getChildByName("sound_" + index);
            var checkmark_1 = sound.getChildByName("checkmark");
            checkmark_1.active = false;
        }
        var sound2 = box.getChildByName("sound_" + key);
        var checkmark = sound2.getChildByName("checkmark");
        checkmark.active = !checkmark.active;
    };
    SoundPanel = __decorate([
        ccclass
    ], SoundPanel);
    return SoundPanel;
}(cc.Component));
exports.default = SoundPanel;

cc._RF.pop();