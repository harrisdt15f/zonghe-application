"use strict";
cc._RF.push(module, '1fa3bJqfdpDHaSV84+cs+no', 'WebSocketNet');
// Script/Net/WebSocketNet.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../Config/config");
var WebSocketNet = /** @class */ (function () {
    function WebSocketNet() {
        this.send();
    }
    WebSocketNet.prototype.send = function () {
        // this.ws = new WebSocket("ws://echo.websocket.org");
        this.ws = new WebSocket(config_1.URL + ":" + config_1.PORT);
        this.ws.onopen = this.onopen.bind(this);
        this.ws.onmessage = this.onmessage.bind(this);
        this.ws.onerror = this.onerror.bind(this);
        this.ws.onclose = this.onclose.bind(this);
        // this.sock.onopen = this.on_open.bind(this);
        // this.sock.onmessage = this.on_message.bind(this);
        // this.sock.onclose = this.on_close.bind(this);
        // this.sock.onerror = this.on_error.bind(this);
    };
    WebSocketNet.prototype.onopen = function (event) {
        console.log("Send Text WS was opened.");
    };
    WebSocketNet.prototype.onmessage = function (event) {
        console.log("response text msg: " + event.data);
    };
    WebSocketNet.prototype.onerror = function (event) {
        console.log("Send Text fired an error");
    };
    WebSocketNet.prototype.onclose = function (event) {
        console.log("WebSocket instance closed.");
    };
    return WebSocketNet;
}());
exports.default = WebSocketNet;

cc._RF.pop();