"use strict";
cc._RF.push(module, '674fee1qzZJV62/RjpfdbCK', 'Sound');
// Script/Tool/Sound.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Storage_1 = require("./Storage");
var Sound = /** @class */ (function () {
    function Sound() {
        var musicVolume = Storage_1.G_Storage.getSoundMusicVolume();
        if (musicVolume) {
            this.setMusicVolume(musicVolume);
        }
        var effectVolume = Storage_1.G_Storage.getSoundEffectVolume();
        if (effectVolume) {
            this.setEffectsVolume(effectVolume);
        }
    }
    Sound.prototype.soundEffect = function () {
        cc.loader.loadRes("Sound/buttonSound/button", cc.AudioClip, function (err, clip) {
            if (err) {
                console.log("[ERROR]: 音效出问题", err, clip);
                return;
            }
            var audioID = cc.audioEngine.playEffect(clip, false);
        });
    };
    Sound.prototype.setEffectsVolume = function (volume) {
        cc.audioEngine.setEffectsVolume(volume);
        Storage_1.G_Storage.setSoundEffectVolume(volume);
    };
    Sound.prototype.soundMusic = function () {
        cc.loader.loadRes("Sound/bg/bebg", cc.AudioClip, function (err, clip) {
            if (err) {
                console.log("[ERROR]: 背景音乐出问题", err, clip);
                return;
            }
            var audioID = cc.audioEngine.playMusic(clip, true);
        });
    };
    Sound.prototype.setMusicVolume = function (volume) {
        cc.audioEngine.setMusicVolume(volume);
        Storage_1.G_Storage.setSoundMusicVolume(volume);
    };
    Sound.Instance = new Sound();
    return Sound;
}());
exports.G_Sound = Sound.Instance;

cc._RF.pop();