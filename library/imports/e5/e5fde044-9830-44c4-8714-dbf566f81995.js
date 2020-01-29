"use strict";
cc._RF.push(module, 'e5fdeBEmDBExIcU2/Vm+BmV', 'ListViewCommon');
// Script/Common/ListViewCommon.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ListViewCommon = /** @class */ (function (_super) {
    __extends(ListViewCommon, _super);
    function ListViewCommon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scroll_view = null;
        _this.item_prefab = null;
        _this.OPT_HEIGHT = 35; // 每项的高度
        _this.PAGE_NUM = 16; // 每页预加载个数;
        _this.value_set = null;
        _this.opt_item_set = null;
        _this.content = null;
        _this.start_y = 0;
        _this.start_index = 0;
        _this.childNum = 0;
        _this.fback = null;
        return _this;
    }
    ListViewCommon.prototype.init = function (number, itemHeight, fback) {
        this.fback = fback;
        this.value_set = [];
        // 如果你这里是排行榜，那么你就push排行榜的数据;
        for (var i = 1; i <= number; i++) {
            this.value_set.push(i);
        }
        this.content = this.scroll_view.content;
        this.opt_item_set = [];
        var max = Math.min(this.PAGE_NUM * 3, number);
        for (var i = 0; i < max; i++) {
            var item = cc.instantiate(this.item_prefab);
            item.active = true;
            this.content.addChild(item);
            this.opt_item_set.push(item);
            if (this.fback) {
                this.fback(i, this.opt_item_set[i]); //返回item 索引，和 当前itemPrefab
            }
        }
        this.OPT_HEIGHT = itemHeight;
        this.scroll_view.node.on("scroll-ended", this.on_scroll_ended.bind(this), this);
        this.start_y = this.content.y;
        this.start_index = 0; // 当前我们24个Item加载的 100项数据里面的起始数据记录的索引;
        this.load_record(this.start_index);
        this.childNum = number;
    };
    /*
    // use this for initialization
    onLoad() {
        this.value_set = [];
        // 如果你这里是排行榜，那么你就push排行榜的数据;
        for(var i = 1; i <= 100; i ++) {
            this.value_set.push(i);
        }
        
        this.content = this.scroll_view.content;
        this.opt_item_set = [];
        for(var i = 0; i < this.PAGE_NUM * 3; i ++) {
            var item = cc.instantiate(this.item_prefab);
            this.content.addChild(item);
            this.opt_item_set.push(item);
        }

        this.scroll_view.node.on("scroll-ended", this.on_scroll_ended.bind(this), this);
    }
    */
    ListViewCommon.prototype.start = function () {
        // this.start_y = this.content.y;
        //  this.start_index = 0; // 当前我们24个Item加载的 100项数据里面的起始数据记录的索引;
        //  this.load_record(this.start_index);
    };
    // 从这个索引开始，加载数据记录到我们的滚动列表里面的选项
    ListViewCommon.prototype.load_record = function (start_index) {
        this.start_index = start_index;
        var max = Math.min(this.PAGE_NUM * 3, this.childNum);
        for (var i = 0; i < max; i++) {
            if (this.fback) {
                this.fback(this.value_set[start_index + i], this.opt_item_set[i]); //返回item 索引，和 当前itemPrefab
            }
        }
    };
    ListViewCommon.prototype.on_scroll_ended = function () {
        this.scrollveiw_load_recode();
        this.scroll_view.elastic = true;
    };
    ListViewCommon.prototype.scrollveiw_load_recode = function () {
        //console.log("this.start_index "+this.start_index+"  this.PAGE_NUM * 3  "+this.PAGE_NUM * 3+"  this.value_set.length "+this.value_set.length);
        //console.log(" this.content.y  "+ this.content.y+"  this.start_y  "+this.start_y +"  this.PAGE_NUM  "+this.PAGE_NUM+"  this.OPT_HEIGHT "+this.OPT_HEIGHT);
        // 向下加载了
        if (this.start_index + this.PAGE_NUM * 3 < this.value_set.length &&
            this.content.y >= this.start_y + this.PAGE_NUM * 1.5 * this.OPT_HEIGHT) { // 动态加载
            if (this.scroll_view.isAutoScrolling()) { // 等待这个自动滚动结束以后再做加载
                this.scroll_view.elastic = false; // 暂时关闭回弹效果
                return;
            }
            var down_loaded = this.PAGE_NUM;
            this.start_index += down_loaded;
            if (this.start_index + this.PAGE_NUM * 3 > this.value_set.length) {
                var out_len = this.start_index + this.PAGE_NUM * 3 - this.value_set.length;
                down_loaded -= (out_len);
                this.start_index -= (out_len);
            }
            this.load_record(this.start_index);
            this.content.y -= (down_loaded * this.OPT_HEIGHT);
            return;
        }
        // 向上加载
        if (this.start_index > 0 && this.content.y <= this.start_y) {
            if (this.scroll_view.isAutoScrolling()) { // 等待这个自动滚动结束以后再做加载
                this.scroll_view.elastic = false;
                return;
            }
            var up_loaded = this.PAGE_NUM;
            this.start_index -= up_loaded;
            if (this.start_index < 0) {
                up_loaded += this.start_index;
                this.start_index = 0;
            }
            this.load_record(this.start_index);
            this.content.y += (up_loaded * this.OPT_HEIGHT);
        }
        // end 
    };
    // called every frame, uncomment this function to activate update callback
    ListViewCommon.prototype.update = function (dt) {
        if (this.childNum > 0)
            this.scrollveiw_load_recode();
    };
    __decorate([
        property(cc.ScrollView)
    ], ListViewCommon.prototype, "scroll_view", void 0);
    __decorate([
        property(cc.Node)
    ], ListViewCommon.prototype, "item_prefab", void 0);
    ListViewCommon = __decorate([
        ccclass
    ], ListViewCommon);
    return ListViewCommon;
}(cc.Component));
exports.default = ListViewCommon;

cc._RF.pop();