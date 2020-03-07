import { Platforms } from "../../Platform/Platforms";
import { G_UiForms } from "../../Tool/UiForms";
import { G_Language } from "../../Language/Language";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label_url: cc.Label = null;
    @property(cc.Label)
    label_huoyue: cc.Label = null;
    @property(cc.Label)
    label_shouchong: cc.Label = null;
    @property(cc.Label)
    label_add: cc.Label = null;
    @property(cc.Label)
    label_teamAdd: cc.Label = null;
    @property(cc.Label)
    label_fanli: cc.Label = null;    


    private platforms : Platforms = null;

    onLoad () {
        this.platforms = new Platforms()
    }
    start () {
        this.showInfo();
    }

    showInfo()
    {
        this.label_url.string = "http://www.xxxx.com"
        this.label_huoyue.string = String(3);
        this.label_shouchong.string = String(2);
        this.label_add.string = String(2);
        this.label_teamAdd.string = String(1);
        this.label_fanli.string = 23.3434.toFixed(2);
    }



    /**
     * 复制图片
     */
    OnCopyCodeClick()
    {

    }
    /**
     * 复制地址
     */
    OnCopyClick()
    {
        var str = "xxxxxxxxxxxxxxxxxxxxxxxxx";
        this.platforms.JsCopy(str)
        G_UiForms.hint(G_Language.get("copySucceed"))
    }

    OnShareWechatClick()
    {    
        if(cc.sys.platform == cc.sys.WECHAT_GAME)
        {
            // let url = "1";
            // cc.loader.loadRes("share", function (err, data) {
            //     wx.shareAppMessage({
            //         title: "xxxxxx",
            //         imageUrl: url,
            //         success(res) {
            //             console.log("res ",res)
            //         },
            //         fail(res) {
            //             console.log("res ",res)
            //         }
            //     });    
            // }.bind(this));
            jsb.fileUtils.getWritablePath("https://forum.cocos.org/t/jsb-assetsmanager/46548/6");
        }
        else
        {
            console.log("cc.sys.platform   ",cc.sys.WECHAT_GAME); 
        }
    }

    OnShareQQClick()
    {
        
    }

    OnShareFriendCircleClick()
    {

    }

    shareTo(stype){
        var ftit = '';
        var flink = '';
        var lk = '';
        //获取文章标题
        ftit = document.title;
        //获取网页中内容的第一张图片地址作为分享图
        flink = document.images[0].src;
        if(typeof flink == 'undefined'){
            flink='';
        }
        //当内容中没有图片时，设置分享图片为网站logo
        if(flink == ''){
            lk = 'http://'+window.location.host+'/static/images/logo.png';
        }
        //如果是上传的图片则进行绝对路径拼接
        if(flink.indexOf('/uploads/') != -1) {
            lk = 'http://'+window.location.host+flink;
        }
        //百度编辑器自带图片获取
        if(flink.indexOf('ueditor') != -1){
            lk = flink;
        }
        //qq空间接口的传参
        if(stype=='qzone'){
            window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+document.location.href+'?sharesource=qzone&title='+ftit+'&pics='+lk+'&summary='+document.querySelector('meta[name="description"]').getAttribute('content'));
        }
        //新浪微博接口的传参
        if(stype=='sina'){
            window.open('http://service.weibo.com/share/share.php?url='+document.location.href+'?sharesource=weibo&title='+ftit+'&pic='+lk+'&appkey=2706825840');
        }
        //qq好友接口的传参
        if(stype == 'qq'){
            window.open('http://connect.qq.com/widget/shareqq/index.html?url='+document.location.href+'?sharesource=qzone&title='+ftit+'&pics='+lk+'&summary='+document.querySelector('meta[name="description"]').getAttribute('content')+'&desc=php自学网，一个web开发交流的网站');
        }
        //生成二维码给微信扫描分享，php生成，也可以用jquery.qrcode.js插件实现二维码生成
        if(stype == 'wechat'){
            window.open('http://zixuephp.net/inc/qrcode_img.php?url=http://zixuephp.net/article-1.html');
        }
    }

}
