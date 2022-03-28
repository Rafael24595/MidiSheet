import { IIpcMessage } from "../../interface/IIpcMessage";
import { IManagerOptions } from "../../interface/IManagerOptions";
import { MainView } from "../views/MainView";
import { AbstractManager } from "./AbsctractManager";

export class MainManager extends AbstractManager{

    private static readonly idconn = "Main";

    private constructor(options?: IManagerOptions){
        super(options);
    }

    public static launch(){
        const options:IManagerOptions = {
            swMain:true,
            electron:{
                webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                webSecurity: false,}
            }
        }
    
        let instance = this.getInstance(this.idconn, options);
        instance.loadView(MainView.start());
    }

    protected listener(message:IIpcMessage):void{
        console.log(message)
    }

}