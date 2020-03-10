"use strict";
cc._RF.push(module, '66626uDtkFBmKLwo0GC/LmC', 'RequestControl');
// Script/Controller/RequestControl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestConfig_1 = require("../Config/RequestConfig");
var RequestControl = /** @class */ (function () {
    function RequestControl() {
        this.config = null;
        this.config = new RequestConfig_1.RequestConfig();
    }
    RequestControl.prototype.getConfig = function () {
        return this.config;
    };
    RequestControl.Instance = new RequestControl();
    return RequestControl;
}());
exports.G_RequestControl = RequestControl.Instance;

cc._RF.pop();