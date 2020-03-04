

const {ccclass, property} = cc._decorator;

@ccclass
export default class MyEditbox extends cc.Component {
    // this.myEditBox.node.getChildByName("TEXT_LABEL").getComponent(cc.Label).string

    /**输入的文字 */
    @property(cc.Label)
    text : cc.Label = null;

    @property(cc.EditBox)
    myEditBox : cc.EditBox = null;

    public onDidBeganCallback = null;
    public onDidEndedCallback = null;
    public onTextChangedCallback = null;
    public onReturnCallback = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(this.myEditBox){
            this.myEditBox.node.on('editing-did-began', this.onEditboxDidBegan,this) 
            this.myEditBox.node.on('editing-did-ended', this.onEditboxDidEnded,this)
            this.myEditBox.node.on('text-changed', this.onEditboxTextChanged,this) 
            this.myEditBox.node.on('editing-return', this.onEditboxReturn,this) 
        }
    }

    start () {
    }

    update (dt) {
        var str = this.getEdiboxComponent().string
        if(str && this.text.node.active){
            this.text.node.active = false;
        }
    }


    onEditboxDidBegan(target){
        console.log("[myEditbox Did Began]",target.string)
        this.text.node.active = false;
        if(this.onDidBeganCallback){
            this.onDidBeganCallback(target);
        }
    }

    onEditboxTextChanged(target){
        console.log("[myEditbox Text Changed]",target.string)
        if(this.onTextChangedCallback){
            this.onTextChangedCallback(target);
        }
    }

    private onEditboxDidEnded(target){
        var strText = target.string;
        console.log("[myEditbox Did Ended]",strText,strText.length)
        this.text.node.active = !strText ? true : strText.length == 0
        if(this.onDidEndedCallback){
            this.onDidEndedCallback(target);
        }
    }

    onEditboxReturn(target){
        console.log("[myEditbox Return]",target.string)
        if(this.onReturnCallback){
            this.onReturnCallback(target);
        }
    }


    getEditbox(){
        return this.myEditBox;
    }

    getEdiboxComponent(){
        return this.myEditBox.getComponent(cc.EditBox)
    }

    getText(){
        return this.text;
    }

    getTEXTLABEL(){
        return this.myEditBox.node.getChildByName("TEXT_LABEL")
    }
}
