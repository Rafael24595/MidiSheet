import { ipcRenderer } from "electron";

export class ML_ElectronPost {
    
    private static listenerVector:{[key:string]:any} = {};

    public static send(password: any, data: any){
        let message = JSON.stringify({password,data});
        ipcRenderer.send(message);
    }

    public static subscribe(pass:string, custom:Function, swDestroy:boolean = false){
        this.listenerVector[pass] = (event: Electron.IpcRendererEvent, message: { password: any; data: any; }) => {
            let word = message.password;
            let data = message.data;
            
            this.listener(word, data);
            
            if(pass.includes(word) || pass == ""){
                this.customListener(custom, word, data);
                if(swDestroy){
                    ipcRenderer.removeListener('ping', this.listenerVector[pass]);
                }
            }
        };
        ipcRenderer.on('ping', this.listenerVector[pass]);
    }

    private static listener(password:string, data:any){

    }

    private static customListener(custom: Function, password:string, data:any){
        custom(password, data);
    }

}