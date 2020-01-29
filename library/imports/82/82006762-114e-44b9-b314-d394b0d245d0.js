"use strict";
cc._RF.push(module, '82006diEU5EubMU05Sw0kXQ', 'Language');
// Script/Language/Language.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Zh_1 = require("./Zh");
var En_1 = require("./En");
var Language = /** @class */ (function () {
    function Language() {
        this._languageType = null;
    }
    Language.prototype.init = function (_type) {
        if (_type === void 0) { _type = "zh"; }
        this._languageType = _type;
    };
    Language.prototype.get = function (key) {
        if (this._languageType == "zh") {
            return Zh_1.zh[key];
        }
        return En_1.en[key];
    };
    Language.Instance = new Language();
    return Language;
}());
exports.G_Language = Language.Instance;

cc._RF.pop();