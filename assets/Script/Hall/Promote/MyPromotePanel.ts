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

    //微信分享
    OnShareWechatClick()
    {    
       if(cc.sys.OS_ANDROID == cc.sys.os){
           jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity","wxLogin","()V"); //登录
       }
    }

    OnShareQQClick()
    {
        
    }

    OnShareFriendCircleClick()
    {

    }



}
