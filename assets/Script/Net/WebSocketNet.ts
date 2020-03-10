import { URL, PORT } from "../Config/config";



export default class WebSocketNet  {
    ws : WebSocket;

    constructor(){
        this.send();
    }


    send(){
        // this.ws = new WebSocket("ws://echo.websocket.org");
        this.ws = new WebSocket(URL+":"+PORT);
        this.ws.onopen = this.onopen.bind(this);
        this.ws.onmessage = this.onmessage.bind(this);
        this.ws.onerror = this.onerror.bind(this);
        this.ws.onclose = this.onclose.bind(this);
 
        
        // this.sock.onopen = this.on_open.bind(this);
        // this.sock.onmessage = this.on_message.bind(this);
        // this.sock.onclose = this.on_close.bind(this);
        // this.sock.onerror = this.on_error.bind(this);

    }
    
    onopen(event){
        console.log("Send Text WS was opened.");
    }

    onmessage(event){
        console.log("response text msg: " + event.data);
    }

    onerror(event){
        console.log("Send Text fired an error");
    }

    onclose(event){
        console.log("WebSocket instance closed.");
    }
}

