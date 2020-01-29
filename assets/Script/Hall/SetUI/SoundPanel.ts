

import {G_Sound} from "../../Tool/Sound";
import { G_Storage } from '../../Tool/Storage';
import { G_UserControl } from '../../Controller/UserControl';
import { G_OnFire } from "../../Net/OnFire";
import { EventRequest, uiEventFunction } from "../../Config/uiEvent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SoundPanel extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    private sounEffectBackground = null;
    // private handle = null;
    private sounEffectBoxWidth = null;
    private musicSliderBoxWidth = null;
    private musicBackground = null;

    onLoad () {

        let sounEffectSliderBox = this.node.getChildByName("sounEffectSliderBox")
        this.sounEffectBoxWidth = sounEffectSliderBox.width;

        let sounEffectSlider = sounEffectSliderBox.getChildByName("sounEffectSlider")
        this.sounEffectBackground = sounEffectSlider.getChildByName("Background")

        let temp = this.sounEffectBackground.width / this.sounEffectBoxWidth
        sounEffectSlider.getComponent(cc.Slider).progress = temp

        sounEffectSlider.on('slide', this.onSounEffectSet.bind(this)) 

        let musicSliderBox = this.node.getChildByName("musicSliderBox")
        this.musicSliderBoxWidth = musicSliderBox.width;

        let musicSlider = musicSliderBox.getChildByName("musicSlider")
        this.musicBackground = musicSlider.getChildByName("Background")

        let temp1 = this.musicBackground.width / this.musicSliderBoxWidth
        musicSlider.getComponent(cc.Slider).progress = temp1
        musicSlider.on('slide', this.onMusicSliderSet.bind(this)) 

        let btnColse = this.node.getChildByName("btnColse")
        btnColse.on(cc.Node.EventType.TOUCH_END,this.onExit.bind(this))
        
        let box = this.node.getChildByName("box");
        for (let index = 1; index <= 4; index++) {
            let sound = box.getChildByName("sound_"+index)
            sound.on(cc.Node.EventType.TOUCH_END, this.onSelectSoun.bind(this));



            let checkmark = sound.getChildByName("checkmark")
            checkmark.active = false;
        }
        this.setToggle(1)

    }

    start () {

    }

    onEnable(){
        let musicVolume = G_Storage.getSoundMusicVolume()
        if (musicVolume){
            let musicSliderBox = this.node.getChildByName("musicSliderBox")
            let musicSlider = musicSliderBox.getChildByName("musicSlider")
            musicSlider.getComponent(cc.Slider).progress = Number(musicVolume)
            this.musicBackground.width = this.musicSliderBoxWidth * Number(musicVolume)
            musicSlider.getChildByName("Handle").x = this.musicSliderBoxWidth * Number(musicVolume)
        }

        let effectVolume = G_Storage.getSoundEffectVolume()
        if (effectVolume){
            let sounEffectSliderBox = this.node.getChildByName("sounEffectSliderBox")
            let sounEffectSlider = sounEffectSliderBox.getChildByName("sounEffectSlider")
            sounEffectSlider.getComponent(cc.Slider).progress = Number(effectVolume)
            this.sounEffectBackground.width =  this.musicSliderBoxWidth * Number(effectVolume)
            sounEffectSlider.getChildByName("Handle").x = this.sounEffectBoxWidth *  Number(effectVolume)
        }

    }

    // update (dt) {}
    
    onMusicSliderSet(event){
        // console.log("多少》》音乐",event.progress)
        this.musicBackground.width = this.musicSliderBoxWidth * event.progress
        G_Sound.setMusicVolume(event.progress)
    }

    onSounEffectSet(event){
        // console.log("多少》》音效",   event.progress.toFixed(2), event.progress )
        this.sounEffectBackground.width = this.sounEffectBoxWidth * event.progress
        G_Sound.setEffectsVolume(event.progress)
    }

    onExit(){
        // console.log("退出登录")
        G_UserControl.requesLoginOut(function(ret){
            G_OnFire.fire(uiEventFunction.colseBox)
        });
    }

    onSelectSoun(event){
        let str = event.target.name
        var strList = str.split("_")
        this.setToggle(strList[1])
        G_Sound.soundEffect()
    }

    setToggle(key){
        let box = this.node.getChildByName("box");
        for (let index = 1; index <= 4; index++) {
            let sound = box.getChildByName("sound_"+index)
            let checkmark = sound.getChildByName("checkmark")
            checkmark.active = false;
        }
        let sound2 = box.getChildByName("sound_"+key)
        let checkmark = sound2.getChildByName("checkmark")
        checkmark.active = !checkmark.active;
        
    }

    
}
