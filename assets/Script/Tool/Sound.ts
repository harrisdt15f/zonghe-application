import { G_Storage } from './Storage';


 class Sound {

    public static readonly Instance : Sound = new Sound();

    constructor(){

        let musicVolume = G_Storage.getSoundMusicVolume()
        if(musicVolume){
            this.setMusicVolume(musicVolume)
        }

        let effectVolume = G_Storage.getSoundEffectVolume()
        if (effectVolume){
            this.setEffectsVolume(effectVolume)
        }

    }

    soundEffect(){
        cc.loader.loadRes("Sound/buttonSound/button", cc.AudioClip, function (err, clip) {
            if(err){
                console.log("[ERROR]: 音效出问题",err,clip)
                return;
            }
		    var audioID = cc.audioEngine.playEffect(clip, false);
		});
    }

    setEffectsVolume(volume){
        cc.audioEngine.setEffectsVolume(volume);
        G_Storage.setSoundEffectVolume(volume);
    }

    soundMusic(){
        cc.loader.loadRes("Sound/bg/bebg", cc.AudioClip, function (err, clip) {
            if(err){
                console.log("[ERROR]: 背景音乐出问题",err,clip)
                return;
            }
		    var audioID = cc.audioEngine.playMusic(clip, true);
		});
    }

    setMusicVolume(volume){
        cc.audioEngine.setMusicVolume(volume);
        G_Storage.setSoundMusicVolume(volume)
    }
    


}


export const G_Sound = Sound.Instance;