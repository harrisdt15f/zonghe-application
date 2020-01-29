import { URL } from "../Config/config";

/**
 * 本地保存数据
 */

class Storage {
    public static readonly Instance : Storage = new Storage();
    /**
     * 音效音量
     * @param volume 0.1
     */
    setSoundEffectVolume(volume){
        cc.sys.localStorage.setItem("effectVolume",volume);
    }
    getSoundEffectVolume(){
        return  cc.sys.localStorage.getItem("effectVolume");
    }

    /**
     * 音乐音量
     * @param volume 0.1
     */
    setSoundMusicVolume(volume){
        cc.sys.localStorage.setItem("music",volume)
    }
    getSoundMusicVolume(){
        return cc.sys.localStorage.getItem("music")
    }


    getMobile(){
        return cc.sys.localStorage.getItem(URL+"Mobile")
    }
    /**
     * 用户登陆账户
     * @param account 
     */
    setMobile(account : string ){
        cc.sys.localStorage.setItem(URL+"Mobile", account)
    }


    getPassword(){
        return cc.sys.localStorage.getItem(URL+"Password")
    }
    /**
     * 用户登陆密码
     * @param password 
     */
    setPassword(password : string){
        cc.sys.localStorage.setItem(URL+"Password",password)
    }



}
export const G_Storage = Storage.Instance;
