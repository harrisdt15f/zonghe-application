import { G_UiForms } from '../Tool/UiForms';
import { G_Utils } from '../Tool/Utils';



export class Platforms {

    public _toExitGame : boolean = null;

    constructor(){
    }

    eixtGame(){
        if(cc.sys.os == cc.sys.OS_ANDROID){
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        }
    }

    
    onKeyDown(event){
        var self = this;
        switch (event.keyCode) {
            case cc.macro.KEY.back:
                if (!self._toExitGame) {
                    // 首次点击，重置该标记
                    self._toExitGame = true;
                    G_UiForms.hint("再次点击后退，退出游戏")
                    setTimeout(function(){
                        self._toExitGame = false;
                    },3000)
                }else{
                    // 已经点击过一次，则直接退出
                    cc.game.end();
                    return;
                }
            break;
        }
    }
    

    JsCopy(copyText){
        /*
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "JavaCopy", "(Ljava/lang/String;)V", str);
        }
        */
        if (cc.sys.isNative && cc.sys.isMobile) {
            if(cc.sys.os == cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "JavaCopy", "(Ljava/lang/String;)V", copyText);
            }else if(cc.sys.os == cc.sys.OS_IOS){
                jsb.reflection.callStaticMethod("NativeOcClass", 
                                           "callNativeCopyText:",
                                           copyText);
            }
        }else if (cc.sys.isBrowser) {           
            if(G_Utils.isiOS()){
                const el = document.createElement('input');
                el.value = copyText;
                el.style.opacity = '0';
                document.body.appendChild(el);
                const editable = el.contentEditable;
                const readOnly = el.readOnly;
                //el.contentEditable = true;
                el.readOnly = false;
                const range = document.createRange();
                range.selectNodeContents(el);
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                el.setSelectionRange(0, 999999);
                el.contentEditable = editable;
                el.readOnly = readOnly;
                const ret = document.execCommand('copy');
                el.blur();
                 document.body.removeChild(el);
                // btn.text = ret ? '已复制' : '复制失败';

            }else{
                var textArea = document.getElementById("clipBoard");
                if (textArea === null) {
                    textArea = document.createElement("textarea");
                    textArea.id = "clipBoard";

                    textArea.textContent = copyText;
                    document.body.appendChild(textArea);
                }
             //   textArea.select();
                try {
                    const msg = document.execCommand('copy') ? 'successful' : 'unsuccessful';
                    document.body.removeChild(textArea);
                } catch (err) {
                }
            }
            
        }




    }
     

}
