
import {zh} from "./Zh"
import {en} from "./En";

class Language{
    public static readonly Instance : Language = new Language();

    private _languageType = null;
    init(_type : string = "zh"){
        this._languageType = _type
    }

    get(key) : any{
        if (this._languageType == "zh"){
            return zh[key];
        }
        return en[key];
    }
}
export const G_Language = Language.Instance