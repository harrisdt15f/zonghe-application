"use strict";
cc._RF.push(module, '8bd5fL8l9xKda11vHE0xycQ', 'VipConfig');
// Script/Config/VipConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VipConfig = /** @class */ (function () {
    function VipConfig() {
        //配置文件
        this._data = null;
    }
    Object.defineProperty(VipConfig.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
        },
        enumerable: true,
        configurable: true
    });
    return VipConfig;
}());
exports.VipConfig = VipConfig;

cc._RF.pop();