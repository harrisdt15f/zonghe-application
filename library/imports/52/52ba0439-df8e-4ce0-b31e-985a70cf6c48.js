"use strict";
cc._RF.push(module, '52ba0Q5345M4LMemFpwz2xI', 'HallTopNode');
// Script/Hall/HallTopNode.ts

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
var uiEvent_1 = require("../Config/uiEvent");
var UiForms_1 = require("../Tool/UiForms");
var UserControl_1 = require("../Controller/UserControl");
var Utils_1 = require("../Tool/Utils");
var IdentifyKey_1 = require("../Config/IdentifyKey");
var IdentifyKey_2 = require("../Config/IdentifyKey");
var OnFire_1 = require("../Net/OnFire");
var Language_1 = require("../Language/Language");
var Platforms_1 = require("../Platform/Platforms");
//import { UserModel } from "../../../packVersion/ver_1_0.0.0/src/project.dev";
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HallTopNode = /** @class */ (function (_super) {
    __extends(HallTopNode, _super);
    function HallTopNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vip = null;
        _this.headAtlas = null;
        _this.playerInfoObj = null;
        _this.head = null;
        _this.headBox = null;
        _this.lableName = null;
        _this.goldNode = null;
        _this.goldBtn = null;
        _this.goldLabel = null;
        _this.lableId = null;
        _this.labelCopy = null;
        //未登录状态
        _this.playerEmptyObj = null;
        _this.loginBtn = null; //登录
        _this.registerBtn = null; //注册
        _this.serverBtn = null; //客服
        _this.supportBtn = null; //帮助    
        _this.platforms = null;
        _this.loadNative = function (url, callback) {
            url = "http://cdn.kuokuo666.com/KUOKUO.png";
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'arraybuffer';
            xhr.onreadystatechange = function () {
                cc.log("xhr.readyState  " + xhr.readyState);
                cc.log("xhr.status  " + xhr.status);
                // cc.log("xhr  " +xhr.response);
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var respone = xhr.response;
                        cc.log("rsp  " + respone);
                        var rsp = JSON.parse(respone);
                        var img = new Image();
                        cc.log("rsp  " + respone);
                        img.src = rsp.data;
                        cc.log("data  " + rsp.data);
                        var texture = new cc.Texture2D();
                        texture.genMipmaps = false;
                        texture.initWithElement(img);
                        texture.handleLoadedTexture();
                        var newframe = new cc.SpriteFrame(texture);
                        callback(newframe);
                    }
                    else {
                        callback(null);
                    }
                }
            }.bind(this);
            xhr.open("GET", url, true);
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.setRequestHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
            xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
            //xhr.setRequestHeader('Access-Control-Allow-Credentials', 'false');
            //xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
            //xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader('Authorization', 'Bearer ' + UserControl_1.G_UserControl.getUser().accessToken);
            xhr.send();
        };
        return _this;
        /*
        CacheNetImg(Url,callback){
           // Url = "http://cdn.kuokuo666.com/KUOKUO.png";
            let xhr = cc.loader.getXMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status == 200) {
                    var tt = xhr.responseText;
                    console.log("tt+ "+tt)
                    var response = JSON.parse(tt);
             
                    var img = new Image();
                    
                    img.src = response.data;
                    
                    var texture = new cc.Texture2D();
                    texture.genMipmaps = false;
                    
                    texture.initWithElement(img);
                    
                    texture.handleLoadedTexture();
                    
                    var newframe = new cc.SpriteFrame(texture);
                    
                    callback(newframe);
                }
                else if (xhr.readyState === 4 && xhr.status == 401) {
                    callback({status:401});
                }
            };
    
            console.log("[HTTP>GET]:URL>>>>>>>>>>>>>>>>>",Url)
            
            xhr.open('GET', Url, true);
     
            // if (cc.sys.isNative) {
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.setRequestHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,OPTIONS');
            xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
             xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader('Authorization', 'Bearer '+G_UserControl.getUser().accessToken);
    
            // xhr.setRequestHeader('Authorization', 'Bearer ' + "");
            // }
            // note: In Internet Explorer, the timeout property may be set only after calling the open()
            // method and before calling the send() method.
            xhr.timeout = 5000;
            xhr.send();
            
         }
            */
    }
    HallTopNode.prototype.onLoad = function () {
        this.platforms = new Platforms_1.Platforms();
    };
    HallTopNode.prototype.start = function () {
        Utils_1.G_Utils.onClickEnd(this.goldBtn, this.onShop, this);
        var www = this.node.getChildByName("www");
        var copyBtn = www.getChildByName("copyBtn");
        Utils_1.G_Utils.onClickEnd(copyBtn, this.onCopy, this); //复制
        Utils_1.G_Utils.onClickEnd(this.headBox, this.onHead, this); //头像选择
        Utils_1.G_Utils.onClickEnd(this.loginBtn, this.onLoginNode, this); //登录
        Utils_1.G_Utils.onClickEnd(this.registerBtn, this.onResigterNode, this); //注册
        Utils_1.G_Utils.onClickEnd(this.serverBtn, this.onCustomServer, this); //客服
        Utils_1.G_Utils.onClickEnd(this.supportBtn, this.onHelp, this); //帮助
        OnFire_1.G_OnFire.on(uiEvent_1.EventRequest.HeadUpdata, this.fireUpdateView.bind(this));
    };
    // update (dt) {}
    HallTopNode.prototype.onEnable = function () {
        //this.fireUpdateView()
    };
    HallTopNode.prototype.onDestroy = function () {
        OnFire_1.G_OnFire.off(uiEvent_1.EventRequest.HeadUpdata, this.fireUpdateView.bind(this));
    };
    HallTopNode.prototype.setHead = function () {
    };
    HallTopNode.prototype.setVIP = function (type) {
        this.vip.spriteFrame = this.headAtlas.getSpriteFrame("vip" + type);
    };
    HallTopNode.prototype.onLoginNode = function () {
        var _nodeName = uiEvent_1.uiEventModules.landingNode;
        UiForms_1.G_UiForms.show(_nodeName);
        UiForms_1.G_UiForms.setSelectPanelShow(IdentifyKey_2.LoginTab_Type.login);
    };
    HallTopNode.prototype.onResigterNode = function () {
        var _nodeName = uiEvent_1.uiEventModules.landingNode;
        UiForms_1.G_UiForms.show(_nodeName);
        UiForms_1.G_UiForms.setSelectPanelShow(IdentifyKey_2.LoginTab_Type.register);
    };
    HallTopNode.prototype.onShop = function () {
        var flag = UserControl_1.G_UserControl.isLogin();
        var formsName = !flag ? uiEvent_1.uiEventModules.landingNode : uiEvent_1.uiEventModules.shopNode;
        if (!flag)
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("PleaseLogInFirst"));
        UiForms_1.G_UiForms.show(formsName);
    };
    HallTopNode.prototype.onCustomServer = function () {
        var _nodeName = uiEvent_1.uiEventModules.serviceNode;
        UiForms_1.G_UiForms.show(_nodeName);
        console.log('_nodeName  ' + _nodeName);
        // G_UiForms.setSelectPanelShow();
    };
    HallTopNode.prototype.onHelp = function () {
    };
    HallTopNode.prototype.onCopy = function () {
        var str = this.labelCopy.getComponent(cc.Label).string;
        this.platforms.JsCopy(str);
        UiForms_1.G_UiForms.hint(Language_1.G_Language.get("copySucceed"));
    };
    HallTopNode.prototype.onHead = function (func) {
        var flag = UserControl_1.G_UserControl.isLogin();
        var formsName = !flag ? uiEvent_1.uiEventModules.landingNode : uiEvent_1.uiEventModules.headSetNode;
        var formasType = !flag ? IdentifyKey_1.BOX_TYPE.BOX_NONE : IdentifyKey_1.BOX_TYPE.BOX_SMALL;
        if (!flag)
            UiForms_1.G_UiForms.hint(Language_1.G_Language.get("PleaseLogInFirst"));
        UiForms_1.G_UiForms.show(formsName, formasType);
    };
    HallTopNode.prototype.onReplaceHead = function (remoteUrl) {
        // remoteUrl = "http://cdn.kuokuo666.com/KUOKUO.png";
        //remoteUrl = "http://pic.jianghu.local/uploads/test/avatar/2020-01-08/7c0a218b4f651a9c6aeded81fc032ef6.png";
        //remoteUrl = "https://www.nationalgeographic.com/content/dam/travel/commercial/2019/international/philippinesdepartmentoftourism/article1-know-before-you-go/steep-karst-cliffs-of-el-nido-in-palawan.adapt.1900.1.jpg";
        // remoteUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEBISEBMSEhUVFQ8PDxUSEhUVEBUQFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFRAQGi0dHSUtLS0tLSstLS0tLS0tLS0tLS0tLSstKy0tKystKzctLS0tLS0tLS0rNS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAABAgUGB//EADoQAAIBAgMFBQYFAwQDAAAAAAABAgMRBCFREjFBYZEFE3GBoRQiUrHR8DJCweHxBmJyM4KS0hYjsv/EABkBAAMBAQEAAAAAAAAAAAAAAAECAwAEBf/EACERAQEAAgICAwEBAQAAAAAAAAABAhEDEiExBEFhURMi/9oADAMBAAIRAxEAPwD5u4Miia2mRHLF2owDxw4FSCbb4GYWOHQaNNCvey1NwqsFgynIxCppGKE09+Q33SZOnjENlhVSRqlhkP06aQlp5CEaVhmMb6jkYx4jMKEeDRO5Hkc2NJm40ToyoLgap4cXseYko0jSpLQ6UMKXKgkLs3VyalBAnhzrSoGFRGlLcXFqYcD3J6R0FYRrUENMiWOLUpoWqwOtXoXEquHZXGksc2cQTidB0GCqYdlJU7C0YmsvA1Km1uAyUkEEauFhTAxm1wRrv3oCxtmIxRpRBQkxiM0BlbJNkIkXshALZK2A2yTZCxfYIG2SGZwEXYtG14B2OmYxN7DRE3wKzNsNLXMJAzGIWETWjIPSa0HIQdt4rSG6V9xO08g9KLX8jsLtcRWlSY7Rg9SWVUkGpUHzG6NCzVwmESSzY5Sim9xG1WRqFFWCU8Og0MON0sMLapIDChYFOidSGGJLDi7HccWdEXnTOzVoClWkxpQscxwa1FMRTvyOhiNrcJSWpSJWOfPDy4Z+AvK6336DteVndZeAB4l8c/n1HlJY51SEpcAbwkrWHp4tX/D9TMcS3+UfdTsc6phWl+4rOJ3akfA52Kh4JacR8ci2FqEFLeFnhkAzX4br59SbF3m/UNCCRSi82hiKiJuK3b+aRuKlqwCdUS9kDCcuKuGhK/Bo2w0myVYLYmyHZdA7JAliG2zziQRIYWF5mlhxe8W60uoG1TGFR5G42XBm7B1LwpPQPGiMQa0GaduKFuZpiVp0hynDkMU6a0GYU4iXM0xL0YZj1OHNkp0HwQ1CFieVPIJRsuFx+hPkugnSY7RE2pI6FBp70P0Ujn0bHQoyF2OXo/SpoupSKozNVKg3jTm87I1qepz8QrD9eRz8RcEroxnhz8TGLOXXgdiVuNvMRxMFwG2FjjVkI1Tq4hrQQrIpjU7CVSRmlNrcnzCVQDT4P1KxOw5BtrNNA6kZaXQtsyX7vIMpztZbPU2istP4egOEM84+dwkKOd2zSyy+iNa0hXEycd2yvmLQrfFex0Z4eMt+YOrho7rZeZplG0VddN+7dD1OXmLxw9nkr66DSjYNoaaRmdRLe7AcRiYxy4i0a6vdtPyDIFOba1IDVaPLoQzaKRk1vTGIZmYhYojtdVipxYVI1Y2w0Vgmhmm3wCRgg8IIW5GkYp1GuY1CtyJCCGKdFC3KG0unXkM0lfezVPDxGqeFWolyGRKdMbpRLo0ENQpLT1F2eJSHKUgUYILFA2NpiFQ06oEzJh2XUXOQrWmEmxeYNmkL1oiU8h2oxKpIaUKQxcTnVkdGuI1YlManSM4mXCNs7+CGJxJTgne6K7JSTqRW6PVmI1Hol5DNVrd7qB1KaS3r0HlJYXjm/wAUvK9jccMr5XKlUtz8ETvIvfF5fegSmVFbvkwVSVtzt4vLoCpva3Xj4GZ0lfNyb1e4Gm23VxTSysyU603v2UgKow4yRPZYvdLoNqN5H2YZt2fqAniaVtPBZlPBx/ky8PC/8mmgD9ph/cQL7PDQgdwNMwm9A8XzYOKCxi9SC60nqw0WZhF8bBYwBay4yQenNag4xCRprRCXRoZpjVMTpxG6MeZOmO0humJ0/AcpMTZjdMZgIKulzDU8UuYBPRCxFqdS4VSNtqNcppA9opyBsNNOKBzSI5sxOTBs0ArKJzq6HqikKVYyDMhsc6qhOqjpVaTEK0HoUxyJYRqC07jVVCtRFsciWF6iM961wRuRhotKnYpVm/2diVMRy6mJRMNDwtjUar5LyCRqye5roLo069txqAtSqlvV34AZ4rRW6Aak7u4OUgyAPKs7Z2F5V3wy8DDZlsaQGu/lq+pRkgdM6cJBoyOUsdHZT3vikEw+NUv7fFnN0q3aOtCQRTEI1VquoWNQW4js9GYaEjm+0Jas3HFvguotwo9o60GMRqJb2kcRYmT428AkZ6vqxf8AOt3jsxx64BPamzjRrxXG4aGJWot4x7OzTqjEKpxYYmOoxTrp7pLzFuIyu1CuHhimcukm9PJoLaRO2H8ul7XyCQxMXy8TlZlZi2wZt2XMHKRy1VktzNrFfF5sS00OSmAmzy/bn9VKPuYdqUuM3nFf4ri+e7xPJYjtivJ3dWpf/NroluOnj+LnlN3wlnz44+Pb6ZWkJVDxvYPbdSNVKcpTi3aSbvv4q57OTTF5eLLiuqOGczngnUpIDOihirOC3tLxYPv4arqgY2msJTogJ0x6VaGq6gZuJ0Y2p2QjKAKURmc46gJyWpaVOl5IFINNrUDJopCVmxlotsy2MWqaM2LbMOQwLsQxchmclVHp6lqo9GLK3L1L93l6lOsS2Z71/Cy1iOT8hW8eXqXtR0+ZusDscWKlw2utjax88s5cs7/qI7Ufu5SlHT1ZukHtXTXaU/ikEhj5av8A4/scnaj8K9Qkai0FuEHtXah2lL7j+wePaUvuLOJGotPn9QkZLR+v1EuEN2ruQ7TfLow8e1XovU4MKi0fV/UNCryfVi3jhpnXep9r24dG0NU+32tX/u/Y85GryfV/UJFN7ovyb+pLLixvs85K9LD+o1xT8ncJ/wCRQ0l0X1PNRpTf5H1f1Lq0JRV5Rsubf1JXg47VZyZvRV/6gWy3BbTXB3PNdodrV6icZyko/Dw83x8wEsTnZbjLxcvifOz3l+Lgxx+icnJb9lZVAM5m8X8SzT3+InKodcxcto1OraSPV4vtOdktrLZi8st6R4qMm2kt7aS8Tv4pNWTzaWzvdsm0iXNhLZs3HlZK1PFgZ4t6gZVf7Y9AMqn9segkwh+1P0Mc0GfaDZzIT/tj0Cqb+GPQ3WDMqali2ZeIYv3v9sehTq8l0GkLaI6zM96wXeckV3nJD6LsbvmX3wu58kS/JB0Gx3VMOqCb5Ix5IMjbH7woCQ2m2r2HLf6hMP2euOfX9DoRSsFpEryU8whOHZseF/vzCx7Mhnl434DqmgveLiTueRphCC7LjlZb9xtdnL+PqPKvHVPzNrER+0wd8h6YufLAfd2Y9jtqdXv46Pyt9SrrT9GD/St0jlrCo2qCH3SXFdbf9Su6XB/qHuHQqqXj1D0qSCqmvtNfqGhSj93FuYzBqjTjy8w6ty6FU6UOfX6jNPD03xfVEMsorJQFPmee7fxrlPZTyj/9cT11LD0L+9KVldv34WslfQ+a4vEbUm9W31LfFxmWVv8AC8uVmIiq5moyu7XOftXLctD0OrkuTr0rR4J3yd87i+Iwd7ujZ33wf4lnf3W9/wA/EN2ThaleM9hq8NnJ5bW1fc/IDiYVKcrTjKD5q3R8RZfOt+QvrbHZOFqKrGcqbai20pe7eS3Xvna9n5HraFppqSW1+J6Z6JnmcJjJXabyOxg77cKkc8tmWe+DTfzsR55b5V4rrwNWwa0XQXng1y6D1XEcmAeIRyy5OnWJWOGt/BJ0Q7qoHKoh5aWyFZUzDph5TBykVlqdkAdMw4hpSMNlInWNkljVyrjAw0ZaNtmWEGbELIEDKqeJuDf3+4smajVI6V2cT5vyLjDPO36goyT/AHYRSf8AAuhMQgvH0CpJaCcZaPqFVVvfFPwaFsppT0JpcDXeZZLoIqSXxr1XyNd6uEuqQlxHsbVTUqVTy80Lx/yv9+Za8V0B1HYiee81TYBqWq9PoaimawY6FHy5/bHKcuV+Hn0ObRjp6W/UewlG7yT5Zx4+aOfPSkM42oo4atKKl/o1k5NZbTi7HyytM+m9pVEsNioXtKVKpk0kmkm9+1m9+uZ8vrvPcdvwZ4qHyPUZjMtTu0uLsjNNbyoxvJRXE73G9f2VBYOjOdS6nNpRimrvZvb5s4vaWJqV5bdST0jFP3YrRL9SSbslJt2SjG/CK3IXqSI4YatyvtTLLc1PQcafNtcT0PYta0ld5OMlnu2rqyv4L0POU5Nvlw5rdfqn0H8HitnJ5p7/AKrmHkx7TQYXVelqVRStJGO/yvtLhna7ae5oWnWXC7erOOYadXcVyX7mHN8H1AvafIu6W9jyE2I5A3IHOtoY2ikxLaK5GWzNyNjaLtdymzO0U2NoNrbKuZbKbDoG7kB3IYB4zRuNhZRZru2J1Nsz3S1NRjJfhYrstGu8kbrW2bU6vj5FqpPjBPyFVWmbWIqA6j2Mqvb8jXhJo3HGLSfUVWLnobWNn8K6C3D8HsYWKh/evJM138NX5wX6C3t0/hj0Rftc3+VAuBpkYVeOr6M2q0Nyb8k18gEcTP4EbVafCHqJcTSnaVWFt9/GLb9UdXASe9KTytl3kbc01A4lOVZ7or/m18mPUsPiH+Wiv8qsv+xzcsmva+Bv+pPavZKnd5QS2qt5VM6azaScYpnzOo22fTF2fKUZRnLBxUoyg/8A2TcveTWXvb8z5fUk7u/gzp+BZ1sQ+V40qSJTlZp6NPoZIeg4nXqzB0KLqTUE7X3t7kuLMXbslm3kdfC4CMV70ltPfb5EcsusVxmw+18MtmMozjLYSp7KW6mt1vD9TlRkd50aa4iWJwdPfB2en5f2Fwy8ao5Y+dtdn4m/uP8A233eD5MPWqtOySXl8+ZyJJxeZ0aGLUlaeT4S4PTa+pssftscvpmU5MzssLVi/p98fIA7gkNtqyJtGLFqI2g21tkuUkWEFXLKbMuoZmmYZHMxKQQXcgO5Ag2qzNquLbF3ez8ipRV8r29Qajbp32jwKlixNyj9s2pxt+HzNptm/aXoXHFX0E1PTqwqoybu2DUHdNKu+CRcsXbehaNOK3yXVh6U6dveV+d2mLZB3Vxx0XwRPb9EipU6bfuvK2eqf6m506aStZvjdNA/5HyqGNk+CNLHT0QGNWCf4RqNSja9rebYLJ/Blv8AWo9o1F+VffgFh2rU+CD8Y3FYVo7r+SWfUzUco+809nqydwl+lJnf66r7SqNZRoaf6Udr1R5PtbDOFRt7pNyjbdzXlc6i7Us/d2lwyN18RtL3vf452f6B4peO+IXksznt5stRfBHWm4Ze5Fc3HL5ElsZbCV+N1ZI6e/4h0/WMLScVfj8kHVV8V6mJba3pfNMNCDau7JcXnbohL+nglNJ8vE33SX2wMcllKHO+nK4SrOaipPYztwvK2u/cAVzit1k/NCKw0ru2XiHWJejXjd/wHlSXxRXJvLqGbgewsLKSyea03oNX2b5Z6p3vfk/qXTpJp+9uyVs09d+QvJTT/Lu423A91vTaktPqS8efUyqjtmm9+5pNp+WZNl70114czC09nmDl4lOTtn5ZkUc87X42YQYdymy7+PEj8+jGBlsxfxCNrUhgDIW0QLJDFyRKmK2lml5EIbUDYNNx0GFW5EIYYHJptbOT9CTnUXEhAMulvvLMJXxEZLNdN5ZDMWircWdDBUFNNybIQGXocfY9TsyD3XT8bnLr05Qey+BCC4W7HKRqLS1D962t7tua/chBrAgcmrrZy14jMM3x3ZO9upCCZHiTaeVou2kc+rLpWhaWcY/mSs7+TyIQwDYlQmtqDn4SUEreQPB4aM2vy233u7kIa+JW91ePwew9q6knlx/VAqVLad1JRbyas2rEIaXw1nkSpg9lNtp+F16CsZptWWa3u+ViEGxu4GU0bp4ZybaUX5tAatW2U0otbrXb+diEBPN0N9LoVYpN+7f8t01L0yBd+75pR1a+iKIHQbUm96Se9731Nyg1BSdle/DP0IQ19tFQq5N2TvZXsiKcXvWtvu5CB0GwtOHl9C28tfmQhmU6lyEIEH//2Q==";
        console.log("remoteUrl   " + remoteUrl);
        /*
        this.CacheNetImg(remoteUrl,function(spriteFrame){
            this.head.spriteFrame = spriteFrame;
  
        }.bind(this));
        */
        cc.loader.load({ url: remoteUrl, type: "png" }, function (err, img) {
            if (err) {
                console.log("图片下载失败", remoteUrl, err);
                return;
            }
            //var mylogo  = new cc.SpriteFrame(img); 
            //this.head.spriteFrame = mylogo;
        }.bind(this));
        // this.head.getComponent(cc.Sprite).spriteFrame = this.headAtlas.getSpriteFrame("touxiang"); 
    };
    HallTopNode.prototype.fireUpdateView = function () {
        var flag = UserControl_1.G_UserControl.isLogin();
        if (flag) {
            this.playerInfoObj.active = true;
            this.goldNode.active = true;
            this.playerEmptyObj.active = false;
            this.lableName.getComponent(cc.Label).string = UserControl_1.G_UserControl.getUser().userName;
            this.lableId.getComponent(cc.Label).string = "ID:" + UserControl_1.G_UserControl.getUser().uid;
            this.setVIP(UserControl_1.G_UserControl.getUser().level);
            var pic = UserControl_1.G_UserControl.getUser().usePic;
            //this.onReplaceHead(pic)
            /*
            this.loadNative(pic,(o)=>{
             this.head.spriteFrame = o;
            });
            */
            /*
            this.CacheNetImg(pic,function(newSprite){
                console.log("newSprite" +newSprite);
                this.head.getComponent(cc.Sprite).spriteFrame = newSprite;
            }.bind(this));
            */
            // console.log(' G_UserControl.getUser().balance  '+ G_UserControl.getUser().balance);
            if (UserControl_1.G_UserControl.getUser().balance) {
                this.goldLabel.getComponent(cc.Label).string = "" + Math.round(UserControl_1.G_UserControl.getUser().balance * 100) / 100;
            }
        }
        else {
            this.playerInfoObj.active = false;
            this.goldNode.active = false;
            this.playerEmptyObj.active = true;
        }
    };
    HallTopNode.prototype.ceshi = function () {
        var node = new cc.Node(), sprite = node.addComponent(cc.Sprite);
        cc.loader.loadRes("testSprite.png", cc.SpriteFrame, function (err, sp) {
            sprite.spriteFrame = sp;
        });
        node.parent = this.node;
    };
    __decorate([
        property(cc.Sprite)
    ], HallTopNode.prototype, "vip", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], HallTopNode.prototype, "headAtlas", void 0);
    __decorate([
        property(cc.Node)
    ], HallTopNode.prototype, "playerInfoObj", void 0);
    __decorate([
        property(cc.Sprite)
    ], HallTopNode.prototype, "head", void 0);
    __decorate([
        property(cc.Node)
    ], HallTopNode.prototype, "headBox", void 0);
    __decorate([
        property(cc.Node)
    ], HallTopNode.prototype, "lableName", void 0);
    __decorate([
        property(cc.Node)
    ], HallTopNode.prototype, "goldNode", void 0);
    __decorate([
        property(cc.Node)
    ], HallTopNode.prototype, "goldBtn", void 0);
    __decorate([
        property(cc.Node)
    ], HallTopNode.prototype, "goldLabel", void 0);
    __decorate([
        property(cc.Node)
    ], HallTopNode.prototype, "lableId", void 0);
    __decorate([
        property(cc.Node)
    ], HallTopNode.prototype, "labelCopy", void 0);
    __decorate([
        property(cc.Node)
    ], HallTopNode.prototype, "playerEmptyObj", void 0);
    __decorate([
        property(cc.Node)
    ], HallTopNode.prototype, "loginBtn", void 0);
    __decorate([
        property(cc.Node)
    ], HallTopNode.prototype, "registerBtn", void 0);
    __decorate([
        property(cc.Node)
    ], HallTopNode.prototype, "serverBtn", void 0);
    __decorate([
        property(cc.Node)
    ], HallTopNode.prototype, "supportBtn", void 0);
    HallTopNode = __decorate([
        ccclass
    ], HallTopNode);
    return HallTopNode;
}(cc.Component));
exports.default = HallTopNode;

cc._RF.pop();