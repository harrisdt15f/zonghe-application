
import { RequestConfig } from "../Config/RequestConfig";


class RequestControl {
  
    public static readonly Instance : RequestControl = new RequestControl();

    private config : RequestConfig = null;


    constructor(){
        this.config = new RequestConfig();
    }

    public getConfig(){
        return this.config;
    }

}
  

export const G_RequestControl = RequestControl.Instance;
