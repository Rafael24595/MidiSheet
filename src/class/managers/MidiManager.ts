import { IIpcMessage } from "../../interface/IIpcMessage";
import { IManagerOptions } from "../../interface/IManagerOptions";
import { MidiView } from "../views/MidiView";
import { AbstractManager } from "./AbsctractManager";

export class MidiManager extends AbstractManager{

    private static readonly idconn = "Midi";

    private constructor(options?: IManagerOptions){
        super(options);
    }

    public static launch(){
        const options:IManagerOptions = {
            swMain:false,
            electron:{
                webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                webSecurity: false,}
            }
        }
    
        let instance = this.getInstance(this.idconn, options);
        instance.loadView(MidiView.start());
        //instance.hide();

        setTimeout(()=>{
            instance.send("MyPass", {note:{note:86,scale:220}, finish:400, priority:true})
        },500)
        
    }

    protected listener(message:IIpcMessage):void{
        console.log(message)
    }

}