import { G_Storage } from '../Tool/Storage';


export class UserModel {
    constructor() {
    }
    //用户名字
    private _userName: string = null;
    public get userName() {
        return this._userName;
    }
    public set userName(name: string) {
        this._userName = name;
    }

    //用户头像
    private _usePic:string = null;
    public get usePic(){
        return this._usePic;
    }
    public set usePic(pic:string){
        this._usePic = pic;
    }
    //唯一id
    private _uid:number = null;
    public get uid(){
        return this._uid;
    }
    public set uid(id:number)
    {
        this._uid = id;
    }

    //等级
    private _level:number = null;
    public get level(){
        return this._level;
    }
    public set level(lvl:number)
    {
        this._level = lvl;
    }

        //等级
        private _richrank:number = null;
        public get richrank(){
            return this._richrank;
        }
        public set richrank(rank:number)
        {
            this._richrank = rank;
        }
    
    //money
    private _balance:number = null;
    public get balance(){
        return this._balance;
    }
    public set balance(money:number)
    {
        this._balance = money;
    }




    //用户VIP等级 最新等级0 最大等级9  可变
    private _userVipLevel: number =  0;
    public get userVipLevel(){
        return this._userVipLevel;
    }
    public set userVipLevel(level : number){
        this._userVipLevel = level;
    }

    //用户账号
    private _userMobile : string = null;
    public get userMobile(){
        this._userMobile = G_Storage.getMobile();
        return this._userMobile;
    }
    public set userMobile(account : string){
        this._userMobile = account;
        G_Storage.setMobile(account)
    }

    private _userPassword : string = null;
    get userPassword(){
        this._userPassword = G_Storage.getPassword()
        return this._userPassword
    }
    set userPassword(password : string){
        this._userPassword = password
        G_Storage.setPassword(password)
    }
    
    private _accessToken : string = null;
    get accessToken(){
        return this._accessToken;
    } 

    set accessToken(token : string){
        this._accessToken = token;
    }

    // expires_at: "2019-12-10 15:06:59"
    // token_type: "Bearer"
    //到期时间
    private _expiresAt : string = null;
    get expiresAt(){
        return this._expiresAt;
    }
    set expiresAt(at : string){
        this._expiresAt = at;
    }
    

 

}


