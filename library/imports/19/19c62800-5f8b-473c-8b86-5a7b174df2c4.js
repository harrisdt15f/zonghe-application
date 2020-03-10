"use strict";
cc._RF.push(module, '19c62gAX4tHPIuGWnsXTfLE', 'CommonConfig');
// Script/Config/CommonConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonConfig = /** @class */ (function () {
    function CommonConfig() {
        this.gameHallAtlasList = {
            0: { "normalText": "subtitle_hot_0", "specialText": "subtitle_hot_1", "icon": "leftbar_icon1" },
            1: { "normalText": "subtitle_jingdianqipai_0", "specialText": "subtitle_jingdianqipai_1", "icon": "leftbar_icon2" },
            2: { "normalText": "subtitle_jingjijingcai_0", "specialText": "subtitle_jingjijingcai_1", "icon": "leftbar_icon6" },
            3: { "normalText": "subtitle_quweijingcai_0", "specialText": "subtitle_quweijingcai_1", "icon": "leftbar_icon3" },
            4: { "normalText": "subtitle_laohujiheji_0", "specialText": "subtitle_laohujiheji_1", "icon": "leftbar_icon4" },
            5: { "normalText": "subtitle_realityShow_0", "specialText": "subtitle_realityShow_1", "icon": "leftbar_icon5" },
            6: { "normalText": "subtitle_caipiaotouzhu_0", "specialText": "subtitle_caipiaotouzhu_1", "icon": "leftbar_icon7" },
        };
        this.gameDetailAtlasList = {
            "kxxxq": { "icon": "game_btn1" },
            "ddz": { "icon": "game_btn2" },
        };
        //游戏大厅
        this._dataHall = null;
        this._dataGame = {};
    }
    CommonConfig.prototype.getJsonPath = function (index) {
        return this.gameHallAtlasList[index];
    };
    CommonConfig.prototype.getGameJsonPath = function (str) {
        return this.gameDetailAtlasList[str];
    };
    Object.defineProperty(CommonConfig.prototype, "gameHall", {
        get: function () {
            return this._dataHall;
        },
        set: function (data) {
            this._dataHall = data;
        },
        enumerable: true,
        configurable: true
    });
    CommonConfig.prototype.getGameSub = function (index) {
        return this._dataGame[index];
    };
    CommonConfig.prototype.setGameSub = function (index, data) {
        this._dataGame[index] = data;
    };
    return CommonConfig;
}());
exports.CommonConfig = CommonConfig;

cc._RF.pop();