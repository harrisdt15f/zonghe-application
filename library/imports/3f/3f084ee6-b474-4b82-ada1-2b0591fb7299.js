"use strict";
cc._RF.push(module, '3f0847mtHRLgq2hKwWR+3KZ', 'Hall');
// Script/Hall/Hall.ts

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
var CommonControl_1 = require("../Controller/CommonControl");
var HallLeftItem_1 = require("../Hall/HallLeftItem");
var HallRightItem_1 = require("../Hall/HallRightItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Hall = /** @class */ (function (_super) {
    __extends(Hall, _super);
    function Hall() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.topNode = null;
        _this.bottomNode = null;
        _this.rightNode = null;
        _this.liaotianPanel = null;
        _this.leftGrid = null;
        _this.leftItem = null;
        _this.rightGrid = null;
        _this.rightItem = null;
        _this.leftList = [];
        _this.curLeftIndex = 0;
        _this.rightList = [];
        return _this;
    }
    Hall.prototype.start = function () {
        var _this = this;
        CommonControl_1.G_CommonControl.requesGameData(function () {
            _this.RefreshLeft();
        });
    };
    Hall.prototype.RefreshLeft = function () {
        var _this = this;
        if (this.leftList.length > 0) {
            return;
        }
        if (CommonControl_1.G_CommonControl.getCommonConfig().gameHall.length > 0) {
            for (var i = 0; i < CommonControl_1.G_CommonControl.getCommonConfig().gameHall.length; i++) {
                var item = cc.instantiate(this.leftItem);
                item.active = true;
                this.leftGrid.addChild(item);
                this.leftList.push(item);
                var itemJs = item.getComponent(HallLeftItem_1.default);
                itemJs.init(CommonControl_1.G_CommonControl.getCommonConfig().gameHall[i], function (index) {
                    _this.onSelectedItem(index);
                });
            }
            if (this.curLeftIndex <= 0) {
                this.onSelectedItem(1);
            }
        }
    };
    //G_Utils.onClickEnd(item, this.onToggleEnd, this)
    Hall.prototype.onSelectedItem = function (index) {
        var _this = this;
        if (this.curLeftIndex > 0 && this.curLeftIndex <= this.leftList.length + 1) {
            var tt = this.leftList[this.curLeftIndex - 1].getComponent(HallLeftItem_1.default);
            tt.setSelectState(false);
        }
        this.curLeftIndex = index;
        var tt = this.leftList[this.curLeftIndex - 1].getComponent(HallLeftItem_1.default);
        tt.setSelectState(true);
        console.log("index>>>", index);
        if (CommonControl_1.G_CommonControl.getCommonConfig().getGameSub(this.curLeftIndex) == null) {
            CommonControl_1.G_CommonControl.requesGameDetailData(this.curLeftIndex, function () {
                _this.onShowRightInfo();
            });
        }
        else {
            this.onShowRightInfo();
        }
        // classRightNode.creatorGameIcon(_target.index)
        //     classTopNode.setVIP(_target.index);
    };
    Hall.prototype.onShowRightInfo = function () {
        if (this.rightList.length > 0) {
            this.rightList.forEach(function (item) {
                item.active = false;
            });
        }
        var rightInfo = CommonControl_1.G_CommonControl.getCommonConfig().getGameSub(this.curLeftIndex);
        if (rightInfo && rightInfo.length > 0) {
            for (var i = 0; i < rightInfo.length; i++) {
                var item = cc.instantiate(this.rightItem);
                item.active = true;
                this.rightGrid.addChild(item);
                this.rightList.push(item);
                var itemJs = item.getComponent(HallRightItem_1.default);
                itemJs.init(rightInfo[i], function () {
                });
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], Hall.prototype, "topNode", void 0);
    __decorate([
        property(cc.Node)
    ], Hall.prototype, "bottomNode", void 0);
    __decorate([
        property(cc.Node)
    ], Hall.prototype, "rightNode", void 0);
    __decorate([
        property(cc.Node)
    ], Hall.prototype, "liaotianPanel", void 0);
    __decorate([
        property(cc.Node)
    ], Hall.prototype, "leftGrid", void 0);
    __decorate([
        property(cc.Node)
    ], Hall.prototype, "leftItem", void 0);
    __decorate([
        property(cc.Node)
    ], Hall.prototype, "rightGrid", void 0);
    __decorate([
        property(cc.Node)
    ], Hall.prototype, "rightItem", void 0);
    Hall = __decorate([
        ccclass
    ], Hall);
    return Hall;
}(cc.Component));
exports.default = Hall;

cc._RF.pop();